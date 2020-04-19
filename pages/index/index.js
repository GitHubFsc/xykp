import {
  Rnd,
  GetKBaseList
} from '../../utils/axios.js';

Page({
  data: {
    markers: [],
    center: [],
    Have_callout :[],
    scalle: 12,
    map: ''
  },
  onLoad: function (options) {
    this.getData()
    this.loac()
  },
  arrange() {
    let no_callout = [];
    let arr =  this.data.Have_callout;
    for(let item in arr){
      arr[item].callout = "";
      no_callout.push(arr[item]);
    }
    console.log("Have_callout", this.data.Have_callout);
    console.log("no_callout", no_callout);
  },
  onReady() {
    this.mapCtx = wx.createMapContext('map');
  },
  //可以监听到地图缩放
  bindregionchange() {
    var markers = this.data.markers;
    this.mapCtx.getScale({
      success: (res) => {
        let sc = res.scale;
        // if (sc > 11) {
        //   for (let i = 0; i < markers.length; i++) {
        //     markers[i].width = 30;
        //     markers[i].height = 30
        //   }
        // } else {
        //   for (let i = 0; i < markers.length; i++) {
        //     markers[i].width = 30;
        //     markers[i].height = 30
        //   }
        // }
        for (let i = 0; i < markers.length; i++) {
          markers[i].width = 30;
          markers[i].height = 30
        }
        this.setData({
          markers
        })
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
      let center = [res.data.Response[0].lat, res.data.Response[1].lng];
      let mark = res.data.Response.map((res) => {
        console.log(res)
        let o = {
          iconPath: "../img/dian.png",
          id: res.id,
          latitude: res.lat,
          longitude: res.lng,
          callout: {
            content: res.title,
            color: '#333',
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
      console.log("1111",mark)
      this.setData({
        markers: mark,
        Have_callout :mark,
        center,
      })
    })
  },
})