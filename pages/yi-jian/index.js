// pages/datamanagement/datamanagement.js
import { Rnd, GetFanKuiType, GetSetFreeBack} from '../../utils/fpf.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
   index:0,
   list:'',
   id:'',
   content:'',
   array: ['内容有误', '中国', '巴西', '日本'],
  },
  bindPickerChange: function (e) {
    let i = e.detail.value;
    let id = this.data.list[i].id;
    console.log(id)

    this.setData({
      index: e.detail.value,
      id:id
    })
  },

  text(e){
    console.log();
    this.setData({
      content: e.detail.value
    })
  },

  fanKuiType() {


    GetFanKuiType({
      rnd:Rnd()

    }).then(res => {
      console.log(res.data.Response);
      this.setData({
        list: res.data.Response,
        id:res.data.Response[0].id
      })
    })
  },
  sub(){
    this.setFreeBack()
  },
  setFreeBack() {
    let {
      
      id,
      content
    } = this.data;

    GetSetFreeBack({
      user_id: app.globalData.userid,
      type_id:id,
      content
    }).then(res => {
      console.log(res.data.ErrMsg);
      wx.showToast({
        icon:'none',
        title: res.data.ErrMsg,
        success: function () {
          wx.navigateBack({
            delta: 1,  // 返回上一级页面。
            
          })
        }
      })

      

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fanKuiType();
    
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