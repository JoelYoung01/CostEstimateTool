<script setup lang="ts">
import { watch } from "vue";
import { ref } from "vue";

const showDialog = ref(false);
const comment = ref<string>();

const eventTarget = new EventTarget();

async function getComment() {
  showDialog.value = true;

  return await waitForEvent(eventTarget, "comment");
}

function waitForEvent(eventTarget: EventTarget, eventName: string) {
  return new Promise((resolve) => {
    const listener = (event: any) => {
      eventTarget.removeEventListener(eventName, listener);
      resolve(event);
    };
    eventTarget.addEventListener(eventName, listener);
  });
}

function cancel() {
  comment.value = undefined;
  showDialog.value = false;
}

watch(showDialog, (newVal) => {
  if (!newVal) {
    eventTarget.dispatchEvent(new CustomEvent("comment", { detail: comment.value }));
  }
});

defineExpose({
  getComment
});
</script>

<template>
  <v-dialog v-model="showDialog" activator="parent" width="auto">
    <v-card>
      <v-card-title>Add a comment about this area (Optional)</v-card-title>
      <v-card-text>
        <v-textarea v-model="comment" label="Comment" />
      </v-card-text>
      <v-card-actions>
        <v-btn @click="cancel()">Cancel</v-btn>
        <v-btn @click="showDialog = false">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
