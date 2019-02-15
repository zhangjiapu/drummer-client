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
        text: "联系客服"
      },
      {
        id: 3,
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
  },

  showdetail:function(e){
    const data = e.currentTarget.dataset;
    let key = data.key;
    var url = ""
    switch(key){
      case 0:
        url = "../others/mycollection/mycollection";
        break;
      case 1:
        url = "../others/myorder/myorder";
        break;
      case 2:
        url = "../others/contactus/contactus";
        break;
      case 3:
        url = "../others/aboutus/aboutus";
        break;      
    }
    wx.navigateTo({
      url: url,
    })
  }

})