<template>
  <div>
    {{ itemId }}
    <BreadcrumbsComponent :history="path"></BreadcrumbsComponent>
    <div class="item__gallery">
      <div class="item__main-picture"></div>
      <div class="item__secondary-picture"></div>
      <div class="item__secondary-picture"></div>
      <div class="item__secondary-picture"></div>
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
</script>
<style scoped></style>
