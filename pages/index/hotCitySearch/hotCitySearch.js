// pages/index/indexContent/hotCitySearch/hotCitySearch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // showIcon: true,
    type_: '', //用于存储搜索类别
    thisCity_: '', //当前城市
    hotCitys: [], //储存的城市
    city: '', // 已输入的城市
    pageType: ''  //储存页面跳转过来的页面类型：0是酒店，1是商品
  },
  focus: function (e){
    // if (e.detail.value.length==0){
    //   this.setData({
    //     showIcon: true
    //   })
    // }else{
    //   this.setData({
    //     showIcon: false
    //   })
    // }
  },
  selected: function(e){
    this.setData({
      city: e.target.id
    })
    if(this.data.pageType == '0'){
      wx.navigateTo({
        url: '../indexContent/indexContent?address=' + this.data.city + '&type_=' + this.data.type_ + '&detailAddress=暂无当前详细位置信息'
      })
    }else{
      wx.navigateTo({
        url: '../indexGoods/indexGoods?address=' + this.data.city + '&type_=' + this.data.type_ + '&detailAddress=暂无当前详细位置信息'
      })
    }
  },
  writeCity: function(e){
    this.setData({
      city: e.detail.value
    })
  },
  commit: function(){
    if(this.data.city.length>8){
      wx.showToast({
        title: '输入的城市名过长...',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if(this.data.city.length>=4){
      var name = this.data.city.slice(0,3)+'...'
      this.setData({
        city:name
      })
    }
    wx.navigateTo({
      url: '../indexContent/indexContent?address=' + this.data.city + '&type_=' + this.data.type_ + '&detailAddress=暂无当前详细位置信息'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      thisCity_: options.loca,
      type_: options.searchType,
      pageType: options.pageType
    })
    // ajax请求
    // 模拟从后台拿到的数据
    this.setData({
      hotCitys: ['北京', '上海', '广州', '深圳', '武汉', '重庆']
    })
    console.log(this.data.pageType)
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