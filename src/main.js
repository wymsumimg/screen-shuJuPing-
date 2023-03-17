import 'babel-polyfill';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
// 导入Element-UI 语言包
import jaLocale from 'element-ui/lib/locale/lang/ja';
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';
import enLocale from 'element-ui/lib/locale/lang/en';

import store from '@/store';
import moment from 'moment';
Vue.prototype.$moment = moment;

//切换主题
import './assets/css/theme/6672FB/index.css';

import './assets/css/icon.css';

import './components/common/flex.scss';
import './components/common/common.scss';

import './components/common/bigDataClass.scss';

import './components/common/location.scss';
import './components/common/digitalFactory.scss';

import '@/assets/font/font.css';

// 第一种全路径发送请求
import axios from 'axios';
Vue.prototype.$axios = axios;
// 第二种封装在全局

// import errorLog from './utils/error-log' // 系统错误捕获，一些日志记录
// Vue.use(errorLog)

Vue.prototype.openLoading = function () {
    const loading = this.$loading({
        // 声明一个loading对象
        lock: true, // 是否锁屏
        text: 'loading...', // 加载动画的文字
        spinner: 'el-icon-loading', // 引入的loading图标
        background: 'rgba(0, 0, 0, 0.3)', // 背景颜色
        target: '.sub-main', // 需要遮罩的区域
        body: true,
        customClass: 'mask' // 遮罩层新增类名
    });
    // setTimeout(function () {                  // 设定定时器，超时5S后自动关闭遮罩层，避免请求失败时，遮罩层一直存在的问题
    //   loading.close();                        // 关闭遮罩层
    // },5000)
    return loading;
};

// webSocket

import resizeFont from './components/common/gloableResize';
Vue.prototype.$resizeFont = resizeFont;

// rem h5 适配
// import 'amfe-flexible';

import proportion from 'vue-proportion-directive';

Vue.use(proportion);

// 时间过滤器
Vue.filter('noValue', function (val) {
    if (val == '') {
        return '-';
    } else if (val == null) {
        return '-';
    } else if (val == '00:00:00') {
        return '-';
    } else {
        return val;
    }
});

Vue.filter('times', function (totalsecond) {
    if (totalsecond > 0) {
        var d = 3599.9583333;
        var m = 59.999305;

        var day = parseInt(totalsecond / d / 24);
        var H = parseInt(parseInt(totalsecond - day * d * 24) / d);
        var M = parseInt(parseInt(totalsecond - day * d * 24 - H * d) / m);
        var s = parseInt(totalsecond - Math.abs(Math.round(day * d * 24 + H * d + M * m)));

        let hh = H < 10 ? '0' + H : H;
        let mm = M < 10 ? '0' + M : M;
        let ss = s < 10 ? '0' + s : s;

        return (day > 0 ? day + '天' : '') + hh + ':' + mm + ':' + ss;
    } else {
        return '00:00:00'
    }
});

Vue.config.productionTip = false;
// 翻译
Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: 'ch',
    messages: {
        ch: Object.assign(require('./assets/language/zh.js'), zhLocale),
        jp: Object.assign(require('./assets/language/jp.js'), jaLocale),
        en: Object.assign(require('./assets/language/en.js'), enLocale)
    }
});

Vue.use(ElementUI, {
    size: 'small',
    i18n: (key, value) => i18n.t(key, value)
});

import global from './components/common/global';
Vue.prototype.$global = global;

//  this.$store.state.login_staus
if (localStorage.getItem('login_staus') == 3) {
    import('@/components/common/checkCss3.scss');
} else if (localStorage.getItem('login_staus') == 2) {
    import('@/components/common/checkCss2.scss');
} else {
    import('@/components/common/checkCss1.scss');
}

import Title from './components/page/component/titleTime.vue';
Vue.component('titleTime', Title);

import Login from './components/page/component/setLogin.vue';
Vue.component('setLogin', Login);

import Chejian from './components/page/component/chejian.vue';
Vue.component('cheJian', Chejian);

import BanCi from './components/page/component/banci.vue';
Vue.component('banci', BanCi);

// timeInput
import timeInput from './components/page/component/timeInput.vue';
Vue.component('timeInput', timeInput);

import mingxi from './components/page/component/mingxi.vue';
Vue.component('mingxi', mingxi);


//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    const role = localStorage.getItem('shangBaoName');
    if (!role && to.path !== '/login') {
        if (to.path == '/bigData' || to.path == '/bigdata' || to.path == '/location' || to.path == '/digitalFactory') {
            next();
        } else if (to.path == '/login_2') {
            next();
        } else {
            next('/login');
        }
    } else {
        next();
    }
});

new Vue({
    router,
    i18n,
    store,
    // vns,
    render: h => h(App)
}).$mount('#app');
