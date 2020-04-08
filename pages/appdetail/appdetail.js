// pages/appdetail/appdetail.js
import { GetEnrollInfo,GetUserSign } from '../../utils/fpf.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dls:false,
    list:'',
    cid:'',
    enroll_number:'',

    result: ''
  },  
  dls(){
    this.setData({
      dls: true
    })
  },
  pay(e) {
    console.log(e)
    let { order_no, combinet } = e.target.dataset;
    this.dpay(order_no, combinet, app.globalData.openid, 99)
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
              this.orderList(this.data.cid)
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userid) {
      this.orderList(options.cid)
    } else {
      app.callbackuserid = res => {
        this.orderList(options.cid)
      }
    }


    if (this.data.list.enroll_num == this.data.list.term_info){
      this.setData({
        dls:true,
        cid:options.cid
      })
    }else{
      this.setData({
        dls: false,
        cid: options.cid
      })
    }

  },


  orderList(enr) {
    GetEnrollInfo({
      user_id: app.globalData.userid,
      enroll_number:enr,
     
    }).then(res => {
      this.setData({
        list: res.data.Response
      })
    })
  },
  

  getScancode: function () {
    var _this = this;

    wx.scanCode({
      success: (res) => {
        var result = res.result;
        console.log(res)
        GetUserSign({
          active_id:JSON.parse(res.result).active_id,
          user_id: app.globalData.userid,
          enroll_number:this.data.cid,
          sign:"sign"
        }).then(ress=>{
          if(ress.data.ErrCode>0){
            wx.showToast({
              title: ress.data.ErrMsg,
              icon:'none'
            })
          }else{
            wx.showToast({
              title: '签到成功',
            })
          }
        })
        
        _this.setData({
          result: result,

        })
      }
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