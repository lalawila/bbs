<template>
    <div class="container">
        <router-link
            :to="{ name: 'postDetail', params: { postId: post.post_id } }"
            class="post"
            v-for="post in posts"
        >
            <h2>{{ post.title }}</h2>
            <div>
                <span>{{ post.author_name }}</span>
            </div>
            <p>
                {{ post.excerpt }}
            </p>
        </router-link>
    </div>
    <el-dialog
        v-model="dialogVisible"
        title="发布框"
        width="600px"
        :before-close="handleClose"
    >
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
    <div class="publish-btn" @click="dialogVisible = !dialogVisible">发布</div>
</template>
<script>
import Editor from "../components/Editor.vue"

export default {
    components: { Editor },
    data() {
        return {
            posts: [],
            dialogVisible: false, // 发布对话框
            title: "", // 标题
            content: "", // 内容
        }
    },
    async mounted() {
        const response = await this.$api.getPosts()
        this.posts = response.data.results
    },
    methods: {
        publish() {
            this.$api.createPost(this.title, this.content)
            this.title = ""
            this.content = ""
            this.dialogVisible = false
        },
    },
}
</script>

<style scoped>
.container {
    max-width: var(--width);
    margin: 0 auto;
}
.container .post {
    border-radius: 20px;
    background-color: #fff;
    padding: 20px;

    margin: 20px 0;

    display: block;
    color: inherit;
    text-decoration: none;
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
</style>
