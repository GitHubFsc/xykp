// pages/orderDetails/index.js
import {
  GetMyApplyForRefundsDetails,
  GetCancelRequest,
  GetExpressList,
  Rnd,
  GetGetExpressOrderNumber
} from '../../utils/fpf.js'
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    order_no: null,
    dialog_box: false,
    select_box: false,
    CourierCompany: "选择快递公司",
    express_no: null,
    orderDetails: null,
    imgArr :[],
    CourierCompanys :[],
    express_id : []
  },

  CourierCompany() {
    this.setData({
      select_box: !this.data.select_box
    })
  },
  CancelRefund() {
    let {
      order_no
    } = this.data;
    GetCancelRequest({
      user_id: app.globalData.userid,
      order_no
    }).then(res => {
      console.log("res",res);
      if(res.data.ErrCode==0){
        wx.redirectTo({
          url: '../afterSalesOrders/index' 
        })
      }
    })
  },
  applyAgain(){
    wx.navigateTo({
      url: '../applyForSale/index?order_no='+this.data.order_no,
    })
  },
  select_box(e) {
    this.setData({
      express_id : e.currentTarget.dataset.id,
      CourierCompany: e.currentTarget.dataset.txt,
      select_box: false
    })
  },
  SingleNumber() {
    this.setData({
      dialog_box: true
    })
    GetExpressList({
      rnd :Rnd()
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log("res",res);
        this.setData({
          CourierCompanys: res.data.Response
        })
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      }
    })
  },
  cancel() {
    this.setData({
      dialog_box: false
    })
  },
  bindKeyInput(e) {
    this.setData({
      SingleNumber: e.detail.value
    })
  },
  submit() {
    this.setData({
      dialog_box: false
    })
    let {order_no,express_id,express_no} = this.data;
    GetGetExpressOrderNumber({
      user_id: app.globalData.userid,
      order_no,
      express_no,
      express_id
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log("res",res);
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      }
    })
  },
  getData(){
    let {
      order_no
    } = this.data;
    GetMyApplyForRefundsDetails({
      user_id: app.globalData.userid,
      order_no
    }).then(res => {
      if (res.data.ErrCode == 0) {
        this.setData({
          orderDetails : res.data.Response,
          imgArr : res.data.Response.refund_voucher.split(",")
        })
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      order_no: options.orderno
    })
    if (app.globalData.userid) {
      this.getData()
    } else {
      app.callbackuserid = res => {
        this.getData()
      }
    }

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