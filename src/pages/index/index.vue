<template>
  <div class="page fullpage">
    <div class="DATE">{{DATE}}</div>
    <div class="WEATHER">{{WEATHER}}</div>

    <!-- <img class="bg" src="@/images/nacks.jpg" /> -->
    <img class="bg" src="@/images/bg_1.png" />

    <img class="h1" src="@/images/img_title.png" />
    <!-- Left Start -->
    <div class="left">
      <div class="left0 table">
        <h2 class="top up">特一类设备运行状态</h2>
        <div class="body">
          <div v-show="!noData.left[0]" id="bar0" class="bar0" style="width:2.05rem;height:1.02rem;position:relative">
          </div>

          <p v-if="noData.left[0]" class="noData">暂无数据</p>
          <!-- <table v-show="!noData.left[0]">
            <thead>
              <tr>
                <th>设备编号</th>
                <th>设备名称</th>
                <th>故障数量</th>
                <th>当前状态</th>
              </tr>
            </thead>
            <tbody ref="tbodySpe">
              <tr v-for="(item,i) in speRepair" :key="i" :class="item.rCount?'fault':'run'"
                @click="getRepairInfo(i,$event)">
                <td>{{item.DeviceCode||"--"}}</td>
                <td>{{item.DeviceName}}</td>
                <td>{{item.rCount}}</td>
                <td>{{item.rCount?'维修':'正常'}}</td>
              </tr>
            </tbody>
          </table> -->

        </div>
      </div>

      <div class="left1">
        <h2 class="top">今日报修情况</h2>

        <div class="body">
          <div id="pie0" class="gauge" style="width:.425rem;height:.425rem;position:relative"></div>

          <div id="pie1" class="gauge" style="width:.425rem;height:.425rem;position:relative"></div>

          <div id="pie2" class="gauge" style="width:.425rem;height:.425rem;position:relative"></div>

          <div id="pie3" class="gauge" style="width:.425rem;height:.425rem;position:relative"></div>
        </div>
      </div>

      <div class="left2 table">
        <h2 class="top">待处理维修工单</h2>
        <div class="body">
          <p v-if="noData.left[2]" class="noData">暂无数据</p>
          <table v-show="!noData.left[2]">
            <thead>
              <tr>
                <th>设备编号</th>
                <th>报修人</th>
                <th>当前状态</th>
                <th style="width:.64rem">报修时间</th>
              </tr>
            </thead>
            <tbody ref="tbodyJob">
              <tr v-for="(item,i) in jobTable" :key="i">
                <td>{{item.DeviceCode||"--"}}</td>
                <td>{{item.CreateUser}}</td>
                <td>{{item.Status}}</td>
                <td style="width:.64rem">{{item.CreateTime}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- Left End -->

    <div class="middle">
      <div class="middle0">
        <div class="main0">
          <h3>设备总数</h3>
          <p>
            <span v-for="(item,i) in String(count.device)">{{item}}</span>
          </p>
        </div>

        <ul class="main1" style="z-index:10">
          <li @click="">
            <h3>IoT设备</h3>
            <p>{{countIoT.count}}</p>
          </li>
          <li @click="getIoTList(0)">
            <h3>离线设备</h3>
            <p>{{countIoT.offline}}</p>
          </li>
        </ul>
        <ul v-if="deviceCheck.x" class="main1" style="right:0">
          <li>
            <h3>点检总数</h3>
            <p>{{sum(deviceCheck.y)||0}}</p>
          </li>
          <li>
            <h3>点检项总数</h3>
            <p>{{deviceCheck.x.length}}</p>
          </li>
        </ul>

        <ul class="main2">
          <li @click="getIoTList(1)">
            <h3 class="fwb">待机设备数</h3>
            <p class="fwb">
              <span v-for="(item,i) in fmtNum(countIoT.standby)">{{item}}</span>
            </p>
          </li>

          <li @click="getIoTList(3)">
            <h3 class="fwb">报警设备数</h3>
            <p class="fwb">
              <span v-for="(item,i) in fmtNum(countIoT.warning)">{{item}}</span>
            </p>
          </li>

          <li @click="getIoTList(2)">
            <h3 class="fwb">运行设备数</h3>
            <p class="fwb">
              <span v-for="(item,i) in fmtNum(countIoT.normal)">{{item}}</span>
            </p>
          </li>
        </ul>

        <ul class="location" @click="getCoordinate($event)">
          <li v-for="(item,i) in location" class="tip"
            :style="'top:'+item.coordinate.x+'rem;left:'+item.coordinate.y+'rem'">
            <i class="circle"></i>
            <p @click="getRepairList(item)">
              <em class="point"></em>
              <span class="txt">{{item.num}}</span>
            </p>
            <div class="list"></div>
          </li>
        </ul>
      </div>
      <div class="middle_bot table">
        <h2 class="top mid tac">监控列表</h2>
        <div class="body">
          <p v-if="noData.middle[0]" class="noData">暂无数据</p>
          <table v-show="!noData.middle[0]">
            <thead>
              <tr>
                <th>区域</th>
                <th>设备数量</th>
                <th>维修数量</th>
                <th>点检数量</th>
              </tr>
            </thead>
            <tbody ref="tbodyMonitor" style="height:.435rem">
              <tr v-for="(item,i) in monitorTable" :key="i">
                <td>{{item.locationName||"--"}}</td>
                <td>{{item.deviceCount}}</td>
                <td>{{item.repairCount}}</td>
                <td>{{item.checkCount}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="right">
      <div class="right0 bar">
        <h2 class="top">近15天设备维修统计</h2>
        <div class="body">
          <div id="bar1" class="bar1" style="width:2.05rem;height:1.02rem;position:relative"></div>
        </div>
      </div>

      <div class="right1 pie">
        <h2 class="top">故障原因占比分析</h2>
        <div class="body">
          <p v-if="noData.right[1]" class="noData">暂无数据</p>
          <div v-show="!noData.right[1]" id="pie" class="pie" style="width:2.05rem;height:.85rem;position:relative">
          </div>
        </div>
      </div>

      <div class="right2">
        <h2 class="top">月度维修故障统计</h2>
        <div class="body">
          <p v-if="noData.right[2]" class="noData">暂无数据</p>
          <div v-show="!noData.right[2]" id="line" style="width:2.05rem;height:1rem;position:relative"></div>
        </div>
      </div>
    </div>

    <div v-if="PopupOption.isShow" v-show="!PopupCharts.isShow" class="Popup"
      :class="PopupOption.type+' '+PopupOption.size" ref="Popup">
      <div class="top">
        <h3>{{PopupOption.title}}</h3>
        <img class="close" src="@/images/pop_close.png" @click="closePopup()" />
      </div>

      <div class="mid" v-if="repairInfo.DeviceCode" @click="timerPopup()">
        设备编号：{{repairInfo.DeviceCode}}<br />
        设备名称：{{repairInfo.DeviceName}}<br />
        报修时间：{{repairInfo.createTime}}<br />
        故障描述：{{repairInfo.faultDesc}}<br />
      </div>

      <table class="mid" v-if="repairList.length" @click="timerPopup()">
        <thead>
          <tr>
            <th style="width:.4rem">设备编码</th>
            <th>设备名称</th>
            <th>报修时间</th>
            <th>故障描述</th>
          </tr>
        </thead>
        <tbody id="tbodyPopup">
          <tr v-for="(item,i) in repairList">
            <td style="width:.4rem">{{item.DeviceCode}}</td>
            <td>{{item.DeviceName}}</td>
            <td>{{item.ReparieTime}}</td>
            <td>{{item.FaultDesc}}</td>
          </tr>
        </tbody>
      </table>


      <table class="mid page" v-if="IoTList.length">
        <thead>
          <tr>
            <th>设备名称</th>
            <th>设备型号</th>
            <th style="width:.5rem">状态</th>
            <th>更新时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,i) in PopupOption.pageData" @click="ShowCharts(item.Id,item.Name)">
            <td>{{item.Name||"--"}}</td>
            <td>{{item.Style||"--"}}</td>
            <td style="width:.5rem">{{item.StatusName||"--"}}</td>
            <td>{{item.UpdateTime||"--"}}</td>
            <td style="color:#01a6ff">查看数据</td>
          </tr>
        </tbody>
        <tfoot>
          <ul>
            <li @click="switchPage(PopupOption.pageIdx-1,10,IoTList)">上一页</li>
            <li v-for="(item,i) in PopupOption.pagination" :class="PopupOption.pageIdx===item?'on':''"
              @click="switchPage(item,10,IoTList)">{{item}}</li>
            <li @click="switchPage(PopupOption.pageIdx+1,10,IoTList)">下一页</li>
          </ul>
        </tfoot>
      </table>
    </div>

    <div v-show="PopupCharts.isShow" class="Popup charts">
      <div class="top">
        <h3>{{PopupCharts.title}}</h3>
        <img class="close" src="@/images/pop_close.png" @click="closeCharts" />
      </div>

      <div id="mulBar" style="width:3.75rem;height:1.09rem">

      </div>
    </div>

  </div>
  </div>
</template>
<style>
  .Popup {
    position: absolute;
    width: 3.75rem;
    height: 1.34rem;
    left: 1.91rem;
    top: 40%;
    margin-top: -.586rem;
    z-index: 999;
    color: #fff;
    font-size: .09rem;
    text-align: center;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
    animation: zoomIn .25s ease-in-out;
    /*animation: shine1 2s infinite ease-out;*/
  }

  .Popup.info,
  .Popup.charts {
    background-image: url(../../images/pop_bg_info.png);
  }

  .Popup.warn {
    background-image: url(../../images/pop_bg_warn.png);
  }

  .Popup.error {
    background-image: url(../../images/pop_bg_error.png);
  }


  .Popup.warn {
    text-align: left;
  }

  .Popup .top {
    font-size: inherit;
    width: 3.55rem;
    padding: 0 .1rem;
    line-height: .25rem;
  }

  .Popup .top h3 {
    font-weight: bold;
  }

  .Popup .top img {
    position: absolute;
    right: 0;
    top: 0;
    width: .15rem;
    height: .15rem;
    padding: .05rem;
  }

  .Popup .mid {
    width: 3.55rem;
    height: .95rem;
    margin: .07rem .1rem;
    overflow: hidden;
    white-space: nowrap;
  }

  .Popup div.mid {
    line-height: .2375rem;
    animation: type 1.25s steps(50, end) forwards;
    font-size: .08rem;
    text-align: left;

  }

  .Popup table.mid {
    float: left;
    border: none;
    border-spacing: 0;
    font-size: .07rem;
  }


  .Popup table.mid tbody,
  .Popup table.mid thead {
    float: left;
    width: 100%;
    scrollbar-width: none;
  }

  .Popup table.mid tbody {
    height: .78rem;
    overflow-y: auto;
  }


  .Popup table.mid tbody::-webkit-scrollbar {
    display: none;
  }

  .Popup table.mid tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }

  .Popup table.mid th {
    font-size: .08rem;
  }

  .Popup table.mid th,
  .Popup table.mid td {
    white-space: normal;
    line-height: .12rem;
    padding: .0225rem 0;
  }

  .Popup table.mid.page tbody {
    margin: .015rem 0;
    height: .64rem;
  }

  .Popup table.mid.page tfoot {
    height: .12rem;
    position: relative;
    width: 100%;
    float: left;
  }

  .Popup table.mid.page tfoot ul {
    position: absolute;
    height: .12rem;
    left: 50%;
    transform: translateX(-50%);
  }

  .Popup table.mid.page tfoot li {
    line-height: .12rem;
    padding: 0 .03rem;
  }

  .Popup table.mid.page tfoot li.on {
    color: #20fffa;
  }


  .Popup.large {
    background-image: url(../../images/pop_lg_info.png);
    height: 2.22rem;
    margin-top: -.77rem;
  }

  .Popup.large table.mid.page tbody {
    margin: .015rem 0 0 0;
    height: 1.5625rem;
  }

  .Popup.charts #mulBar {
    text-align: left;
    background: #0b1a4a;
  }
