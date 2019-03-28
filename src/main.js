// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
// import VueScroller from 'vue-scroller'
import './assets/style/iconfont.css'
import './assets/style/globle.css'
import api_v1 from "./assets/api/v1.js"
import axios from './assets/utils/http.js'
import router from './router/index.js'

import {
    Actionsheet, XInput, XButton, Grid, GridItem, XTable, LoadMore, Icon, XCircle, Group, Flexbox,
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
Vue.component('popup-picker', PopupPicker);
Vue.component('flexbox', Flexbox);
Vue.component('flexbox-item', FlexboxItem);
Vue.component('x-switch', XSwitch);
Vue.component('radio', Radio);
Vue.component('x-textarea', XTextarea);
Vue.component('selector', Selector);
Vue.component('checker', Checker);
Vue.component('checker-item', CheckerItem);

Vue.use(ToastPlugin);
Vue.use(VueRouter);
Vue.prototype.api_v1 = api_v1;
Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/*****!!!!!!******打包需要改为 false*********!!!!********/
let dev_mode = false;
if (process.env.NODE_ENV == "development") {
    dev_mode = true;
}
/*****!!!!!!******打包需要改为 false*********!!!!********/
FastClick.attach(document.body);
if (!dev_mode) {
    document.addEventListener('deviceready', function () {
        new Vue({
            el: '#app',
            router,
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
