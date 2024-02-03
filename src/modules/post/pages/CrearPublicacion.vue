<script setup lang="ts">
             
</script>

<template>
  <v-card elevation="0" width="600px" class="pa-3 mx-auto text-center">
    <v-card-content>
      <v-form class="d-flex flex-column justify-center">
        <h1 class="mb-4">Registrar</h1>

        <base-input label="Title" />
        <base-input label="Mensaje" />
        <quill-editor theme="snow"></quill-editor>
      </v-form>
    </v-card-content>
  </v-card>
</template>
