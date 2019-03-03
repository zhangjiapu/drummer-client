// miniprogram/pages/others/aboutus/aboutus.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    multiArray: [['上海市', '北京'], ['嘉定区', '杨浦区', '徐汇区', '静安区', '浦东新区'], ['嘉定店', '杨浦店', '静安寺店']],
    multiIndex: [0, 0, 0],
    showDayIndex:-1,
    currdate:'',
    weekdayItem: [
      {
        "id": 0,
        "text": "日"  
      },
      {
        "id": 1,
        "text": "一"
      },
      {
        "id": 2,
        "text": "二"
      },
      {
        "id": 3,
        "text": "三"
      },
      {
        "id": 4,
        "text": "四"
      },
      {
        "id": 5,
        "text": "五"
      },
      {
        "id": 6,
        "text": "六"
      }
    ]

  },

  // 选择一周的哪一天
  setTab: function (e) {
    let myDate = new Date()
    let currday = myDate.getDay() //当前周几
    let currIndex = e.currentTarget.dataset.tabindex; // 选中的是周几
    let days = 0
    if(currIndex < currday){
      days = currIndex-currday +7
    }else{
      days = currIndex - currday
    }
    let thatDay_ms = myDate.getTime() + 24 * 60 * 60 * 1000 * days
    myDate.setTime(thatDay_ms)


    let mydate = (myDate.getMonth() + 1) + "月" + myDate.getDate() +"日"   
    this.setData({
      showDayIndex: Number(currIndex),  
      currdate:mydate    
    })
  console.log(this.data)
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let myDate = new Date()
    this.setData({
      value: getApp().globalData.userid,
      showDayIndex:myDate.getDay()
    })
    console.log(this.data.showDayIndex)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let dateTemp = new Date()
    let mydate = (dateTemp.getMonth() + 1) + "月" + dateTemp.getDate() + "日"
    this.setData({
      currdate:mydate
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }

  
})