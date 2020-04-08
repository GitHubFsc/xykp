import { GetProductType, GetProductList, Rnd, GetuserCartAdd } from '../../utils/axios.js';
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    option1: [
      { text: '全部商品', value: 0 },
      { text: '新款商品', value: 1 },
      { text: '活动商品', value: 2 }
    ],
    option2: [
      { text: '价格排序', value: 0 },
      { text: '价格从高到低', value: 1 },
      { text: '价格从低到高', value: 2 }
    ],
    columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
    option3: [
      { text: '全部', value: 0 },
      { text: '男性', value: 1 },
      { text: '女性', value: 2 },
      { text: '中性', value: 3 }
    ],
    typeid: -1,
    minPrice: 0,
    maxPrice: 0,
    sort: 0,
    sex: 0,
    pagesize:5,
    page:1,
    total:0,
    list:[]
  },

  inputChange(e){
    console.log(e);
    const type = e.target.dataset.v;
    this.setData({
      [type]: e.detail.value || 0
    })
  },

  jump(e){
    console.log(e);
    let { id } = e.currentTarget.dataset;
    let {userid} = app.globalData

    GetuserCartAdd({
      user_id:userid,
      pro_id:id
    }).then(res=>{
      // console.log(res);
      // wx.showToast({
      //   title: res.data.ErrMsg,
      //   icon:'none'
      // });
      if(res.data.ErrCode==0){
        wx.navigateTo({
          url: '../car/index',
        })
      }else if(res.data.ErrCode==-1){
        wx.navigateTo({
          url: '../ke-pu-chan-pin-xiang-qing/index?id='+id +'&clo=true',
        })
      }
    })
  },

  mor(e){
    let { id } =  e.currentTarget.dataset;
    wx.navigateTo({
      url: '../ke-pu-chan-pin-xiang-qing/index?id='+id,
    })
  },

  onCrimf(){
    this.setData({
      list: [],
      page: 1,
    },()=>{
      this.getData();
    })
  },

  onChange(event) {
    const type = event.target.dataset.v;
    this.setData({
      list: [],
      page: 1,
      [type]:event.detail
    }, () => {
      this.getData();
    })
  },

  ref(){
    let { total, page, pagesize, list} = this.data;
    let num = page*pagesize;

    if(list.length<total){
      this.setData({
        page:page+1
      },()=>{
        this.getData()
      })
    }
  },

  getType() {
    GetProductType({
      rnd: Rnd()
    }).then(res => {
      console.log(res);
      let arr = res.data.Response.map(item=>{
        return {
          text:item.name,
          value:item.id
        }
      })

      arr.unshift({
        text: '全部',
        value: -1
      })

      this.setData({
        option1:arr
      })
    })
  },

  getData(){
    const {typeid,sort,minPrice,maxPrice,sex,pagesize,page} = this.data;
    GetProductList({
      typeid, sort, minPrice, maxPrice, sex, pagesize, page
    }).then(res=>{
      const {list} = this.data;
      list.push(...res.data.Response);
      this.setData({list,total:res.data.Total})
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getType();
    this.getData();
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