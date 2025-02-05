<template>
  <div class="search-results">
    <div
      v-if="searchResults"
      v-for="(item, i) in searchResults"
      :key="i"
      class="result cursor-pointer select-none"
      @click="goToItem(item.GID)"
    >
      {{ item.name }}
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';

defineProps({
  searchResults: {
    type: Array,
  },
});

const router = useRouter();
function goToItem(itemId) {
  router.push(`/item/${itemId}`);
}
</script>
<style scoped>
.result:not(:first-child) {
  margin-top: 8px;
}
</style>
