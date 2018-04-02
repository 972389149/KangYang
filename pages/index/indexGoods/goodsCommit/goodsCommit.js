// pages/index/indexGoods/goodsCommit/goodsCommit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodName: '小叮当',
    goodMoney: 500,
    goodType: '套餐A',
    address: '广州大学城',
    goodCount: 1,
    total: 500
  },
  changeGood: function (e) {
    if (e.target.id == 1) {
      var goodA = this.data.goodCount + 1
      var total_ = this.data.goodMoney * goodA
      this.setData({
        goodCount: goodA,
        total: total_
      })
    } else if (e.target.id == 0 && this.data.goodCount > 0) {
      var goodB = this.data.goodCount - 1
      var total_ = this.data.goodMoney * goodB
      this.setData({
        goodCount: goodB,
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