// pages/home-info/index.js
import { GetALogInfo, GetAddCollection, GetDailyAssess, GetUserGuanZhu, GetSendAlogAdd, GetDeleteDaily } from '../../utils/axios.js';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isFullSucreen: app.globalData.isFullSucreen ? true : false,
    background: ['../img/t1.png', '../img/t1.png', '../img/t1.png'],
    indicatorDots: true,
    vertical: false,
    focus:false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    so:false,
    info:{},
    z:false,
    page:1,
    pagesize:4,
    total:0,
    content:'',
    plist:[],
    assess_id:0,
    rizhi:0,
    daily_id:0
  },
  inpu(e){
    this.setData({content:e.detail.value})
  },
  se(){
    this.setData({
      so:!this.data.so
    })
  },
  sendMsg(){
    const { info, assess_id, content} = this.data;
    GetSendAlogAdd({
      user_id: app.globalData.userid,
      daily_id:info.id,
      assess_id,
      content
    }).then(res=>{
      this.resPl(info.id)
      wx.showToast({
        title: res.data.ErrMsg,
        icon:'none'
      })
    })
  },
  preview(e){
    console.log(e.target.dataset.src)
    wx.previewImage({
      current: e.target.dataset.src,
      urls: this.data.info.daily_count_img 
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userid) {
      this.getData(options.id)
      this.getPl(options.id)
    } else {
      app.callbackuserid = res => {
        this.getData(options.id)
        this.getPl(options.id)
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
      type: 4,
      pro_id: this.data.info.id
    }).then(res => {
      this.getData(this.data.info.id);
      wx.showToast({
        title: res.data.ErrMsg,
        icon: 'none'
      })
    })
  },
  see() {
    let type = this.data.info.is_guanzhu;

    if (type == 1) {
      type = 2;
    } else {
      type = 1;
    }

    GetUserGuanZhu({
      user_id: app.globalData.userid,
      type,
      guanzhu_id: this.data.info.user_id
    }).then(res => {
      this.getData(this.data.info.id);
      wx.showToast({
        title: res.data.ErrMsg,
        icon: 'none'
      })
    })
  },


  del(){
    this.deleteDaily();
  },

  deleteDaily() {
    let {
      rizhi
    } = this.data;
    GetDeleteDaily({
      user_id: app.globalData.userid,
      daily_id: rizhi
    }).then(res => {
      wx.showToast({
        icon:'none',
        title: res.data.ErrMsg,
      })

      wx.navigateBack({
        delta: 1
      })
    })
  },

  getData(daily_id){
    this.setData({ 
      daily_id: app.globalData.userid,
      rizhi: daily_id
     })
    GetALogInfo({
      user_id:app.globalData.userid,
      daily_id
    }).then(res=>{
      var info = res.data.Response;

      this.setData({info})
    })
  },
  blur(){
    this.setData({
      assess_id:0
    })
  },

  tay(e){
    const { id } = e.currentTarget.dataset;
    console.log(id);
    console.log(e);
    this.setData({
      focus:true,
      assess_id:id
    })


  },
  resPl(daily_id) {
    const { page, pagesize, plist } = this.data;
    GetDailyAssess({
      daily_id,
      page,
      pagesize: page * pagesize
    }).then(res => {

      this.setData({
        plist: res.data.Response,
        total: res.data.Total,
        focus: false,
        content:'',
        assess_id: 0
      })
    })
  },
  nextPl(){
    let { page, pagesize, plist,info,total} = this.data;
    
    let num = page*pagesize;

    console.log(num);

    if(num<total){
      page = page + 1;
      GetDailyAssess({
        daily_id: info.id,
        page,
        pagesize
      }).then(res => {

        this.setData({
          plist: res.data.Response,
          page,
          total: res.data.Total,
          focus: false,
          assess_id: 0
        })
      })
    }

    
  },
  getPl(daily_id){
    const { page, pagesize, plist} = this.data;
    GetDailyAssess({
      daily_id,
      page,
      pagesize
    }).then(res=>{
      
      plist.push(...res.data.Response)
      this.setData({
        plist,
        total:res.data.Total,
        focus: false,
        assess_id:0
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