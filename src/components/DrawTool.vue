<script setup lang="ts">
import { useDisplay } from "vuetify";
import MapWidgetRoot from "./MapDrawing/MapWidgetRoot.vue";
import { inject, ref } from "vue";
import { DataPackageInjectionKey, DefaultDataPackage } from "@/injections";

const { mobile } = useDisplay();
const dataPackage = inject(DataPackageInjectionKey, ref(DefaultDataPackage));

const emit = defineEmits(["confirm", "back"]);
</script>

<template>
  <v-card flat class="px-lg-10 px-4">
    <div class="text-h5 text-center font-weight-bold mb-2">Outline the surfaces you want to sod</div>
    <div class="text-subtitle-2 text-center mb-2">Double {{ mobile ? "tap" : "click" }} to delete an area</div>

    <MapWidgetRoot />

    <div class="d-flex mx-n2">
      <v-btn slim variant="text" @click="emit('back')">Back</v-btn>
      <v-spacer />
      <v-btn
        variant="elevated"
        color="primary"
        class="px-4"
        rounded
        :disabled="dataPackage.drawnAreas.length === 0"
        slim
        @click="emit('confirm')"
      >
        Confirm
      </v-btn>
    </div>
  </v-card>
</template>
