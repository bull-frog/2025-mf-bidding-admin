import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { createVuetify } from 'vuetify'
import 'vuetify/styles' // Vuetifyのグローバルスタイルシートをインポート

const vuetify = createVuetify()

const app = createApp(App)
app.use(vuetify) // Vuetifyをアプリケーションに追加

app.use(createPinia())

app.mount('#app')
