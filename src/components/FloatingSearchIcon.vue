<template>
  <div>
    <img slot="icon" src="http://www.dy-iot.net/search.png" class="search-img" @click="openSearchPage">
    <x-dialog v-model="showSearchDialog" class="search-dialog" @dialog-max-width="dialogMaxWidth"
              @dialog-width="dialogWidth">
      <group class="search-group" title="搜索条件">
        <x-input title="关键字:" style="text-align: left;" v-model="keyWord"></x-input>
        <between-dates-picker @dateChange="dateChange" v-if="!hideDatePicker"></between-dates-picker>
        <x-button type="primary" @click.native="doSearch">搜索</x-button>
        <x-button type="warn" @click.native="closeSearchDialog">关闭</x-button>
      </group>
    </x-dialog>
  </div>
</template>

<script>
  import BetweenDatesPicker from './BetweenDatesPicker'

  export default {
    name: "FloatingSearchIcon",
    data() {
      return {
        dialogMaxWidth: "700px",
        showSearchDialog: false,
        dialogWidth: "90%",
        keyWord: "",
        params: {},
      }
    },
    components: {
      BetweenDatesPicker
    },
    props:['hideDatePicker'],
    methods: {
      openSearchPage: function () {
        this.showSearchDialog = true;
      },
      closeSearchDialog: function () {
        this.showSearchDialog = false;
      },
      doSearch: function () {
        if (this.keyWord) {
          this.params.keyWord = this.keyWord;
        }
        this.$emit("doSearch", this.params);
        this.showSearchDialog = false;
      },
      dateChange: function (dateObj) {
        if (!dateObj) {
          return;
        }
        if (dateObj.startDate) {
          this.params.startDate = dateObj.startDate;
        }
        if (dateObj.endDate) {
          this.params.endDate = dateObj.endDate;
        }
      }
    }
  }
</script>

<style scoped>
  .search-group {
    padding: 15px;
  }

  .search-img {
    float: right;
    z-index: 9999;
    background-color: #10aeff;
    width: 40px;
    height: 40px;
    border-radius: 30px;
    position: fixed;
    right: 15px;
    bottom: 70px;
    padding: 10px;
  }

  .search-dialog {
  }
</style>
