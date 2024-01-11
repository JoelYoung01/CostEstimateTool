<script setup lang="ts">
import { ref } from "vue";
import type { ContactInfo } from "@/types";

const emit = defineEmits<{
  confirm: [data: ContactInfo];
  back: [];
}>();

const nextWeek = () => {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return date;
};

const contactInfo = ref<ContactInfo>({
  name: "",
  email: "",
  phone: "",
  desiredCompletionDate: nextWeek()
});

const validForm = ref(false);
const showDatePicker = ref(false);

const required = (value: string) => !!value || "Required";
const isEmail = (value: string) => /.+@.+\..+/.test(value) || "Invalid email";

const daysFromToday = (date: Date) => {
  const today = new Date();
  const diffTime = Math.abs(date.getTime() - today.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
</script>

<template>
  <v-card flat>
    <v-card-title class="text-center mb-2" style="font-size: 24px; font-weight: bolder">
      We need a few more details from you<br />
      to calculate your estimate
    </v-card-title>

    <v-card-text>
      <v-form v-model="validForm">
        <v-text-field
          v-model="contactInfo.name"
          prepend-icon="mdi-account"
          label="Name"
          variant="outlined"
          class="mb-3"
          :rules="[required]"
        />
        <v-text-field
          v-model="contactInfo.email"
          prepend-icon="mdi-email"
          validate-on="blur"
          label="Email"
          placeholder="johndoe@gmail.com"
          variant="outlined"
          class="mb-3"
          :rules="[required, isEmail]"
        />
        <v-text-field
          v-model="contactInfo.phone"
          prepend-icon="mdi-phone"
          label="Phone"
          variant="outlined"
          class="mb-3"
          :rules="[required]"
        />
        <v-text-field
          :modelValue="contactInfo.desiredCompletionDate.toDateString()"
          readonly
          prepend-icon="mdi-calendar-month-outline"
          label="Desired Completion Date"
          variant="outlined"
          class="mb-3"
          :rules="[required]"
        >
          <v-menu v-model="showDatePicker" activator="parent" :close-on-content-click="false">
            <v-date-picker
              v-model="contactInfo.desiredCompletionDate"
              :min="new Date()"
              landscape
              @update:modelValue="showDatePicker = false"
            />
          </v-menu>

          <template #append-inner>
            <span style="font-size: 12px; white-space: nowrap">
              In {{ daysFromToday(contactInfo.desiredCompletionDate) }} day{{
                daysFromToday(contactInfo.desiredCompletionDate) === 1 ? "" : "s"
              }}
            </span>
          </template>
        </v-text-field>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-btn color="primary" @click="emit('back')"> Back </v-btn>
      <v-spacer />
      <v-btn color="primary" @click="emit('confirm', contactInfo)" :disabled="!validForm"> Confirm </v-btn>
    </v-card-actions>
  </v-card>
</template>