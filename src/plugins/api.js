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

        function getDisscussions(postId, { page = 1, limit = 10 } = {}) {
            // 获取帖子的讨论
            return http.get(`/posts/${postId}/discussions`, {
                params: {
                    page,
                    limit,
                },
            })
        }

        function createDisscussions(postId, content) {
            // 发布帖子的讨论
            return http.post(`/posts/${postId}/discussions`, {
                content,
            })
        }

        function thumbUp(postId) {
            // 点赞
            return http.post(`/posts/${postId}/thumb`)
        }

        function cancelThumbUp(postId) {
            // 取消点赞
            return http.delete(`/posts/${postId}/thumb`)
        }

        function uploadImage(file) {
            // 上传图片
            const formData = new FormData()
            formData.append("image", file)

            return http.post("/images", formData, {
                "Content-Type": "multipart/form-data",
            })
        }

        function updateSelf({
            avatar = null,
            bio = null,
            password = null,
        } = {}) {
            // 用户设置
            const formData = new FormData()

            if (avatar) {
                formData.append("avatar", avatar)
            }

            if (bio != null) {
                formData.append("bio", bio)
            }

            if (password) {
                formData.append("password", password)
            }

            return http.put("/self/user", formData, {
                "Content-Type": "multipart/form-data",
            })
        }

        function getUserDetail(userId) {
            // 用户详情数据
            return http.get(`/users/${userId}`)
        }

        function getUserPosts(userId, { page = 1, limit = 10 } = {}) {
            // 用户详情数据
            return http.get(`/users/${userId}/posts`, {
                params: {
                    page,
                    limit,
                },
            })
        }

        function getHot() {
            // 热榜数据
            return http.get("hot")
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
            thumbUp,
            cancelThumbUp,
            uploadImage,
            updateSelf,
            getUserDetail,
            getUserPosts,
            getHot,
        }
    },
}
