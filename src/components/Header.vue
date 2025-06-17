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
    <div class="ml-auto text-black">
      {{ extra }}
    </div>
  </q-header>
</template>

<script lang="ts">
export default {
  name: 'CustomHeader',
};
</script>
<script setup lang="ts">
import { onMounted, ref, inject } from 'vue';

import Selector from './Selector.vue';

const loading = ref(true);
const locations = inject('locations') as { label: string; value: any }[];
const selectedLocation = inject('selectedLocation');
const getLocations = inject('getLocations') as () => Promise<void>;

async function init() {
  await getLocations();
  loading.value = false;
}
onMounted(() => {
  init().catch((err) => {
    console.error('Error fetching locations:', err);
  });
});
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

.main-layout .q-select__dropdown-icon, .q-layout__shadow
  display: none
.main-layout .q-field__after
    padding: 0
</style>
