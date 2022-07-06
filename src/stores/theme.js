import { defineStore } from "pinia"

export const useThemeStore = defineStore("theme", {
    state: () => {
        return {
            isDark: false,
        }
    },
    getters: {
        themeClass() {
            return this.isDark ? "dark-theme" : "light-theme"
        },
    },
    persist: true, // 开启持久化
})
