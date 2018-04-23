var app = require('../../app.js')
var util = require('../../utils/util.js');
var stu_id ;
Page({

  data: ({
    multiArray: [
      ['小学', '初中', "高中", "大学"],
      ['一年级', '二年级', '三年级', '四年级', '五年级', "六年级"]
    ], multiIndex: [0, 0],
    imgSrc: '/pages/images/chooseImg.png',
    isPostImg: 0
  }),
  //调用选取照片api
  onChooseImage: function (event) {
    // console.log("点击了选取照片事件");
    var that = this;
    this.data.isPostImg = 1;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths

        that.setData({
          imgSrc: tempFilePaths[0]
        });
        that.data.imgSrc = tempFilePaths[0];

      }
    })
  }
  ,

  checkTel: function (string) {
    var telFont = ['134', '135', '136', '137', '138', '139', '150', '151', '152', '157', '158', '159',
      '182', '183', '184', '187', '188', '178', '147', '130', '131', '132', '155', '156', '185',
      '186', '176', '133', '153', '180', '181', '189', '177']
    var check = string.substring(0, 3)
    var exist = util.in_array(check, telFont);
    if (exist) {
      return 1;
    } else {
      return 0;
    }
  }
  ,
  //校验注册的数据
  checkForm: function (postData) {
    console.log(postData)
    var type = postData.type;
    var tea_name = postData.tea_name;
    var stu_name = postData.stu_name;
    var gender = postData.gender;
    var tel = postData.tel;
    var age = postData.age;
    var check = 1;

    if (!tel) {
      check = 0;
    } else if (!tea_name && !stu_name) {
      check = 0;
    } else if (!gender) {
      check = 0;
    } else if (!age) {
      check = 0;
    } else if (tel.length < 11) {
      check = 0;
    } else if (!this.checkTel(tel)) {
      check = 0;
    }
    else { }

    if (check == 0) {
      wx.hideLoading();
      wx.showModal({
        title: '您有信息遗漏或错误，请检查',
        showCancel: false,
      });
      return false;
    }
    else {
      return true;
    }
  }
  ,
  //提交数据到后台
  formSubmit: function (e) {

    var that = this;

    wx.showLoading({
      title: '正在发送',
      mask: true
    });

    var type = e.detail.value.type;
    var openid = app.openid;
    var stu_name = e.detail.value.name;
    var tea_name = e.detail.value.name;
    var gender = e.detail.value.gender;
    var age = e.detail.value.age;
    var tel = e.detail.value.tel;
    var self_introduction = e.detail.value.description;
    var pwd = e.detail.value.password;
    var postData = {};
    var that = this;

    //学生注册时
    if (type == 1) {
      postData = {
        c: 'WxRegister',
        a: 'register',
        type: type,//这是学生
        openid: wx.getStorageSync('openid'),//需要传入的参数，必须与tp3中的方法函数所需参数一致
        stu_name: stu_name,
        gender: gender,
        age: age,
        stu_photo_url: '',
        tel: tel,
        grade: this.data.multiArray[0][e.detail.value.grade[0]] + this.data.multiArray[1][e.detail.value.grade[1]]
      };

      //必须要上传图片
      if (this.data.isPostImg == 0) {
        wx.hideLoading();
        wx.showModal({
          title: '未上传图片',
          showCancel: false
        })
        return ;
      }
      //必须先获取图片在服务器上的地址（即外网地址）
      wx.uploadFile({
        url: 'https://47207130.huixuehuijiao.cn/application/controllers/uploadimg/upload_file.php',
        filePath: this.data.imgSrc,
        name: 'file',
        success: function (res) {
          console.log(res);
          var resultData = JSON.parse(res.data);
          console.log(resultData);
          var data = resultData.photo_url;//返回图片服务器地址

          postData.stu_photo_url = data;//将图片外网地址加入到postData中

          if (that.checkForm(postData)) {
            //发送注册数据postData到后台
            wx.request({
              url: 'https://47207130.huixuehuijiao.cn/application/controllers/transit_api.php',
              data: postData,
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
                console.log(JSON.parse(res.data));
                var status = JSON.parse(res.data).status
                if (status == 1) {//状态值为1时注册成功
                  //刷新缓存
                  wx.request({
                    url: 'https://47207130.huixuehuijiao.cn/application/controllers/transit_api.php',
                    data: {
                      c: 'WxLogin',
                      a: 'loginPersonalCenter',
                      openid: wx.getStorageSync('openid')//需要传入的参数，必须与tp3中的方法函数所需参数一致
                    },
                    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT    
                    // header: {}, // 设置请求的 header    
                    success: function (res) {
                      console.log(res.data);//data里面是微信api返回的session_key,openid，json格式的字符串
                      var obj = JSON.parse(res.data);
                      stu_id = obj.stu_id;//将json格式对象化
                      //obj.openid 获取的openid
                      // obj.expires_in = Date.now() + res.data.expires_in;//存进缓存中，用于在if中判断是否过期

                      // wx.setStorageSync('openid', obj.openid);
                      wx.setStorageSync('type', obj.type);//存储openid+密钥，其实不安全
                      if ('1' == obj.type) {
                        wx.setStorageSync('id', obj.stu_id);//学生
                      } else if ('2' == obj.type) {
                        wx.setStorageSync('id', obj.tea_id);//已通过的老师
                      } else if ('-1' == obj.type) {
                        wx.setStorageSync('id', obj.tea_id);//审核中的老师
                      } else {
                        wx.setStorageSync('id', ' ');
                      }

                    }
                  });
                  //新学生注册后，给他添加所有审核通过课程的一次试听机会
                  wx.request({
                    url: 'https://47207130.huixuehuijiao.cn/application/controllers/transit_api.php',
                    data: {
                      c: 'WxDemoLesson',
                      a: 'newStuDemo',
                      stu_id: stu_id,
                    },
                    method: 'GET'
                  });
                  wx.hideLoading();
                  wx.showModal({
                    title: '注册成功',
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
                    title: '注册失败',
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
          }
        }
      })

    }
    //老师注册时
    else {
      postData = {
        c: 'WxRegister',
        a: 'register',
        type: type,//这是老师
        openid: openid,//需要传入的参数，必须与tp3中的方法函数所需参数一致
        tea_name: tea_name,
        gender: gender,
        age: age,
        tea_photo_url: '',
        tel: tel,
        self_introduction: self_introduction,
        pwd: pwd
      };

      //---------------------------老师信息检查-------------------//
      var result = this.checkTeacherInfo(postData)
      if (!result) {
        return;
      }

      //必须先获取图片在服务器上的地址（即外网地址）
      wx.uploadFile({
        url: 'https://47207130.huixuehuijiao.cn/application/controllers/uploadimg/upload_file.php',
        filePath: this.data.imgSrc,
        name: 'file',
        success: function (res) {
          var resultData = JSON.parse(res.data);
          console.log(resultData.photo_url)
          var data = resultData.photo_url;//返回图片服务器地址

          postData.tea_photo_url = data;//将图片外网地址加入到postData中

          if (that.checkForm(postData)) {
            //发送注册数据postData到后台
            wx.request({
              url: 'https://47207130.huixuehuijiao.cn/application/controllers/transit_api.php',
              data: postData,
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
                var status = JSON.parse(res.data).status
                if (status == 1) {//状态值为1时注册成功
                  //刷新缓存
                  wx.request({
                    url: 'https://47207130.huixuehuijiao.cn/application/controllers/transit_api.php',
                    data: {
                      c: 'WxLogin',
                      a: 'loginPersonalCenter',
                      openid: wx.getStorageSync('openid')//需要传入的参数，必须与tp3中的方法函数所需参数一致
                    },
                    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT    
                    // header: {}, // 设置请求的 header    
                    success: function (res) {
                      console.log(res.data);//data里面是微信api返回的session_key,openid，json格式的字符串
                      var obj = JSON.parse(res.data);//将json格式对象化
                      //obj.openid 获取的openid
                      // obj.expires_in = Date.now() + res.data.expires_in;//存进缓存中，用于在if中判断是否过期
                      console.log('12300');
                      // wx.setStorageSync('openid', obj.openid);
                      wx.setStorageSync('type', obj.type);//存储openid+密钥，其实不安全
                      if ('1' == obj.type) {
                        wx.setStorageSync('id', obj.stu_id);//学生
                      } else if ('2' == obj.type) {
                        wx.setStorageSync('id', obj.tea_id);//已通过的老师
                      } else if ('-1' == obj.type) {
                        wx.setStorageSync('id', obj.tea_id);//审核中的老师
                      } else {
                        wx.setStorageSync('id', '');
                      }

                    }
                  });

                  wx.hideLoading();
                  wx.showModal({
                    title: '注册成功',
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
                    title: '注册失败',
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
          }
        }
      })

    };

  }
  ,
  //当老师选择注册类型为老师时，隐藏年级框，出现自我介绍框
  iAmteacher: function () {
    this.setData({
      signInType: 1
    })
  },
  //当学生选择注册类型为学生时，出现年级框，隐藏自我介绍框
  iAmStudent: function () {
    this.setData({
      signInType: 0
    })
  },
  checkTeacherInfo: function (postData) {
    if (postData.self_introduction.length == 0) {
      wx.hideLoading();
      wx.showModal({
        title: '信息错漏',
        showCancel: false,
      })
      return false;
    }
    else if (postData.pwd.length == 0) {
      wx.hideLoading();
      wx.showModal({
        title: '信息错漏',
        showCancel: false,
      })
      return false;
    }
    else if (this.data.isPostImg == 0) {
      wx.hideLoading();
      wx.showModal({
        title: '未上传图片',
        showCancel: false
      })
      return false;
    }
    else {
      if (util.checkPoison(postData.self_introduction)) {
        console.log("描述有毒！");
        wx.hideLoading();
        wx.showModal({
          title: '信息非法',
          showCancel: false
        })
        return false;
      }
      else if (util.checkPoison(postData.pwd)) {
        wx.hideLoading();
        wx.showModal({
          title: '信息非法',
          showCancel: false
        })
        return false;
      }
    }
    return true;
  },
  //当选择阶段时动态改变年级
  bindMultiPickerColumnChange: function (e) {
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (data.multiIndex[0]) {
      case 0:
        data.multiArray[1] = ['一年级', '二年级', '三年级', '四年级', '五年级', "六年级"];

        break;
      case 1:
        data.multiArray[1] = ['一年级', '二年级', '三年级'];

        break;
      case 2:
        data.multiArray[1] = ['一年级', '二年级', '三年级'];

        break;
      case 3:
        data.multiArray[1] = ['一年级', '二年级', '三年级', '四年级'];

        break;
    }

    this.setData(data);
  }

})