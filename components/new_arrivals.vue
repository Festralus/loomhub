<template>
  <div class="new-arrivals__items mt-9">
    <div
      v-for="product in productsList"
      :key="product.GID"
      class="new-arrivals__items-item"
    >
      <img :src="product.images[0]" class="new-arrivals__items-item__pic" />
      <div class="new-arrivals__items-item__title">{{ product.name }}</div>
      <div class="new-arrivals__items-item__rating">4</div>
      <div class="new-arrivals__items-item__price">$ {{ product.price }}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    productsList: {
      type: Array,
      required: true,
    },
  },
};
</script>
<style scoped></style>
