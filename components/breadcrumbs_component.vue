<template>
  <div
    v-if="modifiedSegments && modifiedSegments.length > 0"
    class="path__breadcrumbs"
  >
    <div class="path__breadcrumb">
      <NuxtLink to="/" class="breadcrumb__name">{{
        modifiedSegments?.[0]
      }}</NuxtLink>
      <PointerIcon
        v-if="modifiedSegments && modifiedSegments.length > 1"
        :currentColor="'#666666'"
        :strokeWidth="0.2"
        class="breadcrumb__pointer"
      ></PointerIcon>
    </div>
    <div
      v-if="modifiedSegments && modifiedSegments.length > 1"
      class="path__breadcrumb"
    >
      <NuxtLink :to="isProductPage ? '/shop' : ''" class="breadcrumb__name">{{
        modifiedSegments?.[1]
      }}</NuxtLink>
      <PointerIcon
        v-if="modifiedSegments && modifiedSegments.length > 2"
        :currentColor="'#666666'"
        :strokeWidth="0.2"
        class="breadcrumb__pointer"
      ></PointerIcon>
    </div>
    <div
      v-if="modifiedSegments && modifiedSegments.length > 2"
      class="path__breadcrumb"
    >
      <NuxtLink :to="``" class="breadcrumb__name">{{
        modifiedSegments?.[2]
      }}</NuxtLink>
      <PointerIcon
        v-if="modifiedSegments && modifiedSegments.length > 3"
        :currentColor="'#666666'"
        :strokeWidth="0.2"
        class="breadcrumb__pointer"
      ></PointerIcon>
    </div>
    <div
      v-if="modifiedSegments && modifiedSegments.length > 3"
      class="path__breadcrumb"
    >
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
const isProductPage = ref(false);
async function setBreadcrumbs() {
  segments.value = history.state?.current?.split('/');
  const lastSegment = segments.value.pop();

  if (lastSegment.includes('product')) {
    try {
      const res = await api.post('/api/productByGid', { itemGID: lastSegment });
      modifiedSegments.value = [
        'Home',
        'Shop',
        res.data.clothingType,
        res.data.productCategory,
      ];
      isProductPage.value = true;
    } catch (err) {
      modifiedSegments.value = ['Home', 'Shop'];
      isProductPage.value = false;
      console.error(err);
    }
  } else {
    modifiedSegments.value = ['Home', 'Shop'];
    isProductPage.value = false;
  }
}
</script>
<style scoped>
@import '@/assets/styles/item.css';
</style>
