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
        class="subscribe__input SatoshiRegular w-[80%] bg-white text-sm placeholder-gray-400"
        placeholder="Enter your email address"
        ref="SubscriptionEmail"
      />
    </div>
    <div
      class="subscribe__submit-button SatoshiRegular mx-auto mb-7 mt-3 h-[42px] w-[311px] select-none rounded-3xl bg-white text-center leading-[42px] text-black"
    >
      Subscribe to Newsletter
    </div>
  </div>
</template>
<script setup>
import LetterIcon from '../assets/icons/LetterIcon.vue';
</script>
<style scoped></style>
