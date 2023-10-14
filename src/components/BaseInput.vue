<script lang="ts" setup>
import { defineProps } from 'vue'

interface Props {
    label: string;
    error?: boolean;
}

const {
    label,
    error
} = defineProps<Props>()


</script>

<template>
    <div class="form-control w-full">
        <label class="label">
            <span class="label-text">{{ label }}</span>
        </label>
        <input type="text" class="input input-bordered w-full" :class="error && 'input-error'" />
    </div>
</template>