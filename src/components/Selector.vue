<template>
  <q-select
    :loading="loading"
    emit-value
    map-options
    :class="`bg-[--gray-100] rounded-[8px] p-2 items-center w-[180px] ${className}`"
    v-model="_value"
    :options="options"
  >
    <template v-slot:prepend v-if="icon">
      <q-icon size="xs" class="text-[#b6bfc3]" :name="'fa-solid ' + icon" />
    </template>
    <template v-slot:after>
      <q-icon size="xs" class="text-[#b6bfc3]" name="fa-solid fa-angle-down" />
    </template>
  </q-select>
</template>

<script lang="ts">
export default {
  name: 'CustomSelector',
};
</script>
<script setup lang="ts">
import { defineProps } from 'vue';
const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: '',
  },
  value: {
    type: [Number, String],
    default: '',
  },
  options: {
    type: Array as () => { label: string; value: string | number }[],
    default: () => [],
  },
  className: {
    type: String,
    default: '',
  },
});

const _value = props.value;
const loading = props.loading;
</script>
