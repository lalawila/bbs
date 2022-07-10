<template>
    <div class="theme" :class="themeClass">
        <Navigator />
        <!-- 路由匹配到的组件将渲染在这里 -->
        <router-view></router-view>
    </div>
</template>
<script>
import { useUserStore } from "./stores/user"
import { useThemeStore } from "./stores/theme"
import Navigator from "./components/Navigator.vue"

export default {
    components: { Navigator },
    data() {
        const themeStore = useThemeStore()
        return {
            themeStore,
            userStore: useUserStore(),
        }
    },
    mounted() {
        this.refreshUserInfo()

        // 设置 Element-UI 的主题模式（日间、夜间）
        this.themeStore.setHtmlTheme()
    },
    computed: {
        themeClass() {
            return this.themeStore.isDark ? "dark-theme" : "light-theme"
        },
    },
    methods: {
        async refreshUserInfo() {
            if (this.userStore.isLogged) {
                const response = await this.$api.getSelfUser()
                this.userStore.setUserInfo({
                    userId: response.data.user_id,
                    username: response.data.username,
                    avatarUrl: response.data.avatar_url,
                })
            }
        },
    },
}
</script>
<style>
:root {
    box-sizing: border-box; /* 设置根元素的 box-sizing: border-box */
}
*,
*:before,
*:after {
    box-sizing: inherit; /* box-sizing 继承自父元素 */
}

html {
    --width: 680px;
}
body {
    margin: 0;
}

.theme {
    min-height: 100vh;

    background-color: var(--main-bg-color);
    color: var(--text-color);

    transition: background-color 1s, color 1s;
}

.light-theme {
    /* 页面背景颜色 */
    --main-bg-color: #eee;
    /* 元素背景颜色 */
    --bg-color: white;
    /* 文本颜色 */
    --text-color: #333;
}
.dark-theme {
    --main-bg-color: black;
    --bg-color: #333;
    --text-color: white;
}

.dark-theme .el-button.is-text:not(.is-disabled):hover,
.dark-theme .el-button.is-text:not(.is-disabled):active,
.dark-theme .el-button.is-text:not(.is-disabled):focus {
    background-color: black;
}

.bottom20 {
    margin-bottom: 20px;
}
.right10 {
    margin-right: 10px;
}
.right20 {
    margin-right: 20px;
}
</style>
