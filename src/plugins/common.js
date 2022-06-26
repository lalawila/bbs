// 公共方法

function fillZero(n) {
    if (n < 10) {
        return "0" + n
    }
    return n
}

function formatTimeStamp(time) {
    const date = new Date(time * 1000)
    const Y = date.getFullYear()
    const M = fillZero(date.getMonth() + 1)
    const D = fillZero(date.getDate() + 1)

    const h = fillZero(date.getHours())
    const m = fillZero(date.getMinutes())
    const s = fillZero(date.getSeconds())
    return Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s
}

export default {
    install: (app) => {
        app.config.globalProperties.$common = {
            formatTimeStamp,
        }
    },
}
