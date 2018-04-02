//pages/mine/mine.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    firstLogin: true //判断当前是否第一次登录
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
    var that = this
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        if(that.data.firstLogin){
          wx.navigateTo({
            url: 'login/login?image=' + that.data.userInfo.avatarUrl + '&nickName=' + that.data.userInfo.nickName
          })
        }
      }
    })
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
    if (app.data.loginToMine){
      return
    }else{
      wx.navigateTo({
        url: 'login/login?image=' + this.data.userInfo.avatarUrl + '&nickName=' + this.data.userInfo.nickName
      })
    }
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  }
})
