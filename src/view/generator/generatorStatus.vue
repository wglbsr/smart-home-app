<template>
    <main>
        <grid :cols="2" :show-lr-borders="false" :show-vertical-dividers="false">
            <grid-item>
                <div style="width:120px;height:120px;margin: auto;">
                    <x-circle :percent="generatorData.lank_per|keepHowManyNum(0)" :stroke-width="5">
                        <span>{{generatorData.lank_level|keepHowManyNum(1)}} L({{generatorData.lank_per|keepHowManyNum(0)}}%)</span><br>
                        <span>{{generatorData.fuel_type}}</span>
                    </x-circle>
                </div>
            </grid-item>
            <grid-item style="text-align: left">
        <span class="status-span">
          <i class="iconfont icon-dianya3"></i>
          {{generatorData.stationType}}
        </span><br>
                <span class="status-span"
                      v-bind:class="{ 'green-light': generatorData.state1=='发电','gray-light': generatorData.state1!='发电'}">
          <i class="iconfont icon-fadianji"></i>
          {{generatorData.state1}}
        </span><br>
                <span class="status-span"
                      v-bind:class="{'green-light': generatorData.Acity_electricity=='市电','gray-light': generatorData.Acity_electricity!='市电'}">
          <i class="iconfont icon-dianya5"></i>
          {{generatorData.Acity_electricity=='市电'?'有市电':'无市电'}}
        </span><br>
                <span class="status-span"
                      v-bind:class="{ 'green-light': generatorData.load_mode==1,'gray-light': generatorData.load_mode!=1}">
          <i class="iconfont icon-jihuo3" v-if="generatorData.load_mode==1"></i>
          <i class="iconfont icon-jihuo" v-else></i>
        {{generatorData.load_mode|translateLoadMode}}
        </span><br>
                <span class="status-span"
                      v-bind:class="{ 'green-light': generatorData.st_state=='在线','gray-light': generatorData.st_state!='在线'}">
          <i class="iconfont icon-jihuo2" v-if="generatorData.st_state=='在线'"></i>
          <i class="iconfont icon-Off-line" v-else></i>
          {{generatorData.st_state}}
        </span>
            </grid-item>
        </grid>

        <grid :cols="3" :show-lr-borders="false" :show-vertical-dividers="false">
            <grid-item>
                <divider><i class="iconfont icon-voltage"></i></divider>
                <div class="text-align-center detail-content" @click="changeBootVoltage">
                    {{generatorData.start_Voltage|keepHowManyNum(1)}}V
                </div>
                <div class="text-align-center">启动电压</div>
            </grid-item>
            <grid-item>
                <divider><i class="iconfont icon-voltage"></i></divider>
                <div class="text-align-center detail-content">{{generatorData.al_voltage|keepHowManyNum(1)}}V</div>
                <div class="text-align-center">电池电压</div>
            </grid-item>
            <grid-item>
                <divider><i class="iconfont icon-voltage"></i></divider>
                <div class="text-align-center detail-content">{{generatorData.output_voltage|keepHowManyNum(1)}}V</div>
                <div class="text-align-center">输出电压</div>
            </grid-item>
            <grid-item>
                <divider><i class="iconfont icon-dianliu2"></i></divider>
                <div class="text-align-center detail-content">
                    {{generatorData.st_current|translateCurrent|keepHowManyNum(1)}}A
                </div>
                <div class="text-align-center">输出电流</div>
            </grid-item>
            <grid-item>
                <divider><i class="iconfont icon-xiaoshi2"></i></divider>
                <div class="text-align-center detail-content">{{generatorData.sum_time}}min</div>
                <div class="text-align-center">发电时长</div>
            </grid-item>
            <grid-item>
                <divider><i class="iconfont icon-shijianfenzhong" @click="changeMaintainTime"></i></divider>
                <div class="text-align-center detail-content">{{generatorData.maintain_time|keepHowManyNum(2)}}H</div>
                <div class="text-align-center">距离保养</div>
            </grid-item>
            <grid-item>
                <divider><i class="iconfont icon-eryanghuatan"></i></divider>
                <div class="text-align-center detail-content">{{generatorData.st_co|keepHowManyNum(2)}}ppm</div>
                <div class="text-align-center">CO排放量</div>
            </grid-item>
            <grid-item>
                <divider><i class="iconfont icon-wendu3"></i></divider>
                <div class="text-align-center detail-content">{{generatorData.external_temperature|keepHowManyNum(1)}}°C
                </div>
                <div class="text-align-center">油机温度</div>
            </grid-item>
            <grid-item>
            </grid-item>
        </grid>

        <grid style=" margin-bottom: 50px;" :cols="4" :show-lr-borders="false" :show-vertical-dividers="false"
              v-if="generatorData.boardVersion==0">
            <grid-item>
                <div class="box-div iconfont icon-dianhuo" @click="startGenerator"></div>
                <div class="text-align-center">启动</div>
            </grid-item>
            <grid-item>
                <div class="box-div iconfont icon-tingzhi" @click="stopGenerator"></div>
                <div style="text-align: center ">熄火</div>
            </grid-item>
            <grid-item>
                <div class="box-div iconfont icon-qiehuan" @click="openModeSwitchDialog"></div>
                <div style="text-align: center ">模式切换</div>
            </grid-item>
            <grid-item>
                <div class="box-div iconfont icon-weihu" @click="switchToMaintainMode"></div>
                <div style="text-align: center ">{{!this.generatorData.pro_mode?"维护":"退出维护"}}</div>
            </grid-item>
            <grid-item :link="{path:'/generatorInfo',query:{machNo:this.machNo}}">
                <div class="box-div iconfont icon-fadianji"></div>
                <div style="text-align: center ">油机信息</div>
            </grid-item>
            <grid-item>
                <div class="box-div iconfont icon-gas-station" @click="refuelManually"></div>
                <div style="text-align: center ">手动加油</div>
            </grid-item>
            <grid-item>
                <div class="box-div iconfont icon-unlock" @click="lockFuelTank"></div>
                <div style="text-align: center ">油箱开锁</div>
            </grid-item>
            <grid-item>
                <div class="box-div iconfont icon-lock" @click="lockFuelTank('true')"></div>
                <div style="text-align: center ">油箱上锁</div>
            </grid-item>
            <grid-item>
                <div class="box-div iconfont icon-fankui2" @click="gotoMaintainLog('true')"></div>
                <div style="text-align: center ">保养</div>
            </grid-item>
        </grid>

    </main>
