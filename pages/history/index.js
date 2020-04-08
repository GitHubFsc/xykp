// pages/history/index.js
import { GetAlogList } from '../../utils/axios.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pagesize:6,
    page:1,
    total:0
  },
  onPullDownRefresh: function () {
    console.log(1)
  },
  ref(){
    let { page, pagesize, total, tours}=this.data;
    var num=page*pagesize;
    if (tours.length<total){
      page=page+1;
      this.setData({ page }, () => { this.refData()})
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
  },

  refData(){
    let{tours,tours2}=this.data;

    const { pagesize, page } = this.data;
    GetAlogList({
      pagesize, page
    }).then(res => {

      let newtours = res.data.Response;
      tours.push(...newtours);
      this.setData({
        total: res.data.Total,
        tours,
      })
    })

  },  

  getData(){
    const{pagesize,page}=this.data;
    GetAlogList({
      pagesize,page
    }).then(res=>{

      let tours = res.data.Response;
      this.setData({
        total: res.data.Total,
        tours,
      })
      wx.stopPullDownRefresh();
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
    this.getData()
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
  onPullDownRefresh(){
    this.setData({
      page:1,
    },()=>{
      this.getData()
    })
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