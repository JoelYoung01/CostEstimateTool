<script setup lang="ts">
import exampleImage from "@/assets/images/TakeVideoExampleImage.png";

const emit = defineEmits<{ link: [string]; skip: []; back: [] }>();

const buildLink = () => {
  const link = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  emit("link", link);
  window.open(link, "_blank");
};
</script>

<template>
  <v-card flat>
    <v-card-title class="text-center mb-2" style="font-size: 24px; font-weight: bolder">
      Send us your Project Video in one click
    </v-card-title>
    <v-img height="400" :src="exampleImage" class="mb-4" />

    <div class="d-flex justify-center">
      <v-btn size="x-large" rounded variant="elevated" class="mx-auto" color="primary" @click="buildLink()"
        >Get Link</v-btn
      >
    </div>

    <v-card-actions>
      <v-btn variant="text" @click="emit('back')">Back</v-btn>
      <v-spacer />
      <v-btn color="primary" @click="emit('skip')">Skip for now</v-btn>
    </v-card-actions>
  </v-card>
</template>
