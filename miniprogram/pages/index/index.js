Page({
  data: {    
    newsloaded:false,
    storeloaded:false
  }, 

  onPullDownRefresh (){
    this.getInfo();  
    setTimeout(wx.stopPullDownRefresh({
      success(res){
        wx.showToast({
          title: '刷新成功',
          icon: 'success',          
          duration: 1500,
          success: function(res) {
            wx.hideToast();
          }
        })
      }      
    }),2000)
  },

  onLoad: function () {
    var that = this;
    wx.login({
      success: function () {
        wx.getUserInfo({
          success: function (res) {
            getApp().globalData.avatarUrl =  res.userInfo.avatarUrl;
            getApp().globalData.nickName = res.userInfo.nickName;
          }
        })
      }
    });
    wx.cloud.callFunction({
      name:"getUserId",
      success(res){
        getApp().globalData.userid = res.result.openid;
      }
    })

  },

  onShow: function (e) {  
   this.getInfo();   
  },

  getInfo:function(){   
    const db = wx.cloud.database({
      env: 'drummer-2019'
    }) 
    let that = this;
    db.collection("news").get({
      success(res) {
        that.setData({
          newsList: res.data,
          newsloaded:true
        })
      }
    });
    db.collection("store").get({
      success(res) {
        that.setData({
          storeList: res.data,
          storeloaded: true
        })
      }
    });
  },

  go2news:function(e){
    let data = e.currentTarget.dataset
    wx.navigateTo({
      // url: "../detail/newsdetail/newsdetail?id=" + data.id
      url:"../others/makeorder/makeorder",
    })
  },

  go2store:function(e){
    let data = e.currentTarget.dataset
    wx.navigateTo({
      url: '../detail/storedetail/storedetail?id='+data.id
    })
  }

  

})