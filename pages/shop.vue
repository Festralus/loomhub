<template>
  <div>
    <div v-if="isFetching" class="waiting-screen">
      <div class="loader"></div>
    </div>

    <Breadcrumbs_component />

    <div class="shop-gallery">
      <!-- Filters -->
      <div class="shop__filters__container">
        <div class="shop__filters">
          <div class="filters__title">
            <div class="filters__title-text">Filters</div>
          </div>
          <div @click="resetAllFilters()" class="filters__reset-button">
            <div class="reset-button__text">Reset all</div>
          </div>

          <div class="horizontal-separator-90 mb-4"></div>

          <!-- Category picker -->
          <div class="filters__categories__container">
            <div class="filters__categories__title">
              <div
                class="filters__categories__title-text filters__children__title-text"
              >
                Categories
              </div>
              <div
                @click="toggleSection('productCategory')"
                class="filters__title-icon__container"
              >
                <PointerIcon
                  class="filters__title-icon filters__categories__title-icon"
                  :class="{ rotated: isSectionOpened.productCategory }"
                />
              </div>
            </div>
            <Filter_selector_component
              class="filters__list"
              :class="{ opened: isSectionOpened.productCategory }"
              :products="products"
              :parameter="'productCategory'"
              :selected="filters.productCategory"
              :combinedQuantity="combinedQuantity"
              :isAnyFilterActive="isAnyFilterActive"
              @filter-updated="(value) => updateFilters(value)"
            />
          </div>

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

          <div class="horizontal-separator-90 mb-4 mt-4"></div>
          <!-- Colors picker -->
          <div class="filters__colors__container">
            <div class="filters__colors__title">
              <div
                class="filters__colors__title-text filters__children__title-text"
              >
                Colors
              </div>
              <div
                @click="toggleSection('color')"
                class="filters__title-icon__container"
              >
                <PointerIcon
                  class="filters__title-icon filters__colors__title-icon"
                  :class="{ rotated: isSectionOpened.color }"
                />
              </div>
            </div>
            <Filter_selector_component
              class="filters__list"
              :class="{ opened: isSectionOpened.color }"
              :products="products"
              :parameter="'color'"
              :nested="true"
              :selected="filters.color"
              :combinedQuantity="combinedQuantity"
              :isAnyFilterActive="isAnyFilterActive"
              @filter-updated="(value) => updateFilters(value)"
            />
          </div>

          <div class="horizontal-separator-90 mb-4 mt-4"></div>
          <!-- Size picker -->
          <div class="filters__sizes__container">
            <div class="filters__sizes__title">
              <div
                class="filters__sizes__title-text filters__children__title-text"
              >
                Sizes
              </div>
              <div
                @click="toggleSection('size')"
                class="filters__title-icon__container"
              >
                <PointerIcon
                  class="filters__title-icon filters__sizes__title-icon"
                  :class="{ rotated: isSectionOpened.size }"
                />
              </div>
            </div>
            <Filter_selector_component
              class="filters__list"
              :class="{ opened: isSectionOpened.size }"
              :products="products"
              :parameter="'size'"
              :nested="true"
              :selected="filters.size"
              :combinedQuantity="combinedQuantity"
              :isAnyFilterActive="isAnyFilterActive"
              @filter-updated="(value) => updateFilters(value)"
            />
          </div>

          <div class="horizontal-separator-90 mb-4 mt-4"></div>
          <!-- Dress Style picker -->
          <div class="filters__dress-style__container">
            <div class="filters__dress-style__title">
              <div
                class="filters__dress-style__title-text filters__children__title-text"
              >
                Dress styles
              </div>
              <div
                @click="toggleSection('dressStyle')"
                class="filters__title-icon__container"
              >
                <PointerIcon
                  class="filters__title-icon filters__dress-style__title-icon"
                  :class="{ rotated: isSectionOpened.dressStyle }"
                />
              </div>
            </div>
            <Filter_selector_component
              class="filters__list"
              :class="{ opened: isSectionOpened.dressStyle }"
              :products="products"
              :parameter="'dressStyle'"
              :selected="filters.dressStyle"
              :combinedQuantity="combinedQuantity"
              :isAnyFilterActive="isAnyFilterActive"
              @filter-updated="(value) => updateFilters(value)"
            />
          </div>

          <div class="horizontal-separator-90 mb-4 mt-4"></div>
          <!-- Clothing Type picker -->
          <div class="filters__clothing-type__container">
            <div class="filters__clothing-type__title">
              <div
                class="filters__clothing-type__title-text filters__children__title-text"
              >
                Clothing types
              </div>
              <div
                @click="toggleSection('clothingType')"
                class="filters__title-icon__container"
              >
                <PointerIcon
                  class="filters__title-icon filters__clothing-type__title-icon"
                  :class="{ rotated: isSectionOpened.clothingType }"
                />
              </div>
            </div>
            <Filter_selector_component
              class="filters__list"
              :class="{ opened: isSectionOpened.clothingType }"
              :products="products"
              :parameter="'clothingType'"
              :selected="filters.clothingType"
              :combinedQuantity="combinedQuantity"
              :isAnyFilterActive="isAnyFilterActive"
              @filter-updated="(value) => updateFilters(value)"
            />
          </div>

          <div class="horizontal-separator-90 mb-4 mt-4"></div>
          <!-- Brands -->
          <div class="filters__brands__container">
            <div class="filters__brands__title">
              <div
                class="filters__brands__title-text filters__children__title-text"
              >
                Brands
              </div>
              <div
                @click="toggleSection('brand')"
                class="filters__title-icon__container"
              >
                <PointerIcon
                  class="filters__title-icon filters__brands__title-icon"
                  :class="{ rotated: isSectionOpened.brand }"
                />
              </div>
            </div>
            <Filter_selector_component
              class="filters__list"
              :class="{ opened: isSectionOpened.brand }"
              :products="products"
              :parameter="'brand'"
              :selected="filters.brand"
              :combinedQuantity="combinedQuantity"
              :isAnyFilterActive="isAnyFilterActive"
              @filter-updated="(value) => updateFilters(value)"
            />
          </div>
        </div>
      </div>

      <!-- Product gallery -->
      <div class="shop__products">
        <div class="products__title">
          <div class="products__title__text">Products</div>
          <div class="products__title__count">
            Showing
            <span class="title__count-range"
              >{{ visibleProductsStart }}-{{ visibleProductsEnd }}</span
            >
            of
            <span class="title__count-total">{{
              filteredProducts.length
            }}</span>
            Products
          </div>
          <div class="products__title-sorting">
            <div class="title-sorting__text">Sort by:</div>
            <div class="title-sorting__parameter__container">
              <div @click="toggleSorting()" class="title-soting__parameter">
                Most popular
              </div>
              <PointerIcon
                @click="toggleSorting()"
                class="filters__title-icon"
              />
              <div class="sorting__dropdown">
                <div
                  v-for="(option, key) in sortingOptions"
                  @click="(setSortingOption(key), setSortingOption2())"
                  class="sorting-option"
                  :class="{
                    'text-red-500':
                      option.name == sortingOptions[chosenSortingOption].name,
                  }"
                >
                  {{ option.name }}
                </div>
              </div>
            </div>
          </div>
          <div class="products__title-mobile-sorting">
            <FiltersIcon class="filters__icon" />
          </div>
        </div>
        <div class="products__gallery">
          <!-- <div
            v-for="(item, index) in paginatedProducts"
            :key="index"
            @click="goToItem(item.GID)"
            class="proucts__gallery__item"
          > -->
          <div
            v-for="(item, index) in paginatedProducts"
            :key="index"
            @click="goToItem(item.GID)"
            class="proucts__gallery__item"
          >
            <img class="item__image" :src="item.images[0]" />
            <div class="item__title">{{ item.name }}</div>
            <Product_rating_component
              class="item__stars"
              :rating="item.rating"
            />
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
        <div v-show="totalProductPages > 0" class="products__pagination">
          <div
            v-show="currentProductPage !== 1"
            class="pagination__previous-page pagination__navigate-button"
            @click="previousProductPage()"
          >
            <ArrowIcon class="previous-page__icon" />
            <div class="previous-page__text">Previous</div>
          </div>
          <div
            class="pagination__pages"
            :class="[
              {
                'ml-[140px]':
                  currentProductPage == 1 && totalProductPages !== 1,
              },
              { 'mr-[140px]': currentProductPage == totalProductPages },
            ]"
          >
            {{ currentProductPage }}
          </div>
          <div
            v-show="currentProductPage !== totalProductPages"
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
  </div>
