Page({
  data: {
    
    imgUrls: [
      '/img/home.png',
      '/img/lesson.png',
      '/img/my.png'
    ]
  },
  scrollR: function (e) {
    this.setData({
      lists: this.data.lists.concat(this.data.list),
    });
  },

  onLoad: function (e) {
    this.scrollR(e);
  },

  scroll: function (e) {
    this.scrollR(this.data.offset);
  }
})