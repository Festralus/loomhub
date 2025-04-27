<template>
  <div class="new-arrivals__items-item__rating flex items-center">
    <span class="flex">
      <RatingStarIcon
        v-for="(_, i) in Math.floor(rating) + Math.ceil(-0.74 + (rating % 1))"
        :key="'full-' + i"
        :class="`size-${starsSize}`"
      />
      <RatingHalfStarIcon
        v-if="rating % 1 >= 0.25 && rating % 1 <= 0.74"
        :class="`size-${starsSize}`"
      />
      <RatingEmptyStarIcon
        v-for="(_, i) in 5 -
        Math.ceil(rating) +
        Math.ceil(rating % 1 == 0 ? 0 : 0.25 - (rating % 1))"
        :key="'empty-' + i"
        :class="`size-${starsSize}`"
      />
      <!-- <RatingEmptyStarIcon
        v-for="(_, i) in 5 -
        Math.floor(rating) -
        (rating % 1 >= 0.75 ? 1 : 0) -
        (rating % 1 >= 0.25 && rating % 1 <= 0.75 ? 1 : 0)"
        :key="'empty-' + i"
        :class="`size-${starsSize}`"
      /> -->
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
