<template>
    <div ref="editor"></div>
</template>
<script>
import Editor from "@toast-ui/editor"
import "@toast-ui/editor/dist/toastui-editor.css"

export default {
    props: ["modelValue"],
    data() {
        return { editor: null }
    },
    async mounted() {
        this.editor = new Editor({
            el: this.$refs.editor,
            placeholder: "请输入你要发表的内容~",
            initialValue: this.modelValue,
            height: "500px",
            initialEditType: "wysiwyg",
            previewStyle: "tab",
            events: {
                change: this.onchange,
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
