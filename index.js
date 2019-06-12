/*
* 自定义预约上门时间选择器js
* by linpeiwei
* to 20190612
*/
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timeArray: [],  //选择器数组
    timeIndex: [0,0,0],
    timeArr:[],  //自定义日期数组
    timeArrs: [],  //正常日期数组
    hourArr:[],  //自定义小时数组
    hourArrs: [],  //正常小时数组
    minuteArr:[],  //自定义分钟数组
    minuteArrs: [],  //正常分钟数组
    nowTime: '',  //现在加上4小时后的日期
    nowHour: '',  //现在加上4小时后的小时
    nowMinute: '',  //现在加上4小时后的分钟
    timeType: true,  //选择器是否初始状态
    lastDate: '',  //最终选择时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initialData()
  },

  //获取小时分钟
  gainTime(){
    var arrHour = [];  //存放小时的数组
    var arrHours = [];  //存放正常小时的数组
    var arrMinute = [];  //存放分钟的数组
    var arrMinutes = [];  //存放正常分钟的数组
    //获取初始小时数组
    for (var h = 0; h < 24; h++) {
      //console.log(h)
      arrHour.push(h + '时')
      arrHours.push(h)
      this.setData({
        hourArr: arrHour,
        hourArrs: arrHours
      })
    }
    //获取初始分钟数组
    for (var m = 0; m < 60; m++) {
      //console.log(h)
      arrMinute.push(m + '分')
      arrMinutes.push(m)
      this.setData({
        minuteArr: arrMinute,
        minuteArrs: arrMinutes
      })
    }
      this.setData({
        timeArray: [this.data.timeArr, arrHour, arrMinute]
      })
  },

  //获取分钟
  gainMinute() {
    var arrMinute = [];  //存放分钟的数组
    var arrMinutes = [];  //存放正常分钟的数组
    //获取初始分钟数组
    for (var m = 0; m < 60; m++) {
      //console.log(h)
      arrMinute.push(m + '分')
      arrMinutes.push(m)
      this.setData({
        minuteArr: arrMinute,
        minuteArrs: arrMinutes
      })
    }
    this.setData({
      timeArray: [this.data.timeArr, this.data.hourArr, arrMinute]
    })
  },

  //初始化数据（日期、小时、分钟）
  initialData: function(){
    var now = new Date();  //获取当前时间
    var time = now.getTime() + 1000 * 60 * 240; //当前时间加上4小时
    var nowData = new Date(time);  //转为时间戳
    var year = nowData.getFullYear();
    var month = (nowData.getMonth() + 1).toString().length == 1 ? "0" + (nowData.getMonth() + 1).toString() : (nowData.getMonth() + 1);
    var day = nowData.getDate().toString().length == 1 ? "0" + nowData.getDate() : nowData.getDate();
    var arrHour = [];  //存放小时的数组
    var arrHours = [];  //存放正常小时的数组
    var arrMinute = [];  //存放分钟的数组
    var arrMinutes = [];  //存放正常分钟的数组
    this.setData({
      nowTime: year + '-' + month + '-' + day, //现在加上4小时后的日期
      nowHour: nowData.getHours(),  //现在加上4小时后的小时
      nowMinute: nowData.getMinutes(),  //现在加上4小时后的分钟  
    })

    //获取初始小时数组
    for (var h = nowData.getHours(); h < 24; h++){
      //console.log(h)
      arrHour.push(h+'时')
      arrHours.push(h)
      this.setData({ 
        hourArr: arrHour,
        hourArrs: arrHours
      })
    }
    //获取初始分钟数组
    for (var m = nowData.getMinutes(); m < 60; m++) {
      //console.log(h)
      arrMinute.push(m+'分')
      arrMinutes.push(m)
      this.setData({ 
        minuteArrs: arrMinutes 
      })
    }
    //获取今天后30天时间
    var startDate = new Date(time);
    var endDate = new Date(time);
    endDate.setDate(startDate.getDate() + 30);  //设置30天时间
    var dataArr = [];  //个性化日期数组
    var dataArrs = []; //正常时间数组
    var weeks = ['日', '一', '二', '三', '四', '五', '六'];
    while ((endDate.getTime() - startDate.getTime()) >= 0) {
      var year = startDate.getFullYear();
      var month = (startDate.getMonth() + 1).toString().length == 1 ? "0" + (startDate.getMonth() + 1).toString() : (startDate.getMonth() + 1);
      var day = startDate.getDate().toString().length == 1 ? "0" + startDate.getDate() : startDate.getDate();
      var week = weeks[startDate.getDay()];
      dataArr.push(month + "月" + day + '日（周' + week + '）');
      dataArrs.push(year + "-" + month + "-" + day);
      startDate.setDate(startDate.getDate() + 1);
    }
    this.setData({
      timeArray: [dataArr, arrHour, arrMinute],
      timeArr: dataArr,
      timeArrs: dataArrs,
      timeType: true
    })

  },

  //选择器确定按钮
  bindMultiPickerChange: function (e) {
    var laTime = this.data.timeArrs[e.detail.value[0]];
    var laHour = this.data.hourArrs[e.detail.value[1]].toString();
    var laMinute = this.data.minuteArrs[e.detail.value[2]].toString();

    if (laHour.length < 2) {
      laHour = '0' + laHour
    }
    if (laMinute.length < 2) {
      laMinute = '0' + laMinute
    }
    this.setData({
      lastDate: laTime + ' ' + laHour + ':' + laMinute
    })
  },

  //选择器滑动触发事件
  bindMultiPickerColumnChange: function (e) {
    if (e.detail.column == 0){
      //选择第一列时触发0
      if (e.detail.value != 0){
        this.gainTime(); //全部小时和分钟
        this.setData({ timeType: false })
      }else{
        this.initialData(); //初始化
        this.setData({ timeType: true })
      }
    } else if (e.detail.column == 1){
      //选择第二列时触发1
      if(this.data.timeType == true){
        if (e.detail.value != 0) {
          this.gainMinute(); //全部小时和分钟
        } else {
          this.initialData(); //初始化
        }
      }  
    }
  },



})