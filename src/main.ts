import { createApp } from 'vue'
import App from './App.vue'

import vuetify from './plugins/vuetify'

import router from './router'

import '@vueup/vue-quill/dist/vue-quill.snow.css';

import global from './plugins/global-componentes'

import { createPinia } from 'pinia'

const pinia = createPinia()

createApp(App).use(vuetify).use(global).use(router).use(pinia).mount('#app')
