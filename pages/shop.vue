<template>
  <div>
    <!-- Overlay -->
    <div
      class="shop__modal__overlay"
      @click="closeModalsMobile()"
      :class="{ active: isOverlayActive }"
    ></div>

    <!-- Loading screen while items are being fetched -->
    <div
      v-show="isFetching || initialLoading"
      class="waiting-screen"
      aria-live="polite"
    >
      <div class="loader"></div>
    </div>

    <!-- Sorting controls -->
    <div
      v-if="isHydrated"
      v-show="isSortingShownMobile"
      class="sorting__modal__container"
    >
      <div class="sorting__modal">
        <div class="sorting__modal__title">Sorting options</div>
        <ul class="sorting__modal__options">
          <li
            v-for="(option, index) in sortingOptions"
            :key="option.name"
            @click="(setSortingOption(index), closeModalsMobile())"
            class="sorting__modal__option"
            :class="{
              checked: index === Number(shopSortingOption),
            }"
          >
            <div class="modal__option__text">
              {{ option.name }}
            </div>
            <div
              class="modal__option__checkbox"
              :class="{ checked: index === Number(shopSortingOption) }"
            ></div>
          </li>
        </ul>
        <button @click="closeModalsMobile()" class="modal__close-button">
          Close
        </button>
      </div>
    </div>

    <Breadcrumbs_component />

    <div v-if="isHydrated" class="shop-gallery">
      <!-- Filters -->
      <div class="shop__filters__container">
        <div class="shop__filters" :class="{ opened: areFiltersShownMobile }">
          <div class="filters__title">
            <div class="filters__title-text">Filters</div>
          </div>
          <div @click="resetAllFilters()" class="filters__reset-button">
            <div class="reset-button__text">Reset all</div>
          </div>
          <div class="horizontal-separator-90 mb-4"></div>

          <!-- Category picker -->
          <div class="filters__categories__container">
            <div
              class="filters__section__title filters__categories__title"
              @click="toggleSection('productCategory')"
            >
              <div
                class="filters__categories__title-text filters__children__title-text"
              >
                Categories
              </div>
              <div class="filters__title-icon__container">
                <PointerIcon
                  class="filters__title-icon filters__categories__title-icon"
                  :class="{ rotated: isSectionOpened.productCategory }"
                />
              </div>
            </div>
            <Filter_selector_component
              class="filters__list"
              :class="{ opened: isSectionOpened.productCategory }"
              :products="allProducts"
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
            <div
              class="filters__section__title filters__colors__title"
              @click="toggleSection('color')"
            >
              <div
                class="filters__colors__title-text filters__children__title-text"
              >
                Colors
              </div>
              <div class="filters__title-icon__container">
                <PointerIcon
                  class="filters__title-icon filters__colors__title-icon"
                  :class="{ rotated: isSectionOpened.color }"
                />
              </div>
            </div>
            <Filter_selector_component
              class="filters__list"
              :class="{ opened: isSectionOpened.color }"
              :products="allProducts"
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
            <div
              class="filters__section__title filters__sizes__title"
              @click="toggleSection('size')"
            >
              <div
                class="filters__sizes__title-text filters__children__title-text"
              >
                Sizes
              </div>
              <div class="filters__title-icon__container">
                <PointerIcon
                  class="filters__title-icon filters__sizes__title-icon"
                  :class="{ rotated: isSectionOpened.size }"
                />
              </div>
            </div>
            <Filter_selector_component
              class="filters__list"
              :class="{ opened: isSectionOpened.size }"
              :products="allProducts"
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
            <div
              class="filters__section__title filters__dress-style__title"
              @click="toggleSection('dressStyle')"
            >
              <div
                class="filters__dress-style__title-text filters__children__title-text"
              >
                Dress styles
              </div>
              <div class="filters__title-icon__container">
                <PointerIcon
                  class="filters__title-icon filters__dress-style__title-icon"
                  :class="{ rotated: isSectionOpened.dressStyle }"
                />
              </div>
            </div>
            <Filter_selector_component
              class="filters__list"
              :class="{ opened: isSectionOpened.dressStyle }"
              :products="allProducts"
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
            <div
              class="filters__section__title filters__clothing-type__title"
              @click="toggleSection('clothingType')"
            >
              <div
                class="filters__clothing-type__title-text filters__children__title-text"
              >
                Clothing types
              </div>
              <div class="filters__title-icon__container">
                <PointerIcon
                  class="filters__title-icon filters__clothing-type__title-icon"
                  :class="{ rotated: isSectionOpened.clothingType }"
                />
              </div>
            </div>
            <Filter_selector_component
              class="filters__list"
              :class="{ opened: isSectionOpened.clothingType }"
              :products="allProducts"
              :parameter="'clothingType'"
              :selected="filters.clothingType"
              :combinedQuantity="combinedQuantity"
              :isAnyFilterActive="isAnyFilterActive"
              @filter-updated="(value) => updateFilters(value)"
            />
          </div>

          <div class="horizontal-separator-90 mb-4 mt-4"></div>

          <!-- Brands picker -->
          <div class="filters__brands__container">
            <div
              class="filters__section__title filters__brands__title"
              @click="toggleSection('brand')"
            >
              <div
                class="filters__brands__title-text filters__children__title-text"
              >
                Brands
              </div>
              <div class="filters__title-icon__container">
                <PointerIcon
                  class="filters__title-icon filters__brands__title-icon"
                  :class="{ rotated: isSectionOpened.brand }"
                />
              </div>
            </div>
            <Filter_selector_component
              class="filters__list"
              :class="{ opened: isSectionOpened.brand }"
              :products="allProducts"
              :parameter="'brand'"
              :selected="filters.brand"
              :combinedQuantity="combinedQuantity"
              :isAnyFilterActive="isAnyFilterActive"
              @filter-updated="(value) => updateFilters(value)"
            />
          </div>

          <div
            class="mobile-horizontal-separator horizontal-separator-90 mb-4 mt-4"
          ></div>
          <div class="filters__mobile__close-button">
            <button @click="toggleFiltersMobile()">Close window</button>
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

          <!-- Sorting controls -->
          <div class="products__title-sorting">
            <div class="title-sorting__text">Sort by:</div>
            <div
              v-if="isHydrated"
              class="title-sorting__parameter__container"
              @click="toggleSortingDropdown()"
            >
              <div class="title-sorting__parameter">
                {{ sortingOptions?.[shopSortingOption]?.name }}
              </div>
              <PointerIcon
                class="filters__title-icon"
                :class="{ rotated: isSortingOpened }"
              />
              <div v-show="isSortingOpened" class="sorting__dropdown">
                <div
                  v-for="(option, index) in sortingOptions"
                  :key="option.name"
                  @click="setSortingOption(index)"
                  class="sorting-option"
                  :class="[
                    {
                      highlighted: index === Number(shopSortingOption),
                    },
                    hoveredSortingOption == index ? 'hovered' : '',
                  ]"
                  @mouseover="
                    index == Number(shopSortingOption)
                      ? (hoveredSortingOption = null)
                      : (hoveredSortingOption = index)
                  "
                  @mouseleave="hoveredSortingOption = null"
                >
                  {{ option.name }}
                </div>
              </div>
            </div>
          </div>

          <!-- Mobile Sorting controls -->
          <div
            @click="toggleSortingMobile"
            class="products__title-mobile-sorting"
          >
            <SortingIcon class="sorting__icon" />
          </div>

          <!-- Mobile Filters controls -->
          <div
            @click="toggleFiltersMobile"
            class="products__title-mobile-filters"
          >
            <FiltersIcon class="filters__icon" />
          </div>
        </div>

        <!-- Products masonry list -->
        <div class="products__gallery">
          <RouterLink
            :to="`/item/${item.GID}`"
            v-for="(item, index) in paginatedProducts"
            :key="index"
            class="proucts__gallery__item"
            draggable="false"
          >
            <img class="item__image" :src="item.images[0]" draggable="false" />
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
          </RouterLink>
        </div>

        <!-- Pagination -->
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
// State imports
import { storeToRefs } from 'pinia';
import { useSortingStore } from '@/stores/index.js';

