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
import { onMounted, provide, ref } from 'vue';
import { getTheOrganization } from '../apis/organization';
import type { IOrganization } from '../apis/data.interface';

const organization = ref<IOrganization>();

onMounted(() => {
  // Optionally, you can fetch locations immediately on mount
  getTheOrganization()
    .then((data) => {
      const _data = data as IOrganization;
      organization.value = _data;
    })
    .catch((err) => err);
});
provide('organization', organization);
</script>
