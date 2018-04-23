// pages/courseDetail/courseDetail.js
var classid;
var ClsVer;
var id;
var tea_id;
var num;
var user_type;
var exit;
var openid;
function MD5(string) {
  function md5_RotateLeft(lValue, iShiftBits) {
    return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
  }
  function md5_AddUnsigned(lX, lY) {
    var lX4, lY4, lX8, lY8, lResult;
    lX8 = (lX & 0x80000000);
    lY8 = (lY & 0x80000000);
    lX4 = (lX & 0x40000000);
    lY4 = (lY & 0x40000000);
    lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
    if (lX4 & lY4) {
      return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
    }
    if (lX4 | lY4) {
      if (lResult & 0x40000000) {
        return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
      } else {
        return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
      }
    } else {
      return (lResult ^ lX8 ^ lY8);
    }
  }
  function md5_F(x, y, z) {
    return (x & y) | ((~x) & z);
  }
  function md5_G(x, y, z) {
    return (x & z) | (y & (~z));
  }
  function md5_H(x, y, z) {
    return (x ^ y ^ z);
  }
  function md5_I(x, y, z) {
    return (y ^ (x | (~z)));
  }
  function md5_FF(a, b, c, d, x, s, ac) {
    a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_F(b, c, d), x), ac));
    return md5_AddUnsigned(md5_RotateLeft(a, s), b);
  };
  function md5_GG(a, b, c, d, x, s, ac) {
    a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_G(b, c, d), x), ac));
    return md5_AddUnsigned(md5_RotateLeft(a, s), b);
  };
  function md5_HH(a, b, c, d, x, s, ac) {
    a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_H(b, c, d), x), ac));
    return md5_AddUnsigned(md5_RotateLeft(a, s), b);
  };
  function md5_II(a, b, c, d, x, s, ac) {
    a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_I(b, c, d), x), ac));
    return md5_AddUnsigned(md5_RotateLeft(a, s), b);
  };
  function md5_ConvertToWordArray(string) {
    var lWordCount;
    var lMessageLength = string.length;
    var lNumberOfWords_temp1 = lMessageLength + 8;
    var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
    var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
    var lWordArray = Array(lNumberOfWords - 1);
    var lBytePosition = 0;
    var lByteCount = 0;
    while (lByteCount < lMessageLength) {
      lWordCount = (lByteCount - (lByteCount % 4)) / 4;
      lBytePosition = (lByteCount % 4) * 8;
      lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
      lByteCount++;
    }
    lWordCount = (lByteCount - (lByteCount % 4)) / 4;
    lBytePosition = (lByteCount % 4) * 8;
    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
    lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
    lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
    return lWordArray;
  };
  function md5_WordToHex(lValue) {
    var WordToHexValue = "",
      WordToHexValue_temp = "",
      lByte, lCount;
    for (lCount = 0; lCount <= 3; lCount++) {
      lByte = (lValue >>> (lCount * 8)) & 255;
      WordToHexValue_temp = "0" + lByte.toString(16);
      WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
    }
    return WordToHexValue;
  };
  function md5_Utf8Encode(string) {
    string = string.replace(/\r\n/g, "\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    return utftext;
  };
  var x = Array();
  var k, AA, BB, CC, DD, a, b, c, d;
  var S11 = 7,
    S12 = 12,
    S13 = 17,
    S14 = 22;
  var S21 = 5,
    S22 = 9,
    S23 = 14,
    S24 = 20;
  var S31 = 4,
    S32 = 11,
    S33 = 16,
    S34 = 23;
  var S41 = 6,
    S42 = 10,
    S43 = 15,
    S44 = 21;
  string = md5_Utf8Encode(string);
  x = md5_ConvertToWordArray(string);
  a = 0x67452301;
  b = 0xEFCDAB89;
  c = 0x98BADCFE;
  d = 0x10325476;
  for (k = 0; k < x.length; k += 16) {
    AA = a;
    BB = b;
    CC = c;
    DD = d;
    a = md5_FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
    d = md5_FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
    c = md5_FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
    b = md5_FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
    a = md5_FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
    d = md5_FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
    c = md5_FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
    b = md5_FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
    a = md5_FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
    d = md5_FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
    c = md5_FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
    b = md5_FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
    a = md5_FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
    d = md5_FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
    c = md5_FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
    b = md5_FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
    a = md5_GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
    d = md5_GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
    c = md5_GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
    b = md5_GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
    a = md5_GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
    d = md5_GG(d, a, b, c, x[k + 10], S22, 0x2441453);
    c = md5_GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
    b = md5_GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
    a = md5_GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
    d = md5_GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
    c = md5_GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
    b = md5_GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
    a = md5_GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
    d = md5_GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
    c = md5_GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
    b = md5_GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
    a = md5_HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
    d = md5_HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
    c = md5_HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
    b = md5_HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
    a = md5_HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
    d = md5_HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
    c = md5_HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
    b = md5_HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
    a = md5_HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
    d = md5_HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
    c = md5_HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
    b = md5_HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
    a = md5_HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
    d = md5_HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
    c = md5_HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
    b = md5_HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
    a = md5_II(a, b, c, d, x[k + 0], S41, 0xF4292244);
    d = md5_II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
    c = md5_II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
    b = md5_II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
    a = md5_II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
    d = md5_II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
    c = md5_II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
    b = md5_II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
    a = md5_II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
    d = md5_II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
    c = md5_II(c, d, a, b, x[k + 6], S43, 0xA3014314);
    b = md5_II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
    a = md5_II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
    d = md5_II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
    c = md5_II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
    b = md5_II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
    a = md5_AddUnsigned(a, AA);
    b = md5_AddUnsigned(b, BB);
    c = md5_AddUnsigned(c, CC);
    d = md5_AddUnsigned(d, DD);
  }
  return (md5_WordToHex(a) + md5_WordToHex(b) + md5_WordToHex(c) + md5_WordToHex(d)).toLowerCase();
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "commentList": [

    ],
    numberDetail: 0,
    score: 4
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    id = wx.getStorageSync('id');
    user_type = wx.getStorageSync('type');
    exit = wx.getStorageSync('exit');
    openid = wx.getStorageSync('openid');
    classid = options.classId;
    var that = this;
    //获取课程信息
    wx.request({
      url: 'https://47207130.huixuehuijiao.cn/application/controllers/transit_api.php',
      data: {
        c: 'WxLoadCls',
        a: 'chooseCls',//点击一门课程查看详细信息
        class_id: classid//
      },//返回这门课程所有信息
      success: function (res) {
        console.log(JSON.parse(res.data));
        var detail = JSON.parse(res.data)
        tea_id = detail.tea_id;
        var subject = detail.subject;
        var fee = detail.fee;
        var teacher = detail.tea_name;
        var remain = detail.stu_count;
        var stu_count = detail.number_limit;
        var description = detail.class_introduction;
        var class_photo = detail.class_photo;

        that.setData(
          {
            tea_id: tea_id,
            subject: subject,
            fee: fee,
            teacher: teacher,
            remain: remain,
            stu_count: stu_count,
            description: description,
            class_photo: class_photo
          }
        )
      }
    });
    //获取课程评论
    wx.request({
      url: 'https://47207130.huixuehuijiao.cn/application/controllers/transit_api.php',
      data: {
        c: 'WxLoadCls',
        a: 'loadClsComment',//点击课程里的评论区拉取该课程所有评论 
        class_id: classid//
      },//返回该门课所有评论
      success: function (res) {
        var comment_List = JSON.parse(res.data)
        var commentList = [];
        // console.log(comment_List)
        for (var idx in comment_List) {
          var commentName = comment_List[idx].stu_name;
          var commentContent = comment_List[idx].content;
          var score = comment_List[idx].stars;
          var stars = [];
          for (var i = 1; i <= 5; i++) {
            if (i <= score) {
              stars.push(1);
            } else {
              stars.push(0);
            }
          }
          var course = {
            commentName: commentName,
            commentContent: commentContent,
            stars: stars
          }
          commentList.push(course)
        };

        that.setData(
          {
            commentList: commentList
          }
        )
      },
    });
  },
  onShop: function (event) {
    var demo = event.currentTarget.dataset.demo;
    
    var total_fee;

    if (demo == 1) {
      total_fee = 1
      num = 1;
    } else {
      num = this.data.numberDetail,
      total_fee = this.data.fee * num * 100
      if(num == 0){
        wx.showModal({
          title: '请检查课时数量',
          showCancel: false,
        })
        return;
      }else if(this.data.fee == 0){
        wx.showModal({
          title: '该课程信息有误不能购买',
          showCancel: false,
        })
        return;
      }
    }
    // console.log(classid)
    if ((user_type == 1) && (exit == 0)) {
      //买课前确认没有重复购课
      wx.request({
        url: 'https://47207130.huixuehuijiao.cn/application/controllers/transit_api.php',
        data: {
          c: 'WxBuyCls',
          a: 'checkRepeatCls',
          stu_id: id,
          class_id:classid,
          demo:demo
        }, success: function (res) {
          var status = JSON.parse(res.data).status
          var chance = JSON.parse(res.data).chance
          console.log(JSON.parse(res.data))
          if (status == 0) {//status=0，课程没有重复，允许购买
            wx.request({
              url: 'https://47207130.huixuehuijiao.cn/application/controllers/transit_api.php',
              data: {
                c: 'WxBuyCls',
                a: 'readVerCountFull',//返回课程的版本、已选人数、是否满人（-1未满，1已满）
                class_id: classid,
                demo: demo
              }, success: function (res) {
                var that = this;
                console.log(tea_id)
                var obj = JSON.parse(res.data)
                console.log(obj)
                ClsVer = obj.version;
                if (obj.full == -1) {
                  wx.request({
                    url: 'https://47207130.huixuehuijiao.cn/application/controllers/transit_api.php',
                    data: {
                      c: 'WxBuyCls',
                      a: 'tryUpdateStucount',//传入id和ver来试图更改这个id的stu_count+1，若版本号已被更新，则试图更改失败
                      class_id: classid,//
                      version: ClsVer,//上面保存的版本号
                      demo: demo
                    }, success: function (res) {
                      var obj = JSON.parse(res.data)
                      if (obj.result == 1) {
                        wx.request({
                          url: 'https://47207130.huixuehuijiao.cn/application/controllers/transit_api.php',
                          data: {
                            c: 'WxBuyCls',
                            a: 'updateVer',//将这门课的ver+1，阻止其他版本旧的请求，实现锁课成功
                            class_id: classid,
                            demo: demo
                          }, success: function (res) {
                            console.log("开始调用微信支付接口")
                            wx.request({
                              url: 'https://47207130.huixuehuijiao.cn/application/controllers/transit_api.php',
                              data: {
                                c: 'WxPay',
                                a: 'unifiedorder',
                                body: '慧学慧教-教育',//商品简单描述规范:商家名称-销售商品类目
                                total_fee: total_fee,//总金额 单位分
                                openid: openid
                              }, success: function (res) {
                                console.log('调用了获取prepayid接口'.res)
                                var obj = JSON.parse(res.data)
                                obj = JSON.parse(obj)
                                var status = obj.status;
                                var prepay_id = obj.prepay_id;
                                var pack = "prepay_id=" + prepay_id;
                                var timestamp = Date.parse(new Date());
                                timestamp = timestamp / 1000 + "";
                                console.log("当前时间戳为：" + timestamp);

                                var noncestr = Math.random().toString(36).substr(2, 25)
                                console.log(noncestr);

                                var strtemp = "appId=wxbcc21e5c81c3a11a&nonceStr=" + noncestr + "&package=" + pack + "&signType=MD5&timeStamp=" + timestamp;
                                console.log(strtemp)
                                var signtemp = strtemp + "&key=78F3CA5AA793C04CB328B51BFD762B5C";
                                var sign = MD5(signtemp).toUpperCase();
                                console.log('开始调用wxrequestpayment接口'.sign);
                                wx.requestPayment({
                                  'timeStamp': timestamp,
                                  'nonceStr': noncestr,
                                  'package': pack,
                                  'signType': 'MD5',
                                  'paySign': sign,
                                  'success': function (res) {
                                    //支付成功

                                    if (demo == 1) {
                                      if(chance==0){
                                        wx.showToast({
                                          title: '试听机会已用完',
                                        })
                                      }else{
                                      wx.request({
                                        url: 'https://47207130.huixuehuijiao.cn/application/controllers/transit_api.php',
                                        data: {
                                          c: 'WxDemoLesson',
                                          a: 'endChance',
                                          stu_id: id,
                                          class_id: classid,
                                          demo: demo
                                        }
                                      })}
                                    }
                                    wx.request({
                                      url: 'https://47207130.huixuehuijiao.cn/application/controllers/transit_api.php',
                                      data: {
                                        c: 'WxBuyCls',
                                        a: 'updateScore',
                                        stu_id: id,
                                        tea_id: tea_id,
                                        class_id: classid,
                                        remain_hour: num,//购买的学时
                                        demo: demo
                                      }, success: function (res) {
                                        if (demo == 1) {
                                          wx.showToast({
                                            title: '预约试听成功',
                                          })
                                        }
                                        else {
                                          wx.showToast({
                                            title: '购买成功',
                                          })
                                        }

                                      }
                                    })


                                  },
                                  'fail': function (res) {
                                    //支付失败
                                    console.log(res)
                                    wx.request({
                                      url: 'https://47207130.huixuehuijiao.cn/application/controllers/transit_api.php',
                                      data: {
                                        c: 'WxBuyCls',
                                        a: 'rollBack',
                                        class_id: classid,
                                        demo: demo
                                      }, success: function (res) {
                                        wx.showToast({
                                          title: '支付失败',
                                          image: '../images/clear.png'
                                        })
                                        // wx.navigateBack({
                                        //   delta:1,
                                        // })
                                      }

                                    })
                                  },
                                  'complete': function (res) { }
                                })
                              }
                            })


                          }

                        })
                      }
                      else {
                        th.onShop();
                      }
                    }

                  })
                }
                else {
                  wx.showToast({
                    title: '该门课程选课人数已满',
                  })
                  // wx.navigateBack({
                  //   delta: 1,
                  // })
                }
              }
            })
          }
          else{
            wx.showToast({
              title: '还有相同课程没上完哦',
            })
          }
        }

      })
    }
    else if ((user_type != 1)||(exit == 1)) {
      //提示登录后方可购买课程
      wx.showToast({
        title: '只有学生可购买课程',
      })
    }
  },
  onNum: function (event) {
    var num = event.currentTarget.dataset.numberdetail;
    if (num < 0) {
      num = 0
    }
    this.setData({
      numberDetail: num
    })
  }
})