<template>
  <div>
    <In_development_component
      v-if="showInDev"
      :target="currentTarget"
      :inDevActive="showInDev"
      @close="showInDev = false"
    />
    <header
      class="top-menu fixed left-0 top-0 z-[100] flex h-[64px] w-full flex-row items-center justify-between bg-white"
    >
      <div
        class="BurgerMenuIcon__container flex w-[12%] sm:hidden"
        @click="openBurgerDropdown"
      >
        <BurgerMenuIcon class="m-auto h-6 w-6 flex-shrink-0 sm:hidden" />
      </div>
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
        class="native-overlay native-shop-hover-overlay hidden sm:block"
        :class="{
          active: isShopHovered,
        }"
      ></div>
      <div
        class="BurgerMenu__dropdown"
        :class="{
          active: isBurgerDropdownActive,
          closed: !isBurgerDropdownActive,
          'no-animation': !isBurgerAnimationActive,
        }"
      >
        <!-- <NuxtLink to="/shop" class="BurgerMenu__item">Shop</NuxtLink>
        <NuxtLink to="/top_selling" class="BurgerMenu__item"
          >Top Selling</NuxtLink
        >
        <NuxtLink to="/new_arrivals" class="BurgerMenu__item"
          >New Arrivals</NuxtLink
        >
        <NuxtLink to="/brands" class="BurgerMenu__item">Brands</NuxtLink> -->
        <div @click="openInDev('Shopping Navigation')" class="BurgerMenu__item">
          Shop
        </div>
        <div @click="openInDev('Shopping Navigation')" class="BurgerMenu__item">
          Top Selling
        </div>
        <div @click="openInDev('Shopping Navigation')" class="BurgerMenu__item">
          New Arrivals
        </div>
        <div @click="openInDev('Shopping Navigation')" class="BurgerMenu__item">
          Brands
        </div>
      </div>
      <NuxtLink
        to="/"
        class="top-menu__logo IntergralExtraBold mb-2 mt-0 cursor-pointer select-none text-2xl leading-none sm:ml-[10%] sm:block 2xl:ml-[6%] 2xl:text-3xl"
        :class="isMobileSearchActive ? 'hidden' : ''"
      >
        LOOM.HUB
      </NuxtLink>
      <nav
        class="top-menu__nav SatoshiRegular hidden max-h-[10px] flex-row text-base sm:flex sm:w-full sm:justify-evenly lg:flex xl:w-[30%] 2xl:text-xl"
        :class="{ 'sm:hidden': isMobileSearchActive }"
      >
        <!-- <div
          @mouseover="isShopHovered = true"
          @mouseleave="isShopHovered = false"
          :class="{ 'z-[140]': isShopHovered }"
          class="top-menu__nav-item top-menu__nav-item__shop relative hidden cursor-pointer flex-row items-center 2xl:flex"
        >
          <div class="top-menu__nav-item__shop-text">Shop</div>
          <PointerIcon
            class="top-menu__nav-item top-menu__nav-item__shop-arrow mt-[2px] h-6 pl-[3px] 2xl:w-[14px]"
          ></PointerIcon>
          <div v-show="isShopHovered" class="top-menu__nav-item__shop-dropdown">
            <NuxtLink
              v-for="(style, index) in dress_styles_list"
              :key="index"
              :to="style.path"
              class="shop-dropdown__item"
            >
              {{ style.name }}
            </NuxtLink>
          </div>
        </div> -->
        <div
          @mouseenter="isShopHovered = true"
          @mouseleave="isShopHovered = false"
          :class="{ 'z-[140]': isShopHovered }"
          class="top-menu__nav-item top-menu__nav-item__shop relative hidden cursor-pointer flex-row items-center 2xl:flex"
        >
          <div class="top-menu__nav-item__shop-text">Shop</div>
          <PointerIcon
            class="top-menu__nav-item__shop-arrow mt-[2px] h-6 pl-[3px] 2xl:w-[14px]"
          />
          <!-- Dropdown menu -->
          <div
            v-show="isShopHovered"
            class="top-menu__nav-item__shop-dropdown relative flex flex-col gap-2 p-2"
          >
            <!-- <NuxtLink
              v-for="(style, index) in dress_styles_list"
              :key="index"
              :to="style.path"
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
            >
              <span class="relative z-10 text-lg font-semibold">{{
                style.name
              }}</span>

              <div
                v-if="hoveredIndex !== index"
                class="shop-dropdown__item__shadow"
              ></div>
            </NuxtLink> -->
            <div
              v-for="(style, index) in dress_styles_list"
              @click="openInDev('Shopping Navigation')"
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
            >
              <span class="relative z-10 text-lg font-semibold">{{
                style.name
              }}</span>

              <div
                v-if="hoveredIndex !== index"
                class="shop-dropdown__item__shadow"
              ></div>
            </div>
          </div>
        </div>

        <!-- <NuxtLink
          to="/shop"
          class="top-menu__nav-item top-menu__nav-item__shop relative flex cursor-pointer flex-row items-center 2xl:hidden"
        >
          <div class="top-menu__nav-item__shop-text">Shop</div>
        </NuxtLink>
        <NuxtLink to="/on_sale" class="top-menu__nav-item flex"
          >On Sale</NuxtLink
        >
        <NuxtLink to="/new_arrivals" class="top-menu__nav-item flex"
          >New Arrivals</NuxtLink
        >
        <NuxtLink to="/brands" class="top-menu__nav-item flex">Brands</NuxtLink> -->
        <div
          @click="openInDev('Shopping Navigation')"
          class="top-menu__nav-item top-menu__nav-item__shop relative flex cursor-pointer flex-row items-center 2xl:hidden"
        >
          <div
            @click="openInDev('Shopping Navigation')"
            class="top-menu__nav-item__shop-text cursor-pointer"
          >
            Shop
          </div>
        </div>
        <div
          @click="openInDev('Shopping Navigation')"
          class="top-menu__nav-item flex cursor-pointer"
        >
          On Sale
        </div>
        <div
          @click="openInDev('Shopping Navigation')"
          class="top-menu__nav-item flex cursor-pointer"
        >
          New Arrivals
        </div>
        <div
          @click="openInDev('Shopping Navigation')"
          class="top-menu__nav-item flex cursor-pointer"
        >
          Brands
        </div>
      </nav>
      <div
        class="top-menu__search hidden w-full flex-row rounded-3xl bg-[#F0F0F0] p-2 lg:flex xl:w-[40vw]"
        :class="{ 'z-[140]': searchQuery }"
        @click="focusHomePageSearch"
        ref="searchContainer"
      >
        <SearchIconGray
          class="top-menu__search-icon mr-3 hidden pl-1 lg:block"
          aria-label="Search"
        />
        <div class="top-menu__search-dropdown relative hidden w-full lg:block">
          <input
            type="text"
            class="top-menu__search-input h-6 w-[99%] bg-[#F0F0F0]"
            placeholder="Search for products..."
            aria-label="Search for products"
            ref="HomePageSearch"
            v-model="searchQuery"
            @input="performQuickSearch"
            @change="performQuickSearch"
            @paste="performPasteQuickSearch"
            @focus="openDropdown"
          />
          <Search_results_dropdown
            v-show="searchQuery && !outsideClickOccurance"
            :query="searchQuery"
            :searchResults="searchResults"
          ></Search_results_dropdown>
        </div>
      </div>
      <div
        class="top-menu__actions mr-4 flex w-[30%] flex-shrink-0 flex-row justify-end sm:w-auto xl:mr-6 xl:w-[10%]"
        :class="{ 'z-[140]': searchQuery }"
      >
        <SearchIconBlack
          class="top-menu__search-icon lg:hidden"
          :class="isMobileSearchActive ? 'hidden' : ''"
          aria-label="Search"
          @click="openMobileSearch"
        />
        <div
          class="mobile-search__container hidden sm:max-w-[64%]"
          :class="{
            active: isMobileSearchActive,
            closed: !isMobileSearchActive,
            'no-animation': !isSearchAnimationActive,
          }"
          ref="mobileSearchContainer"
        >
          <SearchIconGray
            class="top-menu__search-icon ml-2 mr-3"
            aria-label="Search"
            @click="(closeMobileSearch(), (outsideClickOccurance = true))"
          />
          <div class="search-dropdown">
            <input
              type="text"
              class="search-input"
              placeholder="Search for products..."
              aria-label="Search for products"
              ref="MobileSearchInput"
              v-model="searchQuery"
              @input="performQuickSearch"
              @change="performQuickSearch"
              @paste="performPasteQuickSearch"
              @click="openDropdown"
              @focus="openDropdown"
            />

            <Search_results_dropdown
              v-show="searchQuery && !outsideClickOccurance"
              :query="searchQuery"
              :searchResults="searchResults"
            ></Search_results_dropdown>
          </div>
        </div>
        <!-- <NuxtLink
          to="/cart"
          class="top-menu__actions-cart ml-[14px] lg:block"
          :class="isMobileSearchActive ? 'hidden' : ''"
          ><CartIcon></CartIcon
        ></NuxtLink> -->
        <div
          class="top-menu__actions-cart ml-[14px] cursor-pointer lg:block"
          :class="isMobileSearchActive ? 'hidden' : ''"
          @click="openInDev('Cart')"
        >
          <CartIcon></CartIcon>
        </div>
        <ProfileIcon
          class="top-menu__actions-profile ml-[14px] cursor-pointer lg:block"
          :class="isMobileSearchActive ? 'hidden' : ''"
          @click="openAuthPopup"
        ></ProfileIcon>
      </div>
      <!-- Modal -->
      <div
        v-show="authPopupActive"
        class="Auth__popup fixed left-[50%] top-[50%] z-[140] w-[90vw] max-w-[500px] -translate-x-[50%] -translate-y-[50%] rounded-3xl bg-white pb-5 pl-3 pr-3 pt-12 sm:w-[80vw] sm:pb-8 sm:pl-10 sm:pr-10 sm:pt-12 lg:w-[70vw]"
      >
        <div
          class="Step-back__arrow-container cursor-pointer"
          @click="AuthStepBack"
        >
          <ArrowIcon class="Step-back__arrow"></ArrowIcon>
        </div>
        <div v-if="authGreetingsActive && !nickname" class="Auth__Greetings">
          <div
            class="Auth__popup-btn Login-button cursor-pointer select-none"
            @click="openAuthLogin"
          >
            Login
          </div>
          <div
            class="Auth__popup-btn Registration-button cursor-pointer select-none"
            @click="openAuthRegistration"
          >
            Sign up
          </div>
        </div>
        <div v-if="nickname">
          <div class="Auth__user-nickname">{{ nickname }}</div>
          <img
            :src="`${profilePicUrl}`"
            v-show="profilePicUrl"
            class="Auth__user-avatar"
          />
          <div
            class="End-session__button Auth__popup-btn cursor-pointer select-none"
            @click="logMeOut"
          >
            Log out
          </div>
        </div>
        <form v-if="authLoginActive && !nickname" class="Auth__Login">
          <input
            class="Auth-input Auth__login-input"
            type="text"
            placeholder="Nickname"
            autocomplete="nickname"
            v-model="loginName"
          />
          <input
            class="Auth-input Auth__password-input"
            type="password"
            placeholder="Password"
            autocomplete="password"
            v-model="loginPassword"
          />
          <button
            class="Auth__popup-btn mx-auto block cursor-pointer select-none"
            @click.prevent="submitLoginForm"
          >
            Login
          </button>
        </form>
        <form
          class="Auth__Registration"
          v-if="authRegistrationActive && !nickname"
        >
          <input
            class="Auth-input Auth__login-input"
            type="text"
            placeholder="Nickname"
            autocomplete="nickname"
            v-model="regName"
            @keyup="checkNicknameAvailability"
          />
          <input
            class="Auth-input Auth__password-input"
            type="password"
            placeholder="Password"
            autocomplete="password"
            v-model="regPassword"
          />
          <button
            class="Auth__popup-btn mx-auto cursor-pointer select-none"
            @click.prevent="submitRegistrationForm"
          >
            Register
          </button>
        </form>
      </div>
    </header>
    <div
      class="website mt-16"
      :class="{ 'website-padding': useWebsitePadding }"
    >
      <slot></slot>
    </div>
    <footer class="mb-6">
      <div class="footer__branding ml-4 block lg:ml-0 lg:text-center">
        <div class="share__title IntegralBold mt-6 text-2xl">LOOM.HUB</div>
        <div
          class="share__description SatoshiRegular mt-3 text-[16px] leading-[22px] text-gray-500"
        >
          The place where fashion meets your lifestyle. Explore the collection
          today.
        </div>
        <div class="footer__socials mt-4 flex gap-3 lg:justify-center">
          <ShareTwitterX class="share__icon"></ShareTwitterX>
          <ShareFacebook class="share__icon"></ShareFacebook>
          <ShareInstagram class="share__icon"></ShareInstagram>
          <ShareGithub class="share__icon"></ShareGithub>
        </div>
      </div>
      <div class="footer__links mx-1 mt-8 flex flex-wrap justify-center">
        <div class="links__container inline-flex">
          <div class="links__block pb-6">
            <div
              class="footer__section-title SatoshiRegular text-base tracking-[3px]"
            >
              COMPANY
            </div>
            <NuxtLink to="/" class="links__link">About</NuxtLink>
            <NuxtLink to="/" class="links__link">Features</NuxtLink>
            <NuxtLink to="/" class="links__link">Works</NuxtLink>
            <NuxtLink to="/" class="links__link">Career</NuxtLink>
          </div>
          <div class="links__block pb-6">
            <div
              class="footer__section-title SatoshiRegular text-base tracking-[3px]"
            >
              HELP
            </div>
            <NuxtLink to="/" class="links__link">Customer support</NuxtLink>
            <NuxtLink to="/" class="links__link">Delivery Details</NuxtLink>
            <NuxtLink to="/" class="links__link">Terms & Conditions</NuxtLink>
            <NuxtLink to="/" class="links__link">Privacy Policy</NuxtLink>
          </div>
        </div>
        <div class="links__container inline-flex">
          <div class="links__block pb-6">
            <div
              class="footer__section-title SatoshiRegular text-base tracking-[3px]"
            >
              FAQ
            </div>
            <NuxtLink to="/" class="links__link">Account</NuxtLink>
            <NuxtLink to="/" class="links__link">Manage Deliveries</NuxtLink>
            <NuxtLink to="/" class="links__link">Orders</NuxtLink>
            <NuxtLink to="/" class="links__link">Payment</NuxtLink>
          </div>
          <div class="links__block pb-6">
            <div
              class="footer__section-title SatoshiRegular text-base tracking-[3px]"
            >
              RESOURCES
            </div>
            <NuxtLink to="/" class="links__link">Free eBook</NuxtLink>
            <NuxtLink to="/" class="links__link">Developer Tutorial</NuxtLink>
            <NuxtLink to="/" class="links__link">How to - Blog</NuxtLink>
            <NuxtLink to="/" class="links__link">Youtube Playlist</NuxtLink>
          </div>
        </div>
      </div>
      <div class="horizontal-separator-90 mt-8"></div>
      <div
        class="footer__copyright SatoshiRegular mt-4 text-center text-base text-gray-500"
      >
        Loom.hub © 2024-2025, All rights reserved
      </div>
      <div class="footer__payment-methods mt-4 flex justify-center gap-3">
        <PaymentVisaIcon class="footer__payment_method"></PaymentVisaIcon>
        <PaymentMastercardIcon
          class="footer__payment_method"
        ></PaymentMastercardIcon>
        <PaymentPaypalIcon class="footer__payment_method"></PaymentPaypalIcon>
        <PaymentAppleIcon class="footer__payment_method"></PaymentAppleIcon>
        <PaymentGoogleIcon class="footer__payment_method"></PaymentGoogleIcon>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted } from 'vue';
