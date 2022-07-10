<template>
    <img
        class="avatar"
        :src="src || '/default.jpg'"
        alt="头像"
        :style="sizeStyle"
    />
</template>
<script>
export default {
    props: {
        src: {
            type: String,
        },
        size: {
            type: Number,
            default: 42,
        },
    },
    data() {
        return {
            sizeStyle: {
                width: `${this.size}px`,
                height: `${this.size}px`,
            },
        }
    },
}
</script>
<style scoped>
.avatar {
    border-radius: 50%;
}
</style>
