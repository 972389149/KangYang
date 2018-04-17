// pages/index/indexGoods/goodsDetail/goodsDetail.js
var app = getApp()
Page({
  data: {
    id: '', // 商品id
    imgUrls: [],
    detailList:[],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,

    originalPrice:0,
    promotePrice:0,
    name:"",
    subTitle:"",
    productSingleImg:"",

    reviewNumber:0,   //总评人数
    flag:true,
    reviewList:[],
    packName:"选择套餐",   //套餐名称
    count:0,              //套餐数量
    productData:{}
  },
  onLoad: function (options) {
    // console.log(options)
    if(options.packName){
      this.setData({
        packName:options.packName
      })
    }
    this.setData({
      id: options.id,
      count:options.count
    })
    // console.log(this.data.id)
    this.getReview()
    this.getProduct()
  },
  modalcnt: function () {
    this.setData({
      flag: false
    });
  },
  modalclose: function () {
    this.setData({
      flag: true
    });
  },
  getReview:function(){
    var _this=this
    wx.request({
      url: app.data.url + 'reviewList',
      method: 'POST',
      dataType: 'json',
      data: {
        productId: 24
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'charset': 'UTF - 8'
      },
      success:function(res){
         console.log(res.data)
         _this.setData({
           reviewList:res.data,
           reviewNumber:res.data.length
         })
      }
    })
    // var _data =[{
    //   "username":"啊****",
    //   "content":"本的样式都是一样的，展示出来的却不一样，发生这种情况的根本原因是文字和数字默认的行高不同，找到原因我们就可以解决它了，只要我们指定行高不就行了吗",
    //   "mark":3,
    //   "time":"2018-04-11"
    //   },{
    //    "username": "啊****",
    //   "content": "本的样式都是一样的，展示出来的却不一样，发生这种情况的根本原因是文字和数字默认的行高不同，找到原因我们就可以解决它了，只要我们指定行高不就行了吗",
    //   "mark": 3,
    //   "time": "2018-04-11"
    //   },{
    //   "username": "啊****",
    //   "content": "本的样式都是一样的，展示出来的却不一样，发生这种情况的根本原因是文字和数字默认的行高不同，找到原因我们就可以解决它了，只要我们指定行高不就行了吗",
    //    "mark": 3,
    //   "time": "2018-04-11"
    // }]
    //   this.setData({
    //     reviewList:_data
    // })
  },
  getProduct:function(){
    var _this=this
    wx.request({
      url: app.data.url + 'productDetail',
      method: 'POST',
      dataType: 'json',
      data: {
        productId:24
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'charset': 'UTF - 8'
      },
      success:function(res){
       console.log(res.data)
       _this.setData({
         productData:res.data
      })
       var _data = _this.data.productData  
       _this.setData({
         imgUrls: _data.productSingleImg,
         detailList:_data.productDetailImg,
         name: _data.name,
         subTitle: _data.subTitle,
         originalPrice: _data.originalPrice,
         promotePrice: _data.promotePrice,
        //  reviewNumber: _data.reviewNumber,
         productSingleImg: _data.productSingleImg
       }) 
     }
    })
    
    // var _data={
    //   'productSingleImg':'', //单独的小图片
    //   'productDetailImg': ['http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    //     'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
    //     'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',],   //详情图片
    //   'name': '蜂王浆',
    //   'subTitle':' 商品介绍商品介绍商品介绍商品介绍商品介绍商品介绍商品介绍商品介绍',     //小标题(商品介绍内容)
    //   'originalPrice': 998,    //原价
    //   'promotePrice': 98,    //现价
    //   'mark':4.3,   //评分
    //   'reviewNumber':100, //总评价数
    // }
  },
  toCommit:function(){
    if (this.data.packName=="选择套餐"){
      wx.showToast({
        title:"请先选择套餐",
        icon:"none",
        duration:1000
      })
      return
    }
    wx.navigateTo({
      url: '../goodsCommit/goodsCommit?goodName=' + this.data.name + "&goodMoney=0&goodType=" + this.data.packName + "&address=广东工业大学&imgSrc=" + this.data.productSingleImg,
    })
  }
}) 