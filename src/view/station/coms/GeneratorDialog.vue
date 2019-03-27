<template>
  <div v-transfer-dom>
    <x-dialog v-model="showGeneratorDialog" class="generator-dialog" @on-show="getGeneratorData">
      <group>
        <x-input title="关键字:" style="text-align: left;" v-model="keyWord"></x-input>
        <div v-for="(item, index) in generatorData" style="height: 500px;">
          <cell :title="item.machNo"
                :inline-desc="item.machName"
                class="group-data-cell">
            {{item.fuelType}}
            {{item.machType}}
          </cell>
        </div>
        <div v-if="generatorData.length==0">没有数据</div>
      </group>
      <commit-button cancelText="关闭" commitText="确定" @commit="commit"
                     @cancel="cancel"></commit-button>
    </x-dialog>
  </div>
</template>
<script>
  import CommitButton from '../../../components/CommitButton'

  export default {
    name: "GeneratorIcon",
    data() {
      return {
        onFetching: false,
        relatedGeneratorListStr: "",
        relatedGeneratorList: [],
        showGeneratorDialog: false,
        customerNo: '',// sessionStorage.getItem("usercus"),
        userLevel: 200,//sessionStorage.getItem("userLevel"),
        generatorData: [],
        keyWord: "",

      }
    },
    components: {
      CommitButton
    },
    mounted: function () {
    },
    methods: {
      showDialog: function (stationNo) {
        this.showGeneratorDialog = true;
        this.getGeneratorData();
      },
      cancel: function () {
        this.showGeneratorDialog = false;
      },
      commit: function () {
        this.showGeneratorDialog = false;
      },
      doSearch: function () {
        this.showGeneratorDialog = false;
      }
      ,
      getGeneratorData(stationNo) {
        if (this.onFetching) {
          return;
        }
        let params = {
          user_cus: this.customerNo,
          stationNo: this.userLevel,
          stationNo: stationNo,
        };
        if (this.keyWord) {
          params.searchContent = this.keyWord;
        }
        this.$http.post(this.API_DYNY.GMS.getGeneratorForStation, params, {emulateJSON: true}).then(res => {
          this.generatorData = res.body.data;
        }).catch(function (error) {
        });
      }
    }
  }
</script>

<style scoped>
  .generator-dialog {
    width: 100%;
    z-index: 9999;
    height: 100%;
  }
</style>
