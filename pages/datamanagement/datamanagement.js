// pages/datamanagement/datamanagement.js
import { UpdateuserNews, GetUserNews } from '../../utils/fpf.js'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:'选择出生日期',
    name:'',
    sex:1,
    usersign: '',
    info:''
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  text(e){
 
    const {ss} = e.target.dataset;
    this.setData({
      [ss]: e.detail.value
    }) 
  },
  sex(e){
    console.log(e)
    this.setData({
      sex: e.detail.value
    }) 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userid) {
      this.userNews()
    } else {
      app.callbackuserid = res => {
        this.userNews()
      }
    }
  },

  userNews() {
 
    GetUserNews({
      user_id: app.globalData.userid
     
    }).then(res => {
      console.log(res.data.Response)
      this.setData({
        date: res.data.Response.birthday,
        name: res.data.Response.real_name,
        sex: res.data.Response.sex,
        usersign: res.data.Response.usersign,
        info: res.data.Response.info
      })
      
    })
  },


  upData(){
    let {
      name,
      sex,
      date,
      usersign,
      info
    } = this.data;

    UpdateuserNews({
      user_id: app.globalData.userid,
      name,
      sex: parseInt(sex),
      birthday: date,
      usersign, 
      info
    }).then(res=>{
      console.log(res)
      wx.showToast({
        icon:'none',
        title: res.data.ErrMsg ,
      })
      wx.navigateBack({
        delta: 1,  // 返回上一级页面。
        
      })
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