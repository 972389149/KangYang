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
    flag_:true,
    flag:true,
    reviewList:[],
    packName:"选择套餐",   //套餐名称
    count:0,              //套餐数量
    productData:{},
    packageId:"",
    isScroll:true,
    hide:false
  },
  onLoad: function (options) {
    this.setData({
      id: options.id,
    })
    console.log(options)
    if(options.packName){
      this.setData({
        packName:options.packName,
        count:options.count,
        packageId:options.packageId
      })
    }   
    this.getReview()
    this.getProduct()
  },
  modalcnt: function () {
    if (this.data.reviewNumber == 0) {
      wx.showToast({
        title: '暂时没有更多的评论！',
        icon: "none"
      })
    }
    else {
      this.setData({
        flag_: false,
        isScroll:false,
        hide:true
      });
    }
  },
  modalclose: function () {
    this.setData({
      flag_: true,
      isScroll:true,
      hide:false
    });
  },
  getReview:function(){
    var _this=this
    wx.showLoading({
      title: '正在获取评论'
    })
    wx.request({
      url: app.data.url + 'reviewList',
      method: 'POST',
      dataType: 'json',
      data: {
        productId: this.data.id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'charset': 'UTF - 8'
      },
      success:function(res){
         console.log(res.data)
         wx.hideLoading(); 
         _this.setData({
           reviewList:res.data,
           reviewNumber:res.data.length
          //  reviewNumber: 10
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
    //   }, {
    //     "username": "啊****",
    //     "content": "本的样式都是一样的，展示出来的却不一样，发生这种情况的根本原因是文字和数字默认的行高不同，找到原因我们就可以解决它了，只要我们指定行高不就行了吗",
    //     "mark": 3,
    //     "time": "2018-04-11"
    //   }, {
    //     "username": "啊****",
    //     "content": "本的样式都是一样的，展示出来的却不一样，发生这种情况的根本原因是文字和数字默认的行高不同，找到原因我们就可以解决它了，只要我们指定行高不就行了吗",
    //     "mark": 3,
    //     "time": "2018-04-11"
    // }]
    //   this.setData({
    //     reviewList:_data
    // })
  },
  getProduct:function(){
    var _this=this
    wx.showLoading({
      title: '正在获取商品信息'
    })
    wx.request({
      url: app.data.url + 'productDetail',
      method: 'POST',
      dataType: 'json',
      data: {
        productId:this.data.id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'charset': 'UTF - 8'
      },
      success:function(res){
       console.log(res.data)
       wx.hideLoading(); 
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
    if(app.data.openId.length==0){
      wx.showToast({
        title: "请先登录",
        icon: "none",
        duration: 1000
      })
      // console.log(1111)
      wx.switchTab ({
        url: '../../../mine/mine',
      })
    }
    else{
      wx.navigateTo({
        url: '../goodsCommit/goodsCommit?goodName=' + this.data.name + "&goodMoney=" + this.data.promotePrice + "&goodType=" + this.data.packName + "&productId=" + this.data.id + "&imgSrc=" + this.data.productSingleImg[0].img + "&goodCount=" + this.data.count + "&packageId=" + this.data.packageId,
      })
    } 
  }
}) 