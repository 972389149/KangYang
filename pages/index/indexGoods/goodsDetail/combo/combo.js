// pages/index/indexContent/hotelCommit/combo/combo.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"",
    img: '',
    packName: "",
    price:"",
    content:"",
    packArr:[],
    flag:0,
    count:1,
    id:"",
    packageId:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options)
      this.setData({
        id:options.id,
        price:options.price,
        name: options.name,
        img: app.data.imgUrl+options.img
      })
      this.getPackage()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  getPackage:function(){
    var _this=this
    wx.showLoading({
      title: '正在获取套餐信息'
    })
    wx.request({
      url: app.data.url + 'getPackage',
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
       wx.hideLoading()
      //  console.log(res.data)
       var _data=[]
       _data.push(res.data)
       _this.setData({
         packArr: _data,
         price: _data[0].price,
         packName: _data[0].name,
         content: _data[0].content,
         packageId:_data[0].packageId
       })
     }
     
   })
    // var _data=[{
    //   'name':"套餐一",
    //   "content":"套餐一介绍套餐一介绍套餐一介绍套餐一介绍套餐一介绍",
    //   "packageId":849384,
    //   "price":89
    // },{
    //   'name': "套餐二",
    //   "content": "套餐二介绍套餐二介绍套餐二介绍套餐二介绍套餐二介绍",
    //   "packageId":92403,
    //   "price": 90
    // },{
    //   'name': "套餐三",
    //   "content": "套餐三介绍套餐三介绍套餐三介绍套餐三介绍套餐三介绍",
    //   "packageId":8392,
    //   "price": 100
    //  }]
    //  this.setData({
    //    packArr:_data,
    //    price:_data[0].price,
    //    packName:_data[0].name,
    //    content:_data[0].content
    //  })
  },
  getMess:function(e){
    // console.log(e)
    this.setData({
      flag:e.currentTarget.dataset.indexs,
      price: this.data.packArr[e.currentTarget.dataset.indexs].price,
      packName: this.data.packArr[e.currentTarget.dataset.indexs].name,
      content: this.data.packArr[e.currentTarget.dataset.indexs].content,
      packageId: this.data.packArr[e.currentTarget.dataset.indexs].packageId
    })
  },
  add:function(){
    let count=this.data.count+1
    this.setData({
      count:count
    })
  },
  remove: function () {
    let count=0
    if(this.data.count==1){
       count=1
    }
    else{
      count = this.data.count - 1
    } 
    this.setData({
      count: count
    })
  },
  getBack:function(){
    wx.navigateTo({
      url: '../goodsDetail?count='+this.data.count+"&packName="+this.data.packName+"&id="+this.data.id+"&packageId="+this.data.packageId,
    })
  },
  onPullDownRefresh: function () {
    this.onLoad()
    wx.showToast({
      title: '信息更新成功',
      icon: 'success',
      duration: 1500
    })
    wx.stopPullDownRefresh()
  }
})