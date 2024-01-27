import { App } from 'vue'

//components global
import BaseInput from '../components/input/BaseInput.vue';
import CustomButton from '../components/button/CustomButton.vue';

import { QuillEditor } from '@vueup/vue-quill'

export default {
    install: (app: App) => {
        app.component('BaseInput', BaseInput)
        app.component('CustomButton', CustomButton)
        app.component('QuillEditor', QuillEditor);
    }
}