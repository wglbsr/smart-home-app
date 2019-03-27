// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import VueResource from 'vue-resource'
import VueScroller from 'vue-scroller'
import './assets/style/iconfont.css'

import {
  Actionsheet, XInput, XButton, Grid, GridItem, XTable, LoadMore, Icon, XCircle, Group, PopupRadio, Flexbox,
  XImg, Alert, Toast, XDialog, ButtonTab, Tabbar, TabbarItem, Divider, Confirm, Cell, Picker, PopupPicker, XSwitch,
  ButtonTabItem, XHeader, ViewBox, Loading, LoadingPlugin, ToastPlugin, ConfirmPlugin, Datetime, FlexboxItem,
  Radio, XTextarea, Selector, Checker, CheckerItem
} from 'vux'

Vue.component('view-box', ViewBox);
Vue.component('actionsheet', Actionsheet);
Vue.component('x-input', XInput);
Vue.component('x-button', XButton);
Vue.component('grid', Grid);
Vue.component('grid-item', GridItem);
Vue.component('x-table', XTable);
Vue.component('x-img', XImg);
Vue.component('alert', Alert);
Vue.component('toast', Toast);
Vue.component('x-dialog', XDialog);
Vue.component('button-tab', ButtonTab);
Vue.component('button-tab-item', ButtonTabItem);
Vue.component('tabbar', Tabbar);
Vue.component('tabbar-item', TabbarItem);
Vue.component('x-header', XHeader);
Vue.component('toast', Toast);
Vue.component('loading', Loading);
Vue.component('loadMore', LoadMore);
Vue.component('divider', Divider);
Vue.component('confirm', Confirm);
Vue.component('icon', Icon);
Vue.component('x-circle', XCircle);
Vue.component('cell', Cell);
Vue.component('group', Group);
Vue.component('datetime', Datetime);
Vue.component('picker', Picker);
Vue.component('popup-radio', PopupRadio);
Vue.component('popup-picker', PopupPicker);
Vue.component('flexbox', Flexbox);
Vue.component('flexbox-item', FlexboxItem);
Vue.component('x-switch', XSwitch);
Vue.component('radio', Radio);
Vue.component('x-textarea', XTextarea);
Vue.component('selector', Selector);
Vue.component('checker', Checker);
Vue.component('checker-item', CheckerItem);

//x-textarea
//popup-picker

import Home from './view/Home'
import API_DYNY from "./DYNY_GMS_API.vue"
import api_v2 from "./assets/api/v2.js"

import './assets/style/globle.css'
Vue.prototype.API_V2 = api_v2;
Vue.prototype.API_DYNY = API_DYNY;
//油机
const generatorTable = r => require.ensure([], () => r(require('./view/generator/generatorTable.vue')), 'generatorTable');
const generatorLocations = r => require.ensure([], () => r(require('./view/generator/generatorLocations.vue')), 'generatorLocations');
const generatorStatus = r => require.ensure([], () => r(require('./view/generator/generatorStatus.vue')), 'generatorStatus');
const generatorInfo = r => require.ensure([], () => r(require('./view/generator/generatorInfo.vue')), 'generatorInfo');
const maintainLogCreate = r => require.ensure([], () => r(require('./view/generator/maintainLogCreate.vue')), 'maintainLogCreate');
const GeneratorModeSwitch = r => require.ensure([], () => r(require('./view/generator/coms/GeneratorModeSwitch.vue')), 'GeneratorModeSwitch');

//入口
const Login = r => require.ensure([], () => r(require('./view/Login.vue')), 'generator/');
const Index = r => require.ensure([], () => r(require('./components/Index.vue')), 'Index');
//记录表
const fuelTable = r => require.ensure([], () => r(require('./view/record/fuelTable.vue')), 'fuelTable');
const generateTable = r => require.ensure([], () => r(require('./view/record/generateTable.vue')), 'generateTable');
const alarmTable = r => require.ensure([], () => r(require('./view/record/alarmTable.vue')), 'alarmTable');
const maintainTable = r => require.ensure([], () => r(require('./view/record/maintainTable.vue')), 'maintainTable');

//用户
const myInfo = r => require.ensure([], () => r(require('./view/user/myInfo.vue')), 'myInfo');
const changePassword = r => require.ensure([], () => r(require('./view/user/changePassword.vue')), 'changePassword');
const customerTable = r => require.ensure([], () => r(require('./view/user/customerTable.vue')), 'customerTable');
const userTable = r => require.ensure([], () => r(require('./view/user/userTable.vue')), 'userTable');
const contactTable = r => require.ensure([], () => r(require('./view/user/contactTable.vue')), 'contactTable');


//单位相关
const unitTable = r => require.ensure([], () => r(require('./view/unit/unitTable.vue')), 'unitTable');

//基站
const stationTable = r => require.ensure([], () => r(require('./view/station/stationTable.vue')), 'stationTable');
const stationInfo = r => require.ensure([], () => r(require('./view/station/stationInfo.vue')), 'stationInfo');
const GeneratorTableForStation = r => require.ensure([], () => r(require('./view/station/GeneratorTableForStation.vue')), 'GeneratorTableForStation');


//fuelTable
//generatorInfo
/*****!!!!!!******打包需要改为 false*********!!!!********/
let dev_mode = false;
if (process.env.NODE_ENV == "development") {
  dev_mode = true;
}
/*****!!!!!!******打包需要改为 false*********!!!!********/

if (dev_mode) {
  Vue.use(VueRouter);
  Vue.use(VueResource);
}
Vue.use(VueScroller);
Vue.use(LoadingPlugin);
Vue.use(ToastPlugin);
Vue.use(ConfirmPlugin);