import { useAuthStore } from '@/stores/index';
import { storeToRefs } from 'pinia';
const route = useRoute();

import axios from 'axios';
import Cookies from 'js-cookie';

import dress_styles_list from '~/data/dress_styles.js';
import Search_results_dropdown from '~/components/search_results_dropdown.vue';

import ArrowIcon from '../assets/icons/ArrowIcon.vue';
import BurgerMenuIcon from '../assets/icons/BurgerMenuIcon.vue';
import CartIcon from '../assets/icons/CartIcon.vue';
import PointerIcon from '../assets/icons/PointerIcon.vue';
import ProfileIcon from '../assets/icons/ProfileIcon.vue';
import SearchIconBlack from '../assets/icons/SearchIconBlack.vue';
import SearchIconGray from '../assets/icons/SearchIconGray.vue';
import PaymentAppleIcon from '../assets/icons/PaymentAppleIcon.vue';
import PaymentGoogleIcon from '../assets/icons/PaymentGoogleIcon.vue';
import PaymentMastercardIcon from '../assets/icons/PaymentMastercardIcon.vue';
import PaymentPaypalIcon from '../assets/icons/PaymentPaypalIcon.vue';
import PaymentVisaIcon from '../assets/icons/PaymentVisaIcon.vue';
import ShareTwitterX from '../assets/icons/ShareTwitterXIcon.vue';
import ShareFacebook from '../assets/icons/ShareFacebookIcon.vue';
import ShareInstagram from '../assets/icons/ShareInstagramIcon.vue';
import ShareGithub from '../assets/icons/ShareGithubIcon.vue';

