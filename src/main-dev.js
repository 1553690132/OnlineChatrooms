import { createApp } from 'vue'
import App from './App.vue'
import plugins from './plugins'
import router from './router'

const app = createApp(App)
app.use(plugins)
app.use(router)
app.mount('#app')

