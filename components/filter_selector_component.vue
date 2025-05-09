<template>
  <div class="filters" :class="{ 'pl-[14px]': hasFewFilters }" v-if="products">
    <div class="filter__contents">
      <div
        v-for="(item, index) in filterValues"
        :key="index"
        class="selector__filter"
        @click="(toggleCheckbox(index), (hoveredIndex = null))"
        @mouseover="hoveredIndex = index"
        @mouseleave="hoveredIndex = null"
      >
        <div
          :class="
            combinedQuantity?.[props.parameter]?.[item] ? 'active' : 'inactive'
          "
          class="selector__filter__text"
          :style="{ 'text-decoration:underline': hoveredIndex == index }"
        >
          {{ item }}

          <!-- Shows how many items fit the combination of filters -->
          <span
            :class="
              combinedQuantity?.[props.parameter]?.[item]
                ? 'active'
                : 'inactive'
            "
            v-if="isAnyFilterActive"
            >({{ combinedQuantity?.[props.parameter]?.[item] ?? 0 }})</span
          >
        </div>
        <div class="option__checkbox__container">
          <CheckboxEmptyIcon
            v-show="!checkedItems[index]"
            class="option__checkbox"
            :style="
              hoveredIndex == index
                ? 'filter: drop-shadow(0 0 1px var(--btn-primary-bg-active))'
                : ''
            "
          />
          <CheckboxFilledIcon
            v-show="checkedItems[index]"
            class="option__checkbox-checked"
            :style="
              hoveredIndex == index
                ? 'filter: drop-shadow(0 0 1px var(--btn-primary-bg-active))'
                : ''
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
// Icon imports
import CheckboxEmptyIcon from '@/assets/icons/CheckboxEmptyIcon.vue';
import CheckboxFilledIcon from '@/assets/icons/CheckboxFilledIcon.vue';

const props = defineProps({
  products: {
    type: Array,
    required: true,
  },

  // Filter category (e.g. "color", "clothingType")
  parameter: {
    type: String,
    required: true,
  },

  // Some values (sucha as quantity, colors and sizes) are nested within "Stock" array within each item in the database
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
  isAnyFilterActive: {
    type: Boolean,
  },
});

const emits = defineEmits(['filter-updated']);

const hoveredIndex = ref(null);

// Getting filter options
const filterValues = ref([]);
function fetchFilterValues(parameter) {
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

// Check filterValues length and adds styling for unnoticeable scrollbar difference
const hasFewFilters = computed(() => filterValues.value.length < 7);

// Check if the passed value is an integer
function isNum(val) {
  return !isNaN(val) && Number.isInteger(Number(val));
}

// Sort filters - numbers in ascending order then strings in alphabetical order
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

// Always update filters
watch(
  () => props.products,
  (newProducts) => {
    if (newProducts.length) {
      fetchFilterValues(props.parameter);
    }
  },
  { deep: true }
);

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
</script>
<style scoped>
.filters {
  display: flex;
  flex-direction: column;
  direction: rtl;
}
.filter__contents {
  direction: ltr;
}
.selector__filter {
  padding: 4px 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  cursor: pointer;
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

.inactive {
  color: rgba(0, 0, 0, 0.2);
}
</style>
