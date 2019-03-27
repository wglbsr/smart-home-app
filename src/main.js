// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
// import VueRouter from 'vue-router'
import App from './App'
// import VueScroller from 'vue-scroller'
import './assets/style/iconfont.css'
import './assets/style/globle.css'
import api_v1 from "./assets/api/v1.js"
import axios from './assets/utils/http.js'
import router from './router/index.js'
import  { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)
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
