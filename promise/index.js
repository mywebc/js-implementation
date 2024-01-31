/**
 * @description 手动实现一个支持链式调用的promise
 */

// 三种状态
const FULFILLED = Symbol();
const REJECTED = Symbol();
const PENDING = Symbol();

function Promisee(fn) {
  this.status = PENDING; // 初始状态
  this.value = null; // 成功的数据
  this.reason = null; // 失败的数据
  // 为了兼容异步, 我们需要一个数组存放回调函数, 当状态改变时再去执行
  this.resolveCbs = []; // 存放成功回调的数组
  this.rejectCbs = []; // 存放失败回调的数组

  const resolve = (value) => {
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;
      this.resolveCbs.forEach((fn) => fn(this.value));
    }
  };

  const reject = (error) => {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = error;
      this.rejectCbs.forEach((fn) => fn(this.reason));
    }
  };

  try {
    fn(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

Promisee.prototype.then = function (onResolve, onReject) {
  // 如果then为空,就将上一次返回的value传给下一个then
  onResolve = typeof onResolve === "function" ? onResolve : (v) => v;
  onReject = typeof onReject === "function" ? onReject : (r) => r;

  // 返回一个promise
  return new Promisee((resolve, reject) => {
    if (this.status === PENDING) {
      this.resolveCbs.push(() => {
        onResolve(this.value);
      });
      this.rejectCbs.push(() => {
        onReject(this.reason);
      });
    }
    if (this.status === FULFILLED) {
      resolve(onResolve(this.value));
    }
    if (this.status === REJECTED) {
      reject(onReject(this.reason));
    }
  });
};

// catch方法直接调用then方法, 直接接受失败回调
Promisee.prototype.catch = function (fn) {
  return this.then(null, fn);
};

// all 接受一个promise数组, 返回一个promise, 遍历循环promise数组, 直到所有都执行完然后再resolve出去
Promisee.prototype.all = function (promiseArr) {
  return new Promisee((resolve, reject) => {
    let resolveValues = [];
    let resolveCount = 0;
    for (let i = 0; i < promiseArr.length; i++) {
      promiseArr[i].then(
        function (res) {
          resolveCount++;
          resolveValues[i] = res;
          if (resolveCount === promiseArr.length) {
            resolve(resolveValues);
          }
        },
        function (err) {
          reject(err);
        }
      );
    }
  })
}

// race 只返回第一个执行成功的结果, 循环调用, 只要任意一个成功了就会调用resolve并跳出来
Promisee.prototype.race = function (promiseArr) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promiseArr.length; i++) {
      promiseArr[i].then(resolve, reject)
    }
  })
}

// 使用
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // 异步操作
    if (false) {
      // 成功
      resolve("我是异步返回的成功数据");
    } else {
      // 失败
      reject("我是异步返回的失败数据");
    }
  }, 1000);
  console.log("我先输入"); // 构造函数立刻执行
});

p1.then(
  (val) => {
    console.log("val", val);
    return "first";
  },
  (error) => {
    console.log("error", error);
    return "又错了";
  }
)
  .then(
    (val2) => {
      console.log("haha1", val2);
    },
    (err2) => {
      console.log("err23", err2);
    }
  )
  .catch((err) => {
    console.log("抛出的错误", err);
  });

p1.then((val) => {
  console.log("hello", val);
}).catch((error) => {
  console.log("shit", error);
});

// 实现promise all
function MyPromiseAll(promiseArr) {
  return new Promise((resolve, reject) => {
    let count = 0
    let result = []
    for (let k in promiseArr) {
      Promise.resolve(promiseArr[k]).then(val => {
        count++
        result.push(val) // 注意如果是push的话有可能顺序不一样
        // result[k] = val 
        if (count === promiseArr.length) {
          resolve(result)
        }
      }).catch(err => {
        reject(err)
      })
    }
  })
}

// 实现promise race 只要有一个成功或失败就立刻返回
function MyPromiseRace(promiseArr) {
  return new Promise((resolve, reject) => {
    for (let p of promiseArr) {
      p.then(val => {
        resolve(val)
      }).catch(e => {
        reject(e)
      })
    }
  })
}

// promise 控制并发
function promiseAll(promiseArr, limit) {
  return new Promise((resolve, reject) => {
    let result = []
    let count = 0 // 存放结果数组的索引
    let successCount = 0 // 请求成功的次数

    function next(urlP, index) {
      urlP().then(val => {
        result[index] = val
        successCount++

        if (promiseArr.length) {
          const p = promiseArr.shift()
          next(p, count)
          count++
        } else if (successCount === promiseArr.length) {
          resolve(result)
        }
      })
    }

    while (count < limit && promiseArr.length) {
      const p = promiseArr.shift()
      next(p, count)
      count++
    }
  })
}
