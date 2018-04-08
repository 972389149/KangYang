// pages/order/logistics/logistics.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productId: '', // 订单页面传过来的productId
    name_: '小猪佩奇',
    size_: '10',
    type_:  '',
    status: '',
    circleColor: '#ff9c00',  //小圆圈的颜色--C9C9C9
    showLine: true, //是否展示竖直线
    res: {} //物流信息

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 把productId储存用于获取订单号
    this.setData({
      productId: options.productId
    })
    // 模拟数据
    var res = {
      "success": true,
      "reason": "",
      "data": [
        {
          "time": "2016-04-26 00:21:26",
          "context": "到潍坊市【潍坊转运中心】"
        },
        {
          "time": "2016-04-25 18:16:34",
          "context": "威海市【威海集散仓】，正发往【潍坊转运中心】"
        },
        {
          "time": "2016-04-25 18:15:42",
          "context": "到威海市【威海集散仓】"
        },
        {
          "time": "2016-04-25 15:16:00",
          "context": "威海市【荣成】，正发往【威海集散仓】"
        },
        {
          "time": "2016-04-25 15:15:27",
          "context": "威海市【荣成】，【林波/13863000310】已揽收"
        }
      ],
      "status": 3,
      "exname": "huitongkuaidi",
      "ico": "http://www.kuaidi.com/data/upload/201407/htky_logo.gif",
      "phone": "400-956-5656",
      "url": "http://www.800bestex.com",
      "nu": "70186506140478",
      "company": "百世汇通"
    }
    // 模拟从api拿到数据后的操作
    var that = this 
    var orderStatus = '';
    // 信息转换
    switch(res.status){
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
      type_ : res.company,
      status: orderStatus,
    })
    // 数据加工
    for(var i=0;i<res.data.length;i++){
      res.data[i].time1 = res.data[i].time.slice(5, 10)
      res.data[i].time2 = res.data[i].time.slice(11, 16)
      res.data[i].on = false
      res.data[i].off = true
      res.data[i].showLine = true
      res.data[i].circleColor = '#c9c9c9'
      if ( i == 0 ){
        res.data[i].circleColor = '#ff9c00'
        res.data[i].on = true
        res.data[i].off = false
      } else if (i == res.data.length-1){
        res.data[i].showLine = false
      } else{
        continue
      }
    }
    that.setData({
      res: res
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