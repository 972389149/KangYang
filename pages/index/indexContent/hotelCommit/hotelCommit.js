// pages/index/indexContent/hotelCommit/hotelCommit.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotelName: '',
    productId: '',
    hotelId: '',
    hotelMoney: '', //房间金额
    dateIn: '',  //入住日期
    dateOut: '',  //离店日期
    hotelType: '', //酒店类型
    userName: '', //入住人姓名
    phoneNumber: '',  //手机号码
    roomCount: 0, //房间总数量
    total: 0,  //总金额
    controlCommit: false, //控制是否可以点击提交
    commitAgain: false //控制不能多次下单
  },
  changeRoom: function(e){
    var that = this
    if(e.target.id==1){
      var roomA = this.data.roomCount + 1
      // var total_ = this.data.hotelMoney*roomA
      this.setData({
        roomCount: roomA,
        total:total_
      })
    } else if (e.target.id == 0 && this.data.roomCount>0){
      var roomB = this.data.roomCount - 1
      // var total_ = this.data.hotelMoney * roomB
      this.setData({
        roomCount: roomB,
        total: total_
      })
    }
  },
  submitOrder: function(){
    var that = this
    if (this.data.commitAgain){
      wx.showToast({
        title: '您已经提交过该订单',
        icon: 'none',
        duration: 2000
      })
      return 
    }
    if (this.data.controlCommit && this.data.hotelId && this.data.productId  && this.data.userName.length > 1 && this.data.phoneNumber.length == 11){
      wx.showLoading({
        title: '提交订单中...'
      })
      wx.request({
        url: app.data.url + 'hotelOrder',
        method: 'POST',
        data: {
          openid: app.data.openId,
          hotelId: that.data.hotelId,
          dateStart: that.data.dateIn,
          dateEnd: that.data.dateOut,
          productId: that.data.productId,
          user: that.data.userName,
          phone: that.data.phoneNumber,
          price: that.data.total
        },
        dataType: 'json',
        header: {
          'content-type': 'application/x-www-form-urlencoded', // 默认值
          'charset': 'UTF - 8'
        },
        success: function (res) {
          if(res.data.success == 1){
            that.setData({
              commitAgain: true
            })
          }else{
            
          }
          // 关闭模态框
          wx.hideLoading()
          wx.showToast({
            title: '订单提交成功',
            icon: 'none',
            duration: 2000
          })
        },
        complete: function () {
          wx.hideLoading()
        }
      })
    }else{
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none',
        duration: 2000
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.showLoading({
      title: '计算总金额中...'
    })
    // 这里从酒店详情页面传递过来的数据
    this.setData({
      hotelName: options.hotelName,
      hotelMoney: options.hotelMoney,
      hotelId: options.hotelId, //酒店Id
      productId: options.productId, //房型ID
      dateIn: options.dateIn, //2018-01-01的格式
      dateOut: options.dateOut,
      hotelType: options.hotelType,
      imgSrc: app.data.imgUrl+options.imgSrc
    })
    wx.request({
      url: app.data.url + 'hotelSubmit',
      method: 'POST',
      data: {
        openid: app.data.openId,
        hotelId: options.hotelId,
        dateStart: options.dateIn,
        dateEnd: options.dateOut,
        productId: options.productId
      },
      dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'charset': 'UTF - 8'
      },
      success: function (res) {
        that.setData({
          total: res.data.price,
          controlCommit: true
        })
        // 关闭模态框
        wx.hideLoading()
      },
      complete: function () {
        wx.hideLoading()
      }

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
  writeInName: function(e){
    this.setData({
      userName: e.detail.value
    })
  },
  writeInNumber: function (e) {
    this.setData({
      phoneNumber: e.detail.value
    })
  }
})