<template>
    <div class="container">
        <div class="detail">
            <h2 class="title">{{ title }}</h2>
            <Viewer :content="content" />
        </div>
        <div class="operations">
            <el-button type="primary" @click="showEditor">写讨论</el-button>
        </div>
        <div v-if="editorVisible">
            <Editor v-model="discussion" />
            <div class="operations">
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

import Viewer from "../components/Viewer.vue"
import Editor from "../components/Editor.vue"

export default {
    components: { Viewer, Editor },
    data() {
        const userStore = useUserStore()
        return {
            userStore,
            title: "",
            content: "",
            discussions: [], // 讨论列表
            disscussionAmount: null,
            editorVisible: false,
            discussion: "",
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
            this.editorVisible = true
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
    margin: 20px 0;

    display: flex;
    justify-content: flex-end;
}

.discussion {
    padding: 20px;
    background-color: white;

    border-radius: 8px;

    margin: 20px 0;
}
</style>
