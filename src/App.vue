<script setup lang="ts">
import { ref } from "vue";
import EstimateContent from "@/components/EstimateContent.vue";
import { useDisplay } from "vuetify";

const showDialog = ref(false);
const { mobile } = useDisplay();
</script>

<template>
  <v-theme-provider theme="SodSmithTheme">
    <v-btn rounded color="primary" size="large">
      <v-dialog v-model="showDialog" activator="parent" width="auto">
        <EstimateContent @close="showDialog = false" />
      </v-dialog>

      Get Estimate
    </v-btn>
  </v-theme-provider>
</template>
