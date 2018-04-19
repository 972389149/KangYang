// pages/order/order.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _login_: false, //检测是否登录
    orderTypeA_: 'innerNav innerNavChose',
    orderTypeB_: 'innerNav',
    orderTypeC_: 'innerNav',
    orderTypeD_: 'innerNav',
    orderTypeE_: 'innerNav',
    _noneOrder_: false,
    showOrders: true,       // 该参数用于判断订单是否为空
    orderItems_: [], // 储存未加工的数据 
    orderItems:[] //存储页面的订单的列表
  },
  // 点击导航栏的函数
  changeNav: function (e) {
    if (app.data.openId.length == 0) {
      return
    }
    switch (e.target.id){
      case "typeA":
        this.setData({
          orderTypeA_: 'innerNav innerNavChose',
          orderTypeB_: 'innerNav',
          orderTypeC_: 'innerNav',
          orderTypeD_: 'innerNav',
          orderTypeE_: 'innerNav'
        })
        app.data.orderType = 'typeA'
        this.changeOrderType('typeA')
        break
      case "typeB":
        this.setData({
          orderTypeA_: 'innerNav',
          orderTypeB_: 'innerNav innerNavChose',
          orderTypeC_: 'innerNav',
          orderTypeD_: 'innerNav',
          orderTypeE_: 'innerNav'
        })
        app.data.orderType = 'typeB'
        this.changeOrderType('typeB')
        break
      case "typeC":
        this.setData({
          orderTypeA_: 'innerNav',
          orderTypeB_: 'innerNav',
          orderTypeC_: 'innerNav innerNavChose',
          orderTypeD_: 'innerNav',
          orderTypeE_: 'innerNav'
        })
        app.data.orderType = 'typeC'
        this.changeOrderType('typeC')
        break
      case "typeD":
        this.setData({
          orderTypeA_: 'innerNav',
          orderTypeB_: 'innerNav',
          orderTypeC_: 'innerNav',
          orderTypeD_: 'innerNav innerNavChose',
          orderTypeE_: 'innerNav'
        })
        app.data.orderType = 'typeD'
        this.changeOrderType('typeD')
        break
      case "typeE":
        this.setData({
          orderTypeA_: 'innerNav',
          orderTypeB_: 'innerNav',
          orderTypeC_: 'innerNav',
          orderTypeD_: 'innerNav',
          orderTypeE_: 'innerNav innerNavChose'
        })
        app.data.orderType = 'typeE'
        this.changeOrderType('typeE')
        break
    }
  },
  writeList: function(list_){
    for (var i = 0; i < list_.length; i++) {
      if (list_[i].type == '0') {
        list_[i].book = true
        list_[i].hotel_ = false
        list_[i].numbers = 1
        list_[i].url = '../index/indexContent/hotelDetail/hotelDetail?id=' + list_[i].productId
        list_[i].long = list_[i].long.slice(2, 10) +' 到 '+ list_[i].long.slice(24,32)
      } else if (list_[i].type == '1') {
        list_[i].book = false
        list_[i].hotel_ = true
        list_[i].url = '../index/indexGoods/goodsDetail/goodsDetail?id=' + list_[i].productId
      }
      list_[i].img = app.data.imgUrl + list_[i].img
      if (list_[i].name.length > 7){
        list_[i].name = list_[i].name.slice(0,7)+'...'
      }
      switch (list_[i].status) {
        case '待支付':
          list_[i].status = '待支付'
          list_[i].shows = true
          list_[i].orderBtn_ = false
          list_[i]._orderBtn = true
          list_[i].orderBtn = false
          list_[i].showWord = false
          break
        case '待配送':
          list_[i].status = '待配送'
          list_[i].shows = true
          list_[i].orderBtn_ = false
          list_[i]._orderBtn = false
          list_[i].orderBtn = false
          list_[i].showWord = true
          break
        case '待确认':
          list_[i].status = '待确认'
          list_[i].shows = true
          list_[i].orderBtn_ = true
          list_[i].orderBtn__ = false
          list_[i].orderBtn___ = true
          list_[i]._orderBtn = false
          list_[i].orderBtn = false
          list_[i].showWord = true
          break
        case '待评价':
          list_[i].status = '待评价'
          list_[i].shows = true
          list_[i].orderBtn_ = true
          list_[i].orderBtn__ = true
          list_[i].orderBtn___ = false
          list_[i]._orderBtn = false
          list_[i].orderBtn = false
          list_[i].showWord = true
          break
        case '已完成':
          list_[i].status = '已完成'
          list_[i].shows = true
          list_[i].orderBtn_ = true
          list_[i].orderBtn__ = false
          list_[i].orderBtn___ = false
          list_[i]._orderBtn = false
          list_[i].orderBtn = true
          list_[i].showWord = false
          break
        case '已删除':
          list_[i].status = '退款'
          list_[i].orderBtn_ = false
          list_[i].orderBtn__ = false
          list_[i].orderBtn___ = false
          list_[i].shows = false
          list_[i].showWord = false
          break
      }
    }
    return list_
  },
  toComfirm: function(e){
    var that = this
    wx.showLoading({
      title: '确认订单中...'
    })
    wx.request({
      url: app.data.url + 'confirmOrder',
      method: 'POST',
      dataType: 'json',
      data: {
        openid: app.data.openId,
        orderId: e.currentTarget.id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'charset': 'UTF - 8'
      },
      // 向后台请求成功
      success: function (res) {
        if(res.data.success == 1){
          that.setData({
            orderItems: []
          })
          if (app.data.ordertype == 'typeA'){
            that.getOrder('all')
          } else if (app.data.ordertype == 'typeC'){
            that.getOrder('waitDelivery')
            that.getOrder('waitConfirm')
            that.getOrder('waitReview')
          }
        }else{
          wx.showToast({
            title: '确认失败',
            icon: 'none',
            duration: 2000
          })
        }
        // 关闭模态框
        wx.hideLoading()
      },
      fail: function (err) {
        console.log(err)
        // 关闭模态框
        wx.hideLoading()
      },
      complete: function(){
        // 关闭模态框
        wx.hideLoading()
      }
    })
  },
  toDetail: function(e){
    wx.navigateTo({
      url: e.currentTarget.id
    })
  },
  toLogin: function(){
    wx.switchTab({
      url: '../mine/mine'
    })
  },
  changeOrderType: function (type){
    var that = this
    switch (type) {
      case 'typeA':
        this.setData({
          orderItems: []
        })
      // 进行ajax请求，获取全部的订单
        that.getOrder('all')
        break
      case 'typeB':
        this.setData({
          orderItems: []
        })
        // 进行ajax请求，获取待支付的订单
        that.getOrder('waitPay')
        break
      case 'typeC':
        this.setData({
          orderItems: []
        })
        // 进行ajax请求，获取已支付的订单
        that.getOrder('waitDelivery')
        // console.log(this.data.orderItems)
        that.getOrder('waitConfirm')
        // console.log(this.data.orderItems)
        that.getOrder('waitReview')
        break
      case 'typeD':  
        this.setData({
          orderItems: []
        })
        // 进行ajax请求，获取完成的订单
        // that.getOrder('waitReview')
        that.getOrder('finish')
        break
      case 'typeE':     
        this.setData({
          orderItems: []
        })
        // 进行ajax请求，获取退款的订单
        that.getOrder('delete')
        break
    }
  },
  // 请求订单信息
  getOrder: function(num){
    // 拉起模态框
    wx.showLoading({
      title: '拼命加载中...'
    })
    var that = this
    wx.request({
      url: app.data.url + 'orderList',
      method: 'POST',
      dataType: 'json',
      data: {
        openid: app.data.openId,
        // start 和 count 需要更改
        start: 0,
        count: 100,
        orderType: num
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'charset': 'UTF - 8'
      },
      // 向后台请求成功
      success: function (res) {
        console.log('获取到：'+ JSON.stringify(res.data))
        var list_ = res.data
        var _list = that.writeList(list_)
        var _list_ = that.data.orderItems
        that.setData({
          orderItems: _list_.concat(_list)
        })
        if (that.data.orderItems.length == 0){
          that.setData({
            _noneOrder_: true
          })
        }else{
          that.setData({
            _noneOrder_: false
          })
        }
        // 关闭模态框
        wx.hideLoading()
      },
      fail: function (err) {
        console.log(err)
        // 关闭模态框
        wx.hideLoading()
      }
    })
  },
  // 订单物流跳转
  toLogistics: function(e){
    console.log(e.currentTarget.id)
    for (var i = 0; i < this.data.orderItems.length; i++) {
      if (e.currentTarget.id == this.data.orderItems[i].orderId) {
        var name = this.data.orderItems[i].name
        var packages = this.data.orderItems[i].packages
        var img = this.data.orderItems[i].img
        break
      }
    }
    wx.navigateTo({
      url: 'logistics/logistics?orderId=' + e.currentTarget.id + '&name=' + name + '&package=' + packages + '&img=' + img
    })
  },
  // 订单评价跳转
  toEvulate: function(e){

    for (var i = 0; i < this.data.orderItems.length;i++){
      if (e.currentTarget.id == this.data.orderItems[i].productId){
        var name = this.data.orderItems[i].name
        var packag = this.data.orderItems[i].packages
        var productId = this.data.orderItems[i].productId
        var orderId = this.data.orderItems[i].orderId
        break
      }
    }
    wx.navigateTo({
      url: 'evulate/evulate?name=' + name + '&package=' + packag + '&productId=' + productId + '&orderId=' + orderId
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    var that = this
    if(app.data.openId.length == 0){
      this.setData({
        _login_: false
      })
    }else{
      this.setData({
        _login_: true
      })
      if(app.data.orderType == undefined){
        app.data.orderType = 'typeA'
      }
      this.changeOrderType(app.data.orderType)
    }
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
  WXPay: function (e) {
    wx.request({
      url: app.data.url + 'prePay',
      data: {
        "openid": app.data.openId,
        "orderId": e.currentTarget.id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'charset': 'UTF - 8'
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data),
          wx.requestPayment({
            timeStamp: res.data.timeStamp,
            nonceStr: res.data.nonceStr,
            package: res.data.package,
            signType: 'MD5',
            paySign: res.data.paySign,
            success: function (event) {
              // success 
              console.log(event);
              wx.showToast({
                title: '支付成功',
                icon: 'success',
                duration: 2000
              });
            },
            fail: function (error) {
              // fail 
              console.log("支付失败")
              console.log(error)
            },
            complete: function () {
              // complete 
              console.log("pay complete")
            }
          });
      }
    })
  }
})