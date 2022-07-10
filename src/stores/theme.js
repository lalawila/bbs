import { defineStore } from "pinia"

export const useThemeStore = defineStore("theme", {
    state: () => {
        return {
            isDark: false,
        }
    },
    actions: {
        toggleTheme() {
            this.isDark = !this.isDark
            if (this.isDark) {
                document.documentElement.classList.add("dark")
            } else {
                document.documentElement.classList.remove("dark")
            }
        },
    },
    persist: true, // 开启持久化
})
