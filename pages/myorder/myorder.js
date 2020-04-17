import { GetOrderList, GetConfirmReceiptProduct } from '../../utils/fpf.js'
import { PostSubmitOrder } from '../../utils/axios.js'

const app = getApp()
Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    type:0,
    page:1,
    pagesize:10,
    list0: '',
    list1: '',
    list2: '',
    list3: '',
    list4: '',
  },
  onLoad: function () {

    var that = this;
    var pages = getCurrentPages();
    console.log("全部页面",pages);
    pages.map(item=>{
      console.log("前",--pages.length,"页面",item.route);
    })
    // var prevPage = pages[pages.length - 2].route;
    // console.log("当前页面",curPages);
    // console.log("前1页面",prevPage);
    // console.log("前2页面",pages[pages.length - 3].route);
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

  },
  pay(e) {
    let { order_no, combinet} = e.target.dataset;
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
    let { type, pagesize, page, currentTab} = this.data;
    console.log(" this.data",type, pagesize, page, currentTab)
    GetOrderList({
      user_id: app.globalData.userid,
      type,
      page,
      pagesize,
    }).then(res => {
      console.log("res",res)
      switch (currentTab) {
        case 0:
          this.setData({
            list0: res.data.Response
          });
          break;
        case 1:
          this.setData({
            list1: res.data.Response
          });
          break;
        case 2:
          this.setData({
            list2: res.data.Response
          });
          break;
        case 3:
          this.setData({
            list3: res.data.Response
          });
          break;
        case 4:
          this.setData({
            list4: res.data.Response
          });
          break;
      }
    })
  },
  confirmReceiptProduct(sd) {
    let { type, pagesize, page, currentTab } = this.data;

    GetConfirmReceiptProduct({
      user_id: app.globalData.userid,
      order_no:sd
    }).then(res => {
      console.log(res.data.ErrMsg);
      wx.showToast({
        icon:'none',
        title: res.data.ErrMsg,
      })
      this.onLoad();
    })
  },
  qr(e){
  
    this.confirmReceiptProduct(e.currentTarget.dataset.orderno)
  },
  //  tab切换逻辑
  swichNav: function (e) {
    console.log(e)

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
        type: e.target.dataset.type,
      }, () => {
        this.orderList(1)
      })
    }
  },

  bindChange: function (e) {
    console.log(e)
    let cu = e.detail.current;
    let type = 0;
    switch (cu){
      case 0:
        type = 0;
        break;
      case 1:
        type = 1;
        break;

      case 2:
        type = 2;
        break;

      case 3:
       type = 3;
        break;

      case 4:
        type = 5;
        break;
    }

    var that = this;
    that.setData({ currentTab: e.detail.current, type }, () => {
      this.orderList(1)
    });

  },
})