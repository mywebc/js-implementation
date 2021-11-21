/**
 * @description 继承有很多种， 这里只列举最多使用的继承 原型继承 + 构造函数继承
 * https://www.chenxiaolani.com/2017/javascript%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86%E5%A4%8D%E4%B9%A0%E4%B8%89js%E4%B8%AD%E7%9A%84%E7%BB%A7%E6%89%BF/
 * 
 */

function SuperType(name) {
    this.name = name
    // 私有属性
    this.colors = ['red', 'blue'];
}
// 原型上挂个方法
SuperType.prototype.sayName = function () {
    alert(this.name);
}

function SubType(name, age) {
    // 构造函数继承
    SuperType.call(this, name);
    this.age = age;
}

// 原型继承
SubType.prototype = new SuperType();
SubType.prototype.sayAge = function () {
    alert(this.age);
}

// es6 直接使用extends