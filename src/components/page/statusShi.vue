<template>
    <div class="detailBing" style="height: auto">
        <div class="homePageTitle" flex="cross:center main:justify">
            <div>
                <div flex="cross:center ">
                    <comp-logo :comp_id="comp_id"></comp-logo>
                    <title-check :num="checkNum"></title-check>

                    <div class="titleSearch">
                        <el-input v-model="SearchValue" clearable :placeholder="$t('menu.qingshurushebeibianhao')" @change="changeSearch">
                        </el-input>
                        <!-- <span class="el-icon-search jiqiIcon"></span> -->
                    </div>
                    <div class="allStatusClass" style="margin: 0 0 0 20px">
                        <!-- <el-select
                            v-model="allCheJian"
                            @change="selectChange"
                            clearable
                            :popper-append-to-body="false"
                            placeholder="全部车间"
                        >
                            <el-option v-for="item in cheJianHao" :key="item.room" :label="item.room+'号车间'" :value="item.room">
                            </el-option>
                        </el-select> -->
                        <cheJian :allCheJian="allCheJian" @childChejian="parentChejian"></cheJian>
                    </div>

                    <div>
                        <button class="chooseBtn" style="margin: 0 0 0 20px" @click="chooseSearch()">{{ $t('menu.search') }}</button>
                    </div>
                    <div class="checked" style="margin-top: 0.15rem">
                        <el-checkbox v-model="checkedLiXian" @change="yincangLiXian">{{ $t('menu.yincanglixianshebei') }}</el-checkbox>
                    </div>
                </div>
            </div>
            <div style="margin-right: 0.1rem">
                <set-login @showmiao="showmiao"></set-login>
            </div>
        </div>

        <div class="statisticalBody" v-if="weicha" style="min-height: 9rem" v-loading="loading" element-loading-background="transparent">
            <div class="ssJinJi statusss">
                <ul flex flex-wrap element-loading-spinner="el-icon-loading" element-loading-background="#182039">
                    <li v-for="(item, index) in zheXianArr" :key="index">
                        <div class="ss_dott" :class="[$global.statusColorbg[item.RunStatus]]"></div>
                        <div class="ss_topTitle" flex="main:justify">
                            <span class="ss_topTitle_left" @click="getmingxi1(item)">{{ item.Room }}-{{ item.DeviceName }}#</span>
                            <span class="ss_topTitle_right"
                                >{{ $t('menu.zhuangtai') }}：<span class="daiji" :class="[$global.statusColor[item.RunStatus]]">{{
                                    $global.status[item.RunStatus]
                                }}</span></span
                            >
                        </div>
                        <div class="statusLi">
                            <div class="ss_content_top" flex>
                                <div class="ss_c_t" flex="dir:top cross:bottom">
                                    <div class="ss_t_l" flex="cross:center">
                                        <div class="ss_text">{{ $t('menu.zhuzhouzhuanshu') }}</div>
                                        <div class="ss_kaung">{{ item.SpindleSpeed }}</div>
                                    </div>
                                    <div class="ss_t_l" flex="cross:center">
                                        <div class="ss_text">{{ $t('menu.zhuzhoubeilv') }}</div>
                                        <div class="ss_kaung ss_cheng">{{ item.SpindleOverride }}%</div>
                                    </div>
                                    <div class="ss_t_l" flex="cross:center">
                                        <div class="ss_text">{{ $t('menu.jiagongjijian') }}</div>
                                        <div class="ss_kaung">{{ item.PartsCount }}</div>
                                    </div>
                                    <div class="ss_t_l" flex="cross:center" v-if="comp_id == 1">
                                        <div class="ss_text">{{ $t('menu.haoneng') }}</div>
                                        <div class="ss_kaung">{{ item.power ? (item.power == -1 ? item.power + 'kW' : 0) : '-' }}</div>
                                    </div>
                                </div>
                                <div class="ss_c_r" flex="dir:top cross:top">
                                    <div class="ss_t_l" flex="cross:center">
                                        <div class="ss_text">{{ $t('menu.jingeisudu') }}</div>
                                        <div class="ss_kaung">{{ item.Feedrate }}</div>
                                    </div>
                                    <div class="ss_t_l" flex="cross:center">
                                        <div class="ss_text">{{ $t('menu.feedRate') }}</div>
                                        <div class="ss_kaung ss_hong">{{ item.FeedrateOverride }}%</div>
                                    </div>
                                    <div class="ss_t_l" flex="cross:center">
                                        <div class="ss_text">{{ $t('menu.xunhuanshijian') }}</div>
                                        <div class="ss_kaung">{{ Math.round(item.CircalTime / 60) }}min</div>
                                    </div>
                                    <div class="ss_t_l" flex="cross:center" v-if="comp_id == 1">
                                        <div class="ss_text" style="margin-left: 0.42rem">{{ $t('menu.shui') }}</div>
                                        <div class="ss_kaung">{{ item.water ? (item.water == -1 ? item.water : 0) : '-' }}</div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="ss_t_l" flex="cross:center" style="margin-left: 0.35rem">
                                    <div class="ss_text">{{ $t('menu.zhixingyuju') }}</div>
                                    <el-tooltip :content="item.RunCode | noValue" placement="top">
                                        <div class="ss_kaung shenglue" style="width: 2.88rem">
                                            {{ item.RunCode }}
                                        </div>
                                    </el-tooltip>
                                </div>
                                <div class="ss_t_l" flex="cross:center" style="margin-left: 0.35rem">
                                    <div class="ss_text">{{ $t('menu.zhixinghanghao') }}</div>
                                    <div class="ss_kaung" style="width: 2.88rem">{{ item.RunLine }}</div>
                                </div>
                            </div>
                            <div class="ss_content_bottom" flex>
                                <div class="ss_b_li">X：{{ item.RelX }}</div>
                                <div class="ss_b_li">Y：{{ item.RelY }}</div>
                                <div class="ss_b_li">Z：{{ item.RelZ }}</div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="statisticalBody" v-if="!weicha" style="min-height: 9rem" v-loading="loading" element-loading-background="transparent">
            <div class="ssJinJi statusss">
                <ul flex flex-wrap element-loading-spinner="el-icon-loading" element-loading-background="#182039">
                    <li v-for="(item, index) in arr1" :key="index">
                        <div class="ss_dott" :class="[$global.statusColorbg[item.RunStatus]]"></div>
                        <div class="ss_topTitle" flex="main:justify">
                            <span class="ss_topTitle_left" @click="getmingxi1(item)">{{ item.Room }}#{{ item.DeviceName }}</span>
                            <span class="ss_topTitle_right"
                                >{{ $t('menu.zhuangtai') }}：<span class="daiji" :class="[$global.statusColor[item.RunStatus]]">{{
                                    $global.status[item.RunStatus]
                                }}</span></span
                            >
                        </div>
                        <div class="statusLi">
                            <div class="ss_content_top" flex>
                                <div class="ss_c_t" flex="dir:top cross:bottom">
                                    <div class="ss_t_l" flex="cross:center">
                                        <div class="ss_text">{{ $t('menu.zhuzhouzhuanshu') }}</div>
                                        <div class="ss_kaung">{{ item.SpindleSpeed }}</div>
                                    </div>
                                    <div class="ss_t_l" flex="cross:center">
                                        <div class="ss_text">{{ $t('menu.zhuzhoubeilv') }}</div>
                                        <div class="ss_kaung ss_cheng">{{ item.SpindleOverride }}%</div>
                                    </div>
                                    <div class="ss_t_l" flex="cross:center">
                                        <div class="ss_text">{{ $t('menu.jiagongjijian') }}</div>
                                        <div class="ss_kaung">{{ item.PartsCount }}</div>
                                    </div>
                                    <div class="ss_t_l" flex="cross:center" v-if="comp_id == 1">
                                        <div class="ss_text">{{ $t('menu.haoneng') }}</div>
                                        <div class="ss_kaung">{{ item.power ? (item.power == -1 ? item.power + 'kW' : 0) : '-' }}</div>
                                    </div>
                                </div>
                                <div class="ss_c_r" flex="dir:top cross:top">
                                    <div class="ss_t_l" flex="cross:center">
                                        <div class="ss_text">{{ $t('menu.jingeisudu') }}</div>
                                        <div class="ss_kaung">{{ item.Feedrate }}</div>
                                    </div>
                                    <div class="ss_t_l" flex="cross:center">
                                        <div class="ss_text">{{ $t('menu.feedRate') }}</div>
                                        <div class="ss_kaung ss_hong">{{ item.FeedrateOverride }}%</div>
                                    </div>
                                    <div class="ss_t_l" flex="cross:center">
                                        <div class="ss_text">{{ $t('menu.xunhuanshijian') }}</div>
                                        <div class="ss_kaung">{{ Math.round(item.CircalTime / 60) }}min</div>
                                    </div>
                                    <div class="ss_t_l" flex="cross:center" v-if="comp_id == 1">
                                        <div class="ss_text" style="margin-left: 0.42rem">{{ $t('menu.shui') }}</div>
                                        <div class="ss_kaung">{{ item.water ? (item.water == -1 ? item.water : 0) : '-' }}</div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="ss_t_l" flex="cross:center" style="margin-left: 0.35rem">
                                    <div class="ss_text">{{ $t('menu.zhixingyuju') }}</div>
                                    <el-tooltip :content="item.RunCode | noValue" placement="top">
                                        <div class="ss_kaung shenglue" style="width: 2.88rem">
                                            {{ item.RunCode }}
                                        </div>
                                    </el-tooltip>
                                </div>
                                <div class="ss_t_l" flex="cross:center" style="margin-left: 0.35rem">
                                    <div class="ss_text">{{ $t('menu.zhixinghanghao') }}</div>
                                    <div class="ss_kaung" style="width: 2.88rem">{{ item.RunLine }}</div>
                                </div>
                            </div>
                            <div class="ss_content_bottom" flex>
                                <div class="ss_b_li">X：{{ item.RelX }}</div>
                                <div class="ss_b_li">Y：{{ item.RelY }}</div>
                                <div class="ss_b_li">Z：{{ item.RelZ }}</div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <mingxi
            ref="mingxiChild"
            :filtersZT="$global.filtersZT"
            :begintime="begintime"
            :endtime="endtime"
            :statusColor="$global.statusColor"
            :status="$global.status"
            :miao="miao"
        ></mingxi>
    </div>
