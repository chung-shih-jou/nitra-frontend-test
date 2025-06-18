<template>
  <div>
    <div class="z-[10000] absolute top-[23px] right-6">
      <div class="flex gap-2 items-center">
        <q-btn no-caps flat @click="onReset" :class="['text-[--red-400]', canReset ? '' : 'hidden']"
          >{{ $t('header.RESET_PAYMENT') }}
        </q-btn>
        <q-icon name="fa-solid fa-globe" class="text-[--gray-700] cursor-pointer">
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item
                clickable
                v-close-popup
                :key="key"
                :class="['text-sm', selectedLanguage === value ? 'bg-[--gray-100]' : '']"
                v-for="[key, value] in Object.entries(LANGUAGES)"
              >
                <q-item-section @click="() => changeLanguage(value)">{{
                  $t(`view.${key}`)
                }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-icon>
      </div>
    </div>
    <q-page
      class="home-page mx-6 mb-6 grid sm:grid-cols-3 grid-cols-1 items-start justify-evenly border-[1px] border-solid border-[--gray-200] rounded-[8px]"
    >
      <div class="col-span-2 p-6 text-center grid justify-center items-center gap-2">
        <div class="text-[--gray-700]">
          {{ $t('view.ENTER_AMOUNT') }}
        </div>
        <div><CommaNumber :editable="true" :prefix="'$'" v-model="subtotal" /></div>
        <div class="w-full">
          <q-input
            class="amount-textarea w-full bg-[--gray-0]"
            :placeholder="$t('view.DESCRIPTION_OPTIONAL')"
            v-model="description"
            filled
            type="textarea"
          />
        </div>
      </div>
      <div
        class="col-span-1 border-t-[1px] sm:border-t-0 sm:border-l-[1px] border-solid border-[--gray-200] h-full"
      >
        <payment-summary
          :paymentType="paymentType"
          :subtotal="subtotal"
          :tax="tax"
          :organiztion="organiztion"
          @changePaymentType="paymentType = $event"
        />
      </div>
    </q-page>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, inject } from 'vue';
import type { Ref } from 'vue';

import CommaNumber from '../components/CommaNumber.vue';
import PaymentSummary from '../components/PaymentSummary.vue';
import type { ILocation, IOrganization } from '../apis/data.interface';
import { PaymentTypes } from '../defines/payment';
import LANGUAGES from '../defines/language';

const description = ref('');
const subtotal = ref(0);
const selectedLanguage = inject('language') as Ref<string>;
const selectedLocation = inject('selectedLocation') as Ref<number | null>;
const locations = inject('locations') as Ref<ILocation[]>;
const organiztion = inject('organization') as Ref<IOrganization>;
const changeLanguage = inject('changeLanguage') as (type: string) => void;
const tax = ref(0);
const paymentType = ref(PaymentTypes.CASH);
const canReset = ref(false);

watch(
  () => [description.value, subtotal.value, paymentType.value],
  () => {
    canReset.value =
      description.value !== '' || subtotal.value > 0 || paymentType.value !== PaymentTypes.CASH;
  },
);
watch(
  () => selectedLocation?.value,
  (newValue) => {
    if (newValue) {
      console.log('newValue', locations.value, selectedLocation.value, newValue);
      const selected = locations.value.find((location) => location.id === newValue);
      console.log('Selected Location:', selected);
      if (!selected) {
        console.warn('No location found for the selected ID:', newValue);
        return 0;
      }
      tax.value = Number(selected.taxRate);
    }
  },
  { deep: true },
);

function onReset() {
  description.value = '';
  subtotal.value = 0;
  paymentType.value = PaymentTypes.CASH;
}
</script>
<style lang="sass">
.home-page .amount-textarea .q-field__control
  width: 100%
  min-width: 400px
  background: transparent
</style>
