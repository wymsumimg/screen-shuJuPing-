<template>
    <div class="homePageIndex themeBg">
        <!-- 这是首页 -->
        <div class="homePageTitle" flex="cross:center main:justify">
            <div flex="cross:center ">
                <comp-logo :comp_id="comp_id"></comp-logo>
                <title-check :num="checkNum"></title-check>

                <ban-ci
                    ref="child"
                    @dateValue="dateValueChange"
                    @begintime="begintimeChange"
                    @endtime="endtimeChange"
                    @checkIndex="checkIndexChange"
                    @checkList="checkListChange"
                    @checkListTitle="checkListTitleChange"
                    @bcTime="bcTimeChange"
                    @banciDio="banciDioChange"
                ></ban-ci>
                <div v-if="!checkIndex || checkIndex == 3" class="showTimeqj" @click="showDio">
                    {{ begintime }}&nbsp;-&nbsp;{{ endtime }}
                </div>
                <!-- <div class="allStatusClass" style="margin: 0 20px 0 0">
                    <el-select
                        v-model="guoLvShiJian"
                        @change="getchangeGl"
                        :popper-append-to-body="false"
                        :placeholder="$t('menu.shaixuanshijian')"
                        clearable
                    >
                        <el-option v-for="item in guoLvShiJianArr" :key="item.value" :label="item.value" :value="item.id"> </el-option>
                    </el-select>
                </div> -->
                <!-- <date-com @childFn='parentFn' :dateValue='dateValue' ></date-com> -->
                <!-- <div class="DateChoose" :class="{ zhanweiColor: zhanweiColor }">
                    
                    <el-date-picker
                        @change="changeDate"
                        @focus="focusDate"
                        @blur="blurDate"
                        v-model="dateValue"
                        type="datetimerange"
                        range-separator="-"
                        :clearable="false"
                        format="yyyy-MM-dd HH:mm"
                        value-format="yyyy-MM-dd HH:mm"
                        :picker-options="pickerOptions"
                    >
                    </el-date-picker>
                    <i class="el-icon-circle-close closeIcon" @click="clearTime"></i>
                </div> -->

                <button class="chooseBtn" @click="chooseSearch()" style="margin-left: 0.2rem">{{ $t('menu.search') }}</button>
            </div>
            <div style="margin-right: 0.1rem" flex="cross:center">
                <div style="margin-right: 0.2rem">
                    <div class="bcbian" flex="cross:center main:center" style="margin-top: 0.25rem">
                        <button class="chooseBtntxt" @click="showDio">{{ $t('menu.setBanci') }}</button>
                    </div>
                </div>
                <div>
                    <title-time :currentTime="currentTime" :num="num"></title-time>
                    <set-login @showmiao="showmiao"></set-login>
                </div>
            </div>
        </div>

        <div class="homePageBody">
            <!-- 上半部分 -->
            <div flex="main:justify">
                <div class="b_left" v-if="login_staus <= 2">
                    <number-machines
                        :jiqiArr="jiqiArr"
                        :allNum="allNum"
                        :allBg="allBg"
                        @jiqic="jiqic"
                        @jiqiArrc="jiqiArrc"
                        :nm="1"
                    ></number-machines>

                    <div class="chejian" flex="main:justify">
                        <indexTable
                            :tableData="tableData"
                            :threeBox="threeBox"
                            :oneFixSixArrColor="oneFixSixArrColor"
                            style="width: 43%"
                            v-loading="loadingIT"
                            element-loading-background="transparent"
                        ></indexTable>

                        <div class="chejianYunxing chejianYunxing1">
                            <div class="chejianYunxing_top">
                                {{ $t('menu.shopOperationComparison')
                                }}<span style="font-size: 0.1rem">&nbsp;&nbsp;{{ $t('menu.unitHour') }}</span>
                            </div>
                            <div>
                                <div
                                    id="numEcharts"
                                    ref="numEcharts"
                                    class="leftEcharts"
                                    style="height: 3.4rem"
                                    v-loading="loadingCJ"
                                    element-loading-background="transparent"
                                ></div>
                            </div>
                        </div>
                    </div>

                    <div class="autoScoll" flex="main:justify" style="margin-top: 0.15rem">
                        <status-table
                            :twoRoom1="twoRoom1"
                            :chaoshi="chaoshi1"
                            :tableHeight="3.88"
                            style="width: 32.5%"
                            @autoFnTrue="autoFnTrue"
                            @autoFnFalse="autoFnFalse"
                            :twoRoomHearder1="twoRoomHearder1"
                            :twoRoomTitle1="twoRoomTitle1"
                            :autoplay="autoplay"
                            :comp_id="comp_id"
                            v-loading="loadingYX"
                            element-loading-background="transparent"
                        ></status-table>

                        <status-table
                            :twoRoom1="twoRoom2"
                            :chaoshi="chaoshi2"
                            :tableHeight="3.88"
                            style="width: 32.5%"
                            @autoFnTrue="autoFnTrue"
                            @autoFnFalse="autoFnFalse"
                            :twoRoomHearder1="twoRoomHearder2"
                            :twoRoomTitle1="twoRoomTitle2"
                            :autoplay="autoplay"
                            :comp_id="comp_id"
                            v-loading="loadingYX"
                            element-loading-background="transparent"
                        ></status-table>

                        <status-table
                            :twoRoom1="twoRoom3"
                            :chaoshi="chaoshi3"
                            :tableHeight="3.88"
                            style="width: 32.5%"
                            @autoFnTrue="autoFnTrue"
                            @autoFnFalse="autoFnFalse"
                            :twoRoomHearder1="twoRoomHearder3"
                            :twoRoomTitle1="twoRoomTitle3"
                            :autoplay="autoplay"
                            :comp_id="comp_id"
                            v-loading="loadingYX"
                            element-loading-background="transparent"
                        ></status-table>
                    </div>
                </div>
                <div class="b_left3" flex v-if="login_staus > 2">
                    <div class="bl3_she">
                        <div class="bl3_she_t">
                            <div class="chejianYunxing_top">{{ $t('menu.totalEquipment') }}（{{ allNum }}{{ $t('menu.tai') }}）</div>
                            <number-machines
                                :jiqiArr="jiqiArr"
                                :allNum="allNum"
                                :allBg="allBg"
                                @jiqic="jiqic"
                                @jiqiArrc="jiqiArrc"
                                :nm="2"
                                v-loading="loadingmach"
                                element-loading-background="transparent"
                            ></number-machines>
                        </div>
                        <div class="bl3_she_b">
                            <div class="chejianYunxing_top" flex="main:justify">
                                <div>{{ $t('menu.equipmentStatus') }}</div>
                                <div class="bl3_she_b_u">
                                    <ul flex>
                                        <li
                                            v-for="(item, index) in sbStatus"
                                            :key="index"
                                            @click="numli = index"
                                            :class="index == numli ? 'activeli' : ''"
                                        >
                                            {{ item.name }}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="bl3_she_b_check">
                                <status-table
                                    v-show="numli == 0"
                                    :showTitle="false"
                                    :tableHeight="5.16"
                                    :twoRoom1="twoRoom1"
                                    :chaoshi="chaoshi1"
                                    style="width: 100%"
                                    @autoFnTrue="autoFnTrue"
                                    @autoFnFalse="autoFnFalse"
                                    :twoRoomHearder1="twoRoomHearder1"
                                    :twoRoomTitle1="twoRoomTitle1"
                                    :autoplay="autoplay"
                                    :comp_id="comp_id"
                                    v-loading="loadingYX"
                                    element-loading-background="transparent"
                                ></status-table>

                                <status-table
                                    v-show="numli == 1"
                                    :showTitle="false"
                                    :tableHeight="5.16"
                                    :twoRoom1="twoRoom2"
                                    :chaoshi="chaoshi2"
                                    style="width: 100%"
                                    @autoFnTrue="autoFnTrue"
                                    @autoFnFalse="autoFnFalse"
                                    :twoRoomHearder1="twoRoomHearder2"
                                    :twoRoomTitle1="twoRoomTitle2"
                                    :autoplay="autoplay"
                                    :comp_id="comp_id"
                                    v-loading="loadingYX"
                                    element-loading-background="transparent"
                                ></status-table>

                                <status-table
                                    v-show="numli == 2"
                                    :showTitle="false"
                                    :tableHeight="5.16"
                                    :twoRoom1="twoRoom3"
                                    :chaoshi="chaoshi3"
                                    style="width: 100%"
                                    @autoFnTrue="autoFnTrue"
                                    @autoFnFalse="autoFnFalse"
                                    :twoRoomHearder1="twoRoomHearder3"
                                    :twoRoomTitle1="twoRoomTitle3"
                                    :autoplay="autoplay"
                                    :comp_id="comp_id"
                                    v-loading="loadingYX"
                                    element-loading-background="transparent"
                                ></status-table>
                            </div>
                        </div>
                    </div>
                    <div class="bl3_che">
                        <div class="chejianYunxing chyx3">
                            <div class="chejianYunxing_top">
                                {{ $t('menu.shopOperationComparison')
                                }}<span style="font-size: 0.1rem">&nbsp;&nbsp;{{ $t('menu.unitHour') }}</span>
                            </div>
                            <div>
                                <div
                                    id="numEcharts"
                                    ref="numEcharts"
                                    class="leftEcharts"
                                    style="height: 4.48rem"
                                    v-loading="loadingCJ"
                                ></div>
                            </div>
                        </div>
                        <div style="margin-top: 0.2rem">
                            <indexTable
                                :tableData="tableData"
                                :threeBox="threeBox"
                                :oneFixSixArrColor="oneFixSixArrColor"
                                style="width: 100%"
                                v-loading="loadingIT"
                                element-loading-background="transparent"
                            ></indexTable>
                        </div>
                    </div>
                </div>

                <div class="b_right">
                    <div style="width: 100%">
                        <div>
                            <div class="b_r_dixiao">
                                <div class="chejianYunxing_top">{{ $t('menu.lowEfficiencyList') }}</div>
                                <black-table
                                    :tableData="blackList"
                                    :autoplay="autoplay"
                                    @autoFnFalse="autoFnFalse"
                                    @autoFnTrue="autoFnTrue"
                                    v-loading="loadingDX"
                                    element-loading-background="transparent"
                                ></black-table>
                            </div>
                            <div class="b_r_chaoshi">
                                <status-table
                                    :chaoshi="chaoshi"
                                    :twoRoom1="lixian4"
                                    :tableHeight="2.88"
                                    style="width: 100%; margin-top: 0.15rem"
                                    :twoRoomHearder1="twoRoomHearder4"
                                    :twoRoomTitle1="twoRoomTitle4"
                                    :autoplay="autoplay"
                                    v-loading="loadingCS"
                                    element-loading-background="transparent"
                                ></status-table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mingxiBox alltableClass">
            <el-dialog
                :modal-append-to-body="false"
                :visible.sync="allTableDio"
                width="90%"
                :before-close="handleCloseMX"
                class="tanTable tableTan"
            >
                <all-table
                    v-if="reFresh"
                    :tableData="alltableData"
                    :cheJianHao="cheJianHao"
                    :loading="loading"
                    element-loading-background="transparent"
                    :comp_id="comp_id"
                    :filtersZT="$global.filtersZT"
                    :statusColor="$global.statusColor"
                    :status="$global.status"
                    :dateValue="dateValue"
                    :begintime="begintime"
                    :endtime="endtime"
                    :moremStartTime="moremStartTime"
                    :moremEndTime="moremEndTime"
                    :filteredValue="filteredValue"
                    :showMX="showMX"
                    :miao="miao"
                ></all-table>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import echarts from 'echarts';
