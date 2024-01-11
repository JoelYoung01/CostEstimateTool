<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{
  confirm: [data: any];
  back: [];
}>();

const mapData = ref<any>(null);
</script>

<template>
  <v-card flat>
    <v-card-title class="text-center mb-2" style="font-size: 24px; font-weight: bolder">
      Outline the surfaces you want to sod
    </v-card-title>

    <v-skeleton-loader class="mx-4" type="image" />

    <div class="d-flex align-center justify-center mx-4 py-3 mb-3">
      <span class="mr-3" style="font-size: 18px">Currently selected square footage:</span>
      <v-chip variant="elevated" color="primary">605 SQFT</v-chip>
    </div>

    <v-card-actions>
      <v-btn color="primary" @click="emit('back')">Back</v-btn>
      <v-spacer />
      <v-btn color="primary" @click="emit('confirm', mapData)">Confirm</v-btn>
    </v-card-actions>
  </v-card>
</template>
