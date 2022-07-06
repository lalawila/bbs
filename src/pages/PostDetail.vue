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
        <p v-else-if="isNomore" class="nomore">没有更多了</p>
        <el-backtop :right="40" :bottom="40" />
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
            page: 1,
            limit: 10,
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
            getting: false,
        }
    },
    mounted() {
        this.refresh()
        this.refreshDiscussions()

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
            let bottomOfWindow =
                document.documentElement.scrollTop +
                    document.documentElement.clientHeight >
                document.documentElement.offsetHeight - 100
            // scrollTop：滚动上去的距离
            // clientHeight：元素可见区域的高度
            // offsetHeight：整个元素的高度

            // console.log("scrollTop:", document.documentElement.scrollTop)
            // console.log("innerHeight:", window.innerHeight)
            // console.log("offsetHeight:", document.documentElement.offsetHeight)
            if (bottomOfWindow) {
                // 如果没有更多数据，退出获取
                if (this.isNomore) return

                if (this.getting) return

                this.getting = true
                this.page += 1
                await this.refreshDiscussions()
                this.getting = false
            }
        },
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
    background-color: var(--back-color);

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
    background-color: var(--back-color);

    border-radius: 8px;

    margin: 20px 0;
}
.nomore {
    text-align: center;
    font-size: 14px;
}
</style>
