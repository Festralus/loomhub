<template>
  <div>
    <!-- Loading screen while items are being fetched -->
    <div v-show="isFetching || initialLoading" class="waiting-screen">
      <div class="loader"></div>
    </div>

    <!-- Modal to show incomplete elements -->
    <In_development_component
      v-if="showInDev"
      :target="currentTarget"
      :inDevActive="showInDev"
      @close="showInDev = false"
    />

    <Breadcrumbs_component :history="path"></Breadcrumbs_component>

    <!-- First section - Interactive part -->
    <div v-if="item" class="top__section">
      <div class="item__gallery">
        <div class="secondary-pictures">
          <img
            v-for="(image, i) in item?.images"
            :key="`image-${i}`"
            :src="`${image}`"
            class="item__secondary-picture"
            :class="{ chosen: chosenPicture === i }"
            @click="choosePicture(i)"
          />
        </div>
        <div class="main-picture">
          <img
            class="item__main-picture"
            :src="`${item?.images?.[chosenPicture]}`"
          />
        </div>
      </div>
      <div class="item__interactive-menu">
        <div class="item__name">{{ item?.name }} ({{ item?.brand }})</div>
        <div class="item__rating">
          <Product_rating_component
            @click="scrollToReviews"
            :rating="item?.rating || 4"
            :showRatingNumber="false"
            class="item__rating-stars cursor-pointer"
          />
        </div>
        <div class="item__price">
          <div class="item__price-current">${{ modifiedPrice }}</div>
          <div v-if="item?.oldPrice" class="item__price-old">
            ${{ item?.oldPrice }}
          </div>
          <div v-if="item?.oldPrice" class="item__discount">
            -{{ discountPercentage }}%
          </div>
        </div>
        <div class="item__description SatoshiRegular text-4">
          {{ item?.description }}
        </div>
        <div class="horizontal-separator-100 mt-5"></div>
        <div class="item__colors-container">
          <div class="item__colors__title">Select Colors</div>
          <div class="item__colors__list">
            <div
              v-for="(color, i) in itemColors"
              :key="i"
              class="item__colors__button"
            >
              <div
                @click="chooseColor(i)"
                class="item__available-colors"
                :style="
                  color?.isMulticolor
                    ? {}
                    : { backgroundColor: `#${color.hexValue}` }
                "
                :class="[
                  chosenColor == i && !color?.isMulticolor ? 'selected' : '',
                  color.isMulticolor ? 'multicolor-image' : '',
                  chosenColor == i && color?.isMulticolor
                    ? 'multicolor-selected'
                    : '',
                ]"
              ></div>
            </div>
          </div>
        </div>
        <div class="horizontal-separator-100 mt-5"></div>
        <div class="item__size-container">
          <div class="item__size__title">Choose size</div>
          <div class="item__size__list select-none">
            <!-- <div
              v-for="(size, i) in itemSizes"
              :key="size"
              @click="chooseSize(i)"
              class="item__size__button"
              :class="chosenSize == i ? 'chosen-size-highlighted' : ''"
            >
              {{ size }}
            </div> -->
            <div
              v-for="(size, i) in itemSizes"
              :key="size"
              @click="chooseSize(i)"
              class="item__size__button"
              :class="{ 'chosen-size-highlighted': chosenSize == i }"
            >
              {{ size }}
            </div>
          </div>
        </div>
        <div class="horizontal-separator-100 mt-5"></div>
        <div class="item__cart">
          <div class="item__cart-quantity">
            <div
              @click="decrementCounter"
              class="item__cart-quantity--minus flex h-full cursor-pointer items-center justify-center"
            >
              <MinusIcon />
            </div>
            <div class="item__cart-quantity--number select-none">
              {{ counter }}
            </div>
            <div
              @click="incrementCounter"
              class="item__cart-quantity--plus flex h-full cursor-pointer items-center justify-center"
            >
              <PlusIcon />
            </div>
            <div class="item__cart-possible-quantity select-none">
              (available:
              <span class="item__cart-possible-quantity__span">
                &nbsp;{{ +availableQuantity }}</span
              >)
            </div>
          </div>
          <div
            class="item__cart-button cursor-pointer select-none"
            @click="openInDev('Cart')"
          >
            Add to Cart
          </div>
        </div>
      </div>
    </div>

    <!-- Second section - Tabs controller -->
    <div v-if="item" class="item__tabs">
      <!-- Tabs menu -->
      <div class="tabs__list" ref="productTabsRefs">
        <!-- First tab - Details -->
        <div
          @click="(switchProductTab(0), (hoveredTabName = null))"
          class="tabs__list__tab item-tabs__details-tab"
          :class="[
            { chosen: currentProductTab === 0 },
            { 'tab-name__hovered': hoveredTabName === 0 },
          ]"
          @mouseover="currentProductTab === 0 ? '' : (hoveredTabName = 0)"
          @mouseleave="hoveredTabName = null"
        >
          Product Details
        </div>

        <!-- Second tab - Reviews -->
        <div
          @click="(switchProductTab(1), (hoveredTabName = null))"
          class="tabs__list__tab item-tabs__reviews-tab"
          :class="[
            { chosen: currentProductTab === 1 },
            { 'tab-name__hovered': hoveredTabName === 1 },
          ]"
          @mouseover="currentProductTab === 1 ? '' : (hoveredTabName = 1)"
          @mouseleave="hoveredTabName = null"
          ref="ratingReviewsTab"
        >
          Rating & Reviews
        </div>

        <!-- Third tab - FAQs -->
        <div
          @click="(switchProductTab(2), (hoveredTabName = null))"
          class="tabs__list__tab item-tabs__FAQ-tab"
          :class="[
            { chosen: currentProductTab === 2 },
            { 'tab-name__hovered': hoveredTabName === 2 },
          ]"
          @mouseover="currentProductTab === 2 ? '' : (hoveredTabName = 2)"
          @mouseleave="hoveredTabName = null"
        >
          FAQs
        </div>
      </div>

      <!-- Details tab contents -->
      <div v-show="currentProductTab == 0" class="details-tab__container">
        <table class="details-tab__table">
          <tbody>
            <tr v-for="(value, key) in productDetails" :key="key" class=" ">
              <th class="details-tab__table-header">
                {{ formatKey(key) }}
              </th>
              <td class="details-tab__table-data">
                <div class="table-data__value">{{ formatValue(value) }}</div>
                <NuxtLink
                  :to="similarLinks[key]"
                  v-if="isKeyFilter(key)"
                  class="table-data__link"
                >
                  Click to find similar products
                </NuxtLink>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="details-tab__photos">
          <div
            v-for="(item, index) in item?.detailsImages"
            :key="`image-${index}`"
            class="details-tab__lazy-photo"
          >
            <img :src="item" class="details-tab__photo" loading="lazy" />
          </div>
        </div>
      </div>

      <!-- Reviews tab contents -->
      <div
        v-show="productReviews !== undefined && currentProductTab == 1"
        class="reviews-tab__container"
      >
        <div class="reviews__top-line">
          <div class="reviews">
            <div class="reviews__menu" ref="reviewsMenuRef">
              <div class="reviews-menu__title">
                All reviews
                <span class="reviews-menu__title__number"
                  >({{ totalReviewsCount }})</span
                >
              </div>
              <div class="reviews-menu__management">
                <div
                  v-show="totalReviewsCount > 1"
                  class="reviews-menu__sorting"
                >
                  <div
                    class="sorting__dropdown-menu"
                    @click="toggleSortingList()"
                  >
                    <div class="sorting__dropdown-menu__text">
                      {{ chosenSortingParameterName }}
                    </div>
                    <PointerIcon
                      class="sorting__dropdown-arrow"
                      :class="{ active: isSortingListActive }"
                      :strokeWidth="0.5"
                    />
                  </div>
                  <div
                    v-show="isSortingListActive"
                    class="sorting__dropdown-menu__options"
                  >
                    <div
                      class="sorting__dropdown-menu__option"
                      @click="changeSortingParameter(0, 'Newest')"
                    >
                      Newest
                    </div>
                    <div
                      class="sorting__dropdown-menu__option"
                      @click="changeSortingParameter(1, 'Oldest')"
                    >
                      Oldest
                    </div>
                    <div
                      class="sorting__dropdown-menu__option"
                      @click="changeSortingParameter(2, 'Best')"
                    >
                      Best
                    </div>
                    <div
                      class="sorting__dropdown-menu__option"
                      @click="changeSortingParameter(3, 'Worst')"
                    >
                      Worst
                    </div>
                  </div>
                </div>
                <button
                  class="reviews-menu__write-button"
                  @click="openInDev('Write Review')"
                >
                  Write a Review
                </button>
              </div>
            </div>
          </div>

          <!-- Block to show when there are no reviews -->
          <div
            v-show="totalReviewsCount < 1"
            class="no-reviews-available__container"
          >
            <div class="no-reviews__text">
              Nobody has reviewed this item yet
            </div>
          </div>

          <!-- Review cards masonry -->
          <div class="reviews__list">
            <div
              class="reviews__card button-border"
              :class="{ 'review__card-collapsed': !expandedReviews[index] }"
              v-for="(review, index) in paginatedReviews"
              :key="'main-' + index"
              ref="reviewCardsRefs"
            >
              <Product_rating_component
                class="reviews__card__stars"
                v-if="review"
                :rating="review.rating"
                :starsSize="6"
              />
              <div class="reviews__card__name-line flex items-end">
                <div class="reviews__card__name SatoshiBold mt-2 text-xl">
                  {{ review?.user }}
                </div>
                <VerifiedTickIcon
                  class="reviews__card__verified mb-1 ml-1 size-5"
                ></VerifiedTickIcon>
              </div>
              <div
                class="reviews__card__text SatoshiRegular mt-1 text-gray-500"
                :class="{
                  'reviews__card__text-collapsed': !expandedReviews[index],
                }"
              >
                "{{ review?.comment }}"
              </div>
              <div
                v-show="isExpandButtonShown[index] || expandedReviews[index]"
                @click="toggleReview(index)"
                class="reviews__full-review"
              >
                {{ expandedReviews[index] ? 'Hide review' : '' }}
                {{
                  isExpandButtonShown[index] && !expandedReviews[index]
                    ? 'View full review'
                    : ''
                }}
              </div>
              <div class="reviews__card__date">
                Posted on {{ review?.createdAt }}
              </div>
            </div>
          </div>

          <!-- Reviews pagination -->
          <div v-show="totalReviewPages > 0" class="reviews__pages">
            <ArrowIcon
              v-show="currentReviewPage !== 1"
              @click="previousReviewPage"
              class="reviews__previous-page"
            />
            <div
              class="reviews__current-page"
              :class="[
                {
                  'ml-[54px]': currentReviewPage == 1 && totalReviewPages !== 1,
                },
                { 'mr-[54px]': currentReviewPage == totalReviewPages },
              ]"
            >
              {{ currentReviewPage }}
            </div>
            <ArrowIcon
              v-show="currentReviewPage !== totalReviewPages"
              @click="nextReviewPage"
              class="reviews__next-page"
            />
          </div>
        </div>
      </div>

      <!-- FAQs tab contents -->
      <div v-show="currentProductTab == 2" class="FAQ-tab__container">
        <div class="FAQ-tab__question">
          <span class="FAQ-tab__question-bullet">•</span> What is the estimated
          delivery time for this product?
        </div>
        <div class="FAQ-tab__answer">
          The delivery time for this product depends on your location.
          Typically, it takes 3-5 business days for delivery within the country.
          For international shipping, delivery can take up to 10 business days.
        </div>

        <div class="FAQ-tab__question">
          <span class="FAQ-tab__question-bullet">•</span> Do you offer free
          shipping?
        </div>
        <div class="FAQ-tab__answer">
          Yes, we offer free standard shipping on orders over $50. For orders
          below that amount, a flat shipping fee of $5.99 will apply.
        </div>

        <div class="FAQ-tab__question">
          <span class="FAQ-tab__question-bullet">•</span> Can I return the
          product if I'm not satisfied?
        </div>
        <div class="FAQ-tab__answer">
          Absolutely! You can return most products within 30 days of receipt for
          a full refund. Please ensure that the product is in unused and
          resalable condition.
        </div>

        <div class="FAQ-tab__question">
          <span class="FAQ-tab__question-bullet">•</span> How do I initiate a
          return or exchange?
        </div>
        <div class="FAQ-tab__answer">
          To initiate a return or exchange, simply
          <a
            target="_blank"
            href="https://t.me/andrey_omelch"
            class="FAQ__contact-support"
            >contact our customer support</a
          >
          team through our website, and they will guide you through the process.
          You will need to provide your order number and reason for the return.
        </div>

        <div class="FAQ-tab__question">
          <span class="FAQ-tab__question-bullet">•</span> What payment methods
          do you accept?
        </div>
        <div class="FAQ-tab__answer">
          We accept all major credit and debit cards, including Visa,
          MasterCard, and American Express. We also accept PayPal, Apple Pay,
          and Google Pay for added convenience.
        </div>

        <div class="FAQ-tab__question">
          <span class="FAQ-tab__question-bullet">•</span> How can I track my
          order?
        </div>
        <div class="FAQ-tab__answer">
          Once your order has shipped, we will send you a tracking number via
          email. You can use this tracking number to check the status of your
          delivery on the carrier's website.
        </div>
      </div>
    </div>

    <!-- Third section - Relevant products -->
    <div v-show="item" class="relevant-products">
      <div class="relevant-products__title">YOU MIGHT ALSO LIKE</div>
      <Slider_component
        v-show="item"
        class="relevant-products__slider w-max-full mx-auto overflow-hidden"
        filterName="getRelatedItems"
        :productID="productID"
        :item="item"
      />
    </div>

    <Subscribe_news_component />
  </div>
