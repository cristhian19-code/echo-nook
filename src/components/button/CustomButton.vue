<script setup lang="ts">
import { defineProps, withDefaults, defineEmits } from "vue";

type typeVariant = "flat" | "outlined" | "text"

interface InterfaceButton {
  text?: string;
  rounded?: string;
  color?: string;
  icon?: string;
  ripple?: boolean;
  customClass?: string;
  height?: string;
  loading?: boolean;
  hideIcon?: boolean;
  variant?: typeVariant;
}

const emit = defineEmits(["click"]);

const props = withDefaults(defineProps<InterfaceButton>(), {
  rounded: "md",
  color: "primary",
  variant: "flat",
  ripple: false,
  loading: false,
  hideIcon: false,
  customClass: "",
});

const onClick = () => {
  emit("click");
};
</script>

<template>
  <v-btn
    :class="props.customClass"
    class="d-flex align-center"
    elevation="0"
    :variant="props.variant"
    :loading="props.loading"
    @click="onClick"
    :ripple="props.ripple"
    :rounded="props.rounded"
    :color="props.color"
  >
    <v-icon v-if="!hideIcon" class="mr-1" :icon="props.icon" size="22"></v-icon>
    <div
      v-if="props.text.length !== 0"
      class="font-weight-bold text-capitalize"
      style="font-size: 14px"
    >
      {{ props.text }}
    </div>
  </v-btn>
</template>

<style lang="scss">
.v-btn {
  letter-spacing: normal;
}
</style>
