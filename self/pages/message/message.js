// pages/message/message.js
var util = require('../../utils/util.js');
import {Config} from '../../utils/config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: "",
    id: ""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var type = wx.getStorageSync('type');
    var id = wx.getStorageSync('id');
    this.data.type = type;
    this.data.id = id;
    this.setData({
      type: type
    });
  },
  formSubmit: function (e) {
    var message = e.detail.value.message;
    var poison = util.checkPoison(message);
    if (poison) {
      wx.showModal({
        title: "信息非法",
        showCancel: false
      });
      return;
    }
    else {
      var postData = {
        people_type: this.data.type,
        people_id: this.data.id,
        c: 'WxLoadMessageBoard',
        a: 'insertMessage',
        content: message
      }

      wx.request({
        url: Config.baseUrl,
        data: postData,
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          var res = res.data.status;
          if (res == 1) {
            wx.showModal({
              title: "留言成功",
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  console.log("确定并返回")
                  wx.navigateBack();
                }
              }
            });
          }
          else {
            wx.showModal({
              title: "留言失败",
              showCancel: false,

            });
          }
        }
      })
    }

  }
})