// Data and component imports
import Breadcrumbs_component from '@/components/breadcrumbs_component.vue';
import Filter_selector_component from '@/components/filter_selector_component.vue';
import Product_rating_component from '@/components/product_rating_component.vue';
import Subscribe_news_component from '@/components/subscribe_news_component.vue';

// Icon imports
import ArrowIcon from '@/assets/icons/ArrowIcon.vue';
import FiltersIcon from '@/assets/icons/FiltersIcon.vue';
import PointerIcon from '@/assets/icons/PointerIcon.vue';
import SortingIcon from '@/assets/icons/SortingIcon.vue';

// API endpoint
import { useApi } from '@/composables/useApi.js';
const api = useApi();

// Routing
const route = useRoute();
const router = useRouter();

// Hydration mismatch guard
const isHydrated = ref(false);

// Forbid scrolling until the content is loaded
useHead({
  bodyAttrs: {
    class: 'no-scroll',
  },
  title: 'Shop',
});

onMounted(() => {
  initialLoading.value = false;
  initializeFiltersFromURL();
  getProducts();

  // Hydration mismatch guard
  isHydrated.value = true;
});

onUnmounted(() => {
  watchLayoutDropdownNavigation();
});

// onMounted+NuxtLink vue fix
watch(
  () => route?.query,
  () => {
    initializeFiltersFromURL();
    getProducts();
  }
);

