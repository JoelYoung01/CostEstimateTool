<script setup lang="ts">
const emit = defineEmits(["scheduleCall", "selfGuided"]);
</script>

<template>
  <v-card flat class="d-flex flex-column align-center" style="gap: 24px">
    <div class="text-h4 text-center">Get a Free Estimate</div>

    <v-card class="w-75 pb-3" color="secondary" @click="emit('selfGuided')">
      <v-card-title class="text-center">Self Guided Online Estimate</v-card-title>
      <v-card-subtitle> Ballpark Pricing within 10 minutes </v-card-subtitle>
    </v-card>

    <v-card class="w-75 pb-3" color="secondary" @click="emit('scheduleCall')">
      <v-card-title>Schedule a Call</v-card-title>
      <v-card-subtitle> Virtual live estimate with a Sod Smith representative </v-card-subtitle>
    </v-card>
  </v-card>
</template>
