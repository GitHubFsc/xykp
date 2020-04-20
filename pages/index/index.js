import {
  Rnd,
  GetKBaseList
} from '../../utils/axios.js';

Page({
  data: {
    markers: [],
    center: [],
    scalle: 12,
    map: '',
    Have_callout :[],
    no_callout :[]
  },
  onLoad: function (options) {
    this.getData()
    wx.getLocation({
      success: res => {
        console.log("目前位置坐标",this.data.center)
        this.data.center[1] = res.longitude
        this.data.center[0] = res.latitude
        this.setData({
          center: this.data.center
        })
      },
    })
  },
  arrange() {
    let Havecallout = JSON.parse(JSON.stringify(this.data.markers))
    let nocallout = Havecallout.map(x=>{
      x.callout = "";
      return x;
    })
    this.setData({
      no_callout : nocallout
    })
  },
  onReady() {
    this.mapCtx = wx.createMapContext('map');
  },
  //可以监听到地图缩放
  bindregionchange() {
    var markers = this.data.markers;
    var Have_callout = this.data.Have_callout;
    var no_callout = this.data.no_callout;
    this.mapCtx.getScale({
      success: (res) => {
        let sc = res.scale;
        if (sc > 11) {
          for (let i = 0; i < markers.length; i++) {
            markers[i].width = 30;
            markers[i].height = 30
          }
          this.setData({
            markers : Have_callout
          })
        } else {
          for (let i = 0; i < no_callout.length; i++) {
            no_callout[i].width = 30;
            no_callout[i].height = 30
          }
          this.setData({
            markers : no_callout
          })
        }
      }
    })
  },
  loac() {
    wx.getLocation({
      success: res => {
        console.log(this.data.center)
        this.data.center[1] = res.longitude
        this.data.center[0] = res.latitude
        this.setData({
          center: this.data.center
        })
      },
    })
  },
  //点击进入场馆
  clickmap(e) {
    console.log(e.markerId)
    // const {markers} = this.data;
    // wx.openLocation({
    //   latitude: markers[e.markerId].latitude,
    //   longitude: markers[e.markerId].longitude,
    // })
    wx.navigateTo({
      url: '../home-info/index?id=' + e.markerId,
    })
  },
  getData() {
    GetKBaseList({
      rnd: Rnd()
    }).then(res => {
      let center = [res.data.Response[0].lat, res.data.Response[0].lng];
      let mark = res.data.Response.map((res) => {
        let o = {
          iconPath: "../img/dian.png",
          id: res.id,
          latitude: res.lat,
          longitude: res.lng,
          callout: {
            content: res.title,
            color: '#000000',
            display: 'ALWAYS',
            bgColor: '#00000000'
          },
          // label: {
          //   color: "#000",
          //   fontSize: 12, 
          //   content:res.title,
          //   textAlign:'center',
          //   anchorX:'-50'
          // },
          width: 30,
          // title: res.title,
          height: 30,
        }
        return o
      })
      console.log("mark",mark)
      this.setData({
        markers: mark,
        center,
        Have_callout :mark
      })
      this.arrange();
    })
  },
})