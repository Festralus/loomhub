<template>
  <div
    class="new-arrivals__items flex w-full max-w-[100vw] cursor-grab select-none flex-row justify-start overflow-x-auto xl:my-4 xl:origin-center xl:transform"
    @mousedown="startDrag"
    @mousemove="onDrag"
    @mouseup="endDrag"
    ref="scrollContainer"
  >
    <div
      v-for="product in productsList"
      :key="product.GID"
      class="new-arrivals__items-item w-[272px] flex-shrink-0 pl-4"
      @click="goToItem(product.GID)"
    >
      <img
        :src="product.images[0]"
        alt="Product Image"
        class="new-arrivals__items-item__pic pointer-events-none h-[200px] w-full select-none rounded-2xl object-cover"
      />
      <div class="new-arrivals__items-item__title mt-2 text-lg font-bold">
        {{ product.name }}
      </div>
      <ProductRatingComponent :product="product" />
      <!-- <div class="new-arrivals__items-item__rating mt-1 flex items-center">
        <span class="flex">
          <RatingStarIcon
            v-for="n in Math.floor(product.rating)"
            :key="'full-' + product.id"
            class="h-4 w-4"
          />
          <RatingHalfStarIcon
            v-if="product.rating % 1 !== 0"
            :key="'half-' + product.id"
            class="h-4 w-4"
          />
          <RatingEmptyStarIcon
            v-for="n in Math.floor(5 - product.rating)"
            :key="'empty-' + product.id"
            class="h-4 w-4"
          />
        </span>
        <span class="ml-2 text-sm text-gray-600">({{ product.rating }})</span>
      </div> -->
      <div
        class="new-arrivals__items-item__price SatoshiBold mt-1 flex items-center text-xl font-semibold"
      >
        <span>${{ product.price }}</span>
        <span
          v-if="product.oldPrice > 0"
          class="SatoshiBold ml-2 text-gray-500 line-through"
          >${{ product.oldPrice }}</span
        >
        <span
          v-if="product.discount"
          class="SatoshiLight ml-2 rounded-[62px] bg-[rgba(255,51,51,0.1)] px-2 py-1 text-sm text-[#FF3333]"
          >-{{ product.discount }}%</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

defineProps({
  productsList: {
    type: Array,
    required: true,
  },
});

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

const router = useRouter();
function goToItem(itemId) {
  if (!moved) {
    router.push(`/item/${itemId}`);
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
</style>
