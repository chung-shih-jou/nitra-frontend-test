<template>
  <div class="payment-summary w-full justify-center h-full p-6">
    <div class="text-[--md] font-bold">{{ $t('paymentSummary.TITLE') }}</div>
    <q-separator spaced="16px" inset class="-mx-6" />
    <div>
      <q-list dense>
        <list-item
          class="text-sm"
          variant="secondary"
          :title="$t('paymentSummary.SUBTOTAL')"
          :value="fillDecimalPlaces(Number(subtotal), 2)"
        />
        <list-item
          variant="secondary"
          class="text-sm"
          :title="`${$t('paymentSummary.TAX')}(${fillDecimalPlaces(Number(tax) * 100, 2)}%)`"
          :value="taxTotal"
        />
        <q-separator spaced="16px" inset class="bg-[--teal-700] -mx-3" />
        <list-item
          class="text-sm mt-4"
          value-color="text-black"
          :title="$t('paymentSummary.TOTAL')"
          :value="fillDecimalPlaces(paymentAmount, 2)"
        />
        <q-btn-toggle
          :modelValue="paymentType"
          @update:model-value="$emit('changePaymentType', $event)"
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
            <q-icon left :name="'fa-solid ' + icon"></q-icon>
            <span class="text-[10px]"
              >{{ $t(`paymentSummary.PAY_BY_${key}`) }} ${{
                key === PaymentTypes.CARD ? patientFee : 0
              }}</span
            >
          </template>
        </q-btn-toggle>
        <list-item class="text-xs" :value="patientFee" v-if="paymentType === PaymentTypes.CARD">
          <template #title>
            {{ $t('paymentSummary.PAY_BY_CARD_FEE') }}
            <q-btn
              flat
              no-caps
              class="p-0 underline text-xs text-[--teal-100]"
              @click="() => onEdit(PaymentModelKeys.PROCESSING_FEE)"
              >{{ $t('paymentSummary.EDIT') }}</q-btn
            >
          </template>
        </list-item>
        <q-separator spaced="16px" inset class="bg-[--teal-700] -mx-3" />
        <list-item
          :bold="true"
          class="text-xs"
          :title="$t(`paymentSummary.PAY_BY_${paymentType}_TOTAL`)"
          :value="fillDecimalPlaces(total, 2)"
          :value-color="disabledPay ? 'text-xl text-[--red-500]' : 'text-xl text-[--green-500]'"
        />
        <div v-if="disabledPay" class="px-4 text-xs text-[--red-500]">
          {{ $t('paymentSummary.WARNING_MINIMUM', { min: fillDecimalPlaces(MINIMUM_AMOUNT, 2) }) }}
        </div>
      </q-list>
    </div>
    <q-separator spaced="16px" inset class="-mx-6" />

    <div class="row no-wrap flex-col gap-4">
      <selector
        class="bg-transparent"
        icon="fa-location-dot"
        v-model="selectedLocation"
        :options="locations"
      />
      <selector
        v-if="paymentType === PaymentTypes.CARD"
        class="bg-[--gray-50] w-full"
        v-model="selectedReader"
        :options="readersOptions"
        :label="$t('paymentSummary.DEVICE_READER')"
      >
        <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
          <q-item
            v-bind="itemProps"
            :class="selected ? 'bg-[--gray-50]' : ''"
            :disabled="opt.disable"
            @click="opt.disable ? () => {} : toggleOption(opt)"
          >
            <div class="flex gap-2 items-center">
              <q-icon
                size="xs"
                :class="opt.disable ? 'text-[--gray-400]' : 'text-[--green-500]'"
                :name="opt.disable ? 'fa-solid fa-circle-xmark' : 'fa-solid fa-circle-dot'"
              />
              <span side :class="opt.disable ? 'text-[--gray-400]' : ''">
                {{ opt.label }}
              </span>
            </div>
          </q-item>
        </template></selector
      >
      <q-btn
        v-if="paymentType === PaymentTypes.CASH"
        :disabled="disabledPay"
        class="bg-[--orange-400] w-full"
        no-caps
        icon="fa-solid fa-money-bill-wave"
        color="orange-400"
        :label="$t('paymentSummary.LOG_PAYMENT')"
      ></q-btn>
      <div v-else class="flex gap-4">
        <q-btn
          :disabled="disabledPay"
          class="rounded-md text-white bg-[--orange-400] w-full"
          :flat="true"
          no-caps
          icon="fa-solid fa-mobile-screen"
          color="orange-400"
          :label="$t('paymentSummary.PAY_BY_READER')"
          @click="() => onEdit(PaymentModelKeys.READER_PAYMENT)"
        ></q-btn>
        <q-btn
          :flat="true"
          :disabled="disabledPay"
          class="rounded-md bg-[--orange-50] text-[--orange-400] w-full"
          no-caps
          icon="fa-solid fa-credit-card"
          :label="$t('paymentSummary.PAY_MANUAL')"
          @click="() => onEdit(PaymentModelKeys.MANUAL_PAYMENT)"
        ></q-btn>
      </div>
    </div>
    <EditProcessingFeeModal
      :open="modalKey === PaymentModelKeys.PROCESSING_FEE"
      @cancel="onCancleModal"
      :totalProcessingFee="totalProcessingFee"
      :taxRate="1 - patientTaxRate"
      @update="onUpdateProcessingFee"
    />
    <ReaderPaymentModal
      :open="modalKey === PaymentModelKeys.READER_PAYMENT"
      @cancel="onCancleModal"
      @update="onFinishPayment"
    />
    <CreditCardFormModal
      :open="modalKey === PaymentModelKeys.MANUAL_PAYMENT"
      @cancel="onCancleModal"
      @update="onFinishPayment"
      :amount="total"
    />
  </div>
