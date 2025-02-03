<template>
  <div class="search-results">
    <div
      v-if="searchResults"
      v-for="(item, i) in searchResults"
      :key="i"
      class="result"
    >
      {{ item.name }}
    </div>
  </div>
</template>
<script setup>
defineProps({
  searchResults: {
    type: Array,
  },
});
</script>
<style scoped>
.result:not(:first-child) {
  margin-top: 8px;
}
</style>
