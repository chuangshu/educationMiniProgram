function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//检验变量是否在数组中
function in_array (search, array) {
  console.log('调用了inarray函数')
  for (var i in array) {
    if (array[i] == search) {
      return true;
    }
  }
  return false;
}

//检验非法字符
function checkPoison  (string) {
  var array = ['@', '<', '>', '?', '$', '/', '!', '+', '^', '%', '#',"'",'"','*'];
  for (var i = 0; i <= string.length; i++) {
    var check = string.substring(i, i + 1);
    var poison = in_array(check, array);
    if (poison) {
      return 1;
    } else {
      return 0;
    }
  }
}


module.exports = {
  formatTime: formatTime,
  checkPoison:checkPoison,
  in_array:in_array
}
