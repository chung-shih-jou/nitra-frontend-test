<template>
  <div class="flex flex-col gap-2">
    <q-input filled :placeholder="placeholder" :class="` w-full`" v-model="value"> </q-input>
    <span v-if="errorMsg" class="text-[--red-500] text-xs">
      {{ errorMsg }}
    </span>
  </div>
</template>

<script lang="ts">
export default {
  name: 'CustomInput',
};
</script>

<script setup lang="ts">
import { computed } from 'vue';
const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  errorMsg: {
    type: String,
    default: '',
  },
});

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
console.log(props);
</script>
