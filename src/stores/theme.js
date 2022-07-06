import { defineStore } from "pinia"

export const useThemeStore = defineStore("theme", {
    state: () => {
        return {
            isDark: false,
        }
    },
    persist: true, // 开启持久化
})
