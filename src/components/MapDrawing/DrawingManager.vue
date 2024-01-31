<script setup lang="ts">
defineProps<{
  totalArea: number;
  disabledClearAll: boolean;
}>();

const emit = defineEmits<{
  "clear-all-polygons": [];
  "center-on-user": [];
}>();
</script>

<template>
  <div class="d-flex align-center py-2">
    <div>Total Area:</div>
    <div>
      <v-chip class="mx-2">{{ Math.max(0, Math.round(totalArea)).toLocaleString() }}</v-chip>
    </div>
    <div>SQFT</div>

    <v-spacer />

    <v-btn variant="text" icon @click="emit('center-on-user')">
      <v-icon icon="mdi-crosshairs-gps" />
      <v-tooltip activator="parent" location="bottom"> Center map on me </v-tooltip>
    </v-btn>

    <v-btn :disabled="disabledClearAll" variant="text" icon @click="emit('clear-all-polygons')">
      <v-icon icon="mdi-layers-remove" />
      <v-tooltip activator="parent" location="bottom"> Clear all areas </v-tooltip>
    </v-btn>
  </div>
</template>
