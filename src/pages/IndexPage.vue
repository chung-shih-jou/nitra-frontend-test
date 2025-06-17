<template>
  <q-page
    class="home-page mx-6 mb-6 grid grid-cols-3 items-start justify-evenly border-[1px] border-solid border-[--gray-200] rounded-[8px]"
  >
    <div class="col-span-2 p-6 text-center grid justify-center items-center gap-2">
      <div class="text-[--gray-700]">
        {{ $t('view.ENTER_AMOUNT') }}
      </div>
      <div><CommaNumber :prefix="'$'" :value="count" /></div>
      <div class="w-full">
        <q-input
          class="amount-textarea w-full bg-[--gray-0]"
          :placeholder="$t('view.DESCRIPTION_OPTIONAL')"
          v-model="text"
          filled
          type="textarea"
        />
      </div>
    </div>
    <div class="col-span-1 border-l-[1px] border-solid border-[--gray-200] h-full">
      <payment-summary total="0" subtotal="0" tax="0" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import CommaNumber from '../components/CommaNumber.vue';
import PaymentSummary from '../components/PaymentSummary.vue';

const text = ref('');
const count = ref(0);
</script>
<style lang="sass">
.home-page .amount-textarea .q-field__control
  width: 100%
  min-width: 400px
</style>
