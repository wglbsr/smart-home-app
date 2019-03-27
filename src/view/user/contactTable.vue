<template>
  <div class="user-table-div">
    <scroller style="position: absolute;width: 100%;height: 90%" :on-infinite="infinite"
              :on-refresh="refresh" noDataText="没有数据">
      <main style="width: 100%;height: 100%">
        <group>
          <divider>总数:{{totalNum}},当前{{this.contactData.length}}</divider>
          <div v-for="(item, index) in contactData">
            <cell :title="item.contactName"
                  :inline-desc="item.contactPhone"
                  class="group-data-cell">
              {{item.unitName}}
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
        contactData: [],
        showSearchDialog: false,
        customerNo: sessionStorage.getItem("usercus"),
        userLevel: sessionStorage.getItem("userLevel"),
        totalNum: 0,
        unitData: [],
        pageNum: 0,
        keyWord: "",
        pageSize: 20,

      }
    },
    components: {
      SimpleSearchIcon,
    },
    mounted: function () {
      this.initUnitData();
    },
    methods: {
      infinite: function (done) {
        this.pageNum++;
        this.getContactData(false, done);
      },
      refresh: function (done) {
        this.pageNum = 1;
        this.getContactData(true, done);
      },
      openSearchDialog: function () {
        this.showSearchDialog = true;
      },
      closeSearchDialog: function () {
        this.showSearchDialog = false;
      },
      doSearch: function () {
        this.getContactData(true, null);
        this.showSearchDialog = false;
      },
      getUnitNameById: function (unitId) {
        for (let i in this.unitData) {
          if (unitId == this.unitData[i].id) {
            return this.unitData[i].unitName;
          }
        }
        return "未知";
      },
      initUnitData: function () {
        this.$http.post(this.API_DYNY.GMS.getUnitList, {customerNo: this.customerNo}, {emulateJSON: true}).then(function (res) {
          if (res.body.result) {
            this.unitData = res.body.data;
          }
        }).catch(function (error) {
        });
      },
      getContactData(refresh, callback) {
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
        this.$http.post(this.API_DYNY.GMS.getContactList, params, {emulateJSON: true}).then(res => {
          this.totalNum = res.body.total_num;
          this.pageNum = res.body.page_num;
          if (!refresh) {
            this.contactData = this.contactData.concat(res.body.data);
          } else {
            this.contactData = res.body.data;
          }
          for (let index in this.contactData) {
            this.contactData[index].unitName = this.getUnitNameById(this.contactData[index].unitId);
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