</template>
<script setup>
// State management imports
import { useAuthStore } from '@/stores/index';

// Comonent and data imports
import all_colors from '@/data/colors';
import Breadcrumbs_component from '@/components/breadcrumbs_component.vue';
import Product_rating_component from '@/components/product_rating_component.vue';
import Slider_component from '@/components/slider_component.vue';
import Subscribe_news_component from '@/components/subscribe_news_component.vue';

// Icon imports
import ArrowIcon from '@/assets/icons/ArrowIcon.vue';
import MinusIcon from '@/assets/icons/MinusIcon.vue';
import PlusIcon from '@/assets/icons/PlusIcon.vue';
import PointerIcon from '@/assets/icons/PointerIcon.vue';
import VerifiedTickIcon from '@/assets/icons/VerifiedTickIcon.vue';

onMounted(() => {
  watch(paginatedReviews, () => {
    checkReviewHeight();
  });
});

// Product item ref
const item = ref(null);

// In development popup
const showInDev = ref(false);
const currentTarget = ref('');
function openInDev(string) {
  currentTarget.value = string;
  showInDev.value = true;
}

// Change page title
watch(item, (arrivedItem) => {
  if (arrivedItem) {
    useHead({
      title: `${arrivedItem.name} (${arrivedItem.brand}) - LoomHub`,
    });
  }
});

