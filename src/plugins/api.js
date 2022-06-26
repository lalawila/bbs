export default {
    install: (app) => {
        console.log(app)

        const http = app.config.globalProperties.$http
        const BASE_URL = "https://3yya.com/u/d8cf630cf5f367cc/rest/app"

        function getPosts() {
            // GET
            // 获取帖子列表

            return http.get(BASE_URL + "/posts")
        }
        function createPost(content) {
            // POST
            // 发布帖子

            let data = {
                content: content,
            }
            return fetch(BASE_URL + "/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // 表明内容是 JSON 格式
                },
                body: JSON.stringify(data), // 序列化对象
            })
        }

        function deletePost(postId) {
            // DELETE
            // 删除帖子

            return fetch(BASE_URL + "/posts/" + postId, {
                method: "DELETE",
            })
        }
        function updatePost(postId, content) {
            // PUT
            // 更新帖子
            let data = {
                content: content,
            }

            return fetch(BASE_URL + "/posts/" + postId, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json", // 表明内容是 JSON 格式
                },
                body: JSON.stringify(data), // 序列化对象
            })
        }

        // 将 api 绑定到全局属性中
        app.config.globalProperties.$api = {
            getPosts,
            createPost,
            deletePost,
            updatePost,
        }
    },
}
