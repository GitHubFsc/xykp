// pages/idcard/index.js
import { PostCustomActive } from '../../utils/axios.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    datetime:'请选择日期',
    name:'',
    mobile:'',
    number:'',
    info:''
  },
  
  inpu(e){
    let {type} = e.target.dataset;
    this.setData({
      [type]:e.detail.value
    })
  },

  binAc(){
    let datetime = this.data.datetime;
    if (datetime =='请选择日期'){
      wx.showToast({
        title: '请选择日期',
        icon:'none'
      })
    }else{
      this.postAc()
    }
  },

  bindDateChange: function (e) {
    this.setData({
      datetime: e.detail.value
    })
  },

  postAc(){
    let {
      name,
      mobile,
      datetime,
      number,
      info
    } = this.data
    PostCustomActive({
      name,
      mobile,
      datetime,
      number,
      info
    }).then(res=>{
      // wx.showToast({
      //   title: res.data.ErrMsg,
      //   icon: 'none'
      // })
      wx.showModal({
        content: '已收到您的定制信息，我们尽快安排工作人员联系您',
        success (res) {
          if (res.confirm) {
            wx.navigateBack({
              delta: 1
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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