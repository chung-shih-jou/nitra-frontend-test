<template>
  <q-layout class="main-layout">
    <custom-header :title="$t('header.TITLE')"> </custom-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import CustomHeader from '../components/Header.vue';
</script>

<style lang="sass"></style>
