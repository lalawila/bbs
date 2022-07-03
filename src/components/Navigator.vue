<template>
    <header class="navigator">
        <div class="box">
            <router-link class="title" :to="{ name: 'home' }"
                >三眼鸭</router-link
            >
            <div>
                <div v-if="userStore.isLogged">
                    {{ userStore.username }}
                </div>
                <template v-else
                    ><router-link class="link" :to="{ name: 'login' }"
                        >登录</router-link
                    >
                    <router-link class="link" :to="{ name: 'signup' }"
                        >注册</router-link
                    ></template
                >
            </div>
        </div>
    </header>
</template>
<script>
import { useUserStore } from "../stores/user"

export default {
    setup() {
        const userStore = useUserStore()
        return { userStore }
    },
    data() {
        return {
            posts: [],
        }
    },
}
</script>

<style scoped>
.navigator {
    margin-bottom: 40px;
    background-color: white;
}

.navigator .box {
    max-width: var(--width);
    height: 60px;
    margin: 0 auto;
    padding: 0 20px;

    display: flex;
    align-items: center;
    justify-content: space-between;
}
.navigator .box a {
    text-decoration: none;
    color: #333;
}
.navigator .box .title {
    font-size: 20px;
    font-weight: bold;
}

.navigator .link {
    padding: 5px 20px;
    border-radius: 4px;
}
.navigator .link:hover {
    background-color: #eee;
}
</style>
