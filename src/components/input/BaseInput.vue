<script setup lang="ts">
import { defineProps, withDefaults, defineEmits } from "vue";
import { useRules } from "../../composables/useRules";
import { useVModel } from "../../composables/useVModel";

type variant = "outlined" | "underlined" | "filled";
type density = "default" | "compact" | "comfortable";
type detail = "auto";

interface Props {
  modelValue: string;
  label?: string;
  type?: string;
  variant?: variant;
  clearable?: boolean;
  disabled: boolean;
  noRequired?: boolean;
  hideDetails?: boolean | detail;
  density?: density;
  customRules?: Function[];
  max?: number | null;
  min?: number | null;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "outlined",
  density: "compact",
  type: "text",
  customRules: () => [],
});

const emit = defineEmits(["blur"]);

const { initRules, rulesInput } = useRules(
  props.noRequired,
  props.type,
  props.customRules
);

const model = useVModel(props);

const onBlur = () => {
  emit("blur");
};

initRules();
</script>

<template>
  <v-text-field
    v-model="model"
    @blur="onBlur"
    :disabled="props.disabled"
    color="indigo-accent-4"
    :density="props.density"
    :variant="props.variant"
    :rules="rulesInput"
    :hide-details="hideDetails"
    :clearable="props.clearable"
    :type="type"
    :max="props.max"
    :min="props.min"
    :label="label"
  ></v-text-field>
</template>

<style lang="scss"></style>
