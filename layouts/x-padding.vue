<template>
  <div>
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
        class="BurgerMenu__dropdown"
        :class="{
          active: isBurgerDropdownActive,
          closed: !isBurgerDropdownActive,
          'no-animation': !isBurgerAnimationActive,
        }"
      >
        <NuxtLink to="/shop" class="BurgerMenu__item">Shop</NuxtLink>
        <NuxtLink to="/on_sale" class="BurgerMenu__item">On Sale</NuxtLink>
        <NuxtLink to="/new_arrivals" class="BurgerMenu__item"
          >New Arrivals</NuxtLink
        >
        <NuxtLink to="/brands" class="BurgerMenu__item">Brands</NuxtLink>
      </div>
      <NuxtLink
        to="/"
        class="top-menu__logo IntergralExtraBold mb-2 mt-0 cursor-pointer select-none text-2xl leading-none sm:ml-[10%] sm:block 2xl:ml-[6%] 2xl:text-3xl"
        :class="isSearchActive ? 'hidden' : ''"
      >
        LOOM.HUB
      </NuxtLink>
      <nav
        class="top-menu__nav SatoshiRegular hidden max-h-[10px] flex-row text-base sm:flex sm:w-full sm:justify-evenly lg:flex xl:w-[30%] 2xl:text-xl"
        :class="{ 'sm:hidden': isSearchActive }"
      >
        <div
          class="top-menu__nav-item top-menu__nav-item--shop flex flex-row items-center"
        >
          <NuxtLink to="/shop" class="top-menu__nav-item--shop-text"
            ><div>Shop</div></NuxtLink
          >
          <PointerIcon
            class="top-menu__nav-item top-menu__nav-item--shop-dropdown size-3 pl-1 2xl:size-[14px]"
          ></PointerIcon>
        </div>
        <NuxtLink to="/on_sale" class="top-menu__nav-item">On Sale</NuxtLink>
        <NuxtLink to="/new_arrivals" class="top-menu__nav-item"
          >New Arrivals</NuxtLink
        >
        <NuxtLink to="/brands" class="top-menu__nav-item">Brands</NuxtLink>
      </nav>
      <div
        class="top-menu__search hidden w-full flex-row rounded-3xl bg-[#F0F0F0] p-2 lg:flex xl:w-[40vw]"
        @click="focusHomePageSearch"
      >
        <SearchIconGray
          class="top-menu__search-icon mr-3 hidden pl-1 lg:block"
          aria-label="Search"
        />
        <div class="top-menu__search-dropdown relative hidden w-full lg:block">
          <input
            type="text"
            class="top-menu__search-input h-6 w-full bg-[#F0F0F0]"
            placeholder="Search for products..."
            aria-label="Search for products"
            ref="HomePageSearch"
            v-model="searchQuery"
            @input="performQuickSearch"
            @change="performQuickSearch"
            @paste="performPasteQuickSearch"
          />
          <Search_results_dropdown
            v-show="searchQuery"
            :query="searchQuery"
            :searchResults="searchResults"
          ></Search_results_dropdown>
        </div>
      </div>
      <div
        class="top-menu__actions mr-4 flex w-[30%] flex-shrink-0 flex-row justify-end sm:w-auto xl:mr-6 xl:w-[10%]"
      >
        <SearchIconBlack
          class="top-menu__search-icon lg:hidden"
          :class="isSearchActive ? 'hidden' : ''"
          aria-label="Search"
          @click="openMobileSearch"
        />
        <div
          class="mobile-search__container hidden sm:max-w-[64%]"
          :class="{
            active: isSearchActive,
            closed: !isSearchActive,
            'no-animation': !isSearchAnimationActive,
          }"
        >
          <SearchIconGray
            class="top-menu__search-icon ml-2 mr-3"
            aria-label="Search"
            @click="closeMobileSearch"
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
            />

            <Search_results_dropdown
              v-show="searchQuery"
              :query="searchQuery"
              :searchResults="searchResults"
            ></Search_results_dropdown>
          </div>
        </div>
        <NuxtLink
          to="/cart"
          class="top-menu__actions-cart ml-[14px] lg:block"
          :class="isSearchActive ? 'hidden' : ''"
          ><CartIcon></CartIcon
        ></NuxtLink>
        <ProfileIcon
          class="top-menu__actions-profile ml-[14px] cursor-pointer lg:block"
          :class="isSearchActive ? 'hidden' : ''"
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
    <div class="website website-padding mt-16">
      <slot></slot>
    </div>
    <footer class="mb-6">
      <div class="footer__branding ml-4 block lg:ml-0 lg:text-center">
        <div class="share__title IntegralBold mt-6 text-2xl">LOOM.HUB</div>
        <div
          class="share__description SatoshiRegular mt-3 text-base text-gray-500"
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

// Change BaseURL for axios
const api = axios.create({
  baseURL: 'http://localhost:3001',
});

onMounted(() => {
  checkSession();
});

// Global variables
const { nickname, profilePicUrl } = storeToRefs(useAuthStore());

// Empty search every page route
watch(
  () => route.path,
  () => {
    searchQuery.value = '';
  }
);

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

// Product search
const isSearchActive = ref(false);
const isSearchAnimationActive = ref(false);
const MobileSearchInput = ref(null);
function openMobileSearch() {
  isSearchAnimationActive.value = true;
  isSearchActive.value = true;
  MobileSearchInput.value?.focus();
}
function closeMobileSearch() {
  isSearchActive.value = false;
}

const searchQuery = ref('');
let searchResults = ref([]);

watch(searchQuery, async () => {
  await performQuickSearch();
});

async function performQuickSearch() {
  const query = searchQuery.value.trim();
  if (!query) {
    searchResults.value = [];
    return;
  }

  try {
    const res = await api.get(`api/products/search?query=${query}`);
    if (!res.data.length) {
      searchResults.value = [{ name: 'No match' }];
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

.website-padding {
  padding: 0px calc(min(7vw, 100px));
}
</style>
