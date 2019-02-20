// miniprogram/pages/detail/newsdetail/newsdetail.js
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
    db.collection("store").doc(this.data.id).get({
      success(res) {
        that.setData({
          store: res.data
        })
      }
    });

    // 获取购买说明
    db.collection("buySpecification").get({
      success(res) {
        that.setData({
          buySpecification: res.data[0]
        })
      }
    });

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  go2comment: function () {
    getApp().globalData.commentInfo.towho = "1";
    getApp().globalData.commentInfo.whoid = this.data.store._id;
    getApp().globalData.commentInfo.title = this.data.store.name;
    wx.navigateTo({
      url: "../../others/comment/comment"
    })
  },

  go2contact: function () {
    let that = this;
    wx.makePhoneCall({
      phoneNumber: getApp().globalData.customerService,
    })
  },

  makeAppointment: function () {
    let that = this;
    wx.navigateTo({
      url: "../../others/makeorder/makeorder?lessonname=" + that.data.lesson.name + "&lessonid=" + that.data.lesson._id + "&lessonprice=" + that.data.lesson.price,
    })
  },

  showMap:function(){
    let that = this;
    wx.getLocation({//获取当前经纬度
      type: 'wgs84', //返回可以用于wx.openLocation的经纬度，官方提示bug: iOS 6.3.30 type 参数不生效，只会返回 wgs84 类型的坐标信息  
      success: function (res) {
        wx.openLocation({//​使用微信内置地图查看位置。
          latitude: Number(that.data.store.location.latitude),//要去的纬度-地址
          longitude: Number(that.data.store.location.longitude),//要去的经度-地址
          name: that.data.store.name,
          address: that.data.store.name
        })
      }
    })
  }
})