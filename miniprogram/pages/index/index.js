const shanghaiDistrict = ['嘉定区', '杨浦区', '徐汇区', '静安区', '浦东新区']
const shanghaiStore = ['嘉定店', '杨浦店', '静安寺店']
const beijingDistrict = ['朝阳区','海淀区','怀柔区','通州']
const beijingStore = ['朝阳店','海淀店','怀柔店','通州店']

Page({
  data: {    
    newsloaded:false,
    storeloaded:false,
    multiArray: [['上海市', '北京'], ['嘉定区', '杨浦区', '徐汇区', '静安区', '浦东新区'], ['嘉定店','杨浦店','静安寺店']],
    multiIndex: [0, 0, 0],
  }, 

  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = shanghaiDistrict;
            data.multiArray[2] = shanghaiStore;
            break;
          case 1:
            data.multiArray[1] = beijingDistrict;
            data.multiArray[2] = beijingStore;
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        switch (data.multiIndex[0]) {
          case 0:
            switch (data.multiIndex[1]) {
              case 0,1,2,3,4:
                data.multiArray[2] = shanghaiStore;
                break;              
            }
            break;
          case 1:
            switch (data.multiIndex[1]) {
              case 0,1,2,3:
                data.multiArray[2] = beijingStore;
                break;             
            }
            break;
        }
        data.multiIndex[2] = 0;
        console.log(data.multiIndex);
        break;
    }
    this.setData(data);
    console.log("调试信息：====="+this.data.multiArray)
    console.log("调试信息：=====" + this.data.multiIndex)
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
      url:"../detail/lessondetail/lessondetail"
    })
  },

  go2store:function(e){
    let data = e.currentTarget.dataset
    wx.navigateTo({
      url: '../detail/storedetail/storedetail?id='+data.id
    })
  }

  

})