// pages/history/index.js
import { GetUserDailyList, GetUserGuanZhu, GetUserPage} from '../../utils/axios.js';
var app = getApp()
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    pagesize:6,
    page:1,
    total:0,
    tours:[]
  },
  getData(user_id){
    GetUserPage({
      user_id,
      my_user_id: app.globalData.userid == user_id ? 0 : app.globalData.userid
    }).then(res=>{
      this.setData({info:res.data.Response})
    })
  },
  see() {
    let type = this.data.info.is_status;
    GetUserGuanZhu({
      user_id: app.globalData.userid,
      type,
      guanzhu_id: this.data.info.id
    }).then(res => {
      this.getData(this.data.info.id);
      wx.showToast({
        title: res.data.ErrMsg,
        icon: 'none'
      })
    })
  },


  ref() {
    let { page, pagesize, total, tours } = this.data;
    var num = page * pagesize;
    if (tours.length < total) {
      page = page + 1;
      this.setData({ page }, () => { this.refData() })
    }
  },
  refData() {
    let { tours, tours2,  user_id } = this.data;

    const { pagesize, page } = this.data;
    GetUserDailyList({
      pagesize, page, user_id: user_id
    }).then(res => {

      let newtours = res.data.Response;
      tours.push(...newtours);
      this.setData({
        total: res.data.Total,
        tours,
      })
    })

  },

  getList(user_id) {
    const { pagesize, page } = this.data;
    GetUserDailyList({
      pagesize, page, user_id: user_id
    }).then(res => {

      let tours = res.data.Response;
      this.setData({
        total: res.data.Total,
        tours,
      })
      wx.stopPullDownRefresh();
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    if (app.globalData.userid) {
      this.getData(app.globalData.userid)
      this.getList(app.globalData.userid)

    } else {
      app.callbackuserid = res => {
        this.getData(app.globalData.userid)
        this.getList(app.globalData.userid)
  
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
    this.ref()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})