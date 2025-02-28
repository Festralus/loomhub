<template>
  <div>
    <BreadcrumbsComponent :history="path"></BreadcrumbsComponent>
    <div class="top__section">
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
      <!-- Tabs menu -->
      <div class="tabs__list" ref="productTabsRefs">
        <div
          @click="switchProductTab(0)"
          class="tabs__list__tab item-tabs__details-tab"
          :class="{ chosen: currentProductTab === 0 }"
        >
          Product Details
        </div>
        <div
          @click="switchProductTab(1)"
          class="tabs__list__tab item-tabs__reviews-tab"
          :class="{ chosen: currentProductTab === 1 }"
        >
          Rating & Reviews
        </div>
        <div
          @click="switchProductTab(2)"
          class="tabs__list__tab item-tabs__FAQ-tab"
          :class="{ chosen: currentProductTab === 2 }"
        >
          FAQs
        </div>
      </div>

      <!-- Details tab -->
      <div v-if="currentProductTab == 0" class="details-tab__container">
        <table class="details-tab__table">
          <tbody>
            <tr v-for="(value, key) in productDetails" :key="key" class=" ">
              <th class="details-tab__table-header">
                {{ formatKey(key) }}
              </th>
              <td class="details-tab__table-data">
                <div class="table-data__value">{{ value }}</div>
                <div
                  @click="openInDev('Shopping Navigation')"
                  v-if="isKeyFilter(key)"
                  class="table-data__link"
                >
                  Click to find similar products
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="details-tab__photos">
          <img
            v-for="(item, index) in item?.detailsImages"
            :key="`image-${index}`"
            :src="`${item}`"
            class="details-tab__photo"
          />
        </div>
      </div>
      <In_development_component
        v-if="showInDev"
        :target="currentTarget"
        :inDevActive="showInDev"
        @close="showInDev = false"
      />

      <!-- Reviews tab -->
      <div v-if="currentProductTab == 1" class="reviews-tab__container">
        <div class="reviews__top-line">
          <div class="reviews">
            <div class="reviews__menu">
              <div class="reviews-menu__title">
                All reviews
                <span class="reviews-menu__title__number"
                  >({{ totalReviewsCount }})</span
                >
              </div>
              <div class="reviews-menu__management">
                <div class="reviews-menu__sorting">
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
                <In_development_component
                  v-if="showInDev"
                  :target="currentTarget"
                  :inDevActive="showInDev"
                  @close="showInDev = false"
                />
              </div>
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

      <!-- FAQs tab -->
      <div v-if="currentProductTab == 2" class="FAQ-tab__container">
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
          <span @click="openInDev('Contacts Page')" class="FAQ__contact-support"
            >contact our customer support</span
          >
          team through our website, and they will guide you through the process.
          You will need to provide your order number and reason for the return.
        </div>
        <In_development_component
          v-if="showInDev"
          :target="currentTarget"
          :inDevActive="showInDev"
          @close="showInDev = false"
        />

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

        <!-- <div class="FAQ-tab__question">
          <span class="FAQ-tab__question-bullet">•</span> Do you offer gift
          cards?
        </div>
        <div class="FAQ-tab__answer">
          Yes, we offer gift cards in various denominations. You can purchase
          them directly from our website, and they are available for immediate
          digital delivery.
        </div> -->
      </div>
    </div>
    <div class="relevant-products">
      <div class="relevant-products__title">YOU MIGHT ALSO LIKE</div>
      <Slider_component
        v-if="item"
        class="relevant-products__slider"
        filterName="getRelatedItems"
        :productID="productID"
        :item="item"
      />
    </div>

    <Subscribe_news_component />
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
import PointerIcon from '@/assets/icons/PointerIcon.vue';

import BreadcrumbsComponent from '@/components/breadcrumbs_component.vue';
import In_development_component from '@/components/in_development_component.vue';
import Slider_component from '~/components/slider_component.vue';
import Subscribe_news_component from '~/components/subscribe_news_component.vue';

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
const productID = ref('');
const path = ref('');
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
    getProductDetails();
  } catch (err) {
    console.error(err);
  }
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
  shouldShowExpandButton.value = [];
  switch (chosenSortingParameter.value) {
    case 0:
      productReviews.value.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateA.getTime() - dateB.getTime();
      });
      break;
    case 1:
      productReviews.value.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
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
// Might also add checks on window resize to find new reviews that need Expand button. Would hurt performance though, even with debounce.
const reviewCardsRefs = ref([]);
const shouldShowExpandButton = ref([]);
const expandedReviews = ref([]);

function checkReviewHeight() {
  nextTick(() => {
    if (!reviewCardsRefs.value.length) return;

    paginatedReviews.value.forEach((_, index) => {
      const el = reviewCardsRefs.value[index];
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

// Details tab
const productDetails = ref({});
function getProductDetails() {
  const availableColors = item.value.colors.join(', ');
  const availableSizes = item.value.sizes.join(', ');

  productDetails.value = {
    name: item.value.name,
    brand: item.value.brand,
    description: item.value.description,
    productCategory: item.value.productCategory,
    composition: item.value.composition,
    clothingType: item.value.clothingType,
    availableColors: availableColors,
    availableSizes: availableSizes,
    careInstructions: item.value.careInstructions,
    country: item.value.country,
    brandStyleId: item.value.brandStyleId,
  };
}
function isKeyFilter(key) {
  return (
    key == 'brand' ||
    key == 'productCategory' ||
    key == 'clothingType' ||
    key == 'country'
  );
}
function formatKey(key) {
  return key
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/_/g, ' ')
    .replace(/\bId\b/gi, 'ID')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
</script>
<style scoped>
@import '@/assets/styles/item.css';
</style>
