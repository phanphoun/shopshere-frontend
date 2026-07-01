import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'
import messages from './i18n/messages'
import './assets/main.css'

const savedLocale = localStorage.getItem('locale') || 'en'

const i18n = createI18n({
  locale: savedLocale,
  fallbackLocale: 'en',
  legacy: false,
  messages,
})

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(i18n)
app.mount('#app')
