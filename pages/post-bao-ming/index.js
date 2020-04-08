// pages/post-bao-ming/index.js
import { GetMakeActive, GetSubmitActive } from '../../utils/axios.js';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bmr:[],
    person:[]
  },
  getData(){

  },
  jump(){
    var str = '';
    if(this.data.bmr.length>0){
      str = this.data.bmr.join('-');
    }
    wx.navigateTo({
      url: '../select-bao-ming/index?per='+str,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    GetMakeActive({
      active_id:options.id
    }).then(res=>{
      this.setData({
        info:res.data.Response
      })
    })
  },

  jo(){
    let {info,bmr} = this.data;
    if(bmr.length<1){
      wx.showToast({
        title: '请添加报名人',
        icon:'none'
      })
    }else{
      GetSubmitActive({
        user_id: app.globalData.userid,
        active_id: info.id,
        liaison: bmr.join(',')
      }).then(res => {
        let resp = res.data.Response;
        console.log(res);
        if (res.data.ErrMsg =='请勿重复报名!'){
          wx.showToast({
            title: res.data.ErrMsg,
            icon: 'none'
          })
        }
        if (resp.summoney == 0) {
          wx.showToast({
            title: res.data.ErrMsg,
            icon: 'none'
          })
          wx.redirectTo({
            url: '../myapplication/myapplication',
          })
        } else {
          
          this.dpay(resp.ordernumber, resp.summoney, app.globalData.openid, 99)
        }
      })
    }
  },
  dpay(order, money, openId, configId) {
    console.log(order);
    let msgid = openId; //获得openid
    let moneys = (money * 100).toFixed(2);
    let body = '微信支付'; //品类
    let url = '&body=' + body + '&total_fee=' + Number(moneys) + '&out_trade_no=' + order + '&configId=' + configId + '&trade_type=JSAPI&msgid=' + msgid;
    wx.request({
      url: 'https://pays.zztv021.com/payment/wxpay/wxpay.ashx?action=jspayparam' + url,
      success: (re) => {
        wx.hideLoading()
        wx.requestPayment({
          'timeStamp': re.data.timeStamp,
          'nonceStr': re.data.nonceStr,
          'package': re.data.package,
          'signType': re.data.signType,
          'paySign': re.data.paySign,
          'success': (r) => {
            if (r.errMsg == "requestPayment:ok") {
              wx.showToast({
                title: '支付成功',
                icon: 'none'
              })
              wx.redirectTo({
                url: '../myapplication/myapplication?ctype=1',
              })
            }
          },
          'fail': (r) => {
            wx.showToast({
              title: '取消支付！',
              icon: 'none'
            })
            wx.redirectTo({
              url: '../myapplication/myapplication?ctype=0',
            })
          }
        });
      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  del(e){
    let {index} = e.target.dataset;
    let {person,bmr} = this.data;

    person.splice(index,1)
    bmr.splice(index, 1)

    this.setData({bmr,person})
    wx.setStorageSync('liaison', bmr);
    wx.setStorageSync('person', person);
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let bmr = wx.getStorageSync('liaison');
    let person = wx.getStorageSync('person');
    this.setData({bmr,person})
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
    wx.setStorageSync('liaison', []);
    wx.setStorageSync('person', []);
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