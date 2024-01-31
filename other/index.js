// 合并两个对象
function combineObj(obj1, obj2) {
  const newObj = { ...obj1, ...obj2 }
  for (let k in obj2) {
    if (typeof obj2[k] === "object") {
      newObj[k] = combineObj(obj1[k], obj2[k])
    } else {
      newObj[k] = obj2[k]
    }
  }
  return newObj
}

// 找到指定value, 返回路径, 这里使用深度优先就是递归和使用栈
const root = {
  name: "test1",
  children: [
    { name: "test2", children: [] },
    { name: "test3", children: [] },
    { name: "test4", children: [] },
    {
      name: "test5", children: [
        { name: "floder", children: [] },
        { name: "floder2", children: [] }
      ]
    },
  ]
}
// 写一个函数, 参数是root, 和 path, 在root中找到指定path, 并返回路径数组
// 比如path === “floder2”, 返回["test1", "test5","floder2"]

function findPath(root, path) {
  const result = []
  function dfs(node, arr) {
    if (node.name) {
      arr.push(node.name)
    }

    if (node.name === path) {
      result.push(...arr)
      return
    }

    for (let k of node.children) {
      dfs(k, [...arr])
    }
  }
  dfs(root, [])
  return result
}
const res = findPath(root, "floder")
console.log("test", res)

// 写一个useDebounce

function useDebounce(val, delay) {
  const [debounceVal, setDebounceVal] = useState < string > (val)

  useEffect(() => {
    let timer = setTimeout(() => {
      setDebounceVal(val)
    }, delay)
    return clearTimeout(timer)
  }, [debounceVal, delay])

  return debounceVal
}

// 深度优先遍历二叉树
function xian(root) {
  if (!root) return root
  const res = []
  function aa(node) {
    if (node !== null) {
      res.push(node.value)
      node.left && aa(node.left)
      node.right && aa(node.right)
    }
  }
  aa(root)
  return res
}
function zhong(root) {
  if (!root) return root
  const res = []
  function aa(node) {
    if (node !== null) {
      node.left && aa(node.left)
      res.push(node.value)
      node.right && aa(node.right)
    }
  }
  aa(root)
  return res
}
function hou(root) {
  if (!root) return root
  const res = []
  function aa(node) {
    if (node !== null) {
      node.left && aa(node.left)
      node.right && aa(node.right)
      res.push(node.value)
    }
  }
  aa(root)
  return res
}

// 广度
function BFS(root) {
  if (!root) return []

  const res = []

  const queue = [root]

  while (queue.length) {
    const node = queue.shift()
    res.push(node.val)

    node.left && queue.push(node.left)
    node.right && queue.push(node.right)
  }
  return res
}

// const root = {
//   name: "test1",
//   children: [
//     { name: "test2", children: [] },
//     { name: "test3", children: [] },
//     { name: "test4", children: [] },
//     {
//       name: "test5", children: [
//         { name: "floder", children: [] },
//         { name: "floder2", children: [] }
//       ]
//     },
//   ]
// }
// 写一个函数, 参数是root, 和 path, 在root中找到指定path, 并返回路径数组
// 比如path === “floder2”, 返回["test1", "test5","floder2"]
// 这个非常重要
function findPath(root, path) {
  const result = []

  function dfs(node, currentPath) {
    currentPath.push(node.name);
    if (node.name === path) {
      result.push(...currentPath);
      return;
    }

    for (const child of node.children) {
      //  这里每次进去都是新的数组, 这样就不会带着之前的值
      dfs(child, [...currentPath]);
    }
  }
  dfs(root, [])
  return result.length > 0 ? result : null;
}