// Layout settings
definePageMeta({
  useWebsitePadding: true,
});

// API endpoint
import { useApi } from '@/composables/useApi.js';
const api = useApi();

// Check and set global variables
const getSession = useAuthStore().getSession;

onBeforeMount(() => {
  initialLoading.value = false;
  setChosenItem();
  getSession();
});

const hoveredTabName = ref(null);

// Get product information
const productID = ref('');
const path = ref('');
const itemColors = ref([]);
const itemSizes = ref([]);
const modifiedPrice = ref(null);
const discountPercentage = ref(null);
const similarLinks = ref({});
const filterKeys = ref(['brand', 'productCategory', 'clothingType']);
// const filterKeys = ref(['brand', 'productCategory', 'clothingType', 'country']);

// Loading screen while item is being fetched
const isFetching = ref(false);
const initialLoading = ref(true);

// Forbid scrolling while item is being fetched
const bodyClass = computed(() =>
  isFetching.value || initialLoading.value ? 'no-scroll' : ''
);
useHead({
  bodyAttrs: {
    class: bodyClass,
  },
});

// Loading screen while item is being fetched
if (isFetching.value) {
  document?.body.classList.add('no-scroll');
}

// Getting the product
async function setChosenItem() {
  if (isFetching.value) return;
  path.value = window.location.pathname;
  const segments = path.value.split('/');
  productID.value = segments.pop();

  try {
    isFetching.value = true;

    const res = await api.post('/api/productByGid', {
      itemGID: productID.value,
    });
    item.value = res.data;

    // Set the price
    modifiedPrice.value = res.data.price.toFixed(2);
    if (res.data.oldPrice) {
      const modifiedOldPrice = res.data.oldPrice.toFixed(2);

      discountPercentage.value = Math.round(
        100 - (modifiedPrice.value / modifiedOldPrice) * 100
      );
    }

    // Set available colors
    const availableColors = res.data.stock.map((product) => {
      return product.color;
    });
    const uniqueColors = [...new Set(availableColors)];

    itemColors.value = uniqueColors.map((color) => {
      if (color.toLowerCase() == 'multicolor') {
        return { hex: null, name: color, isMulticolor: true };
      }
      const hexValue = all_colors.find(
        (item) => item.name.toLowerCase() == color.toLowerCase()
      ).hex;
      return { hexValue, name: color, isMulticolor: false };
    });

    // Set available sizes
    const availableSizes = res.data.stock.map((product) => {
      return product.size;
    });
    itemSizes.value = [...new Set(availableSizes)];

    // Set available quantity
    await fetchAvailableStock();
    await fetchProductReviews();
    await fetchProductDetails();
    chooseColor(0);
    sortReviews();

    // Set similar links
    setSimilarLinks(res.data);
  } catch (err) {
    console.error(err);
  } finally {
    isFetching.value = false;
  }
}

