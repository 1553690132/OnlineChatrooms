import axios from "axios";
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'


axios.defaults.timeout = 300000000
axios.defaults.baseURL = "http://localhost:3007/"
// 跨域携带cookie信息
axios.defaults.withCredentials = true

axios.interceptors.request.use(config => {
    Nprogress.start()
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
    config.headers['Authorization'] = sessionStorage.getItem('token')
    return config
}, error => {
    console.log("请求异常", JSON.stringify(error))
    return Promise.reject(error)
})

axios.interceptors.response.use(response => {
    Nprogress.done()
    return response
}, error => {
    console.log("响应出错", JSON.stringify(error))
    return Promise.reject(error)
})

let $axios = axios;
export default $axios;


