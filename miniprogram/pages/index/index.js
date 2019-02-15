Page({
  data: {    
    newsloaded:false,
    storeloaded:false
  }, 

  onPullDownRefresh (){
    
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