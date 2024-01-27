import { defineStore } from "pinia";

interface UiState {
    active: boolean;
    success: boolean;
    text: string | null;
}

export const uiStore = defineStore('ui', {
    state: (): UiState => ({
        active: false,
        text: null,
        success: false,
    }),
    getters: {},
    actions: {
        activeSnack(text: string, success: boolean = true) {
            this.text = text
            this.active = true;
            this.success = success;
        }
    },
})