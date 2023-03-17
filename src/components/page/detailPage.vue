<template>
    <div class="homePage detailpage">
        <div class="homePageTitle" flex="cross:center main:justify">
            <!-- 这是表格页面 -->
            <div flex="cross:center main:left">
                <comp-logo :comp_id="comp_id"></comp-logo>
                <title-check :num="checkNum"></title-check>
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

                <!-- <div class="DateChoose" :class="{ zhanweiColor: zhanweiColor }">
                    <el-date-picker
                        @change="changeDate"
                        @focus="focusDate"
                        @blur="blurDate"
                        v-model="dateValue"
                        type="datetimerange"
                        range-separator="-"
                        :clearable="false"
                        :start-placeholder="$t('menu.kaishiriqi')"
                        :end-placeholder="$t('menu.jieshuriqi')"
                        format="yyyy-MM-dd HH:mm"
                        value-format="yyyy-MM-dd HH:mm"
                    >
                    </el-date-picker>
                    <i class="el-icon-circle-close closeIcon" @click="clearTime"></i>
                </div> -->

                <div>
                    <button class="chooseBtn" style="margin: 0 0.2rem" @click="chooseSearch()">{{ $t('menu.search') }}</button>
                </div>
            </div>

            <div flex style="margin-right: 0.1rem">
                <div>
                    <div class="checked">
                        <el-checkbox v-model="checkedLiXian" @change="yincangLiXian">{{ $t('menu.yincanglixianshebei') }}</el-checkbox>
                    </div>
                    <div flex="cross:center" style="margin-top: 0.1rem">
                        <div class="bcbian" flex="cross:center main:center">
                            <button class="chooseBtntxt" @click="showDio">{{ $t('menu.setBanci') }}</button>
                        </div>

                        <div class="upName" flex="cross:center main:center" style="margin-right: 0.13rem">
                            <button class="chooseBtntxt" @click="exprtData()">{{ $t('menu.daochushuju') }}</button>
                            <img v-if="login_staus == 1" src="../common/comImg/index/upFile1.png" alt="" />
                            <img v-if="login_staus == 2" src="../common/comImg/index/upFile.png" alt="" />
                            <img v-if="login_staus == 3" src="../common/comImg/index/upFile3.png" alt="" />
                        </div>
                    </div>
                </div>
                <div>
                    <title-time :currentTime="currentTime" :num="num"></title-time>
                    <set-login @showmiao="showmiao" style="margin-top: 0.06rem"></set-login>
                </div>
            </div>
        </div>

        <div class="homePageBody">
            <div class="">
                <all-table
                    :tableData="tableData"
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
            </div>
        </div>
        <div>
            <div class="editPassword exoprtData">
                <el-dialog :title="$t('menu.daochushuju')" :visible.sync="exportDio" width="13.66rem">
                    <div class="exportBody">
                        <el-form ref="form" :model="form" label-width="1.2rem" label-position="left">
                            <el-form-item :label="$t('menu.dcxingshi')">
                                <el-radio-group v-model="form.resource">
                                    <el-radio :label="$t('menu.yunxingTongji')"></el-radio>
                                    <el-radio :label="$t('menu.mingxiTongji')"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item :label="$t('menu.xuanzeshijian')">
                                <div flex="cross:center">
                                    <el-date-picker
                                        v-model="form.value1"
                                        type="datetimerange"
                                        range-separator="-"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        :start-placeholder="$t('menu.kaishiriqi')"
                                        :end-placeholder="$t('menu.jieshuriqi')"
                                        :picker-options="pickerOptions"
                                    >
                                    </el-date-picker>
                                    <span class="zhu">{{ $t('menu.zhu') }}</span>
                                </div>
                            </el-form-item>
                            <el-form-item :label="$t('menu.xuanzeshebie')">
                                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">{{
                                    $t('menu.allChoose')
                                }}</el-checkbox>
                                <div style="margin: 0.2rem 0"></div>
                                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                                    <el-checkbox v-for="city in cities" :label="city" :key="city">{{ city }}</el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>

                            <el-form-item class="commitBtn">
                                <div class="twoBtn">
                                    <el-button class="fangqiBtn" @click="dialogVisible = false">{{ $t('menu.chongzhi') }}</el-button>
                                    <el-button type="primary" class="savebtnClass" @click="submitForm('ruleForm')">{{
                                        $t('menu.daochu')
                                    }}</el-button>
                                </div>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="exportFoot" flex>
                        <div class="record">{{ $t('menu.daochujilu') }}</div>
                        <div style="width: 10.1rem">
                            <el-table :data="exportData" style="width: 10.1rem">
                                <el-table-column prop="date" :label="$t('menu.xingshi')" width="180"> </el-table-column>
                                <el-table-column prop="name" :label="$t('menu.shijianDuan')" width="180"> </el-table-column>
                                <el-table-column prop="address" :label="$t('menu.daochushijian')"> </el-table-column>
                                <el-table-column prop="address" :label="$t('menu.caozuo')">
                                    <slot slot-scope="scope">
                                        <span class="download">{{ $t('menu.downLoad') }}</span>
                                    </slot>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
