// pages/index/indexContent/indexContent.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    locaLogo: app.data.iconUrl+'location.png', //位置logo
    type_: '', //用户点击了产品的类型
    start: 0, //分页开始
    count: 5, //显示个数
    loca: '', //需要从别的页面传过来的定位城市
    location: '暂无当前详细位置信息', //需要从别的页面传来当前位置的详细信息，如果该页面是从搜索页面传过来就默认显示
    hotelItems: [{
      name:'广州酒店',  // 产品名称
      mark: '5.0',   //产品评分
      reviewCount: 1520,  //评论人数
      distant: 500,   //需要调用第三方api计算出的距离
      price: '300-560', //产品价格
      id: 1,
      url: 'hotelDetail/hotelDetail?id='
    }, {
      name: '广州酒店',  // 产品名称
      mark: '5.0',   //产品评分
      reviewCount: 1520,  //评论人数
      distant: 500,   //需要调用第三方api计算出的距离
      price: '300-560', //产品价格
      id: 2,
      url: 'hotelDetail/hotelDetail?id='
    }, {
      name:'广州酒店',  // 产品名称
      mark: '5.0',   //产品评分
      reviewCount: 1520,  //评论人数
      distant: 500,   //需要调用第三方api计算出的距离
      price: '300-560', //产品价格
      id: 3,
      url: 'hotelDetail/hotelDetail?id='
    }, {
      name: '广州酒店',  // 产品名称
      mark: '5.0',   //产品评分
      reviewCount: 1520,  //评论人数
      distant: 500,   //需要调用第三方api计算出的距离
      price: '300-560', //产品价格
      id: 4,
      url: 'hotelDetail/hotelDetail?id='
    }, {
      name: '广州酒店',  // 产品名称
      mark: '5.0',   //产品评分
      reviewCount: 1520,  //评论人数
      distant: 500,   //需要调用第三方api计算出的距离
      price: '300-560', //产品价格
      id: 5,
      url: 'hotelDetail/hotelDetail?id='
    }, {
      name: '广州酒店',  // 产品名称
      mark: '5.0',   //产品评分
      reviewCount: 1520,  //评论人数
      distant: 500,   //需要调用第三方api计算出的距离
      price: '300-560', //产品价格
      id: 5,
      url: 'hotelDetail/hotelDetail?id='
    } ]
  },
  toHotCitySearch: function (){
    console.log(this.data.type_ + '：' + this.data.loca)
    wx.redirectTo({
      url: '../hotCitySearch/hotCitySearch?searchType='+this.data.type_+'&loca='+this.data.loca+'&pageType=0'
    })
  },
  onPullDownRefresh: function () {
  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    // 获取index页面传送的数据
    this.setData({
      loca: options.address, // 城市名
      location: options.detailAddress, //具体位置
      type_: options.type_  //类型
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
    wx.showLoading({
      title: '拼命加载中'
    })
    this.setData({
      start: this.data.start + this.data.count
    })
    console.log(this.data.start)
    // 进行ajax请求
    // 模拟拿到的数据
    var list = [{
      name: '广州酒店',  // 产品名称
      mark: '5.0',   //产品评分
      reviewCount: 1520,  //评论人数
      distant: 500,   //需要调用第三方api计算出的距离
      price: '300-560', //产品价格
      id: 1,
      url: 'hotelDetail/hotelDetail?id='
    }, {
      name: '广州酒店',  // 产品名称
      mark: '5.0',   //产品评分
      reviewCount: 1520,  //评论人数
      distant: 500,   //需要调用第三方api计算出的距离
      price: '300-560', //产品价格
      id: 2,
      url: 'hotelDetail/hotelDetail?id='
      }, {
        name: '广州酒店',  // 产品名称
        mark: '5.0',   //产品评分
        reviewCount: 1520,  //评论人数
        distant: 500,   //需要调用第三方api计算出的距离
        price: '300-560', //产品价格
        id: 3,
        url: 'hotelDetail/hotelDetail?id='
    }, {
      name: '广州酒店',  // 产品名称
      mark: '5.0',   //产品评分
      reviewCount: 1520,  //评论人数
      distant: 500,   //需要调用第三方api计算出的距离
      price: '300-560', //产品价格
      id: 4,
      url: 'hotelDetail/hotelDetail?id='
    }]
    var list_ = []
    var length = this.data.hotelItems.length
    list_ = this.data.hotelItems
    for (var i=0;i<list.length;i++){
      list[i].url = list[i].url+list[i].id
      list_[length]=list[i]
      length++
    }
    this.setData({
      hotelItems: list_
    })
    wx.hideLoading(); 
    console.log(this.data.hotelItems)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})