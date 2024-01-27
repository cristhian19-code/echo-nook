<script setup lang="ts">
import { uiStore } from "./store/ui";

const ui = uiStore();
</script>

<template>
  <router-view></router-view>

  <v-snackbar timeout="4000" :color="ui.success ? 'green' : 'red'" v-model="ui.active">
    {{ ui.text }}
  </v-snackbar>
</template>
