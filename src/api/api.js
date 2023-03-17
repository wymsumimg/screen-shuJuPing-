import fetch from './request';

/****************new****************/

// 登录接口
// export function employeeClientLogin(params) {
//   return fetch.post('Employee/ClientLogin', params);
// }

// // 角色-按钮权限-登录查询
// export function FindByID(params) {
//     return fetch.get('InspectProcess/FindByID',{
//       params
//     })
//   }
// 重置密码
export function set_user_pwd(params) {
    return fetch.get('dbuser/set_user_pwd', {
        params
    });
}

// （1）查询所有公司
export function GetCompList(params) {
    return fetch.get('dbcomp/GetCompList', {
        params
    });
}
// 查询当前设备所有状态的个数
export function Get_status_count_list(params) {
    return fetch.get('dbcomp/Get_status_count_list', {
        params
    });
}
// 查询所有车间
export function query_device_room(params) {
    return fetch.get('dbcomp/query_device_room', {
        params
    });
}

// 车间运行对比 柱状图
export function Get_room_runstatus_total_timelength(params) {
    return fetch.post('dbcomp/Get_room_runstatus_total_timelength', params);
}
// （5）运行统计，中间列表
export function Get_run_timelength_ave(params) {
    return fetch.post('dbcomp/Get_run_timelength_ave', params);
}
// 查询当前状态列表日志
export function Get_device_run_status_totaltimelength(params) {
    return fetch.post('dbcomp/Get_device_run_status_totaltimelength', params);
}

// 查询当前设备，每个状态的不同时段 的记录
// export function Get_run_status_log(params) {
//     return fetch.get('dbcomp/Get_run_status_log',{
//         params
//     })
// }
export function Get_run_status_log(params) {
    return fetch.post('dbcomp/Get_run_status_log', params);
}

// 导出
export function Get_device_run_status_totaltimelength_Excel(params) {
    return fetch.post('dbcomp/Get_device_run_status_totaltimelength_Excel', params);
}

// 用户登陆
export function get_user_login(params) {
    return fetch.get('dbuser/get_user_login', {
        params
    });
}

// 只查询离线数据 （大于30分钟的数据）
export function query_status_offline(params) {
    return fetch.post('dbcomp/query_status_offline', params);
}

// 黄岩设备数据统计
export function get_number_ave_time(params) {
    return fetch.post('dbcomp/get_number_ave_time', params);
}

// 低速运行设备
export function query_FeedrateOverride_list(params) {
    return fetch.post('dbcomp/query_FeedrateOverride_list', params);
}

// 查询昨天的数据统计
export function query_dev_tongji(params) {
    return fetch.get('dbcomp/query_dev_tongji', {
        params
    });
}

// 高校运行
export function query_gaoxiao_run_list(params) {
    return fetch.get('dbcomp/query_gaoxiao_run_list', {
        params
    });
}

// 设备统计
export function query_shebeitongji_list(params) {
    return fetch.get('dbcomp/query_shebeitongji_list', {
        params
    });
}
// 查询待上报的记录
export function query_warning_log(params) {
    return fetch.post('dbcomp/query_warning_log', params);
}
// 查询待上报的记录
export function query_report_list(params) {
    return fetch.post('dbcomp/query_report_list', params);
}

// 查询设备
export function query_device_list(params) {
    return fetch.post('dbcomp/query_device_list', params);
}
// 待机-上报
export function func_shangbao(params) {
    return fetch.post('dbcomp/func_shangbao', params);
}
// 上报撤销
export function fun_shangbao_cancel(params) {
    return fetch.post('dbcomp/fun_shangbao_cancel', params);
}
// 运行对比，对比前一天，前7天 的比
export function query_dev_tongji_duibi(params) {
    return fetch.get('dbcomp/query_dev_tongji_duibi', {
        params
    });
}

// 统计对比 待上报
export function Get_All_query_warning_list(params) {
    return fetch.post('allquery/Get_All_query_warning_list', params);
}

// 统计对比 已上报
export function Get_All_query_report_list(params) {
    return fetch.post('allquery/Get_All_query_report_list', params);
}

// 版本号
export function Get_Verion(params) {
    return fetch.get('dbcomp/Get_Verion', {
        params
    });
}

// ------------------综合接口-----------------------------

// 首页 车间 设备综合
export function GetDeviceStatusHome(params) {
    return fetch.post('company/GetDeviceStatusHome', params);
}
// 表格 设备综合
export function GetDeviceStatus(params) {
    return fetch.post('company/GetDeviceStatus', params);
}
//表格 明细
export function GetDeviceDetial(params) {
    return fetch.post('company/GetDeviceDetial', params);
}
// 进给倍率
export function GetFreerateOverride(params) {
    return fetch.post('company/GetFreerateOverride', params);
}
// 车间
export function getroom(params) {
    return fetch.post('company/getroom', params);
}
//日报
export function GetReport(params) {
    return fetch.post('company/GetReport', params);
}

// 登录
export function GetLogin(params) {
    return fetch.post('company/Login', params);
}

//重置密码
export function setpwd(params) {
    return fetch.post('company/setpwd', params);
}
// 版本号
export function GetVerion(params) {
    return fetch.get('company/GetVerion', {
        params
    });
}
// 导出
export function GetExcel(params) {
    return fetch.post('company/GetExcel', params);
}

//设备动态
export function GetStatusLog(params) {
    return fetch.post('company/GetStatusLog', params);
}
