import { orderstatus } from "../../../js/const.js"
var app = getApp();

Page({
  data: {
    showtab:0,
    myorders:[],
    orderstatus: orderstatus
  },

  onLoad: function () {
    this.setData({
      tabnav: {
        tabnum: 5,
        tabitem: [
          {
            "id": 0,
            "text": "全部"
          },
          {
            "id": 1,
            "text": "待受理"
          },
          {
            "id": 2,
            "text": "已受理"
          },
          {
            "id": 3,
            "text": "待退款"
          },
          {
            "id": 4,
            "text": "已退款"
          }
        ]
      }
    });

    this.getMyOrder();
  },

  setTab: function (e) {
    const edata = e.currentTarget.dataset;
    this.setData({
      showtab: Number(edata.tabindex)
    })
    this.getMyOrder();
  },

  getMyOrder: function () {
    let that = this;
    const db = wx.cloud.database({
      env: 'drummer-2019'
    });
    
    // 根据tab页构建不同的查询条件（全部的时候不需要status过滤条件）
    let condition = {}  
    if(this.data.showtab != 0){
      condition = {
        status:this.data.showtab,
        userid:getApp().globalData.userid
      }
    }else{
      condition = {
        userid: getApp().globalData.userid
      }
    }
    // 数据库 查询
    db.collection("order").where(condition).get({
      success(res) {
        that.setData({
          myorders: res.data,          
        })
      }
    });

    console.log(this.data.orderstatus)
  },


  showOrderDetail: function (e) {
    let data = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../detail/orderdetail/orderdetail?id=' + data.id
    })
  }
})