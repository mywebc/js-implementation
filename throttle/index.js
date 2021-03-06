/**
 * @description throttle节流 每隔一段时间只会执行一次， 稀释函数执行频率 比如抢红包
 * @returns callback
 */

const throttle = (fn, delay) => {
    let flag = true
    return function () {
        if (!flag) return
        flag = false
        setTimeout(() => {
            fn.apply(this, arguments)
            flag = true
        }, delay)
    }
}