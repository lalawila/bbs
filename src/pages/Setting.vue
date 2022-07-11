<template>
    <div class="container">
        <div class="box">
            <img
                class="avatar"
                :src="avatarUrl || '/default.jpg'"
                @click="selectImg"
            />
            <p class="prompt">上传头像</p>
        </div>
        <el-input
            id="bio"
            size="large"
            placeholder="请输入你的个性签名~"
            v-model="bio"
        >
            <template #prepend>
                <label for="bio">个性签名</label>
            </template>
        </el-input>
        <template v-if="isSetPwd">
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
            <el-input
                id="passwrod-again"
                size="large"
                placeholder="请重复输入密码"
                v-model="passwordAgain"
                show-password
            >
                <template #prepend>
                    <label for="passwrod-again">重复密码</label>
                </template>
            </el-input></template
        >
        <div>
            <el-button type="text" @click="isSetPwd = !isSetPwd">{{
                isSetPwd ? "取消密码" : "设置密码"
            }}</el-button>
            <el-button @click="update">确认</el-button>
        </div>
    </div>
</template>
<script>
import { useUserStore } from "../stores/user"
import { ElMessage, ElNotification } from "element-plus"

export default {
    data() {
        const userStore = useUserStore()
        return {
            userStore,
            avatarImg: null,
            avatarUrl: "",
            bio: null,
            isSetPwd: false,
            password: null,
            passwordAgain: null,
        }
    },
    mounted() {
        this.getSelfUser()
    },
    methods: {
        async getSelfUser() {
            const response = await this.$api.getSelfUser()

            this.avatarUrl = response.data.avatar_url
            this.bio = response.data.bio
        },
        selectImg() {
            const selector = document.createElement("input")
            selector.type = "file"
            selector.accept = "image/*"
            selector.onchange = (event) => {
                if (event.target.files.length > 0) {
                    this.avatarImg = event.target.files[0]
                    // 转成可预览的 URL
                    this.avatarUrl = URL.createObjectURL(this.avatarImg)
                }
            }
            selector.click()
        },
        async update() {
            const data = { avatar: this.avatarImg, bio: this.bio }
            if (this.isSetPwd) {
                if (this.password != this.passwordAgain) {
                    ElMessage.error("前后密码不一致。")
                    return
                }

                data.password = this.password
            }

            const response = await this.$api.updateSelf(data)

            ElNotification({
                message: "修改成功~",
                type: "success",
            })

            if (this.isSetPwd) {
                this.userStore.logout()
                this.$router.push({ name: "login" })
            }
        },
    },
}
</script>
<style scoped>
.container {
    max-width: 400px;
    margin: 0 auto;
    padding-bottom: 50px;

    border-radius: 8px;
    background-color: var(--bg-color);

    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 20px;

    padding: 20px;
}

.avatar {
    width: 100px;
    height: 100px;

    object-fit: cover;

    border-radius: 50%;

    cursor: pointer;

    display: block;
}
.avatar:hover {
    filter: brightness(80%);
}

.prompt {
    display: none;
    cursor: pointer;

    z-index: 999;
    font-size: 14px;
    color: white;
    font-weight: bold;

    position: absolute;

    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;

    width: max-content;
    height: max-content;
}
.box {
    position: relative;
}

.avatar:hover + .prompt {
    display: block;
}

label {
    width: 50px;
    text-align: center;
}
</style>
