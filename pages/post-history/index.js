// pages/post-history/index.js
import {
  Rnd,
  PostSendUserAssess,
  sign
} from '../../utils/axios.js';
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgArrs: [], //加一个图片显示一张
    title: '',
    content: '',
    block: false
  },
  chooseImage() {
    let that = this
    wx.chooseMedia({
      count: 9,
      mediaType: ['image', 'video'],
      sourceType: ['album', 'camera'],
      success(res) {
        // let path = res.tempFiles[0].tempFilePath;
        let imgArrs = that.data.imgArrs;

        if (imgArrs.length > 0) {
          if (res.type != imgArrs[0].type) {
            wx.showToast({
              icon: 'none',
              title: '不支持图片和视频混合上传',
            })
          } else {
            for(let i = 0;i<res.tempFiles.length;i++){
              let item = res.tempFiles[i];
              imgArrs.push({
                src: item.tempFilePath,
                type: res.type
              })
            }
            if (imgArrs.length >= 9) {
              that.setData({
                imgArrs,
                block: true
              })
            } else {
              that.setData({
                imgArrs
              })
            }
          }
        } else {
          if (res.type == "video") {
            console.log("res11",res);
            let path = res.tempFiles[0].tempFilePath;
            imgArrs.push({
              src: path,
              type: res.type
            })
            console.log("imgArrs",imgArrs);
            that.setData({
              imgArrs,
              block: true
            })
          } else {
            console.log("res22",res);
            for(let i = 0;i<res.tempFiles.length;i++){
              let item = res.tempFiles[i];
              imgArrs.push({
                src: item.tempFilePath,
                type: res.type
              })
            }
            console.log("imgArrs",imgArrs);
            if (imgArrs.length >= 9) {
              that.setData({
                imgArrs,
                block: true
              })
            } else {
              that.setData({
                imgArrs
              })
            }
          }
        }


        // if (imgArrs.length > 0){
        //   if (res.type != imgArrs[0].type) {
        //     wx.showToast({
        //       icon:'none',
        //       title: '不支持图片和视频混合上传',
        //     })
        //   } else {
        //     imgArrs.push({
        //       src: path,
        //       type: res.type
        //     })
        //     that.setData({
        //       imgArrs
        //     })
        //   }
        // }else{
        //   imgArrs.push({
        //     src: path,
        //     type: res.type
        //   })
        //   that.setData({
        //     imgArrs
        //   })
        // }
      }
    })
  },


  remove(e) {
    let index = e.target.dataset.index;
    let imgArrs = this.data.imgArrs;
    imgArrs.splice(index, 1);
    this.setData({
      imgArrs,
      block: false
    })
  },
  updata() {
    let {
      imgArrs,
      content,
      title
    } = this.data;
    let len = imgArrs.length;

    let now = [];
    let logflag = false;
    console.log("imgArrs=>updata()",imgArrs)
    if(content){
      if(title){
        if(imgArrs.length>0){
          logflag = true;
        }else{
          wx.showToast({
            title: '请至少上传一份图片或视频',
            icon: 'none'
          })
        }
      }else{
        wx.showToast({
          title: '请完善日志标题',
          icon: 'none'
        })
      }
    }else{
      wx.showToast({
        title: '请完善日志内容',
        icon: 'none'
      })
    }
    if(logflag){
      for (let i = 0; i < len; i++) {
        wx.uploadFile({
          url: 'https://xingyunkepuapi.zztv021.com/api/Lib/PostUploadFile?rnd=' + Rnd() + '&sign=' + sign, //仅为示例，非真实的接口地址
          filePath: imgArrs[i].src,
          name: 'file',
          formData: {
  
          },
          success(res) {
            console.log("res",res);
            
            var p = JSON.parse(res.data);
            if(p.ErrCode == 0){
              now.push(p.Response);
            if (now.length == len) {
              wx.showLoading({
                title: '',
              })
              PostSendUserAssess({
                  img_list: now,
                  title,
                  content,
                },
                '?user_id=' + app.globalData.userid + '&sign=' + sign
              ).then(res2 => {
               
                wx.showToast({
                  title: res2.data.ErrMsg,
                  icon: 'none'
                })
                wx.hideLoading()
                if (res2.data.ErrMsg.includes('成功')) {
                  wx.redirectTo({
                    url: '../history/index',
                  })
                }
              })
            }
            }else{
              wx.showToast({
                title: p.ErrMsg,
                icon: 'none'
              })
            }
            
          }
        })
      }
    }
  },
  inpu(e) {
    let {
      type
    } = e.target.dataset;
    this.setData({
      [type]: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  setId() {
    this.setData({
      user_id: app.globalData.userid,
    })
  },
  onLoad: function (options) {
    if (app.globalData.userid) {
      this.setId()
    } else {
      app.callbackuserid = res => {
        this.setId()
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})