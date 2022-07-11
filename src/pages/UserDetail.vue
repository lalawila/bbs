<template>
    <div class="container">
        <div>{{ $route.params.userId }}</div>
    </div>
</template>
<script>
export default {}
</script>
<style scoped>
.container {
    max-width: var(--width);
    margin: 0 auto;
    padding-bottom: 50px;

    background-color: var(--bg-color);
}
</style>
