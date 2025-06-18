<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: 'SettingsProvider',
};
</script>
<script lang="ts" setup>
import { provide, ref } from 'vue';
import type { Ref } from 'vue';
import set from 'lodash.set';
import Languages from '../defines/language';
import type { QuasarLanguage } from 'quasar';
import { i18n } from '../boot/i18n';

const language = ref(Languages.ENGLISH) as Ref<string, QuasarLanguage>;
provide('language', language);

provide('changeLanguage', (type: QuasarLanguage) => {
  language.value = type;
  set(i18n, 'global.locale.value', type);
});
</script>

<style scoped></style>
