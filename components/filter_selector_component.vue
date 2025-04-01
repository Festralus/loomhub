<template>
  <div class="filters" v-if="products">
    <div
      v-for="(item, index) in filterValues"
      :key="index"
      class="selector__filter"
      @click="toggleCheckbox(index)"
    >
      <div class="selector__filter__text">
        {{ item }}
        <span>({{ combinedQuantity?.[props.parameter]?.[item] ?? 0 }})</span>
      </div>
      <div class="option__checkbox__container">
        <CheckboxEmptyIcon
          v-show="!checkedItems[index]"
          class="option__checkbox"
        />
        <CheckboxFilledIcon
          v-show="checkedItems[index]"
          class="option__checkbox-checked"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
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
  selected: {
    type: Array,
  },
  combinedQuantity: {
    type: Object,
  },
});

const emits = defineEmits(['filter-updated']);

onMounted(() => {
  // initializeCheckedItems();
});

// Get filter options
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

  // const vals = props.nested
  //   ? props.products.flatMap((item) =>
  //       item.stock.map((item) => item[parameter])
  //     )
  //   : props.products.flatMap((item) => item[parameter]);

  // filterValues.value = sortFilterValues(...new Set(vals));
  // }
}

// Check if the passed value is an integer
function isNum(val) {
  return !isNaN(val) && Number.isInteger(Number(val));
}

// Sort filters - numbers then strings alphabetically
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

// REVIEW START
// Toggle a filter value
const checkedItems = computed(() => {
  return filterValues?.value?.map((value) => props?.selected?.includes(value));
});

function toggleCheckbox(index) {
  if (!props.parameter) return;
  checkedItems.value[index] = !checkedItems.value[index];

  // Emit toggled filters to the parent component
  const selectedValues = filterValues.value.filter(
    (_, i) => checkedItems.value[i]
  );
  emits('filter-updated', {
    key: props.parameter,
    values: selectedValues,
  });
}

// EXP

watch(
  () => props.combinedQuantity,
  (newValue) => {
    console.log('Updated combinedQuantity in child:', newValue);
  }
);
// Check toggled filters on page init (via URL)
// function initializeCheckedItems() {}
// REVIEW END
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
.option__checkbox-checked {
  width: 24px;
  height: 24px;
  display: block;
}
</style>
