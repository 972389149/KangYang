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
    count: 6, //显示个数
    loca: '', //需要从别的页面传过来的定位城市
    _loca_: '',
    lng1: '',
    lat1: '',
    lng2: '',
    lat2: '',
    distant: [],
    EARTH_RADIUS: 6378137.0,
    location: '暂无当前详细位置信息', //需要从别的页面传来当前位置的详细信息，如果该页面是从搜索页面传过来就默认显示
    continueLoad: true, // 检测是否可以上拉继续刷新
    hotelItems: [],
    hotelItems_: []
    // hotelItems: [{
    //   name:'广州酒店',  // 产品名称
    //   mark: '5.0',   //产品评分
    //   reviewCount: 1520,  //评论人数
    //   distant: 500,   //需要调用第三方api计算出的距离
    //   price: '300-560', //产品价格
    //   id: 1,
    //   url: 'hotelDetail/hotelDetail?id='
    // }]
  },
  toHotCitySearch: function (){
    // console.log(this.data.type_ + '：' + this.data.loca)
    // wx.redirectTo({
    //   url: '../hotCitySearch/hotCitySearch?searchType='+this.data.type_+'&loca='+this.data.loca+'&pageType=0'
    // })
  },
  onPullDownRefresh: function () {
  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var detailAddress;
    if (options.detailAddress.length == 0){
      detailAddress ='暂无当前详细位置信息'
    } else if (options.detailAddress.length >= 15){
      detailAddress = options.detailAddress.slice(0,15)+'...'
    }else{
      detailAddress = options.detailAddress
    }
    // 获取index页面传送的数据
    this.setData({
      loca: options.address, // 城市名
      location: detailAddress, //具体位置
      type_: options.type_,  //类型
      lng1: app.data.lng,
      lat1: app.data.lat
    })
    // console.log(options.address + ":" + options.detailAddress + ":" + options.type_)
    this.getList()
  },
  getList: function(){
    var that = this
    if (that.data.continueLoad){
      wx.request({
        url: app.data.url + 'searchByCity', 
        data: {
          type: that.data.type_,
          location: that.data.loca,
          start: that.data.start,
          count: that.data.count
        },
        method: 'POST',
        dataType: 'json',
        header: {
          'content-type': 'application/x-www-form-urlencoded', // 默认值
          'charset': 'UTF - 8'
        },
        success: function (res) {
          // console.log(res.data.length)
          // console.log(that.data.count)
          // console.log(that.data.continueLoad)
          if (res.data.length < that.data.count) {
            // console.log('关闭加载')
            that.setData({
              continueLoad: false
            })
          }
          var list = res.data
          var list_ = that.data.hotelItems
          var length = that.data.hotelItems.length
          for (var j = 0; j < list.length; j++) {
            list[j].img = app.data.imgUrl + list[j].img
            list[j].url = 'hotelDetail/hotelDetail?id=' + list[j].id
            if (list[j].name.length > 7){
              list[j].name = list[j].name.slice(0,8)+'...'
            }
            // if (list[j].price.length > 7) {
            //   list[j].price = list[j].price.slice(0, 6) + '...'
            // }
            list[j].address = list[j].province + list[j].city + list[j].dizhi

            wx.request({
              url: 'https://api.map.baidu.com/geocoder/v2/',
              method: 'get',
              dataType: 'json',
              data: {
                address: list[j].address,
                output: 'json',
                ak: '7Nf2RZxYoqs9SRGNL11hfuEOVcwlG2ZH'
              },
              success: function (res) {
                if(res.data.status == 0){
                  that.setData({
                    lng2: res.data.result.location.lng,
                    lat2: res.data.result.location.lat
                  })
                  that.data.distant.push(that.mToKm(that.getFlatternDistance(that.data.lat1, that.data.lng1, that.data.lat2, that.data.lng2)))
                  var info = "hotelItems[" + (that.data.distant.length-1)+"].distant"
                  var distant = "hotelItems[" + (that.data.distant.length - 1) + "].url"
                  that.setData({
                    [info]: that.data.distant[that.data.distant.length-1],
                    [distant]: that.data.hotelItems[that.data.distant.length - 1].url + '&distant=' + that.data.distant[that.data.distant.length - 1] + '&lng=' + res.data.result.location.lng+'&lat='+ res.data.result.location.lat
                  })
                }
              }
            })

          }
          for (var i = 0; i < list.length; i++) {
            // console.log(list[i])
            list_[length] = list[i]
            length++
          }
          that.setData({
            hotelItems: list_
          })
          // console.log(that.data.continueLoad)
        }
      })
    }
  },
  mToKm: function(s){
    var s = s/1000
    if(s<0.1){
      s = 0.1
    }
    return s.toFixed(1)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  getFlatternDistance: function (lat1, lng1, lat2, lng2){
    var EARTH_RADIUS = 6378137.0
    var radLat1 = this.getRad(lat1);
    var radLat2 = this.getRad(lat2);

    var a = radLat1 - radLat2;
    var b = this.getRad(lng1) - this.getRad(lng2);

    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000.0;

    return s;  
  },
  getRad: function(d){
    var PI=Math.PI
    return d * PI / 180.0
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    if(that.data.loca.length > 3){
      this.setData({
        _loca_: that.data.loca.slice(0, 2) + '..'
      })
    }else{
      this.setData({
        _loca_: that.data.loca
      })
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
    var that = this
    if(that.data.continueLoad){
      wx.showLoading({
        title: '拼命加载中'
      })
      this.setData({
        start: this.data.start + this.data.count
      })
      this.getList()
      wx.hideLoading();
    }else{
      wx.showToast({
        title: '已无更多内容',
        icon: 'none',
        duration: 2000
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})