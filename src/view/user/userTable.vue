<template>
  <div class="user-table-div">
    <scroller style="position: absolute;width: 100%;height: 90%" :on-infinite="infinite"
              :on-refresh="refresh" noDataText="没有数据">
      <main style="width: 100%;height: 100%">
        <group>
          <divider>总数:{{totalNum}},当前{{this.userData.length}}</divider>
          <div v-for="(item, index) in userData">
            <cell :title="item.usernameCn"
                  :inline-desc="item.userNo"
                  class="group-data-cell">
              {{(item.userLevel>=API_DYNY.UserLevel.Admin.level)?'管理员':'普通用户'}}
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
  </div>
</template>
<script>
  import SimpleSearchIcon from '../../components/SimpleSearchIcon'

  export default {
    name: "userTable",
    data() {
      return {
        onFetching: false,
        userData: [],
        showSearchDialog: false,
        customerNo: sessionStorage.getItem("usercus"),
        userLevel: sessionStorage.getItem("userLevel"),
        totalNum: 0,
        pageNum: 0,
        keyWord: "",
        pageSize: 20,

      }
    },
    components: {
      SimpleSearchIcon,
    },
    mounted: function () {
    },
    methods: {
      infinite: function (done) {
        this.pageNum++;
        this.getUserData(false, done);
      },
      refresh: function (done) {
        this.pageNum = 1;
        this.getUserData(true, done);
      },
      openSearchDialog: function () {
        this.showSearchDialog = true;
      },
      closeSearchDialog: function () {
        this.showSearchDialog = false;
      },
      doSearch: function () {
        this.getUserData(true, null);
        this.showSearchDialog = false;
      },
      getUserData(refresh, callback) {
        if (this.onFetching) {
          return;
        }
        // searchContent  level customerNo
        let params = {
          customerNo: this.customerNo,
          level: this.userLevel,
          pageSize: this.pageSize,
          pageNum: this.pageNum
        };
        if (this.keyWord) {
          params.searchContent = this.keyWord;
        }

        this.onFetching = true;
        this.$http.post(this.API_DYNY.GMS.getUserListByCustomerNoAndLevel, params, {emulateJSON: true}).then(res => {
          this.totalNum = res.body.total_num;
          this.pageNum = res.body.page_num;
          if (!refresh) {
            this.userData = this.userData.concat(res.body.data);
          } else {
            this.userData = res.body.data;
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
  .user-table-div {
    width: 100%;
    bottom: 50px;
  }

  .search-group {
    padding: 15px;
  }
</style>
