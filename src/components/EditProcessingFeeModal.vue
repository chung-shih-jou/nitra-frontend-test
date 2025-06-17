<template>
  <q-dialog :modelValue="open" @update:model-value="onCancle">
    <q-card class="bg-white p-4">
      <q-card-section>
        <div class="text-h6">{{ $t('editProcessingFeeModal.TITLE') }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-[--gray-700] text-sm">{{ $t('editProcessingFeeModal.DESCRIPTION') }}</div>
        <vue-slider
          v-model="taxRate"
          class="!py-24 !px-6 text-[--teal-400]"
          :min="0"
          :interval="0.0005"
          :marks="true"
          :tooltip="'always'"
          :processStyle="{ backgroundColor: 'var(--teal-400)' }"
          :max="roundedValue(Number(organization.totalProcessingFeePercentage), 4)"
        >
          <template v-slot:label="{ active, value }">
            <div
              v-if="value === 0 || value === 0.035"
              :class="['vue-slider-mark-label', 'text-black', { active }]"
            >
              {{ roundedValue(value * 100, 2) }}%
            </div>
            <div v-else />
          </template>
          <template v-slot:tooltip="{ value }">
            <div class="text-black min-w-[40px] shadow-lg p-2 rounded-md">
              {{ roundedValue(value * 100, 4) }}%
              <div class="text-[--gray-700] text-[10px]">$ {{ getMerchantFee() }}</div>
            </div>
          </template>
        </vue-slider>
        <q-separator spaced="16px" class="bg-[--gray-50]" />
        <div class="flex gap-4 text-center items-center">
          <div class="flex gap-2 items-center text-sm">
            {{ $t('editProcessingFeeModal.MERCHANT_PROCESSING_FEE') }}
            :
            <span class="rounded-md bg-[--gray-50] p-2 font-bold text-xl min-w-[80px]"
              >{{ roundedValue(Number(taxRate) * 100, 4)
              }}<span class="ml-2 text-[--gray-700]">%</span></span
            >
            <span class="text-[--gray-700] text-[10px]"
              >/ {{ fillDecimalPlaces(totalProcessingFeePercentage, 2) }}%</span
            >
            <span class="text-[--gray-700]"> + </span>

            <span class="rounded-md bg-[--gray-50] p-2 font-bold text-xl min-w-[80px]"
              >${{ fillDecimalPlaces(getMerchantFee(), 2)
              }}<span class="ml-2 text-[--gray-700]"></span
            ></span>
            <span class="text-[--gray-700] text-[10px]"
              >/ ${{ fillDecimalPlaces(roundedValue(Number(totalProcessingFee), 2), 2) }}</span
            >
          </div>

          <div class="flex gap-2 text-center items-center">
            <div class="flex gap-2 items-center text-sm">
              {{ $t('editProcessingFeeModal.PATIENT_PROCESSING_FEE') }}
              :
              <span class="rounded-md bg-[--gray-50] p-2 font-bold text-xl min-w-[80px]"
                >{{
                  roundedValue(
                    (Number(organization.totalProcessingFeePercentage) - Number(taxRate)) * 100,
                    4,
                  )
                }}<span class="ml-2 text-[--gray-700]">%</span></span
              >
              <span class="text-[--gray-700] text-[10px]"
                >/
                {{
                  fillDecimalPlaces(
                    roundedValue(Number(organization.totalProcessingFeePercentage) * 100, 2),
                    2,
                  )
                }}%</span
              >
              <span class="text-[--gray-700]"> + </span>

              <span class="rounded-md bg-[--gray-50] p-2 font-bold text-xl min-w-[80px]"
                >${{ fillDecimalPlaces(getPatientFee(), 2)
                }}<span class="ml-2 text-[--gray-700]"></span
              ></span>
              <span class="text-[--gray-700] text-[10px]"
                >/ ${{ fillDecimalPlaces(roundedValue(Number(totalProcessingFee), 2), 2) }}</span
              >
            </div>
            <div class="w-full text-center">
              <q-btn flat no-caps class="p-0 underline text-[--teal-400]" @click="setDefault">{{
                $t('editProcessingFeeModal.SET_TO_DEFAULT')
              }}</q-btn>
            </div>
            <strong class="text-start">
              {{
                $t('editProcessingFeeModal.SUMMARY', {
                  total: totalProcessingFee,
                  patientFee: fillDecimalPlaces(getPatientFee(), 2),
                  merchantFee: fillDecimalPlaces(getMerchantFee(), 2),
                })
              }}
            </strong>
          </div>
        </div>
      </q-card-section>

      <q-card-actions>
        <q-btn no-caps flat :label="$t('view.CANCEL')" v-close-popup @click="onCancle" />
        <q-btn
          no-caps
          class="mt-6 rounded-md !ml-auto !px-4"
          :label="$t('view.UPDATE')"
          color="secondary"
          @click="onUpdate"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<sript lang="ts">
export default {
  name: 'EditProcessingFeeModal',
};
</sript>

<script setup lang="ts">
import { watch, inject, ref } from 'vue';
import type { Ref } from 'vue';

import { fillDecimalPlaces, roundedValue } from '../methods/calc';
import type { IOrganization } from '../apis/data.interface';

const organization = inject('organization') as Ref<IOrganization>;

const emits = defineEmits(['cancel', 'update']);
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  defaultTaxRate: {
    type: [Number, String],
    default: 0,
  },
  totalProcessingFee: {
    type: [Number, String],
    default: 0,
  },
  amount: {
    type: [Number, String],
    default: 0,
  },
});
console.log(props);

const totalProcessingFeePercentage = ref(0);
const taxRate = ref(props.defaultTaxRate);
watch(
  () => organization.value,
  (newValue) => {
    if (newValue) {
      taxRate.value = roundedValue(Number(organization.value.totalProcessingFeePercentage), 4);
      totalProcessingFeePercentage.value = roundedValue(
        Number(organization.value.totalProcessingFeePercentage) * 100,
        1,
      );
    }
  },
  { immediate: true },
);
function onCancle() {
  emits('cancel');
}
function onUpdate() {
  emits('update', {
    taxRate: taxRate.value,
    patientFee: getPatientFee(),
    merchantFee: getMerchantFee(),
  });
}
function setDefault() {
  taxRate.value = roundedValue(Number(organization.value.totalProcessingFeePercentage), 4);
}
function getMerchantFee() {
  return roundedValue(
    (Number(props.totalProcessingFee) * Number(taxRate.value)) /
      Number(organization.value.totalProcessingFeePercentage),
    2,
  );
}
function getPatientFee() {
  return roundedValue(Number(props.totalProcessingFee) - getMerchantFee(), 2);
}
</script>

<style lang="sass">
.q-slider__selection.absolute
    background-color: var(--teal-400)
.q-slider__thumb-shape, .q-slider__thumb-shape path
    stroke: var(--teal-400)
    fill: var(--teal-400)
</style>
