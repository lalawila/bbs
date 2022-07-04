<template>
    <div class="container">
        <router-link
            :to="{ name: 'postDetail', params: { postId: post.post_id } }"
            class="post"
            v-for="post in posts"
        >
            <h2 class="title">{{ post.title }}</h2>
            <div class="info">
                <span>{{ post.author_name }}</span>
                <span class="time">{{
                    $common.beautifulTime(post.publish_time)
                }}</span>
            </div>
            <p class="excerpt">{{ post.excerpt }}...</p>
        </router-link>
        <el-pagination
            class="pagination"
            background
            layout="prev, pager, next"
            :total="amount"
            :page-count="limit"
            :current-page="page"
            @current-change="pageChange"
        />
    </div>
    <el-dialog v-model="dialogVisible" title="发布框" width="600px">
        <el-input
            class="bottom20"
            v-model="title"
            placeholder="请输入标题~"
        ></el-input>
        <Editor v-model="content" />
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="publish">发布</el-button>
            </span>
        </template>
    </el-dialog>
    <div class="publish-btn" @click="showDialog">发布</div>
</template>
<script>
import { useUserStore } from "../stores/user"
import { ElMessage } from "element-plus"
import { ElNotification } from "element-plus"

import Editor from "../components/Editor.vue"

export default {
    components: { Editor },
    data() {
        const userStore = useUserStore()
        return {
            userStore,
            limit: 5,
            page: 1,
            posts: [],
            dialogVisible: false, // 发布对话框
            title: "", // 标题
            content: "", // 内容
            amount: null,
        }
    },
    mounted() {
        this.refresh()
    },
    methods: {
        async refresh() {
            const response = await this.$api.getPosts({
                page: this.page,
                limit: this.limit,
            })
            console.log(response.data)
            this.posts = response.data.results
            this.amount = response.data.amount
        },
        async publish() {
            const response = await this.$api.createPost(
                this.title,
                this.content
            )

            this.title = ""
            this.content = ""
            this.dialogVisible = false

            ElNotification({
                message: "帖子发布成功~",
                type: "success",
            })

            this.$router.push({
                name: "postDetail",
                params: {
                    postId: response.data.post_id,
                },
            })
        },
        pageChange(page) {
            this.page = page
            this.refresh()
        },
        showDialog() {
            if (!this.userStore.isLogged) {
                ElMessage.info("请先登录。")
                return
            }
            this.dialogVisible = true
        },
    },
}
</script>

<style scoped>
.container {
    max-width: var(--width);
    margin: 0 auto;
    margin-bottom: 50px;
}
.post {
    border-radius: 8px;
    background-color: #fff;
    padding: 20px;

    margin: 20px 0;

    display: block;
    color: inherit;
    text-decoration: none;
}
.title {
    margin: 0;
    margin-bottom: 10px;
}

.info {
    display: flex;
    justify-content: space-between;
}

.time {
    color: #aaa;
    font-size: 14px;
}

.excerpt {
    overflow-wrap: anywhere;
}
.publish-btn {
    width: 60px;
    height: 60px;
    border-radius: 50%;

    right: 30px;
    bottom: 30px;

    position: fixed;

    color: white;
    font-weight: bold;

    text-align: center;
    line-height: 60px;

    background-color: teal;

    cursor: pointer;
}
.pagination {
    width: max-content;
    margin: 0 auto;
}
</style>
