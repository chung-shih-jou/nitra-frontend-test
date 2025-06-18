<template>
  <q-item :class="_variant.title">
    <q-item-section>
      <q-item-label>{{ title }}<slot name="title" /></q-item-label>
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
const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value: string) => ['primary', 'secondary'].includes(value),
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
    type: [String],
    default: '',
  },
  value: {
    type: [Number, String],
    required: true,
  },
});
const _variant = props.variant === 'primary' ? { title: '' } : { title: 'text-[--gray-700] ' };

if (props.bold) _variant.title += ' font-bold';
console.log(props);
</script>
