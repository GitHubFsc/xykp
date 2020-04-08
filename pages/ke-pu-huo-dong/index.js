// pages/ke-pu-huo-dong/index.js
import { Rnd, GetSearchActive, GetActiveList, GetActiveType } from '../../utils/axios.js';
var app = getApp();
function mar(t,fmt){
  t = new Date(t)
    var o = {
      "M+": t.getMonth() + 1,                 //月份 
      "d+": t.getDate(),                    //日 
      "h+": t.getHours(),                   //小时 
      "m+": t.getMinutes(),                 //分 
      "s+": t.getSeconds(),                 //秒 
      "q+": Math.floor((t.getMonth() + 3) / 3), //季度 
      "S": t.getMilliseconds()             //毫秒 
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (t.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }
    return fmt;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    option1: [
    ],
    typeid: 0,
    pagesize: 4,
    page: 1,
    spagesize: 100,
    s:false,
    spage: 1,
    total:0,
    list:[],
    minPrice: 0,
    maxPrice: 0,
    keywords:'',
    currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
    time: mar(new Date(),'yyyy-MM-dd')
  },
  showPopup() {
    this.setData({ show: true });
  },
  inputChange(e) {
    console.log(e);
    const type = e.target.dataset.v;
    this.setData({
      [type]: e.detail.value || 0
    })
  },

  onCrimf() {
    this.setData({
      list: [],
      page: 1,
    }, () => {
      this.getHome();
    })
  },
  onInput(event) {
    this.setData({
      time: mar(event.detail, 'yyyy-MM-dd'),
      currentDate: event.detail
    });
  },
  onok() {
    this.setData({
      list: [],
      page: 1,
      spage:1,
      show: false,
    }, () => {
      this.getHome();
    })
  },
  onClose() {
    this.setData({ show: false });
  },
  getType() {
    GetActiveType({
      rnd: Rnd()
    }).then(res => {
      console.log(res);
      let arr = res.data.Response.map(item => {
        return {
          text: item.title,
          value: item.id
        }
      })

      arr.unshift({
        text: '全部',
        value: 0
      })

      this.setData({
        option1: arr
      })
    })
  },
  onChange(event) {
    const type = event.target.dataset.v;
    this.setData({
      list: [],
      page: 1,
      [type]: event.detail
    }, () => {
      this.getHome();
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHome();
    this.getType()
  },

  getHome(){
    let { pagesize, page, list, typeid, time, minPrice, maxPrice} = this.data;
    GetActiveList({
      pagesize, page, typeid, time, minPrice, maxPrice
    }).then(res=>{
      list.push(...res.data.Response)
      this.setData({
        total:res.data.Total,
        list
      })
    })
  },

  keyw(e){

    if(e.detail.value==''){
      this.getHome()
      this.setData({
        s:false,
        keywords: e.detail.value,
      })
    }else{
      this.setData({
        keywords: e.detail.value,
      })
    }

    
  },

  sea(){
    let {keywords} = this.data;
    if(keywords==''){
      this.setData({
        list: [],
        page: 1,
        s:false,
        spage: 1
      }, () => {
        this.getHome()
      })
    }else{
      this.setData({
        list: [],
        page: 1,
        s:true,
        spage: 1
      }, () => {
        this.getData()
      })
    }
  },

  getData(){
    let { spagesize, spage, list, keywords } = this.data;
    GetSearchActive({
      keywords,
      pagesize:spagesize,
      page:spage,
    }).then(res=>{
      list.push(...res.data.Response)
      this.setData({
        list,
        total:res.data.Total
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
    let { page, list, total,spage,s} = this.data;
    if(!s){
      if (list.length < total) {
        page += 1;
        this.setData({
          page
        }, () => {
          this.getHome()
        })
      }
    }else{
      if (list.length < total) {
        spage += 1;
        this.setData({
          spage
        }, () => {
          this.getData()
        })
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})