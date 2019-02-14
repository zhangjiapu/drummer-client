Page({
  data: {
    
    imgUrls: [
      '/img/home.png',
      '/img/lesson.png',
      '/img/my.png'
    ]
  },
  // scrollR: function (e) {
  //   this.setData({
  //     lists: this.data.lists.concat(this.data.list),
  //   });
  // },

  onShow: function (e) {  
    const db = wx.cloud.database({
      env: 'drummer-2019'
    })
    this.getStoreInfo(db);
    this.getNewsInfo(db);
  },

  // scroll: function (e) {
  //   this.scrollR(this.data.offset);
  // },

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

  }

})