// pages/index/indexGoods/goodsDetail/goodsDetail.js
var app = getApp()
Page({
  data: {
    id: '', // 商品id
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    price:300,
    name:"七天酒店",
    intro:"酒店介绍酒店介绍酒店介绍酒店介绍酒店介绍酒店介绍酒店介绍酒店介绍",
    evulateNum:90,
    reviewList:[
      {
      "username":"啊****",
      "content":"本的样式都是一样的，展示出来的却不一样，发生这种情况的根本原因是文字和数字默认的行高不同，找到原因我们就可以解决它了，只要我们指定行高不就行了吗",
      "mark":3
    },{
        "username": "啊****",
        "content": "本的样式都是一样的，展示出来的却不一样，发生这种情况的根本原因是文字和数字默认的行高不同，找到原因我们就可以解决它了，只要我们指定行高不就行了吗",
        "mark": 3
    },{
        "username": "啊****",
        "content": "本的样式都是一样的，展示出来的却不一样，发生这种情况的根本原因是文字和数字默认的行高不同，找到原因我们就可以解决它了，只要我们指定行高不就行了吗",
        "mark": 3
    }]
  },
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    // console.log(this.data.id)
  }
}) 