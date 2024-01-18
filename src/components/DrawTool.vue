<script setup lang="ts">
import { ref } from "vue";
import { useDisplay } from "vuetify";

const emit = defineEmits<{
  confirm: [data: any];
  back: [];
}>();

const mapData = ref<any>(null);
</script>

<template>
  <v-card flat class="px-lg-10 px-4">
    <div class="text-h5 text-center mb-2" style="font-size: 24px; font-weight: bolder">
      Outline the surfaces you want to sod
    </div>

    <v-skeleton-loader type="image" />

    <div class="d-flex align-center justify-center py-3 mb-3">
      <span class="mr-3" style="font-size: 18px">Currently selected square footage:</span>
      <div>
        <v-chip variant="elevated" color="primary" min-width="100">605 SQFT</v-chip>
      </div>
    </div>

    <div class="d-flex mx-n2">
      <v-btn slim variant="text" @click="emit('back')">Back</v-btn>
      <v-spacer />
      <v-btn slim variant="text" @click="emit('confirm', mapData)">Confirm</v-btn>
    </div>
  </v-card>
</template>
