import axios from "axios"
import { useUserStore } from "../stores/user"

export default {
    install: (app) => {
        const userStore = useUserStore()

        const http = axios.create({
            // baseURL: "https://3yya.com/u/d8cf630cf5f367cc/bbs/app",
            baseURL: "http://127.0.0.1:9000/u/d8cf630cf5f367cc/bbs/app",
        })

        // 添加请求拦截器
        http.interceptors.request.use(
            function (config) {
                // 在发送请求之前做些什么
                if (userStore.isLogged) {
                    // 如果已经登录
                    // 带上 token
                    config.headers["Authorization"] = userStore.token
                }
                return config
            },
            function (error) {
                // 对请求错误做些什么
                return Promise.reject(error)
            }
        )

        // 添加响应拦截器
        http.interceptors.response.use(
            function (response) {
                // 2xx 范围内的状态码都会触发该函数。
                // 对响应数据做点什么
                return response
            },
            function (error) {
                // 超出 2xx 范围的状态码都会触发该函数。
                // 对响应错误做点什么

                if (error.response.status === 400) {
                    if (error.response.data.code === 1100) {
                        // token 失效
                        // 退出登录状态
                        userStore.logout()
                    }
                }

                return Promise.reject(error)
            }
        )

        app.config.globalProperties.$http = http
    },
}
