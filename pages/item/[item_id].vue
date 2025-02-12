<template>
  <div>
    {{ itemId }}
    <BreadcrumbsComponent :history="path"></BreadcrumbsComponent>
    <div class="item__gallery">
      <img
        :src="`/assets/images/product-image-${chosenPicture}.png`"
        class="item__main-picture"
      />
      <img
        v-for="image in pictures"
        :key="`image-${image.id}`"
        :src="`/assets/images/product-image-${image.id}.png`"
        class="item__secondary-picture secondary-picture-one"
        :class="{ chosen: chosenPicture === image.id }"
        @click="choosePicture(image.id)"
      />
      <!-- <img
        :src="'/assets/images/product-image-1.png'"
        class="item__secondary-picture secondary-picture-one"
        :class="{ chosen: chosenPicture === 1 }"
        @click="choosePicture(1)"
      />
      <img
        :src="'/assets/images/product-image-2.png'"
        class="item__secondary-picture secondary-picture-two"
        :class="{ chosen: chosenPicture === 2 }"
        @click="choosePicture(2)"
      />
      <img
        :src="'/assets/images/product-image-3.png'"
        class="item__secondary-picture secondary-picture-three"
        :class="{ chosen: chosenPicture === 3 }"
        @click="choosePicture(3)"
      /> -->
    </div>
    <div class="item__name">One Life Graphic T-shirt</div>
    <div class="item__rating">
      <div class="item__rating-stars">4.5 звездочки</div>
      <div class="item__rating-number">{{ itemRating }}/5</div>
    </div>
    <div class="item__price">
      <div class="item__price-current">$260</div>
      <div class="item__price-old">$300</div>
      <div class="item__discount">-40%</div>
    </div>
    <div class="item__description">
      This graphic t-shirt which is perfect for any occasion. Crafted from a
      soft and breathable fabric, it offers superior comfort and style.
    </div>
    <div class="horizontal-separator"></div>
    <div class="item__colors-container">
      <div class="item__colors-title">Select Colors</div>
      <div>
        <div
          v-for="color in itemColors"
          :key="color"
          class="item__colors__button"
        >
          {{ color }}
        </div>
      </div>
    </div>
    <div class="horizontal-separator"></div>
    <div class="item__size-container">
      <div class="item__size-title">Choose size</div>
      <div>
        <div v-for="size in itemSizes" :key="size" class="item__colors__button">
          {{ size }}
        </div>
      </div>
    </div>
    <div class="horizontal-separator"></div>
    <div class="item__cart-container">
      <div class="item__cart-quantity">
        <div @click="decrementCounter" class="item__cart-quantity--minus">
          -
        </div>
        <div class="item__cart-quantity--number">{{ counter }}</div>
        <div @click="incrementCounter" class="item__cart-quantity--plus">+</div>
      </div>
      <div class="item__cart-button">Add to Cart</div>
    </div>
    <div class="item__tabs-menu">
      <div class="item__details-tab">Product Destails</div>
      <div class="item__reviews-tab">Rating & Reviews</div>
      <div class="item__reviews-FAQ">FAQs</div>
    </div>
    <div class="reviews">
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
    </div>
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

// import BreadcrumbsComponent from '@/components/breadcrumbs_component.vue';

// changing baseURL for axios
const api = axios.create({
  baseURL: 'http://localhost:3001',
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
const itemId = ref(null);
const itemRating = ref(0);
const itemColors = ref([]);
const itemSizes = ref([]);
const itemStock = ref([]);
async function setChosenItem() {
  path.value = window.location.pathname;
  const segments = path.value.split('/');
  const lastSegment = segments.pop();

  try {
    const res = await api.post('/api/productByGid', { itemGID: lastSegment });
    itemId.value = res.data;
    itemRating.value = res.data.rating;
    itemColors.value = res.data.colors;
    itemSizes.value = res.data.sizes;
    itemStock.value = res.data.stock;
  } catch (err) {
    console.error(err);
  }
}

// Counter unfinished
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

// Product gallery
const pictures = [
  { id: 1, src: '/assets/images/product-image-1.png' },
  { id: 2, src: '/assets/images/product-image-2.png' },
  { id: 3, src: '/assets/images/product-image-3.png' },
];

// Choose product picture
const chosenPicture = ref(1);
function choosePicture(i) {
  chosenPicture.value = i;
}
</script>
<style scoped>
@import '@/assets/styles/item.css';
</style>
