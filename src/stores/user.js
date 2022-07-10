import { defineStore } from "pinia"

export const useUserStore = defineStore("user", {
    state: () => {
        return {
            userId: null, // 用户 Id
            username: "", // 用户名
            avatarUrl: "", // 用户头像
            token: null,
        }
    },
    getters: {
        isLogged() {
            return this.token != null
        },
    },
    actions: {
        setToken(token) {
            this.token = token
        },
        setUserInfo({ userId = null, username = "" } = {}) {
            this.userId = userId
            this.username = username
        },
        logout() {
            this.token = null
        },
    },
    persist: true, // 开启持久化
})
