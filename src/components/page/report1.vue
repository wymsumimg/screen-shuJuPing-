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
            <div  flex="cross:center ">
                <comp-logo :comp_id="comp_id"></comp-logo>
                <title-check :num="checkNum"></title-check>
                <div class="DateChoose DateChooseSingle" :class="{ zhanweiColor: zhanweiColor }">
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
                <title-time :currentTime="currentTime" :num="numes"></title-time>
                <set-login></set-login>
            </div>
        </div>
        <div class="reportPageBody" flex="main:justify">
            <div class="br_left">
                <div class="zongSheBei">
                    <div class="zsb_title">
                        <span class="zsb_text">总设备</span
                        ><span class="zsb_tai">（{{ jZr.total_dev_count ? jZr.total_dev_count : 0 }}台）</span>
                    </div>
                    <div class="zsbBody" flex="main:justify" flex-wrap>
                        <div class="zsbBodyOne">
                            <div class="zbo_title">运行设备（台）</div>
                            <div class="zbo_zuo">
                                <div class="zbo_num">
                                    {{ jZr.run_dev_count ? jZr.run_dev_count : 0 }}
                                </div>
                                <div class="zbo_jz">
                                    较昨日:
                                    <span :class="[jZr.run_zuori > 0 ? 'jiaoZuo1' : 'jiaoZuo']">
                                        {{ jZr.run_zuori ? jZr.run_zuori : 0 }}%
                                        <i class="el-icon-bottom" v-show="jZr.run_zuori < 0"></i>
                                        <i class="el-icon-top" v-show="jZr.run_zuori > 0"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="zbo_shang" flex="main:justify">
                                <div class="zbo_sTime">
                                    时长:{{ Number((jZr.run_total_timelength / 3600).toString().match(/^\d+(?:\.\d{0,2})?/)) }}小时
                                </div>
                                <div class="zbo_sTime">占比:{{ jZr.run_bi ? jZr.run_bi : 0 }}%</div>
                                <div class="zbo_sTime">
                                    较上周:
                                    <span :class="[jZr.run_shangzhou > 0 ? 'jiaoZuo1' : 'jiaoZuo']"
                                        >{{ jZr.run_shangzhou ? jZr.run_shangzhou : 0 }}%
                                        <i class="el-icon-bottom" v-show="jZr.run_shangzhou < 0"></i>
                                        <i class="el-icon-top" v-show="jZr.run_shangzhou > 0"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="zsbBodyOne">
                            <div class="zbo_title">待机设备（台）</div>
                            <div class="zbo_zuo">
                                <div class="zbo_num">{{ jZr.wait_dev_count ? jZr.wait_dev_count : 0 }}</div>
                                <div class="zbo_jz">
                                    较昨日:
                                    <span :class="[jZr.wait_zuori > 0 ? 'jiaoZuo' : 'jiaoZuo1']">
                                        {{ jZr.wait_zuori ? jZr.wait_zuori : 0 }}%
                                        <i class="el-icon-bottom" v-show="jZr.wait_zuori < 0"></i>
                                        <i class="el-icon-top" v-show="jZr.wait_zuori > 0"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="zbo_shang" flex="main:justify">
                                <div class="zbo_sTime">
                                    时长:{{ Number((jZr.wait_total_timelength / 3600).toString().match(/^\d+(?:\.\d{0,2})?/)) }}小时
                                </div>
                                <div class="zbo_sTime">占比:{{ jZr.wait_bi ? jZr.wait_bi : 0 }}%</div>
                                <div class="zbo_sTime">
                                    较上周:
                                    <span :class="[jZr.wait_shangzhou > 0 ? 'jiaoZuo' : 'jiaoZuo1']"
                                        >{{ jZr.wait_shangzhou ? jZr.wait_shangzhou : 0 }}%
                                        <i class="el-icon-bottom" v-show="jZr.wait_shangzhou < 0"></i>
                                        <i class="el-icon-top" v-show="jZr.wait_shangzhou > 0"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="zsbBodyOne">
                            <div class="zbo_title">离线设备（台）</div>
                            <div class="zbo_zuo">
                                <div class="zbo_num">{{ jZr.over_dev_count ? jZr.over_dev_count : 0 }}</div>
                                <div class="zbo_jz">
                                    较昨日:
                                    <span :class="[jZr.over_zuori > 0 ? 'jiaoZuo' : 'jiaoZuo1']">
                                        {{ jZr.over_zuori ? jZr.over_zuori : 0 }}%
                                        <i class="el-icon-bottom" v-show="jZr.over_zuori < 0"></i>
                                        <i class="el-icon-top" v-show="jZr.over_zuori > 0"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="zbo_shang" flex="main:justify">
                                <div class="zbo_sTime">
                                    时长:{{ Number((jZr.over_total_timelength / 3600).toString().match(/^\d+(?:\.\d{0,2})?/)) }}小时
                                </div>
                                <div class="zbo_sTime">占比:{{ jZr.over_bi ? jZr.over_bi : 0 }}%</div>
                                <div class="zbo_sTime">
                                    较上周:
                                    <span :class="[jZr.over_shangzhou > 0 ? 'jiaoZuo' : 'jiaoZuo1']"
                                        >{{ jZr.over_shangzhou ? jZr.over_shangzhou : 0 }}%
                                        <i class="el-icon-bottom" v-show="jZr.over_shangzhou < 0"></i>
                                        <i class="el-icon-top" v-show="jZr.over_shangzhou > 0"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tongji" flex="main:justify" flex-wrap>
                    <div class="tjOne">
                        <div class="tjOneTitle" flex="cross:center">
                            <img class="sinPage" src="../common/comImg/index/sinPage.png" alt="" />
                            <span>运行统计</span>
                        </div>
                        <div class="thOneBody" flex flex-wrap>
                            <div class="tbt">
                                <div class="tbt_tai">
                                    <div class="tbt_tai_num">{{ tjData.run_18 }}</div>
                                    <div class="tbt_tai_txt">18小时以上（台）</div>
                                </div>
                            </div>
                            <div class="tbt">
                                <div class="tbt_tai">
                                    <div class="tbt_tai_num">{{ tjData.run_10 }}</div>
                                    <div class="tbt_tai_txt">10小时以上（台）</div>
                                </div>
                            </div>
                            <div class="tbt">
                                <div class="tbt_tai tbt_taiNoBorder">
                                    <div class="tbt_tai_num">{{ tjData.run_5 }}</div>
                                    <div class="tbt_tai_txt">5小时以上（台）</div>
                                </div>
                            </div>
                            <div class="tbt">
                                <div class="tbt_tai">
                                    <div class="tbt_tai_num">{{ tjData.lx_run_10 }}</div>
                                    <div class="tbt_tai_txt">连续10小时（台）</div>
                                </div>
                            </div>
                            <div class="tbt">
                                <div class="tbt_tai">
                                    <div class="tbt_tai_num">{{ tjData.lx_run_8 }}</div>
                                    <div class="tbt_tai_txt">连续8小时（台）</div>
                                </div>
                            </div>
                            <div class="tbt">
                                <div class="tbt_tai tbt_taiNoBorder">
                                    <div class="tbt_tai_num">{{ tjData.lx_run_5 }}</div>
                                    <div class="tbt_tai_txt">连续5时（台）</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tjOne">
                        <div class="tjOneTitle" flex="cross:center">
                            <img class="sinPage" src="../common/comImg/index/sinPage.png" alt="" />
                            <span>待机统计</span>
                        </div>
                        <div class="thOneBody" flex flex-wrap>
                            <div class="tbt">
                                <div class="tbt_tai">
                                    <div class="tbt_tai_num">{{ tjData.wait_18 }}</div>
                                    <div class="tbt_tai_txt">18小时以上（台）</div>
                                </div>
                            </div>
                            <div class="tbt">
                                <div class="tbt_tai">
                                    <div class="tbt_tai_num">{{ tjData.wait_10 }}</div>
                                    <div class="tbt_tai_txt">10小时以上（台）</div>
                                </div>
                            </div>
                            <div class="tbt">
                                <div class="tbt_tai tbt_taiNoBorder">
                                    <div class="tbt_tai_num">{{ tjData.wait_5 }}</div>
                                    <div class="tbt_tai_txt">5小时以上（台）</div>
                                </div>
                            </div>
                            <div class="tbt">
                                <div class="tbt_tai">
                                    <div class="tbt_tai_num">{{ tjData.lx_wait_10 }}</div>
                                    <div class="tbt_tai_txt">连续10小时（台）</div>
                                </div>
                            </div>
                            <div class="tbt">
                                <div class="tbt_tai">
                                    <div class="tbt_tai_num">{{ tjData.lx_wait_8 }}</div>
                                    <div class="tbt_tai_txt">连续8小时（台）</div>
                                </div>
                            </div>
                            <div class="tbt">
                                <div class="tbt_tai tbt_taiNoBorder">
                                    <div class="tbt_tai_num">{{ tjData.lx_wait_5 }}</div>
                                    <div class="tbt_tai_txt">连续5时（台）</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tjOne mt_20">
                        <div class="tjOneTitle" flex="cross:center">
                            <img class="sinPage" src="../common/comImg/index/sinPage.png" alt="" />
                            <span>离线统计</span>
                        </div>
                        <div class="thOneBody" flex flex-wrap>
                            <div class="tbt">
                                <div class="tbt_tai">
                                    <div class="tbt_tai_num">{{ tjData.over_18 }}</div>
                                    <div class="tbt_tai_txt">18小时以上（台）</div>
                                </div>
                            </div>
                            <div class="tbt">
                                <div class="tbt_tai">
                                    <div class="tbt_tai_num">{{ tjData.over_10 }}</div>
                                    <div class="tbt_tai_txt">10小时以上（台）</div>
                                </div>
                            </div>
                            <div class="tbt">
                                <div class="tbt_tai tbt_taiNoBorder">
                                    <div class="tbt_tai_num">{{ tjData.over_5 }}</div>
                                    <div class="tbt_tai_txt">5小时以上（台）</div>
                                </div>
                            </div>
                            <div class="tbt">
                                <div class="tbt_tai">
                                    <div class="tbt_tai_num">{{ tjData.lx_over_10 }}</div>
                                    <div class="tbt_tai_txt">连续10小时（台）</div>
                                </div>
                            </div>
                            <div class="tbt">
                                <div class="tbt_tai">
                                    <div class="tbt_tai_num">{{ tjData.lx_over_8 }}</div>
                                    <div class="tbt_tai_txt">连续8小时（台）</div>
                                </div>
                            </div>
                            <div class="tbt">
                                <div class="tbt_tai tbt_taiNoBorder">
                                    <div class="tbt_tai_num">{{ tjData.lx_over_5 }}</div>
                                    <div class="tbt_tai_txt">连续5时（台）</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tjOne mt_20">
                        <div class="tjOneTitle" flex="cross:center">
                            <img class="sinPage" src="../common/comImg/index/sinPage.png" alt="" />
                            <span>今日提示信息</span>
                        </div>
                        <div @mouseenter="mouseEnter" @mouseleave="mouseleave">
                            <el-carousel
                                height="2.3rem"
                                direction="vertical"
                                :interval="5000"
                                :autoplay="autoplay"
                                v-show="todayTips.length > 0"
                            >
                                <el-carousel-item v-for="(item, index) in 1" :key="index">
                                    <div class="todayGongGao">
                                        <div class="tgg_li" v-for="(itemes, indexes) in todayTips" :key="indexes">
                                            {{ itemes }}
                                        </div>
                                    </div>
                                </el-carousel-item>
                            </el-carousel>
                            <div v-show="todayTips.length <= 0" class="noTips" flex="main:center cross:center">暂无提示信息</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="br_right">
                <div class="gaoXiao">
                    <div class="gx_title">高效运行<span class="gt_tai">（80%以上）</span></div>
                    <div @mouseenter="mouseEnter" @mouseleave="mouseleave">
                        <el-carousel
                            height="3.2rem"
                            class="caru"
                            :interval="5000"
                            arrow="never"
                            :autoplay="autoplay"
                            v-if="gaoXiaoList.length > 0"
                        >
                            <el-carousel-item v-for="(item, index) in gaoXiaoList" :key="index">
                                <div class="gx_body" flex flex-wrap>
                                    <div class="gx_body_li" v-for="(itemes, index) in item" :key="index">
                                        {{ itemes.room }}-{{ itemes.name }}#
                                        <span class="gbl_time"
                                            >（{{
                                                Number((itemes.time_totalseconds / 3600).toString().match(/^\d+(?:\.\d{0,2})?/))
                                            }}小时）</span
                                        >
                                    </div>
                                </div>
                            </el-carousel-item>
                        </el-carousel>
                        <div class="noData" flex="main:center cross:center" v-else>暂无数据</div>
                    </div>
                </div>
                <div class="gaoXiao duibi">
                    <div class="gx_title">状态上报</div>
                    <div class="gx_body">
                        <div class="gxb_title" flex>
                            <div class="gxb_title_li" :class="{ xb_title_li_actived: numIndex == 0 }" @click="duibiZhoudsb(0)">
                                待上报（{{ dsbAdd }}条）
                            </div>
                            <div class="gxb_title_li" :class="{ xb_title_li_actived: numIndex == 1 }" @click="duibiZhou(1)">
                                已上报（{{ sbAdd }}条）
                            </div>
                        </div>
                        <div class="sb_zhuangtai">
                            <div class="daisb">
                                <ul class="daisb_ul" v-show="numIndex == 0" flex flex-wrap>
                                    <li class="daisb_li" flex="dir:top" v-for="(item, index) in dsb" :key="index">
                                        <span class="shouTai">
                                            <!-- 手动（台） -->
                                            {{ status[item.runstatus] }}
                                        </span>
                                        <span class="diTai" flex="cross:baseline">
                                            <span class="dt_num">
                                                <!-- 13 -->
                                                {{ item.count1 }}
                                            </span>
                                            <span
                                                style="width: 50%; text-align: left; display: block"
                                                class="ml-10 iconsizees"
                                                :class="[
                                                    Number(item.ifbi) > 0 ? 'jiaoZuo1' : Number(item.ifbi) == 0 ? 'yuanse' : 'jiaoZuo'
                                                ]"
                                            >
                                                {{ item.bi }}%
                                                <i class="el-icon-bottom" v-show="item.ifbi < 0"></i>
                                                <i class="el-icon-top" v-show="item.ifbi > 0"></i>
                                            </span>
                                        </span>
                                    </li>
                                </ul>
                                <ul class="daisb_ul_2" v-show="numIndex == 1" flex flex-wrap>
                                    <li class="daisb_li_2" v-for="(item, index) in ShangBaoArr" :key="index">
                                        <span class="shouTai">
                                            <!-- 机器维修（台） -->
                                            {{ item.room }}
                                        </span>
                                        <span class="diTai" flex="cross:baseline">
                                            <span class="dt_num">
                                                <!-- 13 -->
                                                {{ item.count1 }}
                                            </span>
                                            <span
                                                style="width: 50%; text-align: left; display: block"
                                                class="ml-10 iconsizees"
                                                :class="[
                                                    Number(item.ifbi) > 0 ? 'jiaoZuo1' : Number(item.ifbi) == 0 ? 'yuanse' : 'jiaoZuo'
                                                ]"
                                            >
                                                {{ item.bi }}%
                                                <i class="el-icon-bottom" v-show="item.ifbi < 0"></i>
                                                <i class="el-icon-top" v-show="item.ifbi > 0"></i>
                                            </span>
                                        </span>
                                    </li>
                                </ul>
                                <div class="tips">提示：昨日上报数量正常</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    query_dev_tongji,
    query_gaoxiao_run_list,
    query_shebeitongji_list,
    query_dev_tongji_duibi,
    Get_All_query_warning_list,
    Get_All_query_report_list
} from '../../api/api';
import titleCheck from './component/titleCheck.vue';
import compLogo from './component/compLogo.vue';
import countTo from 'vue-count-to';
import { getTime, time_to_sec, yestodayTimeFun } from '../../utils/index';
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
            focus: true,
            checkNum: 4,
            gaoXiaoList: [],
            duibiTitle: [
                { id: 1, name: '对比前一天' },
                { id: 2, name: '对比上一周' }
            ],
            numIndex: 0,
            todayTips: [],
            autoplay: true,
            jZr: {},
            yestodayDate: yestodayTimeFun(),
            tjData: {},
            tongjiDuiBi: {},
            oldj: 0,
            newj: 0,
            status: {
                '-1': '离线',
                0: '复位',
                1: '停止',
                2: '运行',
                3: '暂停',
                99: '手动',
                4: '开机',
                5: '回原点',
                6: '预热',
                7: '拉水平',
                8: '打表分中',
                9: '换刀对刀',
                10: '换程序',
                11: '检查'
            },
            dsbAdd: 0,
            dsb: [
                {
                    runstatus: -1,
                    count1: 0,
                    bi: 0,
                    ifbi: 0
                },
                {
                    runstatus: 0,
                    count1: 0,
                    bi: 0,
                    ifbi: 0
                },
                {
                    runstatus: 1,
                    count1: 0,
                    bi: 0,
                    ifbi: 0
                },
                {
                    runstatus: 2,
                    count1: 0,
                    bi: 0,
                    ifbi: 0
                },
                {
                    runstatus: 3,
                    count1: 0,
                    bi: 0,
                    ifbi: 0
                },
                {
                    runstatus: 4,
                    count1: 0,
                    bi: 0,
                    ifbi: 0
                },
                {
                    runstatus: 5,
                    count1: 0,
                    bi: 0,
                    ifbi: 0
                },
                {
                    runstatus: 6,
                    count1: 0,
                    bi: 0,
                    ifbi: 0
                },
                {
                    runstatus: 7,
                    count1: 0,
                    bi: 0,
                    ifbi: 0
                },
                {
                    runstatus: 8,
                    count1: 0,
                    bi: 0,
                    ifbi: 0
                },
                {
                    runstatus: 9,
                    count1: 0,
                    bi: 0,
                    ifbi: 0
                },
                {
                    runstatus: 10,
                    count1: 0,
                    bi: 0,
                    ifbi: 0
                },
                {
                    runstatus: 11,
                    count1: 0,
                    bi: 0,
                    ifbi: 0
                },
                {
                    runstatus: 99,
                    count1: 0,
                    bi: 0,
                    ifbi: 0
                }
            ],

            sbAdd: 0,
            ShangBaoArr: [
                { istype: 1, bi: 0, count1: 0, ifbi: 0, room: '机器维修' },
                { istype: 2, bi: 0, count1: 0, ifbi: 0, room: '保养' },
                { istype: 3, bi: 0, count1: 0, ifbi: 0, room: '缺料' },
                { istype: 4, bi: 0, count1: 0, ifbi: 0, room: '无工待机' },
                { istype: 5, bi: 0, count1: 0, ifbi: 0, room: '无生产任务' },
                { istype: 6, bi: 0, count1: 0, ifbi: 0, room: '其他' }
            ]
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.comp_id = Number(localStorage.getItem('comp_id'));
        this.init();
        // this.currentTime = getTime();
        this.dingshiTime();
         this.$resizeFont.resizeFont();
    },
    methods: {
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
            this.geQquery_dev_tongji();
            this.getQuery_gaoxiao_run_list();
            this.getQuery_shebeitongji_list();
            let dayhis = 0;
            this.getGet_All_query_warning_list(dayhis);
            this.getGet_All_query_report_list();
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
        },
        mouseEnter() {
            this.autoplay = false;
        },
        mouseleave() {
            this.autoplay = true;
        },
        geQquery_dev_tongji() {
            let params = {
                compid: localStorage.getItem('comp_id'),
                day: this.yestodayDate
            };
            query_dev_tongji(params).then((res) => {
                const { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    this.jZr = Data ? Data[0] : {};
                }
            });
        },
        getQuery_gaoxiao_run_list() {
            let params = {
                compid: localStorage.getItem('comp_id'),
                day: this.yestodayDate
            };
            query_gaoxiao_run_list(params).then((res) => {
                const { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    if (Data != null) {
                        let indexList = Math.ceil(Data.length / 15);
                        let newArr = [];
                        for (var i = 0; i < indexList; i++) {
                            newArr[i] = Data.splice(0, 15);
                        }
                        this.gaoXiaoList = newArr;
                    }
                }
            });
        },
        getQuery_shebeitongji_list() {
            let params = {
                compid: localStorage.getItem('comp_id'),
                day: this.yestodayDate
            };
            query_shebeitongji_list(params).then((res) => {
                const { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    this.tjData = Data;
                }
            });
        },
        getGet_All_query_warning_list(dayhis) {
            let params = {
                begintime: this.yestodayDate,
                ishandle: dayhis,
                compid: localStorage.getItem('comp_id')
            };
            Get_All_query_warning_list(params).then((res) => {
                const { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    for (let i = 0; i < this.dsb.length; i++) {
                        for (let j = 0; j < Data.list.length; j++) {
                            if (this.dsb[i].runstatus == Data.list[j].runstatus) {
                                this.dsb[i].count1 = Data.list[j].count1;
                                this.dsb[i].bi = Data.list[j].bi;
                                this.dsb[i].ifbi = Data.list[j].ifbi;
                            }
                        }
                    }
                    this.dsbAdd = Data.count;
                }
            });
        },
        duibiZhoudsb(index) {
            this.numIndex = index;
            this.getGet_All_query_warning_list(0);
        },
        duibiZhou(index) {
            this.numIndex = index;
            this.getGet_All_query_report_list();
        },
        getGet_All_query_report_list() {
            let params = {
                begintime: this.yestodayDate,
                compid: localStorage.getItem('comp_id')
            };
            Get_All_query_report_list(params).then((res) => {
                const { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    for (let i = 0; i < this.ShangBaoArr.length; i++) {
                        for (let j = 0; j < Data.list.length; j++) {
                            if (this.ShangBaoArr[i].istype == Data.list[j].istype) {
                                this.ShangBaoArr[i].count1 = Data.list[j].count1;
                                this.ShangBaoArr[i].bi = Data.list[j].bi;
                                this.ShangBaoArr[i].ifbi = Data.list[j].ifbi;
                            }
                        }
                    }
                    this.sbAdd = Data.count;
                }
            });
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
</style>
