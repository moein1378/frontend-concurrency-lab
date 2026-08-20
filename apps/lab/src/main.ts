import { createApp } from 'vue'
import App from './app/App.vue'
import { i18n } from './i18n'
import './styles/main.css'

createApp(App).use(i18n).mount('#app')
