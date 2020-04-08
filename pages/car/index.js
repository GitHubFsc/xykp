import { GetProductChart, GetDeleteChart, GetEditNum, GetProductInfoOrder } from '../../utils/axios.js'
var app = getApp();
var numbers = 1;
var bool = true;
Page({
  data: {
    show_edit: "block",
    edit_name: "编辑",
    edit_show: "none",
    hasList: true,
    list: [],
    totalPrice: 0, // 总价，初始为0
    selectAllStatus: true, // 全选状态，默认全选
  },
  onLoad() {
    if (app.globalData.userid) {
      this.getData()
    } else {
      app.callbackuserid = res => {
        this.getData()
      }
    }
  },
  pay() {
    wx.showLoading({
      title: '',
    })
    let list = this.data.list;
    let total = [];
    for (let i = 0; i < list.length; i++) {
      if (list[i].selected) {
        total.push(list[i].id);
      }
    }

    var n = 0;
    for (let i = 0; i < list.length; i++) {
      GetEditNum({
        user_id: app.globalData.userid,
        cart_id: list[i].id,
        number: list[i].num
      }).then(q => {
        n += 1;
        if (n == list.length) {
          GetProductInfoOrder({
            number: 0,
            user_id: app.globalData.userid,
            pro_id: 0,
            spcevalue: '',
            cardid: total.join(',')
          }).then(res => {
            wx.setStorageSync('order', res.data.Response);
            wx.navigateTo({
              url: '../post-order/index',
            })
          })
        }
      })
    }



  },
  getData() {
    GetProductChart({
      user_id: app.globalData.userid
    }).then(res => {
      var list = res.data.Response.map(item => {
        var str = item.specesValue;
        str = str.replace(/{/g, "")
        str = str.replace(/"/g, "")
        str = str.replace(/:/g, "")
        str = str.replace(/}/g, "")
        str = str.replace(/,/g, ",")
        return {
          id: item.id,
          pro_id: item.pro_id,
          title: item.pro_name,
          image: item.pro_image,
          pro_name: str,
          num: item.pro_num,
          price: item.pro_price,
          selected: true
        }
      })
      this.setData({ list }, () => { this.count_price() })
    })
  },
  onShow() {
    wx.hideLoading()
  },
  selectList(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var list = that.data.list;
    that.data.selectAllStatus = true;
    list[index].selected = !list[index].selected;
    for (var i = list.length - 1; i >= 0; i--) {
      if (!list[i].selected) {
        that.data.selectAllStatus = false;
        break;
      }
    }
    that.setData({
      list: list,
      selectAllStatus: that.data.selectAllStatus
    })
    that.count_price();
  },
  // 编辑
  btn_edit: function () {
    var that = this;
    if (bool) {
      that.setData({
        edit_show: "block",
        edit_name: "取消",
        show_edit: "none"
      })
      bool = false;
    } else {
      that.setData({
        edit_show: "none",
        edit_name: "编辑",
        show_edit: "block"
      })
      bool = true;
    }

  },
  // 删除
  deletes: function (e) {
    var that = this;
    // 获取索引
    const index = e.currentTarget.dataset.index;
    // 获取商品列表数据
    let list = this.data.list;
    wx.showModal({
      title: '提示',
      content: '确认删除吗',
      success: (res) => {
        if (res.confirm) {
          var n =0;
          for (let i = 0; i < list.length; i++) {
            GetEditNum({
              user_id: app.globalData.userid,
              cart_id: list[i].id,
              number: list[i].num
            }).then(q => {
              n += 1;
              if (n == list.length) {
                GetDeleteChart({
                  user_id: app.globalData.userid,
                  chart_id: list[index].id
                }).then(res2 => {
                  wx.showToast({
                    title: res2.data.ErrMsg,
                    icon: 'none'
                  })
                  this.getData()
                })
              }
            })
          }

        } else {
          console.log(res);
        }
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },

  onUnload(e) {
    this.upNum()
  },
  onHide(e) {
    this.upNum()
  },

  upNum() {
    var list = this.data.list;
    for (let i = 0; i < list.length; i++) {
      GetEditNum({
        user_id: app.globalData.userid,
        cart_id: list[i].id,
        number: list[i].num
      })
    }
  },


  /**
   * 购物车全选事件
   */
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus;
    selectAllStatus = !selectAllStatus;
    let list = this.data.list;
    for (let i = 0; i < list.length; i++) {
      list[i].selected = selectAllStatus;
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      list: list
    });
    this.count_price();
  },

  /**
   * 绑定加数量事件
   */
  btn_add(e) {
    // 获取点击的索引
    const index = e.currentTarget.dataset.index;
    // 获取商品数据
    let list = this.data.list;
    // 获取商品数量
    let num = list[index].num;
    // 点击递增
    num = num + 1;
    this.doNum(num, list[index].id, index)
  },
  doNum(number, cart_id, index) {
    let list = this.data.list;

    list[index].num = number;

    this.setData({ list }, () => { this.count_price() })
  },
  /**
   * 绑定减数量事件
   */
  btn_minus(e) {
    const index = e.currentTarget.dataset.index;
    let list = this.data.list;
    // 获取商品数量
    let num = list[index].num;
    // 判断num小于等于1  return; 点击无效
    if (num <= 1) {
      return false;
    }
    // else  num大于1  点击减按钮  数量--
    num = num - 1;
    this.doNum(num, list[index].id, index)
  },
  input_num(e) {
    let list = this.data.list;
    const index = e.currentTarget.dataset.index;
    const num = e.detail.value;
    this.doNum(num, list[index].id, index)
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




})