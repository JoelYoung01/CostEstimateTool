<script setup lang="ts">
/// <reference types="google.maps" />
import { onMounted } from "vue";
import { onBeforeUnmount } from "vue";
import { ref } from "vue";
import type { GoogleMap } from "vue3-google-map";

const props = defineProps<{ mapRef: InstanceType<typeof GoogleMap> | undefined }>();

const drawingManager = ref<google.maps.drawing.DrawingManager>();
const allPolygons = ref<google.maps.Polygon[]>([]);
const totalArea = ref<number>(0);

const centerOnUser = () => {
  if (!props.mapRef) return;

  navigator.geolocation.getCurrentPosition((position) => {
    props.mapRef?.map?.setCenter({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    });
  });
};

const centerOnPlace = (place_id: string) => {
  if (!place_id || !props.mapRef?.map) return;

  const service = new google.maps.places.PlacesService(props.mapRef.map);
  service.getDetails({ placeId: place_id }, (place, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && place?.geometry?.location) {
      props.mapRef?.map?.setCenter(place.geometry.location);
    }
  });
};

const handleNewPolygon = (newPolygon: google.maps.Polygon) => {
  newPolygon.addListener("contextmenu", () => {
    removePolygon(newPolygon);
  });

  newPolygon.addListener("click", () => {
    // do nothing
  });

  totalArea.value += google.maps.geometry.spherical.computeArea(newPolygon.getPath(), 2.093e7);
  allPolygons.value.push(newPolygon);
};

const removePolygon = (polygon: google.maps.Polygon) => {
  totalArea.value -= google.maps.geometry.spherical.computeArea(polygon.getPath(), 2.093e7);
  polygon.setMap(null);
  allPolygons.value = allPolygons.value.filter((p) => p.getMap() !== null);
};

const clearAllPolygons = () => {
  allPolygons.value.forEach((p) => removePolygon(p));
};

const initMap = async () => {
  if (drawingManager.value) return;

  // Wait for maps api to be loaded
  while (!props.mapRef?.ready || !props.mapRef?.map || !google?.maps?.drawing) {
    console.debug("waiting for map to be ready");
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  const drawOptions: google.maps.drawing.DrawingManagerOptions = {
    drawingMode: google.maps.drawing.OverlayType.POLYGON,
    drawingControl: false,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: [google.maps.drawing.OverlayType.POLYGON]
    },
    polygonOptions: {
      clickable: true,
      draggable: false,
      editable: false,
      fillColor: "#BCDCF9",
      fillOpacity: 0.5,
      geodesic: false,
      strokeColor: "#57ACF9",
      strokeOpacity: 1,
      strokePosition: google.maps.StrokePosition.CENTER,
      strokeWeight: 5,
      visible: true,
      zIndex: 1
    }
  };

  drawingManager.value = new google.maps.drawing.DrawingManager(drawOptions);

  google.maps.event.addListener(drawingManager.value, "polygoncomplete", handleNewPolygon);

  drawingManager.value.setMap(props.mapRef.map);
};

onMounted(() => {
  initMap();
});

onBeforeUnmount(() => {
  if (drawingManager.value) {
    clearAllPolygons();

    drawingManager.value.setMap(null);
    drawingManager.value = undefined;
  }
});

defineExpose({
  centerOnUser,
  centerOnPlace,
  clearAllPolygons
});
</script>

<template>
  <div class="d-flex align-center py-2">
    Total Area:
    <v-chip class="mx-2">{{ Math.max(0, Math.round(totalArea)).toLocaleString() }}</v-chip>
    sq ft

    <v-spacer />

    <v-btn variant="text" icon @click="centerOnUser">
      <v-icon icon="mdi-crosshairs-gps" />
      <v-tooltip activator="parent" location="bottom"> Center map on me </v-tooltip>
    </v-btn>

    <v-btn :disabled="allPolygons.length === 0" variant="text" icon @click="clearAllPolygons">
      <v-icon icon="mdi-layers-remove" />
      <v-tooltip activator="parent" location="bottom"> Clear all areas </v-tooltip>
    </v-btn>
  </div>
</template>
