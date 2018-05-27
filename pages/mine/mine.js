//pages/mine/mine.js
//获取应用实例
const app = getApp()

Page({
  data: {
    headImg_: '',  //显示用户头像
    nickName_: '', //显示用户名
    headImg: '', // 储存用户头像
    nickName: '', //储存用户名

    orderLogo: app.data.iconUrl+'mine01.png', //订单logo
    zkqLogo: app.data.iconUrl +'mine02.png', // 折扣券logo
    kfLogo: app.data.iconUrl +'mine03.png', // 客服logo
    toLogo: app.data.iconUrl +'to.png', // > logo
    closeLogo: app.data.iconUrl + 'phoneLogin.png', //关闭按钮logo 

    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    openId_: '', //储存用户的openid
    firstLogin: true, //判断当前是否第一次登录,
    showRegister: false, //控制是否显示注册页面
    phone: '', //储存手机号码
    code: '', // 储存验证码
    codeCon: '获取验证码', //验证码按钮内容
    codeDis: false, //控制是否可以点击获取验证码
    loginDis: true, //控制是否可以点击登录
    loging: false, // 登录中显示loading图标
    codeOpacity: 1.0, //验证码按钮的透明底
    LoginOpacity: 0.5, //登录按钮的透明底

    showCoupon: false,  //显示优惠券
    dotted: [5,30,55,80,105,130,155], //小圆点位置
    Coupon: [{
      "img": '../../img/hotel.jpg',
      "name": '测试一号民宿',
      "price": '5',
      "fillPrice": '200',
      "date": '2018-05-01',
      "hotelId": 1
    }, {
        "img": '../../img/hotel.jpg',
        "name": '测试二号民宿',
        "price": '10',
        "fillPrice": '300',
        "date": '2018-05-02',
        "hotelId": 1
    }, {
        "img": '../../img/hotel.jpg',
        "name": '测试三号民宿',
        "price": '15',
        "fillPrice": '400',
        "date": '2018-05-03',
        "hotelId": 1
    }, {
        "img": '../../img/hotel.jpg',
        "name": '测试四号民宿',
        "price": '20',
        "fillPrice": '500',
        "date": '2018-05-04',
        "hotelId": 1
    }, {
        "img": '../../img/hotel.jpg',
        "name": '测试五号民宿',
        "price": '25',
        "fillPrice": '600',
        "date": '2018-05-05',
        "hotelId": 1
    }]
  },
  onload: function(options){

  },
  getUserInfo: function (e) {
    // 拉起模态框
    wx.showLoading({
      title: '登陆中'
    })
    var that = this
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          nickName: res.userInfo.nickName,
          headImg: res.userInfo.avatarUrl,
        })
        app.data.userName = that.data.nickName
      },
      fail: function(){
        wx.showToast({
          title: '获取用户信息失败',
          icon: 'none',
          duration: 2000
        })
        // 关闭模态框
        wx.hideLoading()
      }
    })
    wx.login({
      success: function (res) {

        if (res.code) {
          wx.request({
            url: app.data.url+'login',
            method: 'POST',
            dataType: 'json',
            data: {
              jscode: res.code
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded', // 默认值
              'charset': 'UTF - 8'
            },
            // 向后台请求成功
            success: function(res){
              if(res.data != 'error'){
                // console.log(res.data.openid)
                //openid保存
                that.setData({
                  openId_: res.data.openid
                })

                // 1:进入注册状态 0:进入登录状态
                if (res.data.signup == 1){
                  that.setData({
                    showRegister: true,
                    hasUserInfo: false
                  })
                }else{
                  that.setData({
                    hasUserInfo: true,
                    nickName_: that.data.nickName,
                    headImg_: that.data.headImg,
                    showRegister: false
                  })
                  //全局保存openId
                  app.data.openId = that.data.openId_
                }

                // 关闭模态框
                wx.hideLoading()
              }
            }
            // 向后台请求失败
            // fail: function(){
            //   wx.showToast({
            //     title: '因服务器原因，登录失败！',
            //     icon: 'none',
            //     duration: 2000
            //   })
            // }
          })
        // 下面这个else是拉起微信登录失败
        } else {
          // 关闭模态框
          wx.hideLoading()
          wx.showToast({
            title: '获取用户信息失败',
            icon: 'none',
            duration: 2000
          })
        }
      },
      // 用户阻止了拉起微信登录
      fail: function(res){
        wx.showToast({
          title: '授权失败',
          icon: 'none',
          duration: 2000
        })
      }
    });
  },
  // 取消注册
  cancelRegister: function(){
    this.setData({
      showRegister: false
    })
  },
  // 获取验证码
  getCode: function () {
    var that = this
    if(this.data.phone.length < 11){
      wx.showToast({
        title: '请填写正确的手机号码',
        icon: 'none',
        duration: 2000
      })
    }else{
      wx.request({
        url: app.data.url+'signup',
        method: 'POST',
        dataType: 'json',
        data: {
          phone: that.data.phone
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded', // 默认值
          'charset': 'UTF - 8'
        },
        success: function(res){

          if(res.data.success == 1){
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

            that.setData({
              loginDis: false
            })
          }else{
            wx.showToast({
              title: '获取验证码失败',
              icon: 'none',
              duration: 2000
            })
          }

        }
      })
    }
    
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

  // 把验证码写入code
  writeInCode: function(e){
    this.setData({
      code: e.detail.value
    })
  },

  // 登录函数
  login: function(){
    var that = this
    if((this.data.phone.length != 11) || (this.data.code.length != 6)){
      // console.log(this.data.phone)
      wx.showToast({
        title: '输入信息有误，请重新输入',
        icon: 'none',
        duration: 2000
      })
    }else{
      that.setData({
        loginDis: false, 
        loging: true 
      })
      wx.request({
        url: app.data.url +'checkVertifyCode',
        method: 'POST',
        dataType: 'json',
        data: {
          phone: that.data.phone,
          code: that.data.code,
          openid: that.data.openId_,
          name: that.data.nickName
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded', // 默认值
          'charset': 'UTF - 8'
        },
        success: function(res){
          // 1为注册成功，0为注册失败
          if (res.data.success == 1){
            wx.showToast({
              title: '注册成功',
              icon: 'none',
              duration: 2000
            })
            that.setData({
              hasUserInfo: true,
              nickName_: that.data.nickName,
              headImg_: that.data.headImg,
              showRegister: false
            })
            //全局保存openId
            app.data.openId = that.data.openId_
          }else{
            wx.showToast({
              title: '注册失败',
              icon: 'none',
              duration: 2000
            })
          }
        },
        fail: function(){
          wx.showToast({
            title: '注册失败',
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
  },
  // 打开折扣券
  toCoupon:  function(){

    if (app.data.openId.length == 0){
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000
      })
      return
    }

    // 拉起模态框
    wx.showLoading({
      title: '拼命获取中....'
    })

    // 进行ajax请求
    this.setData({
      showCoupon: true
    })

    // 关闭模态框
    wx.hideLoading()
  },

  // 折扣券调整
  toHotel: function(e){
    // console.log(e.currentTarget.id)
    wx.showToast({
      title: '折扣券功能还未开放~',
      icon: 'none',
      duration: 2000
    })
    // wx.navigateTo({
    //   url: '../index/indexContent/hotelDetail/hotelDetail?id='+e.currentTarget.id
    // })
  },
  // 关闭折扣券
  closeCoupon: function(){
    this.setData({
      showCoupon: false
    })
  },

  // 订单跳转
  toOrder: function () {

    if (app.data.openId.length == 0) {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000
      })
      return
    }

    wx.switchTab({
      url: '../order/order',   
    })
  },

  // 拉起客服电话
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
