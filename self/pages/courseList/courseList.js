// pages/courseList/courseList.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ischoose: 0,

    stages: [
      '小学',
      '初中',
      '高中',
      '大学'
    ],
    subjects: [
      '不限',
      '语文',
      '数学',
      '英语',
      '政治',
      '音乐',
      '美术',
      '其他'
    ],
    methods: [
      '不限',
      '上门',
      '店面'
    ],
    g_class: '年级',
    subject: '科目',
    method: '方式',
    stage: '阶段',
    postData: {
      'subject': "",
      'grade': "",
      'method': "",
      'stage': "",
      'class': ""
    },
    multiArray: [
      ['不限', '小学', '初中', "高中", "大学"],
      ['不限', '一年级', '二年级', '三年级', '四年级', '五年级', "六年级"]
    ],
    multiIndex: [0, 0]
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: 'https://47207130.huixuehuijiao.cn/application/controllers/transit_api.php',

      //加载全部课程界面
      data: {
        c: 'WxLoadCls',
        a: 'loadCls',//提供筛选功能加载课程 
        full: '',//-1未满人，1满人 注意不能传0！
        grade: '',//规格化
        subject: '',//规格化
        method: '',//-1为上门，1为到店 注意不能传0！
      },//参数为空时表示该条件无要求，默认加载全部页面时参数全填空，再根据用户选择的条件传入参数加载特定课程
      method: 'GET', // 

      success: function (res) {
        var course_List = JSON.parse(res.data)
        var courseList = [];
        console.log(course_List)
        for (var idx in course_List) {
          var classId = course_List[idx].class_id;
          var teacherImg = course_List[idx].class_photo;
          var courseName = course_List[idx].subject;
          var courseDescription = course_List[idx].class_introduction;
          var teacher = course_List[idx].tea_id;
          var stuCount = course_List[idx].stu_count;
          if (courseDescription.length >= 25) {
            courseDescription = courseDescription.substring(0, 25) + "..."
          }
          var course = {
            classId: classId,
            teacherImg: teacherImg,
            courseName: courseName,
            teacher: teacher,
            courseDescription: courseDescription,
            stuCount: stuCount,
          }
          courseList.push(course)
        };

        that.setData(
          {
            courseList: courseList
          }
        )
      }
    });


  },

  chooseClass: function (e) {
    var that = this;
    var grade = this.data.postData.grade;
    var method = this.data.postData.method;
    var subject = this.data.postData.subject;
    console.log(grade + method + method)
    wx.request({
      url: 'https://47207130.huixuehuijiao.cn/application/controllers/transit_api.php',

      //加载全部课程界面
      data: {
        c: 'WxLoadCls',
        a: 'loadCls',//提供筛选功能加载课程 
        full: '',//-1未满人，1满人 注意不能传0！
        grade: grade,//规格化
        subject: subject,//规格化
        method: method,//-1为上门，1为到店 注意不能传0！
      },//参数为空时表示该条件无要求，默认加载全部页面时参数全填空，再根据用户选择的条件传入参数加载特定课程
      method: 'GET', // 

      success: function (res) {
        var course_List = JSON.parse(res.data)
        var courseList = [];
        console.log(course_List)
        for (var idx in course_List) {
          var classId = course_List[idx].class_id;
          var teacherImg = course_List[idx].class_photo;
          var courseName = course_List[idx].subject;
          var courseDescription = course_List[idx].class_introduction;
          var teacher = course_List[idx].tea_id;
          var stuCount = course_List[idx].stu_count;
          if (courseDescription.length >= 25) {
            courseDescription = courseDescription.substring(0, 25) + "..."
          }
          var course = {
            classId: classId,
            teacherImg: teacherImg,
            courseName: courseName,
            teacher: teacher,
            courseDescription: courseDescription,
            stuCount: stuCount,
          }
          courseList.push(course)
        };

        that.setData(
          {
            courseList: courseList
          }
        )
      }
    });
  },
  onClassDetail: function (event) {

    var classId = event.currentTarget.dataset.classid;
    console.log(classId);
    wx.navigateTo({
      url: '/pages/courseDetail/courseDetail?classId=' + classId,
    })
  }
  ,
  subjectChange: function (e) {

    if (e.detail.value == 0) {
      this.data.postData.subject = ''
      //console.log('选择了不限')
      var subject = this.data.subjects[e.detail.value]

    }
    else {
      var subject = this.data.subjects[e.detail.value]
      this.data.postData.subject = subject;
      console.log(this.data.postData);
    }
    this.setData(
      { subject: subject }
    );
    this.chooseClass();
  }
  ,
  methodChange: function (e) {
    var that = this;
    var method;
    if (e.detail.value == 0) {
      method = ''
    } else if (e.detail.value == 1) {
      method = -1
    } else {
      method = 1
    }
    console.log(method);

    this.data.postData.method = method;
    console.log(this.data.postData);
    this.setData(
      {
        method: that.data.methods[e.detail.value],
      }
    );
    this.chooseClass();
  }
  ,

  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    if (e.detail.value[0] == 0 && e.detail.value[1] == 0) {
      this.data.postData.grade = '';
      this.setData({
        isChoose: 0
      });
      this.chooseClass();
    } else if (e.detail.value[0] == 0 && e.detail.value[1] != 0) {
      wx.showModal({
        title: "未选择年级",
        showCancel: "false"
      });
      return;
    } else if (e.detail.value[0] != 0 && e.detail.value[1] == 0) {
      wx.showModal({
        title: "未选择就读阶段",
        showCancel: "false"
      });
      return;
    } else {
      var stage = this.data.multiArray[0][e.detail.value[0]];
      var g_class = this.data.multiArray[1][e.detail.value[1]];
      this.data.postData.grade = stage + g_class;
      this.chooseClass();
    }

  },
  bindMultiPickerColumnChange: function (e) {
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (data.multiIndex[0]) {
      case 1:
        data.multiArray[1] = ['不限', '一年级', '二年级', '三年级', '四年级', '五年级', "六年级"];

        break;
      case 2:
        data.multiArray[1] = ['不限', '一年级', '二年级', '三年级'];

        break;
      case 3:
        data.multiArray[1] = ['不限', '一年级', '二年级', '三年级'];

        break;
      case 4:
        data.multiArray[1] = ['不限', '一年级', '二年级', '三年级', '四年级'];

        break;
    }

    this.setData(data);
  },
  noChoose: function (e) {
    this.setData({
      isChoose: 1
    })
  }
})