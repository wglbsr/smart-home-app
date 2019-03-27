<template>

</template>

<script>
  let dev_mode = true;
  //自动判断是否为开发环境
  if (process.env.NODE_ENV == "development") {
    //dev_mode = false;
    dev_mode = true;
  } else {
    //dev_mode = false;
    dev_mode = false;
  }
  const GMS_DOMAIN = dev_mode ? "http://localhost:10130/" : "http://www.dy-iot.net:10130/";
  const GMS = {
      //---------------------------------------旧接口,部分有改动------------------------------
      getMachineNumByStatus: GMS_DOMAIN + "ems/site/getMachineNumByStatus.do",
      getSiteDetailed1: GMS_DOMAIN + "ems/site/getSiteDetailed1.do",
      getGeneratorLocation: GMS_DOMAIN + "ems/site/getGeneratorLocation.do",
      getSiteWarningList: GMS_DOMAIN + "ems/site/getSiteWarningList.do",
      getGenerateLog: GMS_DOMAIN + "ems/site/getGenerateLog.do",
      getCareTime: GMS_DOMAIN + "ems/site/getCareTime.do",
      getGeneratorForStation: GMS_DOMAIN + "getGeneratorForStation",
      getStopTime: GMS_DOMAIN + "ems/site/getStopTime.do",
      getStartVoltage: GMS_DOMAIN + "ems/site/getStartVoltage.do",

      searchMachine: GMS_DOMAIN + "ems/site/searchMachine.do",
      downloadGenerateTable: GMS_DOMAIN + "ems/site/downloadGenerateTable",
      exportGenerateTable: GMS_DOMAIN + "ems/site/exportGenerateTable",

      //change
      changeProtectModel: GMS_DOMAIN + "ems/site/changeProtectModel.do",

      //off,start,modify
      modifyStopTime: GMS_DOMAIN + "ems/site/modifyStopTime.do",
      modifyStartVoltage: GMS_DOMAIN + "ems/site/modifyStartVoltage.do",
      startMachine: GMS_DOMAIN + "ems/site/startMachine.do",
      offMachine: GMS_DOMAIN + "ems/site/offMachine.do",
      //off,start,modify,change

      //------------------------------------新接口------------------------------------
      //delete,insert,update,add,change,relate,register,activate,refuel,import
      setBasis: GMS_DOMAIN + "setBasis",

      executeSql: GMS_DOMAIN + "rest_api/" + "executeSql",

      importStationDataByExcel: GMS_DOMAIN + "importStationDataByExcel",

      refuelManually: GMS_DOMAIN + "refuelManually",

      activateGenerator: GMS_DOMAIN + "activateGenerator",

      setCache: GMS_DOMAIN + "cache/set",

      addStation: GMS_DOMAIN + "addStation",

      userRegister: GMS_DOMAIN + "userRegister",
      generatorRegister: GMS_DOMAIN + "generatorRegister",

      changePassword: GMS_DOMAIN + "changePassword",
      changeBootVoltage: GMS_DOMAIN + "changeBootVoltage",

      relateGeneratorWithStation: GMS_DOMAIN + "relateGeneratorWithStation",
      relateGeneratorListWithStation: GMS_DOMAIN + "relateGeneratorListWithStation",

      createWarningType: GMS_DOMAIN + "createWarningType",

      insertUnit: GMS_DOMAIN + "insertUnit",
      insertCustomer: GMS_DOMAIN + "insertCustomer",
      insertContact: GMS_DOMAIN + "insertContact",
      insertOperate: GMS_DOMAIN + "insertOperate",
      insertOperateList: GMS_DOMAIN + "insertOperateList",
      insertConfig: GMS_DOMAIN + "insertConfig",

      updateWarningType: GMS_DOMAIN + "updateWarningType",
      updateGenerator: GMS_DOMAIN + "updateGenerator",
      updateGeneratorList: GMS_DOMAIN + "updateGeneratorList",
      updateStation: GMS_DOMAIN + "updateStation",
      updateUnit: GMS_DOMAIN + "updateUnit",
      updateContact: GMS_DOMAIN + "updateContact",
      updateOperate: GMS_DOMAIN + "updateOperate",
      updateCustomer: GMS_DOMAIN + "updateCustomer",
      updateUser: GMS_DOMAIN + "updateUser",
      updateConfig: GMS_DOMAIN + "updateConfig",

      deleteWarningType: GMS_DOMAIN + "deleteWarningType",
      deleteAllTimerOperateByMachineNo: GMS_DOMAIN + "deleteAllTimerOperateByMachineNo",
      deleteContact: GMS_DOMAIN + "deleteContact",
      deleteContactByIdList: GMS_DOMAIN + "deleteContactByIdList",
      deleteCustomer: GMS_DOMAIN + "deleteCustomer",
      deleteUserByUserNo: GMS_DOMAIN + "deleteUserByUserNo",
      deleteAllTimerOperateByMachineNoList: GMS_DOMAIN + "deleteAllTimerOperateByMachineNoList",
      deleteStationByStationNo: GMS_DOMAIN + "deleteStationByStationNo",
      deleteUnit: GMS_DOMAIN + "deleteUnit",
      deleteCache: GMS_DOMAIN + "cache/delete",

      //******************查操作***********
      initBootCache: GMS_DOMAIN + "initBootCache",

      downloadImportFileExample: GMS_DOMAIN + "downloadImportFileExample",

      checkStationNo: GMS_DOMAIN + "checkStationNo",
      checkUsername: GMS_DOMAIN + "checkUsername",
      checkWarningType: GMS_DOMAIN + "checkWarningType",
      checkWarningCode: GMS_DOMAIN + "checkWarningCode",

      getWarningTypeList: GMS_DOMAIN + "getWarningTypeList",
      getWarningTypeCnt: GMS_DOMAIN + "getWarningTypeCnt",
      getCache: GMS_DOMAIN + "cache/get",
      getCacheNum: GMS_DOMAIN + "cache/num",
      getLankLog: GMS_DOMAIN + "getLankLog",
      getBasisInfo: GMS_DOMAIN + "getBasisInfo",
      getWithoutGeneratorStationList: GMS_DOMAIN + "getWithoutGeneratorStationList",
      getContactByContactId: GMS_DOMAIN + "getContactByContactId",
      getRegionByParent: GMS_DOMAIN + "getRegionByParent",
      getStationByStationNoList: GMS_DOMAIN + "getStationByStationNoList",
      getCustomerByCustomerNo: GMS_DOMAIN + "getCustomerByCustomerNo",
      getAllCustomer: GMS_DOMAIN + "getAllCustomer",
      getUserListByCustomerNoAndLevel: GMS_DOMAIN + "getUserListByCustomerNoAndLevel",
      getUserByUserNo: GMS_DOMAIN + "getUserByUserNo",
      getMaxOperateExeId: GMS_DOMAIN + "getMaxOperateExeId",
      getContactByUnitId: GMS_DOMAIN + "getContactByUnitId",
      getStationListByContactId: GMS_DOMAIN + "getStationListByContactId",
      getAllMyChildren: GMS_DOMAIN + "getAllMyChildren",
      getStationByStationNo: GMS_DOMAIN + "getStationByStationNo",
      getNextLevelUser: GMS_DOMAIN + "getNextLevelUser",
      getGeneratorDetail: GMS_DOMAIN + "getGeneratorDetail",
      getStationList: GMS_DOMAIN + "getStationList",
      getUnitList: GMS_DOMAIN + "getUnit",
      getContactList: GMS_DOMAIN + "getContact",
      getOperateList: GMS_DOMAIN + "getOperateList",
      getTimerOperateList: GMS_DOMAIN + "getTimerOperateList",
      getGeneratorStatusData: GMS_DOMAIN + "getGeneratorStatusData",
      getConfig: GMS_DOMAIN + "getConfig",
      //******************查操作***********
    }
  ;

  const UserLevel = {
    Admin: {level: 200, name: "管理员账户"},  //管理员
    Demo: {level: 201, name: "演示账户"},  //管理员
    Country: {level: 100, name: "普通账户"},//全国
    Province: {level: 90, name: "省级"},//省
    City: {level: 80, name: "市级"},    //市
    District: {level: 70, name: "区级"},//区
    County: {level: 60, name: "县级"},  //县
    Town: {level: 50, name: "镇级"},   //镇
  };

  const AllType = {
      fuelOptions: [{
        value: '',
        label: '全部'
      }, {
        value: '柴油',
        label: '柴油'
      }, {
        value: '汽油',
        label: '汽油'
      }],
      currentOptions: [{
        value: '',
        label: '全部'
      }, {
        value: '直流',
        label: '直流'
      }, {
        value: '交流',
        label: '交流'
      }],
      stateOptions: [{
        value: '',
        label: '全部'
      }, {
        value: '在线',
        label: '在线'
      }, {
        value: '离线',
        label: '离线'
      }],
      generateOptions: [{
        value: '',
        label: '全部'
      }, {
        value: '发电',
        label: '发电'
      }, {
        value: '停电',
        label: '停电'
      }],
    }
  ;


  const CMD = {
    unlockFuelTankCmd: {cmd: "84 05 67 01 01 01 01 6B 16", no: 7},
    lockFuelTankCmd: {cmd: "84 05 67 FE FE FE FE 5F 16", no: 8},
    autoModeOptions: [
      {
        value: '0',
        label: '请选择'
      }, {
        value: '1',
        label: '低压自启'
      }, {
        value: '2',
        label: '断电自启'
      }, {
        value: '3',
        label: '定时启动'
      }],
    modeOptions: [
      {
        value: '0',
        label: '手动模式'
      }, {
        value: '1',
        label: '低压自启(自动)'
      }, {
        value: '2',
        label: '断电自启(自动)'
      }, {
        value: '3',
        label: '定时启动(自动)'
      }],
    outageBootModeCmd: {cmd: "84 05 02 00 00 03 00 05 16", no: 12},//市电停电自启
    autoAppendZero: function (str, cnt, prepend) {
      let strLength = (str + "").length;
      if (strLength == cnt) {
        return str;
      } else if (strLength > cnt) {
        return str.substr(0, cnt);
      }
      let distance = cnt - strLength;
      for (let i = 0; i < distance; i++) {
        if (prepend) {
          str = "0" + str;
        } else {
          str = str + "0";
        }
      }
      return str;
    },
    translateCmdNoToText: function (operateNo) {
      let textAndNo = [{opNo: 13, text: "开启油机"}, {opNo: 16, text: "关闭油机"}, {opNo: 12, text: "断电自启"}, {
        opNo: 11,
        text: "低压自启"
      }];
      // , {opNo: 15, text: "开启油机"}
      // , {opNo: 18, text: "开启油机"}
      for (let i = 0; i < textAndNo.length; i++) {
        if (textAndNo[i].opNo == operateNo) {
          return textAndNo[i].text;
        }
      }
    },
    //更改为低压自启模式
    getChangeToBootVoltageCmd: function () {
      return {
        cmd: "84 05 02 00 00 02 00 04 16",
        no: 4
      };
    },
    getManualModeCmd: function () {
      return {
        cmd: "84 05 02 00 00 01 00 03 16",
        no: 3
      };
    },
    getStopGeneratorCmd: function () {
      return {
        cmd: "84 05 01 00 00 00 02 03 16",
        no: 2
      };
    },
    getStartGeneratorCmd: function () {
      return {
        cmd: "84 05 01 00 00 00 01 02 16",
        no: 1
      };
    },
    getStartOrStopOptions: function (operaData) {
      let startCnt = 0;
      let stopCnt = 0;
      for (let key in operaData) {
        if (operaData[key].opNo == CMD.getStartGeneratorCmd().no) {
          startCnt++;
        } else if (operaData[key].opNo == CMD.getStopGeneratorCmd().no) {
          stopCnt++;
        }
      }
      let operateTypeOptions = [{
        value: '0',
        label: '关机',
        disabled: stopCnt > 0 ? true : false
      }, {
        value: '1',
        label: '开机',
        disabled: startCnt > 0 ? true : false
      }];

      return operateTypeOptions;

    },
    //修改自启电压
    getChangeBootVoltageCmd: function (voltage) {
      let replacePart1 = "GH_IJ";
      let replacePart2 = "KL";
      let changeBootVoltage = "84 05 41 " + replacePart1 + " 2E " + replacePart2 + " 16";//前面四位X是电压的整数部分,后面两个为小数部分
      let voltageHex = (Number(voltage)).toString(16);
      let voltageStrList = voltageHex.split(".");
      let voltageIntPartHex = voltageStrList[0];
      let voltageDecimalPartHex = voltageStrList.length > 1 ? voltageStrList[1] : "00";
      let check = parseInt(voltageIntPartHex, 16) + parseInt(41, 16) + parseInt("2E", 16) + parseInt(voltageDecimalPartHex, 16);
      let autoAppendZero = function (str, cnt, prepend) {
        let strLength = (str + "").length;
        if (strLength == cnt) {
          return str;
        } else if (strLength > cnt) {
          return str.substr(0, cnt);
        }
        let distance = cnt - strLength;
        for (let i = 0; i < distance; i++) {
          if (prepend) {
            str = "0" + str;
          } else {
            str = str + "0";
          }
        }
        return str;
      };
      let finalIntPart = autoAppendZero(voltageIntPartHex, 4, true);
      finalIntPart = finalIntPart.substr(0, 2) + " " + finalIntPart.substr(2, 2);
      let finalDecimalPart = autoAppendZero(voltageDecimalPartHex, 2, false);
      changeBootVoltage = changeBootVoltage.replace(replacePart1, finalIntPart);
      let checkStr = check.toString(16);
      let finalCheckStr = checkStr.substring(checkStr.length - 2, checkStr.length);
      changeBootVoltage = changeBootVoltage.replace(replacePart2, finalDecimalPart + " " + autoAppendZero(finalCheckStr, 2, true));
      return {cmd: changeBootVoltage.toUpperCase(), no: 11};
    },
    //定时自启/熄火
    getTimerTaskCmd: function (index, start, deleteFlag, date) {
      //84 0E A1 00 00 XX XX XX XX yy yy mm dd hh MM ss校验和 16  新增定时油机开启
      //84 0E A4 00 01 XX XX XX XX yy yy mm dd hh MM ss校验和 16   新增定时油机熄火
      //84 0E A3 02 00 XX XX XX XX yy yy mm dd hh MM ss校验和 16   删除开启
      //84 0E A6 02 01 XX XX XX XX yy yy mm dd hh MM ss校验和 16   删除熄火
      let startCmdAdd = {
        cmd: ["84", "0E", "A1", "00", "00", "XX", "XX", "XX", "XX", "yy", "yy", "mm", "dd", "hh", "MM", "ss", "check", "16"],
        no: 13
      };
      let stopCmdAdd = {
        cmd: ["84", "0E", "A4", "00", "01", "XX", "XX", "XX", "XX", "yy", "yy", "mm", "dd", "hh", "MM", "ss", "check", "16"],
        no: 16
      };
      let startCmdDelete = {
        cmd: ["84", "0E", "A3", "02", "00", "XX", "XX", "XX", "XX", "yy", "yy", "mm", "dd", "hh", "MM", "ss", "check", "16"],
        no: 15
      };
      let stopCmdDelete = {
        cmd: ["84", "0E", "A6", "02", "01", "XX", "XX", "XX", "XX", "yy", "yy", "mm", "dd", "hh", "MM", "ss", "check", "16"],
        no: 18
      };
      let day = date.getDate();
      let year = date.getFullYear() + "";
      let yy1 = year.substr(0, 2);
      let yy2 = year.substr(2, 2);
      let month = date.getMonth() + 1;
      let hours = date.getHours();
      let min = date.getMinutes();
      let second = "00";
      let cmd = "";
      let cmdNo = "";
      let autoCompleteCmd = function (list, x1, x2, x3, x4, yy1, yy2, mm, dd, hh, MM, ss) {
        let finalCmd = "";
        if (list && list.length == 18) {
          list[5] = CMD.autoAppendZero(x1.toString(16), 2, true);
          list[6] = CMD.autoAppendZero(x2.toString(16), 2, true);
          list[7] = CMD.autoAppendZero(x3.toString(16), 2, true);
          list[8] = CMD.autoAppendZero(x4.toString(16), 2, true);
          list[9] = CMD.autoAppendZero(yy1, 2, true);
          list[10] = CMD.autoAppendZero(yy2, 2, true);
          list[11] = CMD.autoAppendZero(mm, 2, true);
          list[12] = CMD.autoAppendZero(dd, 2, true);
          list[13] = CMD.autoAppendZero(hh, 2, true);
          list[14] = CMD.autoAppendZero(MM, 2, true);
          list[15] = CMD.autoAppendZero(ss, 2, true);
          let checkNum = 0;
          for (let i = 2; i < 16; i++) {
            let temp = Number(parseInt(list[i], 16));
            checkNum += temp;
          }
          let checkNumHex = (checkNum).toString(16);
          list[16] = CMD.autoAppendZero(checkNumHex.substring(checkNumHex.length - 2, checkNumHex.length), 2, true);
        }
        for (let i = 0; i < list.length; i++) {
          if (i < list.length - 1) {
            finalCmd += list[i] + " ";
          } else {
            finalCmd += list[i];
          }
        }
        return finalCmd.toUpperCase();
      };
      if (start) { //开机
        cmd = (!deleteFlag) ? autoCompleteCmd(startCmdAdd.cmd, 0, 0, 0, index, yy1, yy2, month, day, hours, min, second) : autoCompleteCmd(startCmdDelete.cmd, 0, 0, 0, index, 0, 0, 0, 0, 0, 0, 0);
        cmdNo = (!deleteFlag) ? startCmdAdd.no : startCmdDelete.no;
      } else {//熄火
        cmd = (!deleteFlag) ? autoCompleteCmd(stopCmdAdd.cmd, 0, 0, 0, index, yy1, yy2, month, day, hours, min, second) : autoCompleteCmd(stopCmdDelete.cmd, 0, 0, 0, index, 0, 0, 0, 0, 0, 0, 0);
        cmdNo = (!deleteFlag) ? stopCmdAdd.no : stopCmdDelete.no;
      }
      return {cmd: cmd, no: cmdNo};
    },
  };

  const MODE = {
    manual: {value: 0, text: "手动模式"},
    accordingToVoltageBoot: {value: 1, text: "低压自启"},
    outageBoot: {value: 2, text: "停电自启"},
    accordingToTime: {value: 3, text: "定时自启"},
  };


  const MSG = {
    RetrieveDataError: "获取数据失败,请稍后重试!",
    UnknownError: "未知错误,请稍后重试!",
    UpdateError: "修改失败,请稍后重试!",
    AddError: "增加失败,请稍后重试!",
    DeleteError: "删除失败,请稍后重试!",
    OperateError: "操作失败,请稍后重试!"

  };

  const DATE_PICKER_LIST = [{
    text: '最近一周',
    onClick(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      picker.$emit('pick', [start, end]);
    }
  }, {
    text: '最近一个月',
    onClick(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      picker.$emit('pick', [start, end]);
    }
  }, {
    text: '最近三个月',
    onClick(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      picker.$emit('pick', [start, end]);
    }
  }];


  /**
   * this.API_DYNY.CONSTANCE
   * @type {{defaultLocationArr: number[], defaultMarkerTitle: string}}
   */
  const CONSTANCE = {
    defaultLocationArr: [113.04928, 23.634058],
    defaultLocationStr: "113.04928,23.634058",
    defaultMarkerTitle: "清远市德远能源开发有限公司" + "\n" + "广东省清远高新技术产业开发区创业一路6号A2栋6层602-2",
  };


  /**
   * @type {{transformLat: (function(*=, *): number), transformLon: (function(*=, *): *), initTank: utils.initTank}}
   */
  const utils = {
    timestampToTime: function (timestamp, onlyTime) {
      let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let year = date.getFullYear() + '-';
      let month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      let day = date.getDate();
      day = day > 9 ? day : "0" + day;
      let hours = date.getHours();
      hours = hours > 9 ? hours : "0" + hours;
      let min = date.getMinutes();
      min = min > 9 ? min : "0" + min;
      let second = date.getSeconds();
      second = second > 9 ? second : "0" + second;
      let finalTime = "";
      if (onlyTime) {
        return hours + ':' + min;
      } else {
        return year + month + day + ' ' + hours + ':' + min + ":" + second;
      }
    },
    timestampToTime2: function (timestamp) {
      let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      let day = date.getDate();
      day = day > 9 ? day : "0" + day;
      let hours = date.getHours();
      hours = hours > 9 ? hours : "0" + hours;
      let min = date.getMinutes();
      min = min > 9 ? min : "0" + min;
      return month + day + ' ' + hours + ':' + min;
    },
    dateStrToTimestamp: function (dateStr) {
      if (!dateStr) {
        return 0;
      }
      let s = dateStr;
      s = s.replace(/-/g, "/");
      return new Date(s).valueOf();
    },
    timestampToDate(timestamp) {
      if (!timestamp || timestamp <= 0) {
        return null;
      } else {
        return new Date(timestamp);
      }
    },
    translateLankLevel: function (val) {
      if (!val) {
        return 0;
      }

      if (isNaN(val)) {
        return 0;
      } else {
        let level = parseInt(val);
        return level > 100 ? 100 : level;
      }
    },

    translateCurrent: function (current) {
      if (isNaN(current)) {
        return 0;
      }
      let translatedCurrent = ((100 * Math.abs(current - 2.5)) / 0.625) - 3.2;
      let finalCurrent = translatedCurrent >= 100 || translatedCurrent <= 0 ? 0 : translatedCurrent;
      return this.keepHowManyNum(finalCurrent, 1);
    },
    getText: function (text) {
      if (text != null && text != "") {
        return text;
      }
      return "未知";
    },
    /**
     * 发送单个指令
     * @param mach_no
     * @param opNum
     * @param opNo
     * @param username
     * @param vue_this
     */
    sendOperate: function (mach_no, opNum, opNo, username, vue_this) {
      this.sendOperateList([mach_no], opNum, opNo, null, 0, username, vue_this);
    },
    /**
     * 发送多个油机的同一个指令
     * @param machNoList
     * @param opNum
     * @param opNo
     * @param executeDate
     * @param executeId
     * @param username
     * @param vue_this
     * @returns {number}
     */
    sendOperateList: function (machNoList, opNum, opNo, executeDate, executeId, username, vue_this, callback) {
      if (!machNoList || !vue_this || machNoList.length == 0) {
        return 0;
      }
      let params = [];
      for (let index in machNoList) {
        let operate = {
          machNo: machNoList[index],
          opNum: opNum,
          creatTime: new Date(),
          opNo: opNo,
          creatPer: username,
          action: dev_mode ? 1 : 0,
          // action: 0,
          deleted: false
        };
        if (executeDate) {
          operate.actualExecuteTime = executeDate;
        }
        if (executeId) {
          operate.executeId = executeId;
        }
        params.push(operate);
      }
      if (params.length == 0) {
        return 0;
      }
      vue_this.$http.post(GMS.insertOperateList, params).then(function (res) {
          if (res.body.result && res.body.data > 0) {
            vue_this.$message({
              message: "操作成功!",
              type: "success"
            });
            if (callback) {
              callback(res);
            }
          } else {
            vue_this.$message.error("操作失败,请稍后重试!");
          }
        }
      ).catch(function (error) {
        return 0
      });
    },

    getModeTextByVal: function (val) {
      for (let key in MODE) {
        if (MODE[key].value == val) {
          return MODE[key].text;
        }
      }
    },

    changeMaintainTime: function (selectedGenerator, this_vue, successCallback, errorCallback) {
      if (!selectedGenerator || selectedGenerator.length == 0) {
        return;
      }
      this_vue.$prompt("请输入保养时间", '提示', {
        inputValue: selectedGenerator[0].maintain_time,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputErrorMessage: '保养时间不正确'
      }).then(({value}) => {
        let params = [];
        for (let index in selectedGenerator) {
          params.push({
            machNo: selectedGenerator[index].mach_no,
            maintainTime: value,
          });
        }
        this_vue.$http.post(GMS.updateGeneratorList, params).then(res => {
          if (res.body.result && res.body.data > 0) {
            this_vue.$message({
              message: "修改成功",
              type: "success"
            });
            successCallback && successCallback();
          } else {
            this_vue.$message.error("修改失败,请稍后重试!");
            errorCallback && errorCallback();
          }
        }).catch(function (error) {
          errorCallback && errorCallback();
        });
      }).catch(() => {
        this_vue.$message("取消操作");
      });
    },
    changeBootVoltageByMachNoList: function (selectedGenerator, this_vue, successCallback, errorCallback) {
      if (!selectedGenerator || selectedGenerator == 0) {
        return;
      }
      let tip = '请输启动电压';
      if (selectedGenerator.length == 1) {
        tip = "请输入'" + selectedGenerator[0].mach_name + "'的启动电压";
      }
      this_vue.$prompt(tip, '提示', {
        inputValue: selectedGenerator[0].start_Vo,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputErrorMessage: '电压格式不正确'
      }).then(({value}) => {
        let machNoList = [];
        for (let index in selectedGenerator) {
          machNoList.push(selectedGenerator[index].mach_no);
        }
        this_vue.$http.post(GMS.changeBootVoltage, {
          generatorNoList: machNoList,
          bootVoltage: value
        }, {emulateJSON: true}).then(res => {
          if (res.body.result && res.body.data > 0) {
            this_vue.$message({
              message: "修改成功",
              type: "success"
            });
            successCallback && successCallback();
          } else {
            this_vue.$message.error("修改失败,请稍后重试!");
            errorCallback && errorCallback();
          }
        }).catch(function (error) {
          errorCallback && errorCallback();
        });
      }).catch(() => {
        this_vue.$message("取消操作");
      });
    },
    deleteAllTimerOperate: function (machNo, vue_this, callback) {
      this.deleteAllTimerOperateByMachineNoList([machNo], vue_this, callback);
    },
    deleteTimerTask: function (machNo, executedId, opNo, username, cmdId, vue_this, callback) {
      let result = CMD.getTimerTaskCmd(executedId, opNo == 13, true, new Date());//opNo == 13判断是开机还是关机
      let paramsInsert = {
        machNo: machNo,
        creatTime: new Date(),
        creatPer: username,
        action: dev_mode ? 1 : 0,
        executeId: 0,
        deleted: 0,
        opNo: result.no,
        opNum: result.cmd
      };
      //发送(删除原来的指令)的指令
      vue_this.$http.post(GMS.insertOperate, paramsInsert).then(function (res1) {
        if (res1.body.result && res1.body.data > 0) {
          let paramsDelete = {
            machNo: machNo,
            id: cmdId,
            deleted: 1,
            executeId: 0,
          };
          //将原来的指令置为无效(deleted=true)
          vue_this.$http.post(GMS.updateOperate, paramsDelete).then(function (res2) {
            if (res2.body.result) {
              if (res2.body.data > 0) {
                callback && callback();
              }
            }
          });
        }
      });
    },
    deleteAllTimerOperateByMachineNoList: function (machNoList, vue_this, callback) {
      if (!machNoList || !vue_this || machNoList.length == 0) {
        return;
      }
      let params = {
        machineNoList: machNoList
      };
      vue_this.$http.post(GMS.deleteAllTimerOperateByMachineNoList, params, {emulateJSON: true}).then(function (res) {
        if (res.body.result && res.body.data > 0) {
          callback && callback();
        }
      });
    },
    modeSwitch: function (machNoList, mode, username, bootVoltage, vue_this, callback) {
      if (!machNoList || !vue_this || machNoList.length == 0) {
        // callback();
        return;
      }
      if (mode == MODE.outageBoot.value) {//断电自启
        this.sendOperateList(machNoList, CMD.outageBootModeCmd.cmd, CMD.outageBootModeCmd.no, null, 0, username, vue_this);
        this.deleteAllTimerOperateByMachineNoList(machNoList, vue_this, callback);//删除定时任务
      } else if (mode == MODE.accordingToVoltageBoot.value) {//根据电压自启
        vue_this.$http.post(GMS.changeBootVoltage, {
          generatorNoList: machNoList,
          bootVoltage: bootVoltage,
        }, {emulateJSON: true}).then(res => {
          let param1 = CMD.getChangeToBootVoltageCmd();
          let param2 = CMD.getChangeBootVoltageCmd(bootVoltage);
          this.sendOperateList(machNoList, param1.cmd, param1.no, null, 0, username, vue_this);//1.先修改为低压自启
          this.sendOperateList(machNoList, param2.cmd, param2.no, null, 0, username, vue_this);//2.再发送自启电压
          this.deleteAllTimerOperateByMachineNoList(machNoList, vue_this, callback);//3.删除定时任务
        });
      } else if (mode == MODE.manual.value) {//手动模式
        let param = CMD.getManualModeCmd();
        this.sendOperateList(machNoList, param.cmd, param.no, null, 0, username, vue_this);
        this.deleteAllTimerOperateByMachineNoList(machNoList, vue_this, callback);//删除定时任务
      }
    },
    keepHowManyNum: function (value, keppNum, force) {
      if (isNaN(value) && !force) {
        return value;
      }

      if (isNaN(value) || !value) {
        value = 0;
      }
      if (!keppNum) {
        keppNum = 1;
      }
      let temp = Math.pow(10, keppNum);
      let result = Math.round(Number(value) * temp) / temp;
      return result;
    },
    /**
     *
     * @param enumKey
     * @param value
     * @returns {*}
     */
    getEnumText(enumKey, value) {
      let enumData = {
        connected: [{value: 0, text: "离线"}, {value: 1, text: "在线"}],
        stationType: [{value: 0, text: "固定"}, {value: 1, text: "移动"}],
        generateType: [{value: 0, text: "交流"}, {value: 1, text: "直流"}],
        fuelType: [{value: 0, text: "汽油"}, {value: 1, text: "柴油"}],//city_electricity
        city_electricity: [{value: 0, text: "市电"}, {value: 1, text: "停电"}],
      };
      for (let key in enumData) {
        if (key == enumKey) {
          for (let i = 0; i < enumData[key].length; i++) {
            if (value == enumData[key][i].value) {
              return enumData[key][i].text;
            }
          }
        }
      }
      return value;
    },
    /**
     * 获取自己的下级
     * @param level
     * @returns {Array}
     */
    getLevelList: function (level) {
      let result = [];
      let levelList = [UserLevel.Admin, UserLevel.Country, UserLevel.Province, UserLevel.City, UserLevel.District, UserLevel.County, UserLevel.Town];
      for (let index in levelList) {
        if (level >= levelList[index].level) {
          result.push(levelList[index]);
        }
      }
      if (level == UserLevel.Admin.level) {
        result.push(UserLevel.Demo);
      }
      return result;
    },
    /**
     * 初始化地图标记
     * @param data
     * @param mapObject
     * @param router
     * @returns Array
     */
    initMarkers: function (data) {//mapObject,
      let markerList = [];
      let dataObj = !data ? {} : data;
      if (!Array.isArray(dataObj)) {
        dataObj = [dataObj];
      }
      for (let i in dataObj) {
        let machineName = dataObj[i].stationName ? dataObj[i].stationName : dataObj[i].machName;
        let onlineFlag = utils.isOnline(dataObj[i].interTime);
        let temp = new AMap.Marker({
          // map: mapObject,//地图对象
        });
        let coordinate = dataObj[i].stationPosition;
        if (!coordinate || coordinate == "NULL" || coordinate == "" || !utils.isCoordinate(coordinate)) {//|| true
          coordinate = ["113.04928", "23.634058"];
          if (dataObj[i].stationLongitude && dataObj[i].stationLatitude && dataObj[i].stationLongitude >= 0 && dataObj[i].stationLatitude >= 0) {
            coordinate = [Number(dataObj[i].stationLongitude), Number(dataObj[i].stationLatitude)];
          } else {
            coordinate [113.04928, 23.634058];
          }
        } else {
          coordinate = this.fixCoordinate(coordinate);
        }

        let title = "油机编号:" + this.getText(dataObj[i].mach_no) + "\n"
          + "基站名称:" + this.getText(machineName) + "\n"
          + "基站编码:" + this.getText(dataObj[i].stationNo);
        temp.setTitle(title);
        let stationNo = dataObj[i].st_no ? dataObj[i].st_no : dataObj[i].stationNo;
        if (coordinate[0] < coordinate[1]) {
          let tempCoordinate = coordinate[0];
          coordinate[0] = coordinate[1];
          coordinate[1] = tempCoordinate;
        }
        temp.setPosition(coordinate);
        temp.mach_no = dataObj[i].mach_no;
        temp.stationType = dataObj[i].stationType;
        temp.onlineFlag = onlineFlag;
        temp.state = dataObj[i].state;
        temp.noGenerator = dataObj[i].noGenerator;
        temp.machineName = machineName;
        temp.cityElectricity = dataObj[i].cityElectricity;
        temp.stationNo = stationNo;
        temp.setIcon(this.getMarkerIcon(onlineFlag, dataObj[i].state, dataObj[i].cityElectricity, dataObj[i].noGenerator));//设置图标
        markerList.push(temp);
      }
      return markerList;
    },
    /**
     * 判断是否为地图坐标
     * @param coordinateStr
     * @returns {boolean}
     */
    isCoordinate: function (coordinateStr) {
      if (!coordinateStr || coordinateStr == "NULL") {
        return false;
      }
      let longReg = /^[0-9]{1,3}\.[0-9]{1,9}$/;
      let latReg = /^[0-9]{1,3}\.[0-9]{1,9}$/;
      let coordinateArr = coordinateStr.split(",");
      let lon = Number(coordinateArr[0]);
      let lat = Number(coordinateArr[1]);
      if (longReg.test(lon) && latReg.test(lat)) {
        return true;
      } else {
        return false;
      }
    },
    /**
     * 根据状态获取图标
     * @param connected
     * @param status
     */
    getMarkerIcon: function (onlineFlag, generatingFlag, cityElectricity, isStation) {
      if (!!isStation) {
        return require("./assets/images/station.png");
      }
      if (onlineFlag) {
        if (!generatingFlag) {//0为发电,1为休眠
          return require("./assets/images/green.png");
        }
        if (cityElectricity) {//1为停电
          return require("./assets/images/gray.png");
        } else (status == "市电")
        {
          //0为市电
          return require("./assets/images/blue.png");
        }
      } else {
        return require("./assets/images/deepGray.png");
      }
    },
    /**
     * 地图坐标校准
     * @param x
     * @param y
     * @returns {number}
     */
    transformLat: function (x, y) {
      var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
      ret += (20.0 * Math.sin(6.0 * x * Math.PI) + 20.0 * Math.sin(2.0 * x * Math.PI)) * 2.0 / 3.0;
      ret += (20.0 * Math.sin(y * Math.PI) + 40.0 * Math.sin(y / 3.0 * Math.PI)) * 2.0 / 3.0;
      ret += (160.0 * Math.sin(y / 12.0 * Math.PI) + 320 * Math.sin(y * Math.PI / 30.0)) * 2.0 / 3.0;

      return ret;
    },
    /**
     * 是否已经超出中国范围
     * @param lat
     * @param lon
     * @returns {boolean}
     */
    outOfChina: function (lat, lon) {
      if (lon < 72.004 || lon > 137.8347 || lat < 0.8293 || lat > 55.8271)
        return true;
      return false;
    },
    /**
     *地图坐标校准
     * @param coordinate
     * @returns {*}
     */
    fixCoordinate: function (coordinate)  //Lon是经度，Lat是纬度
    {
      let temp = "113.04928,23.634058";
      if (!!coordinate && coordinate !== "NULL") {
        temp = coordinate + "";
      }
      let coordinateArr = temp.split(",");
      let wgLon = Number(coordinateArr[0]);
      let wgLat = Number(coordinateArr[1]);
      if (this.outOfChina(wgLat, wgLon)) {
        return [wgLon, wgLat];
      }
      if (wgLon <= 0 || wgLat <= 0) {
        return [113.04928, 23.634058];
      }
      let dLat = this.transformLat(wgLon - 105.0, wgLat - 35.0);
      let dLon = this.transformLon(wgLon - 105.0, wgLat - 35.0);
      let radLat = wgLat / 180.0 * Math.PI;
      let magic = Math.sin(radLat);
      magic = 1 - this.ee * magic * magic;
      let sqrtMagic = Math.sqrt(magic);

      dLat = (dLat * 180.0) / ((this.a * (1 - this.ee)) / (magic * sqrtMagic) * Math.PI);

      dLon = (dLon * 180.0) / (this.a / sqrtMagic * Math.cos(radLat) * Math.PI);

      let mgLat = wgLat + dLat;
      let mgLon = wgLon + dLon;
      return [mgLon, mgLat];

    },
    isOnline: function (interTime13) {//类型为时间戳
      if (!interTime13) {
        return false;
      }
      let TIMEOUT_MIN = 3;
      let timeout = TIMEOUT_MIN * 60 * 1000;
      let nowTimestamp = new Date().valueOf();
      let onlineTimeout = sessionStorage.getItem("onlineTimeout");
      if (onlineTimeout) {
        timeout = onlineTimeout * 1000;
      }
      return nowTimestamp - interTime13 <= timeout;
    },
    isOnlineByDateStr: function (dateStr) {//类型为时间戳
      if (!dateStr) {
        return false;
      }
      return this.isOnline(this.dateStrToTimestamp(dateStr));
    },
    /**
     * 取整
     * @param num
     * @returns {number}
     */
    getNumber: function (num) {
      if (!num || isNaN(num)) {
        return 0;
      } else {
        return Math.floor(num);
      }
    },
    /**
     * 坐标校准
     * @param x
     * @param y
     * @returns {*}
     */
    transformLon: function (x, y) {
      var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
      ret += (20.0 * Math.sin(6.0 * x * Math.PI) + 20.0 * Math.sin(2.0 * x * Math.PI)) * 2.0 / 3.0;
      ret += (20.0 * Math.sin(x * Math.PI) + 40.0 * Math.sin(x / 3.0 * Math.PI)) * 2.0 / 3.0;
      ret += (150.0 * Math.sin(x / 12.0 * Math.PI) + 300.0 * Math.sin(x / 30.0 * Math.PI)) * 2.0 / 3.0;
      return ret;
    },
    /**
     * 初始化油量canvas
     * @param canvasObj
     * @param capacity
     * @param percentage
     */
    initTank: function (canvasObj, capacity, percentage) {
      if (!canvasObj) {
        return;
      }
      let canvas = canvasObj;
      let ctx = canvas.getContext('2d');
      let nowRange = Math.floor(this.getNumber(percentage));
      let level = Math.floor(this.getNumber(capacity));
      if (parseFloat(nowRange) > 100) {
        nowRange = 100;
      }
      let mW = canvas.width = 250;
      let mH = canvas.height = 250;
      let lineWidth = 2;
      let r = mH / 2;
      let cR = r - 16 * lineWidth;
      let sX = 0;
      let sY = mH / 2;
      let axisLength = mW;
      let waveWidth = 0.015;
      let waveHeight = 10;
      let speed = 0.09;
      let xOffset = 0;

      ctx.lineWidth = lineWidth;
      let IsdrawCircled = false;
      let drawCircle = function () {
        ctx.beginPath();
        ctx.strokeStyle = '#1080d0';
        ctx.arc(r, r, cR + 5, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(r, r, cR, 0, 2 * Math.PI);
        ctx.clip();
      };
      //圆形油量显示
      let drawSin = function (xOffset) {
        ctx.save();
        let points = [];
        let dY, y;
        ctx.beginPath();
        for (let x = sX; x < sX + axisLength; x += 20 / axisLength) {
          if (nowRange >= 80 && nowRange < 100) {
            y = -Math.sin((sX + x) * waveWidth + xOffset);
            dY = mH * (1 - (nowRange - 12) / 100);
          }
          else if (nowRange > 30 && nowRange < 80 || nowRange >= 100 || nowRange <= 0) {
            y = -Math.sin((sX + x) * waveWidth + xOffset);
            dY = mH * (1 - nowRange / 100);
          }
          else if (nowRange > 0 && nowRange <= 30) {
            y = -Math.sin((sX + x) * waveWidth + xOffset);
            dY = mH * (1 - (nowRange + 10) / 100);
          }
          points.push([x, dY + y * waveHeight]);
          ctx.lineTo(x, dY + y * waveHeight);
        }
        ctx.lineTo(axisLength, mH);
        ctx.lineTo(sX, mH);
        ctx.lineTo(points[0][0], points[0][1]);
        if (nowRange >= 80 && nowRange <= 100) {
          ctx.fillStyle = '#339900';
        }
        else if (nowRange > 30 && nowRange < 80 || nowRange > 100 || nowRange <= 0) {
          ctx.fillStyle = '#F16601';
        }
        else if (nowRange > 0 && nowRange <= 30) {
          ctx.fillStyle = '#FF0000';
        }
        ctx.closePath(); //add
        ctx.fill();
        ctx.restore();
      };


      let drawText = function () {
        ctx.save();

        let size = 0.4 * cR;
        ctx.font = size + 'px Microsoft Yahei';

        ctx.fillStyle = "rgba(06, 85, 128, 0.8)";

        ctx.fillText(nowRange > 0 ? nowRange : 0, 80, 105);//92,105//nowRange  百分百比

        ctx.font = "24px Microsoft Yahei";
        ctx.fillText("%", 145, 105);//135,105

        ctx.font = "26px Microsoft Yahei";
        ctx.fillText(level > 0 ? level : 0, 92, 175);//升

        ctx.font = "20px Microsoft Yahei";
        ctx.fillText("L", 148, 175);

        ctx.restore();
      };


      let render = function () {
        ctx.clearRect(0, 0, mW, mH);
        if (IsdrawCircled == false) {
          drawCircle();
          IsdrawCircled = true;
        }
        drawSin(xOffset);
        drawText();
        xOffset += speed;
        requestAnimationFrame(render);
      };
      render();
    }
  };

  export default {
    GMS,
    CMD,
    utils,
    GMS_DOMAIN,
    MSG,
    MODE,
    DATE_PICKER_LIST,
    CONSTANCE,
    AllType,
    UserLevel
  }

</script>

<style scoped>

</style>
