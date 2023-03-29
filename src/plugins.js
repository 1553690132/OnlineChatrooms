import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from './router'
import { createPinia } from 'pinia'
import api from './api/_index';

import "./mock/index"
export default {
    install: (app, options) => {
        app.use(ElementPlus)
        app.use(router)
        app.use(createPinia())

        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
        }

        const prompt = (message, code = 400) => {
            app.config.globalProperties.$message({
                message: code == 200 ? `${message}成功` : `${message}失败`,
                type: code == 200 ? 'success' : 'error'
            })
        }

        app.config.globalProperties.$prompt = prompt

        app.config.globalProperties.$api = api
    }
}