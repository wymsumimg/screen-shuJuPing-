import fetch from './request'
import fetch2 from './request2'


// // 上传文件
export function postUpFile(params) {
  return fetch2.post('UpLoad/postUpFile', params);
}

