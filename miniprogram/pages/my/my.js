const app = getApp();

Page({
  data: {
    userInfo: {},
    mode:[
      {
        id:0,
        text:"我的订单"
      },
      {
        id: 1,
        text: "我的评论"
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
 
  onShow:function(){
    this.setData({
      avatarUrl: app.globalData.avatarUrl,
      nickName: app.globalData.nickName
    })
  },

  showdetail:function(e){
    const data = e.currentTarget.dataset;
    let key = data.key;
    var url = ""
    switch(key){
      case 1:
        url = "../others/mycomment/mycomment";
        break;
      case 0:
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