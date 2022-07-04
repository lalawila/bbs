<template>
    <div class="signup">
        <h1>注册</h1>
        <el-input size="large" placeholder="请输入用户名" v-model="username">
            <template #prepend>
                <div>用户名</div>
            </template>
        </el-input>
        <el-input size="large" placeholder="请输入密码" v-model="password">
            <template #prepend>
                <div>密码</div>
            </template>
        </el-input>
        <el-input
            size="large"
            placeholder="请重复输入密码"
            v-model="passwordAgin"
        >
            <template #prepend>
                <div>重复密码</div>
            </template>
        </el-input>
        <el-button class="btn" type="primary" size="large" round @click="signup"
            >注册</el-button
        >
    </div>
</template>
<script>
import { ElMessage } from "element-plus"
export default {
    data() {
        return {
            username: "",
            password: "",
            passwordAgin: "",
        }
    },
    methods: {
        async signup() {
            if (this.password != this.passwordAgin) {
                ElMessage.error("前后密码不一致。")
                return
            }

            try {
                const response = await this.$api.signup(
                    this.username,
                    this.password
                )

                if (response.status == 200) {
                    const userResponse = await this.$api.getSelfUser()
                }
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
.signup {
    width: 360px;
    padding: 20px;
    border-radius: 8px;

    margin: 0 auto;

    background-color: white;

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
