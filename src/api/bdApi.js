import fetch from './request'
export function Get_all_device_timelength(params) {
    return fetch.post('allquery/Get_all_device_timelength', params);
}
export function Get_All_query_beilv(params) {
    return fetch.post('allquery/Get_All_query_beilv', params);
  }