// pages/index/search/search.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    searchList:[],
    inputValue:"",
    start:"",
    count:"",
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //模拟数据
    // var _data=
    //  this.setData({
    //    searchList: _data
    //  })
     this.getHotSearch()
  },
  switchNav:function(e){
     var that=this;
     if (this.data.currentTab === e.target.dataset.current){
      //  console.log(this.data.currentTab);
       return false;
     }else{
       that.setData({
         currentTab: e.target.dataset.current
       });
      //  console.log(this.data.currentTab);
       this.getHotSearch()
     }
  },

  //默认的是酒店热搜,点击跳转到酒店详情页面
  toProductDetail:function(e){
    if (this.data.currentTab==0){
      wx.navigateTo({
          url: '../indexContent/hotelDetail/hotelDetail?id=' + this.data.searchList[e.currentTarget.dataset.indexs].productId,
      })
    }
    else if (this.data.currentTab == 1){
      wx.navigateTo({
        url: '../indexGoods/goodsDetail/goodsDetail?id=' + this.data.searchList[e.currentTarget.dataset.indexs].productId,
      })
    }
    // console.log(e)
    // 将酒店id传过去
    // wx.navigateTo({
    //   url: '../indexContent/hotelDetail/hotelDetail?id=' + this.data.searchList[e.currentTarget.dataset.indexs].productId,
    // })
  },

  //按关键字搜索的接口
  searchs:function(){
    //这是参数
    // console.log(this.data.inputValue)
    if (this.data.inputValue.length==0){
      wx.showToast({
        title: '请输入要搜索的内容~',
        icon: 'none',
        duration: 2000
      })
      return ;
    }
    console.log(this.data.inputValue)
    console.log(this.data.currentTab)
    var _this=this
    wx.request({
      url: app.data.url + 'searchByWord',
      method: 'POST',
      dataType: 'json',
      data:{
        searchType: this.data.currentTab,
        content: this.data.inputValue,
        start:0,
        count:10
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'charset': 'UTF - 8'
      },
      success:function(res){
        console.log(res.data);
        _this.setData({
          list:res.data
        });
        // console.log(_this.data)
        // console.log(_this.data.list)
        var list = JSON.stringify(_this.data.list);
        if (_this.data.list.length != 0){
          wx.navigateTo({
            url: 'searchData/sarchData?list=' + list + '&type=' + _this.data.currentTab,
          })
        }else{
            wx.showToast({
                title: '搜索不到这件商品~',
                icon: 'none',
                duration: 2000
              })
        }
      }
    })
  },
  bindKeyInput:function(e){
    this.setData({
      inputValue:e.detail.value
    })
  },
  //获取热门搜索
  getHotSearch:function(){
    console.log(this.data.currentTab)
    var _this=this
    wx.request({
      url: app.data.url + 'hotSearchList',
      method: 'POST',
      dataType: 'json',
      data: {
        type: this.data.currentTab
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'charset': 'UTF - 8'
      },
      success:function(res){
        var _data={
          "hotSearchList": [{
            "name": "热搜1",
            "productId": "01"
          }, {
            "name": "热搜2",
            "productId": "02"
          }, {
            "name": "热搜3",
            "productId": "03"
          }, {
            "name": "热搜4",
            "productId": "04"
          }, {
            "name": "热搜5",
            "productId": "05"
          }, {
            "name": "热搜6",
            "productId": "06"
          },]
        }
        // _data=res.data
        console.log(res.data)
        console.log(_data)
          _this.setData({
            searchList: _data.hotSearchList
        })
      }
    })
  },
  onPullDownRefresh: function () {
    wx.showLoading({
      title: '拼命加载中...'
    })
    this.onLoad()
    wx.hideLoading()
    wx.stopPullDownRefresh()
  }
})









//页面之间传对象或者数组
// 跳转到下级页面
// toInfo: function (e) {
//   // 把要传递的json对象转换成字符串
//   var userInfo = JSON.stringify(this.data.userInfo);
//   wx.navigateTo({
//     url: "../info/info?userInfo=" + userInfo
//   })
// }

//页面加载时
// onLoad: function (options) {
//   // 把接收到的字符串转换成json对象
//   var userInfo = JSON.parse(options.userInfo);
//   console.log(userInfo);
// }