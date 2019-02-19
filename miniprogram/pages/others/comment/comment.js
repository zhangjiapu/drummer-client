// miniprogram/pages/others/comment/comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title:getApp().globalData.commentInfo.title
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  submitComment:function(e){
    let that = this;
    let content = e.detail.value.content;
    if (content != ""){
      let currentDate = new Date();
      let time = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getDay() + " " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
      let data = {
        content: content,
        time: time,
        towho: getApp().globalData.commentInfo.towho,
        whoid: getApp().globalData.commentInfo.whoid,
        avatarurl: getApp().globalData.avatarurl,
        nickName: getApp().globalData.nickName,
        userid:getApp().globalData.userid,
        commentedName:getApp().globalData.commentInfo.title
      };

      const db = wx.cloud.database({
        env: 'drummer-2019'
      });

      wx.showLoading({
        title: '提交中',
      })

      db.collection("comment").add({
        data: data,
        success(res) {
         wx.hideLoading();
         wx.redirectTo({
             url: '../successpage/successpage' 
         })
        }
      });
    }
  }
})