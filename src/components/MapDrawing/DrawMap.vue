<script setup lang="ts">
/// <reference types="google.maps" />
import { ref } from "vue";
import { GoogleMap } from "vue3-google-map";

const sodSmith: google.maps.LatLngLiteral = { lat: 44.886297901877114, lng: -93.30808521796632 };

const zoom = ref(17);
const mapRef = ref<InstanceType<typeof GoogleMap>>();

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

defineExpose({
  mapRef
});
</script>

<template>
  <GoogleMap
    ref="mapRef"
    :background-color="$vuetify.theme.current.colors.background"
    :api-key="apiKey"
    :center="sodSmith"
    :zoom="zoom"
    :min-zoom="16"
    :tilt="0"
    :libraries="[]"
    disable-double-click-zoom
    map-type-id="satellite"
    disable-default-ui
    zoom-control
    fullscreen-control
  />
</template>
