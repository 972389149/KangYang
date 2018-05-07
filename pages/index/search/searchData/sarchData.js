// pages/index/search/searchData/sarchData.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    img: '',
    name: '',
    price: '',
    reviewCount: '',
    mark: '',
    url: '',
    lists: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  console.log(options)
    // this.setData({
    //   lists: options.list
    // })
  this.writeData(JSON.parse(options.list), options.type)
  },
  writeData: function(data,type_){
    for(var i=0;i<data.length;i++){
      data[i].img = app.data.imgUrl + data[i].img
      if(type_ == '0'){
        data[i].url = '../../indexContent/hotelDetail/hotelDetail?id=' + data[i].id
      }else{
        data[i].url = '../../indexGoods/goodsDetail/goodsDetail?id=' + data[i].id
      }
    }
     this.setData({
      lists: data
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
    wx.showLoading({
      title: '拼命加载中...'
    })
    this.onLoad()
    wx.hideLoading()
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