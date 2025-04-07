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
      <NuxtLink
        :to="isProductPage ? '/shop' : ''"
        class="breadcrumb breadcrumb__name"
        >{{ modifiedSegments?.[1] }}</NuxtLink
      >
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
      <NuxtLink
        v-if="clothingTypeSegment"
        :to="clothingTypeSegment"
        class="breadcrumb__name"
        >{{ modifiedSegments?.[2] }}</NuxtLink
      >
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
      <NuxtLink
        v-if="productCategorySegment"
        :to="productCategorySegment"
        class="breadcrumb__name"
        >{{ modifiedSegments?.[3] }}</NuxtLink
      >
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
const clothingTypeSegment = ref('');
const productCategorySegment = ref('');

async function setBreadcrumbs() {
  segments.value = history.state?.current?.split('/');
  const lastSegment = segments.value.pop();

  if (lastSegment.includes('productGID')) {
    try {
      const res = await api.post('/api/productByGid', { itemGID: lastSegment });
      modifiedSegments.value = [
        'Home',
        'Shop',
        res.data.clothingType,
        res.data.productCategory,
      ];

      if (res.data.clothingType.toLowerCase() == 'women') {
        clothingTypeSegment.value = {
          path: '/shop',
          query: {
            clothingType: JSON.stringify(['Unisex', 'Women']),
          },
        };
      } else if (res.data.clothingType.toLowerCase() == 'men') {
        clothingTypeSegment.value = {
          path: '/shop',
          query: {
            clothingType: JSON.stringify(['Men', 'Unisex']),
          },
        };
      } else {
        clothingTypeSegment.value = {
          path: '/shop',
          query: {
            clothingType: JSON.stringify(['Unisex']),
          },
        };
      }

      (productCategorySegment.value = {
        path: '/shop',
        query: {
          productCategory: JSON.stringify([res.data.productCategory]),
        },
      }),
        (isProductPage.value = true);
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
/* Breadcrumbs */
.breadcrumb__name {
  cursor: pointer;
  user-select: none;
}
.path__breadcrumbs {
  display: flex;
  gap: 10px;
  margin-top: 78px;
  margin-bottom: 20px;

  font-family: 'Satoshi-Regular';
  font-size: 16px;
  color: rgba(0, 0, 0, 0.6);
}
.path__breadcrumb {
  display: flex;
  gap: 10px;
}
.breadcrumb__pointer {
  display: inline-block;
  margin-top: auto;
  margin-bottom: auto;

  transform: rotate(-90deg);
  width: 12px;
  height: 12px;
}
</style>
