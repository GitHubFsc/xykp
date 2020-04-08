import { UserRegister, Getopenid, GetUserLogin,Rnd } from './utils/axios.js';

//app.js
App({
  getCurrentPages: function () {
    　　var pages = getCurrentPages();    //获取加载的页面
    　　var currentPage = pages[pages.length - 1];  //获取当前页面的对象
    　　var url = currentPage.route;  //当前页面url
    　　var options = currentPage.options;   //获取url中所带的参数
    　　//拼接url的参数
    　　var currentPage = url + '?';
    　　for (var key in options) {
      　　　　var value = options[key]
      　　　　currentPage += key + '=' + value + '&';
    　　}
    　　currentPage = currentPage.substring(0, currentPage.length - 1);
    　　return currentPage;
  },
  onLaunch: function () {
    this.checkFullSucreen()
    // UserRegister()

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    // 登录
    wx.login({
      success: res => {
        Getopenid({
          code:res.code,
          rnd: Rnd()
        }).then(res=>{
          this.globalData.openid = res.data.Response;
          console.log(res.data)
          GetUserLogin({
            openid: res.data.Response
          }).then(res2=>{
            if (res2.data.Response){
              this.globalData.userid = res2.data.Response.user_id
              this.globalData.userInfo = res2.data.Response

              if (this.callbackuserid) {
                this.callbackuserid();
              }
            }else{
              var url = this.getCurrentPages();
              wx.setStorageSync('url', url);
              wx.switchTab({
                url: '/pages/my/my'
              })
            }
          })
        })
      }
    })
  },
  globalData: {
    userInfo: null,
    openid:'',
    reg:false,
    yqm:'',
    isFullSucreen: false,
    userid:null,
  },
  checkFullSucreen: function () {
    const self = this
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        if (res.model.includes('X') || res.model.includes('11')) {
          self.globalData.isFullSucreen = true
        }
      }
    })
  },
})