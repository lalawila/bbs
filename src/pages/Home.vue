<template>
    <div class="container">
        <router-link
            :to="{ name: 'postDetail', params: { postId: post.post_id } }"
            class="post"
            v-for="post in posts"
        >
            <h4 class="title">{{ post.title }}</h4>
            <div class="box">
                <div class="content">
                    <div class="info">
                        <div class="author">
                            <Avatar :src="post.author_avatar_url"></Avatar>
                            <div class="name-bio">
                                <p class="name">{{ post.author_name }}</p>
                                <p>
                                    {{ post.author_bio || "对方还没写介绍~" }}
                                </p>
                            </div>
                        </div>
                        <span class="time">{{
                            $common.beautifulTime(post.publish_time)
                        }}</span>
                    </div>
                    <div class="grow">
                        <p class="excerpt">{{ post.excerpt }}...</p>
                    </div>
                    <div class="bottom">
                        <div class="item" title="阅读数">
                            <el-icon><View /></el-icon>
                            <span>{{ post.visit_amount }}</span>
                        </div>
                        <div class="item" title="点赞数">
                            <el-icon><Pointer /></el-icon
                            ><span>{{ post.thumb_amount }}</span>
                        </div>
                        <div class="item" title="讨论数">
                            <el-icon><ChatRound /></el-icon
                            ><span>{{ post.discussion_amount }}</span>
                        </div>
                    </div>
                </div>
                <img
                    v-if="post.thumbnail_url"
                    class="thumbnail"
                    :src="post.thumbnail_url"
                    alt="thumbnail"
                />
            </div>
        </router-link>
        <el-pagination
            class="pagination"
            v-model="page"
            background
            layout="prev, pager, next"
            :total="amount"
            :page-size="limit"
            :current-page="page"
            @current-change="pageChange"
        />
    </div>
    <el-dialog v-model="dialogVisible" title="发布框" width="600px">
        <el-input
            class="bottom20"
            size="large"
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
import { ElMessage, ElNotification } from "element-plus"
import { ChatRound, Pointer, View } from "@element-plus/icons-vue"

import Editor from "../components/Editor.vue"
// import Avatar from "../components/Avatar.vue"

export default {
    components: { Editor, ChatRound, Pointer, View },
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
            amount: 0,
        }
    },
    mounted() {
        this.getPosts()
    },
    methods: {
        async getPosts() {
            const response = await this.$api.getPosts({
                page: this.page,
                limit: this.limit,
            })
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
            this.getPosts()
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
    padding-bottom: 50px;
}
.post {
    border-radius: 8px;
    background-color: var(--bg-color);
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

.box {
    display: flex;
    gap: 20px;
}

.content {
    flex: 1;

    display: flex;
    flex-direction: column;
}

.thumbnail {
    width: 220px;
    height: 140px;

    object-fit: cover;
    border-radius: 8px;
}

.info {
    display: flex;
    justify-content: space-between;
}

.time {
    color: #aaa;
    font-size: 14px;
}

.grow {
    flex: 1;
}

.excerpt {
    flex: 1;

    /* 允许换行 */
    overflow-wrap: anywhere;

    /* 最多显示 2 行 */
    /* 超出显示省略号 */
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
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

.bottom {
    display: flex;
    justify-content: flex-end;

    gap: 20px;

    color: #999;
    font-size: 14px;
}

.bottom .item {
    display: flex;
    align-items: center;

    gap: 5px;
}

.author {
    display: flex;
    align-items: center;
    gap: 5px;

    font-size: 14px;
}
.author p {
    margin: 0;
}
.author .name {
    font-weight: bold;
    margin-bottom: 4px;
}
</style>
