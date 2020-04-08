// pages/contacts/contacts.js
import { GetUserLiaison, GetDeleteLiaison } from '../../utils/fpf.js'
const app = getApp()
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
    
  },
  

  detele(e){
    console.log();
    this.DeleteLiaison(e.currentTarget.dataset.liaisonid);
  },

  UserLiaison() {


    GetUserLiaison({
      user_id: app.globalData.userid
    }).then(res => {
      this.setData({
        list: res.data.Response
      })
    })
  },

  DeleteLiaison(liaisonId1) {


    GetDeleteLiaison({
      user_id: app.globalData.userid,
      liaisonId: liaisonId1
    }).then(res => {
      console.log(res);
      wx.showToast({
        icon: 'none',
        title: res.data.ErrMsg,
      })
      this.UserLiaison()
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
    if (app.globalData.userid) {
      this.UserLiaison()
    } else {
      app.callbackuserid = res => {
        this.UserLiaison()
      }
    }
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