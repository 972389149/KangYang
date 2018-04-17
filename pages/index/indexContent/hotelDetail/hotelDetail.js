// pages/index/indexGoods/hotelDetail/hotelDetail.js
var app = getApp();
Page({
  data: {
    id: '',    //从酒店列表传过来的酒店id
    //hotelImg
    imgUrls: [
         'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
         'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
         'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    name:"七天酒店",
    location:"珠海区宝岗大道某某西区(距离某地铁站B出口500米)",
    distance:1.1,
    mark:4.3,
    evulateNum:90,
    reviewList: [],
    flag:true,
    animationData: "",
    showModalStatus: false,
    imageHeight: 0,
    imageWidth: 0,

    dayIn:"",
    monthIn:"",
    dayOut:"",
    monthOut:"",
    _flag:false,

    roomList:[]   //订房品种数组信息
  },
  onLoad: function (options) {
    // console.log(options)
    var now=new Date()
    var day=now.getDate()
    var month=now.getMonth()+1
    if(options.dayIn&&!options.dayOut){
      this.setData({
        dayIn:options.dayIn,
        monthIn:options.monthIn,
        dayOut: day,
        monthOut: month,
        _flag:true
      })
      this.getRoom()
    }
    else if (options.dayIn && options.dayOut!='undefined'){
      this.setData({
        dayIn: options.dayIn,
        monthIn: options.monthIn,
        dayOut: options.dayOut,
        monthOut: options.monthOut,
        _flag: true
      })
      this.getRoom()
    }
    else if (options.dayIn && options.dayOut == 'undefined') {
      this.setData({
        dayIn: options.dayIn,
        monthIn: options.monthIn,
        dayOut: day,
        monthOut: month,
        _flag: true
      })
      this.getRoom()
    }
    else{
      this.setData({
        dayIn: day,
        monthIn:month,
        dayOut: day,
        monthOut: month
      })
      this.getRoom()
    }
    // console.log(this.data.id)
    this.getHotelDetail()
    this.getReview()
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
  },

  //获取酒店详情
  getHotelDetail:function(){
    var _this = this
    wx.request({
      url: app.data.url + 'hotelDetail',
      method: 'POST',
      data:{
        hotelId:18
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'charset': 'UTF - 8'
      },
      success:function(res){
        console.log(res.data)
        var _data = res.data
        _this.setData({
          name:_data.name,
          mark:_data.mark,
          location:_data.location
        })
      }
    })
  },
  toIn:function(){
   wx.redirectTo({
     url: 'date/date?monthOut='+this.data.monthOut+"&dayOut="+this.data.dayOut,
   })
  },
  toOut:function(){
    // if(this.data._flag==false){
    //   wx.showToast({
    //     title: '请先选择入店时间',
    //     icon:"none"
    //   })
    // }
    wx.redirectTo({
      url: 'dateTwo/dateTwo?monthIn=' + this.data.monthIn + "&dayIn=" + this.data.dayIn,
    })
  },
  getRoom:function(){
    var _this=this
    wx.request({
      url: app.data.url + 'hotelUpdate',
      method: 'POST',
      data: {
        hotelId: 18,
        dateStart:"2018-"+this.data.monthIn+"-"+this.data.dayIn,
        dateEnd: "2018-" + this.data.monthOut + "-" + this.data.dayOut,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'charset': 'UTF - 8'
      },
      success:function(res){
        console.log(res.data)
        _this.setData({
          roomList:res.data.rooms
        })
      } 
    })
  },
  getReview:function(){
    var _this = this
    wx.request({
      url: app.data.url + 'reviewList',
      method: 'POST',
      data: {
        productId: 18
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'charset': 'UTF - 8'
      },
      success:function(res){
        console.log(res.data)
        _this.setData({
          reviewList:res.data,
          evulateNum:res.data.length
        })
      }
    })
    // var _data = [
    //     {
    //       "username": "啊****",
    //       "content": "本的样式都是一样的，展示出来的却不一样，发生这种情况的根本原因是文字和数字默认的行高不同，找到原因我们就可以解决它了，只要我们指定行高不就行了吗",
    //       "mark": 3
    //     },{
    //       "username": "啊****",
    //       "content": "本的样式都是一样的，展示出来的却不一样，发生这种情况的根本原因是文字和数字默认的行高不同，找到原因我们就可以解决它了，只要我们指定行高不就行了吗",
    //       "mark": 3
    //     },{
    //       "username": "啊****",
    //       "content": "本的样式都是一样的，展示出来的却不一样，发生这种情况的根本原因是文字和数字默认的行高不同，找到原因我们就可以解决它了，只要我们指定行高不就行了吗",
    //       "mark": 3
    //     }
    //   ]
    //   this.setData({
    //     reviewList:_data
    //   })
  }
}) 