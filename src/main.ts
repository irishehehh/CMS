

import { createApp } from 'vue'
// import { createPinia } from 'pinia'
import 'normalize.css'
import '@/assets/css/index.less'
import store from './stores/index'

import App from './App.vue'
import router from './router/index'
import registerIcons from './global/registers-icon'





const app = createApp(App)

app.use(registerIcons)
app.use(store)
app.use(router)


app.mount('#app')
