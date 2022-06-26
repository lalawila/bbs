<template>
    <Navigator />
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
</template>
<script>
import Navigator from "./components/Navigator.vue"
export default {
    components: { Navigator },
}
</script>
<style>
:root {
    box-sizing: border-box; /* 设置根元素的 box-sizing: border-box */
}
*,
*:before,
*:after {
    box-sizing: inherit; /* box-sizing 继承自父元素 */
}

html {
    background-color: #eee;

    --width: 680px;
}
body {
    margin: 0;
}
</style>
