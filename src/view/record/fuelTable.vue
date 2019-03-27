<template>
  <div class="fuel-table-div">
    <scroller style="position: absolute;width: 100%;height: 90%" :on-infinite="infinite"
              :on-refresh="refresh" noDataText="没有数据">
      <main style="width: 100%;height: 100%">
        <group>
          <divider>总数:{{totalNum}},当前{{this.fuelLogData.length}}</divider>
          <div v-for="(item, index) in fuelLogData">
            <cell :title="item.machName?item.machName:item.machNo"
                  :inline-desc="item.creatTime"
                  class="group-data-cell">
              {{item.startNum|translateText}}% → {{item.endNum|translateText}}%<br>
              {{item.sumVolumeno|showPlus}}L
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
    name: "fuelTable",
    data() {
      return {
        onFetching: false,
        fuelLogData: [],
        customerNo: sessionStorage.getItem("usercus"),
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
    },
    filters: {
      translateText: function (value) {
        if (!value) {
          value = 0;
        }
        if (value > 100) {
          value = 100;
        }
        return value;
      },
      showPlus: function (value) {
        return value >= 0 ? ("+" + value) : value;
      }
    },
    methods: {
      infinite: function (done) {
        this.getFuelLogData(false, done);
      },
      refresh: function (done) {
        this.getFuelLogData(true, done);
      },
      doSearch: function (params) {
        this.condition = params;
        if (params.keyWord) {
          this.condition.keyWord = params.keyWord;
        } else {
          delete this.condition.keyWord;
        }
        this.getFuelLogData(true, null);
      },
      getFuelLogData(refresh, callback) {
        if (this.onFetching) {
          return;
        }
        let params = {customerNo: this.customerNo, pageSize: this.pageSize, pageNum: this.pageNum};
        if (this.condition) {
          params = Object.assign(params, this.condition);
        }
        if (refresh) {
          this.pageNum = 1;
        } else {
          this.pageNum++;
        }
        this.onFetching = true;
        this.$http.post(this.API_DYNY.GMS.getLankLog, params, {emulateJSON: true}).then(res => {
          this.totalNum = res.body.total_num;
          if (!refresh) {
            this.fuelLogData = this.fuelLogData.concat(res.body.data);
          } else {
            this.fuelLogData = res.body.data;
          }
          for (let index in this.fuelLogData) {
            this.fuelLogData[index].creatTime = this.API_DYNY.utils.timestampToTime(this.fuelLogData[index].creatTime);
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
  .fuel-table-div {
    width: 100%;
    bottom: 50px;
  }
</style>
