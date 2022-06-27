<template>
    <div class="container">
        <div class="post">
            <h2>标题标题</h2>
            <p>
                内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
            </p>
        </div>
    </div>
</template>
<script>
import { mapWritableState } from "pinia"
import { useUserStore } from "../stores/user"

export default {
    data() {
        return {
            posts: [],
        }
    },
    computed: {
        ...mapWritableState(useUserStore, ["username"]),
    },
    async mounted() {
        const response = await this.$api.getPosts()
        this.posts = response.data.results
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
}
</style>
