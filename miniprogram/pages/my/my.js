const app = getApp();

Page({
  data: {
    userInfo: {},
    mode:[
      {
        id:0,
        text:"我的预约"
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

  contactUs:function(){
    wx.makePhoneCall({
      phoneNumber: getApp().globalData.customerService,
    })
  },

  showdetail:function(e){
    const data = e.currentTarget.dataset;
    let key = data.key;
    let that = this;
    var url = ""
    switch(key){
      case 1:
        url = "../others/mycomment/mycomment";
        break;
      case 0:
        url = "../others/myorder/myorder";
        break;
      case 2:
        that.contactUs();
        return;
      case 3:
        url = "../others/aboutus/aboutus";
        break;      
    }
    wx.navigateTo({
      url: url,
    })
  }

})