</style>
<script>
  import echarts from "echarts";

  import { department } from "../department";

  export default {
    name: "index",
    inject: [/*"reload",*/ "Toast"],
    data() {
      return {
        REM: 0,
        DATE: undefined,
        WEATHER: undefined,
        PopupOption: { style: { top: 0, left: 0 }, title: "故障详情", type: "info", isShow: false, row: 6, pagination: [], pageIdx: 0, pageData: [], duration: 30000, timer: undefined },
        chartGrid: {
          top: "7.5%",
          right: "7.5%",
          bottom: "0",
          left: "3.5%",
          containLabel: true
        },
        chartColor: {
          text: {
            textStyle: {
              color: "#96d2ff",
              fontSize: .05 * fontSize(),
            },
          },
          line: {
            lineStyle: { color: "#282896" },
          }
        },
        count: {
          device: 0,
          monitor: 0,
          powerOn: 0,
          warning: 0
        },

        lastRepair: {},

        lastMaintain: {},

        deviceCheck: {},

        monthlyRepair: { name: [], data: [] },

        errorCount: {},

        workshop: {
          left1: [
            [0.55, 1.705],
            [1.26, 1.385],
            [1.78, 1.575],
            [1.05, 1.96]
          ]
        },
        //当班人员表格数据对象数组
        jobTable: [],

        monitorTable: [],

        speRepair: [],

        //Ecart实例数组
        bar: [],
        gauge: [],
        pie: undefined,
        line: undefined,

        //设备统计对象数组
        panelData: [{}, {}, {}, {}, {}, {}, {}, {}],

        //自动滚动
        tbody: [],
        lastTop: [],
        interval: undefined,
        color: {
          bar: [
            ["#e6460a", "#f08205"],
            ["#0532e6", "#05aaf5"]
          ]
        },

        //工单统计
        countJob: {
          repair: ["今日报修", 0],
          dispacth: ["待分派", 0],
          pending: ["待处理", 0],
          complet: ["已完成", 0],
          sum: 0
        },

        //IoT设备
        countIoT: {
          count: 0,
          normal: 0,
          standby: 0,
          offline: 0,
          warning: 0
        },

        repairInfo: {},

        repairList: [],

        location: [],

        IoTList: [],

        PopupCharts: { title: "设备图表", isShow: false },

        pollingTimer: undefined,
        pollingCount: { complete: 0, total: 12 },
        noData: {
          left: [false, false, false],
          middle: [false],
          right: [false, false, false]
        },
        silence: false,
        intervalDate: undefined,
        week: ["日", "一", "二", "三", "四", "五", "六"]
      };
    },
    created() { },
    computed: {},
    mounted() {
      var that = this;

      that.intervalDate = setInterval(() => {
        that.getDate();
      }, 1000);

      that.tbody.push(this.$refs.tbodyJob);
      that.tbody.push(this.$refs.tbodyMonitor);

      //that.tbody.push(this.$refs.tbodySpe);

      //====================chart初始化====================
      that.chartInit();

      that.requestData();

      //====================自适应设置====================
      that.REM = fontSize();
      window.onresize = function () {
        that.REM = fontSize();
      };

      //====================Echarts自适应====================
      window.addEventListener("resize", () => {
        setTimeout(() => {
          that.chartSize();
        }, 1);
      });
      that.autoScroll();
      //that.addLocation();
    },
    methods: {
      //====================获取时间====================
      getDate() {
        var that = this,
          date = new Date(),
          M = date.getMonth() + 1,
          D = date.getDate(),
          h = date.getHours(),
          m = date.getMinutes(),
          s = date.getSeconds();
        that.DATE = date.getFullYear() + "年" + (M < 10 ? "0" + M : M) + "月" + (D < 10 ? "0" + D : D) + "日 " +
          (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
        that.WEATHER = "星期" + that.week[date.getDay()];
      },

      //====================获取数据====================
      requestData() {
        var that = this;
        that.pollingCount.complete = 0;
        //====================设备总数====================
        this.$ReqScreen.getDeviceCount().then(res => {
          this.count.device = res.data.data;
          that.requestPolling();
        });

        //====================监控设备====================
        this.$ReqScreen.getMonitorCount().then(res => {
          this.count.monitor = res.data.data;
          that.requestPolling();
        });

        //====================开机设备====================
        this.$ReqScreen.getPowerOnCount().then(res => {
          this.count.powerOn = res.data.data;
          that.requestPolling();
        });

        //====================停机设备====================
        this.$ReqScreen.getWarningCount().then(res => {
          this.count.warning = res.data.data;
          that.requestPolling();
        });

        //====================整改统计====================
        /*that.$ReqScreen.getLastMaintain().then(res => {
          that.LastMaintain = that.parseData(res.data.data, [
            "DeviceName",
            "MaintenanceCount"
          ]);
          that.noData.left[0] = !(
            that.LastMaintain.x.length + that.LastMaintain.y.length
          );
          that.initBar(that.LastMaintain, 0);
          that.requestPolling();
        });*/

        //====================维修统计====================
        that.$ReqScreen.getLastRepair().then(res => {
          that.lastRepair = that.parseData(res.data.data, ["date", "dCount"]);
          that.initBar(that.lastRepair, 1);
          that.requestPolling();
        });

        //====================点检统计====================
        that.$ReqScreen.getDeviceCheck().then(res => {
          that.deviceCheck = that.parseData(res.data.data, ["DeviceName", "CheckCount"]);
          that.requestPolling();
        });

        //====================IoT设备统计====================
        that.$ReqScreen.getIotDeviceCount().then(res => {
          that.countIoT.count = res.data.count;
          that.requestPolling();
        });

        //====================IoT离线设备====================
        that.$ReqScreen.getIotDeviceNum({ status: 0 }).then(res => {
          that.countIoT.offline = res.data.count;
          that.requestPolling();
        });

        //====================IoT待机设备====================
        that.$ReqScreen.getIotDeviceNum({ status: 1 }).then(res => {
          that.countIoT.standby = res.data.count;
          that.requestPolling();
        });

        //====================IoT运行设备====================
        that.$ReqScreen.getIotDeviceNum({ status: 2 }).then(res => {
          that.countIoT.normal = res.data.count;
          that.requestPolling();
        });

        //====================IoT报警设备====================
        that.$ReqScreen.getIotDeviceNum({ status: 3 }).then(res => {
          that.countIoT.warning = res.data.count;
          that.requestPolling();
        });

        //====================月度维修统计====================
        that.$ReqScreen.getMonthlyRepair().then(res => {
          var name = [], data = [];
          for (var i = 0; i < res.data.data.length; i++) {
            name[i] = res.data.data[i].DeptName;
            data[i] = that.parseData(res.data.data[i].MonthRepairList, ["Month", "RepairCount"]);
          }
          that.monthlyRepair.name = name;
          that.monthlyRepair.data = data;
          that.noData.right[2] = !data.length;
          that.$forceUpdate();

          that.initLine(that.monthlyRepair);
          that.requestPolling();
        });

        //====================特一类设备维修统计====================
        that.$ReqScreen.getSpeRepair().then(res => {
          that.speRepair = res.data.data;
          that.noData.left[0] = !that.speRepair.length;
          // that.speRepair.push({ DeviceCode: "N-9", DeviceId: "acd8685e-72dd-41f9-864f-27ad57df4323", DeviceName: "数控等离子切割机", rCount: 1 });
          var data = that.parseData(res.data.data, ["DeviceName", "rCount"]);
          for (var i = 0; i < data.y.length; i++) {
            data.y[i] = 1;
          }
          that.initBarSpe(data, 0);
          that.requestPolling();
        });

        //====================待处理工单====================
        that.$ReqScreen.getPendingJob().then(res => {
          that.jobTable = res.data.data;
          that.noData.left[2] = !that.jobTable.length;
          that.requestPolling();
        });

        //====================监控列表====================
        that.$ReqScreen.getMonitorList().then(res => {
          that.monitorTable = res.data.data;
          that.noData.middle[0] = !that.monitorTable.length;
          that.requestPolling();
        });

        //====================正中间，部门工单====================
        /* that.$ReqScreen.getJobCount().then(res => {
          var coordinateList = [
            { x: 1.65, y: 1.6 },
            { x: 1.85, y: 1.85 },
            { x: 1.4, y: 2.4 }];

          var data = res.data.data,
            location = [];
          var MockList = [
            { name: "测试部门", coordinate: { x: 1.68, y: 1.6 } },
            { name: "测试部门", coordinate: { x: 1.85, y: 1.85 } },
            { name: "测试部门", coordinate: { x: 1.4, y: 2.4 } }
          ];
          for (var i = 0; i < data.length; i++) {
            var departmentData = department[data[i].F_DepartmentId || "null"];
            if (!departmentData) {
              departmentData = MockList[0];
              MockList.splice(0, 1);
            }
            location.push({
              coordinate: departmentData.coordinate,
              num: data[i].Num,
              name: departmentData.name
            });
          }
          that.location = location;
          that.requestPolling();
        });*/

        //====================正中间====================

        that.$ReqScreen.getWorkshopRepair().then(res => {
          var data = res.data.data,
            location = [];
          for (var i = 0; i < data.length; i++) {
            for (var j in department) {
              if (data[i].LocationName === j) {
                if (data[i].LocationRepairCount) {
                  location.push({ coordinate: department[j].coordinate, num: data[i].LocationRepairCount, name: data[i].LocationName, id: data[i].LocationId });
                }
              }
            }
          }
          that.location = location;
        });

        //====================故障原因占比====================
        that.$ReqScreen.getErrorCount().then(res => {
          that.errorCount = that.parseRose(res.data.data, ["FaultType", "RepairCount"]);
          that.noData.right[1] = !that.errorCount.length;
          that.initRose(that.errorCount);
          that.requestPolling();
        });

        //====================今日报修情况====================
        that.countJob.sum = 0;
        that.$ReqScreen.getRepairCount().then(res => {
          that.countJob.repair[1] = res.data.data;
          that.$ReqScreen.getPendingCount().then(res => {
            that.countJob.pending[1] = res.data.data;
            that.countJob.sum += res.data.data;
            that.$ReqScreen.getDispacthCount().then(res => {
              that.countJob.dispacth[1] = res.data.data;
              that.countJob.sum += res.data.data;
              that.$ReqScreen.getCompletCount().then(res => {
                that.countJob.complet[1] = res.data.data;
                that.countJob.sum += res.data.data;
                var j = 0;
                for (var i in that.countJob) {
                  if (i !== "sum") {
                    that.initGauge(that.countJob[i], j);
                    console.log(j, "gauge")
                    j += 1;
                  }
                }
                that.requestPolling();
              });
            });
          });
        });
        that.reload();
      },

      getRepairInfo(i, e, params) {
        this.closePopup();
        this.$ReqScreen.getRepairInfoById({ deviceId: this.speRepair[i].DeviceId }).then(res => {
          if (res.data.data) {
            this.repairInfo = res.data.data;
            for (var k in this.speRepair[i]) {
              this.repairInfo[k] = this.speRepair[i][k];
            }
            this.PopupOption.style.top = (e.y || e.clientY || e.pageY || (params.event.offsetY + .535 * this.REM) || (.535 * this.REM)) / this.REM;
            this.PopupOption.style.left = (e.x || e.clientX || e.pageX || (params.event.offsetX + .105 * this.REM) || (.105 * this.REM)) / this.REM;
            this.PopupOption.type = "info";
            this.PopupOption.title = /*this.speRepair[i].DeviceName + */ "故障详情";
            this.showPopup();
          }
        });
      },

      requestPolling() {
        var that = this;
        that.pollingCount.complete += 1;
        !that.silence ? that.Toast({ text: "载入中 " + Math.floor((that.pollingCount.complete / that.pollingCount.total) * 100) + "%", icon: "loading" }, 30000) : undefined;
        if (that.pollingCount.complete == that.pollingCount.total) {
          !that.silence ? that.Toast({}, 0) : undefined;
          //that.silence = true;
          //that.pollingTimer = setTimeout(() => {
          //  that.requestData();
          //}, 30000);
        }
      },

      reload() {
        var that = this;
        that.silence = true;
        that.pollingTimer = setTimeout(() => {
          that.requestData();
        }, 30000);
      },

      //====================解析数据(charts)====================
      parseData(data, [x, y]) {
        var obj = {
          x: [],
          y: []
        };
        for (var i = 0; i < data.length; i++) {
          obj.x.push(data[i][x]);
          obj.y.push(data[i][y]);
        }
        return obj;
      },

      parseRose(data, [name, value]) {
        var ary = [];
        for (var i = 0; i < data.length; i++) {
          var obj = { name: data[i][name], value: data[i][value] };
          ary.push(obj);
        }
        return ary;
      },

      sum(ary) {
        return eval(ary.join("+"));
      },

      fmtNum(num, length = 3) {
        var str = String(num),
          ary = [];
        for (var i = 0; i < length; i++) {
          ary[i] = str[i + str.length - length] || 0;
        }
        return ary;
      },

      //====================柱状图设置====================
      initBar(data, i) {
        var that = this,
          option = {
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "shadow"
              }
            },
            grid: that.chartGrid,
            xAxis: [{
              type: "category",
              axisLine: that.chartColor.line,
              axisTick: { show: false },
              axisLabel: that.chartColor.text,
              data: data.x
            }],
            yAxis: [{
              type: "value",
              axisLine: that.chartColor.line,
              axisTick: { show: false },
              axisLabel: that.chartColor.text,
              splitLine: that.chartColor.line
            }],
            series: [{
              type: "bar",
              barWidth: "50%",
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    { offset: 0, color: that.color.bar[i][0] },
                    { offset: 1, color: that.color.bar[i][1] }
                  ])
                }
              },
              data: data.y
            }]
          };
        that.bar[i].setOption(option);
      },

      //====================仪表盘图设置====================
      initGauge(data, i) {
        var that = this,
          color = ["#f04864", "#fac814", "#30c05a", "#14c0c0", "#1890ff", "#8040e6"],
          option = {
            title: {
              text: data[0],
              x: "center",
              y: "70%",
              textStyle: {
                fontSize: "20%",
                fontWeight: "bold",
                color: "#01a6ff"
              }
            },
            tooltip: { show: false },
            series: [
              {
                type: "pie",
                radius: ["80%", "100%"],
                avoidLabelOverlap: true,
                hoverAnimation: false,
                startAngle: 210,
                label: {
                  normal: {
                    show: true,
                    position: "center",
                    textStyle: {
                      fontSize: "33.33%",
                      fontWeight: "bold",
                      color: "#20fffa"
                    }
                  }
                },
                labelLine: {
                  normal: { show: false }
                },
                data: [{
                  value: data[1],
                  itemStyle: { color: data[0] === "今日报修" ? (data[1] > 20 ? "#f04864" : data[1] > 10 ? "#fac814" : "#30c05a") : "#01a6ff" },
                  name: String(data[1])
                }, {
                  value: data[0] === "今日报修" ? 30 - data[1] : that.countJob.sum - data[1],
                  itemStyle: { color: "#282896" }
                }, {
                  value: data[0] === "今日报修" ? 15 : that.countJob.sum / 2,
                  itemStyle: { color: "transparent" }
                }]
              }
            ]
          };
        that.gauge[i].setOption(option);
      },

      //====================线图设置====================
      initLine(data) {
        var that = this,
          color = ["#1890ff", "#14c0c0", "#30c05a", "#fac814", "#f04864", "#8040e6"],
          rgba = ["24,144,255", "20,192,192", "48,192,96", "250,200,24", "240,72,100", "128,64,230"],
          series = [];
        for (var i = 0; i < data.data.length; i++) {
          series.push({
            type: "line",
            smooth: true,
            name: data.name[i],
            stack: "",
            lineStyle: { color: color[i] },
            color: color[i],
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: color[i] },
                { offset: 1, color: "rgba(" + rgba[i] + ",.15)" }
              ])
            },
            data: data.data[i].y

          });
        }
        var option = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              label: {
                backgroundColor: "#32b4f5"
              }
            }
          },
          legend: {
            data: data.name,
            textStyle: {
              color: "#96d2ff",
              fontSize: .05 * that.REM,
              lineHeight: .05 * that.REM,
            },
            icon: "roundRect",
            top: "0",
            left: "5.5%",
            itemWidth: .1 * that.REM,
            itemHeight: .05 * that.REM
          },
          grid: {
            top: "15%",
            right: "7.5%",
            bottom: "0",
            left: "3.5%",
            containLabel: true
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            axisLine: {
              lineStyle: { color: "#282896" }
            },
            axisTick: { show: false },
            axisLabel: {
              textStyle: {
                color: "#96d2ff",
                fontSize: .05 * that.REM,
              }
            },
            splitLine: { show: false },
            data: data.data[0].x
          },
          yAxis: {
            type: "value",
            axisLine: {
              lineStyle: { color: "#282896" }
            },
            axisTick: { show: false },
            axisLabel: {
              textStyle: {
                color: "#96d2ff",
                fontSize: .05 * that.REM,
              }
            },
            splitLine: {
              lineStyle: { color: "#282896" }
            }
          },
          series: series
        };

        that.line.setOption(option);
      },

      //====================玫瑰图设置====================
      initRose(data) {
        var that = this,
          option = {
            tooltip: {
              trigger: "item",
              formatter: "{b} : {c} ({d}%)"
            },
            color: ["#f04864", "#fac814", "#30c05a", "#14c0c0", "#1890ff", "#8040e6"],
            legend: {
              type: "scroll",
              orient: "vertical",
              right: "15%",
              top: "15%",
              textStyle: {
                color: "#96d2ff",
                fontSize: .05 * that.REM,
                lineHeight: .05 * that.REM,
              },
              itemWidth: .1 * that.REM,
              itemHeight: .05 * that.REM
            },
            series: [{
              name: "故障原因",
              type: "pie",
              radius: "70%",
              center: ["30%", "50%"],
              data: data.sort(function (a, b) {
                return a.value - b.value;
              }),
              //roseType: 'radius',
              label: {
                normal: {
                  show: false,
                  textStyle: {
                    color: "#96d2ff",
                    fontSize: .05 * that.REM,
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false,
                  lineStyle: { color: "#96d2ff" }
                }
              },

              itemStyle: {}
            }
            ]
          };
        that.pie.setOption(option);
      },

      chartInit() {
        var that = this;
        for (var i = 0; i < 2; i++) {
          that.bar[i] = echarts.init(document.getElementById("bar" + i));
        }
        that.bar[0].on('click', function (params) {
          that.getRepairInfo(params.dataIndex, params.event.event, params)
        });
        for (var i = 0; i < 4; i++) {
          that.gauge[i] = echarts.init(document.getElementById("pie" + i));
        }
        that.pie = echarts.init(document.getElementById("pie"));
        that.line = echarts.init(document.getElementById("line"));
        that.mulBar = echarts.init(document.getElementById("mulBar"));
      },

      chartSize() {
        var that = this;
        for (var i = 0; i < that.bar.length; i++) {
          that.bar[i].resize();
        }
        for (var i = 0; i < that.gauge.length; i++) {
          that.gauge[i].resize();
        }
        that.pie.resize();
        that.line.resize();
        that.mulBar.resize();
      },

      autoScroll() {
        var that = this,
          row = [6, 3/*, this.PopupOption.row*/, 5];
        that.interval = setInterval(function () {
          //row[2] = that.PopupOption.row;
          if (that.tbody.length > 1) {
            for (var i = 0; i < that.tbody.length; i++) {
              var tbody = that.tbody[i],
                tr = tbody.children;
              if (tr.length > row[i]) {
                var tr_height = tr[0].offsetHeight;
                tbody.scrollTop = tbody.scrollTop + tr_height / 16;
                //判断是否到底，如果到底就返回顶部
                if (that.lastTop[i] === tbody.scrollTop) {
                  tbody.scrollTop = 0;
                }
                //每次向上滚动5%
                that.lastTop[i] = tbody.scrollTop;
              }
            }
          }
        }, 125);
      },

      addLocation() {
        var that = this;
        that.timer = setTimeout(function () {
          if (that.location.length > 10) {
            that.location.splice(1, 1);
          }
          that.$nextTick(() => {
            that.location.push({
              coordinate: {
                x: Math.random() * 2 + 0.5,
                y: Math.random() * 2 + 0.5
              },
              num: parseInt(Math.random() * 100),
              name: ""
            });
          });
          that.addLocation();
        }, Math.max(0.9, Math.random() * 2) * 5000);
      },

      getCoordinate(e) {
      },

      //====================计算rem根文字尺寸====================
      fontSize() {
        document.getElementsByTagName("html")[0].style.fontSize = (50 * (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth)) / 375 + "px";
      },

      showPopup(scroll) {
        var that = this;
        this.PopupOption.isShow = true;
        this.PopupOption.row = 999;
        if (scroll) {
          window.setTimeout(function () {
            that.tbody[2] = document.getElementById("tbodyPopup");
          }, 500);
        }
        this.timerPopup();
      },

      closePopup() {
        this.PopupOption.isShow = false;
        this.PopupOption.size = "";
        this.PopupOption.row = 6;
        this.PopupOption.pagination.length = 0;
        this.repairList = [];
        this.repairInfo = {};
        this.IoTList = [];
      },

      timerPopup(time = 600000) {
        var that = this;
        clearTimeout(that.PopupOption.timer);
        that.PopupOption.timer = setTimeout(function () {
          that.closeCharts();
          that.closePopup();
        }, time);
      },

      initBarSpe(data, i) {
        var that = this;
        var dataY = [];
        for (var j = 0; j < that.speRepair.length; j++) {
          dataY.push({
            name: that.speRepair[j].DeviceCode,
            value: 1,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  { offset: 0, color: that.color.bar[1 - that.speRepair[j].rCount][0] },
                  { offset: 1, color: that.color.bar[1 - that.speRepair[j].rCount][1] }
                ])
              }
            }
          });
        }

        var option = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            },
            formatter: function (params) {
              return "<span style='padding:0 5px 0 0;color:" + params[0].color.colorStops[0].color + "'>●</span>" + params[0].name + " : " + (that.speRepair[params[0].dataIndex].rCount ? "维修" : "正常");
            }
          },
          grid: that.chartGrid,
          xAxis: [
            {
              type: "category",
              axisLine: that.chartColor.line,
              axisTick: { show: false },
              axisLabel: {
                textStyle: {
                  color: "#96d2ff",
                  fontSize: .05 * that.REM,
                },
                rotate: 60
              },
              data: data.x
            }
          ],
          yAxis: [
            {
              type: "value",
              max: 2,
              axisLine: that.chartColor.line,
              axisTick: { show: false },
              axisLabel: { show: false },
              splitLine: that.chartColor.line,
            }
          ],
          series: [
            {
              type: "bar",
              barWidth: "50%",
              data: dataY
            }
          ]
        };

        that.bar[i].setOption(option);

      },

      getRepairList(item) {
        this.closePopup();
        this.$ReqScreen.getWorkshopRepairList(item.id).then(res => {
          this.repairList = res.data.data;
          this.PopupOption.type = "info";
          this.PopupOption.title = item.name;
          this.showPopup(true);
        });
      },

      getIoTList(code) {
        var codeZh = ["离线", "待机", "运行", "报警"];
        this.closePopup();
        this.closeCharts();
        this.Toast({ text: "正在加载", icon: "loading" }, 30000);
        this.$ReqScreen.getIotDeviceList({ pageIndex: 1, pageSize: 1000, status: code }).then((res) => {
          if (res.data.list.length) {
            this.IoTList = res.data.list;
            for (var i = 0; i < Math.ceil(res.data.recordCount / 10); i++) {
              this.PopupOption.pagination[i] = i + 1;
            }
            this.switchPage(1, 10, res.data.list);
            this.PopupOption.type = "info";
            this.PopupOption.size = "large";
            this.PopupOption.title = codeZh[code] + "设备";
            this.Toast({}, 0);
            this.showPopup();
          }
          else {
            this.Toast({ text: "暂无数据", icon: "warn" });
          }

        });
      },

      switchPage(idx, num, data) {
        this.PopupOption.pageIdx = Math.max(Math.min(idx, this.PopupOption.pagination.length), 1);
        idx = this.PopupOption.pageIdx - 1;
        this.PopupOption.pageData.length = 0;
        for (var i = 0; i < num; i++) {
          if (idx * num + i < data.length) {
            this.PopupOption.pageData[i] = data[idx * num + i];
          }
          else {
            break;
          }
        }
        this.$forceUpdate();
      },

      ShowCharts(id, name = "设备图表") {
        this.Toast({ text: "正在加载", icon: "loading" }, 30000);
        var that = this,
          data = [["RunDate"]];

        that.$ReqScreen.getIotDeviceData({ id: id }).then((res) => {
          if (res.data.list.length) {
            for (var i = 0; i < res.data.list.length; i++) {
              var item = res.data.list[i];
              data[0][i + 1] = item.RunDate;
              data[i + 1] = [item.RunDate, item.RunRate * 24, item.RunTime, item.WaitTime, item.AlarmTime]
            }
            var option = {
              color: ["#14c0c0", "#30c05a", "#fac814", "#f04864", "#1890ff", "#8040e6"],
              legend: {
                data: ["稼动率", "运行时间", "待机时间", "报警时间"],
                top: "3.5%",
                textStyle: {
                  color: "#96d2ff",
                  fontSize: .05 * that.REM,
                  lineHeight: .05 * that.REM,
                },
                itemWidth: .1 * that.REM,
                itemHeight: .05 * that.REM
              },
              tooltip: {
                trigger: "axis",
                axisPointer: {
                  type: "shadow"
                },
                formatter: function (params) {
                  var text = "<span style='padding:0 5px 0 0;color:" + params[0].color + "'>●</span>" + params[0].seriesName + " : " + parseInt(params[0].data[1] * 4.1667) + "% <br />";
                  for (var i = 1; i < params.length; i++) {
                    text += "<span style='padding:0 5px 0 0;color:" + params[i].color + "'>●</span>" + params[i].seriesName + " : " + params[i].data[i + 1] + "小时 <br />";
                  }
                  return text;
                }
              },
              grid: {
                top: "18%",
                right: "3.5%",
                bottom: "5%",
                left: "3.5%",
                containLabel: true
              },
              dataset: {
                source: data
              },
              xAxis: [{
                type: "category",
                axisLine: that.chartColor.line,
                axisTick: { show: false },
                axisLabel: that.chartColor.text,
                data: data.x
              }],
              yAxis: [{
                type: "value",
                min: 0,
                max: 24,
                axisLine: that.chartColor.line,
                axisTick: { show: false },
                axisLabel: {
                  formatter: function (params) {
                    return params + "小时";
                  },
                  textStyle: {
                    color: "#96d2ff",
                    fontSize: .05 * fontSize(),
                  },
                },
                splitLine: { show: false }
              }, {
                type: "value",
                position: "right",
                min: 0,
                max: 100,
                axisLine: that.chartColor.line,
                axisTick: { show: false },
                axisLabel: {
                  formatter: function (params) {
                    return params + "%";
                  },
                  textStyle: {
                    color: "#96d2ff",
                    fontSize: .05 * fontSize(),
                  },
                },
                splitLine: that.chartColor.line
              }],
              series: [{
                type: "line",
                name: "稼动率",
                label: {
                  show: true,
                  position: "top",
                  formatter: function (params) {
                    return parseInt(params.data[1] * 4.1667) + "%"
                  },
                  textStyle: {
                    color: "#96d2ff",
                    fontSize: .05 * fontSize(),
                  }
                }
              },
              { type: "bar", barWidth: "15%", name: "运行时间" },
              { type: "bar", barWidth: "15%", name: "待机时间" },
              { type: "bar", barWidth: "15%", name: "报警时间" },
              ]
            };
            that.PopupCharts.title = name;
            that.PopupCharts.isShow = true;
            that.Toast({}, 0);
            that.mulBar.setOption(option);
          }
          else {
            this.Toast({ text: "暂无数据", icon: "warn" });
          }

        });
      },

      closeCharts() {
        this.PopupCharts.isShow = false;
      }

    },

  };
