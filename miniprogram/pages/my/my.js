var app = getApp();

Page({
  data: {
    userInfo: {},
    mode:[
      {
        id:0,
        text:"我的收藏"
      },
      {
        id: 1,
        text: "我的订单"
      },
      {
        id: 2,
        text: "我的地址"
      },
      {
        id: 3,
        text: "联系客服"
      },
      {
        id: 4,
        text: "关于我们"
      }
    ]
  },
  onLoad: function () {
    var that = this;
    wx.login({
      success: function () {
        wx.getUserInfo({
          success: function (res) {
            that.setData({
              userInfo: res.userInfo
            })
          }
        })
      }
    });
  }
})