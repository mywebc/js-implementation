/**
 * @description 实现ajax
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
    xhr.open(method, url);
    xhr.send(data);
  });
}