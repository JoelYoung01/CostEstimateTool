<script setup lang="ts">
import { watch } from "vue";
import { ref } from "vue";

const showDialog = ref(false);
const comment = ref<string>();

const eventTarget = new EventTarget();

async function getComment() {
  showDialog.value = true;

  return await waitForComment(eventTarget, "comment");
}

function waitForComment(eventTarget: EventTarget, eventName: string) {
  return new Promise<string | undefined>((resolve) => {
    const listener = (event: any) => {
      eventTarget.removeEventListener(eventName, listener);
      resolve(event.detail);
    };
    eventTarget.addEventListener(eventName, listener);
  });
}

watch(showDialog, (newVal) => {
  if (!newVal) {
    eventTarget.dispatchEvent(new CustomEvent("comment", { detail: comment.value }));
    comment.value = undefined;
  }
});

defineExpose({
  getComment
});
</script>

<template>
  <v-dialog v-model="showDialog" width="auto">
    <v-card>
      <div class="px-6 pt-3">Add a comment about this area (Optional)</div>
      <v-card-text>
        <v-textarea v-model="comment" label="Comment" />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" variant="elevated" @click="showDialog = false">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
