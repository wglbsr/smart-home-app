<template>
  <div style="width:100%">
    <group>
      <radio @on-change="modeChange" title="油机模式:" :options="modeOptions" v-model="generatorData.sys_mode"></radio>
    </group>
    <group>
      <!--<divider>总数:{{}}</divider>-->
      <x-input title="启动电压(V):" v-model="bootVoltage"
               v-if="generatorData.sys_mode==API_DYNY.MODE.accordingToVoltageBoot.value"></x-input>
      <!--定时任务-->
    </group>
    <commit-button cancelText="返回" commitText="修改" style="margin-top: 15px;" @cancel="cancel"
                   @commit="commit"></commit-button>
  </div>
</template>

<script>
  import CommitButton from '../../../components/CommitButton'

  export default {
    name: "GeneratorModeSwitch",
    components: {
      CommitButton,
    },
    data() {
      return {
        generatorNo: this.$route.query.generatorNo,
        generatorData: {},
        operateTime: "",
        timerTask: {},
        bootVoltage: 50,
        modeOptions: [
          {
            key: '' + this.API_DYNY.MODE.manual.value, value: this.API_DYNY.MODE.manual.text
          },
          {
            key: '' + this.API_DYNY.MODE.accordingToVoltageBoot.value,
            value: this.API_DYNY.MODE.accordingToVoltageBoot.text
          },
          {
            key: '' + this.API_DYNY.MODE.outageBoot.value,
            value: this.API_DYNY.MODE.outageBoot.text
          },
        ],
        operaData: {},
      }
    },
    mounted: function () {
      this.getData();
    },
    filters: {
    },
    methods: {
      cancel: function () {
        this.$router.go(-1);
      },
      commit: function () {

      },
      showSuccessMsg: function (error) {
        let message = error ? "操作失败！" : "操作成功！";
        this.$vux.toast.show({
          text: message
        });
      },
      showLoading: function (hide) {
        if (!hide) {
          this.$vux.loading.show({
            text: '正在获取数据...'
          });
        } else {
          this.$vux.loading.hide();
        }
      },
      modeChange: function (mode) {
        if (this.API_DYNY.MODE.accordingToTime.value == mode) {
          this.getTimerTaskList();
        }
      },
      getData: function () {
        this.showLoading(false);
        this.$http.post(this.API_DYNY.GMS.getSiteDetailed1, {"mach_no": this.generatorNo}, {emulateJSON: true}).then(res => {
          if (res.data.data[0]) {
            this.generatorData = res.data.data[0];
          }
        }).catch(function (error) {
        }).finally(function () {
          this.showLoading(true);
        });
      },
      changeMode: function () {
        if (this.generatorData.sys_mode == this.API_DYNY.MODE.outageBoot.value) {//断电自启
          let command = this.API_DYNY.CMD.outageBootModeCmd;
          this.API_DYNY.utils.sendOperate(this.generatorNo, command.cmd, command.no, this.username, this);
          this.API_DYNY.utils.deleteAllTimerOperate(this.generatorNo, this);
          this.showSuccessMsg();
        } else if (this.generatorData.sys_mode == this.API_DYNY.MODE.accordingToVoltageBoot.value) {//根据电压自启
          this.$http.post(this.API_DYNY.GMS.modifyStartVoltage, {
            "mach_no": this.generatorNo,
            "changeVoltage": this.bootVoltage,
          }, {emulateJSON: true}).then(res => {
            let param1 = this.API_DYNY.CMD.getChangeToBootVoltageCmd();
            let param2 = this.API_DYNY.CMD.getChangeBootVoltageCmd(this.generatorData.start_Voltage);
            this.API_DYNY.utils.sendOperate(this.generatorNo, param1.cmd, param1.no, this.username, this);//1.先修改为低压自启
            this.API_DYNY.utils.sendOperate(this.generatorNo, param2.cmd, param2.no, this.username, this);//2.再发送自启电压
            this.API_DYNY.utils.deleteAllTimerOperate(this.generatorNo, this);
            this.showSuccessMsg();

          });
        } else if (this.generatorData.sys_mode == this.API_DYNY.MODE.manual.value) {//手动模式
          let param1 = this.API_DYNY.CMD.getManualModeCmd();
          this.API_DYNY.utils.sendOperate(this.generatorNo, param1.cmd, param1.no, this.username, this);//1.先修改为低压自启
          this.API_DYNY.utils.deleteAllTimerOperate(this.generatorNo, this);
          this.showSuccessMsg();
        } else if (this.generatorData.sys_mode == this.API_DYNY.MODE.accordingToTime.value) {//定时自启
        }
      },
      change: function (value) {
      }

    }

  }
</script>

<style scoped>

</style>
