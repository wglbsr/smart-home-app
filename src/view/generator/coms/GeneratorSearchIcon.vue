<template>
  <div>
    <img slot="icon" src="http://www.dy-iot.net/search.png" class="search-img" @click="openSearchPage">
    <x-dialog mask-z-index="8" v-model="showSearchDialog" class="search-dialog" @dialog-max-width="dialogMaxWidth"
              @dialog-width="dialogWidth">
      <group class="search-group">
        <x-input title="关键字:" class="popup-condition" v-model="keyWord"></x-input>
        <popup-radio title="网络:" class="popup-condition" :options="onlineOptions"
                     v-model="online"></popup-radio>
        <popup-radio title="状态:" class="popup-condition" :options="generateOptions"
                     v-model="generate"></popup-radio>
        <popup-radio title="燃油:" class="popup-condition" :options="fuelOptions"
                     v-model="fuelType"></popup-radio>
        <popup-radio title="电流:" class="popup-condition" :options="currentOptions"
                     v-model="currentType"></popup-radio>
        <checker v-model="activate" :max="2" type="checkbox" default-item-class="default-item"
                 selected-item-class="default-item-selected">
          <checker-item value="1" style="width:35%">已激活</checker-item>
          <checker-item value="2" style="width:35%">已停用</checker-item>
        </checker>
        <div>
          <x-button class="operate-button" type="primary" @click.native="doSearch">搜索</x-button>
          <x-button class="operate-button" type="warn" @click.native="closeSearchDialog">关闭</x-button>
        </div>

      </group>
    </x-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        showSearchDialog: false,
        dialogMaxWidth: "",
        online: "",
        generate: "",
        activate: ["1", "2"],
        fuelType: "",
        currentType: "",
        generateOptions: [
          {key: "", value: "全部"},
          {key: "休眠", value: "休眠"},
          {key: "发电", value: "发电"}
        ],
        onlineOptions: [
          {key: "", value: "全部"},
          {key: "离线", value: "离线"},
          {key: "在线", value: "在线"}
        ],
        fuelOptions: [
          {key: "", value: "全部"},
          {key: "柴油", value: "柴油"},
          {key: "汽油", value: "汽油"}
        ],
        currentOptions: [
          {key: "", value: "全部"},
          {key: "直流", value: "直流"},
          {key: "交流", value: "交流"}
        ],
        dialogWidth: "",
      }
    },
    methods: {
      openSearchPage: function () {
        this.showSearchDialog = true;
      },
      closeSearchDialog: function () {
        this.showSearchDialog = false;
      },
      doSearch: function () {
        let params = {};
        if (this.keyWord) {
          params.keyWord = this.keyWord;
        }
        params.online = this.online;
        params.generate = this.generate;
        params.activate = this.activate;
        params.currentType = this.currentType;
        params.fuelType = this.fuelType;
        this.$emit("doSearch", params);
        this.showSearchDialog = false;
      }
    },
  }
</script>

<style scoped>
  .search-group {
    padding: 15px;
  }

  .search-img {
    /*float: right;*/
    /*z-index: 9;*/
    background-color: #10aeff;
    width: 40px;
    height: 40px;
    border-radius: 30px;
    position: fixed;
    right: 15px;
    bottom: 70px;
    padding: 10px;
  }

  .operate-button {
    display: inline;
    width: 48%;
  }

  .popup-condition {
    text-align: left;
  }

  .default-item {
    border: 1px solid #ececec;
    padding: 5px 15px;
  }

  .default-item-selected {
    border: 1px solid green;
  }

  .search-dialog {
  }
</style>
