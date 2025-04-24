<template>
  <div
    class="component__items relative flex min-h-[476px] w-full max-w-[100vw] select-none flex-row justify-start overflow-x-auto pb-1 xl:my-4 xl:origin-center xl:transform"
    :class="isDragging ? 'cursor-grabbing' : 'cursor-grab'"
    @mousedown.left="startDrag"
    @mousemove="onDrag"
    @mouseup="endDrag"
    @mouseleave="endDrag"
    ref="scrollContainer"
  >
    <!-- Loading screen -->
    <div v-show="!productsList.length" class="waiting-screen-local rounded-xl">
      <div class="loader"></div>
    </div>

    <!-- Product items -->
    <RouterLink
      @click.capture="handleClick"
      :to="`/item/${product.GID}`"
      v-for="product in productsList"
      :key="product.GID"
      class="component__items-item w-[272px] flex-shrink-0 pl-2 pr-2"
      :class="isDragging ? 'cursor-grabbing' : 'cursor-grab'"
      draggable="false"
    >
      <div class="component__items__item-link card-link block h-full w-full">
        <img
          :src="product.images[0]"
          alt="Product Image"
          class="component__items-item__pic pointer-events-none h-[340px] w-full select-none rounded-2xl object-cover"
          loading="lazy"
        />
        <div class="component__items-item__title mt-2 text-lg font-bold">
          {{ product.name }}
        </div>
        <Product_rating_component :rating="product.rating" class="mt-1" />
        <div
          class="component__items-item__price SatoshiBold mt-1 flex items-center text-xl font-semibold"
        >
          <span>${{ product.price }}</span>
          <span
            v-if="product.oldPrice > 0"
            class="satoshiBold ml-2 text-gray-500 line-through"
          >
            ${{ product.oldPrice }}
          </span>
          <span
            v-if="product.discount"
            class="satoshiLight ml-2 rounded-[62px] bg-[rgba(255,51,51,0.1)] px-2 py-1 text-sm text-[#FF3333]"
          >
            -{{ product.discount }}%
          </span>
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

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

// Drag settings
const scrollContainer = ref(null);
let isDragging = ref(false);
let hasBeenDragged = ref(false);
let startX, scrollLeft;

function startDrag(e) {
  hasBeenDragged.value = false;
  isDragging.value = true;
  startX = e.pageX - scrollContainer.value.offsetLeft;
  scrollLeft = scrollContainer.value.scrollLeft;
}

function onDrag(e) {
  if (!isDragging.value || !e) return;
  e.preventDefault();
  const x = e.pageX - scrollContainer.value.offsetLeft;
  const walk = (x - startX) * 2;
  if (Math.abs(walk) > 6) {
    hasBeenDragged.value = true;
    isDragging.value = true;
  }
  scrollContainer.value.scrollLeft = scrollLeft - walk;
}

function endDrag() {
  isDragging.value = false;
}

function handleClick(e) {
  if (!e) return;
  if (hasBeenDragged.value) e.preventDefault();
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
.component__items {
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
}
.component__items-item {
  scroll-snap-align: start;
  padding-top: 20px;
  padding-bottom: 20px;
}
.component__items-item:hover {
  background-color: var(--btn-secondary-bg-hover);
  border-radius: 20px;
}
.component__items-item:active {
  background-color: var(--btn-secondary-bg-active);
  border-radius: 20px;
}
.component__items-item:last-child {
  padding-right: 16px;
}
.component__items-item__title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Scrollbar */
.component__items::-webkit-scrollbar {
  height: 8px;
}
.component__items::-webkit-scrollbar-track {
  background: transparent;
}
.component__items::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}
.component__items::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.5);
}

.component__items-item__pic {
  border: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
