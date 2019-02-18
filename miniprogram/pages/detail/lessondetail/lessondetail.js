// miniprogram/pages/detail/newsdetail/newsdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden:true,
    toastHidden:true,
    phoneNumber:"13125145155"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
    })
    console.log(options.id)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const db = wx.cloud.database({
      env: 'drummer-2019'
    });
    let that = this;
    // 获取课程信息
    db.collection("lesson").doc(this.data.id).get({
      success(res){
        that.setData({
          lesson:res.data
        })
      }
    });
    // 获取购买说明
    db.collection("buySpecification").get({
      success(res){
        that.setData({
          buySpecification:res.data[0]
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  go2comment:function(){
    getApp().globalData.commentInfo.towho = "2";
    getApp().globalData.commentInfo.whoid = this.data.lesson._id;
    getApp().globalData.commentInfo.title = this.data.lesson.name;    
    wx.navigateTo({
      url: "../../others/comment/comment"
    })
  },

  go2contact:function(){
    let that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.phoneNumber,
    })
  },

  makeAppointment:function(){
    let that = this;
    wx.navigateTo({
      url: "../../others/makeorder/makeorder?lessonname=" + that.data.lesson.name + "&lessonid=" + that.data.lesson._id + "&lessonprice=" + that.data.lesson.price,
    })
  }
})