// pages/teacherDetail/teacherDetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //测试数据

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var teacherId = options.teacherId;
        var that = this;
        console.log(teacherId);
        var id = wx.getStorageSync('id');
        var that = this;
        wx.request({
          url: 'https://47207130.huixuehuijiao.cn/application/controllers/transit_api.php', //开发者服务器中转接口
            data: {
                c: 'WxLoadStuPersonal',
                a: 'loadTeaInfo',
                tea_id: teacherId//需要传入的参数，必须与tp3中的方法函数所需参数一致，仅作示例
            },//c为controller，a为方法
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {//res是一个对象，里面有若干key
                console.log(res.data)
                var obj = JSON.parse(res.data);
                that.setData({
                    tea_info: obj
                })
            }//res.data是开发者服务器传回来的数据,
            //res.statusCode是开发者服务器状态码
        });
        wx.request({
          url: 'https://47207130.huixuehuijiao.cn/application/controllers/transit_api.php', //开发者服务器中转接口
            data: {
                c: 'WxLoadTeaPersonal',
                a: 'loadTeaClsingList',//加载老师的“我的课程”里正在进行的课
                tea_id: teacherId//
            },
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {//res是一个对象，里面有若干key
                console.log(res.data)
                var obj = JSON.parse(res.data);
                that.setData({
                    courseList: obj
                })
            }//res.data是开发者服务器传回来的数据,
            //res.statusCode是开发者服务器状态码
        });
    },
})