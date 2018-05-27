// pages/index/indexContent/hotelDetail/date/date.js
const app = getApp()

Page({
  data: {
    year: 0,
    month: 0,
    date: ['日', '一', '二', '三', '四', '五', '六'],
    dateArr: [],
    isToday: 0,
    isTodayWeek: false,
    todayIndex: 0,
    day:0,
    dayNum:0,
    dayItem:0,
    flag:true,
    _flag:true,
    dayOut:"",
    monthOut:"",
    id:"",
    distant:""
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({
      distant: options.distant
    })
    let now = new Date();
    // console.log(now)
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate()
    this.dateInit();
    this.setData({
      year: year,
      month: month,
      day:day,
      dayNum:day-1,
      monthOut:options.monthOut,
      dayOut:options.dayOut,
      id:options.id
    })
  },
  dateInit: function (setYear, setMonth) {
    //全部时间的月份都是按0~11基准，显示月份才+1  
    let dateArr = [];                       //需要遍历的日历数组数据  
    let arrLen = 0;                         //dateArr的数组长度  
    let now = setYear ? new Date(setYear, setMonth) : new Date();
    // console.log(now)
    let year = setYear || now.getFullYear();
    let nextYear = 0;
    let month = setMonth || now.getMonth();                 //没有+1方便后面计算当月总天数  
    let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
    let k = year + '/' + (month + 1) + '/' + 1
    // console.log(k)
    let startWeek = new Date(k).getDay();
    // console.log(startWeek)                         //目标月1号对应的星期  
    let dayNums = new Date(year, nextMonth, 0).getDate();             //获取目标月有多少天  
    // console.log(dayNums)
    let obj = {};
    let num = 0;

    if (month + 1 > 11) {
      nextYear = year + 1;
      dayNums = new Date(nextYear, nextMonth, 0).getDate();
    }
    arrLen = startWeek + dayNums;
    // console.log(arrLen)
    for (let i = 0; i < arrLen; i++) {
      if (i >= startWeek) {
        num = i - startWeek + 1;
        obj = {
          isToday: '' + year + (month + 1) + num,
          dateNum: num,
          weight: 5
        }
      } else {
        obj = {};
      }
      dateArr[i] = obj;
    }
    // console.log(dateArr)
    this.setData({
      dateArr: dateArr
    })

    let nowDate = new Date();
    let nowYear = nowDate.getFullYear();
    let nowMonth = nowDate.getMonth() + 1;
    let nowWeek = nowDate.getDay();
    let getYear = setYear || nowYear;
    let getMonth = setMonth >= 0 ? (setMonth + 1) : nowMonth;

    if (nowYear == getYear && nowMonth == getMonth) {
      this.setData({
        isTodayWeek: true,
        todayIndex: nowWeek
      })
    } else {
      this.setData({
        isTodayWeek: false,
        todayIndex: -1
      })
    }
  },
  // lastMonth: function () {
  //   //全部时间的月份都是按0~11基准，显示月份才+1  
  //   let year = this.data.month - 2 < 0 ? this.data.year - 1 : this.data.year;
  //   let month = this.data.month - 2 < 0 ? 11 : this.data.month - 2;
  //   this.setData({
  //     year: year,
  //     month: (month + 1)
  //   })
  //   this.dateInit(year, month);
  // },
  nextMonth: function () {
    //全部时间的月份都是按0~11基准，显示月份才+1  
    let year = this.data.month > 11 ? this.data.year + 1 : this.data.year;
    let month = this.data.month > 11 ? 0 : this.data.month;
    this.setData({
      year: year,
      month: (month + 1),
      flag:false,
      _flag:false
    })
    this.dateInit(year, month);
  },
  selectDate:function(e){
    console.log(e)
    if(this.data.flag==false){
      this.setData({
        flag:true,
        dayNum: e.currentTarget.dataset.indexs,
        dayItem: e.currentTarget.dataset.item
      })
      wx.redirectTo({
        url: '../hotelDetail?monthIn=' + this.data.month + "&dayIn=" + this.data.dayItem + "&id=" + this.data.id + "&distant=" + this.data.distant,
      })
    }
    else{
      if (e.currentTarget.dataset.indexs < this.data.day) {
        return false;
      }
      else {
        this.setData({
          dayNum: e.currentTarget.dataset.indexs,
          dayItem: e.currentTarget.dataset.item
        })
        wx.redirectTo({
          url: '../hotelDetail?monthIn=' + this.data.month + "&dayIn=" + this.data.dayItem + "&monthOut=" + this.data.monthOut + "&dayOut=" + this.data.dayOut + "&id=" + this.data.id + "&distant=" + this.data.distant,
        })
      }   
    }  
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  }
})  