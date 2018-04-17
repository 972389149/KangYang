//index.js
//获取应用实例
const app = getApp();
var bmap  = require('bmap-wx.min.js');
var wxMarkerData = [];

Page({
  data: {
    iconLocation: app.data.iconUrl + 'location.png', //地点图标
    searchIcon: app.data.iconUrl + 'headSearch.png', //搜索图标
    shanZhuang: app.data.iconUrl+'homeCon1.png', //山庄图片
    minSu: app.data.iconUrl + 'homeCon2.png', //民宿图片
    jiuDian: app.data.iconUrl + 'HomeCon3.png', //酒店图片
    jiuFang: app.data.iconUrl + 'HomeCon4.png', //酒坊图片
    ak: "lOt3lY6gozyoMqGaEVFDhkKDq0msaiAK", //填写申请到的ak       
    address: '',     //地址
    addressDetail:"",    
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
        address: addre,
        addressDetail: wxMarkerData[0].address
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
    var that = this
    var _data = []
    wx.request({
      url: app.data.url+'lunbo',
      method: 'POST',
      dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'charset': 'UTF - 8'
      },
      success: function(res){
        for(var i=0;i<3;i++){
          _data.push({
            "productId": res.data[i].productId,
            "img": app.data.imgUrl+res.data[i].img
          })
        }
        console.log(res.data)
         that.setData({
            'imgUrls[0].url': _data[0].img,
            'imgUrls[1].url': _data[1].img,
            'imgUrls[2].url': _data[2].img,
            "imgUrls[0].link":"indexContent/hotelDetail/hotelDetail?"+_data[0].productId,
            "imgUrls[1].link": "indexContent/hotelDetail/hotelDetail?" + _data[1].productId,
            "imgUrls[2].link": "indexContent/hotelDetail/hotelDetail?" + _data[2].productId,
          }) 
      }
    })
  },
  tohotelLists: function(e){
    wx.navigateTo({
      url: 'indexContent/indexContent?address=' + this.data.address + '&type_=' + e.target.id + '&detailAddress=' + this.data.addressDetail
    })
  },
  toGoodsMore: function(){
    wx.navigateTo({
      url: 'indexGoods/indexGoods?address=' + this.data.address + '&detailAddress='+this.data.addressDetail
    })
  },
  getGoods:function(){
    var that = this
    wx.request({
      url: app.data.url +'hotProduct',
      method: 'POST',
      dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'charset': 'UTF - 8'
      },
      success: function(res){
        console.log(res.data)
        var _data = []
        for(var i=0 ;i < 8;i++){
          _data.push({
            "name": res.data.product[i].name,
            "img": app.data.imgUrl+res.data.product[i].img,
            "productId": res.data.product[i].productId
          })
        }
        for (var i = 0; i < 8; i++) {
          that.data.goodDatas[i].link = "indexGoods/goodsDetail/goodsDetail?id=" + _data[i].productId;
          that.data.goodDatas[i].name = _data[i].name;
          that.data.goodDatas[i].img = _data[i].img;
        }
        console.log(that.data.goodDatas);
        that.setData({
          goodDatas: that.data.goodDatas
        })
      }
    })
    
    // var _data=[
    // {
    //     "name":"商品A",
    //     "img":"../../img/hotel.jpg",
    //     "productId":"01",
    // },{
    //     "name": "商品B",
    //     "img": "../../img/hotel.jpg",
    //     "productId": "02",
    // },{
    //     "name": "商品C",
    //     "img": "../../img/hotel.jpg",
    //     "productId": "03",
    // },{
    //     "name": "商品D",
    //     "img": "../../img/hotel.jpg",
    //     "productId": "04",
    // }, {
    //     "name": "商品E",
    //     "img": "../../img/hotel.jpg",
    //     "productId": "05",
    // },{
    //     "name": "商品F",
    //     "img": "../../img/hotel.jpg",
    //     "productId": "06",
    // },{
    //     "name": "商品G",
    //     "img": "../../img/hotel.jpg",
    //     "productId": "07",
    // },];
    

  },
  // 下拉刷新
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  }
})
