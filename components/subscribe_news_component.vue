<template>
  <section
    class="subscribe mx-auto mt-12 w-[1100px] max-w-[94vw] overflow-hidden rounded-2xl bg-black"
  >
    <h3
      class="subscribe__title IntegralBold px-6 pt-6 text-center text-[1.8rem] leading-8 text-white"
    >
      STAY UP TO DATE ABOUT OUR NEWEST OFFERS
    </h3>
    <div
      class="subscribe__input_wrapper mx-auto mt-8 flex h-[42px] w-[311px] items-center overflow-hidden rounded-3xl bg-white"
      @click="focusSubscriptionEmail"
    >
      <LetterIcon class="subscribe__input-icon ml-4 mr-3 bg-white"></LetterIcon>
      <input
        class="subscribe__input SatoshiRegular w-[80%] bg-white pl-[2px] placeholder-gray-400 outline-none"
        placeholder="Enter your email address"
        v-model="subscriptionEmailModel"
        ref="subscriptionEmailRef"
        @keydown="handleKeydown"
      />
    </div>
    <div
      v-if="isLetterSent"
      class="subscribe__thank-you-block mt-2 text-center text-white"
    >
      Thank you! The letter has been sent. Maybe to your spam folder :)
    </div>
    <div
      v-if="!isLetterBeingSent"
      class="subscribe__submit-button SatoshiRegular mx-auto mb-8 mt-3 h-[42px] w-[311px] cursor-pointer select-none rounded-3xl bg-white text-center leading-[42px] text-black hover:[background-color:var(--btn-secondary-bg-hover)] active:[background-color:var(--btn-secondary-bg-active)]"
      @click="sendLetter()"
    >
      Subscribe to Newsletter
    </div>
    <div
      v-if="isLetterBeingSent"
      class="subscribe__submit-button SatoshiRegular email-loader mx-auto mb-6 mt-5 h-[42px] w-[311px] cursor-not-allowed select-none rounded-3xl bg-white text-center leading-[42px]"
      aria-live="polite"
    ></div>
  </section>
</template>
<script setup>
// Icon imports
import LetterIcon from '@/assets/icons/LetterIcon.vue';

// API endpoint
import { useApi } from '@/composables/useApi.js';
const api = useApi();

// Focus Newsletter subscription
const subscriptionEmailRef = ref('');
function focusSubscriptionEmail() {
  subscriptionEmailRef.value?.focus();
}

const subscriptionEmailModel = ref('');
const isLetterBeingSent = ref(false);
const isLetterSent = ref(false);

async function sendLetter() {
  if (isLetterBeingSent.value) return;
  if (
    !subscriptionEmailModel.value ||
    subscriptionEmailModel.value.length < 5 ||
    !subscriptionEmailModel.value.includes('@')
  ) {
    alert('Please enter a valid email...');
    return;
  }

  try {
    isLetterBeingSent.value = true;
    const response = await api.post('/api/sendEmail', {
      email: subscriptionEmailModel.value,
    });

    if (response.data.success) {
      isLetterSent.value = true;
      isLetterBeingSent.value = false;
    } else {
      alert('There was an issue sending your subscription.');
      isLetterBeingSent.value = false;
    }
  } catch (err) {
    console.error('Error sending email:', err);
    alert('Something went wrong. Please try again later.');
    isLetterBeingSent.value = false;
  }
}

function handleKeydown(e) {
  if (e.key === 'Enter') {
    sendLetter();
  }
}
</script>
<style scoped>
.email-loader {
  width: 42px;
  height: 42px;
  border: 5px solid rgba(133, 133, 133, 0.3);
  border-top: 5px solid var(--btn-secondary-text-active);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.subscribe__input_wrapper {
  font-size: 16px;
  line-height: 24px;
}
</style>
