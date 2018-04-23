// pages/stu_contact/stu_contact.js0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // stu_info: [{
    //   "por_url": "/pages/images/1.jpg",
    //   "name": "卓裕轩",
    //   "selected_course": "小学语文",
    //   "tel": "66666666"
    // }, {
    //   "por_url": "/pages/images/1.jpg",
    //   "name": "卓裕轩",
    //   "selected_course": "小学语文",
    //   "tel": "66666666"
    // }, {
    //   "por_url": "/pages/images/1.jpg",
    //   "name": "卓裕轩",
    //   "selected_course": "小学语文",
    //   "tel": "66666666"
    // }, {
    //   "por_url": "/pages/images/1.jpg",
    //   "name": "卓裕轩",
    //   "selected_course": "小学语文",
    //   "tel": "66666666"
    // }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  console.log(options)
  var that = this;
  var class_id=options.class_id;
  console.log(class_id)
  //调用接口获取学生信息，传递参数：class_id
  //var stu_info=''+options.class_id
  // this.setdata(
  //   stu_info
  // )
  wx.request({
    url: 'https://47207130.huixuehuijiao.cn/application/controllers/transit_api.php', //开发者服务器中转接口
    data: {
      c: 'WxLoadTeaPersonal',
      a: 'loadTeaClsingStuInfo',//“我的课程”中点击一门正在上的课，返回这门课所有学生的信息
      class_id: class_id
    },//c为controller，a为方法
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {//res是一个对象，里面有若干key
      console.log(res.data)
      var obj = JSON.parse(res.data)
      that.setData({
        stu_info:obj
      })
    }//res.data是开发者服务器传回来的数据,
    //res.statusCode是开发者服务器状态码
  })

  },


})