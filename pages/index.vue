<template>
  <div class="website relative w-[100vw]">
    <header
      class="top-menu fixed left-0 top-0 z-[100] flex h-[64px] w-full flex-row items-center justify-between bg-white"
    >
      <div class="BurgerMenuIconContainer flex w-[12%]">
        <BurgerMenuIcon class="m-auto h-6 w-6 flex-shrink-0 sm:hidden" />
      </div>
      <div class="top-menu__logo font2 mb-2 text-[24px] leading-none">
        LOOM.HUB
      </div>
      <nav class="top-menu__nav hidden flex-row sm:flex">
        <div class="top-menu__nav-item top-menu__nav-item--shop flex flex-row">
          <div class="top-menu__nav-item--shop-text">Shop</div>
          <ArrowIcon
            class="top-menu__nav-item top-menu__nav-item--shop-dropdown"
          ></ArrowIcon>
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
          class="home-description__interactive--main-text font2 xl:pt-22 max-w-[576px] text-4xl leading-tight xl:pl-24 xl:text-6xl"
        >
          FIND CLOTHES THAT MATCHES YOUR STYLE
        </h2>
        <div
          class="home-description__interactive--secondary-text font3 mt-4 text-[14px]"
        >
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of
          style.
        </div>
        <button
          class="home-description__interactive--button font4 mt-5 flex h-12 w-[100%] items-center justify-center rounded-3xl bg-black"
        >
          Shop Now
        </button>
        <div
          class="home-description__stats mt-4 flex h-[116px] flex-wrap justify-center gap-y-4"
        >
          <div
            class="home-description__stat-block home-description__stats-brands font3 px-4 pt-2 text-[12px] leading-4"
          >
            <span class="font5">200+</span> <br />International Brands
          </div>
          <div
            class="home-description__stat-block home-description__stats-products font3 px-4 pt-2 text-[12px] leading-4"
          >
            <span class="font5">2,000+</span> <br />High-Quality Products
          </div>
          <div
            class="home-description__stat-block home-description__stats-customers font3 px-4 pt-2 text-[12px] leading-4"
          >
            <span class="font5">30,000+</span><br />
            Happy Customers
          </div>
        </div>
      </div>
      <div class="home-description__background">
        <div class="home-description__background--big-star"></div>
        <div class="home-description__background--small-star"></div>
        <!-- <img
          class="home-description__background--image -mx-4 -mb-4"
          src="https://i.imgur.com/Mea753h.png"
          srcset="
            https://i.imgur.com/Mea753h.png 400w,
            https://i.imgur.com/sqNcZ0J.png
          "
        /> -->
        <picture class="home-description__background--image -mx-4 -mb-4">
          <source
            class="home-description__background--image -mx-4 -mb-4"
            srcset="https://i.imgur.com/Mea753h.png"
            media="(max-width: 400px)"
          />
          <source
            srcset="https://i.imgur.com/sqNcZ0J.png"
            media="(min-width: 401px)"
          />
          <img src="https://i.imgur.com/sqNcZ0J.png" alt="Background image" />
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
    <!-- Combine new-arrivals and top-selling ?? -->
    <div class="new-arrivals">
      <div
        class="new-arrivals__title font2 mt-9 text-center text-[32px] leading-none"
      >
        NEW ARRIVALS
      </div>
      <New_arrivals :productsList="productsList"></New_arrivals>
      <div class="new-arrivals__button">
        <div class="new-arrivals__button-text">View All</div>
      </div>
    </div>
    <div class="top-selling">
      <div class="top-selling__title">TOP SELLING</div>
      <div class="top-selling__items">
        <div class="top-selling__items-item">
          <div class="top-selling__item-pic"></div>
          <div class="top-selling__item-title"></div>
          <div class="top-selling__item-rating"></div>
          <div class="top-selling__item-price">
            <!-- $ {{ top_item_price }} -->
          </div>
        </div>
      </div>
      <div class="top-selling__button">
        <div class="top-selling__button-text">View All</div>
      </div>
    </div>
    <div class="style-masonry">
      <div class="style-masonry__title">BROWSE BY dress STYLE</div>
      <div class="style-masonry__tileset">
        <div class="style-masonry__tileset__tile">
          <div class="style-masonry__tileset__tile-text">
            <!-- {{ style_tile_name }} -->
          </div>
        </div>
      </div>
    </div>
    <div class="reviews">
      <div class="reviews__arrows-control">
        <div class="reviews__arrows-control__left"></div>
        <div class="reviews__arrows-control__right"></div>
      </div>
      <div class="reviews_card"></div>
    </div>
    <div class="mb-[500px]"></div>
    <button @click="updateOrderStatus(orderId, newStatus)">UPDATE</button>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';

import ArrowIcon from '../assets/icons/ArrowIcon.vue';
import CartIcon from '../assets/icons/CartIcon.vue';
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
import New_arrivals from '~/components/new_arrivals.vue';

// Change BaseURL for axios
const api = axios.create({
  baseURL: 'http://localhost:3001',
});

onMounted(() => {
  getProducts();
});

const productsList = ref([]);
let currentPosition = 0;
const limit = 10;
let isFetching = false;
let isMaxReached = false;
const currencyMultiplier = 1;

async function getProducts() {
  if (isFetching || isMaxReached) return;
  isFetching = true;

  try {
    const res = await api.get(
      `/api/products?limit=${limit}&offset=${currentPosition}`
    );

    const newProductsList = res.data.map((product) => {
      const modifiedPrice = (product.price * currencyMultiplier).toFixed(2);
      const discountPrice = product.discount
        ? (product.price * (1 - product.discount / 100)).toFixed(2)
        : null;

      return {
        name: product.name,
        description: product.description,
        price: modifiedPrice,
        discountPrice: discountPrice,
        discount: product.discount,
        GID: product.GID,
        stock: product.stock,
        images: product.images,
        timestamps: product.timestamps,
        rating: product.rating || 4,
      };
    });

    productsList.value.push(...newProductsList);
    currentPosition += limit;
    isMaxReached = newProductsList.length < limit;
  } catch (err) {
    console.error(err);
  } finally {
    isFetching = false;
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
</script>
<style scoped>
@import '/assets/styles/style.css';
</style>
