let domainsFuc = (env) => {
  let domain, domain2, bucket, uri = location.host;
  if (uri.includes('test')) {
    domain = 'https://pretest.i31.com/AIR/CRM'
    bucket = ''

  } else {
    domain = 'https://m.balpu.com/AIR/CRM';
    bucket = ''
  }

  // domain = 'http://192.168.21.222:7011/APi/' //测试地址
  // domain2 = 'http://192.168.21.222:8013/APi/'  //测试上传文件接口



  // domain = 'http://192.168.0.216:8101/APi/'  //线上地址  精诚私有化

  // domain = 'http://202.202.202.10:8003/APi/'  //私有 赛豪

  // domain = 'https://api.wfjar.com:8001/APi/'  //线上测试地址  精诚 

  // domain = 'http://121.199.47.49/APi/'  //线上地址 正式运营博森


  // domain = 'https://api.moldcube.com/api/'  //正式  ip 121.199.47.49
  // domain = 'https://api.moldcube.com:8101/api/'  //综合新接口 
  domain = window.baseURL
  // domain = 'http://60.12.64.167:8100/api/'  // 测试地址


  // domain = 'https://data.yunmars.com:8100/api/'  //接口 2022.9.19


  // domain2 = 'https://img.wfjar.com/APi/'  //正式上传文件接口


  return {
    domain: domain,
    domain2: domain2,
    ossBucket: bucket,
    ossDomain: '',

    ossRegion: "",
  }
};
export default domainsFuc
