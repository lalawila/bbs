<template>
    <div class="container">
        <div class="detail">
            <h2 class="title">{{ title }}</h2>
            <div class="info">
                <router-link
                    v-if="authorId"
                    :to="{ name: 'userDetail', params: { userId: authorId } }"
                    class="author"
                >
                    <Avatar :src="authorAvatarUrl"></Avatar>
                    <div class="name-bio">
                        <p class="name">{{ authorName }}</p>
                        <p>
                            {{ authorBio || "对方还没写介绍~" }}
                        </p>
                    </div>
                </router-link>
                <span class="time">{{
                    $common.beautifulTime(publishTime)
                }}</span>
            </div>
            <Viewer :content="content" />
            <div class="operations">
                <div class="item">
                    <span>阅读数：{{ visitAmount }}</span>
                </div>
                <div>
                    <el-button
                        v-if="isThumb"
                        type="primary"
                        @click="cancelThumbUp"
                        ><el-icon class="right10"><Pointer /></el-icon>已赞同
                        {{ thumbAmount }}</el-button
                    >
                    <el-button v-else type="primary" @click="thumbUp" plain
                        ><el-icon class="right10"><Pointer /></el-icon>赞同
                        {{ thumbAmount }}</el-button
                    >
                    <el-button type="primary" @click="showEditor" plain
                        ><el-icon class="right10"><ChatRound /></el-icon
                        >写讨论</el-button
                    >
                </div>
            </div>
        </div>

        <div v-if="editorVisible">
            <Editor v-model="discussion" />
            <div class="buttons">
                <el-button @click="editorVisible = false">取消</el-button>
                <el-button type="primary" @click="publishDiscussion"
                    >发布</el-button
                >
            </div>
        </div>
        <div v-for="discussion in discussions" class="discussion">
            <div class="info">
                <router-link
                    :to="{
                        name: 'userDetail',
                        params: { userId: discussion.author_id },
                    }"
                    class="author"
                >
                    <Avatar :src="discussion.author_avatar_url"></Avatar>
                    <div class="name-bio">
                        <p class="name">{{ discussion.author_name }}</p>
                        <p>
                            {{ discussion.author_bio || "对方还没写介绍~" }}
                        </p>
                    </div>
                </router-link>
                <span class="time">{{
                    $common.beautifulTime(discussion.publish_time)
                }}</span>
            </div>
            <Viewer :content="discussion.content" />
        </div>
        <el-empty v-if="disscussionAmount == 0" description="还没有讨论哦~" />
        <p v-else-if="isNomore" class="nomore">没有更多了</p>
        <el-backtop :right="40" :bottom="40" />
    </div>
</template>
<script>
import { useUserStore } from "../stores/user"
import { ElMessage } from "element-plus"
import { ElNotification } from "element-plus"

import { Pointer, ChatRound } from "@element-plus/icons-vue"

import Viewer from "../components/Viewer.vue"
import Editor from "../components/Editor.vue"
import Avatar from "../components/Avatar.vue"

