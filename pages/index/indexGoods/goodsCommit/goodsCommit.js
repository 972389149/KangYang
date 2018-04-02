// pages/index/indexGoods/goodsCommit/goodsCommit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodName: '',
    goodMoney: '',
    goodType: '',
    address: '',
    goodCount: 0,
    imgSrc: '',
    total: 0
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
    // 从商品详情页面传过来的数据
    // 先模拟数据
    this.setData({
      goodName: '六神花露水',
      goodMoney: '25.5',
      goodType: '套餐A',
      address: '广东广州大学城',
      imgSrc: '../../../../img/hotel.jpg',
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})