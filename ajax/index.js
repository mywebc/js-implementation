/**
 * @description 实现ajax, 这个也叫模拟axios
 */

function ajax(method, url, data) {
  var xhr = new XMLHttpRequest();
  return new Promise(function (resolve, reject) {
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      if (xhr.status === 200) {
        resolve(xhr.responseText);
      } else {
        reject(xhr.statusText);
      }

    };
    // 第三个参数表示是否异步, 默认为异步, 不会阻塞
    // 严格来讲是需要区分get和post, 这里我们简写, get需要自己手动拼写参数到url后
    xhr.open(method, url);
    xhr.send(data);
  });
}
