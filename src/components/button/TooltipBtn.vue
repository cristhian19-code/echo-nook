<script setup lang="ts">
import { defineProps, withDefaults, defineEmits } from "vue";

type typeVariant = "flat" | "outlined" | "text"

interface InterfaceButton {
    text?: string;
    color?: string;
    icon?: string;
    ripple?: boolean;
    customClass?: string;
    loading?: boolean;
}

const emit = defineEmits(["click"]);

const propsA = withDefaults(defineProps<InterfaceButton>(), {
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
    <v-tooltip :text="propsA.text">
        <template v-slot:activator="{ props }">
            <v-btn @click="onClick" density="comfortable" variant="text" rounded="full" v-bind="props" :color="propsA.color"
                :icon="propsA.icon">
            </v-btn>
        </template>
    </v-tooltip>
</template>