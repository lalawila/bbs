<template>
    <header class="navigator">
        <div class="box">
            <router-link class="brand" :to="{ name: 'home' }"
                >三眼鸭的吹牛社区</router-link
            >
            <div class="right">
                <el-switch
                    class="right20"
                    :model-value="themeStore.isDark"
                    @change="themeStore.toggleTheme()"
                    size="large"
                    inline-prompt
                    :active-icon="MoonNight"
                    :inactive-icon="Sunrise"
                />
                <el-dropdown v-if="userStore.isLogged">
                    <router-link
                        :to="{
                            name: 'userDetail',
                            params: { userId: userStore.userId },
                        }"
                        class="user"
                    >
                        <Avatar :src="userStore.avatarUrl"></Avatar>
                        <label class="username">{{ userStore.username }}</label>
                    </router-link>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="userStore.logout"
                                >退出登录</el-dropdown-item
                            >
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <template v-else>
                    <el-button text
                        ><router-link
                            :to="{
                                name: 'login',
                                query: { redirect: $route.fullPath },
                            }"
                            >登录</router-link
                        ></el-button
                    >
                    <el-button text>
                        <router-link
                            :to="{
                                name: 'signup',
                                query: { redirect: $route.fullPath },
                            }"
                            >注册</router-link
                        >
                    </el-button>
                </template>
            </div>
        </div>
    </header>
</template>
<script>
import { Sunrise, MoonNight } from "@element-plus/icons-vue"
import { useUserStore } from "../stores/user"
import { useThemeStore } from "../stores/theme"

export default {
    setup() {
        return {
            Sunrise,
            MoonNight,
        }
    },
    data() {
        const userStore = useUserStore()
        const themeStore = useThemeStore()
        return {
            userStore,
            themeStore,
            posts: [],
        }
    },
}
</script>

<style scoped>
.navigator {
    margin-bottom: 40px;
    background-color: var(--bg-color);
}

.navigator .box {
    max-width: var(--width);
    height: 60px;
    margin: 0 auto;
    padding: 0 20px;

    display: flex;
    align-items: center;
    justify-content: space-between;
}
.navigator .box a {
    text-decoration: none;
    color: var(--text-color);
}
.navigator .box .brand {
    font-size: 20px;
    font-weight: bold;
}

.right {
    display: flex;
    align-items: center;
}

.user {
    display: flex;
    align-items: center;
    gap: 10px;
}
</style>
