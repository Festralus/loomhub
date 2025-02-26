<template>
  <div>
    <BreadcrumbsComponent :history="path"></BreadcrumbsComponent>
    <div class="top__section">
      <div class="item__gallery">
        <div class="secondary-pictures">
          <img
            v-for="(image, i) in itemImages"
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
            :src="`${itemImages[chosenPicture]}`"
          />
        </div>
      </div>
      <div class="item__interactive-menu">
        <div class="item__name">{{ item?.name }} ({{ item?.brand }})</div>
        <div class="item__rating">
          <ProductRatingComponent
            v-if="item"
            :product="item"
            :showRatingNumber="false"
            class="item__rating-stars"
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
          <div class="item__size__list">
            <div
              v-for="(size, i) in itemSizes"
              :key="size"
              @click="chooseSize(i)"
              class="item__size__button"
              :class="chosenSize == i ? 'chosen-size-highlighted' : ''"
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
            <div class="item__cart-possible-quantity">
              (available:
              <span class="item__cart-possible-quantity__span">
                &nbsp{{ +availableQuantity }}</span
              >)
            </div>
          </div>
          <div
            class="item__cart-button cursor-pointer select-none"
            @click="openInDev('Cart')"
          >
            Add to Cart
          </div>
          <In_development_component
            v-if="showInDev"
            :target="currentTarget"
            :inDevActive="showInDev"
            @close="showInDev = false"
          />
        </div>
      </div>
    </div>
    <div class="item__tabs">
      <div class="tabs__list">
        <div class="item-tabs__details-tab">Product Destails</div>
        <div class="item-tabs__reviews-tab">Rating & Reviews</div>
        <div class="item-tabs__FAQ-tab">FAQs</div>
      </div>
      <div class="details-tab__container">
        <div>DETAILS INFORMATION: COUNTRY, MATERIAL, ETC</div>
      </div>

      <!-- Reviews -->
      <div class="reviews-tab__container">
        <div class="reviews__top-line">
          <div class="reviews">
            <div class="reviews__menu">
              <div class="reviews-menu__title">
                All reviews ({{ totalReviewsCount }})
              </div>
              <button class="reviews-menu__filter-button">
                <div class="reviews-menu__filter-popup">POPUP WINDOW</div>
              </button>
              <button class="reviews-menu__write-button">Write a Review</button>
            </div>
          </div>

          <!-- Review cards masonry -->
          <div class="reviews__list">
            <div
              class="reviews__card button-border"
              :class="{ 'review__card-collapsed': !expandedReviews[index] }"
              v-for="(review, index) in paginatedReviews"
              :key="'main-' + index"
              ref="reviewCardRefs"
            >
              <ProductRatingComponent
                class="reviews__card__stars"
                v-if="review"
                :product="review"
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
                v-show="shouldShowExpandButton[index] || expandedReviews[index]"
                @click="toggleReview(index)"
                class="reviews__full-review"
              >
                {{ expandedReviews[index] ? 'Hide review' : '' }}
                {{
                  shouldShowExpandButton[index] && !expandedReviews[index]
                    ? 'View full review'
                    : ''
                }}
              </div>
              <div class="reviews__card__date">
                Posted on {{ review?.createdAt }}
              </div>
            </div>
          </div>
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
      <div class="FAQ-tab__container">
        GENERAL QUESTIONS (SIMILAR FOR EACH ITEM): DELIVERY DETAILS, REFUND
        OPTIONS, ETC
      </div>
    </div>
  </div>
</template>
<script setup>
// Imports
import { useAuthStore } from '@/stores/index';
import all_colors from '@/data/colors';
import axios from 'axios';

import ArrowIcon from '../assets/icons/ArrowIcon.vue';
import MinusIcon from '@/assets/icons/MinusIcon.vue';
import PlusIcon from '@/assets/icons/PlusIcon.vue';
import VerifiedTickIcon from '@/assets/icons/VerifiedTickIcon.vue';

import BreadcrumbsComponent from '@/components/breadcrumbs_component.vue';
import In_development_component from '@/components/in_development_component.vue';

onMounted(() => {
  watch(paginatedReviews, () => {
    checkReviewHeight();
  });
});

// Important refs
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

