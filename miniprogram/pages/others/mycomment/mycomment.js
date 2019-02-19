var app = getApp();

Page({
  data: {
    showtab: 0,    
  },

  onLoad: function () {
    this.setData({
      tabnav: {
        tabnum: 4,
        tabitem: [
          {
            "id": 0,
            "text": "全部"
          },
          {
            "id": 1,
            "text": "教师评论"
          },
          {
            "id": 2,
            "text": "店铺评论"
          },
          {
            "id": 3,
            "text": "课程评论 "
          }
        ]
      }
    });

    this.getComments();
  },

  setTab: function (e) {
    const edata = e.currentTarget.dataset;
    this.setData({
      showtab: Number(edata.tabindex)
    })
    this.getComments();
  },

  getComments: function () {
    wx.showLoading({
      title: '加载中',
    })
    let that = this;
    const db = wx.cloud.database({
      env: 'drummer-2019'
    });

    // 根据tab页构建不同的查询条件（全部的时候不需要status过滤条件）
    let condition = {}
    if (this.data.showtab != 0) {
      condition = {
        towho: (this.data.showtab - 1).toString(),
        userid: getApp().globalData.userid
      }
    } else {
      condition = {
        userid: getApp().globalData.userid
      }
    }
    // 数据库 查询
    db.collection("comment").where(condition).get({
      success(res) {        
        that.setData({
          mycomments:res.data
        });
        wx.hideLoading();
      }
    });
  },


  showCommentDetail: function (e) {
    let commentedType = e.currentTarget.dataset.towho;
    let commentedObjId = e.currentTarget.dataset.whoid;
    switch(commentedType){
      //教师
      case "0":
        wx.navigateTo({
          url: '../../detail/teacherdetail/teacherdetail?id=' + commentedObjId,
        })
      break;
      //店铺
      case "1":
      wx.navigateTo({
        url: '../../detail/storedetail/storedetail?id=' + commentedObjId,
      })
      break;
      //课程
      case "2":
        wx.navigateTo({
          url: '../../detail/lessondetail/lessondetail?id = ' + commentedObjId,
        })
      break;
    }
  }
})