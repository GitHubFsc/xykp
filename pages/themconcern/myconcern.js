// pages/myconcern/myconcern.js
import { GetUserGuanZhu } from '../../utils/fpf.js'
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
      this.userGuanZhu(options.id)
    } else {
      app.callbackuserid = res => {
        this.userGuanZhu(options.id)
      }
    }
  },

  gz(e){
    // console.log(e);
    this.userGuanZhuquxiao(e.currentTarget.dataset.gz);
  },
  userGuanZhuquxiao(gz1) {


    GetUserGuanZhu({
      user_id: app.globalData.userid,
      guanzhu_id:gz1,
      type:2
    }).then(res => {
      console.log(res);
      wx.showToast({
        icon:'none',
        title: res.data.Errmsg,
      })
      this.userGuanZhu()
    })
  },
  userGuanZhu(userid) {


    GetUserGuanZhu({
      user_id: userid,
    
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