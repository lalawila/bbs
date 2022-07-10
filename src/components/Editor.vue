<template>
    <div
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
    data() {
        const themeStore = useThemeStore()
        return { themeStore, editor: null }
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
                change: this.onchange,
            },
            hooks: {
                addImageBlobHook: async (file, callback) => {
                    const response = await this.$api.uploadImage(file)
                    callback(response.data.image_url, "image")
                },
            },
        })
    },
    methods: {
        onchange() {
            this.$emit("update:modelValue", this.editor.getMarkdown())
        },
    },
}
</script>
