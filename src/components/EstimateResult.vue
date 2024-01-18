<script setup lang="ts">
import { computed } from "vue";
import { useDisplay } from "vuetify";

const props = defineProps<{
  squareFootage: number;
  daysUntilCompletion: number;
}>();

const emit = defineEmits<{
  continue: [];
  back: [];
}>();

const { mobile } = useDisplay();

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
  <v-card flat max-width="600px" class="px-lg-6 px-4">
    <div class="text-h5 text-center mb-2 font-weight-bold">Ballpark Range for {{ squareFootage }} SQFT:</div>
    <v-card-text class="d-flex align-center justify-center" :style="{ gap: mobile ? '12px' : '12px' }">
      <v-chip size="x-large" variant="elevated" color="secondary"> ${{ estimate - 150 }} </v-chip>
      <v-icon icon="mdi-arrow-left-right" size="x-large" />
      <v-chip size="x-large" variant="elevated" color="secondary"> ${{ estimate + 150 }} </v-chip>
    </v-card-text>

    <div class="text-center text-body-1 mb-6">
      There are multiple factors that affect pricing including project access, current surface conditions, fences,
      stairs, and more. Fortunately, we can provide a more accurate price in just a few clicks! If the range above is
      within your budget, click 'continue'.
    </div>

    <div class="d-flex mx-n2">
      <v-btn slim variant="text" @click="emit('back')">Back</v-btn>
      <v-spacer />
      <v-btn slim variant="text" @click="emit('continue')">Continue</v-btn>
    </div>
  </v-card>
</template>
