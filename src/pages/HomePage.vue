<script setup lang="ts">
import Card from '../components/Card.vue'

</script>

<template>
  <div class="flex flex-wrap justify-center gap-10">
    <card v-for="i in 6" :key="i"/>
  </div>
</template>

<style scoped>
</style>
