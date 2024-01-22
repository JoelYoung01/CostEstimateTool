<script setup lang="ts">
import { ref } from "vue";
import { Loader } from "@googlemaps/js-api-loader";

import DrawMap from "./DrawMap.vue";
import PlaceSelector from "./PlaceSelector.vue";
import DrawingManager from "./DrawingManager.vue";

const loadingApi = ref(false);
const mapDrawer = ref<InstanceType<typeof DrawMap>>();
const drawManagerRef = ref<InstanceType<typeof DrawingManager>>();

const onPlaceSelect = (placeId: string) => {
  if (!placeId) return;
  drawManagerRef.value?.centerOnPlace(placeId);
};

const initGoogleApi = async () => {
  loadingApi.value = true;
  try {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
      version: "weekly"
    });
    loader.importLibrary("drawing");
    loader.importLibrary("places");
  } catch (er) {
    console.error(er);
  }
  loadingApi.value = false;
};

initGoogleApi();
</script>

<template>
  <div>
    {{ loadingApi ? " - Loading..." : "" }}
    <PlaceSelector @place-selected="onPlaceSelect" />
    <DrawMap ref="mapDrawer" style="height: 30vh" />
    <DrawingManager v-if="mapDrawer" ref="drawManagerRef" :map-ref="mapDrawer.mapRef" />
  </div>
</template>
