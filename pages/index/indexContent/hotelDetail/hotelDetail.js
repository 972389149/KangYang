// pages/index/indexGoods/hotelDetail/hotelDetail.js
var app = getApp();
Page({
  data: {
    id: 18,    //从酒店列表传过来的酒店id
    //hotelImg
    imgUrls: [],
    name:"七天酒店",
    location:"珠海区宝岗大道某某西区(距离某地铁站B出口500米)",
    distance:1.1,
    mark:4.3,
    evulateNum:0,
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
    flag_:true,
    isScroll:true,

    roomList:[]   //订房品种数组信息
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id:options.id,
      distance: options.distant
    })
    var now=new Date()
    var day=now.getDate()
    var month=now.getMonth()+1
    if(options.dayIn&&!options.dayOut){
      this.setData({
        dayIn:options.dayIn,
        monthIn:options.monthIn,
        dayOut: day+1,
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
        dayOut: day+1,
        monthOut: month,
        _flag: true
      })
      this.getRoom()
    }
    else{
      this.setData({
        dayIn: day,
        monthIn:month,
        dayOut: day+1,
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
    if (this.data.evulateNum==0){
      wx.showToast({
        title: '暂时没有更多的评论！',
        icon:"none"
      })
    }
    else{
      this.setData({
        flag: false,
        flag_:false,
        isScroll:false
      });
    } 
  },
  modalclose: function () {
    this.setData({
      flag: true,
      flag_:true,
      isScroll:true
    });
  },

  //获取酒店详情
  getHotelDetail:function(){
    var _this = this
    wx.showLoading({
      title: '正在获取酒店信息'
    })
    wx.request({
      url: app.data.url + 'hotelDetail',
      method: 'POST',
      data:{
        hotelId:this.data.id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'charset': 'UTF - 8'
      },
      success:function(res){
        wx.hideLoading(); 
        console.log(res.data)
        var _data = res.data
        _this.setData({
          name:_data.name,
          mark:_data.mark,
          location:_data.location,
          imgUrls:_data.hotelImg
        })
      }
    })
  },
  toIn:function(){
   wx.redirectTo({
     url: 'date/date?monthOut='+this.data.monthOut+"&dayOut="+this.data.dayOut+"&id="+this.data.id,
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
      url: 'dateTwo/dateTwo?monthIn=' + this.data.monthIn + "&dayIn=" + this.data.dayIn + "&id=" + this.data.id,
    })
  },
  getRoom:function(){
    var _this=this
    wx.showLoading({
      title: '正在获取房间信息'
    })
    wx.request({
      url: app.data.url + 'hotelUpdate',
      method: 'POST',
      data: {
        hotelId: this.data.id,
        dateStart:"2018-"+this.data.monthIn+"-"+this.data.dayIn,
        dateEnd: "2018-" + this.data.monthOut + "-" + this.data.dayOut,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'charset': 'UTF - 8'
      },
      success:function(res){
        wx.hideLoading(); 
        console.log(res.data)
        if(res.data.result==false){
          wx.showToast({
            title: '日期输入错误，请重新填写',
            icon: "none"
          })
          return;
        }
        if (res.data.rooms.length == 0) {
          wx.showToast({
            title: '当前时间没有房间了',
            icon: "none"
          })
          return;
        }
        _this.setData({
          roomList:res.data.rooms
        })
      } 
    })
  },
  getReview:function(){
    var _this = this
    wx.showLoading({
      title: '正在获取评论信息'
    })
    wx.request({
      url: app.data.url + 'hotelReviewList',
      method: 'POST',
      data: {
        hotelId: this.data.id,
        start: 0,
        count: 100
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'charset': 'UTF - 8'
      },
      success:function(res){
        wx.hideLoading(); 
        console.log(res.data)
        _this.setData({
          reviewList:res.data,
          evulateNum:res.data.length
          // evulateNum: 10
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
    // this.setData({
    //   reviewList:_data
    // })
  },
  toCommit:function(e){
    if (app.data.openId.length==0){
      wx.showToast({
        title: '请先登录',
        icon:"none",
        duration: 2000
      })
      wx.switchTab({
        url: '../../../mine/mine',
      })
      return ;
    }
    // console.log(e)
    if (this.data.monthIn == this.data.monthOut && this.data.dayIn == this.data.dayOut){
      wx.showToast({
        title: '入住时间与离店时间不能相同，请重新选择！',
        icon: "none"
      })
      return;
    }
    wx.navigateTo({
      url: '../hotelCommit/hotelCommit?hotelName=' + this.data.name + "&hotelMoney=" + this.data.roomList[e.currentTarget.dataset.indexs].promotePrice + "&hotelId=" + this.data.id + "&productId=" + this.data.roomList[e.currentTarget.dataset.indexs].productId + "&dateIn=2018-" + this.data.monthIn + "-" + this.data.dayIn + "&dateOut=2018-" + this.data.monthOut + "-" + this.data.dayOut + "&hotelType=" + this.data.roomList[e.currentTarget.dataset.indexs].name + "&imgSrc=" +this.data.roomList[e.currentTarget.dataset.indexs].img
    })
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  }
}) 