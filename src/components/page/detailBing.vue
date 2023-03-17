<template>
    <div class="detailBing">
        <div class="homePageTitle" flex="cross:center main:justify">
            <div flex="cross:center ">
                <comp-logo :comp_id="comp_id"></comp-logo>
                <title-check :num="checkNum"></title-check>
                <div class="allStatusClass" style="margin: 0 20px 0 0">
                    <cheJian :allCheJian="allCheJian" @childChejian="parentChejian"></cheJian>
                </div>
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
                        v-model="dateValue"
                        @focus="focusDate"
                        @blur="blurDate"
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

                <div>
                    <button class="chooseBtn" style="margin: 0 20px" @click="chooseSearch()">{{ $t('menu.search') }}</button>
                </div>
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
            <div flex="main:justify">
                <div class="b_left_bing">
                    <number-machines :jiqiArr="jiqiArr" :allNum="allNum" @jiqic="jiqic" @jiqiArrc="jiqiArrc" :nm="1"></number-machines>

                    <div class="b_left_bottom" flex="main:justify">
                        <div class="chejanYunXing">
                            <div class="chejianYunxing_top">{{ $t('menu.chejianruning') }}</div>
                            <div>
                                <workshop-operation
                                    :chejianList="chejianList"
                                    :autoplay="autoplay"
                                    @workautoFnFalse="workautoFnFalse"
                                    @workautoFnTrue="workautoFnTrue"
                                    :comp_id="comp_id"
                                    v-loading="loadingCHE"
                                    element-loading-background="transparent"
                                ></workshop-operation>
                            </div>
                        </div>
                        <div class="tongjiAndQingKuang">
                            <indexTable
                                :tableData="tableData"
                                :threeBox="threeBox"
                                :oneFixSixArrColor="oneFixSixArrColor"
                                style="width: 100%"
                                v-loading="loadingIT"
                                element-loading-background="transparent"
                            ></indexTable>

                            <div class="lingBa">
                                <status-table
                                    :chaoshi="chaoshi3"
                                    :threeTure="threeTure"
                                    :tableHeight="3.95"
                                    :twoRoom1="twoRoom3"
                                    style="width: 100%"
                                    :twoRoomHearder1="twoRoomHearder3"
                                    :twoRoomTitle1="twoRoomTitle3"
                                    :autoplay="autoplay"
                                    :comp_id="comp_id"
                                    v-loading="loadingDS"
                                    element-loading-background="transparent"
                                ></status-table>
                            </div>
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
                                    style="width: 100%"
                                    :twoRoomHearder1="twoRoomHearder4"
                                    :twoRoomTitle1="twoRoomTitle4"
                                    :autoplay="autoplay"
                                    :comp_id="comp_id"
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
            <el-dialog :visible.sync="allTableDio" width="90%" :before-close="handleCloseMX" class="tanTable tableTan">
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
import {
    getroom,
    // zonghe
    GetDeviceStatusHome
} from '../../api/api';
import indexTable from './component/indexTable';
import dateCom from './component/dateCom';
import blackTable from './component/blackTable';
import numberMachines from './component/numberMachines';
import workshopOperation from './component/workshopOperation';
import statusTable from './component/statusTable';
import titleCheck from './component/titleCheck.vue';
import compLogo from './component/compLogo.vue';
import allTable from './component/allTable.vue';
import banCi from './component/banci.vue';
import { getTime, getTime2, time_to_sec, yestodayTimeFun, sortByKey, timestampToTime } from '../../utils/index';
import '../common/loginStatus';
export default {
    components: { compLogo, indexTable, blackTable, dateCom, numberMachines, workshopOperation, statusTable, titleCheck, allTable, banCi },
    data() {
        return {
            allStatus: '',

            allCheJian: '',
            SearchValue: '',
            dateValue: '',
            tableData: [],
            gongsiPrams: {
                pager: {
                    page: 1,
                    rows: 5
                },
                obj: {}
            },
            sixArr: [],
            // -1:设备离线,0:复位,1:停止,2:运行,3:暂停,99:其他
            fixedSixArr: [-1, 0, 1, 2, 3, 99],

            zhuduiBi: [],
            maxTimeLength: [],
            oneFixSixArrColor: {
                '-1': '#585D81',
                0: '#AF87FE',
                1: '#E63A3F',
                2: '#44C881',
                3: '#66E1FB',
                99: '#E3BD89',
                100: '#66E1FB'
            },
            begintime: '',
            endtime: '',
            blackList: [],
            autoplay: true,
            lixian4: [],
            querytype: 1,
            moremStartTime: '',
            moremEndTime: '',
            jiqiArr: [],
            allNum: 0,
            alltableList: [],
            chejianList: [],
            threeBox: {
                '-1': this.$t('menu.offlinezhanbi'),
                0: this.$t('menu.fiweizhanbi'),
                1: this.$t('menu.stopProportion'),
                2: this.$t('menu.runOf'),
                3: this.$t('menu.zantingzhanbi'),
                99: this.$t('menu.shoudongzhanbi'),
                100: this.$t('menu.stopProportion')
            },
            zhanweiColor: true,
            twoRoom3: [],
            twoRoomHearder3: [],
            twoRoomTitle3: this.$t('menu.lowspeedEquipment'),
            twoRoomHearder4: [],
            twoRoomTitle4: this.$t('menu.timeoutWarning'),
            chaoshi: 4,
            chaoshi3: 3,
            currentTime: '',
            num: 0,
            threeTure: true,
            comp_id: 0,
            focus: true,
            checkNum: 2,

            allTableDio: false,
            cheJianHao: [],

            filteredValue: [],
            alltableData: [],
            loading: false,
            showMX: false,
            reFresh: true,
            loadingDX: true,
            loadingCS: true,
            loadingCHE: true,
            loadingIT: true,
            loadingDS: true,
            pickerOptions: {},
            guoLvShiJian: 24,
            guoLvShiJianArr: [
                { id: 12, value: '12 h' },
                { id: 24, value: '24 h' },
                { id: 48, value: '48 h' },
                { id: 72, value: '72 h' }
            ],
            miao: true,
            checkIndex: ''
        };
    },
    computed: {},
    mounted() {
        // if(this.$store.state.dateInfo.dateValue&&this.$store.state.dateInfo.dateValue.length>0){
        //     let dateInfo = this.$store.state.dateInfo;
        //     this.dateValue=dateInfo.dateValue;
        //     this.begintime=dateInfo.begintime;
        //     this.endtime=dateInfo.endtime;

        // }  else{
        // // 当前时间晚于七点半，默认查询时间是当天早上七点半-当前时间
        // // 当前时间早于七点半，默认查询时间是昨天早上七点半-当前时间

        // }
        if (localStorage.getItem('localSetBanCi')) {
            let localSetBanCi = JSON.parse(localStorage.getItem('localSetBanCi'));
            if (localSetBanCi.checkIndex == '' || !localSetBanCi.checkIndex) {
                localStorage.removeItem('localSetBanCi');
            }
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

            // 去掉高亮
            localStorage.removeItem('dateValue');
            this.timeInit(this.focus);
            this.zhanweiColor = true;

            // 清除选中 继续刷新
            this.cleardingshi();
            this.dingshiTime();

            this.querytype = 1;
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

        parentChejian(payload) {
            this.allCheJian = payload;
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
                Room: Number(this.allCheJian ? this.allCheJian : 0),
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

                    this.liXianList = [];
                    this.chejianYunXing = [];
                    if (Array.isArray(Data.ArrDevice) && Data.ArrDevice.length > 0) {
                        this.alltableList = Data.ArrDevice;
                        for (let i = 0; i < this.alltableList.length; i++) {
                            // 车间运行
                            if (this.alltableList[i].RunStatus == -1) {
                            } else {
                                this.chejianYunXing.push(this.alltableList[i]);
                            }
                        }
                    }
                    if (Array.isArray(Data.ArrLowSpeed) && Data.ArrLowSpeed.length > 0) {
                        this.liXianList = Data.ArrLowSpeed;
                        sortByKey(this.liXianList, 'FeedrateOverride');
                        let indexList3 = Math.ceil(this.liXianList.length / 7);
                        let newArr3 = [];
                        for (var i = 0; i < indexList3; i++) {
                            newArr3[i] = this.liXianList.splice(0, 7);
                        }
                        this.twoRoom3 = newArr3;
                        this.twoRoomHearder3 = [this.$t('menu.equipment'), this.$t('menu.lastOfTime'), this.$t('menu.feedRate')];
                        this.loadingDS = false;
                    }

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

                    // 车间运行
                    sortByKey(this.chejianYunXing, 'RunPercent');
                    let chejian = Math.ceil(this.chejianYunXing.length / 14);
                    let newCheJian = [];
                    for (let i = 0; i < chejian; i++) {
                        newCheJian[i] = this.chejianYunXing.splice(0, 14);
                    }

                    this.chejianList = newCheJian;
                    this.loadingCHE = false;

                    this.alltableData = Data.ArrDevice;
                }
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
                this.cleardingshi();
            } else {
                localStorage.removeItem('dateValue');
                this.zhanweiColor = true;
                this.timeInit(this.focus);
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
            // console.log(this.checkIndex, '-000this.checkIndex');
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
            // this.autoplay=false
        },
        autoFnTrue(val) {
            // this.autoplay=true
        },
        workautoFnFalse(val) {
            // this.autoplay=false
        },
        workautoFnTrue(val) {
            // this.autoplay=true
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
    },
    created() {},

    beforeCreate() {},
    beforeMount() {},
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed() {
        clearInterval(this.fiveTimer);
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