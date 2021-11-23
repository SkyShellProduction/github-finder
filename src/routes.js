//default
import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

//pages

import Home from './pages/Home.vue';
import NotFound from './pages/404.vue';
export default new Router({
    mode: 'history', //без хэша
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '*',
            name: '404',
            component: NotFound
        },
    ]
})