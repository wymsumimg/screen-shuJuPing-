<template>
    <div class="bigData">
        <div>
            <video class="videoFixed" id="video" src="../common/comImg/index/BG4.mp4" muted autoplay loop></video>
        </div>
        <div>
            <img class="map" src="../common/comImg/index/map.png" alt="" />
        </div>

        <div class="bd_title" flex="main:justify">
            <div class="bd_title_l" flex>
                <div class="l_t"><span>黄岩</span>企业数据综合</div>
                <div class="l_b">
                    <span>HUANGYAN ENTERPRISE DATA SYNTHESIS</span>
                    <i></i>
                </div>
            </div>
            <div class="bd_title_r" flex="cross:center">
                <i class="el-icon-s-home"></i><span>首页</span>
                <img src="../common/comImg/index/fg.png" alt="" />
                <span class="timeall">
                    <span class="time">{{ nowTime }}</span
                    ><span class="date">{{ nowDate }}</span>
                    <span class="noweek">{{ nowWeek }}</span>
                </span>
            </div>
        </div>
        <div class="bd_head">
            <ul flex="main:justify">
                <li flex="cross:center main:center">
                    <img src="../common/comImg/index/jq1.png" alt="" />
                    <div>
                        <div class="li_text">总机器</div>
                        <div class="li_text_2">
                            <span class="num"> <countTo :startVal="allNumOld" :endVal="allNum" :duration="duration"></countTo> </span
                            ><span>台</span>
                        </div>
                    </div>
                </li>
                <li flex="cross:center main:center">
                    <img src="../common/comImg/index/jq2.png" alt="" />
                    <div>
                        <div class="li_text">运行</div>
                        <div class="li_text_2">
                            <span class="num">
                                <countTo :startVal="yunxingNumOld" :endVal="yunxingNum" :duration="duration"></countTo> </span
                            ><span>台</span>
                        </div>
                    </div>
                </li>
                <li flex="cross:center main:center">
                    <img src="../common/comImg/index/jq3.png" alt="" />
                    <div>
                        <div class="li_text">停机</div>
                        <div class="li_text_2">
                            <span class="num">
                                <countTo :startVal="tingzhiNumOld" :endVal="tingzhiNum" :duration="duration"></countTo> </span
                            ><span>台</span>
                        </div>
                    </div>
                </li>
                <li flex="cross:center main:center">
                    <img src="../common/comImg/index/jq4.png" alt="" />
                    <div>
                        <div class="li_text">离线</div>
                        <div class="li_text_2">
                            <span class="num"> <countTo :startVal="lixianNumOld" :endVal="lixianNum" :duration="duration"></countTo> </span
                            ><span>台</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="bd" flex="main:justify">
            <div class="bd_l">
                <div class="bd_l_t">
                    <div class="bd_l_t_title" flex="cross:center">
                        <i></i>
                        <img src="../common/comImg/index/t1.png" alt="" />
                        <div flex="cross:baseline">
                            <span class="bd_l_t_t_tong">总设备统计</span>
                            <span class="bd_l_t_t_ying">TOTAL EQUIPMENT STATISTICS</span>
                        </div>
                    </div>
                    <div class="bd_l_t_body">
                        <div class="bd_l_t_body_center">
                            <ul flex="main:justify">
                                <li flex="dir:top cross:center">
                                    <img src="../common/comImg/index/shebei1.png" alt="" />
                                    <span class="zong_time">总生产时长</span>
                                    <span class="zong_xs">
                                        <countTo :startVal="yunxingOld" :endVal="yunxing" :duration="duration"></countTo>
                                        <span class="xs">小时</span></span
                                    >
                                </li>
                                <li flex="dir:top cross:center">
                                    <img src="../common/comImg/index/shebei3.png" alt="" />
                                    <span class="zong_time">企业平均时长</span>
                                    <span class="zong_xs">
                                        <countTo :startVal="qiyeOld" :endVal="qiye" :duration="duration"></countTo>
                                        <span class="xs">小时</span></span
                                    >
                                </li>
                                <li flex="dir:top cross:center">
                                    <img src="../common/comImg/index/shebei2.png" alt="" />
                                    <span class="zong_time">单设备平均时长</span>
                                    <span class="zong_xs">
                                        <countTo :startVal="shebeiOld" :endVal="shebei" :duration="duration"></countTo>
                                        <span class="xs">小时</span></span
                                    >
                                </li>
                            </ul>
                        </div>
                        <div class="bd_l_t_body_bott">
                            <ul flex flex-wrap>
                                <li flex="cross:center main:center" v-for="(sbItem, index) in allsbItem2" :key="index">
                                    <span class="qiye">企业{{ index + 1 }}</span>
                                    <span
                                        class="qiye_num"
                                        :class="[sbItem.Status == 1 ? 'qiye_green' : sbItem.Status == 0 ? 'qiye_chiping' : 'qiye_red']"
                                        >{{ sbItem.Percent }}%
                                        <!-- <span class="xs">小时</span> -->
                                        <i v-show="sbItem.Status == -1" class="el-icon-bottom"></i>
                                        <i v-show="sbItem.Status == 0">-</i>
                                        <i v-show="sbItem.Status == 1" class="el-icon-top"></i>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="bd_l_b">
                    <div class="bd_l_t_title" flex="cross:center">
                        <i></i>
                        <img src="../common/comImg/index/t2.png" alt="" />
                        <div flex="cross:baseline">
                            <span class="bd_l_t_t_tong">上工人数</span>
                            <span class="bd_l_t_t_ying">NUMBER OF WORKERS</span>
                        </div>
                    </div>
                    <div class="sg_e">
                        <div class="sgPerson" flex="main:justify">
                            <div class="sgPerson_zong">
                                <div class="zp">总人数</div>
                                <div class="znum">
                                    <countTo :startVal="zrsOld" :endVal="zrs" :duration="duration" ref="count1"></countTo>
                                    <span class="z_ren">人</span>
                                </div>
                            </div>
                            <div class="sgPerson_zong">
                                <div class="zp">厂均人数</div>
                                <div class="znum">
                                    <countTo :startVal="mqyaveOld" :endVal="mqyave" :duration="duration" ref="count3"></countTo>
                                    <span class="z_ren">人</span>
                                </div>
                            </div>
                            <div class="sgPerson_zong">
                                <div class="zp">总上工人数</div>
                                <div class="znum gongblue">
                                    <countTo :startVal="zsgOld" :endVal="zsg" :duration="duration" ref="count2"></countTo>
                                    <span class="z_ren">人</span>
                                </div>
                            </div>
                        </div>
                        <div class="proDouble">
                            <div>
                                <!-- <div class="pd_name" flex="main:justify">
                                    <span>上工占比</span><span class="baifen">{{ percentage }}%</span>
                                </div>
                                <el-progress :percentage="percentage" :stroke-width="10" :color="customColor"></el-progress> -->
                                <div id="sgBing" ref="sgBing" style="height: 1.8rem"></div>
                            </div>
                            <!-- <div>
                                <div class="pd_name" flex="main:justify">
                                    <span>平均人数</span><span class="baifen">{{ percentage2 }}%</span>
                                </div>
                                <el-progress :percentage="percentage2" :stroke-width="10" :color="customColor2"></el-progress>
                            </div> -->
                        </div>
                    </div>
                    <div class="bd_l_t_body_bott">
                        <ul flex flex-wrap>
                            <li flex="cross:center main:center" v-for="(sbItem, index) in allsbItem" :key="index">
                                <span class="qiye">企业{{ index + 1 }}</span>
                                <span
                                    class="qiye_num"
                                    :class="[sbItem.Status == 1 ? 'qiye_green' : sbItem.Status == 0 ? 'qiye_chiping' : 'qiye_red']"
                                >
                                    <!-- Count 单个公司的上工人数   -->
                                    {{ sbItem.Percent }}%
                                    <i v-show="sbItem.Status == -1" class="el-icon-bottom"></i>
                                    <i v-show="sbItem.Status == 0">-</i>
                                    <i v-show="sbItem.Status == 1" class="el-icon-top"></i>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="bd_r">
                <div class="bd_r_top">
                    <div class="bd_l_t_title" flex="cross:center">
                        <i></i>
                        <img src="../common/comImg/index/r1.png" alt="" />
                        <div flex="cross:baseline">
                            <span class="bd_l_t_t_tong">运行效率</span>
                            <span class="bd_l_t_t_ying">OPERATING EFFICIENCY</span>
                        </div>
                    </div>
                    <div class="bd_r_top_body">
                        <div class="bb_jun">
                            <ul flex="main:justify">
                                <li>
                                    <span class="bb_jun_text">当前最低值：</span>
                                    <span class="bb_jun_Num">{{ bianData.Min ? bianData.Min : 0 }}%</span>
                                </li>
                                <li>
                                    <span class="bb_jun_text">当前最高值：</span>
                                    <span class="bb_jun_Num">{{ bianData.Max ? bianData.Max : 0 }}%</span>
                                </li>
                                <li>
                                    <span class="bb_jun_text">平均倍率：</span>
                                    <span class="bb_jun_Num">{{ bianData.Ave ? bianData.Ave : 0 }}%</span>
                                </li>
                            </ul>
                        </div>
                        <div class="bb_e">
                            <div
                                @mouseenter="mouseoveAl"
                                @mouseleave="mouseleaveAl"
                                id="zheXian"
                                ref="zheXian"
                                style="height: 3.8rem"
                            ></div>
                        </div>
                    </div>
                    <!-- <div class="bd_l_t_body_bott">
                        <ul flex flex-wrap>
                            <li flex="cross:center main:center" v-for="(sbItem, index) in com_list" :key="index">
                                <span class="qiye">企业{{ index + 1 }}</span>
                                <span
                                    class="qiye_num"
                                    :class="[
                                        sbItem.aver > bianData[quanJuIndex].aver
                                            ? 'qiye_green'
                                            : sbItem.aver == bianData[quanJuIndex].aver
                                            ? 'qiye_chiping'
                                            : 'qiye_red'
                                    ]"
                                    >{{ sbItem.aver + '%' }}
                                    <i v-show="sbItem.aver < bianData[quanJuIndex].aver" class="el-icon-bottom"></i>
                                    <i v-show="sbItem.aver == bianData[quanJuIndex].aver">-</i>
                                    <i v-show="sbItem.aver > bianData[quanJuIndex].aver" class="el-icon-top"></i>
                                </span>
                            </li>
                        </ul>
                    </div> -->
                </div>
                <div class="bd_r_bottom">
                    <div class="bd_l_t_title" flex="cross:center">
                        <i></i>
                        <div class="imgwai">
                            <img src="../common/comImg/index/r2.gif" alt="" />
                        </div>

                        <div flex="cross:baseline">
                            <span class="bd_l_t_t_tong">实时状态</span>
                            <span class="bd_l_t_t_ying">REAL TIME STATUS</span>
                        </div>
                    </div>
                    <div class="bd_r_b_tai">
                        <ul flex flex-wrap>
                            <li flex="dir:top main:center">
                                <div class="db_yx">运行</div>
                                <div class="db_tn">
                                    <span :class="[bs == true ? 'bianse' : '']">
                                        <countTo :startVal="yxOld" :endVal="yx" :duration="duration"></countTo>
                                    </span>
                                    <span class="db_tai">台</span>
                                </div>
                            </li>
                            <li flex="dir:top main:center">
                                <div class="db_yx">手动</div>
                                <div class="db_tn">
                                    <span :class="[bs1 == true ? 'bianse' : '']">
                                        <countTo :startVal="sdOld" :endVal="sd" :duration="duration"></countTo>
                                    </span>
                                    <span class="db_tai">台</span>
                                </div>
                            </li>
                            <li flex="dir:top main:center">
                                <div class="db_yx">复位</div>
                                <div class="db_tn">
                                    <span :class="[bs2 == true ? 'bianse' : '']">
                                        <countTo :startVal="fwOld" :endVal="fw" :duration="duration"></countTo>
                                    </span>
                                    <span class="db_tai">台</span>
                                </div>
                            </li>
                            <li flex="dir:top main:center">
                                <div class="db_yx">停止</div>
                                <div class="db_tn">
                                    <span :class="[bs3 == true ? 'bianse' : '']">
                                        <countTo :startVal="tzOld" :endVal="tz" :duration="duration"></countTo>
                                    </span>
                                    <span class="db_tai">台</span>
                                </div>
                            </li>
                            <li flex="dir:top main:center">
                                <div class="db_yx">离线</div>
                                <div class="db_tn">
                                    <span :class="[bs4 == true ? 'bianse' : '']">
                                        <countTo :startVal="lxOld" :endVal="lx" :duration="duration"></countTo>
                                    </span>
                                    <span class="db_tai">台</span>
                                </div>
                            </li>

                            <li flex="dir:top main:center">
                                <div class="db_yx">暂停</div>
                                <div class="db_tn">
                                    <span :class="[bs5 == true ? 'bianse' : '']">
                                        <countTo :startVal="ztOld" :endVal="zt" :duration="duration"></countTo>
                                    </span>
                                    <span class="db_tai">台</span>
                                </div>
                            </li>
                            <li flex="dir:top main:center">
                                <div class="db_yx">开机</div>
                                <div class="db_tn">
                                    <span :class="[bs6 == true ? 'bianse' : '']">
                                        <countTo :startVal="kjOld" :endVal="kj" :duration="duration"></countTo>
                                    </span>
                                    <span class="db_tai">台</span>
                                </div>
                            </li>
                            <li flex="dir:top main:center">
                                <div class="db_yx">回原点</div>
                                <div class="db_tn">
                                    <span :class="[bs7 == true ? 'bianse' : '']">
                                        <countTo :startVal="hydOld" :endVal="hyd" :duration="duration"></countTo>
                                    </span>
                                    <span class="db_tai">台</span>
                                </div>
                            </li>
                            <li flex="dir:top main:center">
                                <div class="db_yx">预热</div>
                                <div class="db_tn">
                                    <span :class="[bs8 == true ? 'bianse' : '']">
                                        <countTo :startVal="yrOld" :endVal="yr" :duration="duration"></countTo>
                                    </span>
                                    <span class="db_tai">台</span>
                                </div>
                            </li>
                            <li flex="dir:top main:center">
                                <div class="db_yx">拉水平</div>
                                <div class="db_tn">
                                    <span :class="[bs9 == true ? 'bianse' : '']">
                                        <countTo :startVal="lspOld" :endVal="lsp" :duration="duration"></countTo>
                                    </span>
                                    <span class="db_tai">台</span>
                                </div>
                            </li>
                            <li flex="dir:top main:center">
                                <div class="db_yx">打表分中</div>
                                <div class="db_tn">
                                    <span :class="[bs10 == true ? 'bianse' : '']">
                                        <countTo :startVal="dbfzOld" :endVal="dbfz" :duration="duration"></countTo>
                                    </span>
                                    <span class="db_tai">台</span>
                                </div>
                            </li>

                            <li flex="dir:top main:center">
                                <div class="db_yx">换刀对刀</div>
                                <div class="db_tn">
                                    <span :class="[bs11 == true ? 'bianse' : '']">
                                        <countTo :startVal="hdddOld" :endVal="hddd" :duration="duration"></countTo>
                                    </span>
                                    <span class="db_tai">台</span>
                                </div>
                            </li>
                            <li flex="dir:top main:center">
                                <div class="db_yx">换程序</div>
                                <div class="db_tn">
                                    <span :class="[bs12 == true ? 'bianse' : '']">
                                        <countTo :startVal="hcxOld" :endVal="hcx" :duration="duration"></countTo>
                                    </span>
                                    <span class="db_tai">台</span>
                                </div>
                            </li>
                            <li flex="dir:top main:center">
                                <div class="db_yx">检查</div>
                                <div class="db_tn">
                                    <span :class="[bs13 == true ? 'bianse' : '']">
                                        <countTo :startVal="jcOld" :endVal="jc" :duration="duration"></countTo>
                                    </span>
                                    <span class="db_tai">台</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import echarts from 'echarts';
