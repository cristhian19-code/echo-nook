<script setup lang="ts">
import PublicationCard from "../../../components/card/PublicationCard.vue";

import { postStore } from "../store/post";

const store = postStore();

store.getPosts();
</script>

<template>
  <publication-card />
</template>
