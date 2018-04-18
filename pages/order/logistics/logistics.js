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
      url: 'http://apis.baidu.com/kuaidicom/express_api/express_api',
      method: 'get',
      dataType: 'json',
      data: {
        apikey: '',
        nu: that.data.code
      },
      success: function (res) {
        if(res.success){
          that.writeData(res)
        }else{
          wx.showToast({
            title: '获取物流信息失败',
            icon: 'none',
            duration: 2000
          })
          // 关闭模态框
          wx.hideLoading()
        }
      }
    })
  },
  writeData: function(result){
    var that = this
    var orderStatus = '';
    // 信息转换
    switch (result.status) {
      case 0:
        orderStatus = '物流单号暂无结果'
        break
      case 3:
        orderStatus = '在途中'
        break
      case 4:
        orderStatus = '揽件'
        break
      case 5:
        orderStatus = '疑难'
        break
      case 6:
        orderStatus = '签收'
        break
      case 7:
        orderStatus = '退签'
        break
      case 8:
        orderStatus = '派件'
        break
      case 9:
        orderStatus = '退回'
        break
    }
    that.setData({
      type_: result.company,
      status: orderStatus,
    })
    // 数据加工
    for (var i = 0; i < result.data.length; i++) {
      result.data[i].time1 = result.data[i].time.slice(5, 10)
      result.data[i].time2 = result.data[i].time.slice(11, 16)
      result.data[i].on = false
      result.data[i].off = true
      result.data[i].showLine = true
      result.data[i].circleColor = '#c9c9c9'
      if (i == 0) {
        result.data[i].circleColor = '#ff9c00'
        result.data[i].on = true
        result.data[i].off = false
      } else if (i == result.data.length - 1) {
        result.data[i].showLine = false
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

    // 模拟数据
    // var res = {
    //   "success": true,
    //   "reason": "",
    //   "data": [
    //     {
    //       "time": "2016-04-26 00:21:26",
    //       "context": "到潍坊市【潍坊转运中心】"
    //     },
    //     {
    //       "time": "2016-04-25 18:16:34",
    //       "context": "威海市【威海集散仓】，正发往【潍坊转运中心】"
    //     },
    //     {
    //       "time": "2016-04-25 18:15:42",
    //       "context": "到威海市【威海集散仓】"
    //     },
    //     {
    //       "time": "2016-04-25 15:16:00",
    //       "context": "威海市【荣成】，正发往【威海集散仓】"
    //     },
    //     {
    //       "time": "2016-04-25 15:15:27",
    //       "context": "威海市【荣成】，【林波/13863000310】已揽收"
    //     }
    //   ],
    //   "status": 3,
    //   "exname": "huitongkuaidi",
    //   "ico": "http://www.kuaidi.com/data/upload/201407/htky_logo.gif",
    //   "phone": "400-956-5656",
    //   "url": "http://www.800bestex.com",
    //   "nu": "70186506140478",
    //   "company": "百世汇通"
    // }
    // 模拟从api拿到数据后的操作
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