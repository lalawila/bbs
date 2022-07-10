<template>
    <div
        class="editor"
        ref="editor"
        :class="{ 'toastui-editor-dark': themeStore.isDark }"
    ></div>
</template>
<script>
import Editor from "@toast-ui/editor"
import "@toast-ui/editor/dist/toastui-editor.css"
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css"

import { useThemeStore } from "../stores/theme"

export default {
    props: ["modelValue"],
    step() {
        // 防止 editor 转换成 proxy 对象后的 bug
        return {
            editor: null,
        }
    },
    data() {
        const themeStore = useThemeStore()
        return { themeStore }
    },
    async mounted() {
        this.editor = new Editor({
            el: this.$refs.editor,
            placeholder: "请输入你要发表的内容~",
            initialValue: this.modelValue,
            height: "500px",
            initialEditType: "wysiwyg",
            previewStyle: "tab",
            // theme: this.themeStore.isDark ? "dark" : "light",
            events: {
                change: () => {
                    this.content = this.editor.getMarkdown()
                    this.$emit("update:modelValue", this.content)
                },
            },
            hooks: {
                addImageBlobHook: async (file, callback) => {
                    const response = await this.$api.uploadImage(file)
                    callback(response.data.image_url, "image")
                },
            },
        })
    },
    watch: {
        modelValue(value) {
            if (value != this.content) {
                // 设置编辑器的值
                this.editor.setMarkdown(value)
            }
        },
    },
}
</script>
<style scoped>
.editor {
    margin: 20px 0;
}
</style>
