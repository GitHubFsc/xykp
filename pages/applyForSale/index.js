// pages/applyForSale/index.js
import {
  GetApplyForRefundsMoney,
  GetRefundReasonList,
} from '../../utils/fpf.js'
import {
  PostApplyForRefunds,
  Rnd
} from '../../utils/axios.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_no: null,
    Money: 0,
    refund_voucher: [],
    boolean: false,
    refund: false,
    reason_text: "仅退款",
    reason_reason: "七天无理由退款",
    refund_type: 1,
    refund_reason_id : 11,
    amount: "",
    refund_instruction: "",
    refundReasonList: []
  },
  file() {
    let that = this
    wx.chooseMedia({
      count: 9,
      mediaType: ['image', 'video'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success(res) {
        console.log(res);
        let refund_voucher = that.data.refund_voucher;
        for (let i = 0; i < res.tempFiles.length; i++) {
          let item = res.tempFiles[i];
          refund_voucher.push({
            "img_url":item.tempFilePath
          })
        }
        that.setData({
          refund_voucher
        })
      },
    })
  },
  preview(e) {
    let urls = this.data.refund_voucher.map((x)=>{
      return x.img_url
    })
    console.log(urls);
    wx.previewImage({
      current: e.target.dataset.src,
      urls: urls
    })
  },
  boxdialog() {
    this.setData({
      boolean: false
    })

  },
  boxdialog_bottom() {
    this.setData({
      boolean: true
    })
  },
  refund(e) {
    console.log(e);
    this.setData({
      boolean: true
    })
    if (e.currentTarget.dataset.type == "type") {
      this.setData({
        refund: true
      })
    } else {
      this.setData({
        refund: false
      })
    }
  },
  onlytype(e) {
    this.setData({
      refund_type: e.target.dataset.id,
      reason_text: e.target.dataset.text,
      boolean: false
    })
  },
  notOnlytype(e) {
    this.setData({
      refund_reason_id: e.target.dataset.id,
      reason_reason: e.target.dataset.text,
      boolean: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      order_no: options.order_no
    })
    if (app.globalData.userid) {
      this.applyForSale()
    } else {
      app.callbackuserid = res => {
        this.applyForSale()
      }
    }
  },
  applyForSale() {
    let {
      order_no
    } = this.data;
    console.log(app.globalData.userid);
    console.log(order_no);
    GetApplyForRefundsMoney({
      user_id: app.globalData.userid,
      order_no
    }).then(res => {
      this.setData({
        Money: res.data.Response.money
      })
      this.RefundReasonList()
    })
  },

  ApplyForRefund() {
    let {
      order_no,
      amount,
      refund_type,
      refund_reason_id,
      refund_instruction,
      refund_voucher
    } = this.data;
    PostApplyForRefunds({
      user_id: app.globalData.userid,
      amount,
      order_no,
      refund_type,
      refund_reason_id,
      refund_instruction,
      refund_voucher
    }).then(res => {  
      wx.redirectTo({
        url: '../afterSalesOrders/index',
      })
    })
  },
  RefundReasonList() {
    GetRefundReasonList({
      rnd: Rnd()
    }).then(res => {
      this.setData({
        refundReasonList: res.data.Response
      })
    })
  },
  refundAmount(e) {
    this.setData({
      amount: e.detail.value
    })
  },
  bindTextAreaBlur(e) {
    this.setData({
      refund_instruction: e.detail.value
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