</template>
<script setup>
import axios from 'axios';
import Cookies from 'js-cookie';

import Breadcrumbs_component from '~/components/breadcrumbs_component.vue';
import Filter_selector_component from '~/components/filter_selector_component.vue';
import Product_rating_component from '~/components/product_rating_component.vue';
import Subscribe_news_component from '~/components/subscribe_news_component.vue';

import ArrowIcon from '~/assets/icons/ArrowIcon.vue';
import FiltersIcon from '~/assets/icons/FiltersIcon.vue';
import PointerIcon from '~/assets/icons/PointerIcon.vue';

import { storeToRefs } from 'pinia';
import { useSortingStore } from '~/stores';
import { sortingOptions } from '~/stores';

// API settings
const config = useRuntimeConfig();
const api = axios.create({
  baseURL: config.public.apiBase,
});

onMounted(() => {
  getProducts();
  initializeFiltersFromURL();
});

// Layout settings
definePageMeta({
  useWebsitePadding: true,
});

// Routing
const route = useRoute();
const router = useRouter();

// Updating filters and URL
const query = {};

const filters = ref({
  productCategory: ref([]),
  color: ref([]),
  size: ref([]),
  dressStyle: ref([]),
  clothingType: ref([]),
  brand: ref([]),
});

const areFiltersFetching = false;
async function updateFilters({ key, values }) {
  if (areFiltersFetching.value) return;

  filters.value[key] = values;
  // Receive chosen filters from a component
  const newQuery = {};
  for (const key in filters.value) {
    if (filters.value[key].length > 0) {
      newQuery[key] = JSON.stringify(filters.value[key]);
    }

    query.value = newQuery;
    router.push({ query: query.value });
  }

  // try {
  //   areFiltersFetching = true;
  //   api.get('/api/');
  // } catch (err) {
  //   console.error(err);
  // } finally {
  //   areFiltersFetching.value = false;
  // }
}

