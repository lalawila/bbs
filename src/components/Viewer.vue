<template>
    <div ref="viewer"></div>
</template>
<script>
import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer"
import "@toast-ui/editor/dist/toastui-editor-viewer.css"

export default {
    props: ["content"],
    data() {
        return {
            viewer: null,
        }
    },
    async mounted() {
        this.viewer = new Viewer({
            el: this.$refs.viewer,
            initialValue: this.content,
        })
    },
    watch: {
        content(newValue) {
            this.viewer.setMarkdown(newValue)
        },
    },
}
</script>
