<template>
  <div class="search-results">
    <div
      v-if="searchResults"
      v-for="(item, i) in searchResults"
      :key="i"
      class="result flex h-14 cursor-pointer select-none overflow-hidden rounded-lg"
      :class="{
        'bg-slate-200': hoveredIndex !== null && hoveredIndex == i,
        'bg-gray-100': hoveredIndex === null || hoveredIndex != i,
        'bg-transparent': !item.description && !item.images,
      }"
      @click="goToItem(item.GID)"
      @mouseover="hoveredIndex = i"
      @mouseleave="hoveredIndex = null"
    >
      <img
        v-if="item?.images?.[0]"
        :src="item?.images?.[0]"
        alt=""
        class="result_image"
      />
      <div class="result__text">
        <div
          class="result__name"
          :class="{ 'text-center': !item.description && !item.images }"
        >
          <span>{{ item?.name }}</span
          ><span> ({{ item?.brand }})</span>
        </div>
        <div class="result__description">{{ item?.description }}</div>
      </div>
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
  if (!itemId) return;
  router.push(`/item/${itemId}`);
  hoveredIndex.value = null;
}

const hoveredIndex = ref(null);
</script>
<style scoped>
@import '/assets/styles/default_layout.css';
.result:not(:first-child) {
  margin-top: 8px;
}
.result {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 10px;
}
.result_image {
  width: 56px;
  height: 56px;
  border-radius: 20px;
  object-fit: contain;
  flex-shrink: 0;
}
.result__text {
  flex: 1 1 auto;
  min-width: 0;
}
.result__name {
  font-family: 'Satoshi-Bold';
  font-size: 16px;
  /* overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; */
}
.result__description {
  min-width: 0;
  max-width: 100%;
  font-size: 14px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
