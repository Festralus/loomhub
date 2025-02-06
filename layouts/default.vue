<template>
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
    <div v-show="authPopupActive" class="Auth__popup">
      <ArrowIcon
        class="Step-back__arrow cursor-pointer"
        @click="AuthStepBack"
      ></ArrowIcon>
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
        >
          Log out
        </div>
      </div>
      <form v-if="authLoginActive && !nickname" class="Auth__Login">
        <input
          class="Auth__login-input"
          type="text"
          placeholder="Nickname"
          autocomplete="nickname"
          v-model="loginName"
        />
        <input
          class="Auth__password-input"
          type="password"
          placeholder="Password"
          autocomplete="password"
          v-model="loginPassword"
        />
        <button
          class="Auth__popup-btn cursor-pointer select-none"
          @click.prevent="submitLoginForm"
        >
          Log in
        </button>
      </form>
      <form
        class="Auth__Registration"
        v-if="authRegistrationActive && !nickname"
      >
        <input
          class="Auth__login-input"
          type="text"
          placeholder="Nickname"
          autocomplete="nickname"
          v-model="regName"
        />
        <input
          class="Auth__password-input"
          type="password"
          placeholder="Password"
          autocomplete="password"
          v-model="regPassword"
        />
        <button
          class="Auth__popup-btn cursor-pointer select-none"
          @click.prevent="submitRegistrationForm"
        >
          Register
        </button>
      </form>
    </div>
  </header>
  <div class="website mt-16">
    <slot></slot>
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

// Change BaseURL for axios
const api = axios.create({
  baseURL: 'http://localhost:3001',
});

onMounted(() => {
  checkSession();
});

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

// Mobile Search
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
    console.log(err);
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
    console.log(err);
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
    Cookies.set('token', token);
    // console.log(response);
    console.log(`You are: ${response.data.user}. Your token is: ${token}`);
    await checkSession();
  } catch (err) {
    console.log(err);
  }
}
const { nickname, profilePicUrl } = storeToRefs(useAuthStore());
</script>

<style scoped>
/* Mobile && Tablet view */
@media screen and (max-width: 1023px) {
  /* Search button functionality */
  .mobile-search__container {
    height: 44px;
    width: 80%;

    position: absolute;
    top: 10px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #f0f0f0;
    border-radius: 1.5rem;
    /* overflow: hidden; */

    transform-origin: calc(100% - 70px) center;
    transform: scaleX(0);
  }
  .mobile-search__container .search-dropdown {
    position: relative;
    width: 90%;
  }
  .mobile-search__container .search-results {
    position: absolute;
    left: 0;
    top: 33px;

    width: 95%;
    background-color: rgb(226, 199, 199);

    border-radius: 1rem;
  }
  .mobile-search__container .search-input {
    width: 90%;
    margin-left: 0px;
    margin-right: 30px;
    background-color: #f0f0f0;
  }
  .mobile-search__container.active {
    animation: mobileSearchExpand;
    animation-duration: 0.2s;
    animation-timing-function: ease-in;
    animation-fill-mode: forwards;
  }

  .mobile-search__container.closed {
    animation: mobileSearchCollapse;
    animation-duration: 0.2s;
    animation-timing-function: ease-in;
    animation-fill-mode: forwards;
  }
  @keyframes mobileSearchExpand {
    0% {
      transform: scaleX(0);
    }
    100% {
      transform: scaleX(1);
    }
  }
  @keyframes mobileSearchCollapse {
    0% {
      transform: scaleX(1);
    }
    100% {
      transform: scaleX(0);
    }
  }
}

/* Burger menu block */
.BurgerMenu__dropdown {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 140;
  background-color: rgba(255, 255, 255, 0.97);
  width: 46vw;
  max-width: 300px;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;

  transform: translateX(-100%);
}
@keyframes dropdownSlideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}
@keyframes dropdownSlideOut {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}
.BurgerMenu__dropdown.active {
  animation: dropdownSlideIn 0.3s ease-out forwards;
}
.BurgerMenu__dropdown.closed {
  animation: dropdownSlideOut 0.3s ease-out forwards;
}
.BurgerMenu__item {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  text-transform: uppercase;
  text-align: center;
  padding: 8px 0;
  transition:
    color 0.3s,
    transform 0.3s;
}
.BurgerMenu__item:active {
  color: #007bff;
  transform: scale(1.05);
}

/* Animation on-load debug */
.BurgerMenu__dropdown.no-animation,
.mobile-search__container.no-animation {
  animation: none;
}

.top-menu__nav-item {
  display: flex;
  align-items: center;
}

.search-results {
  position: absolute;
  left: 0;
  top: 33px;

  width: 98%;
  padding: 10px;
  background-color: rgb(226, 199, 199);

  border-radius: 1rem;
}

.Auth__popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 140;

  width: 70vw;
  max-width: 440px;
  border-radius: 2rem;

  padding: 40px;
  background-color: rgb(226, 199, 199);
}
.Step-back__arrow {
  position: absolute;
  left: 16px;
  top: 20px;
  transform: rotate(180deg);
}
.Auth__Greetings {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
}
.Auth__popup-btn {
  background-color: black;
  color: white;
  font-family: 'Satoshi-Regular';
  font-size: 26px;
  text-align: center;

  padding: 10px 30px;
  border-radius: 1rem;
}
.Auth__user-nickname {
  text-align: center;
  font-family: 'Satoshi-Bold';
  font-size: 40px;
}
.Auth__user-avatar {
  width: 200px;
  border-radius: 50%;
  margin-left: auto;
  margin-right: auto;
}
</style>
