<script setup lang="ts">
import { ref } from "vue";
import MapWidgetRoot from "./MapDrawing/MapWidgetRoot.vue";

const emit = defineEmits<{
  confirm: [data: any];
  back: [];
}>();

const mapData = ref<any>(null);
</script>

<template>
  <v-card flat class="px-lg-10 px-4">
    <div class="text-h5 text-center font-weight-bold mb-2">Outline the surfaces you want to sod</div>

    <MapWidgetRoot />

    <div class="d-flex mx-n2">
      <v-btn slim variant="text" @click="emit('back')">Back</v-btn>
      <v-spacer />
      <v-btn slim variant="text" @click="emit('confirm', mapData)">Confirm</v-btn>
    </div>
  </v-card>
</template>
