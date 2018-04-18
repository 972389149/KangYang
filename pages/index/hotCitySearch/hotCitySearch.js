// pages/index/indexContent/hotCitySearch/hotCitySearch.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showIcon: true, // 用于控制是否显示搜索框的logo
    placeHolder: '输入城市名称' , // 用户控制显示placeholder内容
    type_: '', //用于存储搜索类别
    thisCity_: '', //当前城市
    hotCitys: ['北京', '上海', '广州', '深圳', '武汉', '重庆'], //储存的城市
    city: '', // 已输入的城市
    pageType: ''  //储存页面跳转过来的页面类型：0是酒店，1是商品
  },
  focus: function (e){
    // if (e.detail.value.length==0){
      // this.setData({
      //   showIcon: true
      // })
    // }else{
    //   this.setData({
    //     showIcon: false
    //   })
    // }
    // console.log(e)
    this.setData({
        showIcon: false,
        placeHolder: ''
      })
  },
  blur: function(){
    if (this.data.city.length==0){
      this.setData({
        showIcon: true,
        placeHolder: '输入城市名称'
      })
    }else{
      return 
    }
  },
  selected: function(e){
    this.setData({
      city: e.target.id,
      showIcon: false
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
    // console.log(e.detail.value)
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
      var name = this.data.city
      // 显示效果不好
      this.setData({
        city:name
      })
    }
    // })
    if (this.data.pageType == '0') {
      wx.navigateTo({
        url: '../indexContent/indexContent?address=' + this.data.city + '&type_=' + this.data.type_ + '&detailAddress=暂无当前详细位置信息'
      })
    } else {
      wx.navigateTo({
        url: '../indexGoods/indexGoods?address=' + this.data.city + '&type_=' + this.data.type_ + '&detailAddress=暂无当前详细位置信息'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      thisCity_: options.loca,
      type_: options.searchType,
      pageType: options.pageType
    })
    // ajax请求
    wx.request({
      url: app.data.url + 'hotCityList',
      method: 'POST',
      dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'charset': 'UTF - 8'
      },
      success: function (res) {
        that.setData({
          hotCitys: res.data.hotCityList
        })
      },
      fail: function(err){
        console.log(err);
        that.setData({
          hotCitys: ['北京', '上海', '广州', '深圳', '武汉', '重庆']
        })
      }
    })
    // 从后台拿到的数据
    // this.setData({
    //   hotCitys: ['北京', '上海', '广州', '深圳', '武汉', '重庆']
    // })
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
    console.log(this.data.city)
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