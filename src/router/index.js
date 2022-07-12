import * as VueRouter from "vue-router"

import Home from "../pages/Home.vue"
import Login from "../pages/Login.vue"
import Signup from "../pages/Signup.vue"
import PostDetail from "../pages/PostDetail.vue"
import UserDetail from "../pages/UserDetail.vue"
import Setting from "../pages/Setting.vue"

const routes = [
    {
        name: "home", // 页面名
        path: "/", // 映射的路径
        component: Home, // 虽配置名为 component 组件，但我更愿意理解为 page 页面
        meta: { title: "首页" },
    },
    {
        name: "login",
        path: "/login",
        component: Login,
        meta: { title: "登录" },
    },
    {
        name: "signup",
        path: "/signup",
        component: Signup,
        meta: { title: "注册" },
    },
    {
        name: "postDetail",
        path: "/post/:postId",
        component: PostDetail,
        meta: { title: "帖子详情" },
    },
    {
        name: "userDetail",
        path: "/user/:userId",
        component: UserDetail,
        meta: { title: "用户详情" },
    },
    {
        name: "setting",
        path: "/setting",
        component: Setting,
        meta: { title: "设置" },
    },
]

const router = VueRouter.createRouter({
    // 使用 HTML5 的历史记录模式
    history: VueRouter.createWebHistory(),
    routes,
})

router.beforeEach((to, from) => {
    console.log(to.meta)
    document.title = to.meta.title || "三眼鸭的吹牛社区"
})
export default router
