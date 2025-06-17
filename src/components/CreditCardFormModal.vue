<template>
  <q-dialog :modelValue="open" @update:model-value="onCancle">
    <q-card class="bg-white p-4">
      <q-card-section>
        <div class="text-h6">
          {{ $t('creditCardForm.TITLE') }}
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none q-pb-none">
        <div class="flex flex-col gap-2">
          <q-input
            filled
            :placeholder="$t('creditCardForm.NAME')"
            :class="` w-full`"
            v-model="form.fullName"
          />
          <q-input
            filled
            :placeholder="$t('creditCardForm.CARD_NUMBER')"
            :class="` w-full`"
            v-model="form.cardNumber"
          />
          <div class="grid grid-cols-2 gap-2">
            <q-input
              :class="` w-full`"
              :placeholder="$t('creditCardForm.EXPIRE_DATE')"
              v-model="form.expireDate"
              filled
            />
            <q-input
              filled
              :placeholder="$t('creditCardForm.CVC')"
              :class="` w-full`"
              v-model="form.cvc"
            />
          </div>
          <div class="grid grid-cols-2 gap-2">
            <selector
              borderless
              :class="`py-0  w-full bg-[#f2f2f2] rounded-[4px]`"
              v-model="form.country"
              :options="countryOptions"
              :label="$t('view.COUNTRY')"
            />
            <q-input
              standout
              :placeholder="$t('creditCardForm.ZIP_CODE')"
              :class="` w-full`"
              v-model="form.zipCode"
            />
          </div>
        </div>
        <q-separator spaced="16px" class="bg-[--gray-50]" />
      </q-card-section>

      <q-card-actions>
        <q-btn no-caps flat :label="$t('view.CANCEL')" v-close-popup @click="onCancle" />
        <q-btn
          no-caps
          flat
          class="rounded-md !ml-auto !px-4 bg-[--orange-400] text-white"
          :label="$t('view.PAY_MONEY', { amount })"
          @click="onUpdate"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<sript lang="ts">
export default {
  name: 'CreditCardFormModal',
};
</sript>

<script setup lang="ts">
import { ref } from 'vue';

import Selector from './Selector.vue';

const emits = defineEmits(['cancel', 'update']);
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  amount: {
    type: Number,
    default: 0,
  },
});

const countryOptions = [
  { label: 'United States', value: 'US' },
  { label: 'Canada', value: 'CA' },
  { label: 'United Kingdom', value: 'UK' },
  { label: 'Australia', value: 'AU' },
  // Add more countries as needed
];
const form = ref({
  cardNumber: '',
  fullName: '',
  cvc: '',
  country: '',
  zipCode: '',
  expireDate: null,
});
console.log(props, form);
function onCancle() {
  emits('cancel');
}
function onUpdate() {
  emits('update');
}
</script>

<style lang="sass"></style>
