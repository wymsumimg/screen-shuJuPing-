<template>
    <div class="homePageIndex themeBg">
        <div class="homePageTitle" flex="cross:center main:justify">
            <div flex="cross:center ">
                <div class="DateChoose DateChooseSinglees leftJiaoData" style="margin-left: 20px" :class="{ zhanweiColor: zhanweiColor }">
                    <div class="leftJiao"></div>
                    <el-date-picker
                        @change="changetodayDate"
                        :clearable="false"
                        v-model="yestodayDate"
                        value-format="yyyy-MM-dd"
                        type="date"
                        placeholder="选择日期"
                    >
                    </el-date-picker>
                    <i class="el-icon-circle-close closeIcon" @click="cleartodayDate"></i>
                </div>

                <button class="chooseBtn" style="margin: 0 20px" @click="chooseSearch()">查询</button>
            </div>
            <div style="margin-right: 0.1rem">
            </div>
        </div>
        <div class="reportPageBody">
            <div class="br_left" style="width: 100%">
                <div class="zongSheBei zongSheBei1">
                    <div class="zsb_title ztitle">
                        <span class="zsb_text">总设备</span
                        ><span class="zsb_tai">（{{ this.Data.totalDevice ? this.Data.totalDevice : 0 }}台）</span>
                        <span class="zs_box"></span>
                    </div>
                    <div class="zsb_title cytitle">
                        <span class="zsb_text">参与生产设备</span>
                        <span class="cy_box"></span>
                    </div>
                    <div class="zsb_title wctitle">
                        <span class="zsb_text">未参与生产设备</span>
                        <span class="wc_box"></span>
                    </div>
                    <div class="zsbBody" flex="main:justify" flex-wrap>
                        <div class="zsbBodyOne bd">
                            <div class="zbo_title qus">
                                参与生产设备:<span class="zsb_tai1" style="color: #3d9aff"
                                    >{{ this.Data.totalRun ? this.Data.totalRun : 0 }}台</span
                                ><span style="float: right"
                                    >未参与生产设备:<span class="zsb_tai1" style="color: #3d9aff"
                                        >{{ this.Data.totalOffline ? this.Data.totalOffline : 0 }}台</span
                                    ></span
                                >
                            </div>
                            <div class="zbo_title qus" style="margin-top: 0.32rem">
                                <div flex="main:justify" style="margin: 0.16rem 0">
                                    <div>生产时长</div>
                                    <div>停止时长</div>
                                    <div>离线时长</div>
                                </div>
                                <div flex="main:justify" class="zsb_tai1" style="color: #3d9aff">
                                    <div style="width: 0.7rem; font-size: 0.2rem">
                                        {{ this.Data.runTime ? Number((this.Data.runTime / 3600).toString()).toFixed(1) : 0 }}h
                                    </div>
                                    <div style="width: 0.7rem; font-size: 0.2rem">
                                        {{ this.Data.stopTime ? Number((this.Data.stopTime / 3600).toString()).toFixed(1) : 0 }}h
                                    </div>
                                    <div style="width: 0.65rem; font-size: 0.2rem">
                                        {{ this.Data.offlineTime ? Number((this.Data.offlineTime / 3600).toString()).toFixed(1) : 0 }}h
                                    </div>
                                </div>
                            </div>
                            <div class="zbo_title qus" style="margin-top: 0.48rem">
                                <div class="cc">车间运行时长</div>
                                <div flex="main:justify" class="zbo_sj">
                                    <div>车间</div>
                                    <div>运行时长</div>
                                    <div>停止时间</div>
                                    <div>离线时间</div>
                                </div>

                                <div v-if="this.chejian.length > 0">
                                    <div class="zbo_sj" v-for="(item, index) in chejian" :key="index" flex="main:justify">
                                        <span class="cj_title">{{ item.room }}#</span>
                                        <span>{{ Number((item.run / 3600).toString()).toFixed(1) }}h</span>
                                        <span>{{ Number((item.stop / 3600).toString()).toFixed(1) }}h</span>
                                        <span style="width: 0.64rem">{{ Number((item.offline / 3600).toString()).toFixed(1) }}h</span>
                                    </div>
                                </div>
                                <div class="noData" flex="main:center cross:center" v-else style="height: 1.6rem; border-radius: 8px">
                                    暂无数据
                                </div>
                            </div>
                        </div>
                        <div class="zsbBodyOne cyw">
                            <div @mouseenter="mouseEnter" @mouseleave="mouseleave">
                                <el-carousel
                                    direction="vertical"
                                    height="4.41rem"
                                    class="caru1"
                                    :interval="5000"
                                    arrow="never"
                                    :autoplay="autoplay"
                                    v-if="RunDevice.length > 0"
                                >
                                    <el-carousel-item v-for="(item, index) in RunDevice" :key="index">
                                        <div class="gx_body" flex flex-wrap>
                                            <div class="gx_body_li1" v-for="(itemes, index) in item" :key="index">
                                                {{ itemes.Room }}-{{ itemes.Name }}#
                                                <span class="gbl_time" style="font-size: 0.14rem"
                                                    >(运行{{ Number((itemes.RunTime / 3600).toString()).toFixed(1) }}h；
                                                    <span v-if="itemes.StopTime > 0" style="color: #e94b4c"
                                                        >停止{{ Number((itemes.StopTime / 3600).toString()).toFixed(1) }}h；</span
                                                    >
                                                    <span v-else style="color: #a4b2ca">未停止；</span>
                                                    <span v-if="Number((itemes.OfflineTime / 3600).toString()).toFixed(1) > 0" style="color: #e94b4c">
                                                        离线{{ Number((itemes.OfflineTime / 3600).toString()).toFixed(1) }}h；</span
                                                    ><span v-else> 未离线</span>)</span
                                                >
                                            </div>
                                        </div>
                                    </el-carousel-item>
                                </el-carousel>
                                <div class="noData" flex="main:center cross:center" v-else style="height: 4.41rem">暂无数据</div>
                            </div>
                        </div>
                        <div class="zsbBodyOne" style="width: 16%">
                            <div @mouseenter="mouseEnter1" @mouseleave="mouseleave1">
                                <el-carousel
                                    direction="vertical"
                                    height="4rem"
                                    class="caru1"
                                    :interval="5000"
                                    arrow="never"
                                    :autoplay="autoplay"
                                    v-if="OfflineDevice.length > 0"
                                >
                                    <el-carousel-item v-for="(items, indexs) in OfflineDevice" :key="indexs">
                                        <div class="gx_body" flex flex-wrap>
                                            <div
                                                v-for="(item, index) in items"
                                                :key="index"
                                                class="gx_body_li1"
                                                style="
                                                    width: 75%;
                                                    position: relative;
                                                    text-align: center;
                                                    height: 0.56rem;
                                                    line-height: 0.56rem;
                                                "
                                            >
                                                <span
                                                    style="
                                                        position: absolute;
                                                        top: 0.22rem;
                                                        left: -0rem;
                                                        display: inline-block;
                                                        width: 0.08rem;
                                                        height: 0.08rem;
                                                        background: #e94b4c;
                                                        border-radius: 50%;
                                                    "
                                                ></span
                                                >{{ item.Room }}-{{ item.Name }}#
                                            </div>

                                            <div v-if="items.length <= 6" style="width: 75%">
                                                <div
                                                    class="gx_body_li1"
                                                    style="
                                                        width: 100%;
                                                        position: relative;
                                                        text-align: center;
                                                        height: 0.56rem;
                                                        line-height: 0.56rem;
                                                    "
                                                    v-for="ite in Number(7 - items.length)"
                                                    :key="ite"
                                                >
                                                    <span
                                                        style="
                                                            position: absolute;
                                                            top: 0.22rem;
                                                            left: -0rem;
                                                            display: inline-block;
                                                            width: 0.08rem;
                                                            height: 0.08rem;
                                                            background: #e94b4c;
                                                            border-radius: 50%;
                                                        "
                                                    ></span
                                                    >- -
                                                </div>
                                            </div>
                                        </div>
                                    </el-carousel-item>
                                </el-carousel>
                                <div class="noData" flex="main:center cross:center" v-else style="height: 4rem">暂无数据</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="zongSheBei yunXing">
                    <div class="zsb_title" style="margin-top: 0.2rem; height: 0.53rem">
                        <span class="zsb_text">运行对比</span>
                    </div>
                    <div class="zsbBody">
                        <div class="zsbBodyOne bian" style="width: 100%; height: 3.05rem">
                            <div v-if="this.ArrDayTime.length > 0">
                                <div id="main" style="width: 70%; height: 2.5rem"></div>
                                <div class="canyu" style="width: 29%">
                                    <div class="zbo_title cyys">参与设备</div>
                                    <div class="zbo_shang" style="margin-top: 0.21rem">
                                        <div class="zbo_sTime scs" style="width: 50%">
                                            <span
                                                style="
                                                    display: inline-block;
                                                    width: 0.14rem;
                                                    height: 0.11rem;
                                                    background: #43c781;
                                                    margin-right: 0.09rem;
                                                "
                                            ></span>
                                            时长较昨日:
                                            <span :class="[this.CompareDayTime > 0 ? 'jiaoZuo' : 'jiaoZuo1']">
                                                <span v-if="this.CompareDayTime > 0"
                                                    >{{
                                                        this.CompareDayTime
                                                            ? Number((this.CompareDayTime / 3600).toString()).toFixed(1)
                                                            : 0
                                                    }}h</span
                                                >
                                                <span v-else
                                                    >{{
                                                        this.CompareDayTime
                                                            ? -Number((this.CompareDayTime / -3600).toString()).toFixed(1)
                                                            : 0
                                                    }}h</span
                                                >
                                                <i class="el-icon-bottom" v-show="this.CompareDayTime < 0"></i>
                                                <i class="el-icon-top" v-show="this.CompareDayTime > 0"></i>
                                            </span>
                                        </div>
                                        <div class="zbo_sTime scs">
                                            时长较上周:
                                            <span :class="[this.CompareWeekTime > 0 ? 'jiaoZuo' : 'jiaoZuo1']">
                                                <span v-if="this.CompareWeekTime > 0">
                                                    {{
                                                        this.CompareWeekTime
                                                            ? Number((this.CompareWeekTime / 3600).toString()).toFixed(1)
                                                            : 0
                                                    }}h</span
                                                >
                                                <span v-else>
                                                    {{
                                                        this.CompareWeekTime
                                                            ? -Number((this.CompareWeekTime / -3600).toString()).toFixed(1)
                                                            : 0
                                                    }}h</span
                                                >
                                                <i class="el-icon-bottom" v-show="this.CompareWeekTime < 0"></i>
                                                <i class="el-icon-top" v-show="this.CompareWeekTime > 0"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="zbo_shang" style="margin-top: 0.21rem">
                                        <div class="zbo_sTime scs" style="width: 50%">
                                            <span style="display: inline-block; width: 0.23rem"></span>
                                            数量较昨日:
                                            <span :class="[this.CompareDayDeviceRun > 0 ? 'jiaoZuo' : 'jiaoZuo1']"
                                                >{{ this.CompareDayDeviceRun ? this.CompareDayDeviceRun : 0 }}台
                                                <i class="el-icon-bottom" v-show="this.CompareDayDeviceRun < 0"></i>
                                                <i class="el-icon-top" v-show="this.CompareDayDeviceRun > 0"></i>
                                            </span>
                                        </div>
                                        <div class="zbo_sTime scs">
                                            数量较上周:
                                            <span :class="[this.CompareWeekDeviceRun > 0 ? 'jiaoZuo' : 'jiaoZuo1']"
                                                >{{ this.CompareWeekDeviceRun ? this.CompareWeekDeviceRun : 0 }}台
                                                <i class="el-icon-bottom" v-show="this.CompareWeekDeviceRun < 0"></i>
                                                <i class="el-icon-top" v-show="this.CompareWeekDeviceRun > 0"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="canyu" style="top: 2rem; width: 29%">
                                    <div class="zbo_title cyys">未参与设备</div>

                                    <div class="zbo_shang" style="margin-top: 0.21rem">
                                        <div class="zbo_sTime scs" style="width: 50%">
                                            <span style="display: inline-block; width: 0.23rem"></span>
                                            数量较昨日:
                                            <span :class="[this.CompareDayDeviceOff > 0 ? 'jiaoZuo' : 'jiaoZuo1']"
                                                >{{ this.CompareDayDeviceOff ? this.CompareDayDeviceOff : 0 }}台
                                                <i class="el-icon-bottom" v-show="this.CompareDayDeviceOff < 0"></i>
                                                <i class="el-icon-top" v-show="this.CompareDayDeviceOff > 0"></i>
                                            </span>
                                        </div>
                                        <div class="zbo_sTime">
                                            数量较上周:
                                            <span :class="[this.CompareWeekDeviceOff > 0 ? 'jiaoZuo' : 'jiaoZuo1']"
                                                >{{ this.CompareWeekDeviceOff ? this.CompareWeekDeviceOff : 0 }}台
                                                <i class="el-icon-bottom" v-show="this.CompareWeekDeviceOff < 0"></i>
                                                <i class="el-icon-top" v-show="this.CompareWeekDeviceOff > 0"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="noData" flex="main:center cross:center" v-else style="height: 2.5rem">暂无数据</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="br_right" style="width: 100%; margin-top: 0.2rem" flex="main:justify">
                <div class="gaoXiao gxbox">
                    <div class="gx_title mt">低速运行设备<span class="gt_tai">（进给倍率90%以下）</span></div>

                    <div @mouseenter="mouseEnter2" @mouseleave="mouseleave2" class="ds_box">
                        <div class="disu" flex="main:center cross:center">
                            <div>设备型号</div>
                            <div>90-70</div>
                            <div>70-50</div>
                            <div>50以下</div>
                            <div>总和</div>
                        </div>
                        <el-carousel
                            direction="vertical"
                            height="4.1rem"
                            class="caru"
                            style="border: none"
                            :interval="5000"
                            arrow="never"
                            :autoplay="autoplay"
                            v-if="LowSpeed.length > 0"
                        >
                            <div>
                                <el-carousel-item v-for="(items, index) in LowSpeed" :key="index">
                                    <div class="disu" flex="main:center cross:center" v-for="(item, index) in items" :key="index">
                                        <div class="duh">{{ item.Room }}-{{ item.Name }}#</div>
                                        <div>{{ Number((item.F90 / 3600).toString()).toFixed(1) }}h</div>
                                        <div>{{ Number((item.F70 / 3600).toString()).toFixed(1) }}h</div>
                                        <div :style="item.F50 > 0 ? 'color:#e94b4c' : ''">
                                            {{ Number((item.F50 / 3600).toString()).toFixed(1) }}h
                                        </div>
                                        <div>{{ Number((item.FSum / 3600).toString()).toFixed(1) }}h</div>
                                    </div>
                                </el-carousel-item>
                            </div>
                        </el-carousel>
                        <div class="noData" flex="main:center cross:center" v-else style="height: 4.1rem; boder: none">暂无数据</div>
                    </div>
                </div>
                <div class="gaoXiao duibi">
                    <div class="autoScoll_title autoScoll_titleRed">
                        <span style="line-height: 0.55rem" class="yjs"><span style="color: #e94b4c">超时</span>预警记录</span>
                    </div>
                    <div @mouseenter="mouseEnter3" @mouseleave="mouseleave3" class="cs">
                        <div flex="main:center cross:center" style="width: 93%; margin: 0 auto">
                            <div class="cstitle">设备型号</div>
                            <div class="cstitle">超时范围</div>
                            <div class="cstitle">超时时长</div>
                        </div>
                        <el-carousel
                            direction="vertical"
                            class="gx_body"
                            height="3.9rem"
                            style="height: 3.9rem; margin-top: 0; border: none; padding: 0; border-radius: 0px"
                            :interval="5000"
                            arrow="never"
                            :autoplay="autoplay"
                            v-if="LowSpeed.length > 0"
                        >
                            <el-carousel-item v-for="(items, index) in OverTime" :key="index">
                                <div flex="main:center cross:center" class="csbox" v-for="(item, index) in items" :key="index">
                                    <div class="cstitle ys"><span class="kuai"></span>{{ item.Room }}- {{ item.Name }}#</div>
                                    <div class="cstitle">{{ String(item.BeginTime).slice(10) }}-{{ String(item.EndTime).slice(10) }}</div>
                                    <div class="cstitle">{{ item.TotalSecond | times }}</div>
                                </div>
                            </el-carousel-item>
                        </el-carousel>
                        <div class="noData" flex="main:center cross:center" v-else style="height: 3.9rem; boder: none">暂无数据</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import { GetReport } from '../../api/api';
