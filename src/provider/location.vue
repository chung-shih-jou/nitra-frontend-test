<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: 'LocationProvider',
};
</script>
<script setup lang="ts">
import { provide, ref } from 'vue';
import { getLocations } from '../apis/location';
import type { ILocation } from '../apis/data.interface';

const locations = ref<({ label: string; value: any } & ILocation)[]>([]);
const selectedLocation = ref<any>(null);

provide('getLocations', async () => {
  return getLocations()
    .then((data) => {
      const _data = data as ILocation[];
      locations.value = _data.map((v) => ({ label: v.name, value: v.id, ...v }));
      selectedLocation.value = locations.value[0]?.value || null;
      return data;
    })
    .catch((err) => err);
});
provide('locations', locations);

provide('selectedLocation', selectedLocation);
</script>
