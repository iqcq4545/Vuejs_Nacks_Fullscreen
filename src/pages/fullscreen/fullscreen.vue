<template>
  <div class="page fullpage">
    <div class="DATE">{{DATE}}</div>
    <div class="WEATHER">{{WEATHER}}</div>

    <!-- <img class="bg" src="@/images/nacks.jpg" /> -->
    <img class="bg" src="@/images/bg_1.png" />

    <img class="h1" src="@/images/img_title.png" />
    <!-- Left Start -->
    <div class="left">

      <div class="left0 bar">
        <h2 class="top up">近一个月养护完成情况</h2>
        <div class="body">
          <p v-if="noData.left[0]" class="noData">暂无数据</p>
          <div v-show="!noData.left[0]" id="bar0" class="bar0" style="width:2.05rem;height:1.02rem;position:relative">
          </div>
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
        <h2 class="top">待处理工单列表</h2>
        <div class="body">
          <p v-if="noData.left[2]" class="noData">暂无数据</p>
          <table v-show="!noData.left[2]">
            <thead>
              <tr>

                <th>设备编号</th>
                <th>报修人</th>
                <th>当前状态</th>
                <th>报修时间</th>
              </tr>
            </thead>
            <tbody ref="tbodyJob">
              <tr v-for="(item,i) in jobTable" :key="i">
                <td>{{item.DeviceCode||"--"}}</td>
                <td>{{item.CreateUser}}</td>
                <td>{{item.Status}}</td>
                <td>{{item.CreateTime}}</td>
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
          <p><span v-for="(item,i) in String(count.device)">{{item}}</span></p>
        </div>

        <div class="main1">
          <ul>
            <li>
              <h3>运行数</h3>
              <p>{{count.powerOn}}</p>
            </li>

            <li>
              <h3>停机数</h3>
              <p>{{count.warning}}</p>
            </li>
          </ul>
          <ul v-if="deviceCheck.x" class="fr">
            <li>
              <h3>点检总数</h3>
              <p>{{sum(deviceCheck.y)}}</p>
            </li>

            <li>
              <h3>点检项总数</h3>
              <p>{{deviceCheck.x.length}}</p>
            </li>
          </ul>
        </div>

        <ul class="main2">
          <li>
            <h3 class="fwb">运行设备数量</h3>
            <p class="fwb"><span v-for="(item,i) in fmtNum(count.powerOn)">{{item}}</span></p>
          </li>

          <li>
            <h3 class="fwb">停机设备数量</h3>
            <p class="fwb"><span v-for="(item,i) in fmtNum(count.warning)">{{item}}</span></p>
          </li>

          <li>
            <h3 class="fwb">监控设备数量</h3>
            <p class="fwb"><span v-for="(item,i) in fmtNum(count.monitor)">{{item}}</span></p>
          </li>
        </ul>

        <ul class="location" @click="getCoordinate($event)">
          <li v-for="(item,i) in location" class="tip"
            :style="'top:'+item.coordinate.x+'rem;left:'+item.coordinate.y+'rem'">
            <i class="circle"></i>
            <p><em class="point"></em><span class="txt">{{item.num}}</span></p>
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
          <div id="pie" class="pie" style="width:2.05rem;height:.85rem;position:relative"></div>
        </div>
      </div>

      <div class="right2">
        <h2 class="top">设备点检统计</h2>
        <div class="body">
          <div id="line" style="width:2.05rem;height:1rem;position:relative">
          </div>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
  import echarts from "echarts";

  import { department } from "../department";

  export default {
    name: "fullscreen",
    inject: [/*"reload",*/ "Toast"],
    data() {
      return {
        DATE: undefined,
        WEATHER: undefined,
        chartGrid: {
          top: "7.5%",
          right: "7.5%",
          bottom: "0",
          left: "3.5%",
          containLabel: true,
        },
        chartColor: {
          text: {
            textStyle: {
              color: "#96d2ff"
            },
          },
          line: {
            lineStyle: {
              color: "#282896"
            },
          }
        },
        count: {
          device: 0,
          monitor: 0,
          powerOn: 0,
          warning: 0,
        },

        lastRepair: {

        },

        lastMaintain: {

        },

        deviceCheck: {

        },

        errorCount: {

        },

        workshop: {
          left1: [[.55, 1.705], [1.26, 1.385], [1.78, 1.575], [1.05, 1.96]],

        },
        //当班人员表格数据对象数组
        jobTable: [],

        monitorTable: [],

        //Ecart实例数组
        bar: [],
        gauge: [],
        pie: undefined,
        line: undefined,

        //设备统计对象数组
        panelData: [{}, {}, {}, {}, {}, {}, {}, {}],

        //自动滚动
        tbody: [],
        interval: undefined,

        color: { bar: [["#e6460a", "#f08205"], ["#0532e6", "#05aaf5"]] },

        //工单统计
        countJob: {
          repair: ["今日报修", 0],
          dispacth: ["待分派", 0],
          pending: ["待处理", 0],
          complet: ["已完成", 0],
          sum: 0
        },

        location: [],

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
      }
    },
    created() {
    },
    computed: {

    },
    mounted() {
      var that = this;

      that.intervalDate = setInterval(() => {
        that.getDate();
      }, 1000);

      that.tbody.push(this.$refs.tbodyJob);
      that.tbody.push(this.$refs.tbodyMonitor);

      //====================chart初始化====================
      that.chartInit();

      that.requestData();

      //====================自适应设置====================
      that.fontSize();
      window.onresize = function () {
        that.fontSize();
      }

      //====================Echarts自适应====================
      window.addEventListener("resize", () => {
        setTimeout(() => {
          that.chartSize();
        }, 1);
      });
      that.autoScroll();
      that.addLocation();
    },
    methods: {

      //====================获取时间====================
      getDate() {
        var that = this,
          date = new Date(),
          m = date.getMonth() + 1,
          d = date.getDate(),
          h = date.getHours(),
          m = date.getMinutes(),
          s = date.getSeconds();
        that.DATE = date.getFullYear() + "年" + (m < 10 ? "0" + m : m) + "月" + (d < 10 ? "0" + d : d) + "日" + " " +
          (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
        that.WEATHER = "星期" + that.week[date.getDay()];
      },

      //====================获取数据====================
      requestData() {

        var that = this;
        that.pollingCount.complete = 0;
        //====================设备总数====================
        this.$ReqScreen.getDeviceCount().then((res) => {
          this.count.device = res.data.data;
          that.requestPolling();
        });

        //====================监控设备====================
        this.$ReqScreen.getMonitorCount().then((res) => {
          this.count.monitor = res.data.data;
          that.requestPolling();
        });

        //====================开机设备====================
        this.$ReqScreen.getPowerOnCount().then((res) => {
          this.count.powerOn = res.data.data;
          that.requestPolling();
        });

        //====================停机设备====================
        this.$ReqScreen.getWarningCount().then((res) => {
          this.count.warning = res.data.data;
          that.requestPolling();
        });

        //====================养护统计====================
        that.$ReqScreen.getLastMaintain().then((res) => {
          that.LastMaintain = that.parseData(res.data.data, ["DeviceName", "MaintenanceCount"]);
          that.noData.left[0] = !(that.LastMaintain.x.length + that.LastMaintain.y.length);
          that.initBar(that.LastMaintain, 0);
          that.requestPolling();
        });

        //====================维修统计====================
        that.$ReqScreen.getLastRepair().then((res) => {
          that.lastRepair = that.parseData(res.data.data, ["date", "dCount"]);
          that.initBar(that.lastRepair, 1);
          that.requestPolling();
        });

        //====================点检统计====================
        that.$ReqScreen.getDeviceCheck().then((res) => {
          that.deviceCheck = that.parseData(res.data.data, ["DeviceName", "CheckCount"]);
          that.initLine(that.deviceCheck);
          that.requestPolling();
        });

        //====================待处理工单====================
        that.$ReqScreen.getPendingJob().then((res) => {
          that.jobTable = res.data.data;
          that.noData.left[2] = !that.jobTable.length;
          that.requestPolling();
        });

        //====================监控列表====================
        that.$ReqScreen.getMonitorList().then((res) => {
          that.monitorTable = res.data.data;
          that.noData.middle[0] = !that.monitorTable.length;
          that.requestPolling();
        });

        //====================正中间，部门工单====================
        that.$ReqScreen.getJobCount().then((res) => {
          var data = res.data.data,
            location = [];
          for (var i = 0; i < data.length; i++) {
            var departmentData = department[(data[i].F_DepartmentId) || "null"];
            location.push({ coordinate: departmentData.coordinate, num: data[i].Num, name: departmentData.name });
          }
          that.location = location;
          console.log(that.location, "getJobCount");
          that.requestPolling();
        });

        //====================故障原因占比====================
        that.$ReqScreen.getErrorCount().then((res) => {
          that.errorCount = that.parseRose(res.data.data, ["FaultType", "RepairCount"]);
          that.initRose(that.errorCount)
          that.requestPolling();
          console.log(res.data.data, "getErrorCount")
        });

        //====================今日报修情况====================
        that.countJob.sum = 0;
        that.$ReqScreen.getRepairCount().then((res) => {
          that.countJob.repair[1] = res.data.data;
          that.$ReqScreen.getPendingCount().then((res) => {
            that.countJob.pending[1] = res.data.data;
            that.countJob.sum += res.data.data;
            that.$ReqScreen.getDispacthCount().then((res) => {
              that.countJob.dispacth[1] = res.data.data;
              that.countJob.sum += res.data.data;
              that.$ReqScreen.getCompletCount().then((res) => {
                that.countJob.complet[1] = res.data.data;
                that.countJob.sum += res.data.data;
                var j = 0;
                for (var i in that.countJob) {
                  if (i !== "sum") {
                    that.initGauge(that.countJob[i], j);
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

      requestPolling() {
        var that = this;
        that.pollingCount.complete += 1;
        !that.silence ? that.Toast({ text: "载入中 " + Math.floor(that.pollingCount.complete / that.pollingCount.total * 100) + "%", icon: "loading" }, 30000) : undefined;
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
          ary[~i + length] = str[i] ? str[i] : "0";
        }
        return ary;
      },

      //====================柱状图设置====================
      initBar(data, i) {
        var that = this;
        var option = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            },
          },
          grid: that.chartGrid,
          xAxis: [{
            type: "category",
            axisLine: that.chartColor.line,
            axisTick: {
              show: false,
            },
            axisLabel: that.chartColor.text,
            data: data.x,
          }],
          yAxis: [{
            type: "value",
            axisLine: that.chartColor.line,
            axisTick: {
              show: false,
            },
            axisLabel: that.chartColor.text,
            splitLine: that.chartColor.line,
          }],
          series: [{
            type: "bar",
            barWidth: "50%",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: that.color.bar[i][0]
                }, {
                  offset: 1,
                  color: that.color.bar[i][1]
                }])
              }
            },
            data: data.y,
          }]
        };
        that.bar[i].setOption(option);
      },

      //====================仪表盘图设置====================
      initGauge(data, i) {
        console.log(data, "gauge");
        var that = this;

        var option = {
          title: {
            text: data[0],
            x: "center",
            y: "70%",
            textStyle: {
              fontSize: "20%",
              fontWeight: "bold",
              color: "#01a6ff",
            },
          },
          tooltip: {
            show: false
          },
          series: [{
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
              normal: {
                show: false
              }
            },
            data: [
              {
                value: data[1],
                itemStyle: { color: "#01a6ff" },
                name: String(data[1]),
              },
              {
                value: data[0] === "今日报修" ? 0 : that.countJob.sum - data[1],
                itemStyle: { color: "#282896" },
              },
              {
                value: data[0] === "今日报修" ? data[1] / 2 : that.countJob.sum / 2,
                itemStyle: { color: "transparent" },
              }
            ]
          }]
        };
        console.log(that.countJob.sum, data[1]);
        that.gauge[i].setOption(option);
      },

      //====================线图设置====================
      initLine(data) {
        var that = this;
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
          grid: that.chartGrid,
          xAxis:
          {
            type: "category",
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: "#282896",
              }
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              textStyle: {
                color: "#96d2ff"
              },
            },
            splitLine: {
              show: false
            },
            data: data.x,
          },
          yAxis:
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#282896",
              }
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              textStyle: {
                color: "#96d2ff"
              },
            },
            splitLine: {
              lineStyle: {
                color: "#282896",
              }
            },
          },
          series: [{
            type: "line",
            smooth: true,
            name: "",
            stack: "",
            lineStyle: { color: "#32b4f5" },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#33b4f5'
              }, {
                offset: 1,
                color: '#0c1a4b'
              }])
            },
            data: data.y
          }]
        };

        that.line.setOption(option);

      },

      //====================玫瑰图设置====================
      initRose(data) {
        var that = this;

        var option = {
          tooltip: {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
          },
          color: ["#f14865", "#f9cc14", "#2fc25b", "#14c2c3", "#1890ff"],
          legend: {
            type: 'scroll',
            orient: 'vertical',
            right: "15%",
            top: "15%",
            textStyle: {
              color: '#96d2ff',
            }
          },
          series: [
            {
              name: "故障原因",
              type: 'pie',
              radius: '70%',
              center: ['30%', '50%'],
              data: data.sort(function (a, b) { return a.value - b.value; }),
              //roseType: 'radius',
              label: {
                normal: {
                  textStyle: {
                    color: '#96d2ff',
                  }
                }
              },
              labelLine: {
                normal: {
                  lineStyle: {
                    color: '#96d2ff',
                  },
                }
              },

              itemStyle: {

              },
            }]
        };
        that.pie.setOption(option);

      },

      chartInit() {
        var that = this;
        for (var i = 0; i < 2; i++) {
          that.bar[i] = echarts.init(document.getElementById("bar" + i));
        }

        for (var i = 0; i < 4; i++) {
          that.gauge[i] = echarts.init(document.getElementById("pie" + i));
        }
        that.pie = echarts.init(document.getElementById("pie"));
        that.line = echarts.init(document.getElementById("line"));
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
      },

      autoScroll() {
        var that = this,
          row = [6, 3];
        that.interval = setInterval(function () {
          if (that.tbody.length > 1) {
            for (var i = 0; i < that.tbody.length; i++) {
              var tbody = that.tbody[i],
                tr = tbody.children;
              if (tr.length > row[i]) {
                var tr_height = tr[0].offsetHeight;
                //判断是否到底，如果到底就返回顶部
                if (tbody.scrollTop + tbody.offsetHeight > tr_height * tr.length - tr_height / 15) {
                  tbody.scrollTop = 0;
                }
                //每次向上滚动5%
                tbody.scrollTop = tbody.scrollTop + tr_height / 15;
              }
            }
          }
        }, 66.66);

      },

      addLocation() {
        var that = this;
        that.timer = setTimeout(function () {
          if (that.location.length > 10) {
            that.location.splice(1, 1)
          }
          that.$nextTick(() => {
            that.location.push({
              coordinate: {
                x: (Math.random() * 2 + .5),
                y: (Math.random() * 2 + .5),
              },
              num: parseInt(Math.random() * 100),
              name: ""
            });
          });
          that.addLocation();
        }, Math.max(.9, Math.random() * 2) * 5000);
      },

      getCoordinate(e) {
        var rem = parseInt(document.getElementsByTagName("html")[0].style.fontSize);
        //console.log(e)
        console.log("x: " + (e.offsetX / rem) + " , y: " + (e.offsetY / rem))
        //alert("x: " + (e.offsetX / rem) + " , y: " + (e.offsetY / rem))
      },

      //====================计算rem根文字尺寸====================
      fontSize() {
        document.getElementsByTagName("html")[0].style.fontSize = 50 * (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) / 375 + "px";
      },
    },


    dataMerge(oldAry, newAry, compare, merge) {

    }


  }
