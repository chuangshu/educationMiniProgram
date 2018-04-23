var globalData = require('../../glodata.js')//index.js
//获取应用实例
var openid = '';
var app = getApp()
Page({
  data: {
    userInfo: {},
    content: [
      { "pic": "/pages/images/2.jpg" },
      { "pic": "/pages/images/1.jpg" }
    ],
    style: "height:400rpx;width:100%;",
    navData: [
      {
      "pic": "/pages/images/courses.png",
      "text": "全部课程",
      "jumpUrl": "/pages/courseList/courseList"
    },
    {
      "pic": "/pages/images/teacher.png",
      "text": "找老师",
      "jumpUrl": "/pages/teacherList/teacherList"
    }, {
      "pic": "/pages/images/home.png",
      "text": "关于我们",
      "jumpUrl": "/pages/aboutUs/aboutUs"
    }
    ]

  },
  onSearchTap: function (e) {
    wx.navigateTo({
      url: '/pages/search/search',
    })

  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onCourseJump: function (event) {
    wx.navigateTo({
      url: '/pages/courseList/courseList'
    })
  }, onTeacherJump: function (event) {
    wx.navigateTo({
      url: '/pages/teacherList/teacherList'
    })
  }, onHomeJump: function (event) {
    wx.navigateTo({
      url: '/pages/aboutUs/aboutUs'
    })
  },
  onLoad: function () {
    var that = this;
    wx.request({
        url: 'https://47207130.huixuehuijiao.cn/application/controllers/transit_api.php',
     data:{
      c: 'WxLoadMessageBoard',
      a: 'loadAllPass',
    },
    method:'GET',
    header:{
      'content-type':'application/json'
    },success:function(res){
      console.log(res.data)
      var obj=JSON.parse(res.data);
      console.log(obj);
      that.setData({
        message:obj
      })
    }
    
    
    })
  },
  onMessage:function(){
    wx.navigateTo({
      url: '/pages/message-detail/message-detail',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  onToMessage:function(){
    wx.navigateTo({
      url: '/pages/message/message',
    })
  }
})
