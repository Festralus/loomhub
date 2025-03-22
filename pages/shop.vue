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

          <div class="horizontal-separator-90"></div>
          <!-- Brands -->
          <div class="filters__brands__container">
            <div class="filters__brands__title">
              <div class="filters__brands__title-text">Brands</div>
              <div class="filters__brands__title-icon"></div>
            </div>

            <Filter_selector_component
              class="filters__list"
              :products="products"
              :parameter="'brand'"
            />
          </div>
        </div>

        <!-- Apply changes button -->
        <button class="filters__apply-button">Apply Filters</button>
      </div>
    </div>
    <!-- Product gallery -->
    <div class="shop__products">
      <div class="products__title">
        <div class="products__title__text">Products</div>
        <div class="products__title__count">
          Showing
          <span class="title__count-range">1-{{ products.length }}</span> of
          <span class="title__count-total">{{ products.length }}</span>
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
          v-for="(item, index) in paginatedProducts"
          :key="index"
          @click="goToItem(item.GID)"
          class="proucts__gallery__item"
        >
          <img class="item__image" :src="item.images[0]" />
          <div class="item__title">{{ item.name }}</div>
          <Product_rating_component class="item__stars" :rating="item.rating" />
          <div class="item__price">
            <span class="item__price-current">${{ item.modifiedPrice }}</span
            ><span v-if="item?.oldPrice" class="item__price-previous"
              >${{ item.modifiedOldPrice }}</span
            ><span v-if="item?.oldPrice" class="item__price-discount"
              >-{{ item.discountPercentage }}%</span
            >
          </div>
        </div>
      </div>
      <div class="products__pagination">
        <div
          class="pagination__previous-page pagination__navigate-button"
          @click="previousProductPage()"
        >
          <ArrowIcon class="previous-page__icon" />
          <div class="previous-page__text">Previous</div>
        </div>
        <div class="pagination__pages">{{ currentProductPage }}</div>
        <div
          class="pagination__next-page pagination__navigate-button"
          @click="nextProductPage()"
        >
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
import Product_rating_component from '~/components/product_rating_component.vue';
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
const currencyMultiplier = 1;

async function getAllProducts() {
  try {
    const response = await api.get('/api/products');
    products.value = [...response.data].map((product) => {
      const modifiedPrice = (product.price * currencyMultiplier).toFixed(2);
      const modifiedOldPrice = (product.oldPrice * currencyMultiplier).toFixed(
        2
      );
      const discountPercentage =
        Math.round(100 - (modifiedPrice / modifiedOldPrice) * 100) || 0;

      return {
        ...product,
        modifiedPrice,
        modifiedOldPrice,
        discountPercentage,
      };
    });
  } catch (err) {
    console.error(err);
  }
}

// Products pagination
const currentProductPage = ref(1);
const productsPerPage = 6; //24

const paginatedProducts = computed(() => {
  const start = (currentProductPage.value - 1) * productsPerPage;
  return products.value.slice(start, start + productsPerPage);
});

const totalProductPages = computed(() =>
  Math.ceil(productProducts.value.length / productsPerPage)
);

function previousProductPage() {
  if (currentProductPage.value == 1) return;
  currentProductPage.value--;
}

function nextProductPage() {
  if (currentProductPage.value == totalProductPages) return;
  currentProductPage.value++;
}

function goToItem(itemId) {
  if (!itemId) return;
  router.push(`/item/${itemId}`);
}
</script>
<style scoped>
@import '/assets/styles/shop.css';
</style>
