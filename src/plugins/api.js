export default {
    install: (app) => {
        // plugins/http.js 文件中创建的 axios 对象
        const http = app.config.globalProperties.$http

        function getPosts({ page = 1, limit = 10 } = {}) {
            // GET
            // 获取帖子列表

            return http.get("/posts", {
                params: {
                    page,
                    limit,
                },
            })
        }

        function createPost(title, content) {
            // POST
            // 发布帖子

            return http.post("/posts", {
                title,
                content,
            })
        }

        function login(username, password) {
            // 登录
            return http.post("/tokens", {
                username,
                password,
            })
        }

        function signup(username, password) {
            // 注册
            return http.post("/users", {
                username,
                password,
            })
        }

        function getSelfUser() {
            // 用户自身信息
            return http.get("/self/user")
        }

        // 将 api 绑定到全局属性中
        app.config.globalProperties.$api = {
            getPosts,
            createPost,
            login,
            signup,
            getSelfUser,
        }
    },
}
