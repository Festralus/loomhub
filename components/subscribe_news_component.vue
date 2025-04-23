<template>
  <div
    class="subscribe mx-auto mt-12 w-[1100px] max-w-[94vw] overflow-hidden rounded-2xl bg-black"
  >
    <div
      class="subscribe__title IntegralBold px-6 pt-8 text-center text-[1.8rem] leading-9 text-white"
    >
      STAY UP TO DATE ABOUT OUR NEWEST OFFERS
    </div>
    <div
      class="subscribe__input_wrapper mx-auto mt-8 flex h-[42px] w-[311px] items-center overflow-hidden rounded-3xl bg-white"
      @click="focusSubscriptionEmail"
    >
      <LetterIcon class="subscribe__input-icon ml-4 mr-3 bg-white"></LetterIcon>
      <input
        class="subscribe__input SatoshiRegular w-[80%] bg-white pl-[2px] text-sm placeholder-gray-400"
        placeholder="Enter your email address"
        ref="SubscriptionEmail"
      />
    </div>
    <div
      v-show="isLetterSent"
      class="subscribe__thank-you-block text-center text-white"
    >
      Thank you! The letter has been sent.
    </div>
    <div
      class="subscribe__submit-button SatoshiRegular mx-auto mb-7 mt-3 h-[42px] w-[311px] select-none rounded-3xl bg-white text-center leading-[42px] text-black hover:[background-color:var(--btn-secondary-bg-hover)] active:[background-color:var(--btn-secondary-bg-active)]"
      @click="(sendLetter(), openInDev('Newsletter'))"
    >
      Subscribe to Newsletter
    </div>
    <In_development_component
      v-if="showInDev"
      :target="currentTarget"
      :inDevActive="showInDev"
      @close="showInDev = false"
    />
  </div>
</template>
<script setup>
import LetterIcon from '../assets/icons/LetterIcon.vue';

// In development popup
const showInDev = ref(false);
const currentTarget = ref('');
function openInDev(string) {
  currentTarget.value = string;
  showInDev.value = true;
}

const SubscriptionEmail = ref('');
const isLetterSent = ref(false);

function sendLetter() {
  isLetterSent.value = true;
}
</script>
<style scoped></style>
