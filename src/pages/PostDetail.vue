<template>
    <div class="container">
        <h1>{{ title }}</h1>
        <Viewer :content="content" />
    </div>
</template>
<script>
import Viewer from "../components/Viewer.vue"

export default {
    components: { Viewer },
    data() {
        return {
            title: "",
            content: "",
        }
    },
    mounted() {
        this.refresh()
    },
    methods: {
        async refresh() {
            const response = await this.$api.getPostDetail(
                this.$route.params.postId
            )

            this.title = response.data.title
            this.content = response.data.content
        },
    },
}
</script>
<style scoped>
.container {
    max-width: var(--width);
    margin: 0 auto;
    margin-bottom: 50px;

    background-color: white;
}
</style>
