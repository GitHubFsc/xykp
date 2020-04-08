// pages/myfans/myfans.js
import { GetUserFans, GetUserGuanZhu } from '../../utils/fpf.js'
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  list:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userid) {
      this.userFans()
    } else {
      app.callbackuserid = res => {
        this.userFans()
      }
    }
  },

  gz(e) {
    // console.log(e);
    this.setData({

    })
    this.userGuanZhuquxiao(e.currentTarget.dataset.zt,e.currentTarget.dataset.gz);
  },

  userGuanZhuquxiao(z,gz1) {


    GetUserGuanZhu({
      user_id: app.globalData.userid,
      guanzhu_id: gz1,
      type: z
    }).then(res => {
      console.log(res);
      wx.showToast({
        icon: 'none',
        title: res.data.ErrMsg,
      })
      this.userFans()
    })
  },

  
  userFans() {
    GetUserFans({
      user_id: app.globalData.userid,

    }).then(res => {
      console.log(res);
      this.setData({
        list: res.data.Response
      })
    })
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