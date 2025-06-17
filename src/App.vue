<template>
  <organization-provider>
    <location-provider>
      <payment-location-reader-provider>
        <router-view />
      </payment-location-reader-provider>
    </location-provider>
  </organization-provider>
</template>

<script setup lang="ts">
import LocationProvider from './provider/location.vue';
import OrganizationProvider from './provider/organization.vue';
import PaymentLocationReaderProvider from './provider/payment-location-reader.vue';

</script>
