// pages/index/indexContent/hotelCommit/hotelCommit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotelName: '广州四季酒店',
    hotelMoney: 500,
    dateIn: '2018-3-16',
    dateOut: '2018-3-18',
    hotelType: '套餐A',
    userName: '小叮当',
    phoneNumber: '12306',
    roomCount: 1,
    total: 500
  },
  changeRoom: function(e){    
    if(e.target.id==1){
      var roomA = this.data.roomCount + 1
      var total_ = this.data.hotelMoney*roomA
      this.setData({
        roomCount: roomA,
        total:total_
      })
    } else if (e.target.id == 0 && this.data.roomCount>0){
      var roomB = this.data.roomCount - 1
      var total_ = this.data.hotelMoney * roomB
      this.setData({
        roomCount: roomB,
        total: total_
      })
    }
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