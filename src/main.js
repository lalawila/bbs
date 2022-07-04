import { createApp } from "vue"
import App from "./App.vue"

import router from "./router"
import pinia from "./pinia"

import http from "./plugins/http"
import api from "./plugins/api"
import common from "./plugins/common"

import ElementPlus from "element-plus"
import "element-plus/dist/index.css"

const app = createApp(App)

// 挂载 common
app.use(common)

// 挂载 pinia
app.use(pinia)

// 挂载 router
app.use(router)

// 绑定 element-plus
app.use(ElementPlus)

// 挂载 axios
app.use(http)

// 挂载 api
app.use(api)

app.mount("#app")