// Layout settings
definePageMeta({
  useWebsitePadding: true,
});

const hoveredSortingOption = ref(null);

// Updating filters and URL
const query = {};
const filters = ref({
  productCategory: [],
  color: [],
  size: [],
  dressStyle: [],
  clothingType: [],
  brand: [],
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
  }

  query.value = newQuery;
  router.push({ query: query.value });
}

function initializeFiltersFromURL() {
  for (const key in route.query) {
    try {
      filters.value[key] = JSON.parse(route.query[key]);
    } catch (err) {
      console.error(`Error parsing filter ${key}: `, err);
    }
  }
}

// Getting all products and filter categories
const products = ref([]);
const filteredProducts = ref([]);
const combinedQuantity = ref({});
const isFetching = ref(false);
const initialLoading = ref(true);

// A products list copy for receiving correct filters. Smth to refactor:
const allProducts = ref([]);
// ^ A products list copy for receiving correct filters. Smth to refactor

async function getAllProducts() {
  try {
    const response = await api.get('/api/products');

    // A products list copy for receiving correct filters. Smth to refactor:
    allProducts.value = response.data.allProducts;
    // ^ A products list copy for receiving correct filters. Smth to refactor

    products.value = mapProductPrices(response.data.products);

    filteredProducts.value = sortProducts(
      products.value,
      shopSortingOption.value
    );

    combinedQuantity.value = response.data.filterCounts;
  } catch (err) {
    console.error(`Error fetching products: `, err);
  }
}

// Getting filtered products and filter categories
async function getProducts() {
  if (isFetching.value) return;
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
      console.error(`Error fetching products: `, err);
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

    // A products list copy for receiving correct filters. Smth to refactor:
    allProducts.value = response.data.allProducts;
    // ^ A products list copy for receiving correct filters. Smth to refactor

    const mappedProducts = mapProductPrices(response.data.products);

    filteredProducts.value = sortProducts(
      mappedProducts,
      shopSortingOption.value
    );

    combinedQuantity.value = response.data.filterCounts;
  } catch (err) {
    console.error(`Error fetching products: `, err);
  } finally {
    isFetching.value = false;
  }
}

