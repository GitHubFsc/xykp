// pages/home-info/index.js
import { GetHomeBanner, GetTours, Rnd, GetRecentActive, GetProduct,GetuserCartAdd } from '../../utils/axios.js';
var app  = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: ['../img/banner.png', '../img/banner.png', '../img/banner.png'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    product:[],
    tours:[],
    tours2:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
  },

  jump(e){
    const {type,id} = e.target.dataset;
    console.log(e);
    let url = '';
    let look=false;
    switch(type){
      case 1:
        look=false;
        break
      case 2:
        look=false;
        break;
      case 3:
        look = true;
        url = '../ke-pu-chan-pin-xiang-qing/index?id='+id;
        break;
      case 4:
        look = true;
        url = '../huo-dong-xiang-qing/index?id=' + id;
        break;
    }
    console.log(look);
    console.log(type);

    if(look){
      wx.navigateTo({
        url
      })
    }
  },

  addcar(e){
    console.log(e);
    let { id } = e.currentTarget.dataset;
    let {userid} = app.globalData

    GetuserCartAdd({
      user_id:userid,
      pro_id:id
    }).then(res=>{
      console.log(res);
      // wx.showToast({
      //   title: res.data.ErrMsg,
      //   icon:'none'
      // });
      if(res.data.ErrCode==0){
        wx.navigateTo({
          url: '../car/index',
        })
      }else if(res.data.ErrCode==-1){
        wx.navigateTo({
          url: '../ke-pu-chan-pin-xiang-qing/index?id='+id,
        })
      }
    })
  },

  mor(e){
    let { id } =  e.currentTarget.dataset;
    wx.navigateTo({
      url: '../ke-pu-chan-pin-xiang-qing/index?id='+id,
    })
  },


  getData(){
    GetHomeBanner({
      rnd:Rnd()
    }).then(res=>{
      this.setData({
        background: res.data.Response
      })
    })
    GetRecentActive({
      rnd: Rnd()
    }).then(res=>{
      this.setData({
        active:res.data.Response
      })
    })
    GetProduct({
      rnd: Rnd()
    }).then(res=>{
      this.setData({
        product: res.data.Response
      })
    })
    GetTours({
      rnd: Rnd()
    }).then(res => {
      let tours = res.data.Response;

      this.setData({
        tours
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
    this.getData()
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