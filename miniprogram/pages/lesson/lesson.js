var WxAutoImage = require("../../js/wxAutoImageCal.js");
var app = getApp();

Page({
  data: {

  },
  cusImageLoad: function (e) {
    var that = this;
    that.setData(WxAutoImage.wxAutoImageCal(e));
  },

  onLoad:function(){
    this.setData({
      tabnav: {
        tabnum: 2,
        tabitem: [
          {
            "id": 0,
            "text": "私教班"
          },
          {
            "id": 1,
            "text": "普通班"
          }
        ]}
  });

    this.getPersonalLesson();
  },

  setTab:function(e){
    const edata = e.currentTarget.dataset;
    this.setData({
      showtab: Number(edata.tabindex)
    })
    this.fetchTabData(edata.tabindex);
  },

  fetchTabData:function(index){
    console.log(index);
    switch(index){
      case 0:
        this.getPersonalLesson();
        break;
      case 1:
        this.getNomalLesson();
        break;
    }
  },

  getPersonalLesson:function(){
    let that = this;
    const db = wx.cloud.database({
      env: 'drummer-2019'
    });
    db.collection("lesson").where({
      isPersonal:true
    }).get({
      success(res) {
        that.setData({
          personallessons: res.data
        })
      }
    });

  },

  getNomalLesson:function(){
    const db = wx.cloud.database({
      env: 'drummer-2019'
    })
  }

})