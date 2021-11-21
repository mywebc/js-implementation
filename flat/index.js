/**
 * @description 多维数组扁平化
 */

const arr = [1, 2, 3, [4, 5, [7, 8]]]


// 1.使用flat, 默认深度为1， Infinity为无限的
const result = arr.flat(Infinity)
console.log(result)

// 2. 使用reduce
const myFlat = (arr) => {
    return arr.reduce((pre, cur) => pre.concat(Array.isArray(cur) ? myFlat(cur) : cur), [])
}
const result2 = myFlat(arr)
console.log(result2)

// 3. 使用stack
const myFlat = (arr) => {
    const stack = [...arr]
    let result = []
    while (stack.length) {
        const first = stack.shift()
        if (Array.isArray(first)) {
            // 如果该元素是数组， 添加到stack的前面，stack的长度会改变
            stack.unshift(...first)
        } else {
            result.push(first)
        }
    }
    return result
}

// 4. 使用循环 for循环或者while
const myFlat = (arr) => {
    let result = []
    for (let k = 0, length = arr.length; k < length; k++) {
        //  如果该元素是数组
        if (Array.isArray(arr[k])) {
            return result.concat(myFlat(arr[k]))
        } else {
            result.push(arr[k])
        }
    }
    return result
}