<template>
  TITLE - {{ itemId }}
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
    <div class="item__rating-number">4.5/5</div>
  </div>
  <div class="item__price">
    <div class="item__price-current">$260</div>
    <div class="item__price-old">$300</div>
    <div class="item__discount">-40%</div>
  </div>
  <div class="item__description">
    This graphic t-shirt which is perfect for any occasion. Crafted from a soft
    and breathable fabric, it offers superior comfort and style.
  </div>
  <div class="horizontal-separator"></div>
  <div class="item__colors-container">
    <div class="item__colors-title">Select Colors</div>
    <div class="item__colors-button">O</div>
    <div class="item__colors-button">O</div>
    <div class="item__colors-button">O</div>
  </div>
  <div class="horizontal-separator"></div>
  <div class="item__size-container">
    <div class="item__size-title"></div>
    <div class="item__size-button">Small</div>
    <div class="item__size-button">Medium</div>
    <div class="item__size-button">Large</div>
    <div class="item__size-button">X-Large</div>
  </div>
  <div class="horizontal-separator"></div>
  <div class="item__cart-container">
    <div class="item__cart-quantity">
      <div class="item__cart-quantity--minus">-</div>
      <div class="item__cart-quantity--number">1</div>
      <div class="item__cart-quantity--plus">+</div>
    </div>
    <div class="item__cart-button">Add to Cart</div>
  </div>

  <div class="item__tabs-menu">
    <div class="item__details-tab">Product Destails</div>
    <div class="item__reviews-tab">Rating & Reviews</div>
    <div class="item__reviews-FAQ">FAQs</div>
  </div>
</template>
<script setup>
import { onMounted } from 'vue';
// import { useRouter } from 'vue-router';
import axios from 'axios';
import { useAuthStore } from '@/stores/index';

// import BreadcrumbsComponent from '@/components/breadcrumbs_component.vue';

// changing baseURL for axios
const api = axios.create({
  baseURL: 'http://localhost:3001',
});
const checkSession = useAuthStore().checkSession;

onMounted(() => {
  checkSession();
  setChosenItem();
});

// const router = useRouter();

const itemId = ref(null);
const path = ref('');
async function setChosenItem() {
  path.value = window.location.pathname;
  const segments = path.value.split('/');
  const lastSegment = segments.pop();
  itemId.value = lastSegment;

  try {
  } catch (err) {
    console.error(err);
  }
}
</script>
<style scoped></style>
