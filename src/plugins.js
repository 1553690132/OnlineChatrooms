import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from './router'
import { createPinia } from 'pinia'

import "./mock/index"
export default {
    install: (app, options) => {
        app.use(ElementPlus)
        app.use(router)
        app.use(createPinia())

        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
        }
    }
}