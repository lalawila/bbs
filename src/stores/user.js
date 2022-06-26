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
})
