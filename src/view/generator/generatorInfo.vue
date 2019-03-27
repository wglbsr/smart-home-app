<template>
  <div style="width:100%">
    <group>
      <x-input title="油机编号:" v-model="generatorData.machNo" :disabled="true"></x-input>
      <x-input title="油机名称:" v-model="generatorData.machName"></x-input>
      <x-input title="功率(kW):" v-model="generatorData.powerNum"></x-input>
      <x-input title="油量(L):" v-model="generatorData.volumeno"></x-input>
      <x-input title="启动电压(V):" v-model="generatorData.startVoltage"></x-input>
      <x-input title="所属产权:" v-model="generatorData.venderName"></x-input>
      <x-input title="保养时间(h):" v-model="generatorData.maintainTime"></x-input>
      <x-input title="GPRS卡号:" v-model="generatorData.gprsno"></x-input>
      <selector title="客户编号:" :options="customerListDataForSelector" v-model="generatorData.cusNo"></selector>
      <selector title="燃油类型:" :options="fuelOptions" v-model="generatorData.fuelType"></selector>
      <selector title="输出电流:" :options="currentOptions" v-model="generatorData.machType"></selector>
      <selector title="油机类型:" :options="useTypeOptions" v-model="generatorData.useType"></selector>
      <selector title="油机状态:" :options="activateOptions" v-model="generatorData.activated"></selector>
      <x-textarea title="备注" v-model="generatorData.note"></x-textarea>
    </group>
    <commit-button cancelText="返回" commitText="修改" style="margin-top: 15px;" @cancel="cancel"
                   @commit="commit"></commit-button>
  </div>
</template>
<script>
  import CommitButton from '../../components/CommitButton'

  export default {
    name: "generatorInfo",
    data() {
      return {
        fuelOptions: [],
        currentOptions: [],
        useTypeOptions: [],
        activateOptions: [
          {
            key: true,
            value: '激活'
          }, {
            key: false  ,
            value: '停用'
          }],
        machNo: this.$route.query.machNo,
        generatorData: {machNo: "", creator: ""},
        customerListData: [],
        customerListDataForSelector: [],
      }
    },
    components: {
      CommitButton
    },
    mounted: function () {
      this.getData();
      this.getAllCustomer();
      this.initOptions();
    },
    methods: {
      initOptions() {
        let translateOptions = function (fromArray, toArray) {
          for (let index in fromArray) {
            if (fromArray[index].key) {
              toArray.push({
                key: fromArray[index].value,
                value: fromArray[index].label
              })
            }
          }
        };
        translateOptions(this.API_DYNY.AllType.fuelOptions, this.fuelOptions);
        translateOptions(this.API_DYNY.AllType.currentOptions, this.currentOptions);
        translateOptions(this.API_DYNY.AllType.useTypeOptions, this.useTypeOptions);
      },
      cancel: function () {
        this.$router.go(-1);
      },
      commit: function () {
        let that = this;
        this.$vux.confirm.show({
          title: '修改油机',
          content: '确定修改吗?',
          onCancel() {
          },
          onConfirm() {
            that.updateGenerator();
          }
        });
      },
      getAllCustomer: function () {
        this.$http.post(this.API_DYNY.GMS.getAllCustomer, {}, {emulateJSON: true}).then(res => {
          if (res.body.result && res.body.data) {
            this.customerListData = res.body.data;
            this.translateCustomerDataToSelector(this.customerListData);
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
      updateGenerator: function () {
        this.$http.post(this.API_DYNY.GMS.updateGenerator, this.generatorData).then(function (res) {
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
      getData: function () {
        let params = {
          mach_no: this.machNo
        };
        this.$http.post(this.API_DYNY.GMS.getGeneratorDetail, params, {emulateJSON: true}).then(function (res) {
          if (res.body.result && res.body.data) {
            this.generatorData = res.body.data;
          }
        }).catch(function (error) {


        });
      }
    }
  }
</script>

<style scoped>

</style>
