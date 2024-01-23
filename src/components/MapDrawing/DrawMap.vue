<script setup lang="ts">
/// <reference types="google.maps" />
import { ref, onMounted, onBeforeUnmount, computed, toRaw } from "vue";
import { CustomControl, GoogleMap } from "vue3-google-map";

const sodSmith: google.maps.LatLngLiteral = { lat: 44.886297901877114, lng: -93.30808521796632 };

const zoom = ref(17);
const mapRef = ref<InstanceType<typeof GoogleMap>>();
const selectedMode = ref<"cursor" | "draw">("cursor");

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

interface DrawnArea {
  polygon: google.maps.Polygon;
  area: number;
}

const drawingManager = ref<google.maps.drawing.DrawingManager>();
const allPolygons = ref<DrawnArea[]>([]);

const totalArea = computed(() => {
  return allPolygons.value.reduce((acc, cur) => acc + cur.area, 0);
});

const centerOnUser = () => {
  if (!mapRef.value) return;

  navigator.geolocation.getCurrentPosition((position) => {
    mapRef.value?.map?.setCenter({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    });
  });
};

const centerOnPlace = (place_id: string) => {
  if (!place_id || !mapRef.value?.map) return;

  const service = new google.maps.places.PlacesService(mapRef.value.map);
  service.getDetails({ placeId: place_id }, (place, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && place?.geometry?.location) {
      mapRef.value?.map?.setCenter(place.geometry.location);
    }
  });
};

const handleNewPolygon = (newPolygon: google.maps.Polygon) => {
  const newDrawnArea: DrawnArea = {
    polygon: newPolygon,
    area: google.maps.geometry.spherical.computeArea(newPolygon.getPath(), 2.093e7)
  };

  newPolygon.addListener("contextmenu", () => {
    console.debug("Right clicked");
    // removePolygon(newDrawnArea);
  });

  newPolygon.addListener("dblclick", () => {
    console.debug("Double clicked");
    // removePolygon(newDrawnArea);
  });

  allPolygons.value.push(newDrawnArea);
};

const removePolygon = (drawnArea: DrawnArea) => {
  toRaw(drawnArea.polygon).setMap(null);
  allPolygons.value = allPolygons.value.filter((p) => p.polygon.getMap() !== null);
};

const clearAllPolygons = () => {
  allPolygons.value.forEach(removePolygon);
};

const initMap = async () => {
  if (drawingManager.value) return;

  // Wait for maps api to be loaded
  while (!mapRef.value?.ready || !mapRef.value?.map || !google?.maps?.drawing) {
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
      editable: true,
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

  drawingManager.value.setMap(mapRef.value.map);
};

function setMode(mode: "cursor" | "draw") {
  if (!drawingManager.value) return;

  if (mode === "cursor") {
    drawingManager.value.setDrawingMode(null);
  } else {
    drawingManager.value.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
  }
}

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
  mapRef,
  centerOnUser,
  centerOnPlace,
  clearAllPolygons,
  totalArea,
  polygonCount: computed(() => allPolygons.value.length)
});
</script>

<template>
  <GoogleMap
    ref="mapRef"
    style="height: 30vh"
    :background-color="$vuetify.theme.current.colors.background"
    :api-key="apiKey"
    :center="sodSmith"
    :zoom="zoom"
    @zoom_changed="zoom = mapRef?.map?.getZoom() ?? 0"
    :min-zoom="16"
    :max-zoom="21"
    :tilt="0"
    :libraries="[]"
    disable-double-click-zoom
    map-type-id="satellite"
    disable-default-ui
    fullscreen-control
    @dblclick.stop
  >
    <CustomControl position="TOP_CENTER" class="mt-1">
      <v-btn-toggle v-model="selectedMode" mandatory>
        <v-btn
          value="cursor"
          size="small"
          :color="selectedMode === 'cursor' ? 'primary' : 'default'"
          icon="mdi-cursor-pointer"
          @click="setMode('cursor')"
        />
        <v-btn
          :color="selectedMode === 'draw' ? 'primary' : 'default'"
          value="draw"
          size="small"
          icon="mdi-draw"
          @click="setMode('draw')"
        />
      </v-btn-toggle>
    </CustomControl>
    <CustomControl position="RIGHT_BOTTOM" class="d-flex flex-column ma-1">
      <v-btn size="small" icon="mdi-plus" :disabled="zoom >= 21" @click="zoom++" class="rounded-t-lg rounded-b-0" />
      <v-btn size="small" icon="mdi-minus" :disabled="zoom <= 16" @click="zoom--" class="rounded-b-lg rounded-t-0" />
    </CustomControl>
  </GoogleMap>
</template>
