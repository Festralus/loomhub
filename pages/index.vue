<template>
  <div class="website">
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
        :class="isBurgerDropdownActive ? 'active' : 'closed'"
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
        :class="isSearchActive ? 'sm:hidden' : ''"
      >
        <div
          class="top-menu__nav-item top-menu__nav-item--shop flex flex-row items-center"
        >
          <NuxtLink to="/shop" class="top-menu__nav-item--shop-text"
            >Shop</NuxtLink
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
          :class="isSearchActive ? 'active' : 'closed'"
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
          class="top-menu__actions-profile ml-[14px] lg:block"
          :class="isSearchActive ? 'hidden' : ''"
          @click="openAuthPopup"
        ></ProfileIcon>
      </div>
    </header>
    <div v-show="authPopupActive" class="Auth__popup">
      <ArrowIcon class="Step-back__arrow" @click="AuthStepBack"></ArrowIcon>
      <div v-show="authGreetingsActive" class="Auth__Greetings">
        <div class="Auth__popup-btn Login-button" @click="openAuthLogin">
          Login
        </div>
        <div
          class="Auth__popup-btn Registration-button"
          @click="openAuthRegistration"
        >
          Sign up
        </div>
      </div>
      <div v-show="authLoginActive" class="Auth__Login">
        <input
          class="Auth__login-input"
          type="text"
          placeholder="Nickname"
          v-model="loginName"
        />
        <input
          class="Auth__password-input"
          type="password"
          placeholder="Password"
          v-model="loginPassword"
        />
        <button class="Auth__popup-btn" @click="submitLoginForm">Log in</button>
      </div>
      <div class="Auth__Registration" v-show="authRegistrationActive">
        <input
          class="Auth__login-input"
          type="text"
          placeholder="Nickname"
          v-model="regName"
        />
        <input
          class="Auth__password-input"
          type="password"
          placeholder="Password"
          v-model="regPassword"
        />
        <button class="Auth__popup-btn" @click="submitRegistrationForm">
          Register
        </button>
      </div>
    </div>
    <div
      class="home-description relative z-50 mt-[64px] w-[100vw] bg-[#f2f0f1] xl:flex xl:flex-nowrap xl:justify-evenly 2xl:items-center 2xl:justify-between"
    >
      <div
        class="home-description__interactive relative z-30 px-4 xl:max-w-[940px] 2xl:mx-auto 2xl:text-center"
      >
        <h2
          class="home-description__interactive--main-text IntergralExtraBold xl:pt-22 max-w-[576px] text-4xl leading-tight xl:text-6xl 2xl:max-w-full"
        >
          FIND CLOTHES THAT MATCHES YOUR STYLE
        </h2>
        <div
          class="home-description__interactive--secondary-text SatoshiRegular nowrap mt-4 text-[14px] lg:text-xl"
        >
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of
          style.
        </div>
        <button
          class="home-description__interactive--button SatoshiRegular16White mx-auto mt-5 flex h-12 w-[100%] max-w-[430px] items-center justify-center rounded-3xl bg-black"
        >
          Shop Now
        </button>
        <div
          class="home-description__stats mt-4 flex flex-wrap justify-center gap-y-4"
        >
          <div
            class="home-description__stat-block home-description__stats-brands SatoshiRegular px-4 pt-2 text-[12px] leading-4 lg:text-base"
          >
            <span class="SatoshiBold24">200+</span> <br />International Brands
          </div>
          <div
            class="home-description__stat-block home-description__stats-products SatoshiRegular px-4 pt-2 text-[12px] leading-4 lg:text-base"
          >
            <span class="SatoshiBold24">2,000+</span> <br />High-Quality
            Products
          </div>
          <div
            class="home-description__stat-block home-description__stats-customers SatoshiRegular px-4 pt-2 text-[12px] leading-4 lg:text-base"
          >
            <span class="SatoshiBold24">30,000+</span><br />
            Happy Customers
          </div>
        </div>
      </div>
      <div
        class="home-description__background relative z-0 mx-auto max-w-[700px] overflow-clip"
      >
        <StarIcon
          class="home-description__background--big-star absolute"
        ></StarIcon>
        <StarIcon
          class="home-description__background--small-star absolute top-[20vw] xl:top-[10vw]"
        ></StarIcon>
        <picture>
          <source
            srcset="https://i.imgur.com/Mea753h.png"
            media="(max-width: 400px)"
          />
          <source
            srcset="https://i.imgur.com/sqNcZ0J.png"
            media="(min-width: 401px)"
          />
          <img
            class="home-description__background--image -mb-4 bg-center object-center"
            src="https://i.imgur.com/sqNcZ0J.png"
            alt="Background image"
          />
        </picture>
      </div>
    </div>
    <div
      class="popular-brands flex w-[100vw] flex-row flex-wrap justify-evenly bg-black pb-3 pt-5"
    >
      <VersaceIcon
        class="popular-brands__certain-brand mx-3 my-2"
      ></VersaceIcon>
      <ZaraIcon class="popular-brands__certain-brand mx-3 my-2"></ZaraIcon>
      <GucciIcon class="popular-brands__certain-brand mx-3 my-2"></GucciIcon>
      <PradaIcon class="popular-brands__certain-brand mx-3 my-2"></PradaIcon>
      <CalvinKleinIcon
        class="popular-brands__certain-brand mx-3 my-2"
      ></CalvinKleinIcon>
    </div>
    <div class="new-arrivals">
      <div
        class="new-arrivals__title IntergralExtraBold mb-6 mt-9 text-center text-[32px] leading-none"
      >
        NEW ARRIVALS
      </div>
      <Slider_component
        class="new-arrivals__items"
        :productsList="newArrivalsList"
        :getSliderProducts="() => getSliderProducts('getNewArrivals')"
      ></Slider_component>
      <div
        class="new-arrivals__button button-border SatoshiRegular mx-auto mt-5 flex w-[90%] max-w-[600px] justify-center rounded-[62px] py-3 text-base"
      >
        View All
      </div>
      <div class="horizontal-separator mt-10"></div>
    </div>
    <div class="top-selling mt-10">
      <div
        class="top-selling__title IntergralExtraBold mb-6 mt-9 text-center text-[32px] leading-none"
      >
        TOP SELLING
      </div>
      <Slider_component
        class="top-selling__items"
        :productsList="topSellingList"
        :getSliderProducts="() => getSliderProducts('getTopSelling')"
      ></Slider_component>
      <div
        class="new-arrivals__button button-border SatoshiRegular mx-auto mt-5 flex w-[90%] max-w-[600px] justify-center rounded-[62px] py-3 text-base"
      >
        View All
      </div>
    </div>
    <div
      class="style-masonry mx-auto mt-10 w-[1800px] max-w-[94vw] rounded-2xl bg-[#F0F0F0] pb-2 pt-9"
    >
      <div
        class="style-masonry__title IntergralExtraBold mb-7 px-10 text-center text-[32px] leading-none"
      >
        BROWSE BY DRESS STYLE
      </div>
      <div
        class="style-masonry__tileset relative flex flex-col flex-wrap items-center justify-center px-2 xl:flex-row xl:gap-5"
      >
        <div
          v-for="(style, index) in dress_styles_list"
          :key="style.name"
          class="style-masonry__tile relative mb-4 w-[90%] rounded-3xl bg-white"
          :class="[
            index === 1 || index === 2
              ? 'style-masonry__tile-big'
              : 'style-masonry__tile-small',
          ]"
        >
          <div
            class="style-masonry__tile-text SatoshiBold absolute ml-6 mt-4 text-2xl"
          >
            {{ style.name }}
          </div>
          <picture>
            <source
              :srcset="`${style.backgroundPicture}.png`"
              media="(max-width: 400px)"
            />
            <source
              :srcset="`${style.backgroundPicture}-xl.png`"
              media="(min-width: 401px)"
            />
            <img
              class="style-masonry__tile-background rounded-3xl"
              :src="`${style.backgroundPicture}-xl.png`"
              alt="Background image"
            />
          </picture>
        </div>
      </div>
    </div>
    <div class="reviews mt-10">
      <div class="reviews__header mx-4 flex">
        <div
          class="reviews__title IntergralExtraBold mr-10 text-left text-[32px] leading-none"
        >
          OUR HAPPY CUSTOMERS
        </div>
        <div class="reviews__arrows mt-auto flex sm:hidden">
          <ArrowIcon
            class="reviews__arrow--left mr-4 size-6 rotate-180"
            @click="scrollToCard(reviewCardIndex - 1)"
          ></ArrowIcon>
          <ArrowIcon
            class="reviews__arrow--right size-6"
            @click="scrollToCard(reviewCardIndex + 1)"
          ></ArrowIcon>
        </div>
      </div>
      <div class="reviews__cards-container" ref="reviewCardsContainer">
        <div class="reviews__cards">
          <div
            class="reviews__card button-border mx-4 mt-6 h-[180px] w-[340px] rounded-3xl border-gray-500 p-6"
            v-for="review in websiteReviewsArray"
            :key="'main' + review.id"
            ref="reviewCardRefs"
          >
            <div class="reviews__card-rating mt-1 flex items-center">
              <span class="flex">
                <RatingStarIcon
                  v-for="n in Math.floor(review.rating)"
                  :key="'full-' + review.id"
                  class="h-5 w-5"
                />
                <RatingEmptyStarIcon
                  v-for="n in Math.floor(5 - review.rating)"
                  :key="'empty-' + review.id"
                  class="h-5 w-5"
                />
              </span>
            </div>
            <div class="reviews__card-name__line flex items-end">
              <div class="reviews__card-name SatoshiBold mt-2 text-base">
                {{ review.user }}
              </div>
              <VerifiedTickIcon
                class="reviews__card-verified mb-1 ml-1 size-4"
              ></VerifiedTickIcon>
            </div>
            <div class="reviews__card-text SatoshiRegular mt-1 text-gray-500">
              {{ review.comment }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="subscribe_container mx-auto mt-12 w-[1100px] max-w-[94vw] overflow-hidden rounded-2xl bg-black"
    >
      <div
        class="subscribe__title IntegralBold px-6 pt-8 text-center text-[1.8rem] leading-9 text-white"
      >
        STAY UP TO DATE ABOUT OUR BEST OFFERS
      </div>
      <div
        class="subscribe__input_block mx-auto mt-8 flex h-[42px] w-[311px] items-center overflow-hidden rounded-3xl bg-white"
        @click="focusSubscriptionEmail"
      >
        <LetterIcon class="subscribe__icon ml-4 mr-3 bg-white"></LetterIcon>
        <input
          class="subscribe__input SatoshiRegular w-[80%] bg-white text-sm placeholder-gray-400"
          placeholder="Enter your email address"
          ref="SubscriptionEmail"
        />
      </div>
      <div
        class="subscribe__button SatoshiRegular mx-auto mb-7 mt-3 h-[42px] w-[311px] rounded-3xl bg-white text-center leading-[42px] text-black"
      >
        Subscribe to Newsletter
      </div>
    </div>
    <footer class="mb-6">
      <div class="share__block ml-4 block lg:ml-0 lg:text-center">
        <div class="share__title IntegralBold mt-6 text-2xl">LOOM.HUB</div>
        <div
          class="share__description SatoshiRegular mt-3 text-base text-gray-500"
        >
          The place where fashion meets your lifestyle. Explore the collection
          today.
        </div>
        <div class="share__icons mt-4 flex gap-3 lg:justify-center">
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
              class="footer__links-category SatoshiRegular text-base tracking-[3px]"
            >
              COMPANY
            </div>
            <NuxtLink to="/" class="footer__links-link">About</NuxtLink>
            <NuxtLink to="/" class="footer__links-link">Features</NuxtLink>
            <NuxtLink to="/" class="footer__links-link">Works</NuxtLink>
            <NuxtLink to="/" class="footer__links-link">Career</NuxtLink>
          </div>
          <div class="links__block pb-6">
            <div
              class="footer__links-category SatoshiRegular text-base tracking-[3px]"
            >
              HELP
            </div>
            <NuxtLink to="/" class="footer__links-link"
              >Customer support</NuxtLink
            >
            <NuxtLink to="/" class="footer__links-link"
              >Delivery Details</NuxtLink
            >
            <NuxtLink to="/" class="footer__links-link"
              >Terms & Conditions</NuxtLink
            >
            <NuxtLink to="/" class="footer__links-link"
              >Privacy Policy</NuxtLink
            >
          </div>
        </div>
        <div class="links__container inline-flex">
          <div class="links__block pb-6">
            <div
              class="footer__links-category SatoshiRegular text-base tracking-[3px]"
            >
              FAQ
            </div>
            <NuxtLink to="/" class="footer__links-link">Account</NuxtLink>
            <NuxtLink to="/" class="footer__links-link"
              >Manage Deliveries</NuxtLink
            >
            <NuxtLink to="/" class="footer__links-link">Orders</NuxtLink>
            <NuxtLink to="/" class="footer__links-link">Payment</NuxtLink>
          </div>
          <div class="links__block pb-6">
            <div
              class="footer__links-category SatoshiRegular text-base tracking-[3px]"
            >
              RESOURCES
            </div>
            <div class="footer__links-link">Free eBook</div>
            <div class="footer__links-link">Developer Tutorial</div>
            <div class="footer__links-link">How to - Blog</div>
            <div class="footer__links-link">Youtube Playlist</div>
          </div>
        </div>
      </div>
      <div class="horizontal-separator mt-8"></div>
      <div
        class="footer__trademark SatoshiRegular mt-4 text-center text-base text-gray-500"
      >
        Loom.hub © 2024-2025, All rights reserved
      </div>
      <div class="footer__payment_methods mt-4 flex justify-center gap-3">
        <PaymentVisaIcon class="footer__payment_method"></PaymentVisaIcon>
        <PaymentMastercardIcon
          class="footer__payment_method"
        ></PaymentMastercardIcon>
        <PaymentPaypalIcon class="footer__payment_method"></PaymentPaypalIcon>
        <PaymentAppleIcon class="footer__payment_method"></PaymentAppleIcon>
        <PaymentGoogleIcon class="footer__payment_method"></PaymentGoogleIcon>
      </div>
    </footer>

    <!-- <div class="mb-[500px] mt-[100px]"></div>
    <button @click="updateOrderStatus(orderId, newStatus)">UPDATE</button> -->
  </div>
</template>
<script setup>
import { onMounted, onUnmounted, ref, watch, nextTick } from 'vue';
import axios from 'axios';
import Cookies from 'js-cookie';

import Search_results_dropdown from '~/components/search_results_dropdown.vue';
import Slider_component from '~/components/slider_component.vue';
import ArrowIcon from '../assets/icons/ArrowIcon.vue';
import PointerIcon from '../assets/icons/PointerIcon.vue';
import CartIcon from '../assets/icons/CartIcon.vue';
import LetterIcon from '../assets/icons/LetterIcon.vue';
import RatingEmptyStarIcon from '../assets/icons/RatingEmptyStarIcon.vue';
// import RatingHalfStarIcon from '../assets/icons/RatingHalfStarIcon.vue';
import RatingStarIcon from '../assets/icons/RatingFullStarIcon.vue';
import ProfileIcon from '../assets/icons/ProfileIcon.vue';
import SearchIconBlack from '../assets/icons/SearchIconBlack.vue';
import SearchIconGray from '../assets/icons/SearchIconGray.vue';
import GucciIcon from '../assets/icons/GucciIcon.vue';
import PradaIcon from '../assets/icons/PradaIcon.vue';
import VersaceIcon from '../assets/icons/VersaceIcon.vue';
import ZaraIcon from '../assets/icons/ZaraIcon.vue';
import CalvinKleinIcon from '../assets/icons/CalvinKleinIcon.vue';
import BurgerMenuIcon from '../assets/icons/BurgerMenuIcon.vue';
import PaymentAppleIcon from '../assets/icons/PaymentAppleIcon.vue';
import PaymentGoogleIcon from '../assets/icons/PaymentGoogleIcon.vue';
import PaymentMastercardIcon from '../assets/icons/PaymentMastercardIcon.vue';
import PaymentPaypalIcon from '../assets/icons/PaymentPaypalIcon.vue';
import PaymentVisaIcon from '../assets/icons/PaymentVisaIcon.vue';
import ShareTwitterX from '../assets/icons/ShareTwitterXIcon.vue';
import ShareFacebook from '../assets/icons/ShareFacebookIcon.vue';
import ShareInstagram from '../assets/icons/ShareInstagramIcon.vue';
import ShareGithub from '../assets/icons/ShareGithubIcon.vue';
import StarIcon from '../assets/icons/StarIconBig.vue';
import VerifiedTickIcon from '../assets/icons/VerifiedTickIcon.vue';

// Change BaseURL for axios
const api = axios.create({
  baseURL: 'http://localhost:3001',
});

onMounted(() => {
  getSliderProducts('getNewArrivals');
  getSliderProducts('getTopSelling');
  getWebsiteReviews();

  // reviewCardsContainer.value.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  // reviewCardsContainer.value.removeEventListener('scroll', handleScroll);
});

// Horizontal product slider component functionality

const newArrivalsList = ref([]);
const limit = 9;
const currencyMultiplier = 1;
const topSellingList = ref([]);

async function getSliderProducts(filterName) {
  try {
    const res = await api.get(`/api/${filterName}?limit=${limit}`);
    const arrivalsResponse = res.data.map((product) => {
      const modifiedPrice = (product.price * currencyMultiplier).toFixed(2);
      const modifiedOldPrice = (product.oldPrice * currencyMultiplier).toFixed(
        2
      );
      const discountPercentage = Math.round(
        100 - (modifiedPrice / modifiedOldPrice) * 100
      );

      return {
        name: product.name,
        price: modifiedPrice,
        GID: product.GID,
        images: product.images,
        timestamps: product.timestamps,
        rating: product.rating || 4,
        oldPrice: modifiedOldPrice || null,
        discount: discountPercentage,
      };
    });
    console.log(res);

    if (filterName === 'getNewArrivals') {
      newArrivalsList.value.push(...arrivalsResponse);
    } else if (filterName === 'getTopSelling') {
      topSellingList.value.push(...arrivalsResponse);
    }
  } catch (err) {
    console.log(err);
  }
}

// Updating an order
const orderId = '6769bc16c09d4bcd85526087';
const newStatus = 'delivered';
async function updateOrderStatus(orderId, newStatus) {
  const validStatuses = ['pending', 'shipped', 'delivered', 'cancelled'];
  if (!validStatuses.includes(newStatus)) {
    console.error('Invalid order status');
    return { success: false, message: 'Invalid order status' };
  }

  try {
    const res = await api.put(`/api/orders/${orderId}`, {
      orderStatus: newStatus,
    });

    if (res.status === 200) {
      console.log('Order status updated successfully:', res.data.order);
      return { success: true, order: res.data.order };
    }
  } catch (err) {
    if (err.response?.status === 404) {
      console.error('Order not found');
      return { success: false, message: 'Order not found' };
    }
    console.error('Internal server error:', err.message);
    return { success: false, message: 'Internal server error' };
  }
}

// An array for Browse by dress style
const dress_styles_list = [
  { name: 'Casual', backgroundPicture: '/assets/images/browse-casual' },
  { name: 'Formal', backgroundPicture: '/assets/images/browse-formal' },
  { name: 'Party', backgroundPicture: '/assets/images/browse-party' },
  { name: 'Gym', backgroundPicture: '/assets/images/browse-gym' },
];

// Method to Get 5 website reviews
const websiteReviewsArray = ref([]);

async function getWebsiteReviews() {
  try {
    const response = await api.get('/api/getWebsiteReviews');
    const modifiedResponse = response.data.map((review) => {
      const reviewerName = review.name;

      return {
        user: reviewerName,
        comment: review.comment,
        rating: review.rating,
        id: review._id,
      };
    });

    websiteReviewsArray.value.push(...modifiedResponse);
  } catch (err) {
    console.log(err);
  }
}

// Horizontal cards scroller
const reviewCardIndex = ref(0);
const reviewCardsContainer = ref(null);
function scrollToCard(index) {
  if (!reviewCardsContainer.value) return;
  reviewCardIndex.value = index;

  if (index < 0) {
    reviewCardIndex.value = websiteReviewsArray.value.length - 1;
  }

  if (index > websiteReviewsArray.value.length - 1) {
    reviewCardIndex.value = 0;
  }
  const cardWidth =
    reviewCardsContainer.value.children[0]?.children[0]?.offsetWidth;

  reviewCardsContainer.value.scrollTo({
    left: cardWidth * reviewCardIndex.value,
    behavior: 'smooth',
  });
}

// function handleScroll() {
//   if (!reviewCardsContainer.value) return;

//   const container = reviewCardsContainer.value;
//   const scrollLeft = container.scrollLeft;
//   const cardWidth = container.children[0]?.children[0]?.offsetWidth;
//   reviewCardIndex.value = Math.round(scrollLeft / cardWidth);
// }

const SubscriptionEmail = ref();
function focusSubscriptionEmail() {
  SubscriptionEmail.value?.focus();
}

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
function openBurgerDropdown() {
  isBurgerDropdownActive.value = true;
  openModalOverlay();
}
function closeBurgerDropdown() {
  isBurgerDropdownActive.value = false;
}

// Mobile Search
const isSearchActive = ref(false);
const MobileSearchInput = ref(null);
function openMobileSearch() {
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
async function submitLoginForm() {
  try {
    const response = await api.post('/api/login', {
      nickname: loginName.value,
      password: loginPassword.value,
    });
    const { token } = response.data;
    Cookies.set('token', token);
    console.log(response);
    console.log(`You are: ${response.data.user}. Your token is: ${token}`);
  } catch (err) {
    console.log(err);
  }
}
</script>
<style scoped>
@import '/assets/styles/style.css';
</style>
