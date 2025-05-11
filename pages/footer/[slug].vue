<!-- !! CURRENT PAGE WAS MOSTLY AI-GENERATED !!  -->
<template>
  <section v-if="currentStory" class="story-page">
    <h1>{{ currentStory?.title || 'The Story of Andrew' }}</h1>

    <template v-for="(block, i) in currentStory.paragraphs" :key="i">
      <p v-if="typeof block === 'string'">
        {{ block }}
      </p>
      <ul v-else-if="block.type === 'list'" class="story-list">
        <li v-for="(item, j) in block.items" :key="j">
          {{ item }}
        </li>
      </ul>
    </template>

    <!-- Navigation Section -->
    <div class="story-nav-section">
      <div class="story-nav-section__heading">
        You may learn more in the following stories:
      </div>
      <div class="story-nav-buttons">
        <!-- Previous Story -->
        <NuxtLink class="story-nav-button" :to="previousStory.path">
          ← {{ previousStory.title }}
        </NuxtLink>

        <!-- Next Story -->
        <NuxtLink class="story-nav-button" :to="nextStory.path">
          {{ nextStory.title }} →
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRoute } from 'vue-router';
import stories from '@/data/stories.js';

// Get the current route slug
const route = useRoute();
const slug = route.params.slug;

// Find the index of the current story based on the slug
const currentIndex = stories.findIndex((s) => s.slug === slug);
const currentStory = stories[currentIndex];

// Calculate the previous and next story for circular navigation
const previousStory = stories[currentIndex - 1] || stories[stories.length - 1];
const nextStory = stories[currentIndex + 1] || stories[0];

// Set dynamic page title using useHead
useHead({
  title: `Andrew - ${currentStory?.title || 'The Story'}`,
});
</script>

<style scoped>
@import '@/assets/styles/footer.css';
</style>
