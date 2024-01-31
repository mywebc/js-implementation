function myMap(fn, thisArgs){
  return this.reduce((pre, cur, index,arr)=>{
    // 把fn挂载到thisArgs的环境下执行
    return pre.concat(fn.call(thisArgs,cur, index, arr))
  },[])
}