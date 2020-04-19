// pages/applyForSale/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgArrs:[],
    boolean:false,
    refund:false,
    reason_text:"仅退款",
    reason_reason:"七天无理由退款"
  },
  file(){
    let that = this
    wx.chooseMedia({
      count:9,
      mediaType:['image','video'],
      sourceType:['album','camera'],
      maxDuration:30,
      camera:'back',
      success(res){
        console.log(res);
        let imgArrs = that.data.imgArrs;
        for (let i = 0; i < res.tempFiles.length; i++) {
          let item = res.tempFiles[i];
          imgArrs.push(item.tempFilePath,)
        }
        that.setData({
          imgArrs
        })
      },
      fail(){
        console.log(123);
      }
    })
  },
  preview(e) {
    wx.previewImage({
      current: e.target.dataset.src,
      urls: this.data.imgArrs
    })
  },
  boxdialog(){
    this.setData({
      boolean: false
    })

  },
  boxdialog_bottom() {
    this.setData({
      boolean: true
    })
  },
  refund(e){
    console.log(e);
    this.setData({
      boolean: true
    })
    if(e.currentTarget.dataset.type == "type"){
      this.setData({
        refund: true
      })
    }else{
      this.setData({
        refund: false
      })
    }
  },
  onlytype(e){
    this.setData({
      reason_text: e.target.dataset.text,
      boolean: false
    })
  },
  notOnlytype(e){
    this.setData({
      reason_reason: e.target.dataset.text,
      boolean: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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