</template>

<script>
import { TokenKeys } from '@/utils/variable';
import domainsFuc from '@/api/domains';
import { get_number_ave_time, query_device_room } from '../../api/api';
import titleCheck from './component/titleCheck.vue';
import { getTime, time_to_sec, yestodayTimeFun, sortByKey } from '../../utils/index';
import compLogo from './component/compLogo.vue';
import '../common/loginStatus';
import mingxi from './component/mingxi.vue';
export default {
    components: { compLogo, titleCheck, mingxi },
    data() {
        return {
            num: 0,
            comp_id: 0,
            checkNum: 6,
            zheXianArr: [],
            loading: false,
            zhanweiColor: true,
            dateValue: '',
            begintime: '',
            endtime: '',
            focus: true,

            socket: '',
            SearchValue: '',
            weicha: true,
            arr1: [],
            checkedLiXian: false,
            allCheJian: '',
            cheJianHao: [],
            domainsUrl: '',
            wses: '',
            miao: true,
            bianHao: [
                { id: 1, xuhao: '01', code: '639CNZYD' },
                { id: 2, xuhao: '02', code: '6B6962YD' },
                { id: 3, xuhao: '03', code: '7Q9MC6YD' },
                { id: 4, xuhao: '04', code: '84PQH2YD' },
                { id: 5, xuhao: '05', code: '72K6D5YD' },
                { id: 6, xuhao: '06', code: '936DWZYD' },
                { id: 7, xuhao: '07', code: 'MS282VYD' },
                { id: 8, xuhao: '08', code: '38XR49YD' },
                { id: 9, xuhao: '09', code: 'Z94P56YD' },
                { id: 10, xuhao: '10', code: '58TCW8YD' },
                { id: 11, xuhao: '11', code: '5FZQFBYD' },
                { id: 12, xuhao: '12', code: '76V9Z4YD' },
                { id: 13, xuhao: '13', code: 'C2W8X8YD' },
                { id: 14, xuhao: '14', code: '9T9HKMYD' },
                { id: 15, xuhao: '15', code: '358XYZYD' },
                { id: 16, xuhao: '16', code: '8SSC39YD' },
                { id: 17, xuhao: '17', code: '7DJ2EHYD' },
                { id: 18, xuhao: '18', code: 'P254S5YD' },
                { id: 19, xuhao: '19', code: '77YS5ZYD' },
                { id: 20, xuhao: '20', code: '772GZ9YD' },
                { id: 21, xuhao: '21', code: '59P759YD' },
                { id: 22, xuhao: '22', code: 'B6MUHDYD' },
                { id: 23, xuhao: '23', code: 'P5NZ5PYD' },
                { id: 24, xuhao: '24', code: '2T2QQ9YD' },
                { id: 25, xuhao: '25', code: '4UPZM6YD' },
                { id: 26, xuhao: '26', code: 'T2H682YD' },
                { id: 27, xuhao: '27', code: '5W8389YD' },
                { id: 28, xuhao: '28', code: '3BU394YD' },
                { id: 29, xuhao: '29', code: 'KF8G89YD' },
                { id: 30, xuhao: '30', code: '7EK649YD' }
            ],
            codeList: [
                '639CNZYD',
                '6B6962YD',
                '7Q9MC6YD',
                '84PQH2YD',
                '72K6D5YD',

                '936DWZYD',
                'MS282VYD',
                '38XR49YD',
                'Z94P56YD',
                '58TCW8YD',

                '5FZQFBYD',
                '76V9Z4YD',
                'C2W8X8YD',
                '9T9HKMYD',
                '358XYZYD',

                '8SSC39YD',
                '7DJ2EHYD',
                'P254S5YD',
                '77YS5ZYD',
                '772GZ9YD',

                '59P759YD',
                'B6MUHDYD',
                'P5NZ5PYD',
                '2T2QQ9YD',
                '4UPZM6YD',

                'T2H682YD',
                '5W8389YD',
                '3BU394YD',
                'KF8G89YD',
                '7EK649YD'
            ]
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.domainsUrl = domainsFuc(TokenKeys.PRODUCT_ENV).domain;
        // if (this.domainsUrl.substr(0, 21) == 'http://202.202.202.10') {
        //     // 赛豪私有
        //     this.wses = 'ws://202.202.202.10:9222';
        // } else if (this.domainsUrl.substr(0, 21) == 'http://192.168.0.216:') {
        //     // 精诚私有
        //     this.wses = 'ws://192.168.0.216:9222';
        // } else {
        //     // 正式
        //     this.wses = 'wss://data.wfjar.com:9222';
        // }
        this.wses = window.wssURL;
        if (localStorage.getItem('saveTime')) {
            this.begintime = JSON.parse(localStorage.getItem('saveTime')).begintime;
            this.endtime = JSON.parse(localStorage.getItem('saveTime')).endtime;
        } else {
            this.begintime = getTime().split(' ')[0] + ' 00:00:00';

            this.endtime = getTime().split(' ')[0] + ' 23:59:59';
        }

        this.miao = localStorage.getItem('getMiao') ? JSON.parse(localStorage.getItem('getMiao')) : true;

        this.comp_id = Number(localStorage.getItem('comp_id'));
        if (this.comp_id == 1) {
            // 精诚  能耗（保留2小数）  水  时间参数 取整 前半小时
            this.pawerWater();
        }

        this.comp_name1 = Number(localStorage.getItem('comp_name1'));
        // if (localStorage.getItem('allCheJian')) {
        //     this.allCheJian = localStorage.getItem('allCheJian');
        // }
        // this.getQuery_device_room();

        this.websocket();
        this.$resizeFont.resizeFont();
    },

    methods: {
        showmiao(val) {
            this.miao = val;
        },
        getmingxi1(row) {
            let filterObj = {
                RunStatus: ''
            };
            // this.rowMX = row;
            // this.filterChange(filterObj);
            this.$refs.mingxiChild.filterChange(filterObj, row);
        },
        pawerWater() {
            // 获取当前时间
            var currentTime = new Date().setDate(new Date().getDate()); // 获取当前时间
            let date = new Date(currentTime);
            let Y = date.getFullYear();
            let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
            let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
            let m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
            let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

            if (m > 30) {
                m = '30';
                s = '00';
            }
            if (m < 30) {
                m = '00';
                s = '00';
            }

            this.dateEnd = Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s;
            // 获取当前时间往前推--整半点数
            var currentTime1 = Number(new Date(this.dateEnd)) - 1000 * 60 * 30; //30分钟前
            this.dateStart = this.timestampToTime(currentTime1);
           
            this.list = [];
            this.$axios({
                method: 'POST',
                url: `http://192.168.0.220:5304/mgBoxHourData/getMgBoxHourDataList?startDate=${this.dateStart}&endDate=${this.dateEnd}`,
                data: this.codeList,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).then((res) => {
                if (res.data.code == '000000') {
                    if (res.data.data.length > 0) {
                        this.list = res.data.data;
                        for (let i = 0; i < this.bianHao.length; i++) {
                            for (let j = 0; j < this.list.length; j++) {
                                if (this.bianHao[i].code == this.list[j].boxNo) {
                                    this.list[j].xuhao = this.bianHao[i].xuhao;
                                }
                            }
                        }
                        console.log('====================================');
                        console.log(this.list);
                        console.log('====================================');
                    }
                }
            });
            // for (let i = 0; i < this.bianHao.length; i++) {
            //     this.$axios({
            //         method: 'POST',
            //         url: `http://192.168.0.220:5304/mgBoxHourData/getMgBoxHourDataList?startDate=${this.dateStart}&endDate=${this.dateEnd}`,
            //         data: [this.bianHao[i].code],
            //         headers: {
            //             'Content-Type': 'application/json; charset=utf-8'
            //         }
            //     }).then((res) => {
            //         if (res.data.code == '000000') {
            //             // 4-01
            //             if (res.data.data.length > 0) {
            //                 let params = {
            //                     xuhao: this.bianHao[i].xuhao,
            //                     power: res.data.data[0].power,
            //                     water: res.data.data[0].water
            //                 };
            //                 this.powerList.push(params);
            //             }
            //         }
            //     });
            // }
            // console.log('====================================');
            // console.log(this.powerList, 'this.powerList======');
            // console.log('====================================');

            // this.$axios({
            //     method: 'POST',
            //     url: `http://192.168.0.220:5304/mgBoxHourData/getMgBoxHourDataList?startDate=${this.dateStart}&endDate=${this.dateEnd}`,
            //     data: ['639CNZYD'],
            //     headers: {
            //         'Content-Type': 'application/json; charset=utf-8'
            //     }
            // }).then((res) => {
            //     if (res.data.code == '000000') {
            //         // 4-01
            //         if (res.data.data.length > 0) {
            //             this.power01 = res.data.data[0].power;
            //             this.water01 = res.data.data[0].water;

            //         }
            //     }
            // });
            // this.$axios({
            //     method: 'POST',
            //     url: `http://192.168.0.220:5304/mgBoxHourData/getMgBoxHourDataList?startDate=${this.dateStart}&endDate=${this.dateEnd}`,
            //     data: ['84PQH2YD'],
            //     headers: {
            //         'Content-Type': 'application/json; charset=utf-8'
            //     }
            // }).then((res) => {
            //     if (res.data.code == '000000') {
            //         // 4-04
            //         if (res.data.data.length > 0) {
            //             this.power04 = res.data.data[0].power;
            //             this.water04 = res.data.data[0].water;

            //         }
            //     }
            // });
            // this.$axios({
            //     method: 'POST',

            //     url: `http://39.171.77.207:5304/mgBoxHourData/getMgBoxHourDataList?startDate=${this.dateStart}&endDate=${this.dateEnd}`,
            //     data: ['72K6D5YD'],
            //     headers: {
            //         'Content-Type': 'application/json; charset=utf-8'
            //     }
            // }).then((res) => {
            //     if (res.data.code == '000000') {
            //         // 4-05
            //         if (res.data.data.length > 0) {
            //             this.power05 = res.data.data[0].power;
            //             this.water05 = res.data.data[0].water;
            //         }
            //     }
            // });
            // this.$axios({
            //     method: 'POST',

            //     url: `http://39.171.77.207:5304/mgBoxHourData/getMgBoxHourDataList?startDate=${this.dateStart}&endDate=${this.dateEnd}`,
            //     data: ['936DWZYD'],
            //     headers: {
            //         'Content-Type': 'application/json; charset=utf-8'
            //     }
            // }).then((res) => {
            //     if (res.data.code == '000000') {
            //         // 4-06
            //         if (res.data.data.length > 0) {
            //             this.power06 = res.data.data[0].power;
            //             this.water06 = res.data.data[0].water;
            //         }
            //     }
            // });
            // this.$axios({
            //     method: 'POST',

            //     url: `http://39.171.77.207:5304/mgBoxHourData/getMgBoxHourDataList?startDate=${this.dateStart}&endDate=${this.dateEnd}`,
            //     data: ['MS282VYD'],
            //     headers: {
            //         'Content-Type': 'application/json; charset=utf-8'
            //     }
            // }).then((res) => {
            //     if (res.data.code == '000000') {
            //         // 4-07
            //         if (res.data.data.length > 0) {
            //             this.power07 = res.data.data[0].power;
            //             this.water07 = res.data.data[0].water;
            //         }
            //     }
            // });
            // this.$axios({
            //     method: 'POST',

            //     url: `http://39.171.77.207:5304/mgBoxHourData/getMgBoxHourDataList?startDate=${this.dateStart}&endDate=${this.dateEnd}`,
            //     data: ['59P759YD'],
            //     headers: {
            //         'Content-Type': 'application/json; charset=utf-8'
            //     }
            // }).then((res) => {
            //     if (res.data.code == '000000') {
            //         // 4-21
            //         if (res.data.data.length > 0) {
            //             this.power21 = res.data.data[0].power;
            //             this.water21 = res.data.data[0].water;
            //         }
            //     }
            // });
            // this.$axios({
            //     method: 'POST',

            //     url: `http://39.171.77.207:5304/mgBoxHourData/getMgBoxHourDataList?startDate=${this.dateStart}&endDate=${this.dateEnd}`,
            //     data: ['2T2QQ9YD'],
            //     headers: {
            //         'Content-Type': 'application/json; charset=utf-8'
            //     }
            // }).then((res) => {
            //     if (res.data.code == '000000') {
            //         // 4-24
            //         if (res.data.data.length > 0) {
            //             this.power24 = res.data.data[0].power;
            //             this.water24 = res.data.data[0].water;
            //         }
            //     }
            // });
            // this.$axios({
            //     method: 'POST',

            //     url: `http://39.171.77.207:5304/mgBoxHourData/getMgBoxHourDataList?startDate=${this.dateStart}&endDate=${this.dateEnd}`,
            //     data: ['4UPZM6YD'],
            //     headers: {
            //         'Content-Type': 'application/json; charset=utf-8'
            //     }
            // }).then((res) => {
            //     if (res.data.code == '000000') {
            //         // 4-25
            //         if (res.data.data.length > 0) {
            //             this.power25 = res.data.data[0].power;
            //             this.water25 = res.data.data[0].water;
            //         }
            //     }
            // });
        },
        timestampToTime(timestamp) {
            var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
            var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
            var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

            return Y + M + D + h + m + s;
        },
        websocket() {
            // if (this.domainsUrl.substr(0, 21) == 'http://202.202.202.10') {
            //     // 赛豪私有
            //     let ws = new WebSocket('ws://202.202.202.10:9222');
            // }else if (this.domainsUrl.substr(0, 21) == 'http://192.168.0.216:') {
            //     // 精诚私有
            //     let ws = new WebSocket('ws://192.168.0.216:9222');
            // }else{
            //     // 正式
            //     let ws = new WebSocket('wss://data.wfjar.com:9222');
            // }
            let ws = new WebSocket(this.wses);

            ws.onopen = () => {
                // Web Socket 已连接上，使用 send() 方法发送数据
                ws.send('b-1&' + this.comp_name1);
                // console.log(this.$t('menu.shujufasongzhong'), 'b-1&' + this.comp_name1);
            };
            ws.onmessage = (msg) => {
                // console.log('数据已接收...')
                let oneArr = JSON.parse(msg.data);
                // console.log(oneArr);

                if (this.zheXianArr.length == 0) {
                    this.zheXianArr.push(oneArr);
                } else {
                    let flag = false;
                    for (let i = 0; i < this.zheXianArr.length; i++) {
                        if (this.zheXianArr[i].DeviceID == oneArr.DeviceID) {
                            // this.zheXianArr[i]=oneArr
                            this.zheXianArr[i].Room = oneArr.Room;
                            this.zheXianArr[i].Device = oneArr.Device;
                            this.zheXianArr[i].RunStatus = oneArr.RunStatus;
                            this.zheXianArr[i].SpindleSpeed = oneArr.SpindleSpeed;
                            this.zheXianArr[i].SpindleOverride = oneArr.SpindleOverride;
                            this.zheXianArr[i].PartsCount = oneArr.PartsCount;
                            this.zheXianArr[i].Feedrate = oneArr.Feedrate;
                            this.zheXianArr[i].FeedrateOverride = oneArr.FeedrateOverride;
                            this.zheXianArr[i].CircalTime = oneArr.CircalTime;
                            this.zheXianArr[i].RelX = oneArr.RelX;
                            this.zheXianArr[i].RelY = oneArr.RelY;
                            this.zheXianArr[i].RelZ = oneArr.RelZ;
                            this.zheXianArr[i].RunCode = oneArr.RunCode;
                            this.zheXianArr[i].RunLine = oneArr.RunLine;
                            flag = true;
                            break;
                        }
                    }
                    if (flag == false) {
                        this.zheXianArr.push(oneArr);
                        sortByKey(this.zheXianArr, 'Room');
                        let zheXianArr = this.zheXianArr;
                        let arr = Object.values(
                            zheXianArr.reduce((res, item) => {
                                res[item.Room] ? res[item.Room].push(item) : (res[item.Room] = [item]);
                                return res;
                            }, {})
                        );

                        for (let i = 0; i < arr.length; i++) {
                            for (let j = 0; j < arr[i].length; j++) {
                                sortByKey(arr[i], 'Device');
                            }
                        }

                        this.zheXianArr = arr.reduce(function (a, b) {
                            return a.concat(b);
                        });
                    }
                    this.chooseSearch();
                }
                if (this.comp_id == 1) {
                    for (let i = 0; i < this.zheXianArr.length; i++) {
                        for (let j = 0; j < this.list.length; j++) {
                            if (this.zheXianArr[i].Room == 4 && this.zheXianArr[i].DeviceName == this.list[j].xuhao) {
                                this.zheXianArr[i].power = this.list[j].power ? this.list[j].power.toFixed(2) : -1;
                                this.zheXianArr[i].water = this.list[j].water ? this.list[j].water : -1;
                            }
                        }

                        // if (this.zheXianArr[i].Room == 4 && this.zheXianArr[i].DeviceName == '04') {
                        //     this.zheXianArr[i].power = this.power04 ? this.power04.toFixed(2) : 0;
                        //     this.zheXianArr[i].water = this.water04 ? this.water04 : 0;
                        // }
                        // if (this.zheXianArr[i].Room == 4 && this.zheXianArr[i].DeviceName == '05') {
                        //     this.zheXianArr[i].power = this.power05 ? this.power05.toFixed(2) : 0;
                        //     this.zheXianArr[i].water = this.water05 ? this.water05 : 0;
                        // }
                        // if (this.zheXianArr[i].Room == 4 && this.zheXianArr[i].DeviceName == '06') {
                        //     this.zheXianArr[i].power = this.power06 ? this.power06.toFixed(2) : 0;
                        //     this.zheXianArr[i].water = this.water06 ? this.water06 : 0;
                        // }
                        // if (this.zheXianArr[i].Room == 4 && this.zheXianArr[i].DeviceName == '07') {
                        //     this.zheXianArr[i].power = this.power07 ? this.power07.toFixed(2) : 0;
                        //     this.zheXianArr[i].water = this.water07 ? this.water07 : 0;
                        // }
                        // if (this.zheXianArr[i].Room == 4 && this.zheXianArr[i].DeviceName == '21') {
                        //     this.zheXianArr[i].power = this.power21 ? this.power21.toFixed(2) : 0;
                        //     this.zheXianArr[i].water = this.water21 ? this.water21 : 0;
                        // }
                        // if (this.zheXianArr[i].Room == 4 && this.zheXianArr[i].DeviceName == '24') {
                        //     this.zheXianArr[i].power = this.power24 ? this.power24.toFixed(2) : 0;
                        //     this.zheXianArr[i].water = this.water24 ? this.water24 : 0;
                        // }
                        // if (this.zheXianArr[i].Room == 4 && this.zheXianArr[i].DeviceName == '25') {
                        //     this.zheXianArr[i].power = this.power25 ? this.power25.toFixed(2) : 0;
                        //     this.zheXianArr[i].water = this.water25 ? this.water25 : 0;
                        // }
                    }
                }
                // if(){

                // }
            };
            ws.onclose = function () {
                // 关闭 websocket
                // console.log('连接已关闭...');
            };
            // 路由跳转时结束websocket链接
            this.$router.afterEach(function () {
                ws.close();
            });
        },

        chooseSearch() {
            // console.log(this.SearchValue, 'this.SearchValue111');
            // console.log(this.allCheJian, 'this.allCheJian222');
            let arr1 = [];
            let arr2 = [];
            if (this.SearchValue == '' && this.allCheJian == '') {
                this.weicha = true;
            } else if (this.SearchValue == '' && this.allCheJian) {
                this.weicha = false;
                for (let i = 0; i < this.zheXianArr.length; i++) {
                    if (this.zheXianArr[i].Room == this.allCheJian) {
                        arr1.push(this.zheXianArr[i]);
                    }
                }
            } else if (this.SearchValue && this.allCheJian == '') {
                this.weicha = false;
                for (let i = 0; i < this.zheXianArr.length; i++) {
                    if (this.zheXianArr[i].Device == this.SearchValue) {
                        arr1.push(this.zheXianArr[i]);
                    }
                }
            } else if (this.SearchValue && this.allCheJian) {
                this.weicha = false;
                for (let i = 0; i < this.zheXianArr.length; i++) {
                    if (this.zheXianArr[i].Room == this.allCheJian) {
                        arr2.push(this.zheXianArr[i]);
                    }
                }
                for (let j = 0; j < arr2.length; j++) {
                    if (arr2[j].Device == Number(this.SearchValue)) {
                        arr1.push(arr2[j]);
                    }
                }
            }

            this.arr1 = arr1;
        },
        changeSearch() {
            // this.weicha = true;
        },

        yincangLiXian() {
            this.arr1 = [];
            if (this.checkedLiXian) {
                this.weicha = false;
                for (let i = 0; i < this.zheXianArr.length; i++) {
                    if (this.zheXianArr[i].RunStatus != -1) {
                        this.arr1.push(this.zheXianArr[i]);
                    }
                }
            } else {
                this.weicha = true;
                this.arr1 = this.zheXianArr;
            }
        },

        parentChejian(payload) {
            this.allCheJian = payload;
        }
    },
    created() {},

    beforeCreate() {},
    beforeMount() {},
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed() {},
    activated() {}
};
</script>
<style lang='scss'>
</style>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>