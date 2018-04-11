// pages/index/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    searchList:[],
    inputValue:"",
    start:"",
    count:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //模拟数据
    var _data=[{
       "name":"热搜1",
       "productId":"01"
     },{
         "name": "热搜2",
         "productId": "02"
     },{
         "name": "热搜3",
         "productId": "03"
     },{
         "name": "热搜4",
         "productId": "04"
     },{
         "name": "热搜5",
         "productId": "05"
     },{
         "name": "热搜6",
         "productId": "06"
     },]
     this.setData({
       searchList: _data
     })
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
     }
  },

  //默认的是酒店热搜,点击跳转到酒店详情页面
  toProductDetail:function(e){
    // console.log(e)
    // 将酒店id传过去
    wx.navigateTo({
      url: '../indexContent/hotelDetail/hotelDetail?id=' + this.data.searchList[e.currentTarget.dataset.indexs].productId,
    })
  },

  //按关键字搜索的接口
  searchs:function(){
    //这是参数
    console.log(this.data.inputValue)
    console.log(this.data.currentTab);
  },
  bindKeyInput:function(e){
    this.setData({
      inputValue:e.detail.value
    })
  }
})

//页面之间传对象

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