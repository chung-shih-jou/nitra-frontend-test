<template>
  <q-select
    v-bind:loading="loading"
    emit-value
    :popup-no-route-dismiss="false"
    map-options
    :class="`custom-selector bg-[--gray-100] rounded-[8px] p-2 items-center w-[180px] ${className}`"
    :modelValue="value"
    :options="options"
    bottom-slots
  >
    <template v-slot:prepend v-if="icon">
      <q-icon size="xs" class="text-[#b6bfc3]" :name="'fa-solid ' + icon" />
    </template>
    <template v-slot:after>
      <q-icon size="xs" class="text-[#b6bfc3]" name="fa-solid fa-angle-down" />
    </template>
    <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
      <slot
        v-if="Object.keys($slots).includes('option')"
        name="option"
        v-bind="{ itemProps, opt, selected, toggleOption }"
      />
      <q-item
        v-else
        v-bind="itemProps"
        :class="selected ? 'bg-[--gray-50]' : ''"
        @click="toggleOption(opt)"
      >
        <q-item-section>
          <q-item-label>{{ opt.label }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script lang="ts">
export default {
  name: 'CustomSelector',
};
</script>
<script setup lang="ts">
import { useSlots } from 'vue';
const slots = useSlots();

console.log('Selector slots:', slots);
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
console.log('Selector props:', props);
</script>

<style lang="sass">
.custom-selector .q-select__dropdown-icon, .q-layout__shadow
  display: none
</style>
