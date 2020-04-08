// pages/search/index.js
import { GetKBaseHot, GetKBaseSearchList, GetDeleteHistory } from '../../utils/axios.js';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:'',
    page:1,
    pagesize:8,
    reslist:[],
    sea:false,
    total:0,
    hot:[],
    top:null,
    rec:[]
  },
  ref() {
    let { total, page, pagesize } = this.data;
    let num = page * pagesize;

    if (num < total) {
      this.setData({
        page: page + 1
      }, () => {
        this.refInfo()
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  change(e){
    this.setData({
      content:e.detail.value
    })
  },
  del(){
    GetDeleteHistory({
      user_id: app.globalData.userid,
    }).then(res=>{
      this.getData()
    })
  },
  onLoad: function (options) {
    if (app.globalData.userid) {
      this.getData()
    } else {
      app.callbackuserid = res => {
        this.getData()
      }
    }
  },
  getData(){
    GetKBaseHot({
      user_id:app.globalData.userid
    }).then(res=>{
      this.setData({
        hot: res.data.Response.hottest_list,
        rec: res.data.Response.recently_list
      })
    })
  },
  fin(e){
    this.setData({
      content:e.target.dataset.q
    },()=>{
      this.putInfo()
    })
  },
  putInfo(){
    let { content, page, pagesize, reslist } =this.data;

    reslist=[];
    page=1;

    if(content!=''){
      GetKBaseSearchList({
        user_id: app.globalData.userid,
        content,
        page,
        pagesize
      }).then(res => {
        reslist.push(...res.data.Response)
        this.getData()
        this.setData({
          reslist,
          sea: true,
          page,
          top:0,
          total: res.data.Total
        })
      })
    }else{
      this.setData({
        reslist,
        sea: false,
        total: 0,
        page
      })
    }
  },
  refInfo() {
    let { content, page, pagesize, reslist } = this.data;

    GetKBaseSearchList({
      user_id: app.globalData.userid,
      content,
      page,
      pagesize
    }).then(res => {
      reslist.push(...res.data.Response)
      this.setData({
        reslist,
        total: res.data.Total
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