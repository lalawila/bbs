import axios from "axios"
import { useUserStore } from "../stores/user"

export default {
    install: (app) => {
        const userStore = useUserStore()
        const config = {
            baseURL: "https://3yya.com/u/d8cf630cf5f367cc/bbs/app",
        }

        if (userStore.isLogged) {
            // 只要已经登录
            // 就会配置 token
            config["headers"] = {
                Authorization: userStore.token,
            }
        }

        const http = axios.create(config)

        app.config.globalProperties.$http = http
    },
}
