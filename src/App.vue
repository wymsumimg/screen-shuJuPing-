<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<style>
@import './assets/css/main.css';
@import './assets/css/color-dark.css'; /*深色主题*/
/*@import "./assets/css/theme-green/color-green.css";   浅绿色主题*/
</style>

<script>
//如果keeplogin==false 当前页面关闭的时候清除缓存 login_staus
import { GetVerion } from './api/api';
export default {
    errorCaptured() {},
    data() {
        return {
            version: 9
        };
    },
    mounted() {
        this.shuaxinTime = setInterval(() => {
            GetVerion({}).then((res) => {
                const { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    if (this.version != res.Data) {
                        this.$router.go(0);
                    }
                }
            });
        }, 30000);

        // if (localStorage.getItem('keepLogin') == false) {
        //     let beginTime = 0; //开始时间
        //     let differTime = 0; //时间差
        //     window.onunload = function () {
        //         differTime = new Date().getTime() - beginTime;
        //         if (differTime <= 5) {
        //             localStorage.removeItem('login_staus');
        //             // localStorage.removeItem('comp_id');

        //             // localStorage.clear();
        //         }
        //     };
        //     window.onbeforeunload = function () {
        //         beginTime = new Date().getTime();
        //     };
        // }

        if (localStorage.getItem('lang') == 'ch') {
            this.$i18n.locale = 'ch';
        } else if (localStorage.getItem('lang') == 'jp') {
            this.$i18n.locale = 'jp';
        } else if (localStorage.getItem('lang') == 'en') {
            this.$i18n.locale = 'en';
        }
    },
    created() {},
    methods: {},
    destroyed() {
        if (this.shuaxinTime) {
            clearInterval(this.shuaxinTime);
        }
    }
};
</script>
<style >
/* 滚动条 */
::-webkit-scrollbar {
    width: 4px;
    height: 4px;
}
/* 垂直滚动条的滑动块 */
::-webkit-scrollbar-thumb:vertical {
    background-color: #afadad;
}
::-webkit-scrollbar-thumb:horizontal {
    height: 4px;
    background-color: #afadad;
}
</style>