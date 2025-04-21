<template>
  <div
    class="new-arrivals__items relative flex min-h-[476px] w-full max-w-[100vw] cursor-grab select-none flex-row justify-start overflow-x-auto xl:my-4 xl:origin-center xl:transform"
    @mousedown="startDrag"
    @mousemove="onDrag"
    @mouseup="endDrag"
    ref="scrollContainer"
  >
    <!-- Loading screen while items are being fetched -->
    <div
      v-show="!productsList.length || productsList.length < 1"
      class="waiting-screen-local rounded-xl"
    >
      <div class="loader"></div>
    </div>
    <div
      v-show="productsList.length"
      v-for="product in productsList"
      :key="product.GID"
      class="new-arrivals__items-item w-[272px] flex-shrink-0 pl-2 pr-2"
      @click="goToItem(product.GID)"
    >
      <img
        :src="product.images[0]"
        alt="Product Image"
        class="new-arrivals__items-item__pic pointer-events-none h-[340px] w-full select-none rounded-2xl object-contain"
      />
      <div class="new-arrivals__items-item__title mt-2 text-lg font-bold">
        {{ product.name }}
      </div>
      <Product_rating_component :rating="product.rating" class="mt-1" />
      <div
        class="new-arrivals__items-item__price SatoshiBold mt-1 flex items-center text-xl font-semibold"
      >
        <span>${{ product.price }}</span>
        <span
          v-if="product.oldPrice > 0"
          class="satoshiBold ml-2 text-gray-500 line-through"
          >${{ product.oldPrice }}</span
        >
        <span
          v-if="
            product.discount &&
            product.oldPrice &&
            product.oldPrice !== null &&
            product.oldPrice !== undefined
          "
          class="satoshiLight ml-2 rounded-[62px] bg-[rgba(255,51,51,0.1)] px-2 py-1 text-sm text-[#FF3333]"
          >-{{ product.discount }}%</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

import Product_rating_component from '../components/product_rating_component.vue';

const props = defineProps({
  item: {
    type: Object,
    required: false,
  },
  filterName: {
    type: String,
    required: true,
  },
  limit: {
    type: Number,
    required: false,
    default: 9,
  },
  productID: {
    type: String,
    required: false,
  },
});

onMounted(() => {
  getSliderProducts();
});

// API endpoint
import { useApi } from '@/composables/useApi.js';
const api = useApi();

// const config = useRuntimeConfig();
// const api = axios.create({
//   baseURL: config.public.apiBase,
// });

// Drag settings
const scrollContainer = ref(null);
let isDragging = false;
let startX, scrollLeft, moved;

function startDrag(e) {
  isDragging = true;
  moved = false;
  startX = e.pageX - scrollContainer.value.offsetLeft;
  scrollLeft = scrollContainer.value.scrollLeft;
}

function onDrag(e) {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - scrollContainer.value.offsetLeft;
  const walk = (x - startX) * 2;
  if (Math.abs(walk) > 4) moved = true;
  scrollContainer.value.scrollLeft = scrollLeft - walk;
}

function endDrag() {
  isDragging = false;
}

// Go to product
const router = useRouter();
function goToItem(itemId) {
  if (!moved) {
    router.push(`/item/${itemId}`);
  }
}

// Get the product list
const productsList = ref([]);
const currencyMultiplier = 1;

async function getSliderProducts() {
  try {
    const res = await api.get('/api/getSliderProductsList', {
      params: {
        filterName: props?.filterName,
        limit: parseInt(props?.limit) || 9,
        productCategory: props?.item?.productCategory || null,
        clothingType: props?.item?.clothingType || null,
        itemId: props?.productID,
      },
    });

    const response = res.data.map((product) => {
      const modifiedPrice = (product.price * currencyMultiplier).toFixed(2);
      let modifiedOldPrice = null;
      let discountPercentage = null;
      if (product.oldPrice) {
        modifiedOldPrice = (product.oldPrice * currencyMultiplier).toFixed(2);

        discountPercentage =
          Math.round(100 - (modifiedPrice / modifiedOldPrice) * 100) || 0;
      }
      return {
        name: product.name,
        price: modifiedPrice,
        GID: product.GID,
        images: product.images,
        timestamps: product.timestamps,
        rating: product.rating || 4,
        oldPrice: modifiedOldPrice || null,
        discount: discountPercentage || null,
      };
    });

    productsList.value = [...response];
  } catch (err) {
    console.error(err);
  }
}
</script>

<style scoped>
.new-arrivals__items {
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
}
.new-arrivals__items-item {
  scroll-snap-align: start;
  padding-top: 20px;
  padding-bottom: 20px;
}
.new-arrivals__items-item:hover {
  background-color: var(--btn-secondary-bg-hover);
  border-radius: 20px;
}
.new-arrivals__items-item:active {
  background-color: var(--btn-secondary-bg-active);
  border-radius: 20px;
}
.new-arrivals__items-item:last-child {
  padding-right: 16px;
}
.new-arrivals__items-item__title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Scrollbar */
.new-arrivals__items::-webkit-scrollbar {
  height: 8px;
  cursor: pointer;
}
.new-arrivals__items::-webkit-scrollbar-track {
  background: transparent;
}
.new-arrivals__items::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}
.new-arrivals__items::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.5);
}

.new-arrivals__items-item__pic {
  border: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