export default {
    components: { Viewer, Avatar, Editor, Pointer, ChatRound },
    data() {
        const userStore = useUserStore()
        return {
            userStore,
            getting: false,
            page: 1,
            limit: 10,
            title: "", // 标题
            content: "", // 内容
            authorId: null, // 作者 id
            authorName: "", // 作者名
            authorBio: "", // 个性签名
            authorAvatarUrl: "", // 作者头像地址
            publishTime: null, // 发布时间
            isThumb: false, // 是否点赞
            thumbAmount: null, // 点赞数
            visitAmount: null, // 阅读数
            editorVisible: false, // 讨论发布框
            discussion: "", // 待发布的讨论内容
            discussions: [], // 讨论列表
            disscussionAmount: null, // 讨论的数量
        }
    },
    mounted() {
        this.getDetail()
        this.getDiscussions()

        // 下拉加载：1. 绑定滚动事件
        window.addEventListener("scroll", this.onScroll)
    },
    unmounted() {
        // 离开(卸载)页面的时候
        console.log("离开(卸载)页面的时候")
        window.removeEventListener("scroll", this.onScroll)
    },
    computed: {
        isNomore() {
            return this.discussions.length == this.disscussionAmount
        },
    },
    methods: {
        async onScroll() {
            // 下拉加载：2. 判断滚动条接近底部，100 个像素以内

            // 滚动距离页面底部的距离
            let bottomOfWindowLen =
                document.documentElement.offsetHeight -
                (document.documentElement.scrollTop +
                    document.documentElement.clientHeight)

            if (bottomOfWindowLen < 100) {
                // 存在正在获取的讨论数据，结束
                if (this.getting) return

                // 如果没有更多讨论数据，结束
                if (this.isNomore) return

                this.getting = true
                this.page += 1
                await this.getDiscussions()
                this.getting = false
            }

            // scrollTop：滚动上去的距离
            // clientHeight：元素可见区域的高度
            // offsetHeight：整个元素的高度
            // console.log("scrollTop:", document.documentElement.scrollTop)
            // console.log("clientHeight:", document.documentElement.clientHeight)
            // console.log("offsetHeight:", document.documentElement.offsetHeight)
        },
        async getDetail() {
            const response = await this.$api.getPostDetail(
                this.$route.params.postId
            )

            this.title = response.data.title
            this.content = response.data.content
            this.authorId = response.data.author_id
            this.authorName = response.data.author_name
            this.authorAvatarUrl = response.data.author_avatar_url
            this.authorBio = response.data.author_bio

            this.publishTime = response.data.publish_time
            this.isThumb = response.data.is_thumb
            this.thumbAmount = response.data.thumb_amount
            this.visitAmount = response.data.visit_amount

            // 页面标题
            document.title = this.title
        },
        async getDiscussions() {
            // 刷新讨论
            const response = await this.$api.getDisscussions(
                this.$route.params.postId,
                {
                    page: this.page,
                    limit: this.limit,
                }
            )

            this.disscussionAmount = response.data.amount
            this.discussions = this.discussions.concat(response.data.results)
        },
        async publishDiscussion() {
            // 发布讨论

            const response = await this.$api.createDisscussions(
                this.$route.params.postId,
                this.discussion
            )
            // 清空输入
            this.discussion = ""
            // 隐藏发布框
            this.editorVisible = false
            ElNotification({
                message: "讨论发布成功~",
                type: "success",
            })

            // 刷新数据
            this.discussions = []
            this.page = 1
            this.getDiscussions()
        },
        showEditor() {
            if (!this.userStore.isLogged) {
                ElMessage.info("请先登录。")
                return
            }
            this.editorVisible = !this.editorVisible
        },
        async thumbUp() {
            if (!this.userStore.isLogged) {
                ElMessage.info("请先登录。")
                return
            }
            // 点赞
            const response = await this.$api.thumbUp(this.$route.params.postId)
            console.log(response.data)
            this.thumbAmount = response.data.thumb_amount
            this.isThumb = true
        },
        async cancelThumbUp() {
            if (!this.userStore.isLogged) {
                ElMessage.info("请先登录。")
                return
            }
            // 取消点赞
            const response = await this.$api.cancelThumbUp(
                this.$route.params.postId
            )
            this.thumbAmount = response.data.thumb_amount
            this.isThumb = false
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

.detail {
    padding: 20px;
    background-color: var(--bg-color);

    border-radius: 8px;

    margin: 20px 0;
}

.info {
    display: flex;
    justify-content: space-between;
}

.time {
    color: #aaa;
    font-size: 14px;
}

.title {
    margin: 0;
    margin-bottom: 20px;
}

.operations {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.operations .item {
    font-size: 14px;
    color: #999;
}

.buttons {
    display: flex;
    justify-content: flex-end;
    margin: 20px 0;
}

.discussion {
    padding: 20px;
    background-color: var(--bg-color);

    border-radius: 8px;

    margin: 20px 0;
}
.nomore {
    text-align: center;
    font-size: 14px;
}

.author {
    display: flex;
    align-items: center;
    gap: 5px;

    font-size: 14px;

    color: inherit;
    text-decoration: none;
}
.author p {
    margin: 0;
}
.author .name {
    font-weight: bold;
    margin-bottom: 4px;
}
</style>
