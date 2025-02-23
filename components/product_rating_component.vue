<template>
  <div class="new-arrivals__items-item__rating mt-1 flex items-center">
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
  </div>
</template>
<script setup>
import { defineProps } from 'vue';

import RatingEmptyStarIcon from '../assets/icons/RatingEmptyStarIcon.vue';
import RatingHalfStarIcon from '../assets/icons/RatingHalfStarIcon.vue';
import RatingStarIcon from '../assets/icons/RatingFullStarIcon.vue';

defineProps({
  product: {
    type: Object,
  },
});
</script>
<style scoped></style>