</script>

<style>
  .device {
    width: 100%;
    height: 100%;
  }

  .device li {
    width: .425rem;
    height: .425rem;
  }

  .device li h3 {
    font-size: 0.07rem;
    line-height: .11rem;
    color: #919beb;
  }
</style>

<style>
  .h1 {
    position: absolute;
    top: 0.075rem;
    left: 50%;
    margin: 0.01rem 0 0 -0.97rem;
    width: 1.92rem;
    text-align: center;
  }

  .bg {
    position: absolute;
    left: 0;
    width: 7.5rem;
  }

  .fullpage {
    color: #fff;
  }

  .fullpage .body {
    overflow: hidden;
    margin-top: 0.05rem;
    width: 100%;
    height: 100%;
  }

  .DATE,
  .WEATHER {
    position: absolute;
    top: 0.1rem;
    z-index: 2;
    color: #96d2ff;
    font-size: 0.08rem;
    line-height: 0.08rem;
  }

  .DATE {
    left: 0.105rem;
  }

  .WEATHER {
    right: 0.105rem;
  }

  .left {
    z-index: 2;
    margin: 0.32rem 0 0 0.105rem;
    width: 2.05rem;
  }

  .left0 {
    width: 100%;
  }

  .label ul {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-around;
    align-items: center;
  }

  .label p {
    margin: 0.04rem 0 0.03rem 0;
    width: 100%;
    text-align: center;
    font-size: 0.06rem;
    line-height: 0.06rem;
  }

  .label b {
    float: none;
    padding: 0 0.025rem 0 0;
    width: 100%;
    color: #00ebfe;
    font-weight: 400;
    font-size: 0.1rem;
  }

  .table {
    width: 100%;
    height: 100%;
  }

  .table table {
    float: left;
    width: 100%;
    border: none;
    text-align: center;
    border-spacing: 0;
    color: #96d2ff;
  }

  .table tbody::-webkit-scrollbar {
    display: none;
  }

  .table tbody,
  .table thead {
    float: left;
    width: 100%;
    scrollbar-width: none;
  }

  .table tbody {
    overflow-y: scroll;
    margin-top: 0.01rem;
    height: 0.875rem;
  }

  .table thead {
    width: 100%;
    background: url(../../images/bg_form1.png) no-repeat 50%;
    background-size: 100% 100%;
  }

  .table tbody tr {
    margin-top: 0.01rem;
    background: url(../../images/bg_form2.png) no-repeat 50%;
    background-size: 100% 100%;
  }

  .table tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }

  .table td,
  .table th,
  .table tr {
    color: inherit;
    font-size: 0.06rem;
    line-height: 0.125rem;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .middle_bot.table thead {
    background: url(../../images/bg_form1_mid.png) no-repeat 50%;
    background-size: 100% 100%;
  }

  .middle_bot.table tbody tr {
    margin-top: 0.01rem;
    background: url(../../images/bg_form2_mid.png) no-repeat 50%;
    background-size: 100% 100%;
  }

  .left1 {
    margin-top: 0.125rem;
    width: 100%;
  }

  .left1 .body {
    padding: 0.25rem 0 0.25rem 0.05rem;
    height: 0.4rem;
  }

  .left1 .gauge {
    margin: 0 0.025rem;
  }

  .left2 {
    margin-top: 0.04rem;
  }

  .left2 .body {
    padding: 0 0 0 0.075rem;
    width: 1.8rem;
    height: 1rem;
  }

  .middle {
    margin-top: 0.35rem;
    width: 3.25rem;
    height: 3.75rem;
  }

  .middle_bot {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 3.25rem;
    height: 0.785rem;
  }

  .middle_bot .body {
    height: 0.57rem;
  }

  .middle0 {
    width: 100%;
    height: 2.9rem;
  }

  .middle0 .main0 {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .middle0 .main0 h3 {
    position: absolute;
    left: 50%;
    width: 1.04rem;
    background: url(../../images/bg_title_mid.png) no-repeat 0 0;
    background-size: 100%;
    color: #96d2ff;
    text-align: center;
    font-weight: 700;
    font-size: 0.08rem;
    line-height: 0.165rem;
    transform: translateX(-50%);
  }

  .middle0 .main0 p {
    padding-top: 0.25rem;
  }

  .middle0 .main0 p span {
    margin: 0 0.025rem;
    width: 0.28rem;
    background: url(../../images/bg_num.png) no-repeat 0 0;
    background-size: 100%;
    text-align: center;
    font-weight: 700;
    font-size: 0.2rem;
    line-height: 0.28rem;
  }

  .middle0 .main1 {
    position: absolute;
    top: 1.7rem;
    width: 0.48rem;
  }

  .middle0 .main1 li {
    margin-bottom: 0.1rem;
    padding: 0.05rem 0;
    width: 0.48rem;
    height: 0.205rem;
    background: url(../../images/bg_num1.png) no-repeat 0 0;
    background-size: 100%;
    text-align: center;
  }

  .middle0 .main1 li h3 {
    width: 100%;
    color: #919beb;
    font-size: 0.07rem;
    line-height: 0.11rem;
  }

  .middle0 .main1 li p {
    width: 100%;
    color: #20fffa;
    font-weight: 700;
    font-size: 0.09rem;
    line-height: 0.09rem;
  }

  .middle0 .main1 p {
    font-size: 0.06rem;
  }

  .middle0 .main2 {
    position: absolute;
    top: 2.5rem;
    float: left;
    width: 100%;
    z-index: 10;
  }

  .middle0 .main2 li {
    width: 33.33%;
  }

  .middle0 .main2 li h3 {
    width: 100%;
    color: #20fffa;
    text-align: center;
    font-size: 0.09rem;
    line-height: 0.2rem;
  }

  .middle0 .main2 li p {
    left: 50%;
    font-size: 0.09rem;
    transform: translateX(-50%);
  }

  .middle0 .main2 li p span {
    margin: 0 0.01rem;
    width: 0.15rem;
    background: url(../../images/bg_num.png) no-repeat 0 0;
    background-size: 100%;
    color: #20fffa;
    text-align: center;
    line-height: 0.15rem;
  }

  .middle1 {
    width: 100%;
    height: 1.21rem;
  }

  .right {
    float: right;
    margin: 0.32rem 0 0 0;
    width: 2.05rem;
  }

  .right0 {
    width: 100%;
  }

  .right0 table {
    float: left;
    width: 0.91rem;
    height: 0.62rem;
    border-collapse: collapse;
    text-align: center;
    font-size: 0.06rem;
    border-spacing: 0;
  }

  .right0 table td {
    box-shadow: 0 0 0 0.1px #eee;
    line-height: 0.14rem;
  }

  .right0 table:last-child {
    float: right;
  }

  .right0 table:last-child {
    float: right;
  }

  .right1 {
    margin-top: 0.125rem;
  }

  .right2 {
    margin-top: 0.04rem;
    width: 100%;
  }

  .right2 .body {
    height: 1rem;
  }

  .bar .body,
  .left0 .body {
    height: 1.08rem;
  }

  .pie .body {
    height: 0.9rem;
  }

  h2,
  h3 {
    width: 100%;
  }

  .fullpage h2.top {
    background: url(../../images/bg_label.png) no-repeat 0 0;
    background-size: 100% 100%;
    color: #96d2ff;
    text-indent: 0.075rem;
    font-weight: 700;
    font-size: 0.075rem;
    line-height: 0.165rem;
  }

  .fullpage h2.top.mid {
    background: url(../../images/bg_label_1.png) no-repeat 0 0;
    background-size: 100% 100%;
  }

  .pieWrap {
    width: 0.5rem;
    height: 0.5rem;
  }

  .location {
    z-index: 9;
    width: 100%;
    height: 100%;
  }

  .location li {
    position: absolute;
    height: 0.14rem;
  }

  .location li i {
    position: absolute;
    bottom: 0;
    left: 50%;
    margin: 0 0 -0.5rem -0.5rem;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: rgba(143, 232, 255, .75);
    box-shadow: 0 0 .33rem 0 #588fe8 inset;
    border: 1px #588fe8 solid;
    opacity: 0;
    animation: ripple 4s ease-in-out;
  }

  .location p {
    height: 0.14rem;
    animation: fadeIn 4.5s ease-out;
  }

  .location p span {
    overflow: hidden;
    width: 0.09rem;
    height: 0.09rem;
    border: 0.006rem #1296dc solid;
    border-radius: 50%;
    background: #fff;
    color: #1296dc;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 700;
    font-size: 0.06rem;
    line-height: 0.09rem;
    animation: jump 1.5s infinite ease-out;
  }

  .location p em {
    position: absolute;
    bottom: 0;
    left: 50%;
    margin: 0 0 -0.02rem -0.03rem;
    width: 0.06rem;
    height: 0.06rem;
    background: url(../../images/tip.png) no-repeat;
    background-size: 100%;
    animation: shine 1.5s infinite ease-out;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }

    90% {
      opacity: 0;
      transform: translateY(-0.05rem);
    }

    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes ripple {
    0% {
      opacity: 0.25;
      transform: scale(1);
    }

    55% {
      opacity: 0.75;
      transform: scale(0.04);
    }

    65% {
      opacity: 0;
      transform: scale(0.04);
    }

    70% {
      opacity: 0.75;
      transform: scale(0.04);
    }

    75% {
      opacity: 0;
      transform: scale(0.04);
    }

    80% {
      opacity: 0.75;
      transform: scale(0.04);
    }

    85% {
      opacity: 0;
      transform: scale(0.04);
    }

    90% {
      opacity: 0.75;
      transform: scale(0.04);
    }

    100% {
      opacity: 0;
      transform: scale(0.1);
    }
  }

  @keyframes jump {
    0% {
      transform: translate(0, 0);
    }

    33% {
      transform: translate(0, -0.01rem);
    }

    100% {
      transform: translate(0, 0);
    }
  }

  @keyframes shine {
    0% {
      opacity: 1;
    }

    33% {
      opacity: 0.66;
    }

    100% {
      opacity: 1;
    }
  }


  @keyframes zoomIn {
    0% {
      transform: scale(.25);
      opacity: 0;
    }

    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes type {
    0% {
      width: 0%;
      opacity: 0;
    }

    25% {
      width: 0%;
      opacity: 1;
    }

    100% {}
  }

  @keyframes shine1 {
    0% {
      opacity: 1;
    }

    50% {
      opacity: .9;
    }

    100% {
      opacity: 1;
    }
  }


  body::-webkit-scrollbar,
  html::-webkit-scrollbar {
    display: none;
  }

  body,
  html {
    background: #0b1a4a;
    scrollbar-width: none;
  }

  p.noData {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -0.06rem 0 0 -0.2rem;
    width: 0.4rem;
    height: 0.12rem;
    color: #96d2ff;
    text-align: center;
    text-shadow: 0 0 0.01rem rgba(150, 210, 255, 0.5);
    font-size: 0.08rem;
    line-height: 0.12rem;
  }

  .run {}

  .fault {
    color: #f04664 !important;
    font-weight: bold;
  }
</style>