<script setup lang="ts">
import { computed, ref, inject } from "vue";
import { Loader } from "@googlemaps/js-api-loader";
import { DataPackageInjectionKey } from "@/injections";
import type { DataPackage } from "@/types";
import DrawMap from "./DrawMap.vue";
import PlaceSelector from "./PlaceSelector.vue";
import DrawingManager from "./DrawingManager.vue";

const error = ref<string>();
const loadingApi = ref(false);
const mapDrawer = ref<InstanceType<typeof DrawMap>>();

const dataPackage = inject(DataPackageInjectionKey, ref<DataPackage>({ drawnAreas: [] }));

const totalArea = computed(() => {
  return dataPackage.value.drawnAreas.reduce((acc, cur) => acc + cur.area, 0) ?? 0;
});

const polygonCount = computed(() => {
  return dataPackage.value.drawnAreas.length ?? 0;
});

const onPlaceSelect = (placeId?: string) => {
  if (!placeId) return;
  mapDrawer.value?.centerOnPlace(placeId);
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
    <DrawMap v-else ref="mapDrawer" />
    <DrawingManager
      :total-area="totalArea"
      :disabled-clear-all="polygonCount === 0"
      @center-on-user="mapDrawer?.centerOnUser()"
      @clear-all-polygons="mapDrawer?.clearAllPolygons()"
    />
  </div>
</template>
