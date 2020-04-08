// pages/add-lxr/index.js
import { GetAddChangeLiaison, GetUserLiaison, GetPanDuanFirst } from '../../utils/fpf.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    idcard:'',
    type:'',
    liaison_id:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      type: options.type,
      name:options.name,
      idcard:options.number,
      liaison_id: options.liaison_id
    })


  },


  panDuanFirst() {
    let {
      name,
      idcard,
      type,
      liaison_id
    } = this.data;

    GetPanDuanFirst({
      user_id: app.globalData.userid,
      type,
      liaison_id,
      realName: name,
      IDCard: idcard
    }).then(res => {
      console.log(res.data.ErrMsg);
      if (res.data.ErrMsg == "请去验证姓名和身份证"){
        this.AddChangeLiaison()
      }else{
        wx.showToast({
          icon:'none',
          title: res.data.ErrMsg,
        })
        wx.navigateBack({
          delta: 1,  // 返回上一级页面。
        })
      }
    })
  },

  text(e) {

    const { ss } = e.target.dataset;
    this.setData({
      [ss]: e.detail.value
    })
  },
  AddChangeLiaison() {
    let {
      name,
      idcard,
      type,
      liaison_id
    } = this.data;

    GetAddChangeLiaison({
      user_id: app.globalData.userid,
      type,
      liaison_id,
      realName: name,
      IDCard:idcard
    }).then(res => {
      let msg = res.data.ErrMsg
      wx.showToast({
        icon: 'none',
        title: msg,
      })
      if (msg.includes('成功')){
        console.log(111)
        wx.navigateBack({
          delta: 1,  // 返回上一级页面。
        })
      }
    })
  },

  sub(){
    this.panDuanFirst();




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