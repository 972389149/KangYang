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
    imgSrc: "", //酒店图片
    imgBig: false,
    enterName:"请输入姓名",
    enterPhone:"请输入手机号码",
    enterName_: '',
    enterPhone_: '',
    orderId: '',
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
              commitAgain: true,
              orderId: res.data.orderId
            })
            wx.request({
              url: app.data.url + 'prePay',
              data: {
                "openid": app.data.openId,
                "orderId": that.data.orderId
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded',
                'charset': 'UTF - 8'
              },
              method: 'POST',
              success: function (res) {
                // console.log(res.data),
                  wx.requestPayment({
                    timeStamp: res.data.timeStamp,
                    nonceStr: res.data.nonceStr,
                    package: res.data.package,
                    signType: 'MD5',
                    paySign: res.data.paySign,
                    success: function (event) {
                      // success 
                      // console.log(event);
                      wx.showToast({
                        title: '支付成功',
                        icon: 'success',
                        duration: 2000
                      });
                    },
                    fail: function (error) {
                      // fail 
                      // console.log("支付失败")
                      // console.log(error)
                    },
                    complete: function () {
                      // complete 
                      // console.log("pay complete")
                    }
                  });
              }
            })
          }else{
            wx.showToast({
              title: '订单提交失败',
              icon: 'none',
              duration: 2000
            })
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
  imgBig: function(){
    var  that = this
    this.setData({
      enterName_: that.data.enterName,
      enterPhone_: that.data.enterPhone
    })
    this.setData({
      imgBig: true,
      enterName: '',
      enterPhone: '',
    })
  },
  bigImg: function(){
    var that = this
    this.setData({
      imgBig: false,
      enterName: that.data.enterName_,
      enterPhone: that.data.enterPhone_
    })
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
      hotelName: options.hotelName.slice(0,12)+'...',
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
        // openid:"wx3dedb58f5a2cf074",
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
        if(res.data.name != ''){
          that.setData({
            enterName: res.data.name
          })
        }
        if(res.data.phone != ''){
          that.setData({
            enterPhone: res.data.phone
          })
        }
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
    this.onLoad()
    wx.showToast({
      title: '信息更新成功',
      icon: 'success',
      duration: 1500
    })
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