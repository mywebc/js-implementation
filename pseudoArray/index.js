/**
 * 伪数组 -> 数组
 */

// 1. Array.from
const result = Array.from(arguments)

// 2. call 类似于 new Array(arguments)
const result = Array.prototype.slice.call(arguments)

// 3. 解构赋值
const result = [...arguments]

// 4. concat
const result = Array.prototype.concat.apply([], document.querySelectorAll('div'));