<template>
  <div>
    {{ item }}
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
        <div class="item__name">{{ item?.name }}</div>
        <div class="item__rating">
          <ProductRatingComponent
            v-if="item"
            :product="item"
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
                :style="{ backgroundColor: `#${color}` }"
                :class="chosenColor == i ? 'selected' : ''"
              ></div>
            </div>
          </div>
        </div>
        <div class="horizontal-separator-100 mt-5"></div>
        <div class="item__size-container">
          <div class="item__size__title">Choose size</div>
          <div class="item__size__list">
            <div
              v-for="(size, i) in item?.sizes"
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
            <MinusIcon
              @click="decrementCounter"
              class="item__cart-quantity--minus"
            >
            </MinusIcon>
            <div class="item__cart-quantity--number">{{ counter }}</div>
            <PlusIcon
              @click="incrementCounter"
              class="item__cart-quantity--plus"
            >
            </PlusIcon>
          </div>
          <div class="item__cart-button">Add to Cart</div>
        </div>
      </div>
    </div>
    <div class="item__tabs">
      <div class="tabs__list">
        <div class="item__details-tab">Product Destails</div>
        <div class="item__reviews-tab">Rating & Reviews</div>
        <div class="item__reviews-FAQ">FAQs</div>
      </div>
      <div class="tabs__details"></div>
      <div class="tabs__reviews"></div>
      <div class="tabs__faqs"></div>
    </div>
    <!-- <div class="reviews">
      <div class="reviews__menu">
        <div class="reviews__menu__title">All reviews ({{ 451 }})</div>
        <button class="reviews__menu__button">Write a Review</button>
      </div>
      <div class="reviews__list" ref="reviewCardsContainer">
        <div class="reviews__cards">
          <div
            class="reviews__card button-border"
            v-for="review in websiteReviewsArray"
            :key="'main' + review.id"
            ref="reviewCardRefs"
          >
            <div class="reviews__card-rating mt-1 flex items-center">
              <span class="flex">
                <RatingStarIcon
                  v-for="n in Math.floor(review.rating)"
                  :key="'full-' + review.id"
                  class="h-5 w-5"
                />
                <RatingEmptyStarIcon
                  v-for="n in Math.floor(5 - review.rating)"
                  :key="'empty-' + review.id"
                  class="h-5 w-5"
                />
              </span>
            </div>
            <div class="reviews__card-name-line flex items-end">
              <div class="reviews__card-name SatoshiBold mt-2 text-base">
                {{ review.user }}
              </div>
              <VerifiedTickIcon
                class="reviews__card-verified mb-1 ml-1 size-4"
              ></VerifiedTickIcon>
            </div>
            <div class="reviews__card-text SatoshiRegular mt-1 text-gray-500">
              {{ review.comment }}
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script setup>
import {
  onBeforeMount,
  //  onMounted
} from 'vue';
// import { useRouter } from 'vue-router';
import axios from 'axios';
import { useAuthStore } from '@/stores/index';
import all_colors from '@/data/colors';

import MinusIcon from '@/assets/icons/MinusIcon.vue';
import PlusIcon from '@/assets/icons/PlusIcon.vue';
// import BreadcrumbsComponent from '@/components/breadcrumbs_component.vue';

definePageMeta({
  useWebsitePadding: true,
});

const config = useRuntimeConfig();
const api = axios.create({
  baseURL: config.public.apiBase,
});

const checkSession = useAuthStore().checkSession;

onBeforeMount(() => {
  checkSession();
  setChosenItem();
});

// onMounted(() => {
//   checkSession();
//   setChosenItem();
// });

// const router = useRouter();

// Getting product information
const path = ref('');
const item = ref(null);
const itemColors = ref([]);
const itemStock = ref([]);
const itemImages = ref([]);
const modifiedPrice = ref(null);
const discountPercentage = ref(null);
const currencyMultiplier = 1;
async function setChosenItem() {
  path.value = window.location.pathname;
  const segments = path.value.split('/');
  const lastSegment = segments.pop();

  try {
    const res = await api.post('/api/productByGid', { itemGID: lastSegment });
    item.value = res.data;
    itemImages.value = res.data.images;
    itemStock.value = res.data.stock;

    modifiedPrice.value = (res.data.price * currencyMultiplier).toFixed(2);
    if (res.data.oldPrice) {
      const modifiedOldPrice = (res.data.oldPrice * currencyMultiplier).toFixed(
        2
      );

      discountPercentage.value = Math.round(
        100 - (modifiedPrice.value / modifiedOldPrice) * 100
      );
    }

    itemColors.value = res.data.colors.map((color) => {
      const hex_value = all_colors.find((item) => item.name == color).hex;
      return hex_value;
    });
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
  if (counter.value >= itemStock.value[0].quantity) {
    counter.value = itemStock.value[0].quantity;
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
function choosePicture(i) {
  chosenPicture.value = i;
}

// Choose color
const chosenColor = ref(null);
function chooseColor(index) {
  chosenColor.value = index;
}

// Choose size
const chosenSize = ref(null);
function chooseSize(index) {
  chosenSize.value = index;
}
</script>
<style scoped>
@import '@/assets/styles/item.css';
</style>
