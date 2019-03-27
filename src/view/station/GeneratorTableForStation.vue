<template>
  <div class="generator-table-div">
    <scroller style="position: absolute;width: 100%;height: 90%"
              :on-refresh="refresh" noDataText="没有数据">
      <main style="width: 100%;height: 100%">
        <group>
          <divider>总数:{{totalNum}}</divider>
          <div v-for="(item, index) in generatorData">
            <cell :title="item.machName"
                  :inline-desc="item.machNo"
                  class="group-data-cell">
              {{item.fuelType}}
              {{item.machType}}
              <x-button @click.native="relateGenerator(item.stNo!=stationNo,item.machNo)">
                {{item.stNo!=stationNo?'关联':'取消关联'}}
              </x-button>
            </cell>
          </div>
        </group>
      </main>
    </scroller>
    <floating-search-icon hide-date-picker="true" @doSearch="doSearch"></floating-search-icon>
  </div>
</template>
<script>
  import FloatingSearchIcon from '../../components/FloatingSearchIcon'

  export default {
    name: "generatorTable",
    data() {
      return {
        onFetching: false,
        generatorData: [],
        customerNo: sessionStorage.getItem("usercus"),
        activate: true,
        inactivate: true,
        searchContent: null,
        stationNo: this.$route.query.stationNo,
        totalNum: 0,
      }
    },
    components: {
      FloatingSearchIcon
    },
    mounted: function () {
      this.refresh(null);
    },
    filters: {},
    methods: {
      refresh: function (done) {
        if (!this.onFetching) {
          this.getGeneratorData(done);
        } else {
          done && done(2);
        }
      },
      doSearch: function (params) {
        this.searchContent = params.keyWord;
        this.getGeneratorData(null);
      },
      relateGenerator(relate, generatorNo) {
        if (this.onFetching) {
          return;
        }
        let params = {
          user_cus: this.customerNo,
          machNo: generatorNo,
          relate: relate,
          stationNo: this.stationNo,
        };
        this.$http.post(this.API_DYNY.GMS.relateGeneratorWithStation, params, {emulateJSON: true}).then(res => {
          if (res.body.result) {
            this.$vux.toast.show({
              text: '操作成功!'
            });
            this.getGeneratorData(null);
          }
        }).catch(function (error) {
        });
      },
      getGeneratorData(done) {
        if (this.onFetching) {
          return;
        }
        let params = {
          user_cus: this.customerNo,
          stationNo: this.stationNo,
        };
        if (this.searchContent) {
          params.searchContent = this.searchContent;
        }
        this.$http.post(this.API_DYNY.GMS.getGeneratorForStation, params, {emulateJSON: true}).then(res => {
          this.generatorData = res.body.data;
          this.totalNum = res.body.total_num;
          this.onFetching = false;
        }).catch(function (error) {
          this.onFetching = false;
        });
        done && done(2);
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
