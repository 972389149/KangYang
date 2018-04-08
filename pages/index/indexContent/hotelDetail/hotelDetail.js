// pages/index/indexGoods/hotelDetail/hotelDetail.js
var app = getApp();

Page({
  data: {
    id: '',    //从酒店列表传过来的酒店id
    imgUrls: [
         'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
         'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
         'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    name:"七天酒店",
    price:300,
    intro:"珠海区宝岗大道某某西区(距离某地铁站B出口500米)",
    evulateNum:90,
    reviewList: [
      {
        "username": "啊****",
        "content": "本的样式都是一样的，展示出来的却不一样，发生这种情况的根本原因是文字和数字默认的行高不同，找到原因我们就可以解决它了，只要我们指定行高不就行了吗",
        "mark": 3
      }, {
        "username": "啊****",
        "content": "本的样式都是一样的，展示出来的却不一样，发生这种情况的根本原因是文字和数字默认的行高不同，找到原因我们就可以解决它了，只要我们指定行高不就行了吗",
        "mark": 3
      }, {
        "username": "啊****",
        "content": "本的样式都是一样的，展示出来的却不一样，发生这种情况的根本原因是文字和数字默认的行高不同，找到原因我们就可以解决它了，只要我们指定行高不就行了吗",
        "mark": 3
      }],
      flag:true,
      animationData: "",
      showModalStatus: false,
      imageHeight: 0,
      imageWidth: 0
  },
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    console.log(this.data.id)
  },
  onReachBottom: function () {
    wx.showLoading({
      title: '加载中'
    })
    wx.hideLoading(); 
  },
  modalcnt:function(){
    this.setData({
      flag:false
    });
  },
  modalclose: function () {
    this.setData({
      flag: true
    });
  }
}) 