</script>

<style>
 .h1{position:absolute;top:.075rem;left:50%;margin:.01rem 0 0 -.97rem;width:1.92rem;text-align:center}
.bg{position:absolute;left:0;width:7.5rem}
.fullpage{color:#fff}
.fullpage .body{overflow:hidden;margin-top:.05rem;width:100%;height:100%}
.DATE,.WEATHER{position:absolute;top:.1rem;z-index:2;color:#96d2ff;font-size:.08rem;line-height:.08rem}
.DATE{left:.105rem}
.WEATHER{right:.105rem}
.left{z-index:2;margin:.32rem 0 0 .105rem;width:2.05rem}
.left0{width:100%}
.label ul{display:flex;width:100%;height:100%;justify-content:space-around;align-items:center}
.label p{margin:.04rem 0 .03rem 0;width:100%;text-align:center;font-size:.06rem;line-height:.06rem}
.label b{float:none;padding:0 .025rem 0 0;width:100%;color:#00ebfe;font-weight:400;font-size:.1rem}
.table{width:100%;height:100%}
.table table{float:left;width:100%;border:none;text-align:center;border-spacing:0}
.table tbody::-webkit-scrollbar{display:none}
.table tbody,.table thead{float:left;scrollbar-width:none}
.table tbody{overflow-y:scroll;height:.875rem}
.table tr{display:table;width:100%;table-layout:fixed}
.table tbody tr{margin-top:.01rem;background:url(../../images/bg_form2.png) no-repeat 0 0;background-size:100%}
.table td,.table th,.table tr{color:#96d2ff;font-size:.06rem;line-height:.125rem}
.table thead{width:100%;background:url(../../images/bg_form1.png) no-repeat 0 0;background-size:100%;color:#00ebfe}
.left1{margin-top:.125rem;width:100%}
.left1 .body{padding:.25rem 0 .25rem .05rem;height:.4rem}
.left1 .gauge{margin:0 .025rem}
.left2{margin-top:.04rem}
.left2 .body{padding:0 0 0 .075rem;width:1.8rem;height:1rem}
.middle{margin-top:.35rem;width:3.25rem;height:3.75rem}
.middle_bot{position:absolute;bottom:0;left:0;width:3.25rem;height:.785rem}
.middle_bot .body{height:.57rem}
.middle0{width:100%;height:2.9rem}
.middle0 .main0{position:absolute;left:50%;transform:translateX(-50%)}
.middle0 .main0 h3{position:absolute;left:50%;width:1.04rem;background:url(../../images/bg_title_mid.png) no-repeat 0 0;background-size:100%;color:#96d2ff;text-align:center;font-weight:700;font-size:.08rem;line-height:.165rem;transform:translateX(-50%)}
.middle0 .main0 p{padding-top:.25rem}
.middle0 .main0 p span{margin:0 .025rem;width:.28rem;background:url(../../images/bg_num.png) no-repeat 0 0;background-size:100%;text-align:center;font-weight:700;font-size:.2rem;line-height:.28rem}
.middle0 .main1{position:absolute;top:1.7rem;float:left;width:100%}
.middle0 .main1 ul{width:.48rem}
.middle0 .main1 li{margin-bottom:.1rem;padding:.05rem 0;width:.48rem;height:.205rem;background:url(../../images/bg_num1.png) no-repeat 0 0;background-size:100%;text-align:center}
.middle0 .main1 li h3{width:100%;color:#919beb;font-size:.07rem;line-height:.11rem}
.middle0 .main1 li p{width:100%;color:#20fffa;font-weight:700;font-size:.09rem;line-height:.09rem}
.middle0 .main1 p{font-size:.06rem}
.middle0 .main2{position:absolute;top:2.5rem;float:left;width:100%}
.middle0 .main2 ul{width:100%}
.middle0 .main2 li{width:33.33%}
.middle0 .main2 li h3{width:100%;color:#20fffa;text-align:center;font-size:.09rem;line-height:.2rem}
.middle0 .main2 li p{left:50%;font-size:.09rem;transform:translateX(-50%)}
.middle0 .main2 li p span{margin:0 .010rem;width:.15rem;background:url(../../images/bg_num.png) no-repeat 0 0;background-size:100%;color:#20fffa;text-align:center;line-height:.15rem}
.middle1{width:100%;height:1.21rem}
.right{float:right;margin:.32rem 0 0 0;width:2.05rem}
.right0{width:100%}
.right0 table{float:left;width:.91rem;height:.62rem;border-collapse:collapse;text-align:center;font-size:.06rem;border-spacing:0}
.right0 table td{box-shadow:0 0 0 .1px #eee;line-height:.14rem}
.right0 table:last-child{float:right}
.right0 table:last-child{float:right}
.right1{margin-top:.125rem}
.right2{margin-top:.04rem;width:100%}
.bar .body{height:1.08rem}
.pie .body{height:.9rem}
h2,h3{width:100%}
.fullpage h2.top{background:url(../../images/bg_label.png) no-repeat 0 0;background-size:100% 100%;color:#96d2ff;text-indent:.075rem;font-weight:700;font-size:.075rem;line-height:.165rem}
.fullpage h2.top.mid{background:url(../../images/bg_label_1.png) no-repeat 0 0;background-size:100% 100%}
.pieWrap{width:.5rem;height:.5rem}
.location{z-index:9;width:100%;height:100%}
.location li{position:absolute;height:.14rem}
.location li i{position:absolute;bottom:0;left:50%;margin:0 0 -.5rem -.5rem;width:1rem;height:1rem;border-radius:50%;background:#96d2ff;box-shadow:0 0 3px 2px #1296dc;opacity:0;animation:ripple 4s ease-in-out}
.location p{height:.14rem;animation:fadeIn 4.5s ease-out}
.location p span{overflow:hidden;width:.09rem;height:.09rem;border:.006rem #1296dc solid;border-radius:50%;background:#fff;color:#1296dc;text-align:center;text-overflow:ellipsis;white-space:nowrap;font-weight:700;font-size:.06rem;line-height:.09rem;animation:jump 1.5s infinite ease-out}
.location p em{position:absolute;bottom:0;left:50%;margin:0 0 -.02rem -.03rem;width:.06rem;height:.06rem;background:url(../../images/tip.png) no-repeat;background-size:100%;animation:shine 1.5s infinite ease-out}
@keyframes fadeIn{0%{opacity:0}
90%{opacity:0;transform:translateY(-.05rem)}
100%{opacity:1;transform:translateY(0)}
}
@keyframes ripple{0%{opacity:.25;transform:scale(1)}
55%{opacity:.75;transform:scale(.04)}
65%{opacity:0;transform:scale(.04)}
70%{opacity:.75;transform:scale(.04)}
75%{opacity:0;transform:scale(.04)}
80%{opacity:.75;transform:scale(.04)}
85%{opacity:0;transform:scale(.04)}
90%{opacity:.75;transform:scale(.04)}
100%{opacity:0;transform:scale(.1)}
}
@keyframes jump{0%{transform:translate(0,0)}
33%{transform:translate(0,-.01rem)}
100%{transform:translate(0,0)}
}
@keyframes shine{0%{opacity:1}
33%{opacity:.66}
100%{opacity:1}
}
body::-webkit-scrollbar,html::-webkit-scrollbar{display:none}
body,html{background:#0b1a4a;scrollbar-width:none}
p.noData{position:absolute;top:50%;left:50%;margin:-.06rem 0 0 -.2rem;width:.4rem;height:.12rem;color:#96d2ff;text-align:center;text-shadow:1px 1px 1px rgba(150,210,255,.5);font-size:.075rem;line-height:.12rem}
</style>