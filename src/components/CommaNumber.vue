<template>
  <div class="flex col justify-center h-full">
    <div class="text-[36px] font-bold">{{ prefix }}</div>
    <div class="text-[76px] font-bold">{{ formattedValue }}</div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'CommaNumber',
};
</script>
<style scoped>
/* No styles needed for this component */
</style>
<script setup lang="ts">
import { defineProps, computed } from 'vue';
const props = defineProps({
  prefix: {
    type: String,
    default: '',
  },
  value: {
    type: [Number, String],
    required: true,
  },
});
const formattedValue = computed(() => {
  return props.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
});
</script>