// REVIEW START
function initializeFiltersFromURL() {
  for (const key in route.query) {
    try {
      filters.value[key] = JSON.parse(route.query[key]);
    } catch (error) {
      console.error(`Error parsing filter ${key}: `, error);
    }
  }
}

// Get all products and filter categories
const products = ref([]);
const filteredProducts = ref([]);
const combinedQuantity = ref({});
const isFetching = ref(false);
const currencyMultiplier = 1;

async function getAllProducts() {
  try {
    const response = await api.get('/api/products');
    products.value = [...response.data.products].map((product) => {
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

    filteredProducts.value = products.value;
    combinedQuantity.value = response.data.filterCounts;
  } catch (err) {
    console.error(err);
  }
}

async function getProducts() {
  if (
    filters.value.productCategory.length == 0 &&
    filters.value.color.length == 0 &&
    filters.value.size.length == 0 &&
    filters.value.dressStyle.length == 0 &&
    filters.value.clothingType.length == 0 &&
    filters.value.brand.length == 0
  )
    try {
      isFetching.value = true;
      await getAllProducts();
      return;
    } catch (err) {
      console.error(err);
      return;
    } finally {
      isFetching.value = false;
    }
  try {
    isFetching.value = true;
    const response = await api.get('/api/products', {
      params: {
        productCategory: filters.value.productCategory,
        color: filters.value.color,
        size: filters.value.size,
        dressStyle: filters.value.dressStyle,
        clothingType: filters.value.clothingType,
        brand: filters.value.brand,
      },
    });

    filteredProducts.value = response.data.products.map((product) => {
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

    combinedQuantity.value = response.data.filterCounts;
  } catch (err) {
    console.error(err);
  } finally {
    isFetching.value = false;
  }
}

// Reset all filters
async function resetAllFilters() {
  for (const key in filters.value) {
    filters.value[key] = [];
  }

  await getProducts();
}

// Filter out items based on chosen filter values
watch(
  filters.value,
  () => {
    getProducts();
  },
  { deep: true }
);

// Loading screen while items are being fetched
watch(
  () => isFetching.value,
  (newVal) => {
    if (newVal) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }
);

// Add available combination numbers to the filters

const emit = defineEmits(['update:combinedQuantity']);

watch(
  combinedQuantity,
  (newVal) => {
    if (newVal) {
      updateCombinedQuantity(newVal);
    }
  },
  { deep: true, immediate: true }
);

function updateCombinedQuantity(newQuantity) {
  for (const key in newQuantity) {
    if (Object.prototype.hasOwnProperty.call(newQuantity, key)) {
      emit('update:combinedQuantity', { key, value: newQuantity[key] });
    }
  }
}

// If no filters active - hide the combined numbers
const isAnyFilterActive = computed(() => {
  return Object.values(filters.value).some((arr) => arr.length > 0);
});

// REVIEW END

// Manage opening and closing filter sections
const isSectionOpened = ref({
  productCategory: true,
  color: true,
  size: true,
  dressStyle: false,
  clothingType: true,
  brand: true,
});

function toggleSection(secName) {
  isSectionOpened.value[secName] = !isSectionOpened.value[secName];
  console.log(isSectionOpened.value[secName]);
}

// Manage products sorting
const isSortingOpened = ref(false);
function toggleSorting() {
  isSortingOpened.value = !isSortingOpened.value;
}

const chosenSortingOption = Cookies.get('shopSortingOption') || 0;
const setSortingOption = useSortingStore().setSortingOption;
function setSortingOption2() {
  // console.log(sortingOptions[chosenSortingOption]);
}

// Products pagination
const currentProductPage = ref(1);
const productsPerPage = 12;
const visibleProductsStart = computed(() => {
  return productsPerPage * currentProductPage.value + 1 - productsPerPage;
});
const visibleProductsEnd = computed(() => {
  if (currentProductPage.value == totalProductPages.value) {
    return filteredProducts?.value.length;
  }
  return productsPerPage * currentProductPage.value;
});

const paginatedProducts = computed(() => {
  const start = (currentProductPage.value - 1) * productsPerPage;
  return filteredProducts.value.slice(start, start + productsPerPage);
});

const totalProductPages = computed(() =>
  Math.ceil(filteredProducts.value.length / productsPerPage)
);

function previousProductPage() {
  if (currentProductPage.value == 1) return;
  currentProductPage.value--;
}

function nextProductPage() {
  if (currentProductPage.value == totalProductPages.value) return;
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
