<template>
  <div class="comma-number flex col justify-center h-full">
    <div class="text-[36px] font-bold">{{ prefix }}</div>
    <div class="text-[76px] font-bold">
      <q-input
        :min="0"
        :class="`text-[76px] font-bold max-w-[calc(60vw_-_100px)]`"
        :style="{ width: `${modelValue.toString().length * 50 + 5}px` }"
        v-if="editable"
        type="number"
        v-model="value"
      ></q-input>
      <span v-else>{{ modelValue }}</span>
    </div>
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
import { computed } from 'vue';
const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  prefix: {
    type: String,
    default: '',
  },
  modelValue: {
    type: [Number, String],
    default: 0,
  },
  editable: {
    type: Boolean,
    default: false,
  },
});
const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', Number(value) < 0 ? 0 : Number(value));
  },
});
// const value = ref(props.defaultValue || 0);
// const formattedValue = computed({
//   get() {
//     return value.value;
//   },
//   set(newValue) {
//     value.value = Number(newValue);
//   },
// });
</script>

<style lang="sass">
.comma-number .q-field__control
  height: fit-content
</style>
