<script setup lang="ts">
import { ref } from "vue";
import { type ContactInfo } from "@/types";
import StartPage from "./StartPage.vue";
import DrawTool from "./DrawTool.vue";
import CollectContactInfo from "./CollectContactInfo.vue";
import EstimateResult from "./EstimateResult.vue";
import SendVideo from "./SendVideo.vue";
import DonePage from "./DonePage.vue";

type Stage = "ScheduleCall" | "Start" | "Draw" | "ContactInfo" | "Estimate" | "SendVideo" | "ConfirmPhone" | "Done";
const defaultStage: Stage = "Start";

const emit = defineEmits<{ close: [] }>();
const currentStage = ref<Stage>(defaultStage);

const exit = () => {
  currentStage.value = defaultStage;
  emit("close");
};

const addContactInfo = (contactInfo: ContactInfo) => {
  console.log(contactInfo);
  currentStage.value = "Estimate";
};
</script>

<template>
  <v-card min-width="600">
    <v-card-title class="d-flex justify-end">
      <v-btn size="small" variant="text" icon="mdi-close" @click="exit" />
    </v-card-title>
    <v-window v-model="currentStage" rounded class="px-2 pb-2">
      <v-window-item value="Start">
        <StartPage @self-guided="currentStage = 'Draw'" @schedule-call="currentStage = 'ScheduleCall'" />
      </v-window-item>

      <v-window-item value="Draw">
        <DrawTool @back="currentStage = 'Start'" @confirm="currentStage = 'ContactInfo'" />
      </v-window-item>

      <v-window-item value="ContactInfo">
        <CollectContactInfo @back="currentStage = 'Draw'" @confirm="addContactInfo" />
      </v-window-item>

      <v-window-item value="Estimate">
        <EstimateResult
          :squareFootage="605"
          :daysUntilCompletion="21"
          @back="currentStage = 'ContactInfo'"
          @continue="currentStage = 'SendVideo'"
        />
      </v-window-item>

      <v-window-item value="SendVideo">
        <SendVideo @link="currentStage = 'Done'" @skip="currentStage = 'Done'" @back="currentStage = 'Estimate'" />
      </v-window-item>

      <v-window-item value="ConfirmPhone"> <div></div> </v-window-item>

      <v-window-item value="Done">
        <DonePage @back="currentStage = 'SendVideo'" @schedule-call="currentStage = 'ScheduleCall'" />
      </v-window-item>

      <v-window-item value="ScheduleCall">
        <v-card flat>
          <v-card-title class="text-center mb-2" style="font-size: 24px; font-weight: bolder">
            Schedule a Call
          </v-card-title>
          <v-card-text class="text-center" style="font-size: 1rem">
            Pretend this takes you to the integrated calendar
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn @click="currentStage = 'Start'">Start Over</v-btn>
          </v-card-actions>
        </v-card>
      </v-window-item>
    </v-window>
  </v-card>
</template>
