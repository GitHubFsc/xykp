// pages/changenum/changenum.js
import { Rnd, GetSMSCode, GetUserBindMobileChange } from '../../utils/fpf.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mob:'',
    msg:'',
    sec:'',
    btntext: '获取验证码',
    code:'',
    fh:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  UserBindMobileChange(){
    let {
      mob,
      code
    } = this.data;

    GetUserBindMobileChange({
      user_id: app.globalData.userid,
      mobile: mob,
      code:code
    }).then(res => {
      let msg = res.data.ErrMsg;
      wx.showToast({
        title: msg,
        icon:'none'
      })

      if(msg =='换绑成功'){
        // wx.navigateBack({
        // })
      }
      this.setData({
        fh: res.data.Response
      })
    })
  },
  sms(){
    this.verification();

  },
  text(e){
    const { ss } = e.target.dataset;
    this.setData({
      [ss]: e.detail.value
    }) 
  },
  dateuserNews() {
    let {
      mob
    } = this.data;

    GetSMSCode({
      mobile:mob,
      rnd:Rnd()
    }).then(res => {
      wx.showToast({
        icon:'none',
        title: res.data.ErrMsg ,
      })
      this.setData({
        msg: res.data.Response
      })

      if (res.data.Response.SMSCode) {
        var coden = 60    // 定义60秒的倒计时
        var codeV = setInterval(()=> {
          this.setData({    // _this这里的作用域不同了
            btntext: '重新获取' + (--coden) + 's'
          })
          if (coden == -1) {  // 清除setInterval倒计时，这里可以做很多操作，按钮变回原样等
            clearInterval(codeV)
            this.setData({
              btntext: '获取验证码'
            })
          }
        }, 1000)  //  1000是1秒
      }


      
    })
  },


  verification() { // 点击获取验证码
    this.dateuserNews();
    
  },


  bc(){
    this.UserBindMobileChange()
  },

 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})