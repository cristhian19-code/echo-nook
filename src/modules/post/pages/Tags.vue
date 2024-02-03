<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { axiosInstance } from "../../../plugins/axios";
import { userStore } from "../../auth/store/users";

const headers = [
  { title: "Tag", value: "title" },
  { title: "Acción", value: "accion" }
];

const items = ref([]);
const entity = ref<any>({});
const dialog = ref(false);
const isEdit = ref(false);
const isValidForm = ref(false);
const store = userStore();

const getItems = async () => {
  if (!store.user?._id) return;
  const { data } = await axiosInstance(`/tags/${store.user?._id}`);
  items.value = data.data;
};

watch(() => store.user?._id, async () => {
  await getItems();
});

const openDialogAdd = () => {
  dialog.value = true;
  isEdit.value = false;
  entity.value = {
    title: "",
    creator: store.user?._id,
  };
};

const openDialogEdit = (item: any) => {
  dialog.value = true;
  isEdit.value = true;
  entity.value = {
    title: item.title,
    _id: item._id
  };
};

const onDelete = async (item: any) => {
  await axiosInstance.delete(`/tags/${item._id}`);
  await getItems();
};

const handleSaveTag = async () => {
  if (!isValidForm.value) return;
  const method = isEdit.value ? "put" : "post";
  await axiosInstance[method](`/tags/`, entity.value);
  await getItems();
  dialog.value = false;
};

const titleComputed = computed(() => {
  return `${isEdit.value ? "Editar" : "Agregar"} Tag`;
});

getItems()
</script>

<template>
  <custom-button @click="openDialogAdd" text="Agregar" icon="mdi-plus" />
  <v-data-table class="mt-2" :items="items" :headers="headers" density="compact">
    <template #item.accion="{ item }">
      <tooltip-btn @click="openDialogEdit(item)" text="Editar" icon="mdi-pencil" color="yellow-darken-2" />
      <tooltip-btn @click="onDelete(item)" text="Eliminar" icon="mdi-trash-can" color="red" />
    </template>
  </v-data-table>

  <v-dialog v-model="dialog" width="500" persistent>
    <v-card>
      <v-card-title class="bg-indigo"> {{ titleComputed }} </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleSaveTag" v-model="isValidForm">
          <base-input v-model="entity.title" label="Titulo" />
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <custom-button text="Cancelar" variant="outlined" hide-icon color="grey" @click="dialog = false"></custom-button>
        <custom-button text="Guardar" icon="mdi-content-save-outline" color="indigo"
          @click="handleSaveTag"></custom-button>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
