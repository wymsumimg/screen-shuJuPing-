<template>
    <div class="homePageIndex themeBg">
        <!-- <div class="currentFixed">
            <div>上次刷新时间：{{ this.currentTime.split(' ')[1] }}</div>
            <div>
                刷新倒计时：<span class="miao">{{ this.numes }}</span>
            </div>
        </div> -->
        <!-- 这是首页 -->
        <div class="homePageTitle" flex="cross:center main:justify">
            <div flex="cross:center ">
                <comp-logo :comp_id="comp_id"></comp-logo>
                <title-check :num="checkNum"></title-check>
                <div class="DateChoose DateChooseSingle" :class="{ zhanweiColor: zhanweiColor }">
                    <el-date-picker
                        v-show="!State"
                        @change="changetodayDate"
                        :clearable="false"
                        v-model="yestodayDate"
                        value-format="yyyy-MM-dd"
                        type="date"
                        :placeholder="$t('menu.xuanzeriqi')"
                    >
                    </el-date-picker>
                    <el-date-picker
                        v-show="State"
                        @change="changetodayDate"
                        :clearable="false"
                        v-model="yestodayDates"
                        value-format="yyyy-MM"
                        type="month"
                        :placeholder="$t('menu.xuanzeriqi')"
                    >
                    </el-date-picker>
                    <i class="el-icon-circle-close closeIcon" @click="cleartodayDate"></i>
                </div>

                <button class="chooseBtn" style="margin: 0 50px 0 0" @click="chooseSearch()">{{ $t('menu.search') }}</button>
                <button :class="{ homeActived: !State, btn: true }" @click="SwitchState" style="margin-right: 0.2rem">
                    {{ $t('menu.daily') }}
                </button>
                <button :class="{ homeActived: State, btn: true }" @click="SwitchStates">{{ $t('menu.monthly') }}</button>
            </div>
            <div style="margin-right: 0.1rem">
                <!-- <title-time :currentTime="currentTime" :num="numes"></title-time> -->
                <set-login></set-login>
            </div>
        </div>
        <div class="reportPageBody" flex="main:justify">
            <div class="br_left" style="width: 70%">
                <div class="zongSheBei zongSheBei1">
                    <div class="zsb_title ztitle">
                        <span class="zsb_text">{{ $t('menu.zongshebei') }}</span
                        ><span class="zsb_tai">（{{ this.Data.totalDevice ? this.Data.totalDevice : 0 }}{{ $t('menu.tai') }}）</span>
                        <span class="zs_box"></span>
                    </div>
                    <div class="zsb_title cytitle">
                        <span class="zsb_text">{{ $t('menu.canyushebei') }}</span>
                        <span class="cy_box"></span>
                    </div>
                    <div class="zsb_title wctitle">
                        <span class="zsb_text">{{ $t('menu.weicanyu') }}</span>
                        <span class="wc_box"></span>
                    </div>
                    <div class="zsbBody" flex="main:justify" flex-wrap>
                        <div class="zsbBodyOne bd">
                            <div class="zbo_title qus">
                                {{ $t('menu.canyushebei') }}:<span class="zsb_tai1"
                                    >{{ this.Data.totalRun ? this.Data.totalRun : 0 }}{{ $t('menu.tai') }}</span
                                ><span style="float: right"
                                    >{{ $t('menu.weicanyushebei') }}:<span class="zsb_tai1"
                                        >{{ this.Data.totalOffline ? this.Data.totalOffline : 0 }}{{ $t('menu.tai') }}</span
                                    ></span
                                >
                            </div>
                            <div class="zbo_title qus" style="margin-top: 0.32rem">
                                <div flex="main:justify" style="margin: 0.16rem 0">
                                    <div>{{ $t('menu.shengchanshichang') }}</div>
                                    <div>{{ $t('menu.stopTime') }}</div>
                                    <div>{{ $t('menu.lixianshichang') }}</div>
                                </div>
                                <div flex="main:justify" class="zsb_tai1">
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
                                <div class="cc">{{ $t('menu.chejianyunxingshichang') }}</div>
                                <div flex="main:justify" class="zbo_sj">
                                    <div>{{ $t('menu.workHome') }}</div>
                                    <div>{{ $t('menu.runningTime') }}</div>
                                    <div>{{ $t('menu.tingzhishijian') }}</div>
                                    <div>{{ $t('menu.lixianshijian') }}</div>
                                </div>

                                <div v-if="this.chejian.length > 0">
                                    <div class="zbo_sj" v-for="(item, index) in chejian" :key="index" flex="main:justify">
                                        <span class="cj_title">{{ item.room }}#</span>
                                        <span>{{ Number((item.run / 3600).toString()).toFixed(1) }}h</span>
                                        <span>{{ Number((item.stop / 3600).toString()).toFixed(1) }}h</span>
                                        <span style="width: 0.64rem">{{ Number((item.offline / 3600).toString()).toFixed(1) }}h</span>
                                    </div>
                                </div>
                                <div class="noData" flex="main:center cross:center" v-else style="height: 1.6rem">
                                    {{ $t('menu.zanwu') }}
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
                                            <div
                                                class="gx_body_li1"
                                                :style="itemes.Name.length > 3 ? 'font-size: 0.02rem' : ''"
                                                v-for="(itemes, index) in item"
                                                :key="index"
                                            >
                                                {{ itemes.Room }}-{{ itemes.Name }}#
                                                <span class="gbl_time" :style="itemes.Name.length > 3 ? 'font-size: 0.01rem' : ''"
                                                    >({{ $t('menu.yunxing') }}{{ Number((itemes.RunTime / 3600).toString()).toFixed(1) }}h;
                                                    <span v-if="itemes.StopTime > 0" style="color: #e94b4c"
                                                        >{{ $t('menu.tingzhi')
                                                        }}{{ Number((itemes.StopTime / 3600).toString()).toFixed(1) }}h;</span
                                                    >
                                                    <span v-else style="color: #a4b2ca">{{ $t('menu.weitingzhi') }};</span>
                                                    <span v-if="Number(itemes.OfflineTime / 3600).toFixed(1) > 0" style="color: #e94b4c">
                                                        {{ $t('menu.lixian') }}{{ Number(itemes.OfflineTime / 3600).toFixed(1) }}h;</span
                                                    ><span v-else> {{ $t('menu.weilixian') }}</span
                                                    >)</span
                                                >
                                            </div>
                                        </div>
                                    </el-carousel-item>
                                </el-carousel>
                                <div class="noData" flex="main:center cross:center" v-else style="height: 4.41rem">
                                    {{ $t('menu.zanwu') }}
                                </div>
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
                                                :style="item.Name.length > 3 ? 'font-size: 0.01rem' : ''"
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
                                <div class="noData" flex="main:center cross:center" v-else style="height: 4rem">{{ $t('menu.zanwu') }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="zongSheBei yunXing">
                    <div class="zsb_title" style="margin-top: 0.2rem; height: 0.53rem">
                        <span class="zsb_text">{{ $t('menu.yunxingdunbi') }}</span>
                    </div>
                    <div class="zsbBody">
                        <div class="zsbBodyOne bian" style="width: 100%; height: 3.05rem">
                            <div v-if="this.ArrDayTime.length > 0">
                                <div id="main" style="width: 70%; height: 2.5rem"></div>
                                <div class="canyu" style="width: 29%">
                                    <div class="zbo_title cyys">{{ $t('menu.canyushebei') }}</div>
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
                                            {{ $t(State ? 'menu.shichangjiaoshangyue' : 'menu.shichangjiaozuori') }}:
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
                                            {{ $t(State ? 'menu.shichangjiaoshangji' : 'menu.shichangjiaoshangzhou') }}:
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
                                            {{ $t(State ? 'menu.shuliangjiaoshangyue' : 'menu.shuliangjiaozuori') }}:
                                            <span :class="[this.CompareDayDeviceRun > 0 ? 'jiaoZuo' : 'jiaoZuo1']"
                                                >{{ this.CompareDayDeviceRun ? this.CompareDayDeviceRun : 0 }}{{ $t('menu.tai') }}
                                                <i class="el-icon-bottom" v-show="this.CompareDayDeviceRun < 0"></i>
                                                <i class="el-icon-top" v-show="this.CompareDayDeviceRun > 0"></i>
                                            </span>
                                        </div>
                                        <div class="zbo_sTime scs">
                                            {{ $t(State ? 'menu.shuliangjiaoshangji' : 'menu.shuliangjiaoshangzhou') }}:
                                            <span :class="[this.CompareWeekDeviceRun > 0 ? 'jiaoZuo' : 'jiaoZuo1']"
                                                >{{ this.CompareWeekDeviceRun ? this.CompareWeekDeviceRun : 0 }}{{ $t('menu.tai') }}
                                                <i class="el-icon-bottom" v-show="this.CompareWeekDeviceRun < 0"></i>
                                                <i class="el-icon-top" v-show="this.CompareWeekDeviceRun > 0"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="canyu" style="top: 2rem; width: 29%">
                                    <div class="zbo_title cyys">{{ $t('menu.weicanyushebei') }}</div>

                                    <div class="zbo_shang" style="margin-top: 0.21rem">
                                        <div class="zbo_sTime scs" style="width: 50%">
                                            <span style="display: inline-block; width: 0.23rem"></span>
                                            {{ $t(State ? 'menu.shuliangjiaoshangyue' : 'menu.shuliangjiaozuori') }}:
                                            <span :class="[this.CompareDayDeviceOff > 0 ? 'jiaoZuo' : 'jiaoZuo1']"
                                                >{{ this.CompareDayDeviceOff ? this.CompareDayDeviceOff : 0 }}{{ $t('menu.tai') }}
                                                <i class="el-icon-bottom" v-show="this.CompareDayDeviceOff < 0"></i>
                                                <i class="el-icon-top" v-show="this.CompareDayDeviceOff > 0"></i>
                                            </span>
                                        </div>
                                        <div class="zbo_sTime">
                                            {{ $t(State ? 'menu.shuliangjiaoshangji' : 'menu.shuliangjiaoshangzhou') }}:
                                            <span :class="[this.CompareWeekDeviceOff > 0 ? 'jiaoZuo' : 'jiaoZuo1']"
                                                >{{ this.CompareWeekDeviceOff ? this.CompareWeekDeviceOff : 0 }}{{ $t('menu.tai') }}
                                                <i class="el-icon-bottom" v-show="this.CompareWeekDeviceOff < 0"></i>
                                                <i class="el-icon-top" v-show="this.CompareWeekDeviceOff > 0"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="noData" flex="main:center cross:center" v-else style="height: 2.5rem">{{ $t('menu.zanwu') }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="br_right" style="width: 29%">
                <div class="gaoXiao gxbox">
                    <div class="gx_title mt">
                        {{ $t('menu.lowspeedEquipment') }}<span class="gt_tai">（{{ $t('menu.jingeibeilv90yixia') }}）</span>
                    </div>

                    <div @mouseenter="mouseEnter2" @mouseleave="mouseleave2" class="ds_box">
                        <div class="disu" flex="main:center cross:center">
                            <div>{{ $t('menu.shebeixinghao') }}</div>
                            <div>90-70</div>
                            <div>70-50</div>
                            <div>50{{ $t('menu.yixia') }}</div>
                            <div>{{ $t('menu.zonghe') }}</div>
                        </div>
                        <el-carousel
                            direction="vertical"
                            height="4rem"
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
                                        <div class="duh" :style="item.Name.length > 3 ? 'font-size: 0.01rem' : ''">
                                            {{ item.Room }}-{{ item.Name }}#
                                        </div>
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
                        <div class="noData" flex="main:center cross:center" v-else style="height: 3.95rem; boder: none">
                            {{ $t('menu.zanwu') }}
                        </div>
                    </div>
                </div>
                <div class="gaoXiao duibi">
                    <div class="autoScoll_title autoScoll_titleRed">
                        <span style="line-height: 0.55rem" class="yjs"
                            ><span style="color: #e94b4c">{{ $t('menu.chaoshi') }}</span
                            >{{ $t('menu.yujingjilu') }}</span
                        >
                    </div>
                    <div @mouseenter="mouseEnter3" @mouseleave="mouseleave3" class="cs">
                        <div flex="main:center cross:center" style="width: 93%; margin: 0 auto">
                            <div class="cstitle">{{ $t('menu.shebeixinghao') }}</div>
                            <div class="cstitle">{{ $t('menu.chaoshifanwei') }}</div>
                            <div class="cstitle">{{ $t('menu.choshishichang') }}</div>
                            <div class="cstitle">{{ $t('menu.runningStatus') }}</div>
                        </div>
                        <el-carousel
                            direction="vertical"
                            class="gx_body"
                            height="2.5rem"
                            style="height: 2.5rem; margin-top: 0; border: none; padding: 0; border-radius: 0px"
                            :interval="5000"
                            arrow="never"
                            :autoplay="autoplay"
                            v-if="LowSpeed.length > 0"
                        >
                            <el-carousel-item v-for="(items, index) in OverTime" :key="index">
                                <div flex="main:center cross:center" class="csbox" v-for="(item, index) in items" :key="index">
                                    <div class="cstitle ys" :style="item.Name.length > 3 ? 'font-size: 0.01rem' : ''">
                                        <span class="kuai"></span>{{ item.Room }}-{{ item.Name }}#
                                    </div>
                                    <div class="cstitle">
                                        {{ String(item.BeginTime).slice(10, 16) }}-{{ String(item.EndTime).slice(10, 16) }}
                                    </div>
                                    <div class="cstitle">{{ item.TotalSecond | times }}</div>
                                    <div class="cstitle" :class="[statusColor[item.Status]]">{{ status[item.Status] }}</div>
                                </div>
                            </el-carousel-item>
                        </el-carousel>
                        <div class="noData" flex="main:center cross:center" v-else style="height: 2.43rem; boder: none">
                            {{ $t('menu.zanwu') }}
                        </div>
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
import { todayTimeFun, yestodayTimeFun } from '../../utils/index';
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
            yestodayDates: todayTimeFun().slice(0, 7),
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
            chejian: [],
            status: {
                '-1': this.$t('menu.lixian'),
                0: this.$t('menu.fuwei'),
                1: this.$t('menu.tingzhi'),
                2: this.$t('menu.yunxing'),
                3: this.$t('menu.zanting'),
                99: this.$t('menu.shoudong'),
                4: this.$t('menu.kaiji'),
                5: this.$t('menu.huiyuandian'),
                6: this.$t('menu.yure'),
                7: this.$t('menu.lashuiping'),
                8: this.$t('menu.dabiaofenzhong'),
                9: this.$t('menu.huandaoduidao'),
                10: this.$t('menu.huanchengxu'),
                11: this.$t('menu.jiancha')
            },
            statusColor: {
                '-1': 'lx',
                0: 'fw',
                1: 'tz',
                2: 'yx',
                3: 'zt',
                99: 'sd',
                4: 'sd',
                5: 'sd',
                6: 'sd',
                7: 'sd',
                8: 'sd',
                9: 'sd',
                10: 'sd',
                11: 'sd'
            },
            State: 0
        };
    },
    computed: {},
    watch: {
        State() {
            this.yestodayDate = todayTimeFun();
            this.yestodayDates = todayTimeFun().slice(0, 7);
            this.getGetReport();
            this.shijian();
            this.drawLine();
        }
    },
    mounted() {
        this.comp_id = Number(localStorage.getItem('comp_id'));
        this.init();
        // this.currentTime = getTime();
        // this.dingshiTime();
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
        // this.timer = setInterval(() => {
        //     this.drawLine();
        // }, 100);
        // this.getQuery_status_offline();
        this.getGetReport();
        this.shijian();
    },
    methods: {
        //切换状态
        SwitchState() {
            this.State = 0;
        },
        SwitchStates() {
            this.State = 1;
        },
        //图表日期
        shijian() {
            if (this.State === 1) {
                var dataArr = [];
                var data = new Date(this.yestodayDates);
                data.setMonth(data.getMonth(), 1); //获取到当前月份,设置月份
                for (var i = 0; i < 7; i++) {
                    data.setMonth(data.getMonth() - 1); //每次循环一次 月份值减1
                    var m = data.getMonth() + 1;
                    m = m < 10 ? '0' + m : m;
                    dataArr.push(data.getFullYear() + '-' + m);
                }
                this.riqi = dataArr;

                console.log(this.riqi);
            } else {
                var myDate = new Date(this.yestodayDate); //获取今天日期
                myDate.setDate(myDate.getDate() - 7);
                var dateArray = [];
                var dateTemp;
                var flag = 1;
                for (var i = 0; i < 7; i++) {
                    var d = myDate.getMonth() + 1;
                    d = d < 10 ? '0' + d : d;
                    dateTemp = d + '-' + myDate.getDate();
                    dateArray.unshift(dateTemp);
                    myDate.setDate(myDate.getDate() + flag);
                }
                this.riqi = dateArray;
                console.log(this.riqi);
            }
        },

        getGetReport() {
            let params = {
                CP_ID: localStorage.getItem('comp_id'),
                Device_ID: 0,
                BeginTime: this.State ? this.yestodayDates : this.yestodayDate + ' ' + '00:00:00', // '2021-09-20 00:00:00',
                EndTime: this.State ? this.yestodayDates : this.yestodayDate + ' ' + '23:59:59', //'2021-09-20 23:59:59',
                EndablePager: 0, //是否分页
                Room: Number(localStorage.getItem('allCheJian')) ? Number(localStorage.getItem('allCheJian')) : 0,
                Status: this.State,
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
                    this.OverTime = this.group(Data.OverTime, 5);
                    this.LowSpeed = this.group(Data.LowSpeed, 10);
                    this.Data = Data.Data;
                    this.chejian = Data.Data.roomJson ? JSON.parse(Data.Data.roomJson) : [];
                    this.$nextTick(() => {
                        this.drawLine();
                    });
                }
                if (ReturnCode == 201) {
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
                        name: this.$t('menu.shuju'),
                        max: Math.ceil(Math.max.apply(null, this.ArrDayTime) / 100) * 100,
                        min: 0,
                        interval: (Math.ceil(Math.max.apply(null, this.ArrDayTime) / 100) * 100) / 4,
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
                        name: this.$t('menu.canyushichang'),
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
            if (this.State === 0) {
                this.yestodayDate = '';
            } else {
                this.yestodayDates = '';
            }
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
</style>
<style lang='scss' scoped>
// $ecolor:'';
// /deep/.el-carousel__indicator.is-active button {
//     height: 0.3rem;
//     @if $ecolor==1 {
//         background: #6672fb;
//     }
//     @if $ecolor==2 {
//         background: #66e1fb;
//     }
//     @if $ecolor==3 {
//         background: #f09a5e;
//     }
// }
</style>
