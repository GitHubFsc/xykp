// pages/integral/integral.js
import { GetUserPointRule, Rnd, GetUserPoingLog } from '../../utils/fpf.js'
var WxParse = require('../../wxParse/wxParse.js');
var app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:'',
    sign:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRule();
    if (app.globalData.userid) {
      this.getMore()
      this.getsign()
    } else {
      app.callbackuserid = res => {
        this.getMore()
        this.getsign()
      }
    }
  },

  getRule(){
    GetUserPointRule({
      rnd: Rnd()
    }).then(res=>{
      WxParse.wxParse('article', 'html', res.data.Response.rule, this, 5);
    })
  },

  getsign() {
    this.setData({
      sign: app.globalData.point
    })
  },

  getMore(){
    GetUserPoingLog({
      user_id:app.globalData.userid
    }).then(res => {
      this.setData({
        list: res.data.Response.list,
        sign: res.data.Response.point
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