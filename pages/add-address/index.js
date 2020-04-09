// pages/add-lxr/index.js
import { GetAddUserAddress, GetAddressInfo } from '../../utils/fpf.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recipient: '',
    phone: '',
    shipping_address: '',
    shipping_address_detail: null,
    address_id: 0,
    region: ['广东省', '广州市', '海珠区'],
    list:''
  },

  /**
   * 生命周期函数--监听页面加载
   */

  
  onLoad: function (options) {

    this.setData({
      // type: options.type,
      address_id: options.address_id
    })

    if (options.address_id!=0) {
      this.addressInfo()
    } else {
      
    }



   
  },
  
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },

  text(e) {

    const { ss } = e.target.dataset;
    this.setData({
      [ss]: e.detail.value
    })
  },

  addressInfo(){
    let {
      address_id
    } = this.data;
    GetAddressInfo({
      user_id: app.globalData.userid,
      address_id
    }).then(res=>{
      console.log(res.data.Response);
      this.setData({
        
        phone: res.data.Response.phone,
  
        region: [res.data.Response.province, res.data.Response.city, res.data.Response.area],
        recipient: res.data.Response.recipient,
        shipping_address: res.data.Response.shipping_address,
        shipping_address_detail: res.data.Response.shipping_address_details
      })
    })
  },
  addUserAddress() {
    let {
      recipient,
      phone,
      shipping_address = null,
      shipping_address_detail,
      region,
      address_id
    } = this.data; 

    GetAddUserAddress({
      user_id: app.globalData.userid,
      recipient,
      phone,
      address_id,
      shipping_address,
      shipping_address_detail,
      province_id: region[0],
      city_id: region[1],
      area_id: region[2],
    }).then(res => {
      console.log(res);
      wx.showToast({
        icon: 'none',
        title: res.data.ErrMsg,
      })
      if (res.data.ErrMsg =='添加成功!'){
        wx.navigateBack({})
      }
    })
  },

  sub() {
    this.addUserAddress();
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