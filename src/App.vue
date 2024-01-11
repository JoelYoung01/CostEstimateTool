<script setup lang="ts">
import { ref } from "vue";
import EstimateContent from "@/components/EstimateContent.vue";

const showDialog = ref(false);
</script>

<template>
  <v-btn>
    <v-dialog v-model="showDialog" activator="parent" width="auto">
      <EstimateContent @close="showDialog = false" />
    </v-dialog>
    Get Estimate
  </v-btn>
</template>
