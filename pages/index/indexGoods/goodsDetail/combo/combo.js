// pages/index/indexContent/hotelCommit/combo/combo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"蜂王浆",
    packName: "",
    price:"",
    content:"",
    packArr:[],
    flag:0,
    count:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    var _data=[{
      'name':"套餐一",
      "content":"套餐一介绍套餐一介绍套餐一介绍套餐一介绍套餐一介绍",
      "packageId":849384,
      "price":89
    },{
      'name': "套餐二",
      "content": "套餐二介绍套餐二介绍套餐二介绍套餐二介绍套餐二介绍",
      "packageId":92403,
      "price": 90
    },{
      'name': "套餐三",
      "content": "套餐三介绍套餐三介绍套餐三介绍套餐三介绍套餐三介绍",
      "packageId":8392,
      "price": 100
     }]
     this.setData({
       packArr:_data,
       price:_data[0].price,
       packName:_data[0].name,
       content:_data[0].content
     })
  },
  getMess:function(e){
    // console.log(e)
    this.setData({
      flag:e.currentTarget.dataset.indexs,
      price: this.data.packArr[e.currentTarget.dataset.indexs].price,
      packName: this.data.packArr[e.currentTarget.dataset.indexs].name,
      content: this.data.packArr[e.currentTarget.dataset.indexs].content
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
      url: '../goodsDetail?count='+this.data.count+"&packName="+this.data.packName,
    })
  }
})