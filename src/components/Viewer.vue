<template>
    <div ref="viewer"></div>
</template>
<script>
import Editor from "@toast-ui/editor"
import "@toast-ui/editor/dist/toastui-editor.css"

export default {
    props: ["content"],
    data() {
        return {
            viewer: null,
        }
    },
    async mounted() {
        this.viewer = new Editor({
            el: this.$refs.viewer,
            initialValue: this.content,
            viewer: true,
        })
    },
    watch: {
        // content(newValue) {
        //     this.viewer.setMarkdown(newValue)
        // },
    },
}
</script>
