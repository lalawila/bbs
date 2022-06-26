import axios from "axios"

// 创建实例时配置默认值
const http = axios.create({
    baseURL: "https://3yya.com/u/d8cf630cf5f367cc/bbs/app",
})

const token = localStorage.getItem("token")

http.interceptors.request.use(
    function (config) {
        // 请求成功
        if (token) {
            config.headers["Authorization"] = token
        }
        return config
    },
    function (error) {
        // 请求出错
        return Promise.reject(error)
    }
)

http.interceptors.response.use(
    function (response) {
        // 成功时执行
        // 2xx 的状态码
        return response
    },
    function (error) {
        // 失败时执行
        // 包括超时，网络错误，所有非 2xx 的状态码

        return Promise.reject(error)
    }
)

export default {
    install: (app) => {
        // 将 axios 绑定到全局属性中
        app.config.globalProperties.$http = http
    },
}
