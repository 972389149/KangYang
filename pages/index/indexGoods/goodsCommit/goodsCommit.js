// pages/index/indexGoods/goodsCommit/goodsCommit.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodName: '', //商品名称
    goodMoney: '', //商品金额
    goodType: '', //商品套餐
    address: '点击填写', 
    goodCount: 0, //商品数量
    productId: 0, //商品Id
    packageId: 0, //套餐Id
    imgSrc: '', //图片路径
    total: 0,
    userName: 0,
    telNumber: 0,
    detailAddress: 0,
    commitAgain: false
  },
  changeGood: function (e) {
    if (e.target.id == 1) {
      var goodA = parseInt(this.data.goodCount) + 1
      // var total_ = this.data.goodMoney * goodA
      this.setData({
        goodCount: goodA
      })
      this.getPrice()
    } else if (e.target.id == 0 && this.data.goodCount > 0) {
      var goodB = parseInt(this.data.goodCount) - 1
      // var total_ = this.data.goodMoney * goodB
      this.setData({
        goodCount: goodB
      })
      this.getPrice()
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    // 从商品详情页面传过来的数据
    // 先模拟数据
    this.setData({
      goodName: options.goodName,  
      goodMoney: options.goodMoney,
      goodType: options.goodType,
      packageId: options.packageId,
      productId: options.productId,
      goodCount: options.goodCount,
      imgSrc: app.data.imgUrl + options.imgSrc
    })
    this.getPrice()
  },
  getPrice: function(){
    wx.showLoading({
      title: '获取支付金额...'
    })
    var that = this
    wx.request({
      url: app.data.url + 'productSubmit',
      method: 'POST',
      dataType: 'json',
      data: {
        openid: app.data.openId,
        packageId: that.data.packageId,
        productId: that.data.productId,
        number: that.data.goodCount
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'charset': 'UTF - 8'
      },
      success: function (res) {
        that.setData({
          total: res.data.price
        })
        wx.hideLoading()
      },
      complete: function(){
        wx.hideLoading()
      }
    })
  },
  getAddress: function(){
    var that = this
    wx.chooseAddress({
      success: function (res) {
        that.setData({
          userName: res.userName,
          detailAddress: res.provinceName + res.cityName + res.detailInfo,
          telNumber: res.telNumber,
          address: '点击更改'
        })
      },
      fail: function(){
        wx.showToast({
          title: '获取用户地址信息失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  submitOrder: function(){
    if (this.data.commitAgain){
      wx.showToast({
        title: '您已经提交过该订单',
        icon: 'none',
        duration: 2000
      })
      return 
    }
    wx.showLoading({
      title: '提交订单中'
    })
    var that = this
    if (this.data.total > 0 && this.data.userName != 0 && this.data.telNumber != 0 && this.data.detailAddress != 0){
      wx.request({
        url: app.data.url + 'productOrder',
        method: 'POST',
        dataType: 'json',
        data: {
          openid: app.data.openId,
          productId: that.data.productId,
          user: that.data.userName,
          phone: that.data.telNumber,
          location: that.data.detailAddress,
          price: that.data.total,
          packageId: that.data.packageId,
          number: that.data.goodCount
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded', // 默认值
          'charset': 'UTF - 8'
        },
        success: function (res) {
          if (res.data.success == 1){
            that.setData({
              commitAgain: true
            })
            console.log('提交订单成功')
          }else{
            console.log('提交订单失败')
          }
          wx.hideLoading()
        },
        complete: function () {
          wx.hideLoading()
        }
      })
    }else{
      that.setData({
        userName: 0,
        detailAddress: 0,
        telNumber: 0,
        address: '点击填写'
      })
      wx.showToast({
        title: '请先完善订单信息',
        icon: 'none',
        duration: 2000
      })
    }
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

  }
})