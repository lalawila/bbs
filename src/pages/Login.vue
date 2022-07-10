<template>
    <div class="login">
        <h1>登录</h1>
        <el-input
            id="username"
            size="large"
            placeholder="请输入用户名"
            v-model="username"
        >
            <template #prepend>
                <label for="username">用户名</label>
            </template>
        </el-input>
        <el-input
            id="password"
            size="large"
            placeholder="请输入密码"
            v-model="password"
            show-password
        >
            <template #prepend>
                <label for="password">密码</label>
            </template>
        </el-input>
        <el-button class="btn" type="primary" size="large" round @click="login"
            >登录</el-button
        >
    </div>
</template>
<script>
import { ElMessage } from "element-plus"
import { useUserStore } from "../stores/user.js"

export default {
    data() {
        const userStore = useUserStore()
        return {
            userStore,
            username: "",
            password: "",
        }
    },
    methods: {
        async login() {
            try {
                const response = await this.$api.login(
                    this.username,
                    this.password
                )
                this.userStore.setToken(response.data.token)
                this.$router.push({
                    path: this.$route.query.redirect,
                })
            } catch (error) {
                if (error.response.data.code === 2000) {
                    ElMessage.error("用户名或密码错误。")
                }
            }
        },
    },
}
</script>
<style scoped>
.login {
    width: 360px;
    padding: 20px;
    border-radius: 8px;

    margin: 0 auto;

    background-color: var(--bg-color);

    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 20px;
}
h1 {
    margin: 0;
}

label {
    width: 50px;
    text-align: center;
}
.btn {
    width: 100%;
}
</style>
