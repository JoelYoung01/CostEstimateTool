<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  squareFootage: number;
  daysUntilCompletion: number;
}>();

const emit = defineEmits<{
  continue: [];
  back: [];
}>();

const pricePerSquareFoot = 3.5;
const pricePerFastDay = 10;

const estimate = computed(() => {
  const { squareFootage, daysUntilCompletion } = props;
  const basePrice = squareFootage * pricePerSquareFoot;
  const daysPrice = Math.min(30 - daysUntilCompletion, 0) * pricePerFastDay;
  return Math.round((basePrice + daysPrice) / 100) * 100;
});
</script>

<template>
  <v-card flat max-width="600px">
    <v-card-title class="text-center mb-2" style="font-size: 24px; font-weight: bolder">
      Ballpark Range for {{ squareFootage }} SQFT:
    </v-card-title>
    <v-card-text class="d-flex align-center justify-center" style="gap: 24px">
      <v-chip size="x-large" variant="elevated" color="secondary"> ${{ estimate - 150 }} </v-chip>
      <v-icon icon="mdi-arrow-left-right" size="x-large" />
      <v-chip size="x-large" variant="elevated" color="secondary"> ${{ estimate + 150 }} </v-chip>
    </v-card-text>

    <v-card-text class="text-center" style="font-size: 1rem">
      There are multiple factors that affect pricing including project access, current surface conditions, fences,
      stairs, and more. Fortunately, we can provide a more accurate price in just a few clicks! If the range above is
      within your budget, click 'continue'.
    </v-card-text>

    <v-card-actions>
      <v-btn variant="text" @click="emit('back')">Back</v-btn>
      <v-spacer />
      <v-btn color="primary" @click="emit('continue')">Continue</v-btn>
    </v-card-actions>
  </v-card>
</template>