</template>

<script>
    export default {
        data() {
            return {
                machNo: this.$route.query.machNo,
                connected: false,
                st_state: "",
                btnTimeout: 20,
                btnDisabled: false,
                customerNo: sessionStorage.getItem("usercus"),
                username: sessionStorage.getItem("user"),
                getDataTimer: null,
                generatorData:
                    {
                        pro_mode: false,
                    }
                ,
            }
        },
        mounted: function () {
            this.getGeneratorDetail();
            this.setRefreshDataTimer();
        },
        beforeDestroy: function () {
            this.clearRefreshDataTimer();
        },
        filters: {
            translateLoadMode: function (val) {
                if (val == 1) {
                    return "带载";
                } else {
                    return "空载";
                }
            }
        },
        methods: {
            gotoMaintainLog() {
                this.$router.push({path: '/generatorStatus/maintainLogCreate', query: {generatorNo: this.machNo}});
            },
            changeBootVoltage: function () {
                let that = this;
                this.$vux.confirm.prompt('电压', {
                    title: '启动电压(V)',
                    onShow() {
                        that.$vux.confirm.setInputValue(that.generatorData.start_Voltage)
                    },
                    onHide() {
                    },
                    onCancel() {

                    },
                    onConfirm(value) {
                        if (isNaN(value)) {
                            that.$vux.toast.show({
                                text: '请输入正确的电压!',
                                type: 'warn'
                            });
                            return;
                        }
                        that.$http.post(that.API_DYNY.GMS.updateGenerator, {
                            startVoltage: value,
                            machNo: that.generatorData.generatorNo
                        }).then(res => {
                            if (res.body.result) {
                                that.showSuccessMsg();
                            }
                        });
                    }
                });
            },
            setCountDown() {
                clearTimeout();
                let that = this;
                this.btnDisabled = true;
                setTimeout(function () {
                    that.btnDisabled = false;
                }, that.btnTimeout * 1000);
            },
            changeMaintainTime: function () {
                let that = this;
                this.$vux.confirm.prompt('时间', {
                    title: '保养时间(h)',
                    onShow() {
                        that.$vux.confirm.setInputValue(that.generatorData.maintainTimeFixed)
                    },
                    onHide() {
                    },
                    onCancel() {

                    },
                    onConfirm(value) {
                        if (isNaN(value)) {
                            that.$vux.toast.show({
                                text: '请输入正确的时间!',
                                type: 'warn'
                            });
                            return;
                        }
                        that.$http.post(that.API_DYNY.GMS.updateGenerator, {
                            maintainTime: value,
                            machNo: that.generatorData.generatorNo
                        }).then(res => {
                            if (res.body.result) {
                                that.showSuccessMsg();
                            }
                        });
                    }
                });
            },
            lockFuelTank: function (lock) {
                let that = this;
                if (this.btnDisabled) {
                    this.$vux.toast.show({
                        text: '每次命令发送间隔不能小于' + that.btnTimeout + '秒!',
                        type: "cancel",
                        time: 3000,
                    });
                    return;
                }
                if (lock) {
                    this.API_DYNY.utils.sendOperate(this.generatorNo, this.API_DYNY.CMD.lockFuelTankCmd.cmd,
                        this.API_DYNY.CMD.lockFuelTankCmd.no, this.username, this);
                } else {
                    this.API_DYNY.utils.sendOperate(this.generatorNo, this.API_DYNY.CMD.unlockFuelTankCmd.cmd,
                        this.API_DYNY.CMD.unlockFuelTankCmd.no, this.username, this);
                }
                this.setCountDown();
            },
            showSuccessMsg: function () {
                this.$vux.toast.show({
                    text: '操作成功!'
                });
            },
            refuelManually: function () {
                let that = this;
                this.$vux.confirm.prompt('油量', {
                    title: '手动加油',
                    onShow() {
                        that.$vux.confirm.setInputValue(0)
                    },
                    onHide() {
                    },
                    onCancel() {

                    },
                    onConfirm(value) {
                        if (isNaN(value)) {
                            that.$vux.toast.show({
                                text: '请输入正确的油量!',
                                type: 'warn'
                            });
                            return;
                        }
                        let params = {
                            generatorNo: that.machNo,
                            refuelVolume: value
                        };
                        that.$http.post(that.API_DYNY.GMS.refuelManually, params, {emulateJSON: true}).then(function (res) {
                            if (res.body.result && res.body.data > 0) {
                                that.showSuccessMsg();
                            }
                        });
                    }
                });
            },
            setRefreshDataTimer: function () {
                let that = this;
                this.getDataTimer = setInterval(function () {
                    that.getGeneratorDetail();
                }, 15000);
            },
            clearRefreshDataTimer: function () {
                if (this.getDataTimer != null) {
                    clearTimeout(this.getDataTimer);
                    this.getDataTimer = null;
                }
            },
            startGenerator: function () {
                let that = this;
                if (this.btnDisabled) {
                    this.$vux.toast.show({
                        text: '每次命令发送间隔不能小于' + that.btnTimeout + '秒!',
                        type: "cancel",
                        time: 3000,
                    });
                    return;
                }
                this.$vux.confirm.show({
                    title: '启动油机',
                    content: '确定启动油机吗?',
                    onCancel() {
                    },
                    onConfirm() {
                        that.$http.post(that.API_DYNY.GMS.startMachine, {
                            mach_no: that.machNo,
                            flag: 1,
                            user_no: that.username
                        }, {emulateJSON: true}).then(res => {
                            that.setCountDown();
                        });
                    }
                });

            },
            stopGenerator: function () {
                let that = this;
                if (this.btnDisabled) {
                    this.$vux.toast.show({
                        text: '每次命令发送间隔不能小于' + that.btnTimeout + '秒!',
                        type: "cancel",
                        time: 3000,
                    });
                    return;
                }
                this.$vux.confirm.show({
                    title: '关闭油机',
                    content: '确定关闭油机吗?',
                    onCancel() {
                    },
                    onConfirm() {
                        that.$http.post(that.API_DYNY.GMS.offMachine, {
                            mach_no: that.machNo,
                            flag: 0,
                            user_no: that.username
                        }, {emulateJSON: true}).then(res => {
                            that.setCountDown();
                        }).catch(function (error) {

                        });
                    }
                });
            },
            openModeSwitchDialog: function () {
                let that = this;
                if (this.btnDisabled) {
                    this.$vux.toast.show({
                        text: '每次命令发送间隔不能小于' + that.btnTimeout + '秒!',
                        type: "cancel",
                        time: 3000,
                    });
                    return;
                }
                that.setCountDown();
                this.$router.push({path: 'GeneratorModeSwitch', query: {generatorNo: this.machNo}});
            },
            switchToMaintainMode: function () {
                let that = this;
                if (this.btnDisabled) {
                    this.$vux.toast.show({
                        text: '每次命令发送间隔不能小于' + that.btnTimeout + '秒!',
                        type: "cancel",
                        time: 3000,
                    });
                    return;
                }
                that.setCountDown();
                let proMode = this.generatorData.pro_mode;
                let content = proMode ? "当前为维护模式,是否确定退出?" : "是否确定进入维护模式?";
                this.$vux.confirm.show({
                    title: '维护模式',
                    content: content,
                    onCancel() {
                    },
                    onConfirm() {
                        that.$http.post(that.API_DYNY.GMS.changeProtectModel, {
                            mach_no: that.machNo,
                            modelflag: proMode ? 6 : 5,//5维护模式,6正常模式
                            user_no: that.username
                        }, {emulateJSON: true}).then(res => {
                            that.setCountDown();
                        }).catch(function (error) {

                        });
                    }
                });
            },
            showDevelopingTip: function () {
                this.$vux.toast.show({
                    text: '正在开发中!'
                });

            },
            getGeneratorDetail: function () {
                this.$http.post(this.API_DYNY.GMS.getSiteDetailed1, {"mach_no": this.machNo}, {emulateJSON: true}).then(res => {
                    if (res.data.data[0]) {
                        this.generatorData = res.data.data[0];
                        this.st_state = res.data.data[0].st_state;
                        this.connected = this.st_state !== "离线";
                    }
                }).catch(function (error) {
                    // console.log(error);
                });
            },
        }
    }
</script>

<style scoped>

    .generator-detail-div {
        /*position: relative;*/
        /*height: 100%;*/
        /*bottom: 50px;*/
        /*padding: 5px;*/
        /*margin-bottom: 90px;*/
    }

    .mode-switch-div {
        padding: 15px;
    }

    .detail-content {
        font-weight: bold;
    }

    .text-align-center {
        text-align: center;
    }

    .status-span {
        margin-right: 25px;
    }

    .icon-signal {
        color: mediumseagreen;
    }

    .icon-no-signal {
        color: gray;
    }

    .box-div {
        height: 50px;
        width: 50px;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        color: #fff;
        font-size: 33px;
        background-color: #20b907;
        border-radius: 25px;
        background-clip: padding-box;
    }

    .dialog-button-submit, .dialog-button-close {
        width: 41%;
        margin: 10px;
    }

    html, body {
        height: 100%;
        width: 100%;
        overflow-x: hidden;
    }

    .dialog-button-submit {
        float: right;
    }

    .dialog-button-close {
        float: left;
    }
</style>
