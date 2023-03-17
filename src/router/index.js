import Vue from 'vue';
import Router from 'vue-router';

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '文件' },
            children: [
                {
                    path: '/index',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/index.vue'),
                    meta: { title: '主页' }
                },
                {
                    path: '/detailPage',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/detailPage.vue'),
                    meta: { title: '表格' }
                },
                {
                    path: '/detailBing',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/detailBing.vue'),
                    meta: { title: '车间' }
                },
                {
                    path: '/statistical',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/statistical.vue'),
                    meta: { title: '统计' }
                },
                {
                    path: '/statistical_2',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/statistical_2.vue'),
                    meta: { title: '统计' }
                },
                {
                    path: '/statistical1',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/statistical1.vue'),
                    meta: { title: '统计' }
                },
                {
                    path: '/report',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/report.vue'),
                    meta: { title: '报表' }
                },
                {
                    path: '/report_2',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/report_2.vue'),
                    meta: { title: '报表' }
                },
                {
                    path: '/report1',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/report1.vue'),
                    meta: { title: '报表' }
                },
                {
                    path: '/statusUp',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/statusUp.vue'),
                    meta: { title: '状态上报' }
                },
                {
                    path: '/statusUp_2',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/statusUp_2.vue'),
                    meta: { title: '状态上报' }
                },
                {
                    path: '/statusShi',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/statusShi.vue'),
                    meta: { title: '实时状态' }
                },
                {
                    path: '/statusShi_2',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/statusShi_2.vue'),
                    meta: { title: '实时状态' }
                },

                // {
                //     path: '/index',
                //     component: () => import(/* webpackChunkName: "index" */ '../components/page/VideoList.vue'),
                // },
                // {
                //     path: '/VideoDetail',
                //     name:"VideoDetail",
                //     component: () => import(/* webpackChunkName: "index" */ '../components/page/VideoDetail.vue'),
                // },

                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '/login_2',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login_2.vue'),
            meta: { title: '登录' }
        },
        {
            path: '/bigData',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/bigData.vue'),
            meta: { title: '登录' }
        },
        {
            path: '/location',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/location.vue'),
            meta: { title: '数据综合' }
        },
        {
            path: '/digitalFactory',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/digitalFactory.vue'),
            meta: { title: '数字工厂' }
        },

        {
            path: '*',
            redirect: '/404'
        }
    ]
});
