<template>
  <q-dialog :modelValue="open" @update:model-value="onCancle">
    <q-card class="text-center bg-white p-4">
      <q-card-section class="justify-items-center">
        <img src="../assets/reader-payment.png" />
      </q-card-section>

      <q-card-section class="flex flex-col gap-2 q-pt-none">
        <div>
          <q-icon class="text-[--gray-500]" name="fa-solid fa-eye" />
          {{ $t('readerPaymentModal.TITLE') }}
        </div>
        <div class="mb-6 text-[--gray-700] text-sm">
          {{ $t('readerPaymentModal.DESCRIPTION') }}
        </div>
        <q-btn no-caps class="w-full bg-[--teal-50] rounded-md">
          {{ $t('readerPaymentModal.PROCESS_PAYMENT', { time: countDown }) }}
        </q-btn>
        <div class="text-[--gray-700] text-xs text-center">
          {{ $t('readerPaymentModal.HINT') }}
        </div>

        <q-separator spaced="16px" class="bg-[--gray-50]" />
      </q-card-section>

      <q-card-actions>
        <q-btn no-caps flat :label="$t('view.CANCEL')" v-close-popup @click="onCancle" />
        <q-btn
          no-caps
          class="mt-6 rounded-md !ml-auto !px-4"
          :label="$t('view.PROCESS_PAYMENT')"
          color="secondary"
          @click="onUpdate"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<sript lang="ts">
export default {
  name: 'ReaderPaymentModal',
};
</sript>

<script setup lang="ts">
import { ref, watch } from 'vue';
const emits = defineEmits(['cancel', 'update']);
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  expireTime: {
    type: Number,
    default: 5,
  },
});
console.log(props);
const countDown = ref(props.expireTime);
watch(
  () => [props.expireTime, props.open],
  () => {
    if (!props.open) return;
    countDown.value = props.expireTime;
    const interval = setInterval(() => {
      if (countDown.value > 0) {
        countDown.value -= 1;
      } else {
        clearInterval(interval);
        emits('update');
      }
    }, 1000);
  },
  { immediate: true },
);
function onCancle() {
  emits('cancel');
}
function onUpdate() {
  emits('update');
}
</script>

<style lang="sass"></style>
