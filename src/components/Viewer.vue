<template>
    <div
        class="viewer"
        ref="viewer"
        :class="{ 'toastui-editor-dark': themeStore.isDark }"
    ></div>
</template>
<script>
import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer"
import "@toast-ui/editor/dist/toastui-editor-viewer.css"
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css"

import { useThemeStore } from "../stores/theme"

export default {
    props: ["content"],
    data() {
        const themeStore = useThemeStore()
        return {
            themeStore,
            viewer: null,
        }
    },
    async mounted() {
        this.viewer = new Viewer({
            el: this.$refs.viewer,
            initialValue: this.content,
            // theme: this.themeStore.isDark ? "dark" : "light",
        })
    },
    watch: {
        content(value) {
            this.viewer.setMarkdown(value)
        },
    },
}
</script>
<style scoped>
.viewer {
    margin: 20px 0;
}
</style>