// API settings
const config = useRuntimeConfig();
const api = axios.create({
  baseURL: config.public.apiBase,
});

// Check and set global variables
const checkSession = useAuthStore().checkSession;

onBeforeMount(() => {
  checkSession();
  setChosenItem();
});

// Enable routing
const router = useRouter();

// Get product information
const path = ref('');
const productID = ref('');
const itemImages = ref([]);
const itemStock = ref([]);
const itemColors = ref([]);
const itemSizes = ref([]);
const modifiedPrice = ref(null);
const discountPercentage = ref(null);
const currencyMultiplier = 1;
async function setChosenItem() {
  path.value = window.location.pathname;
  const segments = path.value.split('/');
  productID.value = segments.pop();

  try {
    const res = await api.post('/api/productByGid', {
      itemGID: productID.value,
    });
    item.value = res.data;
    itemImages.value = res.data.images;
    itemStock.value = res.data.stock;

    // Set the price
    modifiedPrice.value = (res.data.price * currencyMultiplier).toFixed(2);
    if (res.data.oldPrice) {
      const modifiedOldPrice = (res.data.oldPrice * currencyMultiplier).toFixed(
        2
      );

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
    fetchAvailableStock();
    getProductReviews();
  } catch (err) {
    console.error(err);
  }
}

// Item gallery style, 33% or 50% width depending on image quantity?
// const secondaryPictureWidth = computed(() => {
//   return {
//     maxWidth: `${100 / itemImages.value.length}%`,
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

// Choose color
const chosenColor = ref(0);
function chooseColor(index) {
  chosenColor.value = index;
  chosenSize.value = 0;
  counter.value = 1;

  // Filter out unavailable sizes
  itemSizes.value = item.value.stock
    .filter(
      (product) => product.color == itemColors.value[chosenColor.value].name
    )
    .map((product) => product.size);
}

// Choose size
const chosenSize = ref(0);
function chooseSize(index) {
  chosenSize.value = index;
  counter.value = 1;
}

// Track color and size changes
watch([chosenColor, chosenSize], () => {
  fetchAvailableStock();
});

// Get product quantity for chosen color and size
const availableQuantity = ref(1);
const chosenColorName = ref(null);
function fetchAvailableStock() {
  // Reverse color from hex to name
  if (itemColors.value[chosenColor.value].isMulticolor) {
    chosenColorName.value = 'multicolor';
  } else {
    // chosenColorName.value = all_colors.find(
    //   (item) =>
    //     item.hex.toLowerCase() ==
    //     itemColors.value[chosenColor.value].hexValue.toLowerCase()
    // ).name;
    chosenColorName.value = itemColors.value[chosenColor.value].name;
  }

  const result = item.value.stock.find(
    (product) =>
      chosenColorName.value.toLowerCase() == product.color.toLowerCase() &&
      itemSizes.value[chosenSize.value] == product.size
  );
  availableQuantity.value = result ? result.quantity : 0;
}

// Reviews
// Get product reviews
const productReviews = ref([]);
const totalReviewsCount = computed(() => productReviews.value.length);

async function getProductReviews() {
  try {
    // Get an array of reviews
    const res = await api.post('/api/findProductReview', {
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
      return {
        ...review,
        user:
          review.user.charAt(0).toLocaleUpperCase() +
          review.user.slice(1).toLocaleLowerCase(),
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
const reviewCardRefs = ref([]);
const shouldShowExpandButton = ref([]);
const expandedReviews = ref([]);

function checkReviewHeight() {
  nextTick(() => {
    if (!reviewCardRefs.value.length) return;

    paginatedReviews.value.forEach((review, index) => {
      const el = reviewCardRefs.value[index];
      if (!el) return;

      const textEl = el.querySelector('.reviews__card__text');
      if (!textEl) return;

      shouldShowExpandButton.value[index] =
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

function previousReviewPage() {
  if (currentReviewPage.value == 1) return;
  expandedReviews.value = [];
  shouldShowExpandButton.value = [];
  currentReviewPage.value--;
}

function nextReviewPage() {
  if (currentReviewPage.value == totalReviewPages) return;
  expandedReviews.value = [];
  shouldShowExpandButton.value = [];
  currentReviewPage.value++;
}
</script>
<style scoped>
@import '@/assets/styles/item.css';
</style>
