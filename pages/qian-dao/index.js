// pages/qian-dao/index.js
import { GetSignInList, GetSignIn } from '../../utils/fpf.js'
const app = getApp();
function tim(){
  var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  
  return year + seperator1 + month + seperator1 + strDate;

}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:'',
    num:'',
    jifen:''
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userid) {
      this.signInList()
    } else {
      app.callbackuserid = res => {
        this.signInList()
      }
    }
  },

  

  signInList() {
    var time1 = new Date();
  
    GetSignInList({
      user_id: app.globalData.userid,
      time: tim()
    }).then(res => {
      console.log(res);
      this.setData({
        list: res.data.Response.Data,
        num: res.data.Response.qianNum,
        jifen: res.data.Response.qianPoint
      })

    })
  },


  signIn() {
    var time1 = new Date();

    GetSignIn({
      user_id: app.globalData.userid,
  
    }).then(res => {
      console.log(res.data.Errmsg);
      wx.showToast({
        icon: 'none',
        title: res.data.ErrMsg,
      })

      this.signInList()

    })
  },
  qd(){
    this.signIn();
    
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