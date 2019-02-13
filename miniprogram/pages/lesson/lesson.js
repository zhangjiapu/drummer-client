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
            "id": 1,
            "type": "A",
            "text": "一对一课程"
          },
          {
            "id": 1,
            "type": "A",
            "text": "一对多课程"
          }
        ]}
  })}
})