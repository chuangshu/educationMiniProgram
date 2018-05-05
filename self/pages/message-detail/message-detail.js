// pages/message-detail/message-detail.js
import{Config}from'../../utils/config.js';
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
      url: Config.baseUrl,
      data: {
        c: 'WxLoadMessageBoard',
        a: 'loadAllPass',
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      }, success: function (res) {
        console.log(res.data)
        var obj = res.data;
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