<template>
    <header class="navigator">
        <div class="box">
            <router-link class="title" :to="{ name: 'home' }"
                >三眼鸭的吹牛社区</router-link
            >
            <div>
                <div v-if="userStore.isLogged">
                    <el-dropdown>
                        <label>{{ userStore.username }}</label>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click="logout"
                                    >退出登录</el-dropdown-item
                                >
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
                <template v-else>
                    <el-button text
                        ><router-link class="link" :to="{ name: 'login' }"
                            >登录</router-link
                        ></el-button
                    >
                    <el-button text>
                        <router-link class="link" :to="{ name: 'signup' }"
                            >注册</router-link
                        >
                    </el-button>
                </template>
            </div>
        </div>
    </header>
</template>
<script>
import { useUserStore } from "../stores/user"

export default {
    data() {
        const userStore = useUserStore()
        return {
            userStore,
            posts: [],
        }
    },
    methods: {
        logout() {
            this.userStore.logout()
        },
    },
}
</script>

<style scoped>
.navigator {
    margin-bottom: 40px;
    background-color: white;
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
    color: #333;
}
.navigator .box .title {
    font-size: 20px;
    font-weight: bold;
}
</style>
