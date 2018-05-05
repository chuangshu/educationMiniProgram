// pages/evaluate/evaluate.js
var util = require('../../utils/util.js');
import {Config} from '../../utils/config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teaId: '',
    stuId: '',
    classId: '',
  }
  ,
  formSubmit: function (e) {
    wx.showLoading({
      title: '发送中',
    })
    var postData = {};
    console.log(e.detail.value)
    var content = e.detail.value.description;

    if (util.checkPoison(content)) {
      wx.hideLoading();
      wx.showModal({
        title: '非法信息',
        showCancel: false
      })
    }
    ;
    postData = {
      c: 'WxLoadTeaPersonal',
      a: 'addComment',//学生上交评论信息 
      content: content,
      class_id: this.data.classId,
      tea_id: this.data.teaId,
      stu_id: this.data.stuId
      
    }

    wx.request({
      url: Config.baseUrl,
      data: postData,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)

        wx.hideLoading();
        var status = JSON.parse(res.data).status
        if (status) {
          wx.hideLoading();
          wx.showModal({
            title: '评价成功',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack();
              }
            }
          })
        } else {
          wx.hideLoading();
          wx.showModal({
            title: '发布失败',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack();
              }
            }
          })
        }
      }


    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.classId = options.class_id;
    this.data.stuId = options.stu_id;
    this.data.teaId = wx.getStorageSync('id');
  }
})