function setSimilarLinks(data) {
  filterKeys.value.forEach((key) => {
    const value = data[key];
    if (value) {
      similarLinks.value[key] = setLink(key, value);
    }
  });
}

function setLink(parameter, paramValue) {
  const lowerValue = paramValue.toLowerCase();

  if (parameter === 'clothingType') {
    if (lowerValue === 'women') {
      return {
        path: '/shop',
        query: {
          clothingType: JSON.stringify(['Unisex', 'Women']),
        },
      };
    } else if (lowerValue === 'men') {
      return {
        path: '/shop',
        query: {
          clothingType: JSON.stringify(['Men', 'Unisex']),
        },
      };
    } else {
      return {
        path: '/shop',
        query: {
          clothingType: JSON.stringify(['Unisex']),
        },
      };
    }
  }

  return {
    path: '/shop',
    query: {
      [parameter]: JSON.stringify([paramValue]),
    },
  };
}

// Item gallery style, 33% or 50% width depending on image quantity?
// const secondaryPictureWidth = computed(() => {
//   return {
//     maxWidth: `${100 / item.images.value.length}%`,
//   };
// });

// Product quantity counter
const counter = ref(1);
function incrementCounter() {
  if (counter.value >= availableQuantity.value) {
    counter.value = availableQuantity.value;
    return;
  }
  counter.value++;
}
function decrementCounter() {
  if (counter.value <= 1) {
    counter.value = 1;
    return;
  }
  counter.value--;
}

