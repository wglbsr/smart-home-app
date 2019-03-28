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


//路由拦截
router.beforeEach((to, from, next) => {
    if (to.path === '/Login') {
        next();
    } else {
        if (!localStorage.getItem('auth_token')) {
            next({path: '/Login'})
        } else {
            next();
        }
    }
});


export default router;