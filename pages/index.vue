<template>
  <div class="website relative max-w-[100vw]">
    <header
      class="top-menu fixed left-0 top-0 z-[100] flex h-[64px] w-full flex-row items-center justify-between bg-white"
    >
      <div class="BurgerMenuIconContainer flex w-[12%]">
        <BurgerMenuIcon class="m-auto h-6 w-6 flex-shrink-0 sm:hidden" />
      </div>
      <div
        class="top-menu__logo IntergralExtraBold mb-2 text-[24px] leading-none"
      >
        LOOM.HUB
      </div>
      <nav class="top-menu__nav hidden flex-row sm:flex">
        <div class="top-menu__nav-item top-menu__nav-item--shop flex flex-row">
          <div class="top-menu__nav-item--shop-text">Shop</div>
          <PointerIcon
            class="top-menu__nav-item top-menu__nav-item--shop-dropdown"
          ></PointerIcon>
        </div>
        <div class="top-menu__nav-item">On Sale</div>
        <div class="top-menu__nav-item">New Arrivals</div>
        <div class="top-menu__nav-item">Brands</div>
      </nav>
      <div class="top-menu__search flex flex-row">
        <SearchIconGray
          class="top-menu__search-icon hidden xl:block"
          aria-label="Search"
        />
        <input
          type="text"
          class="top-menu__search-input hidden h-6 md:block"
          placeholder="Search
        for products..."
          aria-label="Search for products"
        />
      </div>
      <div
        class="top-menu__actions mr-4 flex w-[30%] flex-shrink-0 flex-row justify-end"
      >
        <SearchIconBlack class="top-menu__search-icon" aria-label="Search" />
        <CartIcon class="top-menu__actions-cart ml-[14px]"></CartIcon>
        <ProfileIcon class="top-menu__actions-profile ml-[14px]"></ProfileIcon>
      </div>
    </header>
    <div class="home-description relative z-50 mt-[64px] p-4">
      <div class="home-description__interactive">
        <h2
          class="home-description__interactive--main-text IntergralExtraBold xl:pt-22 max-w-[576px] text-4xl leading-tight xl:pl-24 xl:text-6xl"
        >
          FIND CLOTHES THAT MATCHES YOUR STYLE
        </h2>
        <div
          class="home-description__interactive--secondary-text SatoshiRegular mt-4 text-[14px]"
        >
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of
          style.
        </div>
        <button
          class="home-description__interactive--button SatoshiRegular16White mt-5 flex h-12 w-[100%] items-center justify-center rounded-3xl bg-black"
        >
          Shop Now
        </button>
        <div
          class="home-description__stats mt-4 flex flex-wrap justify-center gap-y-4"
        >
          <div
            class="home-description__stat-block home-description__stats-brands SatoshiRegular px-4 pt-2 text-[12px] leading-4"
          >
            <span class="SatoshiBold24">200+</span> <br />International Brands
          </div>
          <div
            class="home-description__stat-block home-description__stats-products SatoshiRegular px-4 pt-2 text-[12px] leading-4"
          >
            <span class="SatoshiBold24">2,000+</span> <br />High-Quality
            Products
          </div>
          <div
            class="home-description__stat-block home-description__stats-customers SatoshiRegular px-4 pt-2 text-[12px] leading-4"
          >
            <span class="SatoshiBold24">30,000+</span><br />
            Happy Customers
          </div>
        </div>
      </div>
      <div class="home-description__background relative">
        <StarIcon
          class="home-description__background--big-star absolute"
        ></StarIcon>
        <StarIcon
          class="home-description__background--small-star absolute"
        ></StarIcon>
        <!-- <img
          class="home-description__background--image -mx-4 -mb-4"
          src="https://i.imgur.com/Mea753h.png"
          srcset="
            https://i.imgur.com/Mea753h.png 400w,
            https://i.imgur.com/sqNcZ0J.png
          "
        /> -->
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
            class="home-description__background--image -mx-4 -mb-4 bg-center object-center"
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
        class="new-arrivals__button button-border SatoshiRegular mx-auto mt-5 flex w-[90%] justify-center rounded-[62px] py-3 text-base"
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
        class="new-arrivals__button button-border SatoshiRegular mx-auto mt-5 flex w-[90%] justify-center rounded-[62px] py-3 text-base"
      >
        View All
      </div>
    </div>
    <div class="style-masonry mx-4 mt-10 rounded-2xl bg-[#F0F0F0] pb-2 pt-9">
      <div
        class="style-masonry__title IntergralExtraBold mb-7 px-10 text-center text-[32px] leading-none"
      >
        BROWSE BY DRESS STYLE
      </div>
      <div class="style-masonry__tileset relative flex flex-col items-center">
        <div
          v-for="style in dress_styles_list"
          :key="style.name"
          class="style-masonry__tileset__tile relative mb-4 w-[90%] rounded-3xl bg-white"
        >
          <div
            class="style-masonry__tileset__tile-text SatoshiBold absolute ml-6 mt-4 text-2xl"
          >
            {{ style.name }}
          </div>
          <picture class="style-masonry__tileset_tile-background">
            <source
              :srcset="`${style.backgroundPicture}.png`"
              media="(max-width: 400px)"
            />
            <source
              :srcset="`${style.backgroundPicture}-xl.png`"
              media="(min-width: 401px)"
            />
            <img
              class="ml-auto rounded-3xl"
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
        <div class="reviews__arrows mt-auto flex">
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
      <div class="reviews__cards-container">
        <div class="reviews__cards" ref="reviewCardsContainer">
          <div
            class="reviews__card button-border mx-4 mt-6 h-[180px] w-[340px] rounded-3xl border-gray-500 p-6"
            v-for="review in websiteReviewsArray"
            :key="review.id"
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
    <div class="mb-[500px]"></div>
    <button @click="updateOrderStatus(orderId, newStatus)">UPDATE</button>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';

