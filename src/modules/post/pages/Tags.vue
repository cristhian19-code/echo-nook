<script setup lang="ts">
import { ref } from "vue";
import { axiosInstance } from "../../../plugins/axios";
import { userStore } from "../../auth/store/users";

const headers = [{ title: "Tag", value: "title" }];

const items = ref([]);
const tag = ref("");
const dialog = ref(false);
const isValidForm = ref(false);
const store = userStore();

const getItems = async () => {
  const { data } = await axiosInstance(`/tags/`);
  items.value = data.data;
};

getItems();

const openDialogAdd = () => {
  dialog.value = true;
};

const handleSaveTag = async () => {
  if (!isValidForm.value) return;
  await axiosInstance.post(`/tags/${store.user?._id}`, {
    title: tag.value,
  });

  await getItems();
};
</script>

<template>
  <custom-button @click="openDialogAdd" text="Agregar" icon="mdi-plus" />
  <v-data-table
    class="mt-2"
    :items="items"
    :headers="headers"
    density="compact"
  ></v-data-table>

  <v-dialog v-model="dialog" width="500" persistent>
    <v-card>
      <v-card-title class="bg-indigo"> Registrar Tag </v-card-title>
      <v-card-text>
        <v-form v-model="isValidForm">
          <base-input v-model="tag" label="Titulo" />
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <custom-button
          text="Cancelar"
          variant="outlined"
          hide-icon
          color="grey"
          @click="dialog = false"
        ></custom-button>
        <custom-button
          text="Guardar"
          icon="mdi-content-save-outline"
          color="indigo"
          @click="handleSaveTag"
        ></custom-button>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
