//pages/mine/mine.js
//获取应用实例
const app = getApp()

Page({
  data: {
    orderLogo: app.data.iconUrl+'mine01.png', //订单logo
    zkqLogo: app.data.iconUrl +'mine02.png', // 折扣券logo
    kfLogo: app.data.iconUrl +'mine03.png', // 客服logo
    toLogo: app.data.iconUrl +'to.png', // > logo
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    firstLogin: true, //判断当前是否第一次登录,
    showRegister: false, //控制是否显示注册页面
    phone: '', //储存手机号码
    code: '', // 储存验证码
    codeCon: '获取验证码', //验证码按钮内容
    codeDis: false, //控制是否可以点击获取验证码
    loginDis: false, //控制是否可以点击登录
    loging: false, // 登录中显示loading图标
    codeOpacity: 1.0, //验证码按钮的透明底
    LoginOpacity: 0.5 //登录按钮的透明底
  },
  // onLoad: function () {
  //   if (app.globalData.userInfo) {
  //     this.setData({
  //       userInfo: app.globalData.userInfo,
  //       hasUserInfo: true
  //     })
  //   } else if (this.data.canIUse) {
  //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //     // 所以此处加入 callback 以防止这种情况
  //     app.userInfoReadyCallback = res => {
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //     }
  //   } else {
  //     // 在没有 open-type=getUserInfo 版本的兼容处理
  //     wx.getUserInfo({
  //       success: res => {
  //         app.globalData.userInfo = res.userInfo
  //         this.setData({
  //           userInfo: res.userInfo,
  //           hasUserInfo: true
  //         })
  //       }
  //     })
  //   }
  // },
  getUserInfo: function (e) {
    // console.log(e)
    // app.globalData.userInfo = e.detail.userInfo
    // this.setData({
    //   userInfo: e.detail.userInfo,
    //   hasUserInfo: true
    // })
    // var that = this
    // wx.getUserInfo({
    //   success: function (res) {
    //     that.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //     if(that.data.firstLogin){
    //       wx.navigateTo({
    //         url: 'login/login?image=' + that.data.userInfo.avatarUrl + '&nickName=' + that.data.userInfo.nickName
    //       })
    //     }
    //   }
    // })
    wx.showLoading({
      title: '登陆中'
    })
    this.setData({
      showRegister: true
    })
    wx.hideLoading()
  },
  cancelRegister: function(){
    this.setData({
      showRegister: false
    })
  },
  getCode: function () {
    var that = this
    var time = 60  //用于控制多长时间再获取验证码
    var time_ = setInterval(function () {
      that.setData({
        codeCon: time + 's 后再试',
        codeDis: true,
        codeOpacity: 0.5,
        LoginOpacity: 1.0
      })
      --time
      if (time < 0) {
        that.stopInterval(time_)
      }
    }, 1000)
  },
  // 用于取消定时器
  stopInterval: function (e) {
    clearInterval(e)
    this.setData({
      codeCon: '获取验证码',
      codeDis: false,
      codeOpacity: 1.0
    })
  },
  // 把手机号写入phone
  writeInPhone: function(e){
    this.setData({
      phone: e.detail.value
    })
  },
  writeInCode: function(e){
    this.setData({
      code: e.detail.value
    })
  },
  // 登录函数
  login: function(){
    if((this.data.phone.length != 11) || (this.data.code.length != 4)){
      // console.log(this.data.phone)
      wx.showToast({
        title: '输入信息有误，请重新输入',
        icon: 'none',
        duration: 2000
      })
    }else{
      console.log(this.data.phone.length)
      console.log(this.data.code.length)
    }
  },
  toOrder: function () {
    wx.switchTab({
      url: '../order/order',   
    })
  },
  service: function () {
    wx.makePhoneCall({
      phoneNumber: '10086' //仅为示例，并非真实的电话号码
    })
  },
  onShow: function(){
    // if (app.data.loginToMine){
    //   return
    // }else{
    //   wx.navigateTo({
    //     url: 'login/login?image=' + this.data.userInfo.avatarUrl + '&nickName=' + this.data.userInfo.nickName
    //   })
    // }
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  }
})
