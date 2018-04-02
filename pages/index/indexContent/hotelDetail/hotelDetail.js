// pages/index/indexGoods/hotelDetail/hotelDetail.js
var app = getApp();
const date = new Date()
const years = []
const months = []
const days = []
for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}
for (let i = 1; i <= 12; i++) {
  months.push(i)
}
for (let i = 1; i <= 31; i++) {
  days.push(i)
}
Page({
  data: {
    id: '', //从酒店列表传过来的id
    imgUrls: [
         'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
         'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
         'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    years: years,
    year: date.getFullYear(),
    _year: date.getFullYear(),
    months: months,
    month: 2,
   _month: 2,
    days: days,
    day: 2,
    _day: 2,
    year: date.getFullYear(),
    value: [9999, 1, 1],
    hiddenmodal: true,
    hiddenmodalput: true,
    name:"七天酒店",
    price:300,
    intro:"酒店介绍介绍酒店介绍介绍酒店介绍介绍酒店介绍介绍酒店介绍介绍酒店介绍介绍酒店介绍介绍酒店介绍介绍",
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
      }]
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
  bindChange: function (e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]]
    })
  },
  bindCha: function (e) {
    const val = e.detail.value
    this.setData({
      _year: this.data.years[val[0]],
      _month: this.data.months[val[1]],
      _day: this.data.days[val[2]]
    })
  },
  modalcnt:function(){
    this.setData({
      hiddenmodal: false,
    });
  },
  modalchange:function(){
    this.setData({
      hiddenmodalput: false,
    });
  },
  //取消按钮
  cancel: function () {
    this.setData({
      hiddenmodal: true,
      hiddenmodalput: true
    });
  },
  //确认按钮 
  confirm: function () {
    this.setData({
      hiddenmodal: true,
      hiddenmodalput: true
    })
  }  
}) 