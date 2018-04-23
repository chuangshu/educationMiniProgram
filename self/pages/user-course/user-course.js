// pages/user-course/user-course.js

//调用接口获取学生已选课程具体信息，包括课程名称，授课老师，成绩，剩余课时
// var stu_course=
//this.setData()
//调用接口获取老师已发布课程信息，包括课程名字，已选学生人数，课时时长，上课时间段，上课方式
//var tea_course=
// this.setData();
//获取学生或者老师的id


Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  onTeaCourse: function (event) {
    var class_id = event.target.dataset.classid;
    console.log(class_id);
    if (class_id) {
      wx.navigateTo({
        url: '/pages/stu_contact/stu_contact?class_id=' + class_id,
      })
    }

  },
  onStuCourse: function (event) {
    var class_id = event.target.dataset.classid;
    console.log(class_id)
    if (class_id) {
      wx.navigateTo({
        url: '/pages/toComment/toComment?class_id=' + class_id + '&id=' + this.data.id,
      })
    }
  },
  onApply: function (event) {
    var tea_id= event.target.dataset.id
    wx.navigateTo({
      url: '/pages/courseApply/courseApply?tea_id='+tea_id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var user_type = wx.getStorageSync('type');
    var id = wx.getStorageSync('id');
    console.log(user_type)
    this.setData({
      user_type: user_type,
      id: id
    })
    var that = this;
    if(user_type==2){
    wx.request({
      url: 'https://47207130.huixuehuijiao.cn/application/controllers/transit_api.php', //开发者服务器中转接口
      data: {
        c: 'WxLoadTeaPersonal',
        a: 'loadTeaClsingList',
        tea_id: id//需要传入的参数，必须与tp3中的方法函数所需参数一致，仅作示例
      },//c为controller，a为方法
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {//res是一个对象，里面有若干key
        var obj = JSON.parse(res.data);
        console.log(obj)
        that.setData({
          tea_clsing: obj
        })
      }
    })
    wx.request({
      url: 'https://47207130.huixuehuijiao.cn/application/controllers/transit_api.php', //开发者服务器中转接口
      data: {
        c: 'WxLoadTeaPersonal',
        a: 'loadTeaClsNeedCheckList',
        tea_id: id//需要传入的参数，必须与tp3中的方法函数所需参数一致，仅作示例
      },//c为controller，a为方法
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {//res是一个对象，里面有若干key
        var obj = JSON.parse(res.data);
        console.log(obj)
    
        that.setData({
          tea_needcheck: obj
        })
      }
    })
    wx.request({
      url: 'https://47207130.huixuehuijiao.cn/application/controllers/transit_api.php', //开发者服务器中转接口
      data: {
        c: 'WxLoadTeaPersonal',
        a: 'loadTeaClsedList',
        tea_id: id//需要传入的参数，必须与tp3中的方法函数所需参数一致，仅作示例
      },//c为controller，a为方法
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {//res是一个对象，里面有若干key
        var obj = JSON.parse(res.data);
        console.log(obj)

        that.setData({
          tea_clsed: obj
        })
      }
    })
    wx.request({
      url: 'https://47207130.huixuehuijiao.cn/application/controllers/transit_api.php', //开发者服务器中转接口
      data: {
        c: 'WxLoadTeaPersonal',
        a: 'loadTeaClsFailList',
        tea_id: id//需要传入的参数，必须与tp3中的方法函数所需参数一致，仅作示例
      },//c为controller，a为方法
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {//res是一个对象，里面有若干key
        var obj = JSON.parse(res.data);
        console.log(obj)
        // if(obj.method == -1){
        //   obj.method = '上门辅导'
        // }else{
        //   obj.method = '在店辅导'
        // }
        that.setData({
          tea_fail: obj
        })
      }
    })
    }
    else{
    wx.request({
      url: 'https://47207130.huixuehuijiao.cn/application/controllers/transit_api.php', //开发者服务器中转接口
      data: {
        c: 'WxLoadStuPersonal',
        a: 'loadStuClsingList',
        stu_id: id//需要传入的参数，必须与tp3中的方法函数所需参数一致，仅作示例
      },//c为controller，a为方法
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {//res是一个对象，里面有若干key
        var obj = JSON.parse(res.data);
        var book=[] ;
        var stu_clsing=[];
        for (var idx in obj) {
          if(obj[idx].demo == 1){
            book.push(obj[idx])
          }else{
            stu_clsing.push(obj[idx])
          }
        };
        that.setData({
          stu_clsing: stu_clsing,
          book:book
        })
      }
    })
    wx.request({
      url: 'https://47207130.huixuehuijiao.cn/application/controllers/transit_api.php', //开发者服务器中转接口
      data: {
        c: 'WxLoadStuPersonal',
        a: 'loadStuClsedList',
        stu_id: id//需要传入的参数，必须与tp3中的方法函数所需参数一致，仅作示例
      },//c为controller，a为方法
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {//res是一个对象，里面有若干key
        var obj = JSON.parse(res.data);
        that.setData({
          stu_clsed: obj
        })
      }
    })

  }}
  ,
  onShow:function(e){
    this.onLoad();
  }
})