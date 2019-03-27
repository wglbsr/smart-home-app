<template>
  <div style="width: 100%">
    <group>
      <x-input title="基站编号:" v-model="stationData.stationNo" :readonly="editMode"></x-input>
      <x-input title="基站名称:" v-model="stationData.stationName"></x-input>
      <x-input title="基站地址:" v-model="stationData.stationAddress"></x-input>
      <x-input title="基站经度:" v-model="stationData.stationLongitude"></x-input>
      <x-input title="基站纬度:" v-model="stationData.stationLatitude"></x-input>

      <cell title="关联油机:" is-link="true" @click.native="showGeneratorTableDialog" :value="relatedGeneratorListStr"
            v-if="editMode">

      </cell>


      <selector title="客户编号:" :options="customerListDataForSelector" v-model="stationData.customerNo"
                :readonly="userLevel<API_DYNY.UserLevel.Admin.level">

      </selector>
      <x-textarea title="备注:" rows="4" v-model="stationData.remark"></x-textarea>
    </group>
    <commit-button cancelText="返回" :commitText="editMode?'修改':'添加'" style="margin-top: 15px;" @cancel="cancel"
                   @commit="commit"></commit-button>
  </div>
</template>
<script>
  import CommitButton from '../../components/CommitButton'
  import GeneratorDialog from './coms/GeneratorDialog'

  export default {
    data() {
      return {
        userLevel: sessionStorage.getItem("userLevel"),
        customerNo: sessionStorage.getItem("usercus"),
        fuelOptions: [],
        currentOptions: [],
        editMode: this.$route.query.editMode,
        stationNo: this.$route.query.stationNo,
        stationData: {machNo: "", creator: ""},
        customerListData: [],
        customerListDataForSelector: [],
      }
    },
    components: {
      CommitButton, GeneratorDialog
    },
    mounted: function () {
      this.editMode && this.getData();
      this.getAllCustomer();
    },
    methods: {
      cancel: function () {
        this.$router.go(-1);
      },
      showGeneratorList: function () {

      },
      commit: function () {
        let that = this;
        this.$vux.confirm.show({
          title: this.editMode ? '修改基站' : '添加基站',
          content: '确定提交吗?',
          onCancel() {
          },
          onConfirm() {
            that.editMode ? that.updateStation() : that.checkStationNo();
          }
        });
      },
      showGeneratorTableDialog: function () {
        // this.$refs.generatorTableDialog.showDialog(this.stationData.stationNo);
        this.$router.push({path: '/GeneratorTableForStation', query: {stationNo: this.stationNo}})
      },
      selected: function (generatorNoList) {

      },
      getAllCustomer: function () {
        this.$http.post(this.API_DYNY.GMS.getAllCustomer, {}, {emulateJSON: true}).then(res => {
          if (res.body.result && res.body.data) {
            this.customerListData = res.body.data;
            this.translateCustomerDataToSelector(this.customerListData);
            if (this.userLevel < this.API_DYNY.UserLevel.Admin.level) {
              this.stationData.customerNo = this.customerNo;
            }
          }
        }).catch(function (res) {
        });
      },
      translateCustomerDataToSelector: function (data) {
        this.customerListDataForSelector = [];
        for (let index in data) {
          this.customerListDataForSelector.push({
            key: data[index].customerNo,
            value: data[index].customerName,
          });
        }
      },
      checkStationNo: function () {
        this.$http.post(this.API_DYNY.GMS.checkStationNo,  {stationNo:this.stationData.stationNo}, {emulateJSON: true}).then(function (res) {
          if (res.body.result && res.body.data == 0) {
            this.insertStation();
          } else {
            this.$vux.toast.show({
              text: '基站编号已经存在,请重新输入!',
              type: 'warn'
            });
          }
        }).catch(function (error) {
        });
      },
      updateStation: function () {
        this.$http.post(this.API_DYNY.GMS.updateStation, this.stationData).then(function (res) {
          if (res.body.result && res.body.data > 0) {
            this.$vux.toast.show({
              text: '修改成功!'
            });
            this.$router.go(-1);
          } else {
            this.$vux.toast.show({
              text: '修改失败,请稍后重试!',
              type: 'warn'
            });
          }
        }).catch(function (error) {
        });
      },
      insertStation: function () {
        this.$http.post(this.API_DYNY.GMS.addStation, this.stationData).then(function (res) {
          if (res.body.result && res.body.data > 0) {
            this.$vux.toast.show({
              text: '添加成功!'
            });
            this.$router.go(-1);
          } else {
            this.$vux.toast.show({
              text: '添加失败,请稍后重试!',
              type: 'warn'
            });
          }
        }).catch(function (error) {
        });
      },
      getData: function () {
        let params = {
          stationNo: this.stationNo
        };
        this.$http.post(this.API_DYNY.GMS.getStationByStationNo, params, {emulateJSON: true}).then(function (res) {
          if (res.body.result && res.body.data) {
            this.stationData = res.body.data;
          }
        }).catch(function (error) {


        });
      }
    }
  }
</script>

<style scoped>

</style>
