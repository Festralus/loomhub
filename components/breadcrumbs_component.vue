<template>
  <!-- <div class="path__breadcrumbs">
    <div
      v-for="(segment, i) in modifiedSegments"
      class="path__breadcrumb"
      :key="i"
    >
      <NuxtLink :to="`${segment}`" class="breadcrumb__name">{{
        segment
      }}</NuxtLink>
      <PointerIcon
        v-if="i !== segments.length + 1"
        :currentColor="'#666666'"
        :strokeWidth="0.2"
        class="breadcrumb__pointer"
      ></PointerIcon>
    </div>
  </div> -->
  <div class="path__breadcrumbs">
    <div class="path__breadcrumb">
      <NuxtLink to="/" class="breadcrumb__name">{{
        modifiedSegments?.[0]
      }}</NuxtLink>
      <PointerIcon
        :currentColor="'#666666'"
        :strokeWidth="0.2"
        class="breadcrumb__pointer"
      ></PointerIcon>
    </div>
    <div class="path__breadcrumb">
      <NuxtLink to="/shop" class="breadcrumb__name">{{
        modifiedSegments?.[1]
      }}</NuxtLink>
      <PointerIcon
        :currentColor="'#666666'"
        :strokeWidth="0.2"
        class="breadcrumb__pointer"
      ></PointerIcon>
    </div>
    <div class="path__breadcrumb">
      <NuxtLink :to="``" class="breadcrumb__name">{{
        modifiedSegments?.[2]
      }}</NuxtLink>
      <PointerIcon
        :currentColor="'#666666'"
        :strokeWidth="0.2"
        class="breadcrumb__pointer"
      ></PointerIcon>
    </div>
    <div class="path__breadcrumb">
      <NuxtLink :to="``" class="breadcrumb__name">{{
        modifiedSegments?.[3]
      }}</NuxtLink>
    </div>
  </div>
</template>
<script setup>
import { defineProps, onMounted } from 'vue';

import PointerIcon from '/assets/icons/PointerIcon';

import axios from 'axios';

const config = useRuntimeConfig();
const api = axios.create({
  baseURL: config.public.apiBase,
});

onMounted(() => {
  setBreadcrumbs();
});

const props = defineProps({
  history: {
    type: String,
  },
});

const segments = ref(null);
const modifiedSegments = ref(null);
async function setBreadcrumbs() {
  segments.value = history.state?.current?.split('/');
  const lastSegment = segments.value.pop();

  try {
    const res = await api.post('/api/productByGid', { itemGID: lastSegment });
    modifiedSegments.value = [
      'Home',
      'Shop',
      res.data.clothingType,
      res.data.productCategory,
    ];
  } catch (err) {
    console.error(err);
  }
}
</script>
<style scoped>
@import '@/assets/styles/item.css';
</style>
