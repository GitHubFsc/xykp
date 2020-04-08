import { GetProductInfo, GetAddCollection, GetProductInfoOrder, GetAddProductCart } from '../../utils/axios.js';
var WxParse = require('../../wxParse/wxParse.js');

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 1,
    clo: false,
    pro_attribute: '',
    info: {},
  },
  btn_minus() {
    if (this.data.num > 1) {
      this.setData({
        num: this.data.num - 1
      })
    }
  },
  input_num() {

  },
  clo1(e) {
    this.setData({
      clo: true,
      tar: e.target.dataset.tar
    })
  },
  upOrder() {
    let { pro_attribute, num, info } = this.data;
    let o = {}
    for (let key in pro_attribute) {
      for (let j = 0; j < pro_attribute[key].items.length; j++) {
        if (pro_attribute[key].items[j].select) {
          o[pro_attribute[key].name] = pro_attribute[key].items[j].type
        }
      }
    }

    GetProductInfoOrder({
      number: num,
      user_id: app.globalData.userid,
      pro_id: info.id,
      spcevalue: o,
      cardid: ''
    }).then(res => {
      wx.setStorageSync('order', res.data.Response);
      wx.navigateTo({
        url: '../post-order/index',
      })
    })

  },
  clo3() {
    console.log(this.data.pro_attribute)
    var isSelect=0;
    this.data.pro_attribute.forEach(element => {
      element.items.forEach(item=>{
        if(item.select){
          isSelect++
        }
      })
    });
    if(isSelect!=this.data.pro_attribute.length){
      wx.showToast({
        title: '请先选择规格',
        icon:'none'
      })
    }else{
      const { tar } = this.data;
      if (tar == 'now') {
        this.upOrder()
      } else if (tar == 'car'){
        this.upCar()
      }
    }
  
  },
  clo2() {
    this.setData({
      clo: false
    })
  },
  btn_add() {
    this.setData({
      num: this.data.num + 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */

  love() {
    let collection_type = this.data.info.is_love;

    if (collection_type == 1) {
      collection_type = 2;
    } else {
      collection_type = 1;
    }

    GetAddCollection({
      user_id: app.globalData.userid,
      collection_type,
      type: 3,
      pro_id: this.data.info.id
    }).then(res => {
      this.getData(this.data.info.id)
    })
  },
  onLoad: function (options) {
    let shareid = options.shareid;
    let shopid = options.shopid;
    console.log("参数",options);
    if(shopid){
      wx.setStorageSync('share', { shareid, shopid });
    }

    if (app.globalData.userid) {
      this.getData(options.id)
    } else {
      app.callbackuserid = res => {
        this.getData(options.id)
      }
    }
    //跳转到详情直接开启添加购物车
    if(options.clo){
      this.setData({
        clo:options.clo
      })
    }
  },
  getData(pro_id) {
    GetProductInfo({
      user_id: app.globalData.userid,
      pro_id
    }).then(res => {
      let keys = [];
      let obj = JSON.parse(res.data.Response.pro_attribute);

      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          keys.push({
            name: key,
            items: [...obj[key]]
          })
        }
      }

      keys = keys.map(res => {
        let items = [];

        for (let i = 0; i < res.items.length; i++) {
          items.push({
            type: res.items[i],
            select: false
          })
        }
        return {
          name: res.name,
          items
        }
      })

      this.setData({
        info: res.data.Response,
        pro_attribute: keys
      });
      WxParse.wxParse('article', 'html', res.data.Response.pro_recommend, this, 5);
    })
  },

  select(e) {
    const { index, index2 } = e.target.dataset;
    let { pro_attribute } = this.data;

    for (let i = 0; i < pro_attribute[index].items.length; i++) {
      pro_attribute[index].items[i].select = false
    }

    pro_attribute[index].items[index2].select = true;
    this.setData({ pro_attribute })

  },


  upCar (){
    let { pro_attribute, num, info } = this.data;
    let o = {}
    for (let key in pro_attribute) {
      for (let j = 0; j < pro_attribute[key].items.length; j++) {
        if (pro_attribute[key].items[j].select) {
          o[pro_attribute[key].name] = pro_attribute[key].items[j].type
        }
      }
    }

    GetAddProductCart({
      number: num,
      user_id: app.globalData.userid,
      pro_id: info.id,
      spcevalue: o
    }).then(res => {
      wx.showToast({
        title: res.data.ErrMsg,
        icon:'none'
      })
      this.setData({clo:false})
      this.getData(this.data.info.id)
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
    let {info }= this.data;
    return {
      title: info.name,
      path: `/pages/ke-pu-chan-pin-xiang-qing/index?id=${info.id}&shareid=${app.globalData.userid}&shopid=${info.id}`
    }
  }
})