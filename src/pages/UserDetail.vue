<template>
    <div class="container">
        <div class="info">
            <Avatar :src="avatarUrl" :size="128"></Avatar>
            <div class="right">
                <div class="username">{{ username }}</div>
                <div>
                    <label>个性签名：</label>{{ bio || "还没有个性签名哦~" }}
                </div>
                <div>
                    <label>注册时间：</label
                    >{{ $common.formatTimeStamp(registrationTime) }}
                </div>
                <div>
                    共发了 {{ postAmount }} 个帖子，共获得了
                    {{ thumbAmount }} 个赞同。
                </div>
            </div>
        </div>
        <div v-if="postAmount" class="posts">
            <router-link
                :to="{ name: 'postDetail', params: { postId: post.post_id } }"
                class="post"
                v-for="post in posts"
            >
                <h4 class="title">{{ post.title }}</h4>
                <div class="bottom">
                    <div>{{ $common.formatTimeStamp(post.publish_time) }}</div>
                    <div class="amount">
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
            </router-link>
        </div>
        <el-empty v-else description="对方还没发布任何帖子~" />
        <el-pagination
            class="pagination"
            v-model="page"
            background
            layout="prev, pager, next"
            :total="postAmount"
            :page-size="limit"
            :current-page="page"
            @current-change="pageChange"
        />
    </div>
</template>
<script>
import { ChatRound, Pointer, View } from "@element-plus/icons-vue"

export default {
    components: { ChatRound, Pointer, View },
    data() {
        return {
            page: 1,
            limit: 5,
            avatarUrl: "", // 头像地址
            username: "", // 用户名
            bio: "", // 个性签名
            registrationTime: 0, // 注册时间
            thumbAmount: 0, // 所获点赞数
            postAmount: 0, // 所发帖子数
            posts: [], // 发帖记录
        }
    },
    mounted() {
        this.getUserDetail()
        this.getUserPosts()
    },
    methods: {
        async getUserDetail() {
            const response = await this.$api.getUserDetail(
                this.$route.params.userId
            )
            this.username = response.data.username
            this.avatarUrl = response.data.avatar_url
            this.bio = response.data.bio
            this.thumbAmount = response.data.thumb_amount
            this.postAmount = response.data.post_amount
            this.registrationTime = response.data.registration_time
        },
        async getUserPosts() {
            const response = await this.$api.getUserPosts(
                this.$route.params.userId,
                {
                    page: this.page,
                    limit: this.limit,
                }
            )
            this.posts = response.data.results
        },
        pageChange(page) {
            this.page = page
            this.getUserPosts()
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

.info {
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 20px;
    border-radius: 8px;
    background-color: var(--bg-color);

    gap: 20px;

    margin-bottom: 40px;
}
.username {
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 10px;
}
.right {
    display: flex;
    flex-direction: column;

    font-size: 14px;

    gap: 5px;
}

label {
    font-weight: bold;
}

.posts {
    padding: 0 20px;
    margin-bottom: 20px;
    border-radius: 8px;
    background-color: var(--bg-color);
}

.post {
    padding: 20px 0;

    display: block;
    color: inherit;
    text-decoration: none;
}
.post:not(:last-child) {
    /* rgba */
    border-bottom: 1px solid #9994;
}
.title {
    margin: 0;
    margin-bottom: 20px;
}
.bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;

    font-size: 14px;
    color: #999;
}

.amount {
    display: flex;
    align-items: center;

    gap: 20px;
}

.bottom .item {
    display: flex;
    align-items: center;

    gap: 5px;
}

.pagination {
    width: max-content;
    margin: 0 auto;
}
</style>
