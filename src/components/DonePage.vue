<script setup lang="ts">
const emit = defineEmits<{ back: []; scheduleCall: [] }>();
</script>

<template>
  <v-card flat width="600">
    <v-card-title class="text-center" style="font-size: 48px; line-height: 1.2; font-weight: bolder">
      Hooray! 🎉
    </v-card-title>
    <v-card-subtitle class="text-center" style="font-size: 1rem; font-weight: bolder">
      Thank you for using our online estimation tool!
    </v-card-subtitle>

    <v-card-text class="text-center" style="font-size: 1rem">
      To confirm the price, please schedule a phone call with a Sod Smith representative by clicking the link below.
      This call typically takes 5 - 7 minutes and then you'll have a confirmed price.
    </v-card-text>
    <v-card-text class="text-center" style="font-size: 1rem"> We look forward to hearing from you!</v-card-text>

    <v-card-actions>
      <v-btn @click="emit('back')">Back</v-btn>
      <v-spacer />
      <v-btn variant="elevated" class="px-4" color="primary" rounded @click="emit('scheduleCall')">Schedule Call</v-btn>
    </v-card-actions>
  </v-card>
</template>
