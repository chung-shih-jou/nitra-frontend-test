<template>
  <div class="w-full justify-center h-full p-6">
    <div class="text-[--md] font-bold">{{ $t('paymentSummary.TITLE') }}</div>
    <q-separator spaced inset class="-mx-6" />
    <div>
      <q-list>
        <list-item
          variant="secondary"
          size="sm"
          :title="$t('paymentSummary.SUBTOTAL')"
          :value="subtotal"
        />
        <list-item
          variant="secondary"
          size="sm"
          :title="`${$t('paymentSummary.TAX')}(${fillDecimalPlaces(Number(tax), 2)}%)`"
          :value="taxResult"
        />
        <q-separator spaced inset class="bg-[--teal-700]" />
        <list-item :title="$t('paymentSummary.TOTAL')" :value="total" />
        <q-btn-toggle
          v-model="paymentType"
          color="white"
          toggle-color="[--teal-100]"
          toggle-text-color="[--teal-700]"
          text-color="[--teal-700]"
          class="my-6 border-[--teal-100] rounded-[8px] border-[1px] bg-[--teal-100]"
          :unelevated="true"
          no-caps
          size="md"
          :spread="true"
          :options="
            Object.values(PaymentOptions).map(({ key }) => ({
              value: key,
              slot: key,
            }))
          "
        >
          <template v-for="{ key, icon } in PaymentOptions" v-slot:[key] :key="key">
            <q-icon size="xs" class="text-[--teal-700]" left :name="'fa-solid ' + icon"></q-icon>
            <span class="text-[16px]">{{ $t(`paymentSummary.PAY_BY_${key}`) }}</span>
          </template>
        </q-btn-toggle>
        <q-separator spaced inset class="bg-[--teal-700]" />
        <list-item
          :bold="true"
          :title="$t(`paymentSummary.PAY_BY_${paymentType}_TOTAL`)"
          :value="extraPaymentFee"
          value-color="text-[--green-500]"
        />
      </q-list>
    </div>
    <q-separator spaced inset class="-mx-6" />

    <div class="row no-wrap flex-col gap-4">
      <selector
        icon="fa-location-dot"
        class-name="bg-transparent"
        v-model="selectedLocation"
        :options="locations"
      >
      </selector>
      <q-btn
        class="bg-[--orange-400] w-full"
        no-caps
        icon="fa-solid fa-money-bill-wave"
        color="orange-400"
        :label="$t('paymentSummary.LOG_PAYMENT')"
      ></q-btn>
    </div>
  </div>
</template>
<sript lang="ts">
export default {
  name: 'PaymentSummary',
};
</sript>

<script setup lang="ts">
import { inject, defineProps, ref } from 'vue';

import ListItem from './ListItem.vue';
import Selector from './Selector.vue';

import { PaymentTypes } from '../defines/payment';
import { fillDecimalPlaces, roundedValue } from '../methods/calc';

const locations = inject('locations') as { label: string; value: any }[];
const selectedLocation = inject('selectedLocation');

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  subtotal: {
    type: [Number, String],
    required: true,
  },
  total: {
    type: [Number, String],
    required: true,
  },
  tax: {
    type: [Number, String],
    required: true,
  },
  paymentType: {
    type: String,
    default: PaymentTypes.CASH,
  },
});
const PaymentOptions = [
  {
    icon: 'fa-sack-dollar',
    key: PaymentTypes.CASH,
  },
  {
    icon: 'fa-credit-card',
    key: PaymentTypes.CARD,
  },
];
const paymentType = ref(props.paymentType);

const taxResult = roundedValue(Number(props.subtotal) * Number(props.tax), 2);
const extraPaymentFee = roundedValue(Number(props.subtotal) * Number(props.tax), 2);

console.log(props);
</script>
