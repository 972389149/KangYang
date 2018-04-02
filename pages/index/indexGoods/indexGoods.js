// pages/index/indexGoods/indexGoods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: '',
    longitude: '',
    type_: '',
    loca: '',
    location: '',
    start: 0, //分页开始
    count: 5, //显示个数
    goodItems: [{
      name: '商品A',  //商品名字
      mark: '5.0分',  //商品评分
      reviewCount: 1520,  //评论人数
      money: '130', //商品价格
      img: '',  //图片地址
      id: 1, //商品id
      url: 'goodsDetail/goodsDetail?id='
    }, {
      name: '商品A',  //商品名字
      mark: '5.0分',  //商品评分
      reviewCount: 1520,  //评论人数
      money: '130', //商品价格
      img: '',  //图片地址
      id: 1, //商品id
      url: 'goodsDetail/goodsDetail?id='
      }, {
        name: '商品A',  //商品名字
        mark: '5.0分',  //商品评分
        reviewCount: 1520,  //评论人数
        money: '130', //商品价格
        img: '',  //图片地址
        id: 1, //商品id
        url: 'goodsDetail/goodsDetail?id='
    }, {
      name: '商品A',  //商品名字
      mark: '5.0分',  //商品评分
      reviewCount: 1520,  //评论人数
      money: '130', //商品价格
      img: '',  //图片地址
      id: 1, //商品id
      url: 'goodsDetail/goodsDetail?id='
      }, {
        name: '商品A',  //商品名字
        mark: '5.0分',  //商品评分
        reviewCount: 1520,  //评论人数
        money: '130', //商品价格
        img: '',  //图片地址
        id: 1, //商品id
        url: 'goodsDetail/goodsDetail?id='
    }]
  },
  toGoodSearch: function () {
    wx.redirectTo({
      url: '../hotCitySearch/hotCitySearch?searchType=A&loca=' + this.data.loca+'&pageType=1'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      loca: options.address,
      location: options.detailAddress
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
      name: '商品A',  //商品名字
      mark: '5.0分',  //商品评分
      reviewCount: 1520,  //评论人数
      money: '130', //商品价格
      img: '',  //图片地址
      id: 1, //商品id
      url: 'goodsDetail/goodsDetail?id='
    }, {
      name: '商品A',  //商品名字
      mark: '5.0分',  //商品评分
      reviewCount: 1520,  //评论人数
      money: '130', //商品价格
      img: '',  //图片地址
      id: 1, //商品id
      url: 'goodsDetail/goodsDetail?id='
      }, {
        name: '商品A',  //商品名字
        mark: '5.0分',  //商品评分
        reviewCount: 1520,  //评论人数
        money: '130', //商品价格
        img: '',  //图片地址
        id: 1, //商品id
        url: 'goodsDetail/goodsDetail?id='
    }, {
      name: '商品A',  //商品名字
      mark: '5.0分',  //商品评分
      reviewCount: 1520,  //评论人数
      money: '130', //商品价格
      img: '',  //图片地址
      id: 1, //商品id
      url: 'goodsDetail/goodsDetail?id='
      }, {
        name: '商品A',  //商品名字
        mark: '5.0分',  //商品评分
        reviewCount: 1520,  //评论人数
        money: '130', //商品价格
        img: '',  //图片地址
        id: 1, //商品id
        url: 'goodsDetail/goodsDetail?id='
      }]
    var list_ = []
    var length = this.data.goodItems.length
    list_ = this.data.goodItems
    for (var i = 0; i < list.length; i++) {
      list[i].url = list[i].url+list[i].id
      list_[length] = list[i]
      length++
    }
    this.setData({
      goodItems: list_
    })
    wx.hideLoading();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})