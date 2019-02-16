// miniprogram/pages/detail/newsdetail/newsdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden:true,
    toastHidden:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
    })
    console.log(options.id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const db = wx.cloud.database({
      env: 'drummer-2019'
    });
    let that = this;
    // 获取课程信息
    db.collection("lesson").doc(this.data.id).get({
      success(res){
        that.setData({
          lesson:res.data
        })
      }
    });
    // 获取购买说明
    db.collection("buySpecification").get({
      success(res){
        that.setData({
          buySpecification:res.data[0]
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  go2comment:function(){
    let url = "../../others/comment/comment?towho="+2+"&whoid="+this.data.lesson._id+"&title="+this.data.lesson.name;
    wx.navigateTo({
      url: url
    })
  },

  go2contact:function(){

  },

  makeAppointment:function(){

  }
})