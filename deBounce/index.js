/**
 * @description deBounce防抖 触发高频时间后n秒内函数只会执行一次,如果n秒内高频时间再次触发,则重新计算时间, 比如搜索框
 * @returns callback
 */

const deBounce = (fn, deplay) => {
    // 每次进来都会清除上一次计时器
    let timeout = null
    return function () {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            // 返回的是函数， 这里带上arguments
            fn.apply(this, arguments);
        }, deplay)
    }
}