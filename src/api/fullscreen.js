import { request } from '../utils/http.js';

class REQ_SCREEN {

  //设备数
  getDeviceCount(data = {}) {
    return request({
      url: `/ZTL_Statistics/LargeScreen/GetDeviceCount`,
      data: data,
      params: data,
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: 'GET',

    });
  }

  //监控设备数
  getMonitorCount(data = {}) {
    return request({
      url: `/ZTL_Statistics/LargeScreen/GetDeviceMonitorCount`,
      data: data,
      params: data,
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: 'GET',
    });
  }

  //无监控设备数
  getNoMonitorCount(data = {}) {
    return request({
      url: `/ZTL_Statistics/LargeScreen/GetDeviceNoMonitorCount`,
      data: data,
      params: data,
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: 'GET',
    });
  }

  //待机设备数
  getSuspendCount(data = {}) {
    return request({
      url: `/ZTL_Statistics/LargeScreen/GetDeviceRunStatusCount/1`,
      data: data,
      params: data,
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: 'GET',
    });
  }

  //运行设备数
  getPowerOnCount(data = {}) {
    return request({
      url: `/ZTL_Statistics/LargeScreen/GetDeviceRunStatusCount/2`,
      data: data,
      params: data,
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: 'GET',
    });
  }

  //报警设备数
  getWarningCount(data = {}) {
    return request({
      url: `/ZTL_Statistics/LargeScreen/GetDeviceRunStatusCount/3`,
      data: data,
      params: data,
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: 'GET',
    });
  }

  //近一个月
  getLastMaintain(data = {}) {
    return request({
      url: `/ZTL_Statistics/LargeScreen/QueryMaintenanceCount`,
      data: data,
      params: data,
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: 'GET',
    });
  }

  //维修总数
  getRepairCount(data = {}) {
    return request({
      url: `/ZTL_Statistics/LargeScreen/GetRepairCount`,
      data: data,
      params: data,
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: 'GET',
    });
  }

  //待分派总数
  getDispacthCount(data = {}) {
    return request({
      url: `/ZTL_Statistics/LargeScreen/GetToDispactchCount`,
      data: data,
      params: data,
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: 'GET',
    });
  }

  //待处理总数
  getPendingCount(data = {}) {
    return request({
      url: `/ZTL_Statistics/LargeScreen/GetToHandle`,
      data: data,
      params: data,
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: 'GET',
    });
  }

  //已完成总数
  getCompletCount(data = {}) {
    return request({
      url: `/ZTL_Statistics/LargeScreen/GetFinish`,
      data: data,
      params: data,
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: 'GET',
    });
  }

  //设备点检统计
  getDeviceCheck(data = {}) {
    return request({
      url: `/ZTL_Statistics/LargeScreen/QueryCheckCount`,
      data: data,
      params: data,
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: 'GET',
    });
  }

  //待处理工单
  getPendingJob(data = {}) {
    return request({
      url: `/ZTL_Statistics/LargeScreen/GetRepairStatus`,
      data: data,
      params: data,
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: 'GET',
    });
  }


  //近15天
  getLastRepair(data = {}) {
    return request({
      url: `/ZTL_Statistics/LargeScreen/QueryRepairByDays`,
      data: data,
      params: data,
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: 'GET',
    });
  }

  //监控列表
  getMonitorList(data = {}) {
    return request({
      url: `/ZTL_Statistics/LargeScreen/QueryLocationInfos`,
      data: data,
      params: data,
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: 'GET',
    });
  }

  //维修工单统计(部门)
  getJobCount(data = {}) {
    return request({
      url: `/ZTL_Statistics/LargeScreen/GetUnfinishedWorkOrderCount`,
      data: data,
      params: data,
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: 'GET',
    });
  }

  //故障原因占比分析
  getErrorCount(data = {}) {
    return request({
      url: `/ZTL_Statistics/LargeScreen/QueryFaultTypeRepair`,
      data: data,
      params: data,
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: 'GET',
    });
  }

  getWeather() {

  }

}

export const ReqScreen = new REQ_SCREEN();