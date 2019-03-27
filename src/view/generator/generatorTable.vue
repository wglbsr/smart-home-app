<template>
  <div class="generator-table-div">
    <scroller style="position: absolute;width: 100%;height: 90%" :on-infinite="infinite"
              :on-refresh="refresh" noDataText="没有数据">
      <main style="width: 100%;height: 100%">
        <grid :cols="2" :show-lr-borders="false" class="statisticInfo-grid" :show-vertical-dividers="false">
          <grid-item class="status-grid-item" :label="onlineLabel">
            <div style="width:80px;height:80px;margin: auto;">
              <x-circle :percent="statisticInfo.onlinePercent" :stroke-width="10">
                <span>{{statisticInfo.onlineNum}}</span>
              </x-circle>
            </div>
          </grid-item>
          <grid-item class="status-grid-item" :label="generatingLabel">
            <div style="width:80px;height:80px;margin: auto;">
              <x-circle :percent="statisticInfo.generatingPercent" :stroke-width="10">
                <span>{{statisticInfo.generatingNum}}</span>
              </x-circle>
            </div>
          </grid-item>
        </grid>
        <group>
          <divider>总数:{{totalNum}}</divider>
          <div v-for="(item, index) in generatorData">
            <cell @click.native="gotoGeneratorDetail(item.mach_no,item.mach_type)"
                  is-link="true"
                  :title="item.mach_name" :inline-desc="item.mach_no" class="group-data-cell"
                  @cell-value-color="cellValColor">

              <strong>{{item.st_state}}，{{item.state1}}，{{item.load_mode|translateMode}}</strong><br>

              输出 : {{item.st_current|translateCurrent|keepHowManyNum(1)}}A，
              {{item.output_voltage|keepHowManyNum(1)}}V
            </cell>
          </div>
        </group>
      </main>
    </scroller>
    <generator-search-icon @doSearch="doSearch"></generator-search-icon>
  </div>
</template>
<script>
  import GeneratorSearchIcon from "./coms/GeneratorSearchIcon"

  export default {
    name: "generatorTable",
    data() {
      return {
        showList1: true,
        scrollTop: 0,
        onFetching: false,
        generatorData: [],
        customerNo: sessionStorage.getItem("usercus"),
        cellValColor: "#27b151",
        onlineLabel: "",
        generatingLabel: "",
        activate: true,
        inactivate: true,
        condition: null,
        totalNum: 0,
        totalPageNum: 0,
        statisticInfo: {
          totalGeneratorsNum: 0,
          onlineNum: 0,
          onlinePercent: 0,
          offlineNum: 0,
          offlinePercent: 0,
          generatingNum: 0,
          generatingPercent: 0,
          interruptionNum: 0,
          interruptionPercent: 0,
        },
        pageNum: 0,
        pageSize: 20,
      }
    },
    components: {
      GeneratorSearchIcon
    },
    mounted: function () {
    },
    filters: {
      showStationName: function (value) {
        if (!value) {
          return "暂无";
        } else {
          return value;
        }
      },
      translateMode: function (val) {
        return !val ? "空载" : "带载";
      },
    },
    methods: {
      gotoGeneratorDetail: function (machNo, machType) {
        this.$router.push({path: '/generatorStatus', query: {machNo: machNo}});
      },
      initCircle: function () {
        let params = {"user_cus": this.customerNo};
        params.activate = this.activate;
        params.inactivate = this.inactivate;
        this.$http.post(this.API_DYNY.GMS.getMachineNumByStatus, params, {emulateJSON: true}).then(function (res) {
          if (res.body.result) {
            if (res.body.data && res.body.data.allNum > 0) {
              this.statisticInfo.totalGeneratorsNum = res.body.data.allNum;
              this.statisticInfo.onlineNum = res.body.data.onlineNum;
              this.statisticInfo.generatingNum = res.body.data.generatingNum;
              this.statisticInfo.interruptionNum = res.body.data.interruptionNum;
              this.statisticInfo.offlineNum = res.body.data.offlineNum;
              this.statisticInfo.onlinePercent = (res.body.data.onlineNum / this.statisticInfo.totalGeneratorsNum) * 100;
              this.onlineLabel = "在线(" + this.API_DYNY.utils.keepHowManyNum(this.statisticInfo.onlinePercent, 1) + "%)";
              this.statisticInfo.offlinePercent = 100 - this.statisticInfo.onlinePercent;
              this.statisticInfo.generatingPercent = (res.body.data.generatingNum / this.statisticInfo.totalGeneratorsNum) * 100;
              this.generatingLabel = "发电(" + this.API_DYNY.utils.keepHowManyNum(this.statisticInfo.generatingPercent, 1) + "%)";
              this.statisticInfo.interruptionPercent = 100 - this.statisticInfo.generatingPercent;
            }
          }
        });
      },
      openSearchPage: function () {

      },
      refresh: function (done) {
        if (!this.onFetching) {
          this.pageNum = 1;
          this.getGeneratorData(true, done);
        } else {
          done && done(2);
        }
      },
      infinite: function (done) {
        if (!this.onFetching && (this.pageNum < this.totalNum || this.pageNum == 0)) {
          this.pageNum++;
          this.getGeneratorData(false, done);
        } else {
          done && done(2);
        }
      },
      doSearch: function (condition) {
        this.condition = condition;
        this.getGeneratorData(true, null);
      },
      getGeneratorData(refresh, done) {
        if (this.onFetching) {
          return;
        }
        let params = {
          user_cus: this.customerNo,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        };
        let condition = this.condition;
        if (condition) {
          if (condition.online) {
            params.st_state = condition.online;
          }
          if (condition.fuelType) {
            params.fuel_type = condition.fuelType;
          }
          if (condition.generate) {
            params.generate_status = condition.generate;
          }
          if (condition.currentType) {
            params.mach_type = condition.currentType;
          }
          if (condition.keyWord) {
            params.content = condition.keyWord;
          }
          if (condition.activate) {
            if (condition.activate.length > 1) {
              params.activate = true;
              params.inactivate = true;
            } else if (condition.activate.length == 1) {
              params.activate = condition.activate[0] == "1";
              params.inactivate = condition.activate[0] == "2";
            } else {
              params.activate = false;
              params.inactivate = false;
            }
            this.activate = params.activate;
            this.inactivate = params.inactivate;
          }
        }
        this.onFetching = true;
        this.$http.post(this.API_DYNY.GMS.searchMachine, params, {emulateJSON: true}
        ).then(function (res) {
          if (res.body.result) {
            if (this.totalNum != res.body.total_num || this.pageNum == 1) {
              this.generatorData = res.body.data;
            } else {
              this.generatorData = this.generatorData.concat(res.body.data);
            }
            this.totalNum = res.body.total_num;
            this.pageNum = res.body.page_num;
            this.totalPageNum = res.body.total_page_num;
            this.initCircle();
          }
          this.onFetching = false;
          if (done instanceof Function) {
            done(2);//2为停止加载图标
          }
        }).catch(function (error) {
          this.onFetching = false;
          if (done instanceof Function) {
            done(2);
          }
        });
      }
    }
  }
</script>

<style scoped>

  .generator-table-div {
    width: 100%;
    bottom: 50px;
  }


</style>
