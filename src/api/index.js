import axios from "axios";

axios.defaults.timeout = 300000000
axios.defaults.baseURL = "http://localhost:8080/"
// 跨域携带cookie信息
axios.defaults.withCredentials = true

axios.interceptors.request.use(config => { return config }, error => {
    console.log("请求异常", JSON.stringify(error))
    return Promise.reject(error)
})

axios.interceptors.response.use(response => { return response }, error => {
    console.log("响应出错", JSON.stringify(error))
    return Promise.reject(error)
})

let $axios = axios;
export default $axios;


