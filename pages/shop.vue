<template>
  <Breadcrumbs_component />

  <div class="shop-gallery">
    <!-- Filters -->
    <div class="shop__filters__container">
      <div class="shop__filters">
        <div class="filters__title">
          <div class="filters__title-text">Filters</div>
          <div class="filters__title-icon"></div>
        </div>

        <div class="horizontal-separator-90"></div>

        <!-- Category picker -->
        <Filter_selector_component
          class="filters__list"
          :products="products"
          :parameter="'productCategory'"
        />

        <div class="horizontal-separator-90"></div>
        <!-- Price picker -->
        <!-- <div class="filters__price__container">
          <div class="filters__price__title">
            <div class="filters__price__title-text">Price</div>
            <div class="filters__price__title-icon"></div>
          </div>
          <div class="filters__price__slider">
            <div class="price__slider__line">
              <div class="price__slider__left-slider"></div>
              <div class="price__slider__right-slider"></div>
            </div>
          </div>
        </div> -->

        <div class="horizontal-separator-90"></div>
        <!-- Colors picker -->
        <div class="filters__colors__container">
          <div class="filters__colors__title">
            <div class="filters__colors__title-text">Colors</div>
            <div class="filters__colors__title-icon"></div>
          </div>

          <Filter_selector_component
            class="filters__list"
            :products="products"
            :parameter="'color'"
            :nested="true"
          />
        </div>

        <div class="horizontal-separator-90"></div>
        <!-- Size picker -->
        <div class="filters__sizes__container">
          <div class="filters__sizes__title">
            <div class="filters__sizes__title-text">Sizes</div>
            <div class="filters__sizes__title-icon"></div>
          </div>
        </div>
        <Filter_selector_component
          class="filters__list"
          :products="products"
          :parameter="'size'"
          :nested="true"
        />

        <div class="horizontal-separator-90"></div>
        <!-- Dress Style picker -->
        <div class="filters__dress-style__container">
          <div class="filters__dress-style__title">
            <div class="filters__dress-style__title-text">Dress styles</div>
            <div class="filters__dress-style__title-icon"></div>
          </div>

          <Filter_selector_component
            class="filters__list"
            :products="products"
            :parameter="'dressStyle'"
          />
        </div>

        <div class="horizontal-separator-90"></div>
        <!-- Clothing Type picker -->
        <div class="filters__clothing-type__container">
          <div class="filters__clothing-type__title">
            <div class="filters__clothing-type__title-text">Clothing types</div>
            <div class="filters__clothing-type__title-icon"></div>
          </div>

          <Filter_selector_component
            class="filters__list"
            :products="products"
            :parameter="'clothingType'"
          />
        </div>

        <!-- Apply changes button -->
        <button class="filters__apply-button">Apply Filters</button>
      </div>
    </div>
    <!-- Product gallery -->
    <div class="shop__products">
      <div class="products__title">
        <div class="products__title__text">Casual</div>
        <div class="products__title__count">
          Showing <span class="title__count-range">1-10</span> of
          <span class="title__count-total">100</span>
          Products
        </div>
        <div class="products__title-sorting">
          <div class="title-sorting__text">Sort by:</div>
          <div class="title-soting__parameter">Most popular</div>
          <PointerIcon />
        </div>
        <div class="products__title-mobile-sorting">
          <FiltersIcon class="filters__icon" />
        </div>
      </div>
      <div class="products__gallery">
        <div
          v-for="(item, index) in products"
          :key="index"
          class="proucts__gallery__item"
        >
          <img class="item__image" :src="item.images[0]" />
          <div class="item__title">{{ item.name }}</div>
          <div class="item__stars"></div>
          <div class="item__price">
            <span class="item__price-current">${{ item.price }}</span
            ><span v-if="item?.oldPrice" class="item__price-previous"
              >${{ item.oldPrice }}</span
            ><span v-if="item?.oldPrice" class="item__price-discount">{{
              item.discount
            }}</span>
          </div>
        </div>
      </div>
      <div class="products__pagination">
        <div class="pagination__previous-page">
          <ArrowIcon class="previous-page__icon" />
          <div class="previous-page__text">Previous</div>
        </div>
        <div class="pagination__pages"></div>
        <div class="pagination__next-page">
          <div class="next-page__text">Next</div>
          <ArrowIcon class="next-page__icon" />
        </div>
      </div>
    </div>
  </div>

  <Subscribe_news_component />
</template>
<script setup>
import axios from 'axios';

import Breadcrumbs_component from '~/components/breadcrumbs_component.vue';
import Filter_selector_component from '~/components/filter_selector_component.vue';
import Subscribe_news_component from '~/components/subscribe_news_component.vue';

import ArrowIcon from '~/assets/icons/ArrowIcon.vue';
import FiltersIcon from '~/assets/icons/FiltersIcon.vue';
import PointerIcon from '~/assets/icons/PointerIcon.vue';

// API settings
const config = useRuntimeConfig();
const api = axios.create({
  baseURL: config.public.apiBase,
});

onMounted(() => {
  getAllProducts();
});

// Layout settings
definePageMeta({
  useWebsitePadding: true,
});

// Routing
const route = useRoute();
const router = useRouter();

// Filters
const filters = ref({
  productCategory: route.query.productCategory || [],
  priceMin: route.query.priceMin || 0,
  priceMax: route.query.priceMax || null,
  colors: route.query.colors || [],
  sizes: route.query.sizes || [],
  dressStyle: route.query.dressStyle || [],
  clothingType: route.query.clothingType || [],
});
watch(
  filters,
  (newFilters) => {
    router.push({ query: { ...newFilters } });
  },
  { deep: true }
);

// Get all products and filter categories
const products = ref([]);
async function getAllProducts() {
  try {
    const response = await api.get('/api/products');
    products.value = [...response.data];
    // console.log(products.value);
  } catch (err) {
    console.error(err);
  }
}
</script>
<style scoped>
@import '/assets/styles/shop.css';
</style>
