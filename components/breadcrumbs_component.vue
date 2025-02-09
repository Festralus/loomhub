<template>
  <div class="path__breadcrumbs">
    <div v-for="(segment, i) in segments" class="path__breadcrumb">
      <div class="breadcrumb__name">{{ segment }}</div>
      <PointerIcon
        :currentColor="'#666666'"
        :strokeWidth="0.2"
        class="breadcrumb__pointer"
      ></PointerIcon>
    </div>
  </div>
</template>
<script setup>
import { defineProps, onMounted } from 'vue';

import PointerIcon from '/assets/icons/PointerIcon';

onMounted(() => {
  setBreadcrumbs();
});

const props = defineProps({
  history: {
    type: String,
  },
});

const segments = ref(null);
function setBreadcrumbs() {
  segments.value = history.state.current?.split('/');
  console.log(segments.value);
}
</script>
<style scoped>
@import '@/assets/styles/item.css';
</style>
