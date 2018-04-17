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
      if (list_[i].types == '0') {
        list_[i].book = true
        list_[i].url = '../index/indexContent/hotelDetail/hotelDetail?id=' + list_[i].productId
      } else if (list_[i].types == '1') {
        list_[i].book = false
        list_[i].url = '../index/indexGoods/goodsDetail/goodsDetail?id=' + list_[i].productId
      }
      switch (list_[i].status) {
        case '1':
          list_[i].status = '待支付'
          list_[i].shows = true
          list_[i].orderBtn_ = false
          list_[i]._orderBtn = true
          list_[i].orderBtn = false
          list_[i].showWord = false
          break
        case '2':
          list_[i].status = '已支付'
          list_[i].shows = true
          list_[i].orderBtn_ = true
          list_[i]._orderBtn = false
          list_[i].orderBtn = false
          list_[i].showWord = true
          break
        case '3':
          list_[i].status = '完成'
          list_[i].shows = true
          list_[i].orderBtn_ = false
          list_[i]._orderBtn = false
          list_[i].orderBtn = true
          list_[i].showWord = false
          break
        case '4':
          list_[i].status = '退款'
          list_[i].shows = false
          list_[i].showWord = false
          break
      }
    }
    return list_
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
          orderItems: [],
          orderItems_: []
        })
      // 进行ajax请求，获取全部的订单
        that.getOrder('all')
        var list_ = that.data.orderItems_
        // var list_ = [{
        //   productId: '1',
        //   orderTime: '2018-3-14',
        //   name: '如家酒店',
        //   price: '500',
        //   numbers: 10,
        //   packages: '大床房',
        //   status: '1',
        //   types: '0',
        //   long:'2018.1.1-1.2',
        //   orderBtn: '',
        //   shows: '',
        //   book: '',
        //   showWord: '',
        //   url: ''
        // }]
        var _list = that.writeList(list_)
        this.setData({
          orderItems: _list
        })
        break
      case 'typeB':
        this.setData({
          orderItems: [],
          orderItems_: []
        })
        // 进行ajax请求，获取待支付的订单
        that.getOrder('waitPay')
        var list_ = that.data.orderItems_
        // var list_ = [{
        //   productId: '1',
        //   orderTime: '2018-3-14',
        //   name: '如家酒店',
        //   price: '500',
        //   numbers: 10,
        //   packages: '大床房',
        //   status: '1',
        //   types: '0',
        //   long: '2018.1.1-1.2',
        //   orderBtn: '',
        //   shows: '',
        //   book: '',
        //   showWord: '',
        //   url: ''
        // }]
        var _list = that.writeList(list_)
        this.setData({
          orderItems: _list
        })
        break
      case 'typeC':
        this.setData({
          orderItems: [],
          orderItems_: []
        })
        // 进行ajax请求，获取已支付的订单
        that.getOrder('waitDelivery')
        var list1_ = that.data.orderItems_
        that.getOrder('waitComfirm')
        var list2_ = that.data.orderItems_
        var list_ = list1_ + list2_
        // var list_ = [{
        //   productId: '1',
        //   orderTime: '2018-3-14',
        //   name: '如家酒店',
        //   price: '500',
        //   numbers: 10,
        //   packages: '小床房',
        //   status: '2',
        //   types: '0',
        //   long: '2018.1.1-1.2',
        //   orderBtn: '',
        //   shows: '',
        //   book: '',
        //   showWord: '',
        //   url: ''
        // }]
        var _list = that.writeList(list_)
        this.setData({
          orderItems: _list
        })
        break
      case 'typeD':
        this.setData({
          orderItems: [],
          orderItems_: []
        })
        // 进行ajax请求，获取完成的订单
        that.getOrder('waitReview')
        var list1_ = that.data.orderItems_
        that.getOrder('finish')
        var list2_ = that.data.orderItems_
        var list_ = list1_ + list2_
        // var list_ = [{
        //   productId: '1',
        //   orderTime: '2018-3-14',
        //   name: '如家酒店',
        //   price: '500',
        //   numbers: 10,
        //   packages: '中床房',
        //   status: '3',
        //   types: '0',
        //   long: '2018.1.1-1.2',
        //   orderBtn: '',
        //   shows: '',
        //   book: '',
        //   showWord: '',
        //   url: ''
        // }]
        var _list = that.writeList(list_)
        this.setData({
          orderItems: _list
        })
        break
      case 'typeE':
        this.setData({
          orderItems: [],
          orderItems_: []
        })
        // 进行ajax请求，获取退款的订单
        that.getOrder('delete')
        var list_ = that.data.orderItems_
        // var list_ = [{
        //   productId: '1',
        //   orderTime: '2018-3-14',
        //   name: '如家酒店',
        //   price: '500',
        //   numbers: 10,
        //   packages: '超大床房',
        //   status: '4',
        //   types: '0',
        //   long: '2018.1.1-1.2',
        //   orderBtn: '',
        //   shows: '',
        //   book: '',
        //   showWord: '',
        //   url: ''
        // }]
        var _list = that.writeList(list_)
        this.setData({
          orderItems: _list
        })
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
        console.log('获取成功')
        that.setData({
          orderItems_: res.data
        })
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
    wx.navigateTo({
      url: 'logistics/logistics?productId=' + e.currentTarget.id
    })
  },
  // 订单评价跳转
  toEvulate: function(e){
    wx.navigateTo({
      url: 'evulate/evulate?productId=' + e.currentTarget.id
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
  
  }
})