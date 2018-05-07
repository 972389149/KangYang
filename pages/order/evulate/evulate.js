// pages/order/evulate/evulate.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 传过来的数据
     name:"",
     packag:"",
     productId: "",
    //  openId: "wx3dedb58f5a2cf074",
     openId:app.data.openId,
     orderId:"",

     selectImg:"../../../img/logo/startSelect.png",
     unselectImg:"../../../img/logo/start.png",
     flagA:false,
     flagB: false,
     flagC: false,
     flagD: false,
     flagE: false,
     mark:0,
     evalueData:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //订单页面传过来的参数
    this.setData({
      name: options.name,
      packag: options.package,
      productId:options.productId,
      orderId: options.orderId
    })
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
    wx.showLoading({
      title: '拼命加载中...'
    })
    this.onLoad()
    wx.hideLoading()
    wx.stopPullDownRefresh()
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
  switchToA:function(){
      this.setData({
        flagA:!this.data.flagA
      })
      if (this.data.flagA== false) {
        this.setData({
          flagB:false,
          flagC: false,
          flagD: false,
          flagE: false
        })
      }
   },
  switchToB: function () {
    this.setData({
      flagA: true,
      flagB: !this.data.flagB
    })
    if (this.data.flagB== false) {
      this.setData({
        flagC:false,
        flagD: false,
        flagE: false
      })
    }
  },
  switchToC: function () {
    this.setData({
      flagA: true,
      flagB: true,
      flagC: !this.data.flagC
    })
    if (this.data.flagC == false) {
      this.setData({
        flagD: false,
        flagE: false
      })
    }
  },
  switchToD: function () {  
    this.setData({
      flagA: true,
      flagB: true,
      flagC: true,
      flagD: !this.data.flagD
    })
    if (this.data.flagD == false) {
      this.setData({
        flagE: false
      })
    }
  },
  switchToE: function () {
    this.setData({
      flagA: true,
      flagB: true,
      flagC: true,
      flagD: true,
      flagE: !this.data.flagE
    })
  },
  bindKeyInput: function (e) {
    // console.log(e.detail.value)
    this.setData({
      evalueData:e.detail.value
    })
  },
  submit:function(){
    var count = 0
    if(this.data.flagA){
      count++
    }
    if (this.data.flagB) {
      count++
    }
    if (this.data.flagC) {
      count++
    }
    if (this.data.flagD) {
      count++
    }
    if (this.data.flagE) {
      count++
    }
    this.setData({
      mark:count
    })
    // console.log(this.data.mark)
    // console.log(this.data.evalueData)
    wx.request({
      url: app.data.url + 'addReview',
      method: 'POST',
      dataType: 'json',
      data: {
        productId:this.data.productId,
        openid: app.data.openId,
        content: this.data.evalueData,
        orderId:this.data.orderId,
        mark:this.data.mark
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'charset': 'UTF - 8'
      },
      success:function(res){
          console.log(res.data)
          if(res.data.success == 1){
            wx.switchTab({
              url: '../order'
            })
          }else{
            wx.showToast({
              title: '评论失败！',
              icon: "none"
            })
          }
      }
    })
  }
})
