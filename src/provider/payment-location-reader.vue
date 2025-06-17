<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: 'PaymentLocationReaderProvider',
};
</script>
<script setup lang="ts">
import { onMounted, provide, ref } from 'vue';
import { getPaymentLocationReaders } from '../apis/payment-location-reader';
import type { IPaymentLocationReader } from '../apis/data.interface';

const readers = ref<({ label: string; value: any } & IPaymentLocationReader)[]>([]);
const selectedReader = ref<any>(null);

onMounted(() => {
  getPaymentLocationReaders()
    .then((data) => {
      const _data = data as IPaymentLocationReader[];
      readers.value = _data.map((v) => ({ ...v, label: v.label, value: v.id }));
      selectedReader.value = readers.value[0]?.value || null;
    })
    .catch((err) => err);
});
provide('readers', readers);
provide('selectedReader', selectedReader);
</script>