import countTo from 'vue-count-to';
// import { Get_status_count_list } from '../../api/api';
import { Get_all_device_timelength, Get_All_query_beilv } from '../../api/bdApi';
export default {
    components: { countTo },
    data() {
        return {
            nowDate: '',
            nowTime: '',
            nowWeek: '',
            percentage: 20,
            customColor: '#40D8FD',
            percentage2: 50,
            customColor2: '#607B8A',
            allNum: 0,
            allNumOld: 0,
            yunxingNum: 0,
            yunxingNumOld: 0,
            lixianNum: 0,
            lixianNumOld: 0,
            tingzhiNum: 0,
            tingzhiNumOld: 0,
            yunxing: 0,
            yunxingOld: 0,
            shebei: 0,
            shebeiOld: 0,
            qiye: 0,
            qiyeOld: 0,
            allsbItem: [],
            allsbItem2: [],
            duration: 3000,

            zrs: 0,
            zrsOld: 0,
            zsg: 0,
            zsgOld: 0,
            mqyave: 0,
            mqyaveOld: 0,

            newsattus: {},
            oldsattus: {},

            yx: 0,
            sd: 0,
            fw: 0,
            tz: 0,
            lx: 0,
            zt: 0,
            kj: 0,
            hyd: 0,
            yr: 0,
            lsp: 0,
            dbfz: 0,
            hddd: 0,
            hcx: 0,
            jc: 0,

            yxOld: 0,
            sdOld: 0,
            fwOld: 0,
            tzOld: 0,
            lxOld: 0,
            ztOld: 0,
            kjOld: 0,
            hydOld: 0,
            yrOld: 0,
            lspOld: 0,
            dbfzOld: 0,
            hdddOld: 0,
            hcxOld: 0,
            jcOld: 0,

            jiqiArres: [],

            com_list: [],
            bianData: [],
            quanJuIndex: 0,
            sgrsdb: 0,
            // 记录上一次的值 数组
            old_count_Arr: [],
            bs: false,
            bs1: false,
            bs2: false,
            bs3: false,
            bs4: false,
            bs5: false,
            bs6: false,
            bs7: false,
            bs8: false,
            bs9: false,
            bs10: false,
            bs11: false,
            bs12: false,
            bs13: false,
            jiqiArresOld: []
        };
    },
    mounted() {
        document.getElementById('app').style.background = 'transparent';

        function resizeFont() {
            //获取屏幕宽度
            let clientWidth = document.documentElement.clientWidth || document.body.clientWidth; //设计图参考宽度
            let design = 1920;
            if (clientWidth <= 820) {
                let rem = 820 / 19.2;
                document.getElementsByTagName('html').item(0).style.fontSize = rem + 'px';
            } else {
                // if (clientWidth > 1920)
                //     document.getElementsByTagName('html').item(0).style.fontSize = '92px';
                // else
                document.getElementsByTagName('html').item(0).style.fontSize = (clientWidth / design) * 95.5 + 'px';
            }
        }
        resizeFont();
        window.onresize = function () {
            resizeFont();
        };

        // 页面加载完后显示当前时间
        this.dealWithTime(new Date());
        // 定时刷新时间
        this.timerDealWithTime = setInterval(() => {
            this.dealWithTime(new Date()); // 修改数据date
        }, 500);

        this.init();
        this.fiveTimer = setInterval(() => {
            this.init();
        }, 60000);
        this.bigDataRunStatus();
        this.shishiTimer = setInterval(() => {
            // 运行状态new1
            this.bigDataRunStatus();
        }, 2000);

        // this.getGet_status_count_list();
        // this.stateTimer = setInterval(() => {
        //     this.getGet_status_count_list();
        // }, 5000);

        // this.$refs.count1.start()
    },
    computed: {},
    watch: {
        allNum: {
            handler(val, oldVal) {
                this.allNumOld = oldVal;
            },
            deep: true
        },
        yunxingNum: {
            handler(val, oldVal) {
                this.yunxingNumOld = oldVal;
            },
            deep: true
        },
        lixianNum: {
            handler(val, oldVal) {
                this.lixianNumOld = oldVal;
            },
            deep: true
        },
        tingzhiNum: {
            handler(val, oldVal) {
                this.tingzhiNumOld = oldVal;
            },
            deep: true
        },
        // yunxing:0,
        //     shebei:0,
        //     qiye:0
        yunxing: {
            handler(val, oldVal) {
                this.yunxingOld = oldVal;
            },
            deep: true
        },
        shebei: {
            handler(val, oldVal) {
                this.shebeiOld = oldVal;
            },
            deep: true
        },
        qiye: {
            handler(val, oldVal) {
                this.qiyeOld = oldVal;
            },
            deep: true
        },
        // zrs:0,
        //     zsg:0,
        //     mqyave:0
        zrs: {
            handler(val, oldVal) {
                this.zrsOld = oldVal;
            },
            deep: true
        },
        zsg: {
            handler(val, oldVal) {
                this.zsgOld = oldVal;
            },
            deep: true
        },
        mqyave: {
            handler(val, oldVal) {
                this.mqyaveOld = oldVal;
            },
            deep: true
        },
        // yx:0,
        //     sd:0,
        //     fw:0,
        //     tz:0,
        //     lx:0,

        //     zt:0,
        //     kj:0,
        //     hyd:0,
        //     yr:0,
        //     lsp:0,

        //     dbfz:0,
        //     hddd:0,
        //     hcx:0,
        //     jc:0,
        yx: {
            handler(val, oldVal) {
                this.yxOld = oldVal;
                if (this.stateTimeryx) {
                    clearInterval(this.stateTimeryx);
                }
                this.bs = true;
                this.stateTimeryx = setInterval(() => {
                    this.bs = false;
                }, 3000);
            },
            deep: true
        },
        sd: {
            handler(val, oldVal) {
                this.sdOld = oldVal;
                if (this.stateTimeryx1) {
                    clearInterval(this.stateTimeryx1);
                }
                this.bs1 = true;
                this.stateTimeryx1 = setInterval(() => {
                    this.bs1 = false;
                }, 3000);
            },
            deep: true
        },
        fw: {
            handler(val, oldVal) {
                this.fwOld = oldVal;
                if (this.stateTimeryx2) {
                    clearInterval(this.stateTimeryx2);
                }
                this.bs2 = true;
                this.stateTimeryx2 = setInterval(() => {
                    this.bs2 = false;
                }, 3000);
            },
            deep: true
        },
        tz: {
            handler(val, oldVal) {
                this.tzOld = oldVal;
                if (this.stateTimeryx3) {
                    clearInterval(this.stateTimeryx3);
                }
                this.bs3 = true;
                this.stateTimeryx3 = setInterval(() => {
                    this.bs3 = false;
                }, 3000);
            },
            deep: true
        },
        lx: {
            handler(val, oldVal) {
                this.lxOld = oldVal;
                if (this.stateTimeryx4) {
                    clearInterval(this.stateTimeryx4);
                }
                this.bs4 = true;
                this.stateTimeryx4 = setInterval(() => {
                    this.bs4 = false;
                }, 3000);
            },
            deep: true
        },

        zt: {
            handler(val, oldVal) {
                this.ztOld = oldVal;
                if (this.stateTimeryx5) {
                    clearInterval(this.stateTimeryx5);
                }
                this.bs5 = true;
                this.stateTimeryx5 = setInterval(() => {
                    this.bs5 = false;
                }, 3000);
            },
            deep: true
        },
        kj: {
            handler(val, oldVal) {
                this.kjOld = oldVal;
                if (this.stateTimeryx6) {
                    clearInterval(this.stateTimeryx6);
                }
                this.bs6 = true;
                this.stateTimeryx6 = setInterval(() => {
                    this.bs6 = false;
                }, 3000);
            },
            deep: true
        },
        hyd: {
            handler(val, oldVal) {
                this.hydOld = oldVal;
                if (this.stateTimeryx7) {
                    clearInterval(this.stateTimeryx7);
                }
                this.bs7 = true;
                this.stateTimeryx7 = setInterval(() => {
                    this.bs7 = false;
                }, 3000);
            },
            deep: true
        },
        yr: {
            handler(val, oldVal) {
                this.yrOld = oldVal;
                if (this.stateTimeryx8) {
                    clearInterval(this.stateTimeryx8);
                }
                this.bs8 = true;
                this.stateTimeryx8 = setInterval(() => {
                    this.bs8 = false;
                }, 3000);
            },
            deep: true
        },
        lsp: {
            handler(val, oldVal) {
                this.lspOld = oldVal;
                if (this.stateTimeryx9) {
                    clearInterval(this.stateTimeryx9);
                }
                this.bs9 = true;
                this.stateTimeryx9 = setInterval(() => {
                    this.bs9 = false;
                }, 3000);
            },
            deep: true
        },

        dbfz: {
            handler(val, oldVal) {
                this.dbfzOld = oldVal;
                if (this.stateTimeryx10) {
                    clearInterval(this.stateTimeryx10);
                }
                this.bs10 = true;
                this.stateTimeryx10 = setInterval(() => {
                    this.bs10 = false;
                }, 3000);
            },
            deep: true
        },
        hddd: {
            handler(val, oldVal) {
                this.hdddOld = oldVal;
                if (this.stateTimeryx11) {
                    clearInterval(this.stateTimeryx11);
                }
                this.bs11 = true;
                this.stateTimeryx11 = setInterval(() => {
                    this.bs11 = false;
                }, 3000);
            },
            deep: true
        },
        hcx: {
            handler(val, oldVal) {
                this.hcxOld = oldVal;
                if (this.stateTimeryx12) {
                    clearInterval(this.stateTimeryx12);
                }
                this.bs12 = true;
                this.stateTimeryx12 = setInterval(() => {
                    this.bs12 = false;
                }, 3000);
            },
            deep: true
        },
        jc: {
            handler(val, oldVal) {
                this.jcOld = oldVal;
                if (this.stateTimeryx113) {
                    clearInterval(this.stateTimeryx113);
                }
                this.bs13 = true;
                this.stateTimeryx113 = setInterval(() => {
                    this.bs13 = false;
                }, 3000);
            },
            deep: true
        }

        // jiqiArres: {
        //     handler(val, oldVal) {

        //     },
        //     deep: true
        // }
    },
    methods: {
        init() {
            // this.getGet_all_device_timelength();
            // this.getGet_All_query_beilv();

            // 运行时长
            this.bigDataDataRunTime();
            // 上工人数
            this.bigDataDataWorker();
            // 运行效率
            this.bigDataFeedrateOverride();
        },
        bigDataRunStatus() {
            let params = {};
            this.$axios.post('https://api.moldcube.com:8101/api/BigData/RunStatus', params).then((res) => {
                let { ReturnCode, Data } = res.data;
                if (ReturnCode == 200) {
                    this.allNum = Data.StatusALL;
                    this.lixianNum = Data.StatusOffLine;
                    this.tingzhiNum = Data.StatusStop;
                    this.yunxingNum = Data.StatusRun;
                    this.jiqiArres = Data.Detial;
                    for (let i = 0; i < this.jiqiArres.length; i++) {
                        if (this.jiqiArres[i].RunStatus == 2) {
                            this.yx = this.jiqiArres[i].Count;
                        }
                        if (this.jiqiArres[i].RunStatus == 99) {
                            this.sd = this.jiqiArres[i].Count;
                        }
                        if (this.jiqiArres[i].RunStatus == 0) {
                            this.fw = this.jiqiArres[i].Count;
                        }
                        if (this.jiqiArres[i].RunStatus == 1) {
                            this.tz = this.jiqiArres[i].Count;
                        }
                        if (this.jiqiArres[i].RunStatus == -1) {
                            this.lx = this.jiqiArres[i].Count;
                        }
                        if (this.jiqiArres[i].RunStatus == 3) {
                            this.zt = this.jiqiArres[i].Count;
                        }
                        if (this.jiqiArres[i].RunStatus == 4) {
                            this.kj = this.jiqiArres[i].Count;
                        }
                        if (this.jiqiArres[i].RunStatus == 5) {
                            this.hyd = this.jiqiArres[i].Count;
                        }
                        if (this.jiqiArres[i].RunStatus == 6) {
                            this.yr = this.jiqiArres[i].Count;
                        }
                        if (this.jiqiArres[i].RunStatus == 7) {
                            this.lsp = this.jiqiArres[i].Count;
                        }
                        if (this.jiqiArres[i].RunStatus == 8) {
                            this.dbfz = this.jiqiArres[i].Count;
                        }
                        if (this.jiqiArres[i].RunStatus == 9) {
                            this.hddd = this.jiqiArres[i].Count;
                        }
                        if (this.jiqiArres[i].RunStatus == 10) {
                            this.hcx = this.jiqiArres[i].Count;
                        }
                        if (this.jiqiArres[i].RunStatus == 11) {
                            this.jc = this.jiqiArres[i].Count;
                        }
                    }
                }
            });
        },
        bigDataDataRunTime() {
            let params = {};
            this.$axios.post('https://api.moldcube.com:8101/api/BigData/DataRunTime', params).then((res) => {
                let { ReturnCode, Data } = res.data;
                if (ReturnCode == 200) {
                    this.yunxing = Number(Data.Total / 3600);
                    this.shebei = Number(Data.TotalAve2 / 3600);
                    this.qiye = Number(Data.TotalAve / 3600);
                    this.allsbItem2 = Data.Detial;

                    let xiuxi = Math.round(Number(this.zrs)) - Math.round(Number(this.zsg));
                    this.sgBing(Math.round(Number(this.zsg)), xiuxi);
                }
            });
        },
        bigDataDataWorker() {
            let params = {};
            this.$axios.post('https://api.moldcube.com:8101/api/BigData/DataWorker', params).then((res) => {
                let { ReturnCode, Data } = res.data;
                if (ReturnCode == 200) {
                    this.zrs = Data.Total;
                    this.mqyave = Data.TotalAve;
                    this.zsg = Data.TotalAve2;

                    this.allsbItem = Data.Detial;

                    let xiuxi = Math.round(Number(this.zrs)) - Math.round(Number(this.zsg));
                    this.sgBing(Math.round(Number(this.zsg)), xiuxi);

                    this.sgrsdb = Number(Data.TotalAve);
                }
            });
        },
        bigDataFeedrateOverride() {
            let params = {};
            this.$axios.post('https://api.moldcube.com:8101/api/BigData/FeedrateOverride', params).then((res) => {
                let { ReturnCode, Data } = res.data;
                if (ReturnCode == 200) {
                    this.bianData = Data;
                    let xZhou = [];
                    let yZhou = [];

                    for (let i = 0; i < Data.Detial.length; i++) {
                        xZhou.push('企业' + (i + 1));
                        yZhou.push(Data.Detial[i].Ave);
                    }

                    for (let index = 0; index < yZhou.length % 10; index++) {
                        xZhou.push('');
                        yZhou.push('');
                    }
                    this.yZhou = yZhou;
                    this.echartsBig(xZhou, yZhou, this.bianData);
                    // this.com_list = Data[0].com_list;
                }
            });
        },
        dealWithTime(data) {
            // 获取当前时间
            let formatDateTime;
            let Y = data.getFullYear();
            let M = data.getMonth() + 1 < 10 ? '0' + (data.getMonth() + 1) : data.getMonth() + 1;
            let D = data.getDate() < 10 ? '0' + data.getDate() : data.getDate();
            let H = data.getHours();
            let Min = data.getMinutes();
            let S = data.getSeconds();
            let W = data.getDay();
            H = H < 10 ? '0' + H : H;
            Min = Min < 10 ? '0' + Min : Min;
            S = S < 10 ? '0' + S : S;
            switch (W) {
                case 0:
                    W = '日';
                    break;
                case 1:
                    W = '一';
                    break;
                case 2:
                    W = '二';
                    break;
                case 3:
                    W = '三';
                    break;
                case 4:
                    W = '四';
                    break;
                case 5:
                    W = '五';
                    break;
                case 6:
                    W = '六';
                    break;
                default:
                    break;
            }
            this.nowDate = Y + '-' + M + '-' + D;
            this.nowWeek = '星期' + W;
            this.nowTime = H + ':' + Min;
            // + ":" + S;
            // formatDateTime = Y + "年" + M + "月" + D + "日 " + " 周" +W + H + ":" + Min + ":" + S;
        },

        echartsBig(x, y, bianData) {
            let this_ = this;
            this_.myChart1 = echarts.init(document.getElementById('zheXian'));
            let resizeTimer = null;
            let option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                    formatter: function (params) {
                        var relVal = params[0].name;
                        for (var i = 0, l = params.length; i < l; i++) {
                            relVal += '<br/>' + '平均倍率：' + params[i].value + '%';
                        }
                        return relVal;
                    }
                },

                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: x,
                    axisLine: {
                        lineStyle: {
                            color: '#334457' //X轴的颜色
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#7B819B', //x轴文字颜色
                            fontSize: '12'
                        }
                    },
                    axisTick: {
                        //x轴刻度线
                        show: false
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLine: {
                        lineStyle: {
                            color: '#334457' //y轴的颜色
                        }
                    },
                    splitLine: {
                        show: true, //虽然是y轴  但是是横线
                        lineStyle: {
                            color: ['#272F52'],
                            width: 1,
                            type: 'solid'
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#7B819B',
                            fontSize: '12'
                        }
                    },
                    nameTextStyle: {
                        color: ['#8798FF']
                    },
                    axisTick: {
                        //y轴刻度线
                        show: false
                    }
                },
                dataZoom: [
                    //滑动条
                    {
                        show: false,
                        type: 'slider',
                        realtime: true,
                        startValue: 0,
                        endValue: 9,
                        xAxisIndex: [0]
                        // bottom: '8',
                        // left: '30',
                        // height: 5,
                        // borderColor: 'rgba(0,0,0,0)',
                        // textStyle: {
                        //     color: '#05D5FF'
                        // }
                    }
                ],
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '10%',
                    top: '10%',
                    containLabel: true
                },
                series: [
                    {
                        name: '平均倍率',
                        type: 'line',
                        smooth: true,
                        symbolSize: 8,
                        data: y,
                        label: {
                            formatter: '{c}' + '%',
                            show: true,
                            position: 'top',
                            textStyle: {
                                fontWeight: '400',
                                fontSize: '12',
                                color: '#fff'
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#66E1FB',
                                lineStyle: {
                                    color: '#66E1FB'
                                }
                            }
                        },
                        areaStyle: {
                            //渐变色
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: 'rgba(102, 225, 251, 0.3)'
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(102, 225, 251, 0.1)'
                                }
                            ])
                        }
                    }
                ]
            };
            this_.myChart1.setOption(option);

            // click  鼠标聚焦mouseover mouseout
            // this_.myChart1.on('click', function (params) {
            //     let bijiao = params.name.split('时')[0];
            //     for (let i = 0; i < bianData.length; i++) {
            //         if (bijiao == bianData[i].hours) {
            //             this_.com_list = bianData[i].com_list;
            //             this_.quanJuIndex = i;
            //             // this_.$forceUpdate();
            //         }
            //     }
            // });
            this.option2 = option;

            window.addEventListener('resize', () => {
                if (resizeTimer) clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    this_.myChart1.resize();
                }, 100);
            });
            this.setIntervalAll();
        },
        //划入
        mouseoveAl() {
            clearInterval(this.setInterValAl);
        },
        //划出
        mouseleaveAl() {
            this.setIntervalAll();
        },
        setIntervalAll() {
            clearInterval(this.setInterValAl);
            this.setInterValAl = setInterval(() => {
                // 每次向后滚动一个，最后一个从头开始。
                if (this.option2.dataZoom[0].endValue >= this.yZhou.length - 1) {
                    this.option2.dataZoom[0].endValue = 9;
                    this.option2.dataZoom[0].startValue = 0;
                } else {
                    this.option2.dataZoom[0].endValue = this.option2.dataZoom[0].endValue + 10;
                    this.option2.dataZoom[0].startValue = this.option2.dataZoom[0].startValue + 10;
                }
                this.myChart1.setOption(this.option2);
            }, 10000);
        },
        sgBing(x, y) {
            let this_ = this;
            this_.myChart2 = echarts.init(document.getElementById('sgBing'));
            let resizeTimer1 = null;
            let option = {
                tooltip: {
                    trigger: 'item'
                },
                // legend: {
                //     orient: 'vertical',
                //     right: 10,
                //     top: 25,
                //     bottom: 20,
                //     icon: 'circle',
                //     padding: [10, 0],
                //     itemGap: 35
                // },
                series: [
                    {
                        type: 'pie',
                        radius: '70%',
                        data: [
                            { value: x, name: '上工人数', itemStyle: { color: '#40D8FD' } },
                            { value: y, name: '休息人数', itemStyle: { color: '#607B8A' } }
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            this_.myChart2.setOption(option);

            window.addEventListener('resize', () => {
                if (resizeTimer1) clearTimeout(resizeTimer1);
                resizeTimer1 = setTimeout(() => {
                    this_.myChart2.resize();
                }, 100);
            });
        },

        getGet_status_count_list() {
            this.$axios.get(`https://api.moldcube.com/api/dbcomp/Get_status_count_list?compid=0&room=0&auth=go`).then((res) => {
                let { ReturnCode, Data } = res.data;
                if (ReturnCode == 200) {
                    this.jiqiArr = Data;
                    this.jiqiArres = Data;

                    for (let i = 0; i < this.jiqiArres.length; i++) {
                        if (this.jiqiArres[i].runstatus == 2) {
                            this.yx = this.jiqiArres[i].count;
                        }
                        if (this.jiqiArres[i].runstatus == 99) {
                            this.sd = this.jiqiArres[i].count;
                        }
                        if (this.jiqiArres[i].runstatus == 0) {
                            this.fw = this.jiqiArres[i].count;
                        }
                        if (this.jiqiArres[i].runstatus == 1) {
                            this.tz = this.jiqiArres[i].count;
                        }
                        if (this.jiqiArres[i].runstatus == -1) {
                            this.lx = this.jiqiArres[i].count;
                        }
                        if (this.jiqiArres[i].runstatus == 3) {
                            this.zt = this.jiqiArres[i].count;
                        }
                        if (this.jiqiArres[i].runstatus == 4) {
                            this.kj = this.jiqiArres[i].count;
                        }
                        if (this.jiqiArres[i].runstatus == 5) {
                            this.hyd = this.jiqiArres[i].count;
                        }
                        if (this.jiqiArres[i].runstatus == 6) {
                            this.yr = this.jiqiArres[i].count;
                        }
                        if (this.jiqiArres[i].runstatus == 7) {
                            this.lsp = this.jiqiArres[i].count;
                        }
                        if (this.jiqiArres[i].runstatus == 8) {
                            this.dbfz = this.jiqiArres[i].count;
                        }
                        if (this.jiqiArres[i].runstatus == 9) {
                            this.hddd = this.jiqiArres[i].count;
                        }
                        if (this.jiqiArres[i].runstatus == 10) {
                            this.hcx = this.jiqiArres[i].count;
                        }
                        if (this.jiqiArres[i].runstatus == 11) {
                            this.jc = this.jiqiArres[i].count;
                        }
                    }

                    let allNum = 0;
                    for (let i = 0; i < Data.length; i++) {
                        allNum += Data[i].count;
                    }
                    this.allNum = allNum;
                    for (let i = 0; i < this.jiqiArr.length; i++) {
                        if (this.jiqiArr[i].runstatus == 2) {
                            this.yunxingNum = this.jiqiArr[i].count;
                        } else if (this.jiqiArr[i].runstatus == -1) {
                            this.lixianNum = this.jiqiArr[i].count;
                        }
                    }

                    this.tingzhiNum = this.allNum - this.yunxingNum - this.lixianNum;
                }
            });

            // let params = {
            //     compid: 0,
            //     room: 0,
            //     auth:'go'
            // };
            // Get_status_count_list(params).then((res) => {
            //     const { ReturnCode, Data } = res;
            //     if (ReturnCode == 200) {
            //         this.jiqiArr = Data;
            //         this.jiqiArres = Data;

            //         for(let i=0;i<this.jiqiArres.length;i++){
            //             if(this.jiqiArres[i].runstatus==2){
            //                 this.yx=this.jiqiArres[i].count
            //             }
            //             if(this.jiqiArres[i].runstatus==99){
            //                 this.sd=this.jiqiArres[i].count
            //             }
            //             if(this.jiqiArres[i].runstatus==0){
            //                 this.fw=this.jiqiArres[i].count
            //             }
            //             if(this.jiqiArres[i].runstatus==1){
            //                 this.tz=this.jiqiArres[i].count
            //             }
            //             if(this.jiqiArres[i].runstatus==-1){
            //                 this.lx=this.jiqiArres[i].count
            //             }
            //             if(this.jiqiArres[i].runstatus==3){
            //                 this.zt=this.jiqiArres[i].count
            //             }
            //             if(this.jiqiArres[i].runstatus==4){
            //                 this.kj=this.jiqiArres[i].count
            //             }
            //             if(this.jiqiArres[i].runstatus==5){
            //                 this.hyd=this.jiqiArres[i].count
            //             }
            //             if(this.jiqiArres[i].runstatus==6){
            //                 this.yr=this.jiqiArres[i].count
            //             }
            //             if(this.jiqiArres[i].runstatus==7){
            //                 this.lsp=this.jiqiArres[i].count
            //             }
            //             if(this.jiqiArres[i].runstatus==8){
            //                 this.dbfz=this.jiqiArres[i].count
            //             }
            //             if(this.jiqiArres[i].runstatus==9){
            //                 this.hddd=this.jiqiArres[i].count
            //             }
            //             if(this.jiqiArres[i].runstatus==10){
            //                 this.hcx=this.jiqiArres[i].count
            //             }
            //             if(this.jiqiArres[i].runstatus==11){
            //                 this.jc=this.jiqiArres[i].count
            //             }
            //         }

            //         let allNum = 0;
            //         for (let i = 0; i < Data.length; i++) {
            //             allNum += Data[i].count;
            //         }
            //         this.allNum = allNum;
            //         for (let i = 0; i < this.jiqiArr.length; i++) {
            //             if (this.jiqiArr[i].runstatus == 2) {
            //                 this.yunxingNum = this.jiqiArr[i].count;
            //             } else if (this.jiqiArr[i].runstatus == -1) {
            //                 this.lixianNum = this.jiqiArr[i].count;
            //             }
            //         }

            //         this.tingzhiNum = this.allNum - this.yunxingNum - this.lixianNum;
            //     }
            // });
        },
        getGet_all_device_timelength() {
            let params = {
                begintime: this.nowDate,
                auth: 'go'
            };
            this.$axios.post('https://api.moldcube.com/api/allquery/Get_all_device_timelength', params).then((res) => {
                let { ReturnCode, Data } = res.data;
                if (ReturnCode == 200) {
                    this.yunxing = Number(Data.all_run_timeslengths.split(':')[0]);
                    this.shebei = Number(Data.all_run_aver_timelengths.split(':')[0]);
                    this.qiye = Number(Data.all_comp_aver_timelengths.split(':')[0]);
                    this.allsbItem = Data.item;

                    this.zrs = Data.all_emp_count;
                    this.zsg = Data.all_active_emp_count;
                    this.mqyave = Data.all_emp_aver_count;

                    this.percentage = Data.all_active_emp_bi;
                    this.percentage2 = Data.all_aver_emp_bi;

                    let xiuxi = Math.round(Number(this.zrs)) - Math.round(Number(this.zsg));
                    this.sgBing(Math.round(Number(this.zsg)), xiuxi);

                    this.sgrsdb = Number(Data.all_comp_aver_active_emp_count);
                }
            });

            // let params = {
            //     begintime: this.nowDate,
            //     auth: 'go'
            // };
            // Get_all_device_timelength(params).then((res) => {
            //     const { ReturnCode, Data } = res;
            //     if (ReturnCode == 200) {
            //         this.yunxing = Number(Data.all_run_timeslengths.split(':')[0]);
            //         this.shebei = Number(Data.all_run_aver_timelengths.split(':')[0]);
            //         this.qiye = Number(Data.all_comp_aver_timelengths.split(':')[0]);
            //         this.allsbItem = Data.item;

            //         this.zrs = Data.all_emp_count;
            //         this.zsg = Data.all_active_emp_count;
            //         this.mqyave = Data.all_emp_aver_count;

            //         this.percentage = Data.all_active_emp_bi;
            //         this.percentage2 = Data.all_aver_emp_bi;

            //         let xiuxi = Math.round(Number(this.zrs)) - Math.round(Number(this.zsg));
            //         this.sgBing(Math.round(Number(this.zsg)), xiuxi);

            //         this.sgrsdb = Number(Data.all_comp_aver_active_emp_count);
            //     }
            // });
        },

        getGet_All_query_beilv() {
            let params = {
                begintime: this.nowDate,
                auth: 'go'
            };
            this.$axios.post('https://api.moldcube.com/api/allquery/Get_All_query_beilv', params).then((res) => {
                let { ReturnCode, Data } = res.data;
                if (ReturnCode == 200) {
                    this.bianData = Data;
                    let xZhou = [];
                    let yZhou = [];

                    for (let i = 0; i < Data.length; i++) {
                        xZhou.push(Data[i].hours + '时');
                        yZhou.push(Data[i].aver);
                        // if(Number(Data[i].hours.split('-')[0]) < nowt&&nowt <=Number(Data[i].hours.split('-')[1])){
                        // this.com_list=Data[0].com_list
                        // }
                    }
                    // this.yZhou=yZhou
                    this.echartsBig(xZhou, yZhou, this.bianData);
                    this.com_list = Data[0].com_list;
                }
            });

            // let params = {
            //     begintime: this.nowDate,
            //     auth: 'go'
            // };
            // Get_All_query_beilv(params).then((res) => {
            //     const { ReturnCode, Data } = res;
            //     if (ReturnCode == 200) {
            //         this.bianData = Data;
            //         let xZhou = [];
            //         let yZhou = [];

            //         for (let i = 0; i < Data.length; i++) {
            //             xZhou.push(Data[i].hours + '时');
            //             yZhou.push(Data[i].aver);
            //             // if(Number(Data[i].hours.split('-')[0]) < nowt&&nowt <=Number(Data[i].hours.split('-')[1])){
            //             // this.com_list=Data[0].com_list
            //             // }
            //         }
            //         this.echartsBig(xZhou, yZhou, this.bianData);
            //         this.com_list = Data[0].com_list;
            //     }
            // });
        }
    },
    created() {},

    beforeCreate() {},
    beforeMount() {},
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed() {
        if (this.timerDealWithTime) {
            clearInterval(this.timerDealWithTime);
        }
        if (this.fiveTimer) {
            clearInterval(this.fiveTimer);
        }
        if (this.stateTimer) {
            clearInterval(this.stateTimer);
        }
        if (this.shishiTimer) {
            clearInterval(this.shishiTimer);
        }
        if (this.setInterValAl) {
            clearInterval(this.setInterValAl);
        }
    },
    activated() {}
};
</script>
<style lang='scss'>
.proDouble {
    .el-progress {
        .el-progress-bar__outer {
            background-color: #08212e;
        }
        .el-progress-bar {
            padding-right: 0.2rem;
        }
        .el-progress__text {
            font-size: 0.14rem;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #ffffff;
            display: none;
        }
    }
}

.bianse {
    color: #ffd200;
}
</style>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>