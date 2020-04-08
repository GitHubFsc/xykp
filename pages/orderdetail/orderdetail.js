// pages/orderdetail/orderdetail.js
import { GetOrderInfo, GetConfirmReceiptProduct } from '../../utils/fpf.js'
import { PostSubmitOrder } from '../../utils/axios.js'
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
    if (app.globalData.userid) {
      this.userNewsInfo(options.orderno)
    } else {
      app.callbackuserid = res => {
        this.userNewsInfo(options.orderno)
      }
    }
  },


  pay(e) {
    let { order_no, combinet } = e.target.dataset;
    this.dpay(order_no, combinet, app.globalData.openid, 98)
  },
  dpay(order, money, openId, configId) {
    console.log(order);
    let msgid = openId; //获得openid
    let moneys = (money * 100).toFixed(2);
    let body = '微信支付'; //品类
    let url = '&body=' + body + '&total_fee=' + Number(moneys) + '&out_trade_no=' + order + '&configId=' + configId + '&trade_type=JSAPI&msgid=' + msgid;
    wx.request({
      url: 'https://pays.zztv021.com/payment/wxpay/wxpay.ashx?action=jspayparam' + url,
      success: (re) => {
        wx.hideLoading()
        wx.requestPayment({
          'timeStamp': re.data.timeStamp,
          'nonceStr': re.data.nonceStr,
          'package': re.data.package,
          'signType': re.data.signType,
          'paySign': re.data.paySign,
          'success': (r) => {
            if (r.errMsg == "requestPayment:ok") {
              wx.showToast({
                title: '支付成功',
                icon: 'none'
              })
              this.userNewsInfo(this.data.list.order_no);
            }
          },
          'fail': (r) => {
            wx.showToast({
              title: '取消支付！',
              icon: 'none'
            })

          }
        });
      }
    });
  },

  userNewsInfo(sd) {
    GetOrderInfo({
      user_id: app.globalData.userid,
      order_no:sd,
    }).then(res => {
      console.log(res);
      this.setData({
        list: res.data.Response
      })
    })
  },


  confirmReceiptProduct(sd) {
    let { type, pagesize, page, currentTab } = this.data;

    GetConfirmReceiptProduct({
      user_id: app.globalData.userid,
      order_no: sd
    }).then(res => {
      console.log(res.data.ErrMsg);
      wx.showToast({
        icon: 'none',
        title: res.data.ErrMsg,
      })
      wx.navigateBack({
        delta: 1,  // 返回上一级页面。
        success: function () {
          console.log('成功！')
        }
      })
    })
  },
  qr(e) {

    this.confirmReceiptProduct(e.currentTarget.dataset.orderno)
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