// /**
//  * @description 实现函数柯里化 实现add(1)(2)(3)(4)=10 = add(1,2,3,4), 好处就是函数参数可以复用
//  */

// const curry = (fn, currArgs) => {
//     return function () {
//         // 伪数组转换
//         let args = [].slice.call(arguments);

//         if (currArgs !== undefined) {
//             //  如果提供了参数就拼接参数
//             args = args.concat(currArgs);
//         }

//         // 参数个数比总个数小的话， 递归调用
//         if (args.length < fn.length) {
//             return curry(fn, args);
//         }

//         // 递归出口
//         return fn.apply(null, args);
//     }
// }

const add = (a, b, c) => {
    console.log(a + b + c)
}

// const curryAdd = curry(add)
// curryAdd(1)(2)(3)
// curryAdd(1, 2)(3)


// 简化版
function curry(fn, ...curryArgs) {
    return (...callbackArgs) => {
        const currentArgs = [...curryArgs, ...callbackArgs];
        return fn.length === currentArgs.length || callbackArgs.length === 0 ? fn(...currentArgs) : curry(fn, ...currentArgs);
    }
}

// const curryAdd = curry(add)
// curryAdd(1)(2, 3)


