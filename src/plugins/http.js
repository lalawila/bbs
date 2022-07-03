import axios from "axios"
import { useUserStore } from "../stores/user"

export default {
    install: (app) => {
        // 创建实例时配置默认值
        const http = axios.create({
            baseURL: "https://3yya.com/u/d8cf630cf5f367cc/bbs/app",
        })

        const userStore = useUserStore()

        http.interceptors.request.use(
            function (config) {
                // 请求成功
                if (userStore.token) {
                    config.headers["Authorization"] = userStore.token
                }
                return config
            }
            // function (error) {
            //     // 请求出错
            //     return Promise.reject(error)
            // }
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
                if (error.response.status === 400) {
                    if (error.response.data.code === 1100) {
                        userStore.logout()
                    }
                }

                return Promise.reject(error)
            }
        )

        // 将 axios 绑定到全局属性中
        app.config.globalProperties.$http = http
    },
}
