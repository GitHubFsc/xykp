//index.js
//获取应用实例
import { GetUserNews, GetUserPage} from '../../utils/fpf.js'
import { Getdecryption, GetUserRegister } from '../../utils/axios.js'
const app = getApp()
var it =0;
Page({
  data: {
    info:'',
    isshow:false,
    guanzhuNum:'',
    sign:'',
    fans:'',
    yaoqingCode:'',
    user_name:'',
    vloading:false,
    jifen: '',
    reso:{},
    steps: [
      {
        text: '手机号',
      },
      {
        text: '身份信息',
      },
      {
        text: '完成',
      },
    ],
    active:0
  },
  onLoad(options) {
    console.log(options)
    if (options.yqm) {
      this.setData({ yaoqingCode: options.yqm })
    }
  },

  onShow: function () {
    if (app.globalData.userid) {
      this.getUser()
      this.setData({ isshow: app.globalData.userid ? false : true })
    } else {
      this.setData({ isshow: app.globalData.userid ? false : true })
      app.callbackuserid = res => {
        this.getUser()
        this.setData({ isshow: app.globalData.userid ? false :  true})
      }
    }
  },

  getUser(){
    GetUserNews({
      user_id:app.globalData.userid,
    }).then(res=>{
      console.log(res.data.Response);
      this.setData({
        sign: res.data.Response.usersign,
        user_name: res.data.Response.real_name,
        guanzhuNum: res.data.Response.guanzhuNum,
        fans: res.data.Response.fenshiNum,
        avatar: res.data.Response.avatar,
        jifen: res.data.Response.sign
      })

      app.globalData.yqm = res.data.Response.code
    })
  },
  reg(){
    let {openid}=app.globalData;
    let { reso, mobile, yaoqingCode} = this.data;
    this.setData({ vloading:true})
    let o = {
      ...reso,
      mobile,
      openid,
      yaoqingCode
    }
    console.log(o)
    GetUserRegister(o).then(res=>{
      let user_id = res.data.Response.user_id;
      app.globalData.userid=user_id;

      let url = wx.getStorageSync('url');

      if(url){
        this.getUser();
        this.setData({ isshow: false, vloading: false })
        if (url.includes('index/index') || url.includes('find')){
          wx.switchTab({
            url: '/' + url,
          })
        }else{
          wx.redirectTo({
            url: '/' + url,
          })
        }
       
      }else{
        this.getUser();
        this.setData({ isshow: false, vloading:false })
      }
    })
  },
  setAc() {
    let { active } = this.data;
    if (active == 2) {
      this.reg();
    }
  },
  getPhoneNumber(e) {
    let { code, openid } = app.globalData;
    const { iv, encryptedData } = e.detail;
    let { active } = this.data;
    this.setData({ vloading:true})
    wx.login({
      success: res => {
        Getdecryption({
          decryptio: { iv, encryptedData, code:res.code }
        }).then(res => {
          console.log(res)
          if(res.data.Response.str){
            this.setData({mobile:res.data.Response.str.phoneNumber})
            active++;
            this.setData({
              active,
              vloading:false
            })
          }
        })
      }
    })
  },
  getInfo(e) {
    this.setData({ vloading:true})
    var that = this;
    let { active } = this.data;
    wx.getUserInfo({
      success: (res)=> {
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender 
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country;
        var reso = {
          nick_name: nickName,
          avatar: avatarUrl,
          sex: gender
        }
        active++;
        this.setData({ reso, active, vloading:false})
      }
    })
  }
})
