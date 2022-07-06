<template>
    <div class="theme" :class="themeStore.themeClass">
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
    },
    methods: {
        async refreshUserInfo() {
            if (this.userStore.isLogged) {
                const response = await this.$api.getSelfUser()
                this.userStore.setUserInfo({
                    userId: response.data.user_id,
                    username: response.data.username,
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

.bottom20 {
    margin-bottom: 20px;
}
.right10 {
    margin-right: 10px;
}
</style>
<style scoped>
.theme {
    background-color: var(--main-back-color);
    color: var(--text-color);

    transition: all 1s;
}
.light-theme {
    /* 页面背景颜色 */
    --main-back-color: #eee;
    /* 元素背景颜色 */
    --back-color: white;
    /* 文本颜色 */
    --text-color: #333;
}
.dark-theme {
    --main-back-color: black;
    --back-color: #333;
    --text-color: white;
}
</style>
