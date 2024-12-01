<template>
  <div class="website w-[100vw]">
    <header
      class="top-menu flex h-[64px] w-full flex-row justify-between align-middle"
    >
      <BurgerMenuIcon class="w-[12%] flex-shrink-0 sm:hidden" />
      <div class="top-menu__logo font1 text-2xl">LOOM.HUB</div>
      <nav class="top-menu__nav hidden flex-row sm:flex">
        <div class="top-menu__nav-item top-menu__nav-item--shop flex flex-row">
          <div class="top-menu__nav-item--shop-text">Shop</div>
          <ArrowIcon class="top-menu__nav-item--shop-dropdown"></ArrowIcon>
        </div>
        <div class="top-menu__nav-item">On Sale</div>
        <div class="top-menu__nav-item">New Arrivals</div>
        <div class="top-menu__nav-item">Brands</div>
      </nav>
      <div class="top-menu__search flex flex-row">
        <SearchIcon class="top-menu__search-icon" aria-label="Search" />
        <input
          type="text"
          class="top-menu__search-input hidden h-6 md:block"
          placeholder="Search
        for products..."
          aria-label="Search for products"
        />
      </div>
      <div class="top-menu__actions flex w-[21%] flex-shrink-0 flex-row">
        <CartIcon class="top-menu__actions-cart"></CartIcon>
        <ProfileIcon class="top-menu__actions-profile ml-[14px]"></ProfileIcon>
      </div>
    </header>
    <div class="home-description">
      <div class="home-description__interactive">
        <h2
          class="home-description__interactive--main-text font2 max-w-[576px] text-4xl xl:pl-24 xl:pt-24 xl:text-6xl"
        >
          FIND CLOTHES THAT MATCHES YOUR STYLE
        </h2>
        <div class="home-description__interactive--secondary-text">
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of
          style.
        </div>
        <div class="home-description__interactive--button">
          <div class="home-description__interactive--button-text">Shop Now</div>
        </div>
        <div class="home-description__interactive--stats">
          <div class="home-description__interactive--stats-brands">
            200+ International Brands
          </div>
          <div class="home-description__interactive--stats-products">
            2,000+ High-Quality Products
          </div>
          <div class="home-description__interactive--stats-customers">
            30,000+ Happy Customers
          </div>
        </div>
      </div>
      <div class="home-description__background">
        <div class="home-description__background--big-star"></div>
        <div class="home-description__background--small-star"></div>
        <div class="home-description__background--image"></div>
      </div>
    </div>
    <div
      class="popular-brands flex w-[100vw] flex-row flex-wrap justify-evenly bg-black py-5"
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
      <div class="new-arrivals__title">NEW ARRIVALS</div>
      <div class="new-arrivals__items">
        <div class="new-arrivals__items-item">
          <div class="new-arrivals__items-item__pic"></div>
          <div class="new-arrivals__items-item__title"></div>
          <div class="new-arrivals__items-item__rating"></div>
          <div class="new-arrivals__items-item__price">
            $ {{ new_item_price }}
          </div>
        </div>
      </div>
      <div class="new-arrivals__button">
        <div class="new-arrivals__button-text">View All</div>
      </div>
    </div>
    <div class="top-selling">
      <div class="top-selling__title">TOP SELLING</div>
      <div class="top-selling__items">
        <div class="top-selling__items-item">
          <div class="top-selling__items-item__pic"></div>
          <div class="top-selling__items-item__title"></div>
          <div class="top-selling__items-item__rating"></div>
          <div class="top-selling__items-item__price">
            $ {{ top_item_price }}
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
            {{ style_tile_name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import ArrowIcon from '../assets/icons/ArrowIcon.vue';
import CartIcon from '../assets/icons/CartIcon.vue';
import ProfileIcon from '../assets/icons/ProfileIcon.vue';
import SearchIcon from '../assets/icons/SearchIcon.vue';
import GucciIcon from '../assets/icons/GucciIcon.vue';
import PradaIcon from '../assets/icons/PradaIcon.vue';
import VersaceIcon from '../assets/icons/VersaceIcon.vue';
import ZaraIcon from '../assets/icons/ZaraIcon.vue';
import CalvinKleinIcon from '../assets/icons/CalvinKleinIcon.vue';
import BurgerMenuIcon from '../assets/icons/BurgerMenuIcon.vue';
import StarIcon from '../assets/icons/StarIconBig.vue';

const new_item_price = 120;
const top_item_price = 220;
const style_tile_name = 'Casual';
</script>
<style scoped>
@import '/assets/styles/style.css';
</style>
