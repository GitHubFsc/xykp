// pages/home-info/index.js
var WxParse = require('../../wxParse/wxParse.js');
import { GetKBaseInfo, Rnd, GetAddCollection } from '../../utils/axios.js';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: ['../img/t1.png', '../img/s2.jpg', '../img/s3.jpg'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    info:{},
    tours:[],
    tours2:[]
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
      type: 1,
      pro_id: this.data.info.id
    }).then(res => {
      this.getData(this.data.info.id);
      wx.showToast({
        title: res.data.ErrMsg,
        icon: 'none'
      })
    })
  },

  openlocation(){
    const { info} = this.data

    wx.openLocation({
      latitude: info.lat,
      longitude: info.lng,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app);

    if(app.globalData.userid){
      this.getData(options.id)
    }else{
      app.callbackuserid = res =>{
        this.getData(options.id)
      }
    }
  },

  getData(base_id) {
    GetKBaseInfo({
      user_id: app.globalData.userid ,
      base_id
    }).then(res => {
      let tours = res.data.Response.footprint;

      WxParse.wxParse('article', 'html', res.data.Response.base_info, this, 5);
      
      this.setData({
        info: res.data.Response,
        tours,
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