// Choose product picture
const chosenPicture = ref(0);
function choosePicture(index) {
  chosenPicture.value = index;
}

// Choose product color
const chosenColor = ref(0);
function chooseColor(index) {
  chosenColor.value = index;
  chosenSize.value = 0;
  counter.value = 1;

  // Filter out unavailable sizes
  itemSizes.value = item?.value?.stock;
  itemSizes.value = item?.value?.stock
    .filter(
      (product) => product.color == itemColors.value[chosenColor.value].name
    )
    .map((product) => product.size);
}

// Choose product size
const chosenSize = ref(0);
function chooseSize(index) {
  chosenSize.value = index;
  counter.value = 1;
}

// Watch for color or size changes
watch([chosenColor, chosenSize], () => {
  fetchAvailableStock();
});

// Get product quantity for chosen color and size
const availableQuantity = ref(1);
const chosenColorName = ref(null);
function fetchAvailableStock() {
  // Convert color from hex to name
  if (itemColors.value[chosenColor.value].isMulticolor) {
    chosenColorName.value = 'multicolor';
  } else {
    chosenColorName.value = itemColors.value[chosenColor.value].name;
  }

  const result = item.value.stock.find(
    (product) =>
      chosenColorName.value.toLowerCase() == product.color.toLowerCase() &&
      itemSizes.value[chosenSize.value] == product.size
  );
  availableQuantity.value = result ? result.quantity : 0;
}

