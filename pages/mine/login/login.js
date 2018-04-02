// pages/mine/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: '希门吹水',
    codeCon: '获取验证码',
    codeDis: false
  },
  getCode: function(){
    var that = this
    var time = 60
    var time_ = setInterval(function(){
      that.setData({
        codeCon: time+'s 后再试',
        codeDis: true
      })
      --time
      if(time<0){
        that.stopInterval(time_)
      }
    },1000)
  },
  stopInterval: function(e){
    clearInterval(e)
    this.setData({
      codeCon: '获取验证码',
      codeDis: false
    })
  },
  login: function(){
    app.data.loginToMine = true
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      image: options.image,
      nickName: options.nickName
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
    app.data.loginToMine = false
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})