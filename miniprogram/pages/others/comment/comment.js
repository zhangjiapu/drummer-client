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
      towho:options.towho,
      whoid:options.whoid,
      title:options.title
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  submitComment:function(e){
    let content = e.detail.value.content;
    if (content == ""){
      wx.showToast({
        title: '内容不能为空',
        image: '../../../../img/warm.png',
        duration: 3000,
        success: function(res) {
          wx.hideToast();
        }
      })
    }else{
      let time = new Date();
      let data = {
        content: content,
        time: time,
        towho: this.data.towho,
        whoid: this.data.whoid,
        avatarurl: getApp().globalData.avatarurl,
        nickName: getApp().globalData.nickName,
      };

      const db = wx.cloud.database({
        env: 'drummer-2019'
      });
      db.collection("comment").add({
        data: data,
        success(res) {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 3000,
            success: function (res) {
              wx.hideToast();
            }
          })
        }
      })
    }
  }
})