<template>
    <Navigator />
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
</template>
<script>
import { useUserStore } from "./stores/user"
import Navigator from "./components/Navigator.vue"

export default {
    components: { Navigator },
    data() {
        return {
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
    background-color: #eee;

    --width: 680px;
}
body {
    margin: 0;
}
.bottom20 {
    margin-bottom: 20px;
}
</style>
