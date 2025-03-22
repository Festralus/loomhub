<template>
  <div class="new-arrivals__items-item__rating flex items-center">
    <span class="flex">
      <RatingStarIcon
        v-for="(_, i) in Math.floor(rating)"
        :key="'full-' + i"
        :class="`size-${starsSize}`"
      />
      <RatingHalfStarIcon
        v-if="rating % 1 !== 0"
        :class="`size-${starsSize}`"
      />
      <RatingEmptyStarIcon
        v-for="(_, i) in Math.floor(5 - rating)"
        :key="'empty-' + i"
        :class="`size-${starsSize}`"
      />
    </span>
    <span v-show="!showRatingNumber" class="ml-2 text-sm text-gray-600"
      >({{ rating }})</span
    >
  </div>
</template>
<script setup>
import { defineProps } from 'vue';

import RatingEmptyStarIcon from '../assets/icons/RatingEmptyStarIcon.vue';
import RatingHalfStarIcon from '../assets/icons/RatingHalfStarIcon.vue';
import RatingStarIcon from '../assets/icons/RatingFullStarIcon.vue';

defineProps({
  // product: {
  //   type: Object,
  // },
  rating: {
    type: Number,
  },
  showRatingNumber: {
    type: Boolean,
    default: true,
  },
  starsSize: {
    type: Number,
    default: 4,
  },
});
</script>
<style scoped></style>
