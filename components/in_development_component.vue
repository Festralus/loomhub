<template>
  <section
    v-if="inDevActive"
    class="in-development__container fixed inset-0 z-[150] flex items-center justify-center"
  >
    <!-- Overlay -->
    <div
      class="in-development__overlay absolute inset-0 bg-[rgba(0,0,0,0.55)]"
      @click="closeInDev"
      aria-hidden="true"
    ></div>

    <!-- Modal Dialog -->
    <div
      class="in-development__card relative max-h-[90vh] w-[540px] max-w-[90vw] rounded-2xl bg-white px-6 py-8 text-center"
    >
      <button
        @click="closeInDev"
        class="in-development__close-button absolute left-3 top-3 size-5 rotate-180"
        aria-label="Close"
      >
        <ArrowIcon />
      </button>
      <h2 class="in-development__text justify-center text-2xl">
        The <span class="font-extrabold">{{ target }}</span> functionality is
        currently in development. Sorry for the inconvenience!
      </h2>
    </div>
  </section>
</template>
<script setup>
// Icon imports
import ArrowIcon from '@/assets/icons/ArrowIcon.vue';

defineProps({
  target: String,
  inDevActive: Boolean,
});

const emit = defineEmits(['close']);

function closeInDev() {
  emit('close');
}
</script>
<style scoped></style>
