//V2新接口
let dev_mode = true;
//自动判断是否为开发环境
if (process.env.NODE_ENV == "development") {
  // dev_mode = false;
  dev_mode = true;
} else {
  // dev_mode = false;
  dev_mode = false;
}
const GMS_DOMAIN = dev_mode ? "http://localhost:10130/" : "http://www.dy-iot.net:10130/";
const VERSION = "v2/";
module.exports = {
  program: {
    select: {
      exists: GMS_DOMAIN + VERSION + "program/versionExists",
      selectAll: GMS_DOMAIN + VERSION + "program/selectAll",
      default: GMS_DOMAIN + VERSION + "program/select"
    },
    delete: {default: GMS_DOMAIN + VERSION + "program/delete",},
    update: {
      enable: GMS_DOMAIN + VERSION + "program/enable",
      default: GMS_DOMAIN + VERSION + "program/update"
    },
    file: {upload: GMS_DOMAIN + VERSION + "program/upload"}
  },
  crontab: {
    select: {
      default: GMS_DOMAIN + VERSION + "crontab/select"
    },
    delete: {
      batch: GMS_DOMAIN + VERSION + "crontab/deleteBatch",
      default: GMS_DOMAIN + VERSION + "crontab/delete",
    },
    update: {
      default: GMS_DOMAIN + VERSION + "crontab/update"
    },
    create: {
      default: GMS_DOMAIN + VERSION + "crontab/create",
      batch: GMS_DOMAIN + VERSION + "crontab/createBatch",
    }
  },
  maintainLog: {
    select: {
      default: GMS_DOMAIN + VERSION + "maintainLog/select"
    },
    create: {
      default: GMS_DOMAIN + VERSION + "maintainLog/create",
    }
  },
  region: {
    select: {
      byUsername: GMS_DOMAIN + VERSION + "region/select/byUsername",
      idsByUsername: GMS_DOMAIN + VERSION + "region/select/idsByUsername",
      byParentId: GMS_DOMAIN + VERSION + "region/select/byParentId",
      byChildId: GMS_DOMAIN + VERSION + "region/select/byChildId",
      idsByChildId: GMS_DOMAIN + VERSION + "region/select/idsByChildId",
      parentIdsByUsername: GMS_DOMAIN + VERSION + "region/select/parentIdsByUsername"
    },
    unrelateAll: GMS_DOMAIN + VERSION + "region/unrelateAll",
    relateUser: GMS_DOMAIN + VERSION + "region/relateUser"
  },
};
