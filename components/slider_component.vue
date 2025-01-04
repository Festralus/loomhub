<template>
  <div
    class="new-arrivals__items m-4 flex w-full flex-row justify-start gap-6 overflow-x-auto"
  >
    <div
      v-for="product in productsList"
      :key="product.GID"
      class="new-arrivals__items-item w-[240px] flex-shrink-0"
    >
      <img
        :src="product.images[0]"
        alt="Product Image"
        class="new-arrivals__items-item__pic h-[200px] w-full rounded-2xl object-cover"
      />
      <div class="new-arrivals__items-item__title mt-2 text-lg font-bold">
        {{ product.name }}
      </div>
      <div class="new-arrivals__items-item__rating mt-1 flex items-center">
        <span class="flex">
          <StarIcon
            v-for="n in product.rating"
            :key="n"
            class="h-4 w-4 text-yellow-500"
          />
        </span>
        <span class="ml-2 text-sm text-gray-600">(4)</span>
      </div>
      <div class="new-arrivals__items-item__price mt-1 text-sm font-semibold">
        <span>${{ product.price }}</span>
        <span v-if="product.oldPrice" class="ml-2 text-gray-500 line-through"
          >${{ product.oldPrice }}</span
        >
        <span v-if="product.discount" class="ml-2 text-red-500"
          >({{ product.discount }}% OFF)</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import StarIcon from '../assets/icons/StarIconBig.vue';

export default {
  props: {
    productsList: {
      type: Array,
      required: true,
    },
  },
  components: {
    StarIcon,
  },
};
</script>

<style scoped>
.new-arrivals__items {
  scroll-snap-type: x mandatory;
}
.new-arrivals__items-item {
  scroll-snap-align: start;
}
</style>

<!-- <template>
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
<style scoped></style> -->
