const sign = '4c911e8b85fdbda6e79dcae85b6b33cc';
const base = 'https://xingyunkepuapi.zztv021.com/';
const post = (url, data) => {
  var promise = new Promise((resolve, reject) => {
    //网络请求
    wx.request({
      url: base+url+'?sign='+sign,
      data: {
        ...data
      },
      method: 'POST',
      success: function (res) {//服务器返回数据
        if (res.statusCode == 200) {
          resolve(res);
        } else {//返回错误提示信息
          reject(res.data);
        }
      },
      error: function (e) {
        reject('网络出错');
      }
    })
  });
  return promise;
}
const postNoSign = (url, data) => {
  var promise = new Promise((resolve, reject) => {
    //网络请求
    wx.request({
      url: base + url,
      data: {
        ...data
      },
      method: 'POST',
      success: function (res) {//服务器返回数据
        if (res.statusCode == 200) {
          resolve(res);
        } else {//返回错误提示信息
          reject(res.data);
        }
      },
      error: function (e) {
        reject('网络出错');
      }
    })
  });
  return promise;
}
const postNoSignArr = (url, data) => {
  var promise = new Promise((resolve, reject) => {
    //网络请求
    wx.request({
      url: base + url,
      data,
      method: 'POST',
      success: function (res) {//服务器返回数据
        if (res.statusCode == 200) {
          resolve(res);
        } else {//返回错误提示信息
          reject(res.data);
        }
      },
      error: function (e) {
        reject('网络出错');
      }
    })
  });
  return promise;
}
// 封装get请求
const get = (url, data) => {
  var promise = new Promise((resolve, reject) => {
    //网络请求
    wx.request({
      url: base + url,
      data: {
        sign,
        ...data
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {//服务器返回数据
        if (res.statusCode == 200) {
          resolve(res);
        } else {//返回错误提示信息
          reject(res.data);
        }
      },
      error: function (e) {
        reject('网络出错');
      }
    })
  });
  return promise;
}

export{
  post,
  get,
  sign,
  postNoSignArr,
  postNoSign
}