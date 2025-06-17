<template>
  <q-layout class="main-layout" view="lHh Lpr lFf">
    <custom-header :title="$t('header.TITLE')" extra="reset-payment"></custom-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import CustomHeader from '../components/Header.vue';
</script>

<style lang="sass"></style>
