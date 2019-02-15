Page({
  data: {    
   
  }, 

  onShow: function (e) {  
    const db = wx.cloud.database({
      env: 'drummer-2019'
    })
    this.getStoreInfo(db);
    this.getNewsInfo(db);
  },

  getNewsInfo:function(db){    
    let that = this;
    db.collection("news").get({
      success(res) {
        that.setData({
          newsList: res.data
        })
      }
    })
  },

  getStoreInfo:function(db){
    let that = this;
    db.collection("store").get({
      success(res) {
        that.setData({
          storeList: res.data
        })
      }
    })
  },

  go2news:function(e){
    let data = e.currentTarget.dataset
    wx.navigateTo({
      url: "../detail/newsdetail/newsdetail?id=" + data.id
    })
  },

  go2store:function(e){
    let data = e.currentTarget.dataset
    wx.navigateTo({
      url: '../detail/storedetail/storedetail?id='+data.id
    })
  }

})