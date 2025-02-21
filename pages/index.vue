<template>
  <div>
    <div
      class="home-description relative z-50 w-full bg-[#f2f0f1] xl:flex xl:flex-nowrap xl:justify-evenly 2xl:items-center 2xl:justify-between"
    >
      <div
        class="home-description__interactive relative z-30 px-4 xl:max-w-[940px] 2xl:mx-auto 2xl:text-center"
      >
        <h2
          class="home-description__title IntergralExtraBold max-w-[576px] text-4xl leading-tight xl:text-6xl 2xl:max-w-full"
        >
          FIND CLOTHES THAT MATCHES YOUR STYLE
        </h2>
        <div
          class="home-description__text SatoshiRegular mt-4 text-[14px] lg:text-xl"
        >
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of
          style.
        </div>
        <NuxtLink
          to="/shop"
          class="home-description__button SatoshiRegular16White mx-auto mt-5 flex h-12 w-[100%] max-w-[430px] select-none items-center justify-center rounded-3xl bg-black"
        >
          Shop Now
        </NuxtLink>
        <div
          class="home-description__stats mt-4 flex flex-wrap justify-center gap-y-4"
        >
          <div
            class="home-description__stat home-description__stats-brands SatoshiRegular px-4 pt-2 text-[12px] leading-4 lg:text-base"
          >
            <span class="SatoshiBold24 home-description__stat-value">200+</span>
            <br class="home-description__stat-label" />International Brands
          </div>
          <div
            class="home-description__stat home-description__stats-products SatoshiRegular px-4 pt-2 text-[12px] leading-4 lg:text-base"
          >
            <span class="SatoshiBold24 home-description__stat-value"
              >2,000+</span
            >
            <br class="home-description__stat-label" />High-Quality Products
          </div>
          <div
            class="home-description__stat home-description__stats-customers SatoshiRegular px-4 pt-2 text-[12px] leading-4 lg:text-base"
          >
            <span class="SatoshiBold24 home-description__stat-value"
              >30,000+</span
            ><br class="home-description__stat-label" />
            Happy Customers
          </div>
        </div>
      </div>
      <div
        class="home-description__background pointer-events-none relative z-0 mx-auto max-w-[700px] select-none overflow-clip lg:mt-10 xl:mt-0"
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
            class="home-description__background-image -mb-4 bg-center object-center"
            src="https://i.imgur.com/sqNcZ0J.png"
            alt="Background image"
          />
        </picture>
      </div>
    </div>
    <div
      class="popular-brands flex w-full flex-row flex-wrap justify-evenly overflow-hidden bg-black pb-3 pt-5"
    >
      <NuxtLink to="/brands" class="popular-brands__brand mx-3 my-2">
        <VersaceIcon class="h-full w-full" />
      </NuxtLink>
      <NuxtLink to="/brands" class="popular-brands__brand mx-3 my-2">
        <ZaraIcon class="h-full w-full" />
      </NuxtLink>
      <NuxtLink to="/brands" class="popular-brands__brand mx-3 my-2">
        <GucciIcon class="h-full w-full" />
      </NuxtLink>
      <NuxtLink to="/brands" class="popular-brands__brand mx-3 my-2">
        <PradaIcon class="h-full w-full" />
      </NuxtLink>
      <NuxtLink to="/brands" class="popular-brands__brand mx-3 my-2">
        <CalvinKleinIcon class="h-full w-full" />
      </NuxtLink>
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
      <NuxtLink
        to="/new_arrivals"
        class="new-arrivals__button button-border SatoshiRegular mx-auto mt-5 flex w-[90%] max-w-[600px] select-none justify-center rounded-[62px] py-3 text-base"
      >
        View All
      </NuxtLink>
      <div class="horizontal-separator-90 mt-10"></div>
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
      <NuxtLink
        to="/top_selling"
        class="top-selling__button button-border SatoshiRegular mx-auto mt-5 flex w-[90%] max-w-[600px] select-none justify-center rounded-[62px] py-3 text-base"
      >
        View All
      </NuxtLink>
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
        <nuxtLink
          v-for="(style, index) in dress_styles_list"
          :key="style.name"
          :to="style.path"
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
              class="style-masonry__tile-background select-none rounded-3xl"
              :src="`${style.backgroundPicture}-xl.png`"
              alt="Background image"
            />
          </picture>
        </nuxtLink>
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
      <div class="reviews__list" ref="reviewCardsContainer">
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
                <RatingHalfStarIcon
                  v-if="review.rating % 1 !== 0"
                  :key="'half-' + review.id"
                  class="h-5 w-5"
                />
                <RatingEmptyStarIcon
                  v-for="n in Math.floor(5 - review.rating)"
                  :key="'empty-' + review.id"
                  class="h-5 w-5"
                />
              </span>
            </div>
            <div class="reviews__card-name-line flex items-end">
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
      class="subscribe mx-auto mt-12 w-[1100px] max-w-[94vw] overflow-hidden rounded-2xl bg-black"
    >
      <div
        class="subscribe__title IntegralBold px-6 pt-8 text-center text-[1.8rem] leading-9 text-white"
      >
        STAY UP TO DATE ABOUT OUR BEST OFFERS
      </div>
      <div
        class="subscribe__input_wrapper mx-auto mt-8 flex h-[42px] w-[311px] items-center overflow-hidden rounded-3xl bg-white"
        @click="focusSubscriptionEmail"
      >
        <LetterIcon
          class="subscribe__input-icon ml-4 mr-3 bg-white"
        ></LetterIcon>
        <input
          class="subscribe__input SatoshiRegular w-[80%] bg-white text-sm placeholder-gray-400"
          placeholder="Enter your email address"
          ref="SubscriptionEmail"
        />
      </div>
      <div
        class="subscribe__submit-button SatoshiRegular mx-auto mb-7 mt-3 h-[42px] w-[311px] select-none rounded-3xl bg-white text-center leading-[42px] text-black"
      >
        Subscribe to Newsletter
      </div>
    </div>

    <!-- <div class="mb-[500px] mt-[100px]"></div>
    <button @click="updateOrderStatus(orderId, newStatus)">UPDATE</button> -->
  </div>
