<template>
  <div class="filters" v-if="products">
    <div
      v-for="(item, index) in filterValues"
      :key="index"
      class="selector__filter"
    >
      <div class="selector__filter__text">{{ item }}</div>
      <div class="option__checkbox__container">
        <CheckboxEmptyIcon
          class="option__checkbox"
          :class="{ checked: isCheckboxChecked }"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import ArrowIcon from '@/assets/icons/ArrowIcon.vue';
import CheckboxEmptyIcon from '~/assets/icons/CheckboxEmptyIcon.vue';
import CheckboxFilledIcon from '~/assets/icons/CheckboxFilledIcon.vue';

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
    filterValues.value = [
      ...new Set(props.products.flatMap((item) => item[parameter])),
    ];
    filterValues.value = sortFilterValues(filterValues.value);
  } else {
    filterValues.value = [
      ...new Set(
        props.products.flatMap((item) =>
          item.stock.map((item) => item[parameter])
        )
      ),
    ];
    filterValues.value = sortFilterValues(filterValues.value);
  }
}

function isNum(val) {
  return !isNaN(val) && Number.isInteger(Number(val));
}

function sortFilterValues(vals) {
  return vals.sort((a, b) => {
    if (isNum(a) && isNum(b)) {
      return Number(a) - Number(b);
    } else if (!isNum(a) && !isNum(b)) {
      return a.localeCompare(b);
    } else {
      return isNum(a) ? -1 : 1;
    }
  });
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
<style scoped>
.filters {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 8px;
}
.selector__filter {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.option__checkbox__container {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.option__checkbox {
  width: 26px;
  height: 26px;
  display: block;
}
.option__checkbox .checked {
  background-color: rgb(0, 163, 0);
}
</style>
