<script setup lang="ts">
const emit = defineEmits(["scheduleCall", "selfGuided"]);
</script>

<template>
  <v-card flat class="d-flex flex-column align-center" style="gap: 24px">
    <v-card-title class="d-flex justify-center" style="font-size: 32px; font-weight: bolder">
      Get a Free Estimate
    </v-card-title>

    <v-card class="w-75 pb-3" color="secondary" @click="emit('selfGuided')">
      <v-card-title class="d-flex justify-center">Self Guided Online Estimate</v-card-title>
      <v-card-subtitle class="d-flex justify-center"> Ballpark Pricing within 10 minutes </v-card-subtitle>
    </v-card>

    <v-card class="w-75 pb-3" color="secondary" @click="emit('scheduleCall')">
      <v-card-title class="d-flex justify-center">Schedule a Call</v-card-title>
      <v-card-subtitle class="d-flex justify-center">
        Virtual live estimate with a Sod Smith representative
      </v-card-subtitle>
    </v-card>
  </v-card>
</template>