// Map product prices
function mapProductPrices(products) {
  return products.map((product) => {
    {
      const modifiedPrice = product.price.toFixed(2);
      const modifiedOldPrice = product.oldPrice?.toFixed(2) || null;
      const discountPercentage =
        Math.round(100 - (modifiedPrice / modifiedOldPrice) * 100) || 0;

      return {
        ...product,
        modifiedPrice,
        modifiedOldPrice,
        discountPercentage,
      };
    }
  });
}

// Reset all filters
async function resetAllFilters() {
  if (!Object.values(filters.value).some((arr) => arr.length > 0)) return;

  for (const key in filters.value) {
    filters.value[key] = [];
  }

  router.push({ query: {} });

  await getProducts();
}

// Reset some filters without fetch
function resetSomeFilters(filterKeys = []) {
  for (const key of filterKeys) {
    if (key in filters.value) {
      filters.value[key] = [];
    }
  }
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
watchEffect(() => {
  if (isFetching.value || initialLoading.value) {
    document?.body.classList.add('no-scroll');
  } else {
    document?.body.classList.remove('no-scroll');
  }
});

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

// If user is navigating via Layout Dropdown while being in the /shop, reset filters
const watchLayoutDropdownNavigation = watch(
  () => router?.currentRoute?.value,
  () => {
    resetSomeFilters([
      'productCategory',
      'color',
      'size',
      'clothingType',
      'brand',
    ]);
    initializeFiltersFromURL();
    getProducts();
  }
);

// Hide and show filters window for mobile view
const areFiltersShownMobile = ref(false);
const isSortingShownMobile = ref(false);
const isOverlayActive = ref(false);
function toggleFiltersMobile() {
  areFiltersShownMobile.value = !areFiltersShownMobile.value;
  isOverlayActive.value = !isOverlayActive.value;
}

function toggleSortingMobile() {
  isSortingShownMobile.value = !isSortingShownMobile.value;
  isOverlayActive.value = !isOverlayActive.value;
}

function closeModalsMobile() {
  areFiltersShownMobile.value = false;
  isSortingShownMobile.value = false;
  isOverlayActive.value = false;
}

// Manage opening and closing filter sections
const isSectionOpened = ref({
  productCategory: true,
  color: true,
  size: true,
  dressStyle: true,
  clothingType: true,
  brand: true,
});

function toggleSection(secName) {
  isSectionOpened.value[secName] = !isSectionOpened.value[secName];
}

// Manage products sorting
const isSortingOpened = ref(false);
function toggleSortingDropdown() {
  isSortingOpened.value = !isSortingOpened.value;
}

const sortingStore = useSortingStore();
const { sortingOptions, shopSortingOption } = storeToRefs(sortingStore);
const { setSortingOption } = sortingStore;

watch(
  shopSortingOption,
  () => {
    getProducts();
  },
  { deep: true }
);

function sortProducts(products, sortingOption) {
  return [...products].sort((a, b) => {
    switch (sortingOption) {
      case 0:
        return b.salesCount - a.salesCount;
      case 1:
        return a.createdAt - b.createdAt;
      case 2:
        return b.discountPercentage - a.discountPercentage;
      case 3:
        return b.rating - a.rating;
      case 4:
        return a.modifiedPrice - b.modifiedPrice;
      case 5:
        return b.modifiedPrice - a.modifiedPrice;
      case 6:
        return a.name.localeCompare(b.name);
      case 7:
        return b.name.localeCompare(a.name);
    }
  });
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
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function nextProductPage() {
  if (currentProductPage.value == totalProductPages.value) return;
  currentProductPage.value++;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Avoid empty pages when filters are activated or deactivated
function checkPageExistence() {
  if (currentProductPage.value > totalProductPages.value) {
    currentProductPage.value = totalProductPages.value;
  } else if (currentProductPage.value < 1) {
    currentProductPage.value = 1;
  }
}

watch(filteredProducts, () => {
  checkPageExistence();
});
</script>
<style scoped>
@import '/assets/styles/shop.css';
</style>
