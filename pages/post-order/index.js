import { GetUserAddress, PostSubmitOrder,sign} from '../../utils/axios.js';
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_edit: "block",
    edit_name: "编辑",
    edit_show: "none",
    seend:false,
    okoi:false,
    order:{},
    // list: [],               // 购物车列表
    // hasList: false,          // 列表是否有数据
    // 默认展示数据
    hasList: true,
    old_user_id:0,
    // 商品列表数据
    list: [{
        id: 1,
        title: '园艺大师抗皱精华露',
        image: '../img/xie.png',
        pro_name: "30ml",
        num: 1,
        price: 180,
        selected: true
      },
      {
        id: 2,
        title: '伊芙琳玫瑰护手霜',
        image: '../img/xie.png',
        pro_name: "25g",
        num: 1,
        price: 62,
        selected: true
      }
    ],
    // 金额
    totalPrice: 0, // 总价，初始为0
    // 全选状态
    selectAllStatus: true, // 全选状态，默认全选
    order:{},
    cardid:''
  },
  jump(){
    wx.navigateTo({
      url: '/pages/rec-select/rec-select',
    })
  },
  getAddress(){
    let {order} = this.data;
    GetUserAddress({
      user_id: app.globalData.userid
    }).then(res=>{
      let alist = res.data.Response.map(item=>{
        if(item.is_default==2){
          console.log(order);
          order.address_name = item.recipient;
          order.address_phone = item.phone;
          order.address_id = item.id
        }
        return item;
      })
      this.setData({
        order,
        alist: res.data.Response
      })
    })
  },
  onLoad(){
    // let order = wx.getStorageSync('order');
    // for(let i=0;i<order.product_list.length;i++){
    //   order.product_list[i].pro_spce = JSON.parse(order.product_list[i].pro_spce);
    // }

    // let old = wx.getStorageSync('share');

    // console.log(old)

    // console.log(order)

    
    // if (app.globalData.userid) {
    //   if (old.shopid == order.product_list[0].pro_id) {
    //     this.setData({ order, old_user_id: old.shareid }, () => { this.getAddress() });
    //   } else {
    //     this.setData({ order }, () => { this.getAddress() });
    //   }
    // } else {
    //   app.callbackuserid = res => {
    //     if (old.shopid == order.product_list[0].pro_id) {
    //       this.setData({ order, old_user_id: old.shareid }, () => { this.getAddress() });
    //     } else {
    //       this.setData({ order }, () => { this.getAddress() });
    //     }
    //   }
    // }

  },
  pay(){
    let { order, old_user_id, cardid} = this.data;
    var str = `?user_id=${app.globalData.userid}&old_user_id=${old_user_id}&cardid=${order.cartId}&sign=${sign}&address_id=${order.address_id}`;
    var arr = order.product_list.map(item=>{
      return{
        pro_id: item.pro_id,
        spce_id: item.pro_spce_id,
        number: item.pro_number
      }
    });
    PostSubmitOrder(arr, str).then(res=>{
      console.log(res)
      const { order_no, combinet} = res.data.Response;
      this.dpay(order_no, combinet,app.globalData.openid,98)
    })
  },
  dpay(order, money, openId, configId){
    console.log(order);
    let msgid = openId; //获得openid
    let moneys = (money * 100).toFixed(2);
    let body = '微信支付'; //品类
    let url = '&body=' + body + '&total_fee=' + Number(moneys) + '&out_trade_no=' + order + '&configId=' + configId + '&trade_type=JSAPI&msgid=' + msgid;
    wx.request({
      url: 'https://pays.zztv021.com/payment/wxpay/wxpay.ashx?action=jspayparam' + url,
      success:  (re)=> {
        wx.hideLoading()
        wx.requestPayment({
          'timeStamp': re.data.timeStamp,
          'nonceStr': re.data.nonceStr,
          'package': re.data.package,
          'signType': re.data.signType,
          'paySign': re.data.paySign,
          'success': (r)=>{
            if (r.errMsg == "requestPayment:ok") {
              wx.showToast({
                title: '支付成功',
                icon:'none'
              })
              wx.redirectTo({
                url: '../myorder/myorder?page=3',
              })
            }
          },
          'fail': (r)=> {
            wx.showToast({
              title: '取消支付！',
              icon: 'none'
            })
            wx.redirectTo({
              url: '../myorder/myorder?page=2',
            })
          }
        });
      }
    });
  },
  dook(e){
    let {index} = e.target.dataset;
    console.log(index);

    let { order, alist} = this.data;
    order.address_id = alist[index].id;
    order.address_name=alist[index].recipient;
    order.address_phone = alist[index].phone;
    order.address_address = alist[index].shipping_address_details;
    this.setData({
      order,
      okoi: false,
      seend: true,
    })
  },
  dose(){
    this.setData({
      okoi:true,
    })
  },
  dose2() {
    this.setData({
      okoi: false,
    })
  },
  count_price() {
    // 获取商品列表数据
    let list = this.data.list;
    // 声明一个变量接收数组列表price
    let total = 0;
    // 循环列表得到每个数据
    for (let i = 0; i < list.length; i++) {
      // 判断选中计算价格
      if (list[i].selected) {
        // 所有价格加起来 count_money
        total += list[i].num * list[i].price;
      }
    }
    // 最后赋值到data中渲染到页面
    this.setData({
      list: list,
      totalPrice: total.toFixed(2)
    });
  },
  onShow() {
    let order = wx.getStorageSync('order');
    for (let i = 0; i < order.product_list.length; i++) {
      order.product_list[i].pro_spce = JSON.parse(order.product_list[i].pro_spce);
    }

    let old = wx.getStorageSync('share');

    console.log(old)

    console.log(order)


    if (app.globalData.userid) {
      if (old.shopid == order.product_list[0].pro_id) {
        this.setData({ order, old_user_id: old.shareid }, () => { this.getAddress() });
      } else {
        this.setData({ order }, () => { this.getAddress() });
      }
    } else {
      app.callbackuserid = res => {
        if (old.shopid == order.product_list[0].pro_id) {
          this.setData({ order, old_user_id: old.shareid }, () => { this.getAddress() });
        } else {
          this.setData({ order }, () => { this.getAddress() });
        }
      }
    }
  }
})