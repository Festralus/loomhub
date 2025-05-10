<template>
  <div
    v-if="rating"
    class="new-arrivals__items-item__rating flex w-max items-center"
    aria-label="Rating is {{ rating }} stars"
  >
    <span class="flex">
      <!-- Full stars (one more if rating is greater than .75) -->
      <RatingStarIcon
        v-for="(_, i) in Math.floor(rating) + Math.ceil(-0.74 + (rating % 1))"
        :key="'full-' + i"
        :class="`size-${starsSize}`"
        aria-hidden="true"
      />

      <!-- Half star (if rating is between .25 and .75) -->
      <RatingHalfStarIcon
        v-if="rating % 1 >= 0.25 && rating % 1 <= 0.74"
        :class="`size-${starsSize}`"
        aria-hidden="true"
      />

      <!-- Empty stars (one more if rating is less than .25) -->
      <RatingEmptyStarIcon
        v-for="(_, i) in 5 -
        Math.ceil(rating) +
        Math.ceil(rating % 1 == 0 ? 0 : 0.25 - (rating % 1))"
        :key="'empty-' + i"
        :class="`size-${starsSize}`"
        aria-hidden="true"
      />
    </span>

    <!-- Unsuccessful attempt to fix different star sizes -->
    <!-- <span class="flex items-center justify-center">
      <RatingStarIcon
        v-for="(_, i) in Math.floor(rating) + Math.ceil(-0.74 + (rating % 1))"
        :key="'full-' + i"
        :style="`width: ${starsSize * 4}px; height: ${starsSize * 4}px;`"
      />
      <RatingHalfStarIcon
        v-if="rating % 1 >= 0.25 && rating % 1 <= 0.74"
        :style="`width: ${starsSize * 4 - 1}px; height: ${starsSize * 4 - 1}px; margin-left: 0.25px;`"
      />
      <RatingEmptyStarIcon
        v-for="(_, i) in 5 -
        Math.ceil(rating) +
        Math.ceil(rating % 1 == 0 ? 0 : 0.25 - (rating % 1))"
        :key="'empty-' + i"
        :style="`width: ${starsSize * 4 - 2}px; height: ${starsSize * 4 - 2}px; margin-left: 0.5px;`"
      />
    </span> -->

    <span v-show="!showRatingNumber" class="ml-2 text-sm text-gray-600"
      >({{ rating }})</span
    >
  </div>
</template>
<script setup>
// Icon imports
import RatingEmptyStarIcon from '@/assets/icons/RatingEmptyStarIcon.vue';
import RatingHalfStarIcon from '@/assets/icons/RatingHalfStarIcon.vue';
import RatingStarIcon from '@/assets/icons/RatingFullStarIcon.vue';

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