import {
    getroom,
    // zonghe
    GetDeviceStatusHome
} from '../../api/api';
import indexTable from './component/indexTable';
import blackTable from './component/blackTable';
import dateCom from './component/dateCom';
import statusTable from './component/statusTable';
import numberMachines from './component/numberMachines';
import titleCheck from './component/titleCheck.vue';
import compLogo from './component/compLogo.vue';
import allTable from './component/allTable.vue';
import banCi from './component/banci.vue';

import {
    getTime,
    getTime2,
    time_to_sec,
    yestodayTimeFun,
    compare,
    times,
    sortByKey,
    timestampToTime,
    getNowFormatDate
} from '../../utils/index';
import '../common/loginStatus';
export default {
    components: { compLogo, indexTable, blackTable, dateCom, statusTable, numberMachines, titleCheck, allTable, banCi },
    data() {
        return {
            dateValue: [],
            tableData: [],
            jiqiArr: [],

            oneFixSixArrColor: {
                '-1': '#585D81',
                0: '#AF87FE',
                1: '#E63A3F',
                2: '#44C881',
                3: '#66E1FB',
                99: '#E3BD89',
                100: '#66E1FB'
            },
            threeBox: {
                '-1': this.$t('menu.offlinezhanbi'),
                0: this.$t('menu.fiweizhanbi'),
                1: this.$t('menu.stopProportion'),
                2: this.$t('menu.runOf'),
                3: this.$t('menu.zantingzhanbi'),
                99: this.$t('menu.shoudongzhanbi'),
                100: this.$t('menu.stopProportion')
            },
            zhuduiBi: [],

            myChart: {},

            begintime: '',
            endtime: '',
            blackList: [],
            alltableList: [],
            twoRoom: [],
            fourRoom: [],

            querytype: 1,
            twoRoom1: [],
            twoRoom2: [],
            twoRoom3: [],
            autoplay: true,
            allNum: 0,
            liXianList: [],
            lixian4: [],
            moremStartTime: '',
            moremEndTime: '',
            zhanweiColor: true,
            num: 0,
            currentTime: '',
            twoRoomHearder1: [],
            twoRoomTitle1: this.$t('menu.operationalOutfit'),
            twoRoomHearder2: [],
            twoRoomTitle2: this.$t('menu.arrestment'),
            twoRoomHearder3: [],
            twoRoomTitle3: this.$t('menu.lowspeedEquipment'),
            twoRoomHearder4: [],
            twoRoomTitle4: this.$t('menu.timeoutWarning'),
            chaoshi: 4,
            chaoshi1: 1,
            chaoshi2: 2,
            chaoshi3: 3,
            comp_id: 0,
            allBg: true,
            focus: true,
            checkNum: 0,

            allTableDio: false,
            cheJianHao: [],

            filteredValue: [],

            alltableData: [],
            loading: false,
            showMX: false,
            reFresh: true,
            login_staus: 1,
            sbStatus: [
                { id: 0, name: this.$t('menu.operationalOutfit') },
                { id: 1, name: this.$t('menu.arrestment') },
                { id: 2, name: this.$t('menu.lowspeedEquipment') }
            ],
            numli: 0,
            loadingmach: true,
            loadingIT: true,
            loadingCJ: true,
            loadingYX: true,
            loadingDX: true,
            loadingCS: true,

            pickerOptions: {},
            guoLvShiJian: 24,
            guoLvShiJianArr: [
                { id: 12, value: '12 h' },
                { id: 24, value: '24 h' },
                { id: 48, value: '48 h' },
                { id: 72, value: '72 h' }
            ],
            miao: true,

            // checkList: [],
            checkIndex: '',
            // bcTime: '',
            checkListTitle: []
        };
    },
    computed: {},

    mounted() {
        if (localStorage.getItem('localSetBanCi')) {
            let localSetBanCi = JSON.parse(localStorage.getItem('localSetBanCi'));
            if (localSetBanCi.checkIndex == '' || !localSetBanCi.checkIndex) {
                localStorage.removeItem('localSetBanCi');
            }
        }
        if (localStorage.getItem('login_staus') == 1) {
            this.login_staus = 1;
            this.tableBorder = '#424B72';
        } else if (localStorage.getItem('login_staus') == 2) {
            this.tableBorder = '#2B3B5C';
            this.login_staus = 2;
        } else {
            this.login_staus = 3;
        }
        this.comp_id = Number(localStorage.getItem('comp_id'));

        // 查询所有车间
        this.getGetroom();
        this.$refs.child.huancunTime();
        this.init();
        // this.currentTime = getTime();

        let userArr = JSON.parse(localStorage.getItem('dateValue'));

        if (userArr) {
        } else {
            this.dingshiTime();
        }
        this.miao = localStorage.getItem('getMiao') ? JSON.parse(localStorage.getItem('getMiao')) : true;
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
    },
    methods: {
        showmiao(val) {
            this.miao = val;
        },
        showDio() {
            this.$refs.child.shezhiBanci();
        },
        dateValueChange(val) {
            this.dateValue = val;
        },
        begintimeChange(val) {
            this.begintime = val;
        },
        endtimeChange(val) {
            this.endtime = val;
        },
        checkIndexChange(val) {
            this.checkIndex = val;
        },
        checkListChange(val) {
            this.checkList = val;
        },
        checkListTitleChange(val) {
            this.checkListTitle = val;
        },
        bcTimeChange(val) {
            this.bcTime = val;
        },
        banciDioChange(val) {
            this.banciDio = val;
        },
        getchangeGl() {
            this.changeGl();

            this.querytype = 1;
            // 去掉高亮
            localStorage.removeItem('dateValue');
            this.timeInit(this.focus);
            this.zhanweiColor = true;

            // 清除选中 继续刷新
            this.cleardingshi();
            this.dingshiTime();

            this.init();
        },
        changeGl() {
            let ymd = timestampToTime(this.guoLvShiJian).split(' ')[0];
            let hms = timestampToTime(this.guoLvShiJian).split(' ')[1];
            let ymd1 = Number(ymd.split('-')[1]) < 10 ? '0' + ymd.split('-')[1] : ymd.split('-')[1];
            let ymd2 = Number(ymd.split('-')[2]) < 10 ? '0' + ymd.split('-')[2] : ymd.split('-')[2];
            let hms0 = Number(hms.split(':')[0]) < 10 ? '0' + hms.split(':')[0] : hms.split(':')[0];
            let hms1 = Number(hms.split(':')[1]) < 10 ? '0' + hms.split(':')[1] : hms.split(':')[1];
            let hms2 = Number(hms.split(':')[2]) < 10 ? '0' + hms.split(':')[2] : hms.split(':')[2];

            let jingeTime = ymd.split('-')[0] + '-' + ymd1 + '-' + ymd2 + ' ' + hms0 + ':' + hms1 + ':' + hms2;
            // let jingeTime = ymd.split('-')[0] + '-' + ymd1 + '-' + ymd2 + ' ' + hms0 + ':' + hms1;

            return jingeTime;
        },
        dingshiTime() {
            this.fiveTimer = setInterval(() => {
                this.init();
                // this.currentTime = getTime();
            }, 9000);

            this.num = 9;
            this.oneMinutes = setInterval(() => {
                if (this.num === 1) {
                    this.num = 9;
                } else {
                    this.num -= 1;
                }
            }, 1000);
        },
        cleardingshi() {
            clearInterval(this.fiveTimer);
            clearInterval(this.oneMinutes);
        },
        init() {
            this.timeInit(this.focus);

            // 综合设备
            this.postGetDeviceStatusHome();
        },
        postGetDeviceStatusHome() {
            let params = {
                CP_ID: localStorage.getItem('comp_id'),
                Device_ID: 0,
                Room: 0,
                BeginTime: this.dateValue ? this.begintime : this.moremStartTime, //'2021-09-12 00:00:00',
                EndTime: this.dateValue ? this.endtime : this.moremEndTime,
                EndablePager: 0, //是否分页
                PageIndex: 0,
                PageSize: 0,
                Status: 0
            };
            GetDeviceStatusHome(params).then((res) => {
                const { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    this.allNum = Data.StatusALL;
                    this.jiqiArr = [
                        { runstatus: 2, count: Data.Status2, label: this.$t('menu.yunxing') },
                        { runstatus: 99, count: Data.Status99, label: this.$t('menu.shoudong') },
                        { runstatus: 0, count: Data.Status0, label: this.$t('menu.fuwei') },
                        { runstatus: 1, count: Data.Status1, label: this.$t('menu.tingzhi') },
                        { runstatus: 3, count: Data.Status3, label: this.$t('menu.zanting') },
                        { runstatus: -1, count: Data.StatusOffLine, label: this.$t('menu.lixian') }
                    ];
                    let fenduanNum = 0;
                    for (let i = 0; i < this.jiqiArr.length; i++) {
                        fenduanNum += this.jiqiArr[i].count;
                    }
                    let shengSD = this.allNum - fenduanNum + this.jiqiArr[1].count;
                    this.jiqiArr[1].count = shengSD;
                    this.loadingmach = false;

                    this.twoRoom = [];
                    this.fourRoom = [];
                    this.liXianList = [];
                    this.alltableList = Data.ArrDevice;
                    for (let i = 0; i < this.alltableList.length; i++) {
                        let status = this.alltableList[i].RunStatus;

                        // 运行
                        if (status == 2 && status != -1) {
                            this.twoRoom.push(this.alltableList[i]);
                        }

                        // 0,1,3,99 大停止
                        if (status == 0 || status == 1 || status == 3 || (status == 99 && status != -1)) {
                            this.fourRoom.push(this.alltableList[i]);
                        }
                    }
                    this.twoRoom.sort(compare('RunPercent', true));
                    let indexList = Math.ceil(this.twoRoom.length / (this.login_staus > 2 ? 10 : 7));
                    let newArr = [];
                    for (var i = 0; i < indexList; i++) {
                        newArr[i] = this.twoRoom.splice(0, this.login_staus > 2 ? 10 : 7);
                    }
                    this.twoRoom1 = newArr;
                    this.twoRoomHearder1 = [this.$t('menu.equipment'), this.$t('menu.runningTime'), this.$t('menu.runOf')];

                    this.fourRoom.sort(compare('StopPercent', false));
                    let indexList2 = Math.ceil(this.fourRoom.length / (this.login_staus > 2 ? 10 : 7));
                    let newArr2 = [];
                    for (var i = 0; i < indexList2; i++) {
                        newArr2[i] = this.fourRoom.splice(0, this.login_staus > 2 ? 10 : 7);
                    }
                    this.twoRoom2 = newArr2;
                    this.twoRoomHearder2 = [this.$t('menu.equipment'), this.$t('menu.stopTime'), this.$t('menu.stopProportion')];

                    // 低速运行设备
                    this.liXianList = Data.ArrLowSpeed;

                    sortByKey(this.liXianList, 'FeedrateOverride');
                    let indexList3 = Math.ceil(this.liXianList.length / (this.login_staus > 2 ? 10 : 7));
                    let newArr3 = [];
                    for (var i = 0; i < indexList3; i++) {
                        newArr3[i] = this.liXianList.splice(0, this.login_staus > 2 ? 10 : 7);
                    }

                    this.twoRoom3 = newArr3;
                    this.twoRoomHearder3 = [this.$t('menu.equipment'), this.$t('menu.lastOfTime'), this.$t('menu.feedRate')];
                    this.loadingYX = false;

                    // 超时预警
                    let indexList4 = Math.ceil(Data.ArrOverTime.length / 4);
                    let newArr4 = [];
                    for (var i = 0; i < indexList4; i++) {
                        newArr4[i] = Data.ArrOverTime.splice(0, 4);
                    }
                    this.lixian4 = newArr4;
                    this.twoRoomHearder4 = [
                        this.$t('menu.equipment'),
                        this.$t('menu.currentState'),
                        this.$t('menu.startTime'),
                        this.$t('menu.timeOfDuration')
                    ];
                    this.loadingCS = false;

                    // 运行低效榜
                    this.blackList = [];
                    let xioyu30 = [];
                    for (let i = 0; i < this.alltableList.length; i++) {
                        if (this.alltableList[i].RunStatus != -1) {
                            if (this.alltableList[i].StopPercent * 100 != 100) {
                                if (this.comp_id == 1) {
                                    if (this.alltableList[i].RunPercent * 100 < 30) {
                                        xioyu30.push(this.alltableList[i]);
                                    }
                                } else {
                                    if (this.alltableList[i].RunPercent * 100 < 60) {
                                        xioyu30.push(this.alltableList[i]);
                                    }
                                }
                            }
                        }
                    }
                    sortByKey(xioyu30, 'RunPercent');
                    let indexListDi = Math.ceil(xioyu30.length / 10);
                    let newArrDi = [];
                    for (var i = 0; i < indexListDi; i++) {
                        newArrDi[i] = xioyu30.splice(0, 10);
                    }
                    this.blackList = newArrDi;
                    let index = 0;
                    for (let i = 0; i < this.blackList.length; i++) {
                        for (let j = 0; j < this.blackList[i].length; j++) {
                            this.blackList[i][j].index = index++;
                        }
                    }
                    this.loadingDX = false;

                    // 运行总统计
                    this.tableData = [
                        {
                            runstatus: 2,
                            RunTime: Data.RunTime,
                            RunPercent: Data.RunPercent
                        },
                        {
                            runstatus: 100,
                            RunTime: Data.StopTime,
                            RunPercent: Data.StopPercent
                        },
                        {
                            runstatus: -1,
                            RunTime: Data.OfflineTime,
                            RunPercent: Data.OfflinePercent
                        }
                    ];
                    this.loadingIT = false;
                    // 车间运行对比
                    this.zhuduiBi = Data.ArrRoom;
                    let zhuNumx = [];
                    var timelength = [];
                    var timelength0 = [];
                    var timelength1 = [];
                    var timelength2 = [];
                    var timelength3 = [];
                    var timelength99 = [];
                    for (let i = 0; i < this.zhuduiBi.length; i++) {
                        zhuNumx.push(this.$t('menu.workHome') + this.zhuduiBi[i].Room);
                        timelength2.push(this.zhuduiBi[i].RunTime > 0 ? (this.zhuduiBi[i].RunTime / 3600).toFixed(1) : 0);
                        timelength3.push(this.zhuduiBi[i].StopTime > 0 ? (this.zhuduiBi[i].StopTime / 3600).toFixed(1) : 0);
                        timelength.push(this.zhuduiBi[i].OfflineTime > 0 ? (this.zhuduiBi[i].OfflineTime / 3600).toFixed(1) : 0);
                    }

                    let titleColor = '';
                    let yColor = '';
                    let zxcolor = '';
                    let hengXiancolor = '';
                    if (localStorage.getItem('login_staus') == 1) {
                        titleColor = '#C6D2FF';
                        yColor = '#fff';
                        zxcolor = '#fff';
                        hengXiancolor = '#2B335C';
                    } else if (localStorage.getItem('login_staus') == 2) {
                        titleColor = '#5E636F';
                        yColor = '#A4B2CA';
                        zxcolor = '#fff';
                        hengXiancolor = '#0D183F';
                    } else {
                        titleColor = '#9B8DB1';
                        yColor = '#9B8DB1';
                        zxcolor = '#391C63';
                        hengXiancolor = '#eee';
                    }

                    // this.$nextTick(()=>{
                    this.numEcharts(
                        zhuNumx,
                        timelength,
                        timelength0,
                        timelength1,
                        timelength2,
                        timelength3,
                        timelength99,
                        titleColor,
                        yColor,
                        zxcolor,
                        hengXiancolor
                    );
                    // })
                }

                this.alltableData = Data.ArrDevice;
            });
        },
        timeInit(focus) {
            if (focus) {
                // let userArr = JSON.parse(localStorage.getItem('dateValue'));
                // if (userArr) {
                //     this.dateValue = userArr;
                //     this.begintime = userArr[0];
                //     this.endtime = userArr[1];
                //     this.zhanweiColor = false;
                // } else {
                // if (this.comp_id == 1) {
                //     // 当前时间晚于七点半，默认查询时间是当天早上七点半-当前时间
                //     // 当前时间早于七点半，默认查询时间是昨天早上七点半-当前时间
                //     let currentGetTime = time_to_sec(getTime().split(' ')[1]);
                //     let yesTodayTime = time_to_sec('07:30:00');
                //     if (currentGetTime > yesTodayTime) {
                //         this.moremStartTime = getTime().split(' ')[0] + ' 07:30:00';
                //         this.moremEndTime = getTime();

                //         let dateval = [];
                //         dateval[0] = this.moremStartTime;
                //         dateval[1] = this.moremEndTime;
                //         this.dateValue = dateval;
                //         this.begintime = dateval[0];
                //         this.endtime = dateval[1];
                //         this.$forceUpdate();
                //     } else {
                //         this.moremStartTime = yestodayTimeFun() + ' 07:30:00';
                //         this.moremEndTime = getTime();

                //         let dateval = [];
                //         dateval[0] = this.moremStartTime;
                //         dateval[1] = this.moremEndTime;
                //         this.dateValue = dateval;
                //         this.begintime = dateval[0];
                //         this.endtime = dateval[1];
                //         this.$forceUpdate();
                //     }
                // } else {
                if (localStorage.getItem('localSetBanCi')) {
                    // if (this.banciDio == true) {

                    // } else {

                    this.$refs.child.setChangeTitle();
                    // }
                } else {
                    let dateval = [];

                    // this.chooseDateTime = getNowFormatDate();
                    // localStorage.setItem('chooseDateTime', JSON.stringify(this.chooseDateTime));

                    this.begintime = getTime().split(' ')[0] + ' 00:00:00';

                    this.endtime = getTime().split(' ')[0] + ' 23:59:59';

                    // this.begintime = this.changeGl();
                    // this.endtime = getTime2();
                    dateval[0] = this.begintime;
                    dateval[1] = this.endtime;
                    this.dateValue = dateval;
                }
                // }
                //     }
                // } else {
            }
        },
        clearTime() {
            this.dateValue = '';

            // this.changeDate();
            this.guoLvShiJian = 24;
            this.begintime = this.changeGl();
            this.endtime = getTime2();
            let dateval = [];
            dateval[0] = this.begintime;
            dateval[1] = this.endtime;
            this.dateValue = dateval;

            localStorage.removeItem('dateValue');
            this.timeInit(this.focus);
            this.zhanweiColor = true;

            // 清除选中 继续刷新
            this.cleardingshi();
            this.dingshiTime();
        },
        focusDate() {
            this.focus = false;
            this.timeInit(this.focus);
        },
        blurDate() {
            this.focus = true;
            this.timeInit(this.focus);
        },
        changeDate() {
            this.guoLvShiJian = '';
            if (this.dateValue) {
                this.zhanweiColor = false;

                // this.changeGl();
                this.begintime = this.dateValue[0];
                this.endtime = this.dateValue[1];

                let endTime1 = this.endtime.split(' ');
                let begintime1 = this.begintime.split(' ');
                if (endTime1[1] == '00:00:00' && begintime1[0] != endTime1[0]) {
                    this.endtime = endTime1[0] + ' 23:59:59';
                    this.dateValue[1] = this.endtime;
                } else if (this.begintime == this.endtime) {
                    this.endtime = endTime1[0] + ' 23:59:59';
                    this.dateValue[1] = this.endtime;
                }
                localStorage.setItem('dateValue', JSON.stringify(this.dateValue));
                // 选中了 就不要再刷新了
                this.cleardingshi();
            } else {
                localStorage.removeItem('dateValue');
                this.timeInit(this.focus);
                this.zhanweiColor = true;

                // 清除选中 继续刷新
                this.cleardingshi();
                this.dingshiTime();
            }
        },

        parentFn(dateValue, begintime, endtime) {
            this.dateValue = dateValue;
            this.begintime = begintime;
            this.endtime = endtime;
        },
        chooseSearch() {
            // this.querytype = 1;
            // if (this.checkIndex) {
            //     if (this.checkIndex == 3) {
            //     } else {
            //         if (this.$refs.child.chooseDateTime == '') {
            //             this.$message.warning('请选择日期');
            //             return;
            //         }
            //     }
            // } else {
            //     if (this.$refs.child.chooseDateTime == '') {
            //         this.$message.warning('请设置班次');
            //         return;
            //     }
            // }
            // if (this.$refs.child.chooseDateTime) {
            //     if (this.checkIndex) {
            //         if (this.checkIndex == 3) {
            //             this.$message.warning('请设置班次');
            //             return;
            //         }
            //     } else {
            //         this.$message.warning('请设置班次');
            //         return;
            //     }
            // }
            if (this.checkIndex || this.checkIndex != 3) {
            } else {
                if (this.checkList[0] == 1 && this.checkListTitle.length <= 0) {
                    this.$message.warning('请选择白班夜班');
                    return;
                }

                console.log(this.checkListTitle, 'this.checkListTitle==----');
                let localSetBanCi = {
                    bcTime: this.bcTime,
                    checkIndex: this.checkIndex,
                    checkListTitle: this.checkListTitle,
                    chooseDateTime: this.chooseDateTime
                };
                localStorage.setItem('localSetBanCi', JSON.stringify(localSetBanCi));
            }

            this.init();
        },

        getGetroom() {
            let params = {
                CP_ID: localStorage.getItem('comp_id')
            };
            getroom(params).then((res) => {
                const { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    this.cheJianHao = Data;
                    for (let i = 0; i < this.cheJianHao.length; i++) {
                        this.cheJianHao[i].text = this.cheJianHao[i].name;
                        this.cheJianHao[i].value = this.cheJianHao[i].room;
                    }
                }
            });
        },

        pervious() {
            this.$refs.pageGroup.prev();
        },
        next() {
            this.$refs.pageGroup.next();
        },
        autoFnFalse(val) {
            this.autoplay = false;
        },
        autoFnTrue(val) {
            this.autoplay = true;
        },

        // 柱状图
        numEcharts(
            dataX,
            timelength,
            timelength0,
            timelength1,
            timelength2,
            timelength3,
            timelength99,
            titleColor,
            yColor,
            zxcolor,
            hengXiancolor
        ) {
            let this_ = this;
            this_.myChart = echarts.init(document.getElementById('numEcharts'));
            let resizeTimer = null;

            let option = {
                tooltip: {},
                legend: {
                    right: '40',
                    top: '10',
                    textStyle: {
                        //头上的文字的样式
                        color: titleColor,
                        fontSize: 14,
                        lineHeight: 15
                    }
                },
                textStyle: {
                    //头上的文字的样式
                    color: '#fff',
                    fontSize: 14
                },

                xAxis: {
                    type: 'category',
                    data: dataX,
                    axisLine: {
                        lineStyle: {
                            color: hengXiancolor //X轴的颜色
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: zxcolor, //x轴文字颜色
                            fontSize: '12'
                        }
                    },
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                    axisLine: {
                        lineStyle: {
                            color: hengXiancolor //y轴的颜色
                        }
                    },
                    splitLine: {
                        show: true, //虽然是y轴  但是是横线
                        lineStyle: {
                            color: [hengXiancolor],
                            width: 1,
                            type: 'solid'
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: zxcolor
                        }
                    }
                },
                series: [
                    {
                        name: this_.$t('menu.runningTime'),
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                color: '#44c881',
                                label: {
                                    show: true,
                                    position: 'top',
                                    color: yColor
                                }
                            }
                        },
                        barWidth: '20',
                        data: timelength2
                    },
                    {
                        name: this_.$t('menu.stopTime'),
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                color: '#66E1FB',
                                label: {
                                    show: true,
                                    position: 'top',
                                    color: yColor
                                }
                            }
                        },
                        barWidth: '20',
                        data: timelength3
                    },
                    {
                        name: this_.$t('menu.lixian'),
                        type: 'bar',
                        // barGap:'100%',//柱图间距
                        itemStyle: {
                            normal: {
                                color: '#585D81',
                                label: {
                                    show: true,
                                    position: 'top',
                                    color: yColor
                                }
                            }
                        },
                        barWidth: '20',
                        data: timelength
                    }
                ]
            };
            this_.myChart.setOption(option);

            window.addEventListener('resize', () => {
                if (resizeTimer) clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    this_.myChart.resize();
                }, 100);
            });
        },

        mouseEnter() {
            this.autoplay = false;
        },
        mouseleave() {
            this.autoplay = true;
        },
        jiqic(val) {
            this.$nextTick(() => {
                this.filteredValue = [];
                if (val == 99) {
                    this.filteredValue = [4, 5, 6, 7, 8, 9, 10, 11, 99];
                } else {
                    this.filteredValue.push(val);
                }
                this.$forceUpdate();
                this.allTableDio = true;
            });
        },
        jiqiArrc(val) {
            this.$nextTick(() => {
                this.filteredValue = val;
                this.$forceUpdate();
                this.allTableDio = true;
            });
        },
        handleCloseMX() {
            this.allTableDio = false;
            this.filteredValu = [];
        }
    },

    watch: {
        filteredValue: {
            handler(val, oldVal) {
                this.filteredValu = val;
                this.reFresh = false;
                this.$nextTick(() => {
                    this.reFresh = true;
                });
            },
            deep: true
        }
        // chooseDateTime  监听缓存中的值
    },
    created() {},

    beforeCreate() {},
    beforeMount() {},
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed() {
        this.cleardingshi();
        clearInterval(this.setTime);
    },
    activated() {}
};
</script>
<style lang='scss'>
</style>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>
