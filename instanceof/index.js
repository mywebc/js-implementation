/**
 * @description 实现instanceof, 原理每一个对象都有一个__proto__, 指向它的原型对象prototype
 */

const myInstanceof = (left, right) => {
    if (typeof left !== "object" || left === null) return false;
    // 拿到参数的原型对象，就是参数的__proto__
    let proto = Object.getPrototypeOf(left)
    while (true) {
        // 找到头还是没有找到
        if (proto === null) return false
        if (proto === right.prototype) return true

        proto = Object.getPrototypeof(proto);
    }
}

const arr = new Array()

myInstanceof(arr, Array)