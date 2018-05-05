var app = getApp().globalData;

var user_type;
var checking;
var visitor;
var nickname;
var content;
import {Config} from '../../utils/config.js'
//调用接口获取用户名
//调用接口获取头像URL
Page({

  /**
   * 页面的初始数据
   */

  data: {
  },
  onInfo: function (event) {
    var id = event.target.dataset.id;
    var content = event.target.dataset.content;

    if (id == 0 && user_type == 1)
      wx.navigateTo({
        //学生个人信息页面
        url: '/pages/user-stuinfo/user-stuinfo',
      })
    else if (id == 0 && user_type == 2)
      wx.navigateTo({
        //老师学生个人信息页面
        url: '/pages/user-teainfo/user-teainfo',
      })
    else if (id == 1 && content == "我的学生")
      wx.navigateTo({
        //我的学生信息页面
        url: '/pages/user-stu/user-stu',
      })
    else if (id == 1 && content == "我的老师")
      wx.navigateTo({
        //我的老师信息页面
        url: '/pages/user-tea/user-tea',
      })
    else if (id == 2)
      wx.navigateTo({
        //我的评价页面
        url: '/pages/user-comment/user-comment',
      })
    else if (id == 3)
      wx.navigateTo({
        //我的课程页面
        url: '/pages/user-course/user-course',
      })
  },
  //跳转注册
  onSignin: function (e) {
    var that = this;
    wx.request({
      url: Config.baseUrl,
      data: {
        c: 'WxLogin',
        a: 'loginPersonalCenter',
        openid: wx.getStorageSync('openid')//需要传入的参数，必须与tp3中的方法函数所需参数一致
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT    
      // header: {}, // 设置请求的 header    
      success: function (res) {
        console.log(res.data);//data里面是微信api返回的session_key,openid，json格式的字符串
        var obj = res.data;//将json格式对象化


        if (obj.type == 0) {
          wx.navigateTo({
            url: '/pages/signIn/signIn',
          });
        }else{
          content = (obj.type == 2) ? "我的学生" : "我的老师";
      
          that.setData({
            user_type : obj.type,
            user: [{
              "pic": "/pages/images/info.png",
              "content": "个人信息",
              "id": "0"
            }, {
              "pic": "/pages/images/student.png",
              "content": content,
              "id": "1"
            },
            {
              "pic": "/pages/images/comments.png",
              "content": "我的评价",
              "id": "2"
            }, {
              "pic": "/pages/images/course.png",
              "content": "我的课程",
              "id": "3"
            }]
          });
        }
      }
    });
    wx.setStorageSync('exit', 0)
    this.setData({
      exit: 0
    });


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    this.onLoad();
    this.setData({
      exit: wx.getStorageSync('exit')
    })
  }
  ,
  onLoad: function (options) {
    console.log('this is user load');
    user_type = wx.getStorageSync('type');
    console.log(user_type);
    visitor = (user_type == 0) ? 5 : 0;
    checking = (user_type == -1) ? 5 : 0;
    content = (user_type == 2) ? "我的学生" : "我的老师";
    nickname = wx.getStorageSync('userInfo').nickName;
    var url = wx.getStorageSync('userInfo').avatarUrl;
    this.setData({
      user_type: user_type,
      thumb_cover_url: url,
      nickname: nickname,
      visitor: visitor,
      checking: checking,
      user: [{
        "pic": "/pages/images/info.png",
        "content": "个人信息",
        "id": "0"
      }, {
        "pic": "/pages/images/student.png",
        "content": content,
        "id": "1"
      },
      {
        "pic": "/pages/images/comments.png",
        "content": "我的评价",
        "id": "2"
      }, {
        "pic": "/pages/images/course.png",
        "content": "我的课程",
        "id": "3"
      }
      ]
    });
    //刷新缓存
    wx.request({
      url: Config.baseUrl,
      data: {
        c: 'WxLogin',
        a: 'loginPersonalCenter',
        openid: wx.getStorageSync('openid')//需要传入的参数，必须与tp3中的方法函数所需参数一致
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT    
      // header: {}, // 设置请求的 header    
      success: function (res) {
        console.log(res.data);//data里面是微信api返回的session_key、openid，json格式的字符串
        var obj = res.data;//将json格式对象化
        console.log(obj);
        wx.setStorageSync('type', obj.type);//存储openid+密钥，其实不安全

        if (wx.getStorageSync("exit") == 1) {
          if ('1' == obj.type) {
            wx.setStorageSync('id', obj.stu_id);
            wx.setStorageSync('exit', 0);//学生
          } else if (2 == obj.type) {
            wx.setStorageSync('id', obj.tea_id);//已通过的老师
            wx.setStorageSync('exit', 0);
          } else if (-1 == obj.type) {
            wx.setStorageSync('id', obj.tea_id);//审核中的老师
            wx.setStorageSync('exit', 0);
          } else {
            wx.setStorageSync('id', '没有id');
          }
        } 
        else {
          if ('1' == obj.type) {
            wx.setStorageSync('id', obj.stu_id);
            wx.setStorageSync('exit', 0);//学生
          } else if (2 == obj.type) {
            wx.setStorageSync('id', obj.tea_id);//已通过的老师
            wx.setStorageSync('exit', 0);
          } else if (-1 == obj.type) {
            wx.setStorageSync('id', obj.tea_id);//审核中的老师
            wx.setStorageSync('exit', 0);
          } else {
            wx.setStorageSync('id', '没有id');
          }
        }

      }
    })


  },
  exit: function () {
    var that = this;
    // console.log("退出登录");
    wx.setStorageSync('type', 0)
    wx.setStorage({
      key: 'exit',
      data: 1,
      success: function (res) {
        var then = that
        that.setData({
          exit: 1,
          user_type: 0
        });
        // that.onShow();// success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  }

})