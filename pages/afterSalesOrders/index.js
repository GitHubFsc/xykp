// pages/afterSalesOrders/index.js
import {
  GetMyApplyForRefunds,
  GetCancelRequest
} from '../../utils/fpf.js'
import {
  PostSubmitOrder
} from '../../utils/axios.js'

const app = getApp()
Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    type: 0,
    page: 1,
    pagesize: 10,
    list0: '',
    list1: '',
    list2: '',
    list3: '',
  },
  onLoad: function () {

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

  },

  orderList() {
    let {
      type,
      pagesize,
      page,
      currentTab
    } = this.data;
    GetMyApplyForRefunds({
      user_id: app.globalData.userid,
      type,
      page,
      pagesize,
    }).then(res => {
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
      }
    })
  },
  CancelRefund(e) {
    GetCancelRequest({
      user_id: app.globalData.userid,
      order_no:e.target.dataset.order_no
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log("res",res);
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
        this.orderList();
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      }
    })
  },
  applyAgain(e){
    wx.navigateTo({
      url: '../applyForSale/index?order_no='+e.target.dataset.order_no,
    })
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
    // console.log(e)
    let cu = e.detail.current;
    let type = 0;
    switch (cu) {
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
    }

    var that = this;
    that.setData({
      currentTab: e.detail.current,
      type
    }, () => {
      this.orderList(1)
    });

  },
})