<template>
  <main>
    <!-- Section with title, description and stats -->
    <section
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
        <p
          class="home-description__text SatoshiRegular mt-4 text-[14px] lg:text-xl"
        >
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of
          style.
        </p>
        <NuxtLink
          @click="setSortingOption(0)"
          to="/shop"
          class="home-description__button SatoshiRegular mx-auto mt-5 flex h-12 w-[100%] max-w-[430px] select-none items-center justify-center rounded-3xl bg-black text-base text-white hover:[background-color:var(--btn-primary-bg-hover)] active:[background-color:var(--btn-primary-bg-active)]"
        >
          Shop Now
        </NuxtLink>
        <ul
          class="home-description__stats mt-4 flex flex-wrap justify-center gap-y-4"
        >
          <li
            class="home-description__stat home-description__stats-brands SatoshiRegular px-4 pt-2 text-[12px] leading-4 lg:text-base"
          >
            <span class="satoshiBold home-description__stat-value text-2xl"
              >200+</span
            >
            <br class="home-description__stat-label" />International Brands
          </li>
          <li
            class="home-description__stat home-description__stats-products SatoshiRegular px-4 pt-2 text-[12px] leading-4 lg:text-base"
          >
            <span class="satoshiBold home-description__stat-value text-2xl"
              >2,000+</span
            >
            <br class="home-description__stat-label" />High-Quality Products
          </li>
          <li
            class="home-description__stat home-description__stats-customers SatoshiRegular px-4 pt-2 text-[12px] leading-4 lg:text-base"
          >
            <span class="satoshiBold home-description__stat-value text-2xl"
              >30,000+</span
            ><br class="home-description__stat-label" />
            Happy Customers
          </li>
        </ul>
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
    </section>

    <!-- Interactive brand quick links: user is able to filter products by brand in Shop -->
    <section class="brands__menu mt-4 flex flex-wrap bg-transparent xl:mt-0">
      <NuxtLink
        v-for="brand in ['Prada', 'Zara', 'Gucci', 'Versace', 'Calvin Klein']"
        :key="brand"
        :to="{ path: '/shop', query: { brand: JSON.stringify([brand]) } }"
        class="brands__brand flex h-[10vw] flex-1 basis-1/3 items-center justify-center bg-black"
      >
        <component :is="brandList[brand]" class="h-[8vw] w-[80%]" />
      </NuxtLink>
    </section>

    <!-- Slider of products: highlights newest products -->
    <section class="new-arrivals">
      <h3
        class="new-arrivals__title IntergralExtraBold mb-6 mt-9 text-center text-[32px] leading-none"
      >
        NEW ARRIVALS
      </h3>

      <Slider_component
        class="new-arrivals__items w-max-full mx-auto"
        filterName="getNewArrivals"
      ></Slider_component>

      <NuxtLink
        @click="setSortingOption(1)"
        :to="'/shop'"
        class="new-arrivals__button view-all__button button-border SatoshiRegular mx-auto mt-5 flex w-[90%] max-w-[600px] cursor-pointer select-none justify-center rounded-[62px] py-3 text-base"
      >
        View All
      </NuxtLink>

      <div class="horizontal-separator-90 mt-10"></div>
    </section>

    <!-- Slider of products: highlights most popular products -->
    <section class="top-selling mt-10">
      <h3
        class="top-selling__title IntergralExtraBold mb-6 mt-9 text-center text-[32px] leading-none"
      >
        TOP SELLING
      </h3>

      <Slider_component
        class="new-arrivals__items w-max-full mx-auto"
        filterName="getTopSelling"
      ></Slider_component>

      <NuxtLink
        @click="setSortingOption(0)"
        :to="'/shop'"
        class="top-selling__button view-all__button button-border SatoshiRegular mx-auto mt-5 flex w-[90%] max-w-[600px] cursor-pointer select-none justify-center rounded-[62px] py-3 text-base"
      >
        View All
      </NuxtLink>
    </section>

    <!-- Interactive dress style masonry: user is able to filter products by fashion style in Shop  -->
    <section
      class="style-masonry mx-auto mt-10 w-[1800px] max-w-[94vw] rounded-2xl bg-[#F0F0F0] pb-2 pt-9"
    >
      <h3
        class="style-masonry__title IntergralExtraBold mb-7 px-10 text-center text-[32px] leading-none"
      >
        BROWSE BY DRESS STYLE
      </h3>

      <div
        class="style-masonry__tileset relative flex flex-col flex-wrap items-center justify-center px-2 xl:flex-row xl:gap-5"
      >
        <NuxtLink
          v-for="(style, index) in dress_styles_list"
          :key="'style-' + index"
          :to="style.path"
          class="style-masonry__tile relative mb-4 w-[90%] cursor-pointer rounded-3xl bg-white"
          :class="[
            index === 1 || index === 2
              ? 'style-masonry__tile-big'
              : 'style-masonry__tile-small',
          ]"
        >
          <p
            class="style-masonry__tile-text SatoshiBold absolute ml-6 mt-4 text-2xl"
          >
            {{ style.name }}
          </p>
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
        </NuxtLink>
      </div>
    </section>

    <!-- Website reviews section: carousel with scrollable user feedback -->
    <section class="reviews mt-10">
      <div class="reviews__header mx-4 flex justify-between">
        <h3
          class="reviews__title IntergralExtraBold mr-10 text-left text-[32px] leading-none 4xl:text-center"
        >
          OUR HAPPY CUSTOMERS
        </h3>
        <div class="reviews__arrows mt-auto flex sm:hidden">
          <button
            class="reviews__arrow--left mr-4 size-6 rotate-180"
            @click="scrollToCard(reviewCardIndex - 1)"
          >
            <ArrowIcon class="size-6" />
          </button>
          <button
            class="reviews__arrow--right size-6"
            @click="scrollToCard(reviewCardIndex + 1)"
          >
            <ArrowIcon class="size-6" />
          </button>
        </div>
      </div>
      <div
        class="reviews__list relative min-h-[204px]"
        ref="reviewCardsContainer"
      >
        <!-- Loading screen while reviews are being fetched -->
        <div
          v-show="!websiteReviewsArray.length"
          class="waiting-screen-local mt-1 rounded-xl"
        >
          <div class="loader"></div>
        </div>
        <!-- Review slider -->
        <div class="reviews__cards">
          <article
            v-show="websiteReviewsArray.length"
            class="reviews__card button-border mx-4 mt-6 h-[180px] w-[340px] rounded-3xl border-gray-500 p-6"
            v-for="review in websiteReviewsArray"
            :key="'main' + review.id"
            ref="reviewCardsRefs"
          >
            <div class="reviews__card-rating mt-1 flex items-center">
              <span class="flex">
                <RatingStarIcon
                  v-for="(n, index) in Math.floor(review.rating)"
                  :key="'full-' + index"
                  class="h-5 w-5"
                />
                <RatingHalfStarIcon
                  v-if="review.rating % 1 !== 0"
                  :key="'half-' + review.id"
                  class="h-5 w-5"
                />
                <RatingEmptyStarIcon
                  v-for="(n, index) in Math.floor(5 - review.rating)"
                  :key="'empty-' + index"
                  class="h-5 w-5"
                />
              </span>
            </div>

            <div class="reviews__card__name-line flex items-end">
              <strong class="reviews__card__name SatoshiBold mt-2 text-base">
                {{ review.user }}
              </strong>
              <VerifiedTickIcon
                class="reviews__card__verified mb-1 ml-1 size-4"
              />
            </div>

            <p class="reviews__card__text SatoshiRegular mt-1 text-gray-500">
              {{ review.comment }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <Subscribe_news_component />
  </main>
</template>
<script setup>
// State imports
import { useSortingStore } from '@/stores/index.js';

// Data and components imports
import dress_styles_list from '@/data/dress_styles.js';
import Slider_component from '@/components/slider_component.vue';
import Subscribe_news_component from '@/components/subscribe_news_component.vue';
const brandList = {
  Versace: VersaceIcon,
  Zara: ZaraIcon,
  Gucci: GucciIcon,
  Prada: PradaIcon,
  'Calvin Klein': CalvinKleinIcon,
};

// Icon imports
import ArrowIcon from '@/assets/icons/ArrowIcon.vue';
import CalvinKleinIcon from '@/assets/icons/CalvinKleinIcon.vue';
import GucciIcon from '@/assets/icons/GucciIcon.vue';
import PradaIcon from '@/assets/icons/PradaIcon.vue';
import RatingEmptyStarIcon from '@/assets/icons/RatingEmptyStarIcon.vue';
import RatingHalfStarIcon from '@/assets/icons/RatingHalfStarIcon.vue';
import RatingStarIcon from '@/assets/icons/RatingFullStarIcon.vue';
import StarIcon from '@/assets/icons/StarIconBig.vue';
import VerifiedTickIcon from '@/assets/icons/VerifiedTickIcon.vue';
import VersaceIcon from '@/assets/icons/VersaceIcon.vue';
import ZaraIcon from '@/assets/icons/ZaraIcon.vue';

// API setup
import { useApi } from '@/composables/useApi.js';
const api = useApi();

// Page title and API endpoint
useHead({
  title: 'LoomHub',
});

onMounted(() => {
  getWebsiteReviews();

  reviewCardsContainer.value.addEventListener('scroll', debouncedHandleScroll);
});

onUnmounted(() => {
  reviewCardsContainer.value?.removeEventListener(
    'scroll',
    debouncedHandleScroll
  );
});

// Set sorting option and go to /shop
const sortingStore = useSortingStore();
const { setSortingOption } = sortingStore;

// Function to get five random website reviews
const websiteReviewsArray = ref([]);

async function getWebsiteReviews() {
  try {
    const response = await api.get('/api/getWebsiteReviews');
    const modifiedResponse = response.data.map((review) => {
      // Show name normally with space
      const splitIndex = review.name.slice(1).search(/[A-Z]/) + 1;
      const firstName =
        review.name.slice(0, splitIndex).charAt(0).toLocaleUpperCase() +
        review.name.slice(0, splitIndex).slice(1).toLocaleLowerCase();
      const lastName =
        review.name.slice(splitIndex).charAt(0).toLocaleUpperCase() +
        review.name.slice(splitIndex).slice(1).toLocaleLowerCase();
      const fullName = `${firstName} ${lastName}`;

      return {
        user: fullName,
        comment: review.comment,
        rating: review.rating,
        id: review._id,
      };
    });

    websiteReviewsArray.value.push(...modifiedResponse);
  } catch (err) {
    console.error(err);
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
    reviewCardsContainer.value.querySelector('.reviews__card')?.offsetWidth;

  reviewCardsContainer.value.scrollTo({
    left: cardWidth * reviewCardIndex.value,
    behavior: 'smooth',
  });
}

// Website review scroll helper
// Maybe handleScroll+debounce can be deleted entirely
function handleScroll() {
  if (!reviewCardsContainer.value) return;
  const container = reviewCardsContainer.value;
  const scrollLeft = container.scrollLeft;
  const cardWidth =
    reviewCardsContainer.value.querySelector('.reviews__card')?.offsetWidth;
  console.log(cardWidth);
  reviewCardIndex.value = Math.round(scrollLeft / cardWidth);
}

const debouncedHandleScroll = debounce(handleScroll, 30);
function debounce(func, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
</script>
<style scoped>
@import '/assets/styles/style.css';
</style>
