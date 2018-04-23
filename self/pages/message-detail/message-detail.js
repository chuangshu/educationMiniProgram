// pages/message-detail/message-detail.js
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
    var that = this;
    wx.request({
        url: 'https://47207130.huixuehuijiao.cn/application/controllers/transit_api.php',
      data: {
        c: 'WxLoadMessageBoard',
        a: 'loadAllPass',
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      }, success: function (res) {
        console.log(res.data)
        var obj = JSON.parse(res.data);
        that.setData({
          detail: obj
        })
      }


    })
  },
  onAddMessage:function(options){
    wx.navigateTo({
      url: '../message/message',
    })
  }
})