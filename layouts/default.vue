<template>
  <div>
    <!-- Modal to show incomplete elements -->
    <In_development_component
      v-if="showInDev"
      :target="currentTarget"
      :inDevActive="showInDev"
      @close="showInDev = false"
    />

    <!-- Website page header / Fixed top line -->
    <header
      class="top-menu fixed left-0 top-0 z-[100] flex h-[64px] w-full flex-row items-center justify-between bg-white"
      :class="{ 'pr-2': isModalOverlayActive }"
    >
      <button
        type="button"
        aria-label=""
        class="BurgerMenuIcon__container flex w-[12%] sm:hidden"
        @click="openBurgerDropdown"
      >
        <BurgerMenuIcon class="m-auto h-6 w-6 flex-shrink-0 sm:hidden" />
      </button>

      <!-- Overlays -->
      <div
        class="modal_overlay"
        @click="closeModalOverlay"
        :class="{ active: isModalOverlayActive }"
      ></div>
      <div
        class="native-overlay native-search-overlay"
        :class="{
          active: searchQuery && !outsideClickOccurance,
        }"
      ></div>
      <div
        @click="isShopClicked = false"
        class="native-overlay native-shop-hover-overlay hidden sm:block"
        :class="{
          active: isShopHovered || isShopClicked,
        }"
      ></div>

      <!-- Side navigation menu for mobile users -->
      <nav
        class="BurgerMenu__dropdown"
        :class="{
          active: isBurgerDropdownActive,
          closed: !isBurgerDropdownActive,
          'no-animation': !isBurgerAnimationActive,
        }"
      >
        <NuxtLink
          @click="(setSortingOption(0), closeBurgerDropdown())"
          to="/shop"
          class="BurgerMenu__item"
          >Shop</NuxtLink
        >
        <NuxtLink
          @click="(setSortingOption(2), closeBurgerDropdown())"
          to="/shop"
          class="BurgerMenu__item"
          >On Sale</NuxtLink
        >
        <NuxtLink
          @click="(setSortingOption(1), closeBurgerDropdown())"
          to="/shop"
          class="BurgerMenu__item"
          >New Arrivals</NuxtLink
        >
        <NuxtLink
          @click="(setSortingOption(4), closeBurgerDropdown())"
          to="/shop"
          class="BurgerMenu__item"
          >Best Choice</NuxtLink
        >
      </nav>

      <!-- Main logo -->
      <!-- <NuxtLink
        to="/"
        class="top-menu__logo IntergralExtraBold mb-2 mt-0 cursor-pointer select-none text-2xl leading-none text-black sm:ml-[20px] sm:block md:ml-[1%] 2xl:ml-[6%] 2xl:text-3xl"
        :class="isMobileSearchActive ? 'hidden' : ''"
      >
        LOOM.HUB
      </NuxtLink> -->
      <NuxtLink
        to="/"
        class="top-menu__logo IntergralExtraBold mb-2 mt-0 cursor-pointer select-none text-2xl leading-none text-black sm:ml-[20px] sm:block md:ml-[1%] 2xl:ml-[6%] 2xl:text-3xl"
        :class="{ hidden: isMobileSearchActive }"
      >
        LOOM.HUB
      </NuxtLink>

      <!-- Main navigation for PC users -->
      <nav
        class="top-menu__nav SatoshiRegular hidden max-h-[10px] flex-row items-center text-base sm:flex sm:w-full sm:justify-evenly lg:flex xl:w-[30%] 2xl:text-xl"
        :class="{ 'sm:hidden': isMobileSearchActive }"
      >
        <!-- Shop dropdown menu with four dress style options -->
        <div
          @mouseenter="isShopHovered = true"
          @mouseleave="isShopHovered = false"
          @click="toggleShop()"
          :class="{ 'z-[140]': isShopHovered || isShopClicked }"
          class="top-menu__nav-item top-menu__nav-item__shop relative hidden h-16 cursor-pointer flex-row sm:flex"
        >
          <button
            type="button"
            class="top-menu__nav-item__shop-text select-none"
          >
            Shop
          </button>
          <PointerIcon
            class="top-menu__nav-item__shop-arrow mt-[2px] h-6 pl-[3px] sm:w-[14px]"
          />
          <!-- Dropdown menu -->
          <div
            v-show="isShopHovered || isShopClicked"
            class="shop-dropdown__title"
          >
            <div class="shop-dropdown__title-text">Shop</div>
            <PointerIcon class="shop-dropdown__title-arrow" />
          </div>
          <div
            role="menu"
            v-show="isShopHovered || isShopClicked"
            class="top-menu__nav-item__shop-dropdown"
          >
            <NuxtLink
              :to="style.path"
              v-for="(style, index) in dress_styles_list"
              :key="index"
              class="shop-dropdown__item"
              :class="[
                hoveredIndex == index
                  ? 'shop-dropdown__item__border text-black'
                  : 'text-white',
              ]"
              :style="{
                backgroundImage: `url(${style.backgroundPicture}.png)`,
              }"
              @mouseover="hoveredIndex = index"
              @mouseleave="hoveredIndex = null"
              @click="hoveredIndex = index"
            >
              <span
                class="shop-dropdown__item__name relative z-10 text-lg font-semibold"
                >{{ style.name }}</span
              >
              <div
                v-show="hoveredIndex !== index"
                class="shop-dropdown__item__shadow"
              ></div>
            </NuxtLink>
          </div>
        </div>

        <!-- PC navigation continues -->
        <NuxtLink
          @click="setSortingOption(2)"
          :to="'/shop'"
          class="top-menu__nav-item flex cursor-pointer select-none"
        >
          On Sale
        </NuxtLink>
        <NuxtLink
          @click="setSortingOption(1)"
          :to="'/shop'"
          class="top-menu__nav-item flex cursor-pointer select-none"
        >
          New Arrivals
        </NuxtLink>
        <NuxtLink
          @click="setSortingOption(3)"
          :to="'/shop'"
          class="top-menu__nav-item flex cursor-pointer select-none"
        >
          Best Choice
        </NuxtLink>
      </nav>

      <!-- Main search for PC users -->
      <form
        role="search"
        class="top-menu__search hidden w-full flex-row rounded-3xl bg-[#F0F0F0] p-2 lg:flex xl:w-[40vw]"
        :class="{ 'z-[140]': searchQuery }"
        @click="focusHomePageSearch"
        ref="searchContainer"
      >
        <SearchIconGray
          class="top-menu__search-icon mr-3 hidden pl-1 lg:block"
          aria-label="Search"
        />
        <section
          class="top-menu__search-dropdown relative hidden w-full lg:block"
        >
          <input
            type="text"
            class="top-menu__search-input h-6 w-[99%] bg-[#F0F0F0] pl-[2px]"
            placeholder="Search for products..."
            aria-label="Search for products"
            ref="HomePageSearch"
            v-model="searchQuery"
            @input="performQuickSearch"
            @compositionend="performQuickSearch"
            @paste="performPasteQuickSearch"
            @focus="openDropdown"
          />

          <Search_results_dropdown
            v-show="searchQuery && !outsideClickOccurance"
            :query="searchQuery"
            :searchResults="searchResults"
            :isFetching="isFetching"
          />
        </section>
      </form>

      <!-- Section with interactive state buttons -->
      <section
        class="top-menu__actions mr-[1px] flex h-16 flex-shrink-0 flex-row items-center justify-end sm:mr-[2px] lg:mr-[3px]"
        :class="{ 'z-[140]': searchQuery }"
      >
        <button class="px-2 md:px-4">
          <!-- Icon for mobile closed search state -->
          <!-- <SearchIconBlack
            class="top-menu__search-icon lg:hidden"
            :class="isMobileSearchActive ? 'hidden' : ''"
            aria-label="Search"
            @click="openMobileSearch()"
          /> -->
          <SearchIconBlack
            class="top-menu__search-icon lg:hidden"
            :class="{ hidden: isMobileSearchActive }"
            aria-label="Search"
            @click="openMobileSearch()"
          />
        </button>

        <!-- Mobile search container -->
        <form
          role="search"
          class="mobile-search__container hidden sm:max-w-[70%]"
          :class="{
            active: isMobileSearchActive,
            closed: !isMobileSearchActive,
            'no-animation': !isSearchAnimationActive,
          }"
          ref="mobileSearchContainer"
        >
          <!-- Icon for mobile opened search state -->
          <SearchIconGray
            class="top-menu__search-icon ml-2 mr-3"
            aria-label="Search"
            @click="(closeMobileSearch(), (outsideClickOccurance = true))"
          />
          <!-- Mobile search -->
          <div class="search-dropdown">
            <input
              type="text"
              class="search-input pl-[2px]"
              placeholder="Search for products..."
              aria-label="Search for products"
              ref="MobileSearchInput"
              v-model="searchQuery"
              @input="performQuickSearch"
              @change="performQuickSearch"
              @compositionend="performQuickSearch"
              @paste="performPasteQuickSearch"
              @click="openDropdown"
              @focus="openDropdown"
            />

            <Search_results_dropdown
              v-show="searchQuery && !outsideClickOccurance"
              :query="searchQuery"
              :searchResults="searchResults"
              :isFetching="isFetching"
            ></Search_results_dropdown>
          </div>
        </form>

        <!-- Cart button -->
        <!-- <button
          class="top-menu__actions-cart top-menu__actions__button flex cursor-not-allowed justify-center px-2 hover:blur-[1px] active:blur-[1px] md:px-4"
          :class="isMobileSearchActive ? 'hidden lg:block' : ''"
          @click="openInDev('Cart')"
        >
          <CartIcon class="h-16"></CartIcon>
        </button> -->
        <button
          class="top-menu__actions-cart top-menu__actions__button flex cursor-not-allowed justify-center px-2 hover:blur-[1px] active:blur-[1px] md:px-4"
          :class="{ 'hidden lg:block': isMobileSearchActive }"
          @click="openInDev('Cart')"
        >
          <CartIcon class="h-16"></CartIcon>
        </button>

        <!-- Profile button -->
        <button
          class="top-menu__actions-profile top-menu__actions__button flex cursor-pointer justify-center px-2 md:px-4"
          @click="openAuthPopup"
        >
          <!-- <ProfileIcon
            class="h-16"
            :class="isMobileSearchActive ? 'hidden lg:block' : ''"
          ></ProfileIcon> -->
          <ProfileIcon
            class="h-16"
            :class="{ 'hidden lg:block': isMobileSearchActive }"
          ></ProfileIcon>
        </button>
      </section>

      <!-- Modal profile window -->
      <div
        v-show="isAuthPopupActive"
        class="auth__popup fixed left-[50%] top-[50%] z-[140] w-[90vw] max-w-[500px] -translate-x-[50%] -translate-y-[50%] rounded-3xl bg-white pb-7 pl-3 pr-3 pt-12 sm:w-[80vw] sm:pb-8 sm:pl-10 sm:pr-10 sm:pt-12 lg:w-[70vw]"
      >
        <!-- Arrow to navigate one step back -->
        <div
          class="step-back__arrow-container cursor-pointer"
          @click="authStepBack"
        >
          <ArrowIcon class="step-back__arrow"></ArrowIcon>
        </div>

        <!-- Main page of profile modal -->
        <section
          v-if="isAuthGreetingsActive && !nickname"
          class="auth__greetings"
        >
          <div
            class="auth__popup-btn Login-button cursor-pointer select-none"
            @click="openAuthLogin"
          >
            Login
          </div>
          <div
            class="auth__popup-btn registration-button cursor-pointer select-none"
            @click="openAuthRegistration"
          >
            Sign up
          </div>
        </section>

        <!-- Logged in state of profile modal -->
        <section v-if="nickname">
          <div class="auth__user-nickname">{{ nickname }}</div>
          <img
            @click="openInDev('Change profile picture')"
            :src="`${profilePicUrl}`"
            v-show="profilePicUrl"
            class="auth__user-avatar"
          />
          <div
            class="end-session__button auth__popup-btn cursor-pointer select-none"
            @click="logMeOut"
          >
            Log out
          </div>
        </section>

        <!-- Login form -->
        <form v-if="isAuthLoginActive && !nickname" class="auth__Login">
          <!-- <input
            class="auth-input auth__login-input"
            :class="!nicknameLoginError ? 'mb-3' : ''"
            type="text"
            placeholder="Nickname"
            autocomplete="nickname"
            v-model="loginName"
          /> -->
          <input
            class="auth-input auth__login-input"
            :class="{ 'mb-3': !nicknameLoginError }"
            type="text"
            placeholder="Nickname"
            autocomplete="nickname"
            v-model="loginName"
          />
          <div class="error-message">{{ nicknameLoginError }}</div>
          <!-- <input
            class="auth-input auth__password-input"
            :class="!passwordLoginError ? 'mb-4' : ''"
            type="password"
            placeholder="Password"
            autocomplete="password"
            v-model="loginPassword"
          /> -->
          <input
            class="auth-input auth__password-input"
            :class="{ 'mb-4': !passwordLoginError }"
            type="password"
            placeholder="Password"
            autocomplete="password"
            v-model="loginPassword"
          />
          <div class="error-message">{{ passwordLoginError }}</div>
          <button
            class="auth__popup-btn mx-auto block cursor-pointer select-none"
            @click.prevent="submitLoginForm"
          >
            Login
          </button>
        </form>

        <!-- Sign up form -->
        <form
          class="auth__registration"
          v-if="isAuthRegistrationActive && !nickname"
        >
          <input
            class="auth-input auth__login-input"
            :class="{ 'mb-3': !nicknameRegError }"
            type="text"
            placeholder="Nickname"
            autocomplete="nickname"
            v-model="regName"
          />

          <!-- <input
            class="auth-input auth__login-input"
            :class="!nicknameRegError ? 'mb-3' : ''"
            type="text"
            placeholder="Nickname"
            autocomplete="nickname"
            v-model="regName"
          /> -->
          <input
            class="auth-input auth__login-input"
            :class="{ 'mb-3': !nicknameRegError }"
            type="text"
            placeholder="Nickname"
            autocomplete="nickname"
            v-model="regName"
          />

          <div class="error-message">{{ nicknameRegError }}</div>
          <!-- <input
            class="auth-input auth__password-input"
            :class="!passwordRegError ? 'mb-4' : ''"
            type="password"
            placeholder="Password"
            autocomplete="password"
            v-model="regPassword"
          /> -->
          <input
            class="auth-input auth__password-input"
            :class="{ 'mb-4': !passwordRegError }"
            type="password"
            placeholder="Password"
            autocomplete="password"
            v-model="regPassword"
          />
          <div class="error-message">{{ passwordRegError }}</div>
          <div class="success-message" v-if="isRegistrationSuccessful">
            ✅ Registration is successful! Logging in...
          </div>
          <button
            class="auth__popup-btn mx-auto cursor-pointer select-none"
            @click.prevent="submitRegistrationForm"
          >
            Register
          </button>
        </form>
      </div>
    </header>

    <!-- Website page content -->
    <main
      class="website mt-16"
      :class="{ 'website-padding': useWebsitePadding }"
    >
      <slot></slot>
    </main>

    <!-- Website page footer -->
    <footer class="mb-6">
      <!-- Descriptive block -->
      <div class="footer__branding ml-4 block lg:ml-0 lg:text-center">
        <!-- Footer title -->
        <div class="share__title IntegralBold mt-6 text-2xl">LOOM.HUB</div>

        <!-- Footer description -->
        <div
          class="share__description SatoshiRegular mt-3 text-[16px] leading-[22px] text-gray-500"
        >
          The place where fashion meets your lifestyle. Explore the collection
          today.
        </div>

        <!-- Footer contacts SVGs -->
        <div class="footer__socials mt-4 flex gap-3 lg:justify-center">
          <a target="_blank" href="https://x.com/andrey_omelch">
            <MyTwitterX class="share__icon"></MyTwitterX
          ></a>
          <a target="_blank" href="https://t.me/andrey_omelch"
            ><MyTelegram class="share__icon"></MyTelegram
          ></a>
          <a
            @click="copyEmailToClipboard()"
            href="mailto:omel.andrey.99@gmail.com?subject=Hello%20Andrey!"
            ><MyEmail class="share__icon"></MyEmail
          ></a>
          <a target="_blank" href="https://github.com/Festralus/"
            ><MyGithub class="share__icon"></MyGithub
          ></a>
        </div>
      </div>

      <!-- Links block -->
      <div class="footer__links mx-1 mt-8 flex flex-wrap justify-center">
        <section class="links__container inline-flex">
          <section class="links__block pb-6">
            <h3
              class="footer__section-title SatoshiRegular text-base tracking-[3px]"
            >
              CREATOR
            </h3>
            <NuxtLink to="/" class="links__link">About me</NuxtLink>
            <NuxtLink to="/" class="links__link">123</NuxtLink>
            <NuxtLink to="/" class="links__link">Inspirations</NuxtLink>
            <NuxtLink to="/" class="links__link">Career</NuxtLink>
          </section>
          <div class="links__block pb-6">
            <h3
              class="footer__section-title SatoshiRegular text-base tracking-[3px]"
            >
              LINKS
            </h3>
            <NuxtLink to="/" class="links__link">GutHub</NuxtLink>
            <NuxtLink to="/" class="links__link">Codewars</NuxtLink>
            <NuxtLink to="/" class="links__link">123</NuxtLink>
            <NuxtLink to="/" class="links__link">123</NuxtLink>
          </div>
        </section>
        <div class="links__container inline-flex">
          <section class="links__block pb-6">
            <h3
              class="footer__section-title SatoshiRegular text-base tracking-[3px]"
            >
              CONTACTS
            </h3>
            <NuxtLink to="/" class="links__link">X / Twitter</NuxtLink>
            <NuxtLink to="/" class="links__link">E-mail</NuxtLink>
            <NuxtLink to="/" class="links__link">Telegram</NuxtLink>
            <NuxtLink to="/" class="links__link">Facebook</NuxtLink>
          </section>
          <section class="links__block pb-6">
            <h3
              class="footer__section-title SatoshiRegular text-base tracking-[3px]"
            >
              THE WEBSITE
            </h3>
            <NuxtLink to="/" class="links__link">Why LoomHub</NuxtLink>
            <NuxtLink to="/" class="links__link">Roadmap</NuxtLink>
            <NuxtLink to="/" class="links__link">Features</NuxtLink>
            <NuxtLink to="/" class="links__link">Credits</NuxtLink>
          </section>
        </div>
      </div>

      <!-- Copyright block -->
      <div class="horizontal-separator-90 mt-8"></div>
      <h4
        class="footer__copyright SatoshiRegular mt-4 text-center text-base text-gray-500"
      >
        Loom.hub © 2024-2025, All rights reserved
      </h4>
    </footer>
  </div>
