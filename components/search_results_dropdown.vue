<template>
  <div class="search-results min-h-[70px]">
    <!-- Loading screen while items are being fetched -->
    <div
      v-show="isFetching"
      class="waiting-screen-local mt-1 rounded-b-[1rem] rounded-t-none"
    >
      <div class="loader"></div>
    </div>

    <NuxtLink
      :to="`/item/${item.GID}`"
      @click="goToItem(item.GID)"
      v-for="(item, i) in searchResults"
      :key="i"
      class="result flex h-14 cursor-pointer select-none overflow-hidden rounded-lg"
      :class="{ 'pointer-events-none': !item?.GID }"
    >
      <!-- Optimization: Possible to load a very small stock image until the real one is loaded -->
      <img
        v-if="item?.images?.[0]"
        :src="item?.images?.[0]"
        class="result_image"
      />
      <div class="result__text">
        <div
          class="result__name"
          :class="{ 'text-center': !item.description && !item.images }"
        >
          <span>{{ item?.name }}</span
          ><span v-show="item?.brand"> ({{ item?.brand }})</span>
        </div>
        <div class="result__description">{{ item?.description }}</div>
      </div>
    </NuxtLink>
  </div>
</template>
<script setup>
defineProps({
  searchResults: {
    type: Array,
  },
  isFetching: {
    type: Boolean,
  },
});

const router = useRouter();
const hoveredIndex = ref(null);
function goToItem(itemId) {
  if (!itemId) return;
  router.push(`/item/${itemId}`);
  hoveredIndex.value = null;
}
</script>
<style scoped>
@import '@/assets/styles/default_layout.css';
.result:not(:first-child) {
  margin-top: 8px;
}
.result {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-right: 4px;
}
.result:hover {
  background-color: var(--btn-secondary-bg-default);
}
.result:active {
  background-color: var(--btn-secondary-bg-active);
}
.result_image {
  width: 56px;
  height: 56px;
  object-fit: contain;
  flex-shrink: 0;
}

@media (max-width: 1535px) {
  .result_image {
    margin-left: 0px;
  }
}

@media (min-width: 1536px) {
  .result_image {
    margin-left: 10px;
  }
}
.result__text {
  flex: 1 1 auto;
  min-width: 0;
}
.result__name {
  font-family: 'Satoshi-Bold';
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
