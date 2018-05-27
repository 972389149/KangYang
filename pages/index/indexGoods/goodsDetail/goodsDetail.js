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
    hide:false,
    flagtab:false,
    bigPicture:"",
    bigPictureUrl:"",
    showBigPicture:false,
    bigPictureArry:[]
  },
  onLoad: function (options) {
    this.setData({
      id: options.id,
    })
    // console.log(options)
    if(options.packName){
      this.setData({
        packName:options.packName,
        count:options.count,
        packageId:options.packageId,
        flagtab:true
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
         // console.log(res.data)
         wx.hideLoading(); 
         _this.setData({
           reviewList:res.data,
           reviewNumber:res.data.length
          //  reviewNumber: 10
         })
      }
    })
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
       // console.log(res.data)
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
  },
  onPullDownRefresh: function () {
    this.onLoad()
    wx.showToast({
      title: '信息更新成功',
      icon: 'success',
      duration: 1500
    })
    wx.stopPullDownRefresh()
  },
  showBig:function(e){
    // console.log(e)
    this.setData({
      isScroll: false,
      bigPicture:"bigPicture",
      bigPictureUrl:e.currentTarget.dataset.url,
      showBigPicture:true
    })
    var index
    var arry = []
    // console.log(this.data.imgUrls.length)
    for (var i = 0; i < this.data.imgUrls.length; i++) {
      if (this.data.imgUrls[i].img == e.currentTarget.dataset.url) {
        index = i
      }
    }
    for (var i = index; i < this.data.imgUrls.length; i++) {
      arry.push(this.data.imgUrls[i])
    }
    for (var i = 0; i < index; i++) {
      arry.push(this.data.imgUrls[i])
    }
    this.setData({
      isScroll: false,
      bigPicture: "bigPicture",
      bigPictureUrl: this.data.bigPictureUrl,
      showBigPicture: true,
      bigPictureArry: arry
    })     
  },
  closePicture:function(){
    this.setData({
      isScroll: true,
      showBigPicture:false
    }) 
  }
}) 