</template>

<script setup>
// State management imports
import Cookies from 'js-cookie';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/index';
import { useSortingStore } from '@/stores/index.js';
const route = useRoute();

// Comonent and data imports
import dress_styles_list from '~/data/dress_styles.js';
import Search_results_dropdown from '~/components/search_results_dropdown.vue';

// Icon imports
import ArrowIcon from '../assets/icons/ArrowIcon.vue';
import BurgerMenuIcon from '../assets/icons/BurgerMenuIcon.vue';
import CartIcon from '../assets/icons/CartIcon.vue';
import MyEmail from '../assets/icons/MyEmailIcon.vue';
import MyGithub from '../assets/icons/MyGithubIcon.vue';
import MyTelegram from '../assets/icons/MyTelegramIcon.vue';
import MyTwitterX from '../assets/icons/MyTwitterXIcon.vue';
import PointerIcon from '../assets/icons/PointerIcon.vue';
import ProfileIcon from '../assets/icons/ProfileIcon.vue';
import SearchIconBlack from '../assets/icons/SearchIconBlack.vue';
import SearchIconGray from '../assets/icons/SearchIconGray.vue';

// In development popup
const showInDev = ref(false);
const currentTarget = ref('');
function openInDev(string) {
  currentTarget.value = string;
  showInDev.value = true;
}

