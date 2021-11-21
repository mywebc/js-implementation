/**
 * 数组去重
 */

const arr = [1, 1, 1, 2, 3, 3, 4, 5]

// 1. set
const result = Array.from(new Set(arr))

// 2. 利用indexOf， include, 开辟新空间循环查找O(n)
const deDuplication = (arr) => {
    let result = []
    for (let i = 0; i < arr.length; i++) {
        if (result.indexOf(arr[i]) === -1) {
            result.push(arr[i])
        }
    }
    return result
}

// 3. filter, 过滤掉值跟索引不对应的
const deDuplication1 = (arr) => {
    return arr.filter((_, i) => arr.indexOf(_) === i)
}

// 4. map
const deDuplication2 = (arr) => {
    const map = new Map()
    const result = []
    for (let i = 0; i < arr.length; i++) {
        if (!map.has(arr[i])) {
            map.set(arr[i], true)
            // 因为map是无序的，这里我们新开一个存储空间
            result.push(arr[i])
        }
    }
    return result
}