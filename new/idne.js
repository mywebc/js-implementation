/**
 * @description 实现new操作，new出来的实例都能够使用构造函数的属性和方法，那么我们可以使用原型链替换来继承方法，使用构造函数继承来继承私有属性， 注意构造函数里如果有对象返回的话就放回对象
 */

function myNew() {
    // 伪数组转换
    const arr = [...arguments]
    // 内部新建一个对象
    let obj = {}
    // 使用shift会删除第一个元素，并且返回第一个元素，会改变数组
    const fn = arr.shift(arguments)
    // 继承原型上的方法
    obj.__proto__ = fn.prototype
    // 改变this指向，并且传参数,同时执行
    const res = fn.apply(obj, arguments)
    return typeof res === 'object' ? res : obj
}

