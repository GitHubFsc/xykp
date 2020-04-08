// pages/mynews/mynews.js
import { GetUserNewsCount } from '../../utils/fpf.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_count:'',
    xitong_count:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userid) {
      this.userNewsCount()
    } else {
      app.callbackuserid = res => {
        this.userNewsCount()
      }
    }
  },

  userNewsCount() {


    GetUserNewsCount({
      user_id: app.globalData.userid,

    }).then(res => {
      console.log(res);
      this.setData({
        order_count: res.data.Response.order_count,
        xitong_count: res.data.Response.xitong_count,
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