<template>
  <div class="warning-table-div">
    <scroller style="position: absolute;width: 100%;height: 90%" :on-infinite="infinite"
              :on-refresh="refresh" noDataText="没有数据">
      <main style="width: 100%;height: 100%">
        <group>
          <divider>总数:{{totalNum}},当前{{this.warningData.length}}</divider>
          <div v-for="(item, index) in warningData">
            <cell :title="item.machName" :inline-desc="item.mach_no" class="group-data-cell">
              {{item.action}}<br>
              {{item.inter_time}}
            </cell>
          </div>
        </group>
      </main>
    </scroller>

    <x-dialog v-model="showSearchDialog" class="search-dialog" mask-z-index="9">
      <group class="search-group" title="搜索条件">
        <popup-picker title="告警类型" :data="warningTypeOptions" v-model="warningType" :columns="2"
                      popup-title="告警类型"
                      popup-style="z-index:10" show-name="true"></popup-picker>
        <datetime v-model="startDate" format="YYYY-MM-DD" title="开始时间:"></datetime>
        <datetime v-model="endDate" format="YYYY-MM-DD" title="结束时间:"></datetime>
        <x-button type="primary" @click.native="doSearch">搜索</x-button>
        <x-button type="warn" @click.native="closeSearchDialog">关闭</x-button>
      </group>
    </x-dialog>
    <simple-search-icon @click.native="openSearchDialog"></simple-search-icon>
  </div>
</template>
<script>
  import SimpleSearchIcon from '../../components/SimpleSearchIcon'

  export default {
    data() {
      return {
        warningType: "0",
        onFetching: false,
        showSearchDialog: false,
        customerNo: sessionStorage.getItem("usercus"),
        warningTypeOptions: [],
        onlineLabel: "",
        warningData: [],
        totalNum: 0,
        pageNum: 0,
        pageSize: 20,
        condition: {},

      }
    },
    components: {
      SimpleSearchIcon,
    },
    mounted: function () {
      // this.getWarningLogData();
    },
    filters: {
      translateText: function (value) {
        if (!value) {
          return "暂无";
        } else {
          return value;
        }
      },
      //截取时间
      translateTime: function (cellValue) {
        return cellValue ? cellValue.substring(2, 16) : "暂无";
      },
      showStationName: function (cellValue) {

      }
    },
    methods: {
      infinite: function (done) {
        if (!this.onFetching) {
          this.getWarningLogData(false, done);
        }
      },

      closeSearchDialog: function () {
        this.showSearchDialog = false;
      },
      openSearchDialog: function () {
        this.showSearchDialog = true;
        this.initWarningOptions();
      },
      refresh: function (done) {
        if (!this.onFetching) {
          this.getWarningLogData(true, done);
        }
      },
      doSearch: function () {
        this.getWarningLogData(true, null);
        this.showSearchDialog = false;
      },
      initWarningOptions: function () {
        this.$http.post(this.API_DYNY.GMS.getWarningTypeList, {}).then(function (res) {
          if (res.body.result && res.body.data) {
            let tempList = [];
            for (let index in res.body.data) {
              tempList.push({
                value: res.body.data[index].warningType.toString(),
                name: res.body.data[index].warningName
              });
            }
            this.warningTypeOptions = tempList;
          }
        }).catch(function (error) {

        });
      },
      getWarningLogData(refresh, callback) {
        if (this.onFetching) {
          return;
        }
        let params = {user_cus: this.customerNo, pageSize: this.pageSize, pageNum: this.pageNum};
        if (this.warningType) {
          params.alarmType = this.warningType[0];//vux组件问题,需要使用数组
        }
        if (this.startDate) {
          params.startDate = (Date.parse(new Date(this.startDate + " 00:00:00"))) / 1000;
        }
        if (this.endDate) {
          params.endDate = (Date.parse(new Date(this.endDate + " 23:59:59"))) / 1000;
        }
        if (refresh) {
          this.pageNum = 1;
        } else {
          this.pageNum++;
        }
        this.onFetching = true;
        this.$http.post(this.API_DYNY.GMS.getSiteWarningList, params, {emulateJSON: true}).then(res => {
          this.totalNum = res.body.total_num;
          if (!refresh) {
            this.warningData = this.warningData.concat(res.body.data);
          } else {
            this.warningData = res.body.data;
          }
          if (this.pageNum >= res.body.total_page_num) {
            this.$vux.toast.show({
              text: '已全部加载!'
            });
          }
          this.onFetching = false;
          if (callback instanceof Function) {
            callback(2);//2为停止加载图标
          }
        }).catch(function (error) {
          this.onFetching = false;
          if (callback instanceof Function) {
            callback(2);
          }
        });
      }
    }
  }
</script>

<style scoped>
  .warning-table-div {
    width: 100%;
    bottom: 50px;
  }

  .search-group {
    padding: 15px;
  }

  .search-dialog {
    z-index: 9;
  }
</style>
