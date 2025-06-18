<template>
  <q-header elevated class="gap-2 items-center flex p-6 bg-transparent">
    <!-- <img src="../assets/logo.svg" alt="Nitra Logo" /> -->
    <h2 class="text-2xl text-bold text-black">{{ title }}</h2>
    <selector
      icon="fa-location-dot"
      :loading="loading"
      v-model="selectedLocation"
      :options="locations"
    >
    </selector>
  </q-header>
</template>

<script lang="ts">
export default {
  name: 'CustomHeader',
};
</script>
<script setup lang="ts">
import { watch, onMounted, ref, inject } from 'vue';
import type { Ref } from 'vue';

import Selector from './Selector.vue';

const loading = ref(true);
const locations = inject('locations') as Ref<{ label: string; value: any }[]>;
const selectedLocation = inject('selectedLocation') as Ref<number>;
const getLocations = inject('getLocations') as () => Promise<void>;

const readers = inject('readers') as Ref<{ label: string; value: any; locationId: number }[]>;
const setSelectedReader = inject('setSelectedReader') as (v: number) => void;

async function init() {
  await getLocations();
  loading.value = false;
}
onMounted(() => {
  init().catch((err) => {
    console.error('Error fetching locations:', err);
  });
});
watch(
  () => selectedLocation.value,
  (location) => {
    const selectedLocation = locations.value.find((v) => v.value === location)?.value;
    const selectedReader = readers.value.find((v) => v.locationId === selectedLocation)?.value;
    if (selectedReader) setSelectedReader(selectedReader);
  },
);
withDefaults(
  defineProps<{
    title: string;
    extra?: HTMLDivElement | string | null;
  }>(),
  { title: '', extra: null },
);
</script>

<style lang="sass">
.main-layout .q-field--auto-height .q-field__control, .q-field--auto-height .q-field__native
  min-height: initial
.main-layout .q-field--auto-height .q-field__native
  padding: 0

.main-layout .relative-position
  justify-items: center
.main-layout .q-field--standard .q-field__control:before
  content: none

.main-layout .q-field__marginal
  height: initial


.main-layout .q-field__after
    padding: 0
</style>
