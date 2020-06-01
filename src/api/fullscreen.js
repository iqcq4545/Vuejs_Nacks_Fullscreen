import { request } from '../utils/http.js';

class REQ_SCREEN {

  //设备数
  getDeviceCount(data = {}) {
    return request({
      url: `/ZTL_Statistics/LargeScreen/GetDeviceCount`,
      data: data,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'GET',

    });
  }

  //监控设备数
  getMonitorCount(data = {}) {
    return request({
      url: `/ZTL_Statistics/LargeScreen/GetDeviceMonitorCount`,
      data: data,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
    });
  }

  //无监控设备数
  getNoMonitorCount(data = {}) {
    return request({
      url: `/ZTL_Statistics/LargeScreen/GetDeviceNoMonitorCount`,
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
    });
  }

  //待机设备数
  getSuspendCount(data = {}) {
    return request({
      url: `/ZTL_Statistics/LargeScreen/GetDeviceRunStatusCount/1`,
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
    });
  }

  //运行设备数
  getPowerOnCount(data = {}) {
    return request({
      url: `/ZTL_Statistics/LargeScreen/GetDeviceRunStatusCount/2`,
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
    });
  }

  //报警设备数
  getWarningCount(data = {}) {
    return request({
      url: `/ZTL_Statistics/LargeScreen/GetDeviceRunStatusCount/3`,
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
    });
  }

  //近一个月
  getLastMaintain(data = {}) {
    return request({
      url: `/ZTL_Statistics/LargeScreen/QueryMaintenanceCount`,
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
    });
  }

  //维修总数
  getRepairCount(data = {}) {
    return request({
      url: `/ZTL_Statistics/LargeScreen/GetRepairCount`,
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
    });
  }

  //待分派总数
  getDispacthCount(data = {}) {
    return request({
      url: `/ZTL_Statistics/LargeScreen/GetToDispactchCount`,
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
    });
  }

  //待处理总数
  getPendingCount(data = {}) {
    return request({
      url: `/ZTL_Statistics/LargeScreen/GetToHandle`,
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
    });
  }

  //已完成总数
  getCompletCount(data = {}) {
    return request({
      url: `/ZTL_Statistics/LargeScreen/GetFinish`,
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
    });
  }

  //设备点检统计
  getDeviceCheck(data = {}) {
    return request({
      url: `/ZTL_Statistics/LargeScreen/QueryCheckCount`,
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
    });
  }

  //待处理工单
  getPendingJob(data = {}) {
    return request({
      url: `/ZTL_Statistics/LargeScreen/GetRepairStatus`,
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
    });
  }


  //近15天
  getLastRepair(data = {}) {
    return request({
      url: `/ZTL_Statistics/LargeScreen/QueryRepairByDays`,
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
    });
  }

  //监控列表
  getMonitorList(data = {}) {
    return request({
      url: `/ZTL_Statistics/LargeScreen/QueryLocationInfos`,
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
    });
  }

  //维修工单统计(部门)
  getJobCount(data = {}) {
    return request({
      url: `/ZTL_Statistics/LargeScreen/GetUnfinishedWorkOrderCount`,
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
    });
  }

  //故障原因占比分析
  getErrorCount(data = {}) {
    return request({
      url: `/ZTL_Statistics/LargeScreen/QueryFaultTypeRepair`,
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
    });
  }

  //月度维修工单统计
  getMonthlyRepair(data = {}) {
    return request({
      url: `/ZTL_Statistics/LargeScreen/GetDeptRepairCount`,
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
    });
  }

  //特一类设备维修数
  getSpeRepair(data = {}) {
    return request({
      url: `/ZTL_Statistics/LargeScreen/QueryDeviceToRepairCountByLevel/0`,
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
    });
  }

  //获取维修工单byId
  getRepairInfoById(data = {}) {
    return request({
      url: `/ZTL_Statistics/LargeScreen/GetRepairInfoByDeviceId`,
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
    });
  }

  //故障统计(部门)
  getWorkshopRepair(data = {}) {
    return request({
      url: `/LargeScreen/QueryLocationRepairs`,
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
    });
  }

  //维修工单by车间
  getWorkshopRepairList(data = {}) {
    return request({
      url: `/LargeScreen/QueryRepairsByLocationId/${data}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
    });
  }

  //智能设备数量
  getIotDeviceCount(data = {}){
    return request({
      url: `/ZTL_Statistics/lotDevice/getTotalCount`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
    });
  }

  //智能设备数量by状态
  getIotDeviceNum(data = {}) {
    return request({
      url: `/ZTL_Statistics/lotDevice/getCount`,
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
    });
  }

  //智能设备列表by状态
  getIotDeviceList(data = {}) {
    return request({
      url: `/ZTL_Statistics/lotDevice/getList`,
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
    });
  }

  //智能设备数据byId
  getIotDeviceData(data = {}) {
    return request({
      url: `/ZTL_Statistics/lotDevice/getRunDataList`,
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'GET',
    });
  }

}

export const ReqScreen = new REQ_SCREEN();