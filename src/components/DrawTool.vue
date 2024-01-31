<script setup lang="ts">
import { ref } from "vue";
import { useDisplay } from "vuetify";
import MapWidgetRoot from "./MapDrawing/MapWidgetRoot.vue";

const { mobile } = useDisplay();

const emit = defineEmits<{
  confirm: [data: any];
  back: [];
}>();

const mapData = ref<any>(null);
</script>

<template>
  <v-card flat class="px-lg-10 px-4">
    <div class="text-h5 text-center font-weight-bold mb-2">Outline the surfaces you want to sod</div>
    <div class="text-subtitle-2 text-center mb-2">Double {{ mobile ? "tap" : "click" }} to delete an area</div>

    <MapWidgetRoot />

    <div class="d-flex mx-n2">
      <v-btn slim variant="text" @click="emit('back')">Back</v-btn>
      <v-spacer />
      <v-btn slim variant="text" @click="emit('confirm', mapData)">Confirm</v-btn>
    </div>
  </v-card>
</template>