// API endpoint
import { useApi } from '@/composables/useApi.js';
const api = useApi();

onMounted(() => {
  getSession();
  setStopSearchWatcher();
  setCloseShopRoute();
});

onUnmounted(() => {
  removeStopSearchWatcher();
});

// Conditional padding for certain pages
const useWebsitePadding = computed(() => route.meta.useWebsitePadding ?? false);

// Global variables
const { nickname, profilePicUrl } = storeToRefs(useAuthStore());

// Empty search every page route
watch(
  () => route.path,
  () => {
    searchQuery.value = '';
  }
);

// Watch for outside clicks to close native overlay
const outsideClickOccurance = ref(false);
const searchContainer = ref();
const mobileSearchContainer = ref();

function closeDropdown(event) {
  if (
    window.innerWidth < 1024 &&
    mobileSearchContainer.value &&
    !mobileSearchContainer.value.contains(event.target)
  ) {
    outsideClickOccurance.value = true;
  }
  if (
    window.innerWidth > 1023 &&
    searchContainer.value &&
    !searchContainer.value.contains(event.target)
  ) {
    outsideClickOccurance.value = true;
    closeMobileSearch();
  }
}

function openDropdown() {
  outsideClickOccurance.value = false;
}

// Focus shop upon hovering over
const isShopHovered = ref(false);
const isShopClicked = ref(false);
const hoveredIndex = ref(null);
function toggleShop() {
  if (isShopClicked.value) {
    isShopHovered.value = false;
    isShopClicked.value = false;
  } else if (isShopHovered.value && !isShopClicked.value) {
    isShopHovered.value = false;
    isShopClicked.value = true;
  } else {
    isShopClicked.value = true;
  }
}

