//index.js
//获取应用实例
const app = getApp();
var bmap  = require('bmap-wx.min.js');
var wxMarkerData = [];

Page({
  data: {
    iconLocation: app.data.iconUrl + 'location.png', //地点图标
    searchIcon: app.data.iconUrl + 'headSearch.png', //搜索图标
    shanZhuang: app.data.iconUrl+'hotel.png', //山庄住宿图片
    minSu: app.data.iconUrl + 'organic.png', //有机采摘图片
    jiuDian: app.data.iconUrl + 'diet.png', //膳食餐饮图片
    jiuFang: app.data.iconUrl + 'medicine.png', //中医保健图片
    ak: "lOt3lY6gozyoMqGaEVFDhkKDq0msaiAK", //填写申请到的ak     
    lat: '',
    lng: '',  
    address: '',     //地址
    addressDetail:"",    
    name: '',
    productId: '',
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
      that.setData({
        lng: data.originalData.result.location.lng,
        lat: data.originalData.result.location.lat
      })
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
            "id": res.data[i].productId,
            "img": app.data.imgUrl+res.data[i].img
          })
        }
        // console.log(res.data)
         that.setData({
            'imgUrls[0].url': _data[0].img,
            'imgUrls[1].url': _data[1].img,
            'imgUrls[2].url': _data[2].img,
            "imgUrls[0].link":"indexGoods/goodsDetail/goodsDetail?id="+_data[0].id,
            "imgUrls[1].link": "indexGoods/goodsDetail/goodsDetail?id=" + _data[1].id,
            "imgUrls[2].link": "indexGoods/goodsDetail/goodsDetail?id=" + _data[2].id,
          }) 
      }
    })
  },
  tohotelLists: function(e){
    app.data.lng = this.data.lng
    app.data.lat = this.data.lat
    wx.navigateTo({
      url: 'indexContent/indexContent?address=' + this.data.address + '&type_=' + e.target.id + '&detailAddress=' + this.data.addressDetail
    })
  },
  toGoodsMore: function(){
    // wx.navigateTo({
    //   url: 'indexGoods/indexGoods?address=' + this.data.address + '&detailAddress='+this.data.addressDetail
    // })
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
        // console.log(res.data)
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
        // console.log(that.data.goodDatas);
        that.setData({
          goodDatas: that.data.goodDatas
        })
      }
    })
  },
  toNone:function(){
    wx.navigateTo({
      url: './None/None',
    })
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    this.onLoad()
    wx.showToast({
      title: '信息更新成功',
      icon: 'success',
      duration: 1500
    })
    wx.stopPullDownRefresh()
    // wx.stopPullDownRefresh()
  }
})