</template>
<sript lang="ts">
export default {
  name: 'PaymentSummary',
};
</sript>

<script setup lang="ts">
import { watch, inject, ref } from 'vue';
import type { Ref } from 'vue';

import ListItem from './ListItem.vue';
import Selector from './Selector.vue';
import EditProcessingFeeModal from './EditProcessingFeeModal.vue';
import ReaderPaymentModal from './ReaderPaymentModal.vue';
import CreditCardFormModal from './CreditCardFormModal.vue';

import { PaymentTypes, MINIMUM_AMOUNT, PaymentModelKeys } from '../defines/payment';
import { fillDecimalPlaces, roundedValue } from '../methods/calc';
import type { IOrganization, IPaymentLocationReader } from '../apis/data.interface';

const locations = inject('locations') as { label: string; value: any }[];
const readers = inject('readers') as Ref<
  ({ label: string; value: any } & IPaymentLocationReader)[]
>;
const selectedLocation = inject('selectedLocation') as Ref<number | null>;
const selectedReader = inject('selectedReader');
const modalKey = ref('');

const disabledPay = ref(true);
const readersOptions = ref<
  ({ label: string; value: any; disable: boolean } & IPaymentLocationReader)[]
>([]);

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  subtotal: {
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
  organiztion: {
    type: Object as () => IOrganization,
    default: () => ({}),
    required: true,
  },
});

const taxTotal = ref(0);
const patientTaxRate = ref(0);
const totalProcessingFee = ref(0);
const patientFee = ref(0);
const total = ref(0);
const paymentAmount = ref(0);

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

watch(
  () => [total.value],
  () => {
    disabledPay.value = total.value < MINIMUM_AMOUNT;
  },
  { deep: true },
);
watch(
  () => [patientFee.value, paymentAmount.value],
  () => {
    total.value = patientFee.value + paymentAmount.value;
  },
);
watch(
  () => [readers, selectedLocation],
  () => {
    readersOptions.value = readers.value.map((reader) => ({
      ...reader,
      label: reader.label,
      value: reader.value,
      disable: selectedLocation.value !== reader.locationId,
    }));
  },
  { deep: true },
);
watch(
  () => [props.subtotal, props.tax],
  () => {
    taxTotal.value = roundedValue(Number(props.subtotal) * Number(props.tax), 2);
  },
);

watch(
  () => [props.subtotal, taxTotal.value],
  () => {
    paymentAmount.value = taxTotal.value + Number(props.subtotal);
  },
);

watch(
  () => [props.paymentType, props.organiztion, paymentAmount.value],
  () => {
    if (props.paymentType === PaymentTypes.CARD) {
      totalProcessingFee.value =
        roundedValue(
          paymentAmount.value * Number(props.organiztion.totalProcessingFeePercentage),
          2,
        ) + props.organiztion.totalProcessingFeeFixed;
    } else {
      totalProcessingFee.value = 0;
    }
  },
);

function onCancleModal() {
  modalKey.value = '';
}
function onEdit(key: string) {
  modalKey.value = key;
}
function onUpdateProcessingFee(data: { taxRate: number; patientFee: number; merchantFee: number }) {
  patientTaxRate.value = data.taxRate;
  modalKey.value = '';
  patientFee.value = data.patientFee;
  total.value = data.patientFee + paymentAmount.value;
}
function onFinishPayment() {
  modalKey.value = '';
}
</script>

<style lang="sass">

.payment-summary .q-field__control
  width: 100%

.payment-summary .q-icon.on-left
  font-size: 1rem
</style>
