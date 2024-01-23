<script setup lang="ts">
import { ref } from "vue";
import { Loader } from "@googlemaps/js-api-loader";

import DrawMap from "./DrawMap.vue";
import PlaceSelector from "./PlaceSelector.vue";
import DrawingManager from "./DrawingManager.vue";

const error = ref<string>();
const loadingApi = ref(false);
const mapDrawer = ref<InstanceType<typeof DrawMap>>();
const drawManagerRef = ref<InstanceType<typeof DrawingManager>>();

const onPlaceSelect = (placeId?: string) => {
  if (!placeId) return;
  drawManagerRef.value?.centerOnPlace(placeId);
};

const initGoogleApi = async () => {
  error.value = undefined;
  if (!import.meta.env.VITE_GOOGLE_API_KEY) {
    error.value = "Unable to load map: missing Google Maps Key.";
    return;
  }

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
    <PlaceSelector :disabled="!!error" @place-selected="onPlaceSelect" />
    <v-alert v-if="error" class="mb-10" type="error">
      {{ error }}
      <v-btn variant="text" @click="initGoogleApi">Retry</v-btn>
    </v-alert>
    <DrawMap v-else ref="mapDrawer" style="height: 30vh" />
    <DrawingManager v-if="mapDrawer" ref="drawManagerRef" :map-ref="mapDrawer.mapRef" />
  </div>
</template>