// Product Tabs
const productTabsRefs = ref([]);
const currentProductTab = ref(1);
function switchProductTab(index) {
  currentProductTab.value = index;
}

const isSortingListActive = ref(false);
const chosenSortingParameter = ref(0);
const chosenSortingParameterName = ref('Newest');
function changeSortingParameter(par, name) {
  chosenSortingParameter.value = par;
  chosenSortingParameterName.value = name;
  sortReviews();
  toggleSortingList();
}

function toggleSortingList() {
  isSortingListActive.value = !isSortingListActive.value;
}

function sortReviews() {
  expandedReviews.value = [];
  isExpandButtonShown.value = [];
  checkReviewHeight();

  switch (chosenSortingParameter.value) {
    case 0:
      productReviews.value.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });
      break;
    case 1:
      productReviews.value.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateA.getTime() - dateB.getTime();
      });
      break;
    case 2:
      productReviews.value.sort((a, b) => {
        return b.rating - a.rating;
      });
      break;
    case 3:
      productReviews.value.sort((a, b) => {
        return a.rating - b.rating;
      });
      break;
  }
}

// Reviews tab
// Getting product reviews
const productReviews = ref([]);
const totalReviewsCount = computed(() => productReviews.value.length);

async function fetchProductReviews() {
  try {
    // Get an array of reviews
    const res = await api.post('/api/getProductReview', {
      productID: productID.value,
    });

    if (!Array.isArray(res.data)) {
      throw new Error(
        `Error: API did not return an array: ${JSON.stringify(res.data)}`
      );
    }

    // Modify nicknames and dates to match the rules
    const reviewsResponse = res.data.map((review) => {
      const createdAt = new Date(review.createdAt);

      // Show name normally with space
      const splitIndex = review.user.slice(1).search(/[A-Z]/) + 1;
      const firstName =
        review.user.slice(0, splitIndex).charAt(0).toLocaleUpperCase() +
        review.user.slice(0, splitIndex).slice(1).toLocaleLowerCase();
      const lastName =
        review.user.slice(splitIndex).charAt(0).toLocaleUpperCase() +
        review.user.slice(splitIndex).slice(1).toLocaleLowerCase();
      const fullName = `${firstName} ${lastName}`;

      return {
        ...review,
        user: fullName,
        // user:
        //   review.user.charAt(0).toLocaleUpperCase() +
        //   review.user.slice(1).toLocaleLowerCase(),
        createdAt: createdAt
          ? createdAt.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          : 'Unknown date',
      };
    });
    productReviews.value = reviewsResponse;
  } catch (err) {
    console.error(`Error while fetching product reviews:`, err.message);
  }
}