// Focus search upon opening it
const HomePageSearch = ref();
function focusHomePageSearch() {
  HomePageSearch.value?.focus();
}

// Modal Background
const isModalOverlayActive = ref(false);
function openModalOverlay() {
  isModalOverlayActive.value = true;
  document?.body.classList.add('no-scroll');
}
function closeModalOverlay() {
  if (isBurgerDropdownActive.value) {
    closeBurgerDropdown();
  }
  if (isAuthPopupActive) {
    isAuthPopupActive.value = false;
  }
  isModalOverlayActive.value = false;
  document?.body.classList.remove('no-scroll');
}

// Close dropdown on route change
const router = useRouter();

function setCloseShopRoute() {
  router.afterEach(closeShop);
}

function closeShop() {
  isShopClicked.value = false;
  isShopHovered.value = false;
}

// Close dropdown on outside click
let stopSearchWatcher = null;
function setStopSearchWatcher() {
  stopSearchWatcher = watch(searchQuery, (newValue) => {
    if (newValue) {
      document.addEventListener('click', closeDropdown);
    } else {
      document.removeEventListener('click', closeDropdown);
      outsideClickOccurance.value = false;
    }
  });
}

function removeStopSearchWatcher() {
  if (stopSearchWatcher) {
    stopSearchWatcher();
  }
  document.removeEventListener('click', closeDropdown);
}

