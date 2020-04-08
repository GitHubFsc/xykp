// pages/post-bao-ming/index.js
import { GetUserLiaison, GetDeleteLiaison } from '../../utils/axios.js';
const app = getApp()

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    liaison:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({per:options.per.split('-')})
  },
  checkboxChange(e){
    let index = e.target.dataset.index;
    console.log(e);
    let { list} = this.data;
    list[index].check = !list[index].check;
    this.setData({list})
  },
  detele(e) {
    console.log();
    this.DeleteLiaison(e.currentTarget.dataset.liaisonid);
  },

  UserLiaison() {
    var per = this.data.per;

    GetUserLiaison({
      user_id: app.globalData.userid
    }).then(res => {
      let list = res.data.Response.map(item=>{
        let check = false;
        for ( let i =0;i<per.length;i++){
          if (per[i] == item.id){
            check=true;
            per.splice(i,1);
            break;
          }
        }
        return{
          ...item,
          check
        }
      })
      this.setData({
        list,
        userid: app.globalData.userid
      })
    })
  },

  DeleteLiaison(liaisonId1) {
    GetDeleteLiaison({
      user_id: app.globalData.userid,
      liaisonId: liaisonId1
    }).then(res => {
      console.log(res);
      wx.showToast({
        icon: 'none',
        title: res.data.ErrMsg,
      })
      this.UserLiaison()
    })
  },
  seok(){
    let liaison = [];
    let {list} = this.data;

    let o = [];

    for (let key in list) {
      if (list[key].check){
        liaison.push(list[key].id);
        o.push(list[key])
      }
    }

    wx.setStorageSync('liaison', liaison);
    wx.setStorageSync('person', o);

    wx.navigateBack({
      delta: 1
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
  onShow: function (op) {
    if (app.globalData.userid) {
      this.UserLiaison()
    } else {
      app.callbackuserid = res => {
        this.UserLiaison();
      }
    }

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