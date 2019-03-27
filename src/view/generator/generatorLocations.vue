<template>
  <div id="map" :style="mapSize">
    <scroller style="position: absolute;width: 100%;height: 100%"
              class="scroller-table"
              ref="scrollerBottom">
      <main class="scrollerContent showboard" style="width: 100%;height:100%">

      </main>
    </scroller>
  </div>
</template>

<script>
  export default {
    name: 'generatorLocations',
    data() {
      return {
        makers: [],
        searchCondition: {
          content: ""
        },
        initLoad: false,
        machRegex: /[0-9a-zA-Z]{6,18}/,
        generatingChecked: true,
        offlineChecked: true,
        outageNum: 0,
        cityElectricityNum: 0,
        offlineNum: 0,
        generatingNum: 0,
        stationNum: 0,
        outageChecked: true,
        cityElectricityChecked: true,
        stopRefresh: false,
        markerList: [],
        aMapObj: null,
        generator: {},
        activate: true,
        inactivate: false,
        showStations: true,
        selectedMachNo: "",
        selectedMachObj: null,
        selectedMachIsOnline: false,
        customerNo: sessionStorage.getItem("usercus"),
        username: sessionStorage.getItem("user"),
        mapSize: {
          width: "100%",
          height: window.innerHeight - 50 + "px",
        },
      }
    },
    mounted: function () {
      this.aMapObj = new AMap.Map('map', {
        resizeEnable: true,
        zoom: 9
      });
      this.initData();
    },
    methods: {
      showMarkers: function () {
        this.outageNum = 0;
        this.cityElectricityNum = 0;
        this.offlineNum = 0;
        this.generatingNum = 0;
        if (!this.markerList || this.markerList.length == 0) {
          return;
        }
        for (let index in this.markerList) {
          let tempMarker = this.markerList[index];
          if (tempMarker.onlineFlag) {
            if (!tempMarker.state) {//0为发电
              this.generatingNum++;//发电数
              tempMarker.setMap(this.generatingChecked ? null : this.aMapObj);//map
            } else {
              if (!tempMarker.cityElectricity) {//0为市电
                this.cityElectricityNum++;
                tempMarker.setMap(this.cityElectricityChecked ? this.aMapObj : null);
              } else {
                this.outageNum++;
                tempMarker.setMap(this.outageChecked ? this.aMapObj : null);
              }
            }
          } else {
            // if (this.machRegex.test(tempMarker.mach_no)) {
            this.offlineNum++;
            // }
            tempMarker.setMap(this.offlineChecked ? this.aMapObj : null);//map
          }
          let that = this;
          AMap.event.addListener(tempMarker, 'click', function () {
            that.openMarkerWindow(that.aMapObj, tempMarker);
          });
        }
        this.aMapObj.setFitView();
      },
      initData: function () {
        if (this.stopRefresh) {
          return;
        }
        this.aMapObj.remove(this.markerList);
        let that = this;
        //获取油机
        let params = {user_cus: this.customerNo, activate: this.activate, inactivate: this.inactivate};
        if (this.searchCondition.content) {
          params.keyWord = this.searchCondition.content;
        }
        this.$http.post(this.API_DYNY.GMS.getGeneratorLocation, params, {emulateJSON: true}).then(res1 => {
          let data1 = [];
          if (res1.body.result && res1.body && res1.body.data.length > 0) {
            data1 = res1.body.data;
          }
          //获取基站
          if (this.showStations) {
            let param2 = {customerNo: this.customerNo};
            if (this.searchCondition.content) {
              param2.searchContent = this.searchCondition.content;
            }
            this.$http.post(this.API_DYNY.GMS.getWithoutGeneratorStationList, param2, {emulateJSON: true}).then(res2 => {
              let stationData = res2.body.data;
              this.stationNum = res2.body.data.length;
              let data2 = [];
              for (let index in stationData) {
                data2.push({
                  // stationPosition: stationData[index].stationLatitude + "," + stationData[index].stationLongitude,
                  stationLatitude: stationData[index].stationLatitude,
                  stationLongitude: stationData[index].stationLongitude,
                  mach_no: "暂无",
                  noGenerator: true,
                  stationNo: stationData[index].stationNo,
                  stationName: stationData[index].stationName
                });
              }
              let totalData = data1.concat(data2);
              this.filterMarkers(totalData);
            });
          } else {
            this.filterMarkers(data1);
          }
        });
      },
      filterMarkers: function (totalData) {
        if (!totalData || totalData.length == 0) {
        } else {
          this.markerList = this.API_DYNY.utils.initMarkers(totalData);
          this.showMarkers();
        }
      },
      openMarkerWindow: function (mapObj, marker) {
        this.getGeneratorData(mapObj, marker, marker.mach_no);
      },
      getGeneratorData: function (mapObj, marker, machNo) {
        if (machNo && this.machRegex.test(machNo)) {//正则校验油机编码6到18位英文数字组合
          this.$http.post(this.API_DYNY.GMS.getSiteDetailed1, {mach_no: machNo}, {emulateJSON: true}).then(function (res) {
            if (res.body.result && res.body.data && res.body.data.length > 0) {
              this.selectedGenerator = res.body.data[0];
              this.initInfoWindow(mapObj, marker, this.selectedGenerator, machNo);

            }
          }).catch(function (error) {

          });
        } else {
          this.initInfoWindow(mapObj, marker, null, null);
        }
      },

      initInfoWindow: function (mapObj, marker, generatorData, machNo) {
        let htmlBody = "";
        let that = this;
        if (machNo && that.machRegex.test(machNo) && generatorData) {
          htmlBody += "油机编号:" + machNo + "<br>";
          htmlBody += "基站编号:" + (marker.stationNo ? marker.stationNo : '暂无') + "<br>";
          htmlBody += "市电:" + (generatorData.Acity_electricity) + "<br>";
          htmlBody += "燃油:" + (generatorData.fuel_type) + "<br>";
          htmlBody += "油量:" + that.API_DYNY.utils.keepHowManyNum(generatorData.lank_per, 0) + "%(" + that.API_DYNY.utils.keepHowManyNum(generatorData.lank_level, 1) + "L)<br>";
          htmlBody += "模式:" + that.API_DYNY.utils.getModeTextByVal(generatorData.sys_mode) + "<br>";
          htmlBody += "电流:" + generatorData.stationType + "<br>";
          htmlBody += "网络:" + generatorData.st_state + "<br>";
          htmlBody += "状态:" + generatorData.state1 + "<br>";
          htmlBody += "已激活:" + (generatorData.activated ? "是" : "否") + "<br>";
          htmlBody += "温度:" + that.API_DYNY.utils.keepHowManyNum(generatorData.external_temperature) + "℃<br>";
          htmlBody += "控制功能:" + (generatorData.boardVersion ? "无" : "有") + "<br>";
          htmlBody += "累计发电:" + generatorData.sum_time + "min<br>";
          htmlBody += "更新时间:" + generatorData.inter_time + "<br>";
        } else {
          htmlBody += "基站编号:" + marker.stationNo + "<br>";
          htmlBody += "该站点还没有关联油机,暂时无法获取状态信息.";
        }
        AMapUI.loadUI(['overlay/SimpleInfoWindow'], function (SimpleInfoWindow) {
          let infoWindow = new SimpleInfoWindow({
            infoTitle: '<strong>' + marker.machineName + '</strong>',
            infoBody: htmlBody,
            offset: new AMap.Pixel(0, -31)
          });
          //关闭窗体事件
          infoWindow.on("close", function () {
            that.selectedMachNo = "";
            that.selectedMachObj = null;
            that.selectedMachIsOnline = false;
          });
          //打开信息窗体事件
          infoWindow.on("open", function () {
            if (machNo && that.machRegex.test(machNo) && generatorData) {
              that.selectedMachNo = machNo;
              that.selectedMachObj = {
                mach_no: machNo,
                mach_type: generatorData.mach_type,
                machName: generatorData.mach_name,
                stationName: generatorData.s_station_name,
                st_state: generatorData.st_state
              };
              that.selectedMachIsOnline = generatorData.st_state == "在线";
            } else {
              that.selectedMachNo = "";
              that.selectedMachObj = null;
              that.selectedMachIsOnline = false;
            }
          });
          infoWindow.open(mapObj, marker.getPosition());

        });
      },
    }
  }
</script>

<style scoped>
  html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }

</style>
