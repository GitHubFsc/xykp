// pages/receivingplace/receivingplace.js
import { GetUserAddress, GetUserAddressDel, GetSetDefalut } from '../../utils/fpf.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:'',
    sas:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userid) {
      this.userAddress()
    } else {
      app.callbackuserid = res => {
        this.userAddress()
      }
    }
  },

  radioChange: function (e) {
    console.log("e.id",e.currentTarget.dataset.id)
    console.log("地址",this.data.list[e.currentTarget.dataset.id])
    this.setDefalut(e.currentTarget.dataset.id);

  },
  setDefalut(liaisonId1) {
   
    GetSetDefalut({
      user_id: app.globalData.userid,
      address_id: liaisonId1
    }).then(res => {
      console.log(res);
      wx.showToast({
        icon: 'none',
        title: res.data.ErrMsg,
      });
      wx.navigateBack({
      })

    })
  },




  detele(e) {
    console.log();
    this.addressDel(e.currentTarget.dataset.deid);
  },

  addressDel(liaisonId1) {


    GetUserAddressDel({
      user_id: app.globalData.userid,
      address_id: liaisonId1
    }).then(res => {
      console.log(res);
      wx.showToast({
        icon: 'none',
        title: res.data.ErrMsg,
      })
      this.userAddress()
    })
  },


 userAddress() {
    

    GetUserAddress({
      user_id: app.globalData.userid,
      
    }).then(res => {
      console.log("111",res.data);
      this.setData({
        list: res.data.Response
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
    if (app.globalData.userid) {
      this.userAddress()
    } else {
      app.callbackuserid = res => {
        this.userAddress()
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