import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/view/Login.vue'
import Home from '@/view/Home.vue'

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            // component: () => require('@/view/Home.vue'),
            component: Home,

        },
        {
            path: '/Login',
            name: 'Login',
            component: Login,
        }

    ]
});

router.beforeEach((to, from, next) => {
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


export default router;