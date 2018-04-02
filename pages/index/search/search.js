// pages/index/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    searchList:[
      {
        "name":"",
        "link":""
      }, {
        "name": "",
        "link": ""
      }, {
        "name": "",
        "link": ""
      }, {
        "name": "",
        "link": ""
      }, {
        "name": "",
        "link": ""
      }, {
        "name": "",
        "link": ""}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
     },];
     for(var i=0;i<6;i++){
       this.data.searchList[i].name=_data[i].name;
     }
     for (var i = 0; i < 6; i++) {
       this.data.searchList[i].link = "";
     }
     this.setData({
       searchList: this.data.searchList
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
  }
})