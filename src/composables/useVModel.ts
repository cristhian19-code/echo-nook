import { computed, getCurrentInstance } from "vue";

// revisar nuevamente el codigo y entender la logica
export const useVModel = (props: any) => {
    const instance = getCurrentInstance();

    const emit = instance?.emit || instance?.proxy?.$emit;

    return computed({
        get() {
            return props.modelValue;
        },
        set(value) {
            if (emit) emit("update:modelValue", value);
        },
    });
};