import ArrowIcon from '../assets/icons/ArrowIcon.vue';
import PointerIcon from '../assets/icons/PointerIcon.vue';
import CartIcon from '../assets/icons/CartIcon.vue';
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
import StarIcon from '../assets/icons/StarIconBig.vue';
import Slider_component from '~/components/slider_component.vue';
import VerifiedTickIcon from '../assets/icons/VerifiedTickIcon.vue';

// Change BaseURL for axios
const api = axios.create({
  baseURL: 'http://localhost:3001',
});

onMounted(() => {
  getSliderProducts('getNewArrivals');
  getSliderProducts('getTopSelling');
  getWebsiteReviews();

  reviewCardsContainer.value.addEventListener('scroll', handleScroll);
});

// const productsList = ref([]);
// let isMaxReached = false;
// let isFetching = false;
// let currentPosition = 0;
const newArrivalsList = ref([]);
const limit = 6;
const currencyMultiplier = 1;

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

    if (filterName === 'getNewArrivals') {
      newArrivalsList.value.push(...arrivalsResponse);
    } else if (filterName === 'getTopSelling') {
      topSellingList.value.push(...arrivalsResponse);
    }
  } catch (err) {
    console.log(err);
  }
}

async function getNewArrivals() {
  try {
    const res = await api.get(`/api/getNewArrivals?limit=${limit}`);
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

    newArrivalsList.value.push(...arrivalsResponse);
  } catch (err) {
    console.log(err);
  }
}

// async function getNewArrivals() {
//   try {
//     const res = await api.get(`/api/products?limit=${limit}`);

//     const newProductsList = res.data.map((product) => {
//       const modifiedPrice = (product.price * currencyMultiplier).toFixed(2);
//       const modifiedOldPrice = (product.oldPrice * currencyMultiplier).toFixed(
//         2
//       );
//       // const discountPrice = product.discount
//       //   ? (product.price * (1 - product.discount / 100)).toFixed(2)
//       //   : null;
//       const discountPercentage = Math.round(
//         100 - (modifiedPrice / modifiedOldPrice) * 100
//       );

//       return {
//         name: product.name,
//         price: modifiedPrice,
//         GID: product.GID,
//         images: product.images,
//         timestamps: product.timestamps,
//         rating: product.rating || 4,
//         oldPrice: modifiedOldPrice || null,
//         discount: discountPercentage,
//       };
//     });

//     productsList.value.push(...newProductsList);
//   } catch (err) {
//     console.error(err);
//   }
// }

// async function getProducts() {
//   if (isFetching || isMaxReached) return;
//   isFetching = true;

//   try {
//     const res = await api.get(
//       `/api/products?limit=${limit}&offset=${currentPosition}`
//     );

//     const newProductsList = res.data.map((product) => {
//       const modifiedPrice = (product.price * currencyMultiplier).toFixed(2);
//       const modifiedOldPrice = (product.oldPrice * currencyMultiplier).toFixed(
//         2
//       );
//       const discountPercentage = Math.round(
//         100 - (modifiedPrice / modifiedOldPrice) * 100
//       );

//       return {
//         name: product.name,
//         description: product.description,
//         price: modifiedPrice,
//         discount: product.discount,
//         GID: product.GID,
//         stock: product.stock,
//         images: product.images,
//         timestamps: product.timestamps,
//         rating: product.rating || 4,
//         oldPrice: modifiedOldPrice || null,
//         discount: discountPercentage,
//       };
//     });

//     productsList.value.push(...newProductsList);
//     currentPosition += limit;
//     isMaxReached = newProductsList.length < limit;
//   } catch (err) {
//     console.error(err);
//   } finally {
//     isFetching = false;
//   }
// }

const topSellingList = ref([]);

async function getTopSelling() {
  try {
    const res = await api.get(`/api/getTopSelling?limit=${limit}`);
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

    topSellingList.value.push(...arrivalsResponse);
  } catch (err) {
    console.log(err);
  }
}

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

// Get website reviews
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

const reviewCardIndex = ref(0);
const reviewCardsContainer = ref(null);
// websiteReviewsArray
function scrollToCard(index) {
  if (!reviewCardsContainer.value) return;
  reviewCardIndex.value = Math.max(
    0,
    Math.min(index, websiteReviewsArray.value.length - 1)
  );
  if (index < 0) {
    reviewCardIndex.value = websiteReviewsArray.value.length - 1;
  }
  if (index > websiteReviewsArray.value.length - 3) {
    reviewCardIndex.value = 0;
  }
  const cardWidth = reviewCardsContainer.value.children[0]?.offsetWidth;
  reviewCardsContainer.value.scrollTo({
    left: cardWidth * reviewCardIndex.value,
    behavior: 'smooth',
  });
}

function handleScroll() {
  if (!reviewCardsContainer.value) return;

  const container = reviewCardsContainer.value;
  const scrollLeft = container.scrollLeft;
  const cardWidth = container.children[0]?.offsetWidth;
  reviewCardIndex.value = Math.round(scrollLeft / cardWidth);
}
</script>
<style scoped>
@import '/assets/styles/style.css';
</style>
