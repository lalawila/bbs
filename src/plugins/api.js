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

        function getPostDetail(postId) {
            // GET
            // 获取帖子详情

            return http.get(`/posts/${postId}`)
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

        function getDisscussions(postId) {
            // 获取帖子的讨论
            return http.get(`/posts/${postId}/discussions`)
        }

        function createDisscussions(postId, content) {
            // 发布帖子的讨论
            return http.post(`/posts/${postId}/discussions`, {
                content,
            })
        }

        // 将 api 绑定到全局属性中
        app.config.globalProperties.$api = {
            getPosts,
            createPost,
            login,
            signup,
            getSelfUser,
            getPostDetail,
            getDisscussions,
            createDisscussions,
        }
    },
}