// Burger Dropdown
const isBurgerDropdownActive = ref(false);

// Prevent Slide-out animations
const isBurgerAnimationActive = ref(false);

function openBurgerDropdown() {
  isBurgerAnimationActive.value = true;
  isBurgerDropdownActive.value = true;
  openModalOverlay();
}
function closeBurgerDropdown() {
  isBurgerDropdownActive.value = false;
  closeModalOverlay();
}

// Product search mobile view control
const isMobileSearchActive = ref(false);
const isSearchAnimationActive = ref(false);
const MobileSearchInput = ref(null);
function openMobileSearch() {
  isSearchAnimationActive.value = true;
  isMobileSearchActive.value = true;
  MobileSearchInput.value?.focus();
}
function closeMobileSearch() {
  isMobileSearchActive.value = false;
}

// Search process
const searchQuery = ref('');
let searchResults = ref([]);

watch(searchQuery, async () => {
  await performQuickSearch();
});

const isFetching = ref(false);
async function performQuickSearch() {
  outsideClickOccurance.value = false;
  const query = searchQuery.value.trim();
  if (!query) {
    searchResults.value = [];
    // closeMobileSearch();
    return;
  }

  try {
    isFetching.value = true;
    openMobileSearch();
    outsideClickOccurance.value = false;
    const res = await api.get(`api/products/search?query=${query}`);
    if (!res.data.length) {
      searchResults.value = [
        { name: 'No match', description: null, images: null },
      ];
      return;
    }
    searchResults.value = res.data.length < 5 ? res.data : res.data.slice(0, 5);
  } catch (err) {
    console.error(err);
  } finally {
    isFetching.value = false;
  }
}