// }
Vue.filter('keepHowManyNum', function (hours, keppNum) {
  if (isNaN(hours) || !hours) {
    hours = 0;
  }
  if (!keppNum) {
    keppNum = 1;
  }
  let temp = Math.pow(10, keppNum);
  let result = Math.round(Number(hours) * temp) / temp;
  return result;
});

Vue.filter('timestampToTime', function (timestamp, onlyTime) {
  let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let year = date.getFullYear() + '-';
  let month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let day = date.getDate();
  let hours = date.getHours();
  hours = hours > 9 ? hours : "0" + hours;
  let min = date.getMinutes();
  min = min > 9 ? min : "0" + min;
  let second = date.getSeconds();
  let finalTime = "";
  if (onlyTime) {
    return hours + ':' + min;
  } else {
    return year + month + day + ' ' + hours + ':' + min + ":" + second;
  }
});

Vue.filter('translateCurrent', function (current) {
  let translatedCurrent = ((100 * Math.abs(current - 2.5)) / 0.625) - 3.2;
  let finalCurrent = translatedCurrent >= 100 || translatedCurrent <= 0 ? 0 : translatedCurrent;
  return finalCurrent;
});
const routes = [
  {
    path: '/',
    component: Home,
    meta: {
      title: '油机管理系统'
    },
    children: [
      {
        path: '/generatorTable',
        name: 'generatorTable',
        component: generatorTable,
        meta: {
          title: '油机列表'
        }
      },
      {
        path: '/generatorStatus',
        name: 'generatorStatus',
        component: generatorStatus,
        meta: {
          title: '油机详情'
        }
      },
      {
        path: '/generatorStatus/maintainLogCreate',
        name: 'maintainLogCreate',
        component: maintainLogCreate,
        meta: {
          title: '保养记录'
        }
      }, {
        path: '/Index',
        name: 'Index',
        component: Index,
        meta: {
          title: '首页'
        }
      }, {
        path: '/generateTable',
        name: 'generateTable',
        component: generateTable,
        meta: {
          title: '发电记录'
        }
      }, {
        path: '/fuelTable',
        name: 'fuelTable',
        component: fuelTable,
        meta: {
          title: '油量记录'
        }
      }, {
        path: '/stationTable',
        name: 'stationTable',
        component: stationTable,
        meta: {
          title: '基站列表'
        }
      }, {
        path: '/maintainTable',
        name: 'maintainTable',
        component: maintainTable,
        meta: {
          title: '保养记录'
        }
      }, {
        path: '/stationInfo',
        name: 'stationInfo',
        component: stationInfo,
        meta: {
          title: '基站详情'
        }
      }, {
        path: '/alarmTable',
        name: 'alarmTable',
        component: alarmTable,
        meta: {
          title: '告警记录'
        }
      }, {
        path: '/customerTable',
        name: 'customerTable',
        component: customerTable,
        meta: {
          title: '客户列表'
        }
      }, {
        path: '/userTable',
        name: 'userTable',
        component: userTable,
        meta: {
          title: '用户列表'
        }
      }, {
        path: '/contactTable',
        name: 'contactTable',
        component: contactTable,
        meta: {
          title: '联系人列表'
        }
      }, {
        path: '/unitTable',
        name: 'unitTable',
        component: unitTable,
        meta: {
          title: '单位列表'
        }
      }, {
        path: '/generatorLocations',
        name: 'generatorLocations',
        component: generatorLocations,
        meta: {
          title: '全站地图'
        }
      }, {
        path: '/GeneratorTableForStation',
        name: 'GeneratorTableForStation',
        component: GeneratorTableForStation,
        meta: {
          title: '关联油机'
        }
      }, {
        path: '/GeneratorModeSwitch',
        name: 'GeneratorModeSwitch',
        component: GeneratorModeSwitch,
        meta: {
          title: '模式切换'
        }
      },
      {
        path: '/myInfo',
        name: 'myInfo',
        component: myInfo,
        meta: {
          title: '个人信息'
        }
      }, {
        path: '/changePassword',
        name: 'changePassword',
        component: changePassword,
        meta: {
          title: '修改密码'
        }
      }, {
        path: '/generatorInfo',
        name: 'generatorInfo',
        component: generatorInfo,
        meta: {
          title: '油机信息'
        }
      },


      //generatorLocations
    ],
  },
  {
    path: '/Login',
    component: Login
  },


];

const router = new VueRouter({
  routes
});
router.beforeEach((to, from, next) => {
  //to即将进入的目标路由对象，from当前导航正要离开的路由， next : 下一步执行的函数钩子
  if (to.path === '/Login') {
    next()
  } // 如果即将进入登录路由，则直接放行
  else {   //进入的不是登录路由
    if (!sessionStorage.getItem('user')) {
      next({path: '/Login'})
    }
    //下一跳路由需要登录验证，并且还未登录，则路由定向到 登录路由
    else {
      next()
    }
  }
  //如果不需要登录验证，或者已经登录成功，则直接放行
});

/**
 * 拦截器
 */
Vue.http.interceptors.push((request, next) => {
  let customerNo = sessionStorage.getItem("customerNo");
  let username = sessionStorage.getItem("user");
  let userLevel = sessionStorage.getItem("userLevel");
  if (!request.body.customerNo) {
    request.body.customerNo = customerNo;
  }
  next((response) => {
    return response;
  });
});

FastClick.attach(document.body);

Vue.config.productionTip = false;

/* eslint-disable no-new */
console.log("dev_mode:"+dev_mode);
if (!dev_mode) {
  document.addEventListener('deviceready', function () {
    new Vue({
      el: '#app',
      router,
      store,
      template: '<App/>',
      components: {App}
    });
    window.navigator.splashscreen.hide()
  }, false);
}


new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box');
