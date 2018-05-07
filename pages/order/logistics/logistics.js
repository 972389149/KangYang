// pages/order/logistics/logistics.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: '', // 订单页面传过来的orderId
    name: '',
    packag: '',
    img: '',
    type_:  '',
    status: '',
    code: '',
    circleColor: '#ff9c00',  //小圆圈的颜色--C9C9C9
    showLine: true, //是否展示竖直线
    res: {} //物流信息

  },
  logistics: function(){
    var that = this
    wx.request({
      url: app.data.url + 'getTrans',
      method: 'post',
      dataType: 'json',
      data: {
        transCode: that.data.code
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'charset': 'UTF - 8'
      },
      success: function (res) {
        // 关闭模态框
        wx.hideLoading()
        if (res.data.desc == '查询成功'){
          that.writeData(res.data.result)
        }else{
          wx.showToast({
            title: '获取物流信息失败',
            icon: 'none',
            duration: 2000
          })
          that.setData({
            type_: '系统繁忙...'
          })
        }
      },
      fail: function(err){
        wx.hideLoading()
        wx.showToast({
          title: '获取物流信息失败',
          icon: 'none',
          duration: 2000
        })
        that.setData({
          type_: '系统繁忙...'
        })
      }
    })
  },
  writeData: function(result){
    var that = this
    that.setData({
      type_: result.com,
      status: '当前'
    })
    // 数据加工
    for (var i = 0; i < result.context.length; i++) {
      result.context[i].time1 = result.context[i].time.slice(5, 10)
      result.context[i].time2 = result.context[i].time.slice(11, 16)
      result.context[i].on = false
      result.context[i].off = true
      result.context[i].showLine = true
      result.context[i].circleColor = '#c9c9c9'

      if (result.context[i].desc.length > 58) {
        result.context[i].desc = result.context[i].desc.slice(0, 58) + '...'
      }

      if (i == 0) {
        result.context[i].circleColor = '#ff9c00'
        result.context[i].on = true
        result.context[i].off = false
      } else if (i == result.context.length - 1) {
        result.context[i].showLine = false
      } else {
        continue
      }
    }
    that.setData({
      res: result
    })
    // 关闭模态框
    wx.hideLoading()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '获取物流信息中...'
    })
    var that = this
    console.log(options)
    // 把productId储存用于获取订单号
    this.setData({
      orderId: options.orderId,
      name: options.name,
      packag: options.package,
      img: options.img
    })

    wx.request({
      url: app.data.url + 'getTransCode',
      method: 'POST',
      dataType: 'json',
      data: {
        orderId:  that.data.orderId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'charset': 'UTF - 8'
      },
      // 向后台请求成功
      success: function (res) {
        that.setData({
          code: res.data.code
        })
        that.logistics()
      },
      fail: function (err) {
        wx.showToast({
          title: '获取物流信息失败',
          icon: 'none',
          duration: 2000
        })
        // 关闭模态框
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
  
  }
})