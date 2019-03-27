<template>
  <div class="generate-table-div">
    <scroller style="position: absolute;width: 100%;height: 90%" :on-infinite="infinite"
              :on-refresh="refresh" noDataText="没有数据">
      <main style="width: 100%;height: 100%">
        <group>
          <divider>总数:{{totalNum}},当前{{this.generateLogData.length}}</divider>
          <div v-for="(item, index) in generateLogData">
            <cell :title="item.mach_name" :inline-desc="'发电时长:'+item.num_time+'min'" class="group-data-cell">
              市电停电:{{item.e_start_time|translateTime}}<br>
              市电恢复:{{item.e_end_time|translateTime}}<br>
              开始发电:{{item.start_time|translateTime}}<br>
              结束发电:{{item.end_time|translateTime}}
            </cell>
          </div>
        </group>
      </main>
    </scroller>
    <search-icon @doSearch="doSearch"></search-icon>
  </div>
</template>
<script>
  import SearchIcon from '../../components/FloatingSearchIcon'

  export default {
    name: "generateTable",
    data() {
      return {
        onFetching: false,
        generateLogData: [],
        customerNo: sessionStorage.getItem("usercus"),
        onlineLabel: "",
        totalNum: 0,
        pageNum: 0,
        pageSize: 20,
        condition: {},

      }
    },
    components: {
      SearchIcon,
    },
    mounted: function () {
      // this.getGenerateLogData();
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
        this.getGenerateLogData(false, done);
      },
      refresh: function (done) {
        this.getGenerateLogData(true, done);
      },
      doSearch: function (params) {
        this.condition = params;
        if (params.keyWord) {
          this.condition.mach_no = params.keyWord;
        } else {
          delete this.condition.mach_no;
        }
        this.getGenerateLogData(true, null);
      },
      getGenerateLogData(refresh, callback) {
        if (this.onFetching) {
          return;
        }
        let params = {user_cus: this.customerNo, pageSize: this.pageSize, pageNum: this.pageNum};
        if (this.condition) {
          params = Object.assign(params, this.condition);
        }
        if (refresh) {
          this.pageNum = 1;
        } else {
          this.pageNum++;
        }
        this.onFetching = true;
        this.$http.post(this.API_DYNY.GMS.getGenerateLog, params, {emulateJSON: true}).then(res => {
          this.totalNum = res.body.total_num;
          if (!refresh) {
            this.generateLogData = this.generateLogData.concat(res.body.data);
          } else {
            this.generateLogData = res.body.data;
          }
          if (this.pageNum >= res.body.total_page_num) {
            this.$vux.toast.show({
              text: '已全部加载!'
            });
          }
          this.onFetching = false;
          if (callback instanceof Function) {
            callback(2);
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
  .generate-table-div {
    width: 100%;
    bottom: 50px;
  }
</style>
