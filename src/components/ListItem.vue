<template>
  <q-item :class="_variant.title">
    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
    <q-item-section :class="valueColor" side> ${{ value }} </q-item-section>
  </q-item>
</template>

<script lang="ts">
export default {
  name: 'ListItem',
};
</script>
<script setup lang="ts">
import { defineProps } from 'vue';
const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value: string) => ['primary', 'secondary'].includes(value),
  },
  size: {
    type: String,
    default: 'md',
    validator: (value: string) => ['xs', 'sm', 'md', 'lg'].includes(value),
  },
  valueColor: {
    type: String,
    default: '',
  },
  bold: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  value: {
    type: [Number, String],
    required: true,
  },
});
const _variant = props.variant === 'primary' ? { title: '' } : { title: 'text-[--gray-700] ' };

if (props.size === 'sm') _variant.title += ' text-[12px]';
else if (props.size === 'md') _variant.title += ' text-[24px]';

if (props.bold) _variant.title += ' font-bold';
console.log(props);
</script>