import In_development_component from '@/components/in_development_component.vue';

// In development popup
const showInDev = ref(false);
const currentTarget = ref('');
function openInDev(string) {
  currentTarget.value = string;
  showInDev.value = true;
}

const config = useRuntimeConfig();
const api = axios.create({
  baseURL: config.public.apiBase,
});
// const api = useApi();

onMounted(() => {
  checkSession();

  watch(searchQuery, (newValue) => {
    if (newValue) {
      document.addEventListener('click', closeDropdown);
    } else {
      document.removeEventListener('click', closeDropdown);
      outsideClickOccurance.value = false;
    }
  });
});

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown);
});

// Padding for certain pages
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

// EXP EXP EXP

const hoveredIndex = ref(null);

// EXP EXP EXP

// Focus search upon opening it
const HomePageSearch = ref();
function focusHomePageSearch() {
  HomePageSearch.value?.focus();
}

// Modal Background
const isModalOverlayActive = ref(false);
function openModalOverlay() {
  isModalOverlayActive.value = true;
}
function closeModalOverlay() {
  if (isBurgerDropdownActive.value) {
    closeBurgerDropdown();
  }
  if (authPopupActive) {
    authPopupActive.value = false;
  }
  isModalOverlayActive.value = false;
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

async function performQuickSearch() {
  outsideClickOccurance.value = false;
  const query = searchQuery.value.trim();
  if (!query) {
    searchResults.value = [];
    // closeMobileSearch();
    return;
  }

  try {
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
  }
}

async function performPasteQuickSearch() {
  await nextTick();
  performQuickSearch();
}

// Authentication popup window
const authPopupActive = ref(false);
const authGreetingsActive = ref(true);
const authLoginActive = ref(false);
const authRegistrationActive = ref(false);

function openAuthPopup() {
  isModalOverlayActive.value = true;
  authPopupActive.value = true;
}
function openAuthLogin() {
  authGreetingsActive.value = false;
  authLoginActive.value = true;
}
function openAuthRegistration() {
  authGreetingsActive.value = false;
  authRegistrationActive.value = true;
}
function AuthStepBack() {
  if (authRegistrationActive.value) {
    authRegistrationActive.value = false;
    authGreetingsActive.value = true;
  } else if (authLoginActive.value) {
    authLoginActive.value = false;
    authGreetingsActive.value = true;
  } else {
    authPopupActive.value = false;
    isModalOverlayActive.value = false;
  }
}

// Sign up
const regName = ref('');
const regPassword = ref('');
async function submitRegistrationForm() {
  try {
    await api.post('/api/registration', {
      nickname: regName.value,
      password: regPassword.value,
    });
  } catch (err) {
    console.error(err);
  }
}

async function checkNicknameAvailability() {
  try {
    const response = await api.post('/api/nicknameAvailability', {
      nickname: regName.value,
    });
    console.log(response);
  } catch (err) {
    console.error(err);
  }
}

// Login and Session
const loginName = ref('Guppi');
const loginPassword = ref('123123');
const checkSession = useAuthStore().checkSession;
async function submitLoginForm() {
  try {
    const response = await api.post('/api/login', {
      nickname: loginName.value,
      password: loginPassword.value,
    });
    const { token } = response.data;
    Cookies.set('token', token, { expires: 1 });

    // console.log(`You are: ${response.data.user}. Your token is: ${token}`);

    await checkSession();
  } catch (err) {
    console.error(err);
  }
}

// Log out function
function logMeOut() {
  Cookies.remove('token');
  location.reload();
}
</script>

<style scoped>
@import '/assets/styles/default_layout.css';
</style>
