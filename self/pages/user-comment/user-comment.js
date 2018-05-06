
//调用接口获取评价内容，其中包括评价人，对象，内容,返回类型：数组
//根据学生id或者老师id获取对应的老师或者学生的评价信息
//传递参数 openid
//var comment=  
//this.setData({comment:comment});

import  {Config} from '../../utils/config.js';
Page({

  /**
   * 页面的初始数据
   */

  data: {
  },
  onLoad:function(event){
    var id = wx.getStorageSync('id');
    var user_type = wx.getStorageSync('type');
    console.log(user_type)
    this.setData({
      user_type: user_type,
      id: id
    })
    var that = this;
    if(user_type==2){
    wx.request({
      url: Config.baseUrl, //开发者服务器中转接口
      data: {
        c: 'WxLoadTeaPersonal',
        a: 'loadComment',
        tea_id: id//需要传入的参数，必须与tp3中的方法函数所需参数一致，仅作示例
      },//c为controller，a为方法
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {//res是一个对象，里面有若干key
        var obj = JSON.parse(res.data);
        console.log(obj)
        that.setData({
          tea_comment: obj
        })
      }//res.data是开发者服务器传回来的数据,
      //res.statusCode是开发者服务器状态码
    })
    wx.request({
      url: Config.baseUrl,
      data:{
        c: 'WxLoadTeaPersonal',
        a: 'loadMyComment',
        tea_id:id
      },
      header:{
        'content-type':'application/json'
      },
      success:function(res){
        var obj = JSON.parse(res.data);
        console.log(obj)
        that.setData({
          send_comment:obj
        })
      }
    })
    }
    else{
    wx.request({
      url: Config.baseUrl, //开发者服务器中转接口
      data: {
        c: 'WxLoadStuPersonal',
        a: 'loadComment',
        stu_id: id//需要传入的参数，必须与tp3中的方法函数所需参数一致，仅作示例
      },//c为controller，a为方法
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {//res是一个对象，里面有若干key
        var obj = res.data;
        console.log(obj)
        that.setData({
          stu_comment: obj
        })
      }//res.data是开发者服务器传回来的数据,
      //res.statusCode是开发者服务器状态码
    })
    wx.request({
      url: Config.baseUrl,
      data:{
        c: 'WxLoadStuPersonal',
        a: 'loadTeaComment',
        stu_id:id
      }, header: {
        'content-type': 'application/json'
      },
      success: function (res) {//res是一个对象，里面有若干key
        var obj = JSON.parse(res.data);
        console.log(obj)
        that.setData({
          receive_comment: obj
        })
        }
    
    })
    
    }
  }
})