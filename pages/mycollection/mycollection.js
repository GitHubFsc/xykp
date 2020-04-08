import { GetUserCollection } from '../../utils/fpf.js'
const app = getApp()
Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    type:1,
    pagesize:10,
    page:1,
    list0:'',
    list1: '',
    list2: '',
    list3: '',
  },
  onLoad: function () {
    if (app.globalData.userid) {
      this.getcollection()
    } else {
      app.callbackuserid = res => {
        this.getcollection()
      }
    }
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
  },
  getcollection() {
    let { type, pagesize, page} = this.data;

    GetUserCollection({
      user_id: app.globalData.userid,
      type,
      pagesize,
      page,
    }).then(res => {
      switch(type){
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
        type: parseInt(e.target.dataset.current)+1,
      },()=>{
        this.getcollection(1)
      })
    }
  },

  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current, type: parseInt(e.detail.current) + 1, },()=>{
      this.getcollection(1)
    });

  },
})