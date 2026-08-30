import { createApp } from 'vue'
import App from './app/App.vue'
import { vuetify } from './plugins/vuetify'
import { router } from './router'
import './styles/main.css'

document.documentElement.lang = 'en'
document.documentElement.dir = 'ltr'
createApp(App).use(vuetify).use(router).mount('#app')
