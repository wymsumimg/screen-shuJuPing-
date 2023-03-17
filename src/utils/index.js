function formatNumber(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}
/**
 
 
 * describe:格式化时间
 * params:{
  *
  * }
 **/
export function formatTimeShow(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1}`
}
/**
 
 
 * describe:验证手机号
 * params:{
  *
  * }
 **/
export function checkPhone(mobile) {
  let reg = /(^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$)|(^((\(\d{3}\))|(\d{3}\-))?(1[3456789]\d{9})$)/;
  return reg.test(mobile)
};
/**
 
 
 * describe:验证手机号
 * params:{
  *
  * }
 **/
export function checkMobile(mobile) {
  let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
  return reg.test(mobile)
};


/**
 ** 乘法函数，用来得到精确的乘法结果
 ** 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
 ** 调用：accMul(arg1,arg2)
 ** 返回值：arg1乘以 arg2的精确结果
 **/
export function accMul(arg1 = 0, arg2 = 0) {
  var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length;
  }
  catch (e) {
  }
  try {
    m += s2.split(".")[1].length;
  }
  catch (e) {
  }
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}


/**
 ** 加法函数，用来得到精确的加法结果
 ** 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
 ** 调用：accAdd(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 **/
export function accAdd(arg1 = 0, arg2 = 0) {
  var r1, r2, m, c;
  try {
    r1 = arg1.toString().split(".")[1].length;
  }
  catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  }
  catch (e) {
    r2 = 0;
  }
  c = Math.abs(r1 - r2);
  m = Math.pow(10, Math.max(r1, r2));
  if (c > 0) {
    var cm = Math.pow(10, c);
    if (r1 > r2) {
      arg1 = Number(arg1.toString().replace(".", ""));
      arg2 = Number(arg2.toString().replace(".", "")) * cm;
    } else {
      arg1 = Number(arg1.toString().replace(".", "")) * cm;
      arg2 = Number(arg2.toString().replace(".", ""));
    }
  } else {
    arg1 = Number(arg1.toString().replace(".", ""));
    arg2 = Number(arg2.toString().replace(".", ""));
  }
  return (arg1 + arg2) / m;
}


/** 
 ** 除法函数，用来得到精确的除法结果
 ** 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
 ** 调用：accDiv(arg1,arg2)
 ** 返回值：arg1除以arg2的精确结果
 **/
export function accDiv(arg1 = 0, arg2 = 1) {
  var t1 = 0, t2 = 0, r1, r2;
  try {
    t1 = arg1.toString().split(".")[1].length;
  }
  catch (e) {
  }
  try {
    t2 = arg2.toString().split(".")[1].length;
  }
  catch (e) {
  }
  r1 = Number(arg1.toString().replace(".", ""));
  r2 = Number(arg2.toString().replace(".", ""));
  return (r1 / r2) * Math.pow(10, t2 - t1);
}
/**
 
 
 * describe:判断数据类型
 * params:{
  *  obj：数据
  * }
 **/
export function getType(obj) {
  let toString = Object.prototype.toString;
  let map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  return map[toString.call(obj)];
};
/**
 
 
 * describe:深拷贝
 * params:{
  *  data：数据
  * }
 **/
export function deepClone(data) {
  let type = getType(data);
  let obj;
  if (type === 'array') {
    obj = [];
  } else if (type === 'object') {
    obj = {};
  } else {
    return data;
  }
  if (type === 'array') {
    for (let i = 0, len = data.length; i < len; i++) {
      obj.push(deepClone(data[i]));
    }
  } else if (type === 'object') {
    for (let key in data) {
      obj[key] = deepClone(data[key]);
    }
  }
  return obj;
};
/**
 
 
 * describe:表情转换为8进制
 * params:{
  *  str：字符串
  * }
 **/
export function utf16toEntities(str) {
  if (getType(str) !== 'string') {
    return str
  }
  var patt = /[\ud800-\udbff][\udc00-\udfff]/g;
  // 检测utf16字符正则
  str = str.replace(patt, function (char) {
    var H, L, code;
    if (char.length === 2) {
      H = char.charCodeAt(0);
      // 取出高位
      L = char.charCodeAt(1);
      // 取出低位
      code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00;
      // 转换算法
      return "&#" + code + ";";
    } else {
      return char;
    }
  });
  return str;
};
/**
 
 
 * describe:8进制转换为表情
 * params:{
  *  str：字符串
  * }
 **/
export function entitiestoUtf16(str) {
  if (getType(str) !== 'string') {
    return str
  }
  // 检测出形如&#12345;形式的字符串
  var strObj = utf16toEntities(str);
  var patt = /&#\d+;/g;
  var H, L, code;
  var arr = strObj.match(patt) || [];
  for (var i = 0; i < arr.length; i++) {
    code = arr[i];
    code = code.replace('&#', '').replace(';', '');
    // 高位
    H = Math.floor((code - 0x10000) / 0x400) + 0xD800;
    // 低位
    L = (code - 0x10000) % 0x400 + 0xDC00;
    code = "&#" + code + ";";
    var s = String.fromCharCode(H, L);
    strObj = strObj.replace(code, s);
  }
  return strObj;
};
export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}
export function handleKey(file) {
  if (!file) {
    return {}
  }
  if (file.type.split('/')[0] == 'image') {
    return makeFileObj(1, file, file.type.split('/')[1]);
  } else if (file.type.split('/')[0] == 'video') {
    return makeFileObj(3, file, file.type.split('/')[1]);
  } else if (file.type.split('/')[1] == 'msword') {
    return makeFileObj(5, file, 'doc');
  } else if (file.type.split('/')[1] == 'vnd.openxmlformats-officedocument.wordprocessingml.document') {
    return makeFileObj(5, file, 'docx');
  } else if (file.type.split('/')[1] == 'vnd.ms-excel') {
    return makeFileObj(7, file, 'xls');
  } else if (file.type.split('/')[1] == 'vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
    return makeFileObj(7, file, 'xlsx');
  } else if (file.type.split('/')[1] == 'vnd.ms-powerpoint') {
    return makeFileObj(8, file, 'ppt');
  } else if (file.type.split('/')[1] == 'vnd.openxmlformats-officedocument.presentationml.presentation') {
    return makeFileObj(8, file, 'pptx');
  } else if (file.type.split('/')[1] == 'pdf') {
    return makeFileObj(6, file, 'pdf');
  } else if (file.type.split('/')[1] == 'plain') {
    return makeFileObj(4, file, 'txt')
  } else if (file.type.split('/')[0] == 'audio') {
    return makeFileObj(9, file, file.type.split('/')[1]);
  } else {
    return makeFileObj(127, file, file.type.split('/')[1]);
  }
};

export function makeFileObj(type, file, endType) {
  let content = {};
  content.type = type;
  content.fileName = file.name;
  content.endType = endType;
  return content;
};
export function getEditHtml(str) {
  if (!str) {
    return;
  }
  return str.replace(/<img/g, "<img style=\'width:100%\'")
}

export function checkExpression(str) {
  let emoji = /[\ud800-\udbff][\udc00-\udfff]/;
  let reg = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
  // console.log(str);
  if (str) {
    str = str.toString()
  }
  if ((!str) || emoji.test(str) || str.trim() === '') {
    return false;
  }
  return true;
}

export function toSendFormat(str) {
  if (!str) {
    return '';
  }
  let newStr = str.replace('<', '&lt;').replace('>', '&gt;').replace(/\n|\r\n/g, "<br>").replace(/[ ]/g, "<span>&nbsp;</span>");
  return newStr;
};

export function toGetFormat(str) {
  if (!str) {
    return '';
  }
  let newStr = entitiestoUtf16(str).replace(/<br>/ig, "\n").replace(/&nbsp;/g, " ").replace('&lt;', '<').replace('&gt;', '>');
  return newStr;
};

export function toTree(data, parentId, ifCalc = false) {
  var tree = [];
  var temp = [];
  for (var i = 0; i < data.length; i++) {
    if (data[i].parentId == parentId) {
      var obj = data[i];
      temp = toTree(data, data[i].id, ifCalc);
      if (temp.length > 0) {
        obj.children = temp;
        if (ifCalc) {
          let customerCount = 0;
          let memberCount = 0;
          for (let i = 0; i < temp.length; i++) {
            const ele = temp[i];
            customerCount += ele.customerCount
            memberCount += ele.memberCount
          }
          obj.customerCount += customerCount
          obj.memberCount += memberCount
        }
      } else {
        obj.children = []
      }
      tree.push(obj);
    }
  }
  return tree;
}

// 换肤加class函数
export function toggleClass(element, className) {
  // console.log(element,'element')
  // console.log(className,'className')
  if (!element || !className) {
    return;
  }
  element.className = className;
}

// 获取当前年月日时分秒
export function getTime() {
  let yy = new Date().getFullYear();
  let mm = (new Date().getMonth() + 1) < 10 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1);
  let dd = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate();
  let hh = new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours();
  let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
  let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
  var gettimes = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss;
  return gettimes
}
export function getTime2() {
  let yy = new Date().getFullYear();
  let mm = (new Date().getMonth() + 1) < 10 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1);
  let dd = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate();
  let hh = new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours();
  let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
  let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
  var gettimes = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf;
  return gettimes
}

// 获取当前年月日
export function getNowFormatDate() {
  var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;
}

// hh:mm:ss -> 时分秒时间戳

export function time_to_sec(time) {
  if (time !== null) {
    var s = "";
    var hour = time.split(":")[0];
    var min = time.split(":")[1];
    var sec = time.split(":")[2];
    s = Number(hour * 3600) + Number(min * 60) + Number(sec);
    return s;
  }
}


// 时分秒时间戳 -> hh:mm:ss

export function times(totalsecond) {
  if (totalsecond > 0) {
    var d = 3599.9583333;
    var m = 59.999305;

    var day = parseInt(totalsecond / d / 24);
    var H = parseInt(parseInt(totalsecond - day * d * 24) / d);
    var M = parseInt(parseInt(totalsecond - day * d * 24 - H * d) / m);
    var s = parseInt(totalsecond - Math.abs(Math.round(day * d * 24 + H * d + M * m)));

    let hh = H < 10 ? '0' + H : H;
    let mm = M < 10 ? '0' + M : M;
    let ss = s < 10 ? '0' + s : s;


    return (day > 0 ? (day + '天') : '') + hh + ':' + mm + ':' + ss;
  } else {
    return '00:00:00'
  }






}

// 昨天时间

export function yestodayTimeFun() {
  var day1 = new Date();
  day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000);
  var s1 = day1.getFullYear() + "-" + ((day1.getMonth() + 1) < 10 ? '0' + (day1.getMonth() + 1) : (day1.getMonth() + 1)) + "-" + (day1.getDate() < 10 ? '0' + day1.getDate() : day1.getDate());
  return s1
  // console.log(s1,'昨天的时间')
}

export function todayTimeFun() {
  var day1 = new Date();
  day1.setTime(day1.getTime() - 60 * 60 * 1000);
  var s1 = day1.getFullYear() + "-" + ((day1.getMonth() + 1) < 10 ? '0' + (day1.getMonth() + 1) : (day1.getMonth() + 1)) + "-" + (day1.getDate() < 10 ? '0' + day1.getDate() : day1.getDate());
  return s1
  // console.log(s1,'昨天的时间')
}

// 升序
//封装一个数组排序方法
export function compare(key, desc) {
  //key:  用于排序的数组的key值
  //desc： 布尔值，为true是升序排序，false是降序排序
  return function (a, b) {
    let value1 = a[key];
    let value2 = b[key];
    if (desc == true) {
      // 升序排列
      return value1 - value2;
    } else {
      // 降序排列
      return value2 - value1;
    }
  };
}
//然后使用数组排序方法
// arr.sort(compare('age',false));    


//数组对象排序 正序
export function sortByKey(array, key) {
  return array.sort(function (a, b) {
    var x = a[key];
    var y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });
}
//数组对象排序 倒序
export function sortByKeyDesc(array, key) {
  return array.sort(function (a, b) {
    var x = a[key];
    var y = b[key];
    return x > y ? -1 : x < y ? 1 : 0;
  });
}

// timestamp=12 24 48 72 时间戳转时分秒
export function timestampToTime(timestamp) {
  var time = new Date().getTime() - timestamp * 60 * 60 * 1000
  var date = new Date(time);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = date.getDate() + ' ';
  var h = date.getHours() + ':';
  var m = date.getMinutes() + ':';
  var s = date.getSeconds();
  return Y + M + D + h + m + s;
}
// checkDate选中的固定时间  timestamp：12  24  48小时
export function checkDateToTime(checkDate, timestamp) {
  var time = new Date(checkDate).getTime() + timestamp * 60 * 60 * 1000
  var date = new Date(time);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = date.getDate() + ' ';
  var h = date.getHours() + ':';
  var m = date.getMinutes() + ':';
  var s = date.getSeconds();
  return Y + M + D + h + m + s;
}
// 现有日期补零
export function changeBL(dateName) {
  let ymd = dateName.split(' ')[0];
  let hms = dateName.split(' ')[1];
  let ymd1 = ymd.split('-')[1];
  let ymd2 = Number(ymd.split('-')[2]) < 10 ? '0' + ymd.split('-')[2] : ymd.split('-')[2];
  let hms0 = Number(hms.split(':')[0]) < 10 ? '0' + hms.split(':')[0] : hms.split(':')[0];
  let hms1 = Number(hms.split(':')[1]) < 10 ? '0' + hms.split(':')[1] : hms.split(':')[1];
  let hms2 = Number(hms.split(':')[2]) < 10 ? '0' + hms.split(':')[2] : hms.split(':')[2];

  let jingeTime = ymd.split('-')[0] + '-' + ymd1 + '-' + ymd2 + ' ' + hms0 + ':' + hms1 + ':' + hms2;

  return jingeTime;
}


//  获取指定日期的前一天 后一天
// date 代表指定的日期，格式：2018-09-27
// day 传-1表始前一天，传1表始后一天
// JS获取指定日期的前一天，后一天
export function getNextDate(date, day) {
  var dd = new Date(date);
  dd.setDate(dd.getDate() + day);
  var y = dd.getFullYear();
  var m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
  var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
  return y + "-" + m + "-" + d;
};