// Expand and collapse long reviews
// Might also add checks on window resize to find new reviews that need Expand button. Would hurt performance though even with debounce.
const reviewCardsRefs = ref([]);
const isExpandButtonShown = ref([]);
const expandedReviews = ref([]);

function checkReviewHeight() {
  nextTick(() => {
    if (!reviewCardsRefs.value.length) return;

    paginatedReviews.value.forEach((_, index) => {
      const el = reviewCardsRefs.value[index];
      if (!el) return;

      const textEl = el.querySelector('.reviews__card__text');
      if (!textEl) return;

      isExpandButtonShown.value[index] =
        textEl.scrollHeight > textEl.clientHeight;
    });
  });
}

function toggleReview(reviewId) {
  expandedReviews.value[reviewId] = !expandedReviews.value[reviewId];
}

// Reviews pagination
const currentReviewPage = ref(1);
const reviewsPerPage = 6;

const paginatedReviews = computed(() => {
  const start = (currentReviewPage.value - 1) * reviewsPerPage;
  return productReviews.value.slice(start, start + reviewsPerPage);
});

const totalReviewPages = computed(() =>
  Math.ceil(productReviews.value.length / reviewsPerPage)
);

// Reviews ref that is needed for scroll
const reviewsMenuRef = ref();
function previousReviewPage() {
  if (currentReviewPage.value == 1 || productReviews.value === undefined)
    return;
  expandedReviews.value = [];
  isExpandButtonShown.value = [];
  currentReviewPage.value--;

  reviewsMenuRef.value.scrollIntoView({ behavior: 'smooth' });
}

function nextReviewPage() {
  if (
    currentReviewPage.value == totalReviewPages ||
    productReviews.value === undefined
  )
    return;
  expandedReviews.value = [];
  isExpandButtonShown.value = [];
  currentReviewPage.value++;

  reviewsMenuRef.value.scrollIntoView({ behavior: 'smooth' });
}

const ratingReviewsTab = ref();
function scrollToReviews() {
  if (!item) return;
  switchProductTab(1);
  nextTick(() => {
    ratingReviewsTab.value.scrollIntoView({ behavior: 'smooth' });
  });
}

// Details tab
const productDetails = ref({});
function fetchProductDetails() {
  const availableColors =
    item.value.colors.length > 1
      ? item.value.colors.join(', ')
      : item.value.colors[0];
  const availableSizes =
    item.value.sizes.length > 1
      ? item.value.sizes.join(', ')
      : item.value.sizes;

  productDetails.value = {
    name: item.value?.name,
    brand: item.value?.brand,
    description: item.value?.description,
    productCategory: item.value?.productCategory,
    composition: item.value?.composition,
    clothingType: item.value?.clothingType,
    availableColors: availableColors,
    availableSizes: availableSizes,
    careInstructions: item.value?.careInstructions,
    country: item.value?.country,
    brandStyleID: item.value?.brandStyleID,
  };
}
function isKeyFilter(key) {
  return filterKeys.value.includes(key);
}
function formatKey(key) {
  return key
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/_/g, ' ')
    .replace(/\bId\b/gi, 'ID')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

// Make sure that arrays are displayed nicely in product details tab
function formatValue(val) {
  if (Array.isArray(val)) {
    return val.join(', ');
  }
  return val;
}
</script>
<style scoped>
@import '@/assets/styles/item.css';
</style>
