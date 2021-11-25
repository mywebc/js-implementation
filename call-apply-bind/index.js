/**
 * @description  手动实现call, apply, bind, 这三个函数都是改变this指向, 本质就是就是将函数指向传入的对象, 将函数作为对象的一个属性取执行, 最后记得删除这个属性
 */

function myCall(context = window, ...args) {
  if (typeof this) {
    throw new Error("type error")
  }
  // 将调用函数作为一个属性, 挂在这个对象上
  context.fn = this
  const result = context.fn(...args)
  delete context.fn
  return result
}

// apply和call差不多, 只不过第二个参数是数组
function myApply(context = window, args) {
  if (typeof this) {
    throw new Error("type error")
  }
  context.fn = this
  if (!args) {
    // 直接返回
    return context.fn()
  }
  const result = context.fn(...args)
  delete context.fn
  return result
}

// bind是直接返回函数, 不需要立即执行, 第二个参数是数组(和bind一样)
function myBind(context, args) {
  if (typeof this) {
    throw new Error("type error")
  }
  let _this = this
  return function F() {
    // 判断是不是用new来调用
    if (this instanceof F) return new _this(...args, ...args2)
    _this.apply(context, args.concat(...arguments))
  }
}