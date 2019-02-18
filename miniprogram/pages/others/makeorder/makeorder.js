// miniprogram/pages/others/makeorder/makeorder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      lessonname : options.lessonname,
      lessonid:options.lessonid,
      lessonprice:options.lessonprice
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  makeOrder:function(e){
    let that = this;
    let name = e.detail.value.name;
    let phone = e.detail.value.phone;
    let note = e.detail.value.note;
    if(name =="" || phone ==""){
      wx.showModal({
        title: '信息缺失',
        content: '姓名或手机号为空',
        showCancel: false,
        confirmText: '我知道了',
        confirmColor: '#69c3aa',
      })
      return
    }    

    let myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
    if(phone.length == 11 && myreg.test(phone)){
      wx.showLoading({
        title: '提交中',
      })

      console.log(note)
      if(note == ""){
        note = "无"
      }

      let currentDate = new Date();
      let ordertime = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getDay() + " " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
      let userid = getApp().globalData.userid;
      const db = wx.cloud.database({
        env: 'drummer-2019'
      });
      let data = {
        name:that.data.lessonname,
        username:name,
        time:ordertime,
        notice:note,
        userid:getApp().globalData.userid,
        phone:phone,
        status:1, //刚提交的订单 处于待受理状态
        lessonid:that.data.lessonid,
        price:that.data.lessonprice
      }
      db.collection("order").add({
        data: data,
        success(res) {
          wx.hideLoading();
          wx.redirectTo({
            url: '../successpage/successpage'
          })
        }
      })
    }else{
      wx.showModal({
        title: '手机号码异常',
        content: '请输入合法的手机号',
        showCancel: false,
        confirmText: '我知道了',
        confirmColor: '#69c3aa',
      })
    }

  }
})