import {
    Get_device_run_status_totaltimelength,
    getroom,
    Get_device_run_status_totaltimelength_Excel,
    GetDeviceStatus,
    GetExcel
} from '../../api/api';
import {
    getTime,
    getTime2,
    getNowFormatDate,
    time_to_sec,
    yestodayTimeFun,
    timestampToTime,
    checkDateToTime,
    changeBL
} from '../../utils/index';

import dateCom from './component/dateCom';
import titleCheck from './component/titleCheck.vue';
import compLogo from './component/compLogo.vue';
import allTable from './component/allTable.vue';
import banCi from './component/banci.vue';
import '../common/loginStatus';
import domainsFuc from '../../api/domains';
export default {
    components: { compLogo, dateCom, titleCheck, allTable, banCi },
    data() {
        let _minTime = null;
        let _maxTime = null;
        return {
            allStatus: '',
            allStatusArr: [
                { runstatus: -1, label: this.$t('menu.lixian') },
                { runstatus: 0, label: this.$t('menu.fuwei') },
                { runstatus: 1, label: this.$t('menu.tingzhi') },
                { runstatus: 2, label: this.$t('menu.yunxing') },
                { runstatus: 3, label: this.$t('menu.zanting') },
                { runstatus: 99, label: this.$t('menu.shoudong') }
            ],
            allCheJian: '',
            allCheJianArr: [],
            SearchValue: '',
            dateValue: '',
            tableData: [],
            roomIndex: 0,
            dialogTableVisible: false,
            gridData: [],
            roomName: '',
            dialogTableVisible3d: false,
            iframeValue: '',
            begintime: '',
            endtime: '',
            loading: true,
            loadingMX: false,
            checkedLiXian: false,
            moremStartTime: '',
            moremEndTime: '',
            tableDataFu: [],
            moremStartTime: '',
            moremEndTime: '',
            zhanweiColor: true,
            num: 0,
            currentTime: '',
            cheJianHao: [],
            comp_id: 0,
            tableBorder: '#424B72',
            focus: true,
            checkNum: 1,
            filteredValue: [],
            showMX: true,
            pickerOptions: {
                onPick(time) {
                    // 如果选择了只选择了一个时间
                    if (!time.maxDate) {
                        let timeRange = 60 * 24 * 60 * 60 * 1000; // 60天
                        _minTime = time.minDate.getTime() - timeRange; // 最小时间
                        _maxTime = time.minDate.getTime() + timeRange; // 最大时间
                        // 如果选了两个时间，那就清空本次范围判断数据，以备重选
                    } else {
                        _minTime = _maxTime = null;
                    }
                },
                disabledDate(time) {
                    // onPick后触发
                    // 该方法会轮询当3个月内的每一个日期，返回false表示该日期禁选
                    if (_minTime && _maxTime) {
                        return time.getTime() < _minTime || time.getTime() > _maxTime;
                    }
                }
            },
            exportDio: false,
            form: {},
            cities: ['上海', '北京', '广州', '深圳'],
            checkedCities: ['上海', '北京'],
            isIndeterminate: true,
            checkAll: false,
            exportData: [],
            guoLvShiJian: 24,
            guoLvShiJianArr: [
                { id: 12, value: '12 h' },
                { id: 24, value: '24 h' },
                { id: 48, value: '48 h' },
                { id: 72, value: '72 h' }
            ],
            miao: true,
            checkIndex: '',
            login_staus: 0
        };
    },
    computed: {},
    watch: {},
    mounted() {
        if (localStorage.getItem('localSetBanCi')) {
            let localSetBanCi = JSON.parse(localStorage.getItem('localSetBanCi'));
            if (localSetBanCi.checkIndex == '' || !localSetBanCi.checkIndex) {
                localStorage.removeItem('localSetBanCi');
            }
        }
        this.login_staus = localStorage.getItem('login_staus');
        // this.$resizeFont.resizeFont();
        if (localStorage.getItem('login_staus') == 1) {
            this.tableBorder = '#424B72';
        } else if (localStorage.getItem('login_staus') == 2) {
            this.tableBorder = '#2B3B5C';
        } else {
        }
        this.comp_id = Number(localStorage.getItem('comp_id'));

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

        // this.fiveTimer = setInterval(() => {
        //     this.init();
        //     this.currentTime = getTime();
        // }, 10000);
        // this.num = 10;
        // this.oneMinutes = setInterval(() => {
        //     if (this.num === 1) {
        //         this.num = 10;
        //     } else {
        //         this.num -= 1;
        //     }
        // }, 1000);

        if (localStorage.getItem('checkedLiXian')) {
            this.checkedLiXian = Boolean(localStorage.getItem('checkedLiXian'));
            this.yincangLiXian();
        }

        this.tabData();
        this.$resizeFont.resizeFont();

        this.setTime = setInterval(() => {
            this.$resizeFont.resizeFont();
        }, 300);

        //    const toFixed = function(value, count) {
        //     // 保留两位小数的情况
        //     const [integer, decimal = '0'.repeat(count)] = value.toString().split('.');
        //     // 加0是为了第二种情况
        //     return integer + '.' + (decimal + '0'.repeat(count - 1)).substr(0, count);
        //     };
        //     console.log('====================================');
        //     console.log(toFixed(1.6589,3));
        //     console.log('====================================');
        // 程序后加一列电压   只做精诚留小数点后三位
        // this.$axios({
        //     method: 'POST',
        //     url: 'http://39.171.77.207:5304/mgBoxHourData/getMgBoxHourDataList?startDate=2022-5-31 00:00:00&endDate=2022-5-31 23:59:59',
        //     data: ["9T9HKMYD"],
        //     headers: {
        //         'Content-Type': 'application/json; charset=utf-8'
        //     }
        // }).then(res => {
        //     console.log('====================================');
        //     console.log(res);
        //     if(res.status==200){
        //         console.log(res.data.data);
        //     }
        //     console.log('====================================');
        // });
    },
    methods: {
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

            // this.querytype = 1;
            this.init();
        },
        showmiao(val) {
            this.miao = val;
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
        handleCheckAllChange(val) {
            this.checkedCities = val ? cityOptions : [];
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.cities.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        },
        //表格数据
        tabData() {
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
            GetDeviceStatus(params).then((res) => {
                const { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    this.tableData = [];

                    this.tableDataFu = Data.ArrDevice;
                    this.tableData = Data.ArrDevice;
                    this.yincangLiXian();
                }
                this.loading = false;
            });
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

            // this.getGet_device_run_status_totaltimelength();

            this.tabData();
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
        yincangLiXian() {
            this.tableData = [];
            if (this.checkedLiXian) {
                for (let i = 0; i < this.tableDataFu.length; i++) {
                    if (this.tableDataFu[i].RunStatus != -1) {
                        this.tableData.push(this.tableDataFu[i]);
                    }
                }
                localStorage.setItem('checkedLiXian', true);
            } else {
                this.tableData = this.tableDataFu;
                localStorage.removeItem('checkedLiXian');
            }
        },
        exprtData() {
            // this.exportDio=true
            let query = {
                CP_ID: localStorage.getItem('comp_id'),
                Device_ID: 0,
                Room: 0,
                BeginTime: this.dateValue ? this.begintime : this.moremStartTime,
                EndTime: this.dateValue ? this.endtime : this.moremEndTime,
                EndablePager: 0,
                PageIndex: 0,
                PageSize: 0,
                Status: 0
            };
            GetExcel(query).then((res) => {
                let { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    let domainsUrl = domainsFuc(process.env.NODE_ENV).domain;
                    let xx = domainsUrl.slice(0, -5);
                    const link = document.createElement('a'); // 创建a标签
                    link.href = xx + Data;
                    link.download = this.$t('menu.jilu'); // 任务记录   重命名文件
                    link.click();
                    // URL.revokeObjectURL(url) // 释放内存
                } else {
                }
            });
        },
        chooseSearch() {
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
        getGet_device_run_status_totaltimelength() {
            let params = {
                compid: localStorage.getItem('comp_id'),
                begintime: this.dateValue ? this.begintime : this.moremStartTime,
                endtime: this.dateValue ? this.endtime : this.moremEndTime,
                device_id: 0,
                room: 0
                // querytype: '1' // 1返回所有列表，2返回5个占比最低的
            };
            Get_device_run_status_totaltimelength(params).then((res) => {
                const { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    this.tableData = [];

                    this.tableDataFu = Data;
                    this.tableData = Data;
                    this.yincangLiXian();
                }
                this.loading = false;
            });
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