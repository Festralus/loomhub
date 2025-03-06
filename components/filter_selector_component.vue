<template>
  <div>
    <div class="selector__title">
      <div class="selector__title__text"></div>
      <div class="selector__title__arrow"></div>
    </div>
    <div class="selector__filter">
      <div class="selector__filter__text"></div>
    </div>
  </div>
</template>
<script setup>
import ArrowIcon from '@/assets/icons/ArrowIcon.vue';

defineProps({
  products: {
    type: Array,
    required: true,
  },
});

onMounted(() => {
  //   watch(products, () => {
  //     console.log(products);
  //   });
});
</script>
<style scoped></style>