import titleCheck from './component/titleCheck.vue';
import compLogo from './component/compLogo.vue';
import countTo from 'vue-count-to';
import { todayTimeFun } from '../../utils/index';
import '../common/loginStatus';
export default {
    components: { titleCheck, compLogo, countTo },
    data() {
        return {
            dateValue: [],

            begintime: '',
            endtime: '',
            moremStartTime: '',
            moremEndTime: '',
            zhanweiColor: true,
            numes: 0,
            currentTime: '',

            comp_id: 0,
            checkNum: 4,
            autoplay: true,
            yestodayDate: todayTimeFun(),
            //---------------------------------------------------------
            yse: '',
            xLabel: '',
            ge: '',
            riqi: [],
            ArrDayTime: [],
            CompareDayDeviceRun: null,
            CompareDayTime: null,
            CompareWeekDeviceRun: null,
            CompareWeekTime: null,
            CompareDayDeviceOff: null,
            CompareWeekDeviceOff: null,
            RunDevice: [],
            OfflineDevice: [],
            OverTime: null,
            LowSpeed: [],
            Data: {},
            chejian: []
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.comp_id = Number(localStorage.getItem('comp_id'));
        this.init();
        this.$resizeFont.resizeFont();

        this.setTime = setInterval(() => {
            let screenHeight = window.screen.height;
            let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
            if (clientHeight >= screenHeight - 10) {
                this.$resizeFont.resizeFontFull();
            } else {
                this.$resizeFont.resizeFont();
            }
        }, 300);
        this.riqis();
        this.getGetReport();
        this.shijian();
    },
    methods: {
        shijian() {
            var myDate = new Date(this.yestodayDate); //获取今天日期
            myDate.setDate(myDate.getDate() - 7);
            var dateArray = [];
            var dateTemp;
            var flag = 1;
            for (var i = 0; i < 7; i++) {
                dateTemp = myDate.getMonth() + 1 + '-' + myDate.getDate();
                dateArray.unshift(dateTemp);
                myDate.setDate(myDate.getDate() + flag);
            }
            this.riqi = dateArray;
        },
        getGetReport() {
            let params = {
                CP_ID: localStorage.getItem('comp_id'),
                Device_ID: 0,
                BeginTime: this.yestodayDate + ' ' + '00:00:00', // '2021-09-20 00:00:00',
                EndTime: this.yestodayDate + ' ' + '23:59:59', //'2021-09-20 23:59:59',
                EndablePager: 0, //是否分页
                Room: Number(localStorage.getItem('allCheJian')) ? Number(localStorage.getItem('allCheJian')) : 0,
                Status: 0,
                PageIndex: 0,
                PageSize: 0
            };
            GetReport(params).then((res) => {
                const { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    this.ArrDayTime = Data.ArrDayTime.map((item) => Number((item / 3600).toString()).toFixed(1));
                    this.CompareDayDeviceRun = Data.CompareDayDeviceRun;
                    this.CompareDayTime = Data.CompareDayTime;
                    this.CompareWeekDeviceRun = Data.CompareWeekDeviceRun;
                    this.CompareWeekTime = Data.CompareWeekTime;
                    this.CompareDayDeviceOff = Data.CompareDayDeviceOff;
                    this.CompareWeekDeviceOff = Data.CompareWeekDeviceOff;
                    this.RunDevice = this.group(Data.RunDevice, 18);
                    this.OfflineDevice = this.group(Data.OfflineDevice, 7);
                    this.OverTime = this.group(Data.OverTime, 8);
                    this.LowSpeed = this.group(Data.LowSpeed, 10);
                    this.Data = Data.Data;
                    this.chejian = Data.Data.roomJson ? JSON.parse(Data.Data.roomJson) : [];
                    this.$nextTick(() => {
                        this.drawLine();
                    });
                }
                if (ReturnCode == 500) {
                    this.ArrDayTime = [];
                    this.CompareDayDeviceRun = [];
                    this.CompareDayTime = [];
                    this.CompareWeekDeviceRun = [];
                    this.CompareWeekTime = [];
                    this.CompareDayDeviceOff = [];
                    this.CompareWeekDeviceOff = [];
                    this.RunDevice = [];
                    this.OfflineDevice = [];
                    this.OverTime = [];
                    this.LowSpeed = [];
                    this.Data = [];
                    this.chejian = [];
                }
            });
        },
        group(array, subGroupLength) {
            let index = 0;
            let newArray = [];
            while (index < array.length) {
                newArray.push(array.slice(index, (index += subGroupLength)));
            }
            return newArray;
        },
        riqis() {
            for (let i = 0; i < 7; i++) {
                let mr = this.getBeforeDate(i);
                this.riqi.unshift(mr);
            }
        },
        ArrData() {
            for (let i = 0; i < this.ArrDayTime.length; i++) {
                let shuzu = this.getBeforeDate(this.ArrDayTime[i]);
                this.ArrDayTimes.unshift(shuzu);
            }
        },
        getBeforeDate(n) {
            var n = n;
            var d = new Date();
            var year = d.getFullYear();
            var mon = d.getMonth() + 1;
            var day = d.getDate();
            if (day <= n) {
                if (mon > 1) {
                    mon = mon - 1;
                } else {
                    year = year - 1;
                    mon = 12;
                }
            }
            d.setDate(d.getDate() - n);
            year = d.getFullYear();
            mon = d.getMonth() + 1;
            day = d.getDate();
            var s = (mon < 10 ? '0' + mon : mon) + '-' + (day < 10 ? '0' + day : day);
            return s;
        },

        mouseEnter() {
            this.autoplay = false;
        },
        mouseleave() {
            this.autoplay = true;
        },
        mouseEnter1() {
            this.autoplay = false;
        },
        mouseleave1() {
            this.autoplay = true;
        },
        mouseEnter2() {
            this.autoplay = false;
        },
        mouseleave2() {
            this.autoplay = true;
        },
        mouseEnter3() {
            this.autoplay = false;
        },
        mouseleave3() {
            this.autoplay = true;
        },
        drawLine() {
            if (localStorage.getItem('login_staus') > 2) {
                this.yse = '#3c466b';
                this.xLabel = '#3c466b';
                this.ge = 'rgba(225,225,225,0.9)';
            } else {
                this.yse = 'rgba(225,225,225,0.5)';
                this.xLabel = '#fff';
                this.ge = '#3c466b';
            }
            var chartDom = document.getElementById('main');
            var myChart = echarts.init(chartDom);
            var option;
            let resizeTimer = null;

            option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    top: '28px',
                    left: '37px',
                    right: '30px',
                    bottom: '18px'
                },
                legend: {
                    right: '5%',
                    textStyle: {
                        color: this.xLabel
                    }
                },
                color: ['#43C781'],
                xAxis: [
                    {
                        // type: 'category',
                        boundaryGap: true,
                        data: this.riqi,
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: this.yse
                            }
                        },
                        axisLabel: {
                            color: this.xLabel
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: this.ge,
                                width: 0.1
                            }
                        }
                    },
                    {
                        type: 'category',
                        boundaryGap: true,
                        nameTextStyle: {
                            verticalAlign: 'bottom'
                        },
                        data: [],
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#A4B2CA'
                            }
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        scale: true,
                        name: '数据（小时）',
                        max: 500,
                        min: 0,
                        interval: 125,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: this.yse
                            }
                        },
                        splitLine: {
                            show: true, //虽然是y轴  但是是横线
                            lineStyle: {
                                color: this.ge,
                                width: 0.1,
                                type: 'solid'
                            }
                        },
                        axisTick: {
                            //y轴刻度线
                            show: false
                        }
                    },
                    {
                        type: 'value',
                        scale: false,
                        name: '',
                        max: 0,
                        min: 0,
                        interval: 0,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: this.yse
                            }
                        },
                        splitLine: {
                            show: true, //虽然是y轴  但是是横线
                            lineStyle: {
                                color: this.ge,
                                width: 0.1,
                                type: 'solid'
                            }
                        },
                        //     splitLine: {
                        //         lineStyle: {
                        //             color: '#FFFFFF',
                        //             width: 0.1
                        //         }
                        //     }
                        axisTick: {
                            //y轴刻度线
                            show: false
                        }
                    }
                ],
                series: [
                    {
                        name: '参与时长',
                        barWidth: 35,
                        data: this.ArrDayTime,
                        type: 'bar'
                    }
                ]
            };

            option && myChart.setOption(option);

            myChart.resize();

            window.addEventListener('resize', () => {
                if (resizeTimer) clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    echarts.init(document.getElementById('main')).resize();
                }, 100);
            });
        },
        //---------------------------------------------------------

        dingshiTime() {
            this.fiveTimer = setInterval(() => {
                this.init();
                // this.currentTime = getTime();
            }, 9000);

            this.numes = 9;
            this.oneMinutes = setInterval(() => {
                if (this.numes === 1) {
                    this.numes = 9;
                } else {
                    this.numes -= 1;
                }
            }, 1000);
        },
        cleardingshi() {
            clearInterval(this.fiveTimer);
            clearInterval(this.oneMinutes);
        },
        init() {
            // this.$nextTick(() => {
            //     this.drawLine();
            // });
        },
        cleartodayDate() {
            this.yestodayDate = yestodayTimeFun();
            this.zhanweiColor = true;
            this.dingshiTime();
        },
        changetodayDate() {
            this.zhanweiColor = false;
            this.cleardingshi();
        },
        clearTime() {
            this.dateValue = '';
            this.changeDate();
        },

        chooseSearch() {
            this.init();
            this.getGetReport();
            this.shijian();
        },
        mouseEnter() {
            this.autoplay = false;
        },
        mouseleave() {
            this.autoplay = true;
        }
    },
    created() {},

    beforeCreate() {},
    beforeMount() {},
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed() {
        clearInterval(this.fiveTimer);
        clearInterval(this.oneMinutes);
        clearInterval(this.timer);
        clearInterval(this.setTime);
    },
    activated() {}
};
</script>
<style lang='scss'>
.gaoXiao {
    .el-carousel__indicators--horizontal {
        right: 0.2rem;
        -webkit-transform: translateX(55%);
        transform: translateX(55%);
    }
}
.DateChooseSinglees {
    width: 2rem;
    margin-right: 0.2rem;

    .el-input__inner {
        width: 2.2rem;
    }
}

