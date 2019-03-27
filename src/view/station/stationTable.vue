<template>
  <div class="station-table-div">
    <scroller style="position: absolute;width: 100%;height: 90%" :on-infinite="infinite"
              :on-refresh="refresh" noDataText="没有数据">
      <main style="width: 100%;height: 100%">
        <group>
          <divider>总数:{{totalNum}},当前{{this.stationData.length}}</divider>
          <div v-for="(item, index) in stationData">
            <cell is-link="true" @click.native="gotoStationDetail(item.stationNo,true)" :title="item.stationName"
                  :inline-desc="item.stationNo" class="group-data-cell">
            </cell>
          </div>
        </group>
      </main>
    </scroller>
    <x-dialog v-model="showSearchDialog" class="search-dialog" mask-z-index="9">
      <group class="search-group">
        <x-input title="关键字:" style="text-align: left;" v-model="keyWord"></x-input>
        <x-button type="primary" @click.native="doSearch">搜索</x-button>
        <x-button type="warn" @click.native="closeSearchDialog">关闭</x-button>
      </group>
    </x-dialog>
    <simple-search-icon @click.native="openSearchDialog"></simple-search-icon>
    <simple-plus-icon @click.native="gotoStationDetail(null,false)"></simple-plus-icon>
  </div>
</template>
<script>
  import SimpleSearchIcon from '../../components/SimpleSearchIcon'
  import SimplePlusIcon from '../../components/SimplePlusIcon'

  export default {
    data() {
      return {
        onFetching: false,
        showSearchDialog: false,
        customerNo: sessionStorage.getItem("usercus"),
        onlineLabel: "",
        stationData: [],
        totalNum: 0,
        keyWord: "",
        pageNum: 0,
        pageSize: 20,
      }
    },
    components: {
      SimpleSearchIcon,
      SimplePlusIcon
    },
    mounted: function () {
      // this.getStationData();
    },
    filters: {
      translateText: function (value) {
        if (!value) {
          return "暂无";
        } else {
          return value;
        }
      },
    },
    methods: {
      infinite: function (done) {
        this.getStationData(false, done);
      },
      refresh: function (done) {
        this.getStationData(true, done);
      },
      gotoStationDetail: function (stationNo,editMode) {
        this.$router.push({path: "/stationInfo", query: {stationNo: stationNo,editMode:editMode}});
      },
      closeSearchDialog: function () {
        this.showSearchDialog = false;
      },
      openSearchDialog: function () {
        this.showSearchDialog = true;
      },
      doSearch: function () {
        this.refresh(null);
        this.showSearchDialog = false;
      },
      getStationData(refresh, callback) {
        if (this.onFetching) {
          return;
        }
        if (refresh) {
          this.pageNum = 1;
        } else {
          this.pageNum++;
        }
        let params = {
          customerNo: this.customerNo,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        };
        if (this.keyWord) {
          params.searchContent = this.keyWord;
        }
        this.onFetching = true;
        this.$http.post(this.API_DYNY.GMS.getStationList, params, {emulateJSON: true}).then(res => {
          this.totalNum = res.body.total_num;
          if (!refresh) {
            this.stationData = this.stationData.concat(res.body.data);
          } else {
            this.stationData = res.body.data;
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
  .station-table-div {
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
