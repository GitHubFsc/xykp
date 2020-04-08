// pages/huo-dong-xiang-qing/index.js
import { GetActiveInfo, GetAddCollection } from '../../utils/axios.js';
var app = getApp();
var WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userid) {
      this.getData(options.id)
    } else {
      app.callbackuserid = res => {
        this.getData(options.id)
      }
    }
  },
  love() {
    let collection_type = this.data.info.is_love;

    if (collection_type == 1) {
      collection_type = 2;
    } else {
      collection_type = 1;
    }

    GetAddCollection({
      user_id: app.globalData.userid,
      collection_type,
      type: 2,
      pro_id: this.data.info.id
    }).then(res => {
      this.getData(this.data.info.id);
      wx.showToast({
        title: res.data.ErrMsg,
        icon:'none'
      })
    })
  },
  getData(active_id){
    GetActiveInfo({
      user_id:app.globalData.userid,
      active_id
    }).then(res=>{
      this.setData({
        info : res.data.Response,
      })
      WxParse.wxParse('article', 'html', res.data.Response.content, this, 5);
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