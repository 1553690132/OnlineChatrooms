import 'element-plus/dist/index.css';
import router from './router'
import { createPinia } from 'pinia'
import api from './api/_index';

import "./mock/index"
export default {
    install: (app, options) => {
        app.use(router)
        app.use(createPinia())
        app.config.globalProperties.$api = api
    }
}