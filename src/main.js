import { createApp } from "vue"
import App from "./App.vue"

import router from "./router"

import http from "./plugins/http"
import api from "./plugins/api"

const app = createApp(App)

// 挂载 router
app.use(router)

// 挂载 axios
app.use(http)

// 挂载 api
app.use(api)

app.mount("#app")
