<script lang="ts" setup>
import { defineProps } from "vue";

interface Props {
  label: string;
}

const { label } = defineProps<Props>();
</script>

<template>
  <button class="button-base px-4 py-2 text-md border cursor-pointer border-zinc-800 rounded-sm transition-all duration-150 ease-in hover:-translate-x-1 hover:-translate-y-1">{{ label }}</button>
</template>

<style lang="scss">
.button-base:hover {
  box-shadow: 0.3rem 0.3rem rgb(37, 37, 37);
}
</style>