async function performPasteQuickSearch() {
  await nextTick();
  await performQuickSearch();
}

// Authentication popup window
const isAuthPopupActive = ref(false);
const isAuthGreetingsActive = ref(true);
const isAuthLoginActive = ref(false);
const isAuthRegistrationActive = ref(false);

function openAuthPopup() {
  isModalOverlayActive.value = true;
  isAuthPopupActive.value = true;
  document?.body.classList.add('no-scroll');
}
function openAuthLogin() {
  isAuthGreetingsActive.value = false;
  isAuthLoginActive.value = true;
}
function openAuthRegistration() {
  isAuthGreetingsActive.value = false;
  isAuthRegistrationActive.value = true;
}
function authStepBack() {
  if (isAuthRegistrationActive.value) {
    isAuthRegistrationActive.value = false;
    isAuthGreetingsActive.value = true;
  } else if (isAuthLoginActive.value) {
    isAuthLoginActive.value = false;
    isAuthGreetingsActive.value = true;
  } else {
    isAuthPopupActive.value = false;
    isModalOverlayActive.value = false;
    document?.body.classList.remove('no-scroll');
  }
}

// Sign up process
const regName = ref('');
const regPassword = ref('');
async function submitRegistrationForm() {
  isRegistrationSuccessful.value = false;
  nicknameRegError.value = validateNickname(regName.value);
  passwordRegError.value = validatePassword(regPassword.value);

  if (nicknameRegError.value || passwordRegError.value) {
    return;
  }

  const res = await api.post('/api/nicknameAvailability', {
    nickname: regName.value,
  });
  if (!res.data.available) {
    nicknameRegError.value = 'This nickname is already taken';
    return;
  } else {
    nicknameRegError.value = '';
  }

  try {
    await api.post('/api/registration', {
      nickname: regName.value,
      password: regPassword.value,
    });

    isRegistrationSuccessful.value = true;

    loginName.value = regName.value;
    loginPassword.value = regPassword.value;

    regName.value = '';
    regPassword.value = '';

    setTimeout(() => {
      isAuthRegistrationActive.value = false;
      isAuthGreetingsActive.value = true;
      isRegistrationSuccessful.value = false;
      nextTick(() => {
        submitLoginForm();
      });
    }, 2000);
  } catch (err) {
    const msg = err?.response?.data?.message;
    if (msg?.includes('Nickname')) {
      nicknameRegError.value = msg;
    } else if (msg?.includes('Password')) {
      passwordRegError.value = msg;
    } else {
      console.error(err);
    }
  }
}

