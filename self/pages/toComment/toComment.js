// pages/toComment/toComment.js
import {Config} from '../../utils/config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classId: "",
    stuId: '',
    stars: [1, 1, 1, 1, 1],
    score: 5
  },
  formSubmit: function (e) {
    wx.showLoading({
      title: '发送中',
    })
    var postData = {};
    console.log(e.detail.value)
    var content = e.detail.value.description;
    postData = {
      c: 'WxLoadStuPersonal',
      a: 'addComment',//学生上交评论信息 
      content:content,
      class_id: this.data.classId,
      stars:e.detail.value.score,
      stu_id:this.data.stuId
    }
    wx.request({
      url: Config.baseUrl,
      data: postData,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading();
        var status = res.data.status
        if (status) {
          wx.hideLoading();
          wx.showModal({
            title: '评价成功待审核',
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
    this.data.stuId = options.id;
  }


  ,
  stars0: function () {
    this.setData({
      stars: [1, 0, 0, 0, 0],
      score: 1
    })
  },
  stars1: function () {
    this.setData({
      stars: [1, 1, 0, 0, 0],
      score: 2
    })
  },
  stars2: function () {
    this.setData({
      stars: [1, 1, 1, 0, 0],
      score: 3
    })
  },
  stars3: function () {
    this.setData({
      stars: [1, 1, 1, 1, 0],
      score: 4
    })
  },
  stars4: function () {
    this.setData({
      stars: [1, 1, 1, 1, 1],
      score: 5
    })
  }
})