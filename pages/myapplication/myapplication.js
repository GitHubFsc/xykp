import { GetUserActive } from '../../utils/fpf.js'
import { PostSubmitOrder } from '../../utils/axios.js'
const app = getApp()
Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    type:1,
    page: 1,
    pagesize: 10,
    list0: '',
    list1: '',
    list2: '',
    list3: '',
    list4: '',
  },
  onLoad: function (options) {

    var that = this;

    /**
     * 获取当前设备的宽高
     */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });

    if (app.globalData.userid) {
      this.orderList()
    } else {
      app.callbackuserid = res => {
        this.orderList()
      }
    }

    console.log(options.type)
    this.setData({
      currentTab: options.type || options.ctype
    });
    
    

    

  },
  pay(e) {
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
              this.onLoad();
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

  orderList() {
    let { type, pagesize, page } = this.data;

    GetUserActive({
      user_id: app.globalData.userid,
      type,
      page,
      pagesize,
    }).then(res => {
      switch (type) {
        case 1:
          this.setData({
            list0: res.data.Response
          });
          break;
        case 2:
          this.setData({
            list1: res.data.Response
          });
          break;
        case 3:
          this.setData({
            list2: res.data.Response
          });
          break;
        case 4:
          this.setData({
            list3: res.data.Response
          });
          break;
        case 5:
          this.setData({
            list4: res.data.Response
          });
          break;
      }
    })
  },

  //  tab切换逻辑
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
        type: parseInt(e.target.dataset.current) + 1,
      }, () => {
        this.orderList(1)
      })
    }
  },

  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current, type: parseInt(e.detail.current) + 1, }, () => {
      this.orderList(1)
    });

  },
})