<template>
  <q-dialog :modelValue="open" @update:model-value="onCancle">
    <q-card class="sm:w-auto w-[95%] bg-white p-4">
      <q-card-section>
        <div class="text-h6">
          {{ $t('creditCardForm.TITLE') }}
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none q-pb-none">
        <div class="flex flex-col gap-2">
          <CustomInput
            :error-msg="errorMsgs.fullName"
            :placeholder="$t('creditCardForm.FULL_NAME')"
            v-model="form.fullName"
          />
          <CustomInput
            :error-msg="errorMsgs.cardNumber"
            :placeholder="$t('creditCardForm.CARD_NUMBER')"
            v-model="form.cardNumber"
          />
          <div class="grid sm:grid-cols-2 gap-2">
            <CustomInput
              :error-msg="errorMsgs.expireDate"
              :placeholder="$t('creditCardForm.EXPIRE_DATE')"
              v-model="form.expireDate"
            />
            <CustomInput
              :error-msg="errorMsgs.cvc"
              :placeholder="$t('creditCardForm.CVC')"
              v-model="form.cvc"
            />
          </div>
          <div class="grid sm:grid-cols-2 gap-2">
            <div>
              <selector
                borderless
                :class="`py-0  w-full !bg-[#f2f2f2] rounded-[4px]`"
                v-model="form.country"
                :options="CountryOptions"
                :label="$t('view.COUNTRY')"
              ></selector>
              <span class="text-[--red-500] text-xs">{{ errorMsgs.country }}</span>
            </div>
            <CustomInput
              :error-msg="errorMsgs.zipCode"
              :placeholder="$t('creditCardForm.ZIP_CODE')"
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
import { useI18n } from 'vue-i18n';
import type { Ref } from 'vue';

import Selector from './Selector.vue';
import CustomInput from './CustomInput.vue';

import CountryOptions from '../defines/country';

const { t } = useI18n();

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

const form = ref({
  cardNumber: '',
  fullName: '',
  cvc: '',
  country: '',
  zipCode: '',
  expireDate: null,
}) as Ref<{ [key: string]: any }>;
const errorMsgs = ref({
  cardNumber: '',
  fullName: '',
  cvc: '',
  country: '',
  zipCode: '',
  expireDate: '',
});
console.log(props, form, errorMsgs);

function validate(callback: (valid: boolean, errors: any) => void) {
  const needFills = Object.keys(form.value).reduce(
    (obj, key: string) => {
      obj[key] = !form.value[key] ? t(`view.REQUIRED`) : '';
      return obj;
    },
    {} as { [key: string]: string },
  );
  callback(!Object.values(needFills).filter((v) => !!v).length, needFills);
}
function onCancle() {
  emits('cancel');
}
function onUpdate() {
  validate((valid, error) => {
    errorMsgs.value = error;
    if (!valid) {
      console.error('Validation failed:', error);
    } else {
      console.log('Form is valid:', form.value);
      emits('update');
      form.value = {
        cardNumber: '',
        fullName: '',
        cvc: '',
        country: '',
        zipCode: '',
        expireDate: null,
      };
    }
  });
}
</script>

<style lang="sass"></style>
