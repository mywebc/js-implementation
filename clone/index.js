/**
 * @description 深拷贝与浅拷贝
 */

// 浅拷贝
// 1. 原生方法
Object.assign(target, source);
// 2. for循环， 开辟新空间， 手动加
const cloneOne = (obj) => {
    if (!(obj instanceof Object)) return
    let newObj = {}
    for (let k in obj) {
        newObj[k] = obj[k]
    }
    return newObj
}
// 3. 解构赋值

// 深拷贝
//1. 最简单JSON.parse(JSON.stringify) 缺点： 1. 函数，undefined，正则不能copy, 2. 环引用

//2. 手动实现

//实现深度克隆---对象/数组
function clone(target, hash = new Map()) {
    //判断拷贝的数据类型
    //初始化变量result 成为最终克隆的数据
    let result, targetType = checkedType(target)
    if (targetType === 'Object') {
        result = {}
    } else if (targetType === 'Array') {
        result = []
    } else {
        return target
    }
    // 检查这个对象之前是否拷贝过
    if (hash.has(target)) {
        // 如果有的话， 直接返回        
        return hash.get(target)
    }

    hash.set(target, result)

    //遍历目标数据
    for (let i in target) {
        //获取遍历数据结构的每一项值。
        let value = target[i]
        //判断目标结构里的每一值是否存在对象/数组
        if (checkedType(value) === 'Object' ||
            checkedType(value) === 'Array') { //对象/数组里嵌套了对象/数组
            //继续遍历获取到value值
            result[i] = clone(value)
        } else { //获取到value值是基本的数据类型或者是函数。
            result[i] = value;
        }
    }
    return result
}

//定义检测数据类型的功能函数 
// Object.prototype.toString.call({}) = '[object Object]'
// Object.prototype.toString.call([]) = '[object Array]'
function checkedType(target) {
    return Object.prototype.toString.call(target).slice(8, -1)
}

// Map可替换为weakMap, weakMap 为弱引用的结构， 键只能为对象， 不计入垃圾回收机制，防止内存泄漏