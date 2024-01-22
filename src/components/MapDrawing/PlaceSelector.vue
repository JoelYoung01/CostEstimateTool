<script setup lang="ts">
import { watch } from "vue";
import { ref } from "vue";

interface PlaceSelectItem {
  title: string;
  placeObject: google.maps.places.AutocompletePrediction;
}

defineEmits<{
  "place-selected": [placeId: string];
}>();

let autocompleteService: google.maps.places.AutocompleteService;
const loadingApi = ref(true);
const searchText = ref<string>();
const loadingResults = ref(false);
const searchResults = ref<PlaceSelectItem[]>([]);

const loadResults = async (query: string) => {
  loadingResults.value = true;
  try {
    const response = await autocompleteService.getPlacePredictions({ input: query });

    if (!response || response.predictions.length === 0) {
      searchResults.value = [];
      return;
    }

    searchResults.value = response.predictions.map((p) => ({
      title: p.description,
      placeObject: p
    }));
  } catch (er) {
    console.error(er);
  }
  loadingResults.value = false;
};

watch(searchText, async (newVal) => {
  if (!newVal) {
    searchResults.value = [];
    return;
  }

  await loadResults(newVal);
});

const initSearchService = async () => {
  loadingApi.value = true;
  while (!google?.maps?.places) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  autocompleteService = new google.maps.places.AutocompleteService();
  loadingApi.value = false;
};

initSearchService();
</script>

<template>
  <v-autocomplete
    v-model:search="searchText"
    :items="searchResults"
    :loading="loadingResults"
    placeholder="Jump to a location..."
    prepend-inner-icon="mdi-magnify"
    variant="solo"
    no-data-text="Start typing to find places"
    auto-select-first
    return-object
    clearable
    @update:model-value="$emit('place-selected', $event?.placeObject?.place_id)"
  />
</template>
