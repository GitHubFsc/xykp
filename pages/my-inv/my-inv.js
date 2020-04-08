// pages/my-inv/my-inv.js
import { GetUserInvite } from '../../utils/axios.js'
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    pagesize:40,
    list:[],
    total:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userid) {
      this.getData()
    } else {
      app.callbackuserid = res => {
        this.getData()
      }
    }
  },

  refData(){
    let { page, pagesize,total,list } = this.data;
    if(list.length<total){
      page+=1;
      GetUserInvite({
        user_id: app.globalData.userid,
        page,
        pagesize
      }).then(res => {
        list.push(...res.data.Response)
        this.setData({
          total: res.data.Total,
          list
        })
      })
    }
  },

  getData(){
    const{page,pagesize}= this.data;
    GetUserInvite({
      user_id:app.globalData.userid,
      page,
      pagesize
    }).then(res=>{
      this.setData({
        total:res.data.Total,
        list:res.data.Response
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
    this.refData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})