<template>
  <div class="path__breadcrumbs">
    <div v-for="(segment, i) in segments" class="path__breadcrumb" :key="i">
      <div class="breadcrumb__name">{{ segment }}</div>
      <PointerIcon
        v-if="i !== segments.length - 1"
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

import axios from 'axios';
// Change BaseURL
// const api = axios.create({
//   baseURL: 'http://localhost:3001',
// });

const config = useRuntimeConfig();
const api = axios.create({
  baseURL: config.public.apiBase,
});
// const api = useApi();

onMounted(() => {
  setBreadcrumbs();
});

const props = defineProps({
  history: {
    type: String,
  },
});

const segments = ref(null);
async function setBreadcrumbs() {
  segments.value = history.state.current?.split('/');
  const lastSegment = segments.value.pop();

  try {
    const res = await api.post('/api/productByGid', { itemGID: lastSegment });
    console.log(res);
  } catch (err) {
    console.error(err);
  }
}
</script>
<style scoped>
@import '@/assets/styles/item.css';
</style>