// Sign up error messages
const nicknameRegError = ref('');
const passwordRegError = ref('');
const isRegistrationSuccessful = ref(false);

function validateNickname(nickname) {
  if (nickname.length < 5) return 'Nickname is too short (min 5 characters)';
  if (nickname.length > 20) return 'Nickname is too long (max 20 characters)';
  if (!/^[a-zA-Z0-9_]+$/.test(nickname))
    return 'Only english letters, numbers and underscores are allowed';

  return null;
}

function validatePassword(password) {
  if (password.length < 5) return 'Password is too short (min 5 characters)';
  if (password.length > 20) return 'Password is too long (max 20 characters)';
  if (!/^[a-zA-Z0-9]+$/.test(password))
    return 'Only english letters and numbers are allowed';
  return null;
}

// Login and Session
const loginName = ref('Guppi');
const loginPassword = ref('123123');
const getSession = useAuthStore().getSession;
async function submitLoginForm() {
  nicknameLoginError.value = validateNickname(loginName.value);
  passwordLoginError.value = validatePassword(loginPassword.value);

  if (nicknameLoginError.value || passwordLoginError.value) {
    return;
  }

  try {
    const response = await api.post('/api/login', {
      nickname: loginName.value,
      password: loginPassword.value,
    });

    const { token } = response.data;
    Cookies.set('token', token, { expires: 1 });

    await getSession();
  } catch (err) {
    const msg = err?.response?.data?.message;
    if (msg?.includes('credentials')) {
      nicknameLoginError.value = '';
      passwordLoginError.value = 'Invalid nickname or password';
    } else {
      console.error(err);
    }
  }
}

// Log in error messages
const nicknameLoginError = ref('');
const passwordLoginError = ref('');

// Log out function
function logMeOut() {
  Cookies.remove('token');
  location.reload();
}

// Set sorting option and go to /shop
const sortingStore = useSortingStore();
const { setSortingOption } = sortingStore;

// Handle an e-mail icon click
function copyEmailToClipboard() {
  const email = 'omel.andrey.99@gmail.com';
  navigator.clipboard
    .writeText(email)
    .then(() => {
      alert(`Email is copied! (${email})`);
    })
    .catch((err) => {
      alert('Something went wrong. Please try another communication link.');
      console.error(err);
    });
}
</script>

<style scoped>
@import '/assets/styles/default_layout.css';
</style>
