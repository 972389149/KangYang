//index.js
//获取应用实例
const app = getApp();
var bmap  = require('bmap-wx.min.js');
var wxMarkerData = [];

Page({
  data: {
    ak: "lOt3lY6gozyoMqGaEVFDhkKDq0msaiAK", //填写申请到的ak       
    address: '广州',     //地址    
    imgUrls:[
      {
        link:"",
        url:""
      },{
        link:"",
        url:""
      },{
        link:"",
        url:""
      }
    ],
    goodDatas:[
    {
      name: "",
      img: "",
      link:""
    }, {
      name: "",
      img: "",
      link: ""
    }, {
      name: "",
      img: "",
      link: ""
    }, {
      name: "",
      img: "",
      link: ""
    }, {
      name: "",
      img: "",
      link: ""
    }, {
      name: "",
      img: "",
      link: ""
    }, {
      name: "",
      img: "",
      link: ""
    }],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
  },  
  onLoad: function (options) {
    // console.log("定位");
    var that = this;
    //新建百度地图对象  
    var BMap = new bmap.BMapWX({
      ak: that.data.ak
    });
    var success = function (data) {
      console.log(data)
      wxMarkerData = data.wxMarkerData
      var addre = wxMarkerData[0].address
      var i=addre.indexOf("省")
      var j=addre.indexOf("市")
      addre=addre.substring(i+1,j)
      that.setData({
        address: addre
      });
    }
    var fail = function (data) {
      // console.log(data)
    }
    BMap.regeocoding({
      fail: fail,
      success: success
    });  
    this.getUrl()
    this.getGoods()
  },  
  switch:function(){
    wx.navigateTo({
      url: 'search/search'
    })
  },
  onReachBottom: function () {
    wx.showLoading({
      title: '加载中'
    })
    // wx.hideLoading(); 
  },
  getUrl:function(){
    var _data = [
    {
      "productId":"01",
      "img":"http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg"
    },{
        "productId": "02",
        "img": "http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg"
    },{
        "productId": "03",
        "img": "http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg"
    }];
    // var recImgSrc = ['http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',        'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg','http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'];
    for(var i=0;i<3;i++){
      this.setData({
        'imgUrls[0].url': _data[0].img,
        'imgUrls[1].url': _data[1].img,
        'imgUrls[2].url': _data[2].img,
        "imgUrls[0].link":"indexContent/hotelDetail/hotelDetail?"+_data[0].productId,
        "imgUrls[1].link": "indexContent/hotelDetail/hotelDetail?" + _data[1].productId,
        "imgUrls[2].link": "indexContent/hotelDetail/hotelDetail?" + _data[2].productId,
      }) 
    }
  },
  tohotelLists: function(e){
    wx.navigateTo({
      url: 'indexContent/indexContent?address=' + this.data.address+'&type_='+e.target.id+'&detailAddress=广东工业大学大学...'
    })
  },
  toGoodsMore: function(){
    wx.navigateTo({
      url: 'indexGoods/indexGoods?address=' + this.data.address+'&detailAddress=广东工业大学...'
    })
  },
  getGoods:function(){
    var _data=[
    {
        "name":"商品A",
        "img":"../../img/home.png",
        "productId":"01",
    },{
        "name": "商品B",
        "img": "../../img/home.png",
        "productId": "02",
    },{
        "name": "商品C",
        "img": "../../img/home.png",
        "productId": "03",
    },{
        "name": "商品D",
        "img": "../../img/home.png",
        "productId": "04",
    }, {
        "name": "商品E",
        "img": "../../img/home.png",
        "productId": "05",
    },{
        "name": "商品F",
        "img": "../../img/home.png",
        "productId": "06",
    },{
        "name": "商品G",
        "img": "../../img/home.png",
        "productId": "07",
    },];
    for(var i=0;i<7;i++){
      this.data.goodDatas[i].link = "indexGoods/goodsDetail/goodsDetail?" + _data[i].productId;
    }
    for (var i = 0; i < 7; i++) {
      this.data.goodDatas[i].name = _data[i].name;
    }
    for (var i = 0; i < 7; i++) {
      this.data.goodDatas[i].img = _data[i].img;
    }
    // console.log(this.data.goodDatas);
      this.setData({
        goodDatas: this.data.goodDatas
      })

  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  }
})