.leftJiaoData {
    border: none;
    position: relative;
    .leftJiao {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 0;
        height: 0;
        border-bottom: 0.15rem solid #3d9aff;
        border-right: 0.15rem solid transparent;
    }
    .el-input__inner {
        background: rgba(61, 154, 255, 0.3);
    }
}
</style>
<style lang='scss' scoped>
.homePageIndex {
    min-width: 1160px;
}
.reportPageBody .br_left {
    width: 100%;
}
.reportPageBody .br_right {
    width: 100%;
    .gaoXiao {
        width: 49%;
    }
}
.reportPageBody .br_right .duibi {
    margin-top: 0;
}

.homePageTitle .chooseBtn {
    background: #3d9aff 100% no-repeat;
    color: #fff;
}

.duibi {
    margin-top: 0.2rem;
    .gx_body {
        border-radius: 8px;
        padding: 0.2rem;
        height: 4.46rem;
        // height: 4.32rem;
        box-sizing: border-box;
        background: #fff;
        margin-top: 0;
        border: none;
        position: relative;
        .tips {
            font-size: 0.14rem;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #786e8b;
            text-align: right;
            position: absolute;
            right: 0.2rem;
            bottom: 0.25rem;
            line-height: 0;
        }
        .gxb_title {
            width: 100%;
            height: 0.54rem;
            padding: 0 0 0 0.4rem;
            border-bottom: 1px solid #efecec;
            box-sizing: border-box;
            margin: 0rem 0 0.05rem 0;
            .gxb_title_li {
                width: 2.3rem;
                height: 0.4rem;
                line-height: 0.4rem;
                font-size: 0.16rem;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: #786e8b;
                text-align: center;
                box-sizing: border-box;
                cursor: pointer;
            }
            .xb_title_li_actived {
                background: #f09a5e;
                color: #ffffff;
            }
        }
        .sb_zhuangtai {
            width: 100%;
            border-top: 1px solid #efecec;
            border-left: 1px solid #efecec;
            .daisb {
                .daisb_ul {
                    width: 100%;
                    .daisb_li {
                        line-height: 0.1rem;
                        width: 25%;
                        // height: 0.9rem;
                        padding: 0.1rem 0 0.1rem 0;
                        box-sizing: border-box;
                        border-right: 0.01rem solid #efecec;
                        border-bottom: 0.01rem solid #efecec;
                        .shouTai {
                            font-size: 0.14rem;
                            font-family: Microsoft YaHei;
                            font-weight: 600;
                            color: #391c63;
                            margin-bottom: 0.14rem;
                            padding-left: 0.39rem;
                        }
                        .diTai {
                            .dt_num {
                                font-size: 0.16rem;
                                font-family: Microsoft YaHei;
                                font-weight: 400;
                                color: #391c63;
                                margin-right: 0.18rem;
                                width: 0.55rem;
                                text-align: right;
                            }
                        }
                    }
                }
                .daisb_ul_2 {
                    width: 100%;
                    .daisb_li_2 {
                        line-height: 0.25rem;
                        width: 33%;
                        padding: 0.2rem 0 0.2rem 0;
                        box-sizing: border-box;
                        border-right: 0.01rem solid #efecec;
                        border-bottom: 0.01rem solid #efecec;
                        .shouTai {
                            font-size: 0.16rem;
                            font-family: Microsoft YaHei;
                            font-weight: 400;
                            color: #391c63;
                            margin-bottom: 0.14rem;
                            padding-left: 0.64rem;
                        }
                        .diTai {
                            .dt_num {
                                font-size: 0.28rem;
                                font-family: Microsoft YaHei;
                                font-weight: 400;
                                color: #391c63;
                                margin-right: 0.18rem;
                                width: 0.8rem;
                                text-align: right;
                            }
                        }
                    }
                }
            }
        }
    }
}
.gx_title {
    padding-left: 0.2rem;
    font-size: 0.2rem;
    height: 0.53rem;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #391c63;
    border-left: 0.04rem solid transparent;
    background: url('') no-repeat;
    background-size: cover;
    .gt_tai {
        color: #f09a5e;
    }
}
.tjOne {
    width: 49%;
    background: #fff;
    border: none;
    border-radius: 8px;
    .tjOneTitle {
        box-sizing: border-box;
        width: 100%;
        height: 0.6rem;
        line-height: 0.6rem;
        padding-left: 0.2rem;
        font-size: 0.2rem;

        font-weight: bold;
        color: #391c63;
        background: url('') no-repeat;
        background-size: cover;
        .sinPage {
            width: 0;
            height: 0;
            padding-right: 0;
        }
    }

    .thOneBody {
        width: 100%;
        padding: 0 0.2rem;

        box-sizing: border-box;

        .tbt {
            width: 33%;
            padding: 0.24rem 0;
        }
        .tbt:nth-of-type(1) {
            border-bottom: 1px solid #dbdbdb;
        }
        .tbt:nth-of-type(2) {
            border-bottom: 1px solid #dbdbdb;
        }
        .tbt:nth-of-type(3) {
            border-bottom: 1px solid #dbdbdb;
        }

        .tbt_tai {
            // width: 33%;
            // height: 1.33rem;

            border-right: 1px solid #dbdbdb;
            .tbt_tai_num {
                font-size: 0.28rem;

                font-weight: bold;
                color: #391c63;
                text-align: center;
            }
            .tbt_tai_txt {
                margin-top: 0.22rem;
                font-size: 0.16rem;

                font-weight: 400;
                color: #786e8b;
                text-align: center;
            }
        }
        .tbt_taiNoBorder {
            border: none;
        }
    }

    .todayGongGao {
        padding: 0.15rem 0.2rem;
        box-sizing: border-box;
        .tgg_li {
            width: 100%;
            height: 0.7rem;
            line-height: 0.7rem;
            border-bottom: 1px solid #3c466b;
            font-size: 0.2rem;

            font-weight: 400;
            color: #8e93c9;
        }
    }
}
.duibi .gx_body .gxb_title .xb_title_li_actived {
    background: #3d9aff;
}
.reportPageBody .zsb_title .zsb_tai {
    color: #3d9aff;
}
.reportPageBody .br_right .gaoXiao .gx_title .gt_tai {
    color: #3d9aff;
}
.noData {
    border-radius: 8px;
}
</style>
