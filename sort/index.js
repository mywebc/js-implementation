// 快排, 不稳定, 但是快
// 选一个基准值, 小的放左边, 大的放右边
function quickSort(arr) {
  if (arr.length < 2) return arr
  let base = arr.splice(0, 1)

  const left = []
  const right = []

  for (let k = 0; k < arr.length; k++) {
    if (arr[k] < base[0]) {
      left.push(arr[k])
    } else {
      right.push(arr[k])
    }
  }

  return quickSort(left).concat(base).concat(quickSort(right))
}



// 冒泡, 两层循环
function MaoPao(arr) {
  for (let k = 0; k < arr.length; k++) {
    for (let j = 0; j < arr.length - k; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
  return arr
}


const aa = [1, 2, 4, 9, 5, 3]

const bb = MaoPao(aa)
console.log(bb)