</template>
<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import axios from 'axios';

import dress_styles_list from '~/data/dress_styles.js';
import Slider_component from '~/components/slider_component.vue';

import ArrowIcon from '../assets/icons/ArrowIcon.vue';
import LetterIcon from '../assets/icons/LetterIcon.vue';
import RatingEmptyStarIcon from '../assets/icons/RatingEmptyStarIcon.vue';
import RatingStarIcon from '../assets/icons/RatingFullStarIcon.vue';
import GucciIcon from '../assets/icons/GucciIcon.vue';
import PradaIcon from '../assets/icons/PradaIcon.vue';
import VersaceIcon from '../assets/icons/VersaceIcon.vue';
import ZaraIcon from '../assets/icons/ZaraIcon.vue';
import CalvinKleinIcon from '../assets/icons/CalvinKleinIcon.vue';
import RatingHalfStarIcon from '../assets/icons/RatingHalfStarIcon.vue';
import StarIcon from '../assets/icons/StarIconBig.vue';
import VerifiedTickIcon from '../assets/icons/VerifiedTickIcon.vue';

// Change BaseURL
// const api = axios.create({
//   baseURL: 'http://localhost:3001',
// });

const config = useRuntimeConfig();
const api = axios.create({
  baseURL: config.public.apiBase,
});
// const api = useApi();

onMounted(() => {
  getSliderProducts('getNewArrivals');
  getSliderProducts('getTopSelling');
  getWebsiteReviews();

  reviewCardsContainer.value.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  reviewCardsContainer.value?.removeEventListener('scroll', handleScroll);
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
    // console.log(res);

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
// const dress_styles_list = [
//   { name: 'Casual', backgroundPicture: '/assets/images/browse-casual' },
//   { name: 'Formal', backgroundPicture: '/assets/images/browse-formal' },
//   { name: 'Party', backgroundPicture: '/assets/images/browse-party' },
//   { name: 'Sport', backgroundPicture: '/assets/images/browse-gym' },
// ];

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

// Focus Newsletter subscription
const SubscriptionEmail = ref();
function focusSubscriptionEmail() {
  SubscriptionEmail.value?.focus();
}

// Website review scroll help for arrows
function handleScroll() {
  if (!reviewCardsContainer.value) return;

  const container = reviewCardsContainer.value;
  const scrollLeft = container.scrollLeft;
  const cardWidth = container.children[0]?.children[0]?.offsetWidth;
  reviewCardIndex.value = Math.round(scrollLeft / cardWidth);
}
</script>
<style scoped>
@import '/assets/styles/style.css';
</style>
