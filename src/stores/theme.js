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
            this.setHtmlTheme()
        },
        setHtmlTheme() {
            // 设置 Element-UI 的主题模式（日间、夜间）
            if (this.isDark) {
                document.documentElement.classList.add("dark")
            } else {
                document.documentElement.classList.remove("dark")
            }
        },
    },
    persist: true, // 开启持久化
})
