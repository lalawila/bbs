// 公共方法

const MINUTE = 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24

function fillZero(n) {
    // 补 0 为两位
    if (n < 10) {
        return "0" + n
    }
    return n
}

function formatTimeStamp(timestamp) {
    const date = new Date(timestamp * 1000)
    const Y = date.getFullYear()
    const M = fillZero(date.getMonth() + 1)
    const D = fillZero(date.getDate() + 1)

    const h = fillZero(date.getHours())
    const m = fillZero(date.getMinutes())
    const s = fillZero(date.getSeconds())
    return Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s
}

function beautifulTime(timestamp) {
    const gap = new Date().valueOf() / 1000 - timestamp

    if (gap < MINUTE * 5) return "刚刚" // 如果 5 分钟内发布显示刚刚
    if (gap < HOUR) return Math.floor(gap / MINUTE) + "分钟前" // 如果 1 小时内发布显示 n 分钟前
    if (gap < DAY) return Math.floor(gap / HOUR) + "小时前" // 如果 1 天内发布显示 n 小时前

    return formatTimeStamp(timestamp)
}

export default {
    install: (app) => {
        app.config.globalProperties.$common = {
            formatTimeStamp,
            beautifulTime,
        }
    },
}
