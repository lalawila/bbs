<template>
    <div class="container">
        <div class="detail">
            <h2 class="title">{{ title }}</h2>
            <div class="info">
                <span>{{ authorName }}</span>
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
                <span class="author-name">{{ discussion.author_name }}</span>
                <span class="time">{{
                    $common.beautifulTime(discussion.publish_time)
                }}</span>
            </div>
            <Viewer :content="discussion.content" />
        </div>
        <el-empty v-if="disscussionAmount == 0" description="还没有讨论哦~" />
    </div>
</template>
<script>
import { useUserStore } from "../stores/user"
import { ElMessage } from "element-plus"
import { ElNotification } from "element-plus"

import { Pointer } from "@element-plus/icons-vue"

import Viewer from "../components/Viewer.vue"
import Editor from "../components/Editor.vue"

export default {
    components: { Viewer, Editor, Pointer },
    data() {
        const userStore = useUserStore()
        return {
            userStore,
            title: "",
            content: "",
            authorName: "",
            publishTime: null,
            discussions: [], // 讨论列表
            disscussionAmount: null,
            editorVisible: false,
            discussion: "",
            isThumb: false,
            thumbAmount: null,
            visitAmount: null,
        }
    },
    mounted() {
        this.refresh()
        this.refreshDiscussions()
    },
    methods: {
        async refresh() {
            const response = await this.$api.getPostDetail(
                this.$route.params.postId
            )

            this.title = response.data.title
            this.content = response.data.content
            this.authorName = response.data.author_name
            this.publishTime = response.data.publish_time
            this.isThumb = response.data.is_thumb
            this.thumbAmount = response.data.thumb_amount
            this.visitAmount = response.data.visit_amount
        },
        async refreshDiscussions() {
            // 刷新讨论
            const response = await this.$api.getDisscussions(
                this.$route.params.postId
            )

            this.disscussionAmount = response.data.amount
            this.discussions = response.data.results
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
            this.refreshDiscussions()
        },
        showEditor() {
            if (!this.userStore.isLogged) {
                ElMessage.info("请先登录。")
                return
            }
            this.editorVisible = !this.editorVisible
        },
        async thumbUp() {
            // 点赞
            const response = await this.$api.thumbUp(this.$route.params.postId)
            console.log(response.data)
            this.thumbAmount = response.data.thumb_amount
            this.isThumb = true
        },
        async cancelThumbUp() {
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
    margin-bottom: 50px;
}

.detail {
    padding: 20px;
    background-color: white;

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
    background-color: white;

    border-radius: 8px;

    margin: 20px 0;
}
</style>
