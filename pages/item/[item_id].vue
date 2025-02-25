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
      <div class="reviews-tab__container">
        <div class="reviews__top-line">
          <div class="reviews">
            <div class="reviews__menu">
              <div class="reviews-menu__title">All reviews ({{ 451 }})</div>
              <button class="reviews-menu__filter-button">
                <div class="reviews-menu__filter-popup">POPUP WINDOW</div>
              </button>
              <button class="reviews-menu__write-button">Write a Review</button>
            </div>

            <!-- Reviews block -->
            <div class="reviews__list">
              <div
                class="reviews__card button-border"
                v-for="(review, index) in productReviews"
                :key="'main' + index"
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
                >
                  {{ review?.comment }}
                </div>
                <div class="reviews__card__date">{{ review?.createdAt }}</div>
              </div>
            </div>
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
import axios from 'axios';
import { useAuthStore } from '@/stores/index';
import all_colors from '@/data/colors';

import MinusIcon from '@/assets/icons/MinusIcon.vue';
import PlusIcon from '@/assets/icons/PlusIcon.vue';
import VerifiedTickIcon from '@/assets/icons/VerifiedTickIcon.vue';

import BreadcrumbsComponent from '@/components/breadcrumbs_component.vue';
import In_development_component from '@/components/in_development_component.vue';

// In development popup
const showInDev = ref(false);
const currentTarget = ref('');
function openInDev(string) {
  currentTarget.value = string;
  showInDev.value = true;
}

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
const item = ref(null);
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

// Get product reviews
const productReviews = ref([]);
async function getProductReviews() {
  try {
    // Get an array of reviews
    const res = await api.post('/api/findProductReview', {
      productID: productID.value,
    });

    // Modify nicknames to match case rules
    productReviews.value = res.data.map((review) => ({
      ...review,
      user:
        review.user.charAt(0).toLocaleUpperCase() +
        review.user.slice(1).toLocaleLowerCase(),
    }));
  } catch (err) {
    console.error(err);
  }
}
</script>
<style scoped>
@import '@/assets/styles/item.css';
</style>
