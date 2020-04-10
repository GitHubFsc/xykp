import {
  Rnd,
  GetKBaseList
} from '../../utils/axios.js';

Page({
  data: {
    markers: [],
    center: [],
    scalle: 12,
    map: ''
  },
  onLoad: function (options) {
    this.getData()
  },

  onReady() {
    this.mapCtx = wx.createMapContext('map');
  },
  bindregionchange() {
    var markers = this.data.markers;



    this.mapCtx.getScale({
      success: (res) => {
        let sc = res.scale;
        // if(sc>15){
        //   for (let i = 0; i < markers.length;i++){
        //     markers[i].width = 50;
        //     markers[i].height = 50
        //   }
        // }else{
        //   for (let i = 0; i < markers.length; i++) {
        //     markers[i].width = 50;
        //     markers[i].height = 50
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
        console.log(res);
        console.log(this.data.center)
        this.data.center[1] = res.longitude
        this.data.center[0] = res.latitude
        this.setData({
          center: this.data.center
        })
      },
    })
  },
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
      let mark = res.data.Response.map((res, i) => {
        let o = {
          iconPath: "../img/dian.png",
          id: i,
          latitude: res.lat,
          longitude: res.lng,
          callout: {
            content: res.title,
            color : '#333',
            display: 'ALWAYS',
            bgColor:'#00000000'
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
      console.log(mark)
      this.setData({
        markers: mark,
        center,
      })
    })
  },
})