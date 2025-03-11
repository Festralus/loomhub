<template>
  <div v-if="products">
    <div class="selector__title">
      <div class="selector__title__text"></div>
      <div class="selector__title__arrow"></div>
    </div>
    <div
      v-for="(item, index) in filterValues"
      :key="index"
      class="selector__filter"
    >
      <div class="selector__filter__text">{{ item }}</div>
    </div>
  </div>
</template>
<script setup>
import ArrowIcon from '@/assets/icons/ArrowIcon.vue';

const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
  parameter: {
    type: String,
    required: true,
  },
  nested: {
    type: Boolean,
    default: false,
  },
});

onMounted(() => {});

let filterValues = ref([]);
function getFilterValues(parameter) {
  if (!props.products || props.products === undefined) return;

  if (!props.nested) {
    filterValues.value = props.products.map((item) => item[parameter]);
    console.log(filterValues.value);
  } else {
    filterValues.value = [
      ...new Set(
        props.products.flatMap((item) =>
          item.stock.map((item) => item[parameter])
        )
      ),
    ];
    console.log(filterValues.value);
  }
}

watch(
  () => props.products,
  (newProducts) => {
    if (newProducts.length) {
      getFilterValues(props.parameter);
    }
  },
  { deep: true }
);
</script>
<style scoped></style>
