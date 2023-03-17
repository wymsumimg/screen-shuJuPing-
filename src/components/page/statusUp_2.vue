<template>
    <div class="homePage detailpage">
        <div class="homePageTitle" flex="cross:center main:justify">
            <div flex="cross:center main:left">
                <!-- <comp-logo :comp_id="comp_id"></comp-logo> -->
                <!-- <title-check :num="checkNum"></title-check> -->
                <div class="allStatusClass allStatusClass_2" style="margin: 0 20px 0 20px">
                    <!-- <el-select v-model="allCheJian" @change="selectChange" :popper-append-to-body="false" placeholder="全部车间">
                        <el-option v-for="item in cheJianHao" :key="item.room" :label="item.room+'号车间'" :value="item.room"> </el-option>
                    </el-select> -->
                        <cheJian :allCheJian="allCheJian" @childChejian="parentChejian"></cheJian>

                </div>
                <div class="DateChoose leftJiaoData upZhe" :class="{ zhanweiColor: zhanweiColor }">
                    <div class="leftJiao"></div>
                    <el-date-picker
                        @change="changeDate"
                        @focus="focusDate"
                        @blur="blurDate"
                        v-model="dateValue"
                        type="datetimerange"
                        range-separator="-"
                        :clearable="false"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :picker-options="pickerOptions"
                    >
                    </el-date-picker>
                    <i class="el-icon-circle-close closeIcon" @click="clearTime"></i>
                </div>

                <div>
                    <button class="chooseBtn" style="margin: 0 0.2rem" @click="chooseSearch()">查询</button>
                </div>
                <!-- <div>
                    <button class="chooseBtn" @click="handData()">手动上报</button>
                </div> -->
            </div>
            <div style="margin-right: 0.1rem">
                <!-- <title-time :currentTime="currentTime" :num="num"></title-time> -->
                <!-- <set-login></set-login> -->
            </div>
        </div>
        <div class="homePageBody">
            <div class="tableDetail">
                <el-table
                    v-loading="loading"
                    :element-loading-background="zhanweiBg"
                    border
                    :header-cell-class-name="headerStyle"
                    :cell-style="{ borderColor: tableBorder, padding: '5px 0' }"
                    :header-cell-style="{ borderColor: tableBorder }"
                    :row-style="{ height: '0.62rem' }"
                    :data="tableData"
                    class="elTabledetail"
                    style="width: 100%"
                    :stripe="true"
                >
                    <el-table-column prop="room" label="车间号" align="center" :filter-method="filterTagCheJian" :filters="cheJianHao">
                        <slot slot-scope="scope">
                            <span class="white">
                                {{ scope.row.room | noValue }}
                            </span>
                        </slot>
                    </el-table-column>
                    <el-table-column prop="name" label="设备" align="center">
                        <slot slot-scope="scope">
                            <span class="white"> {{ scope.row.device_name | noValue }}# </span>
                        </slot>
                    </el-table-column>
                    <el-table-column prop="createman" label="上报人" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.createman }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="istypes" label="上报原因" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.istypes }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="begintime" label="开始时间" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.begintime }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="endtime" label="结束时间" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.endtime }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="timelengths" label="总时长" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.timelengths }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column prop="etc_times" label="操作" align="center">
                        <slot slot-scope="scope">
                            <div flex="main:center cross:center">
                                <div @click="mingxi(scope.row)" style="cursor: pointer; width: 60px; text-align: center">明细</div>
                            </div>
                        </slot>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="mingxiBox">
            <el-dialog :title="roomName" :visible.sync="dialogTableVisible" @close="handleClose" width="90%" class="tanTable tableTan">
                <el-table
                    :data="gridData"
                    border
                    v-loading="loadingMX"
                    element-loading-background="#0D1E3A"
                    :header-cell-class-name="headerStyle"
                    :header-cell-style="{ borderColor: tableBorder }"
                    :row-style="{ height: '0.56rem' }"
                    :row-class-name="tableRowClassName"
                >
                    <el-table-column property="date" label="序号" align="center">
                        <slot slot-scope="scope">
                            <span>{{ scope.$index + 1 }}</span>
                        </slot>
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        property="name"
                        label="状态"
                        align="center"
                        :filter-method="filterTag"
                        :filters="filtersZT"
                    >
                        <template slot-scope="scope">
                            <span :class="[statusColor[scope.row.runstatus]]">{{ status[scope.row.runstatus] }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column property="address" label="总时长(分钟)" align="center">
                        <slot slot-scope="scope">
                            {{ scope.row.timelengths | noValue }}
                        </slot>
                    </el-table-column>
                    <el-table-column property="address" label="开始时间" width="280" align="center">
                        <slot slot-scope="scope">
                            {{ scope.row.begintime | noValue }}
                        </slot>
                    </el-table-column>
                    <el-table-column property="address" label="结束时间" width="280" align="center">
                        <slot slot-scope="scope">
                            {{ scope.row.endtime | noValue }}
                        </slot>
                    </el-table-column>
                    <el-table-column property="address" label="上报时间" align="center">
                        <slot slot-scope="scope">
                            {{ scope.row.createtime | noValue }}
                        </slot>
                    </el-table-column>
                </el-table>
                <div class="footerhd">
                    <span slot="footer" class="dialog-footer">
                        <button class="handChaxun handXiao" @click="dialogTableVisible = false">关闭</button>
                        <button class="handChaxun" @click="mxCheXiao">撤销</button>
                    </span>
                </div>
            </el-dialog>
        </div>
        <div>
            <el-dialog title="手动上报" :visible.sync="dialogHand" @close="handleClose" width="90%" class="tanTable tableTan">
                <el-form :inline="true" class="demo-form-inline">
                    <div class="shangbaoSel" flex="main:justify">
                        <div class="shouTanSelct">
                            <el-form-item label="全部车间">
                                <el-select v-model="sbRoom" placeholder="全部车间">
                                    <el-option
                                        v-for="item in allCheJianArr"
                                        :key="item.room"
                                        :label="item.room"
                                        :value="item.id"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="设备">
                                <el-select v-model="shebeiVal" placeholder="设备" filterable clearable @focus="shebeiFocus">
                                    <el-option
                                        v-for="(item, index) in sheBeiArr"
                                        :key="index"
                                        :label="item.room + '-' + item.name + '#'"
                                        :value="item.device_id"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <!-- 
                                @focus="focusDateTan"
                                @blur="blurDateTan"
                             -->
                            <el-form-item label="选择时间">
                                <div class="DateChoose dctan ">
                                    <el-date-picker
                                        @change="changeDateTan"
                                        v-model="dateValueTan"
                                        type="datetimerange"
                                        range-separator="-"
                                        :clearable="false"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                    >
                                    </el-date-picker>
                                    <i class="el-icon-circle-close closeIcon" @click="clearTimeTan"></i>
                                </div>
                            </el-form-item>

                            <el-button @click="onselhandXun()" class="handChaxun eleBtn">查询</el-button>
                        </div>
                        <div class="shouTanSelct">
                            <el-form-item label="上报人">
                                <el-input v-model="personUp" readonly></el-input>
                            </el-form-item>
                            <el-form-item label="上报原因">
                                <el-select v-model="istype" placeholder="上报原因">
                                    <el-option v-for="item in ShangBaoArr" :key="item.room" :label="item.room" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </div>
                </el-form>
                <div class="sdtable">
                    <el-table
                        :data="handDataList"
                        border
                        ref="multipleTable"
                        v-loading="loadinghd"
                        element-loading-background="transparent"
                        :header-cell-class-name="headerStyle"
                        :header-cell-style="{ borderColor: tableBorder }"
                        :row-style="{ height: '0.56rem' }"
                        @selection-change="handleSelectionChange"
                        :row-class-name="tableRowClassName"
                        :row-key="(row) => row.id"
                    >
                        <el-table-column type="selection" width="55" align="center" :reserve-selection="true"> </el-table-column>
                        <!-- <el-table-column property="date" label="id" align="center">
                            <slot slot-scope="scope">
                                <span>
                                    {{scope.row.id  }}
                                </span>
                            </slot>
                        </el-table-column> -->
                        <el-table-column property="date" label="序号" align="center">
                            <slot slot-scope="scope">
                                <span>
                                    {{ (paramsDuoXuan.pager.page - 1) * paramsDuoXuan.pager.rows + scope.$index + 1 }}
                                    <!-- {{ (paramsDuoXuan.pager.page-1)*(scope.$index+1) }} -->
                                </span>
                            </slot>
                        </el-table-column>
                        <el-table-column property="device_name" label="设备" align="center">
                            <slot slot-scope="scope">
                                {{ scope.row.device_name | noValue }}
                            </slot>
                        </el-table-column>
                        <el-table-column
                            prop="runstatus"
                            property="runstatus"
                            label="状态"
                            align="center"
                            :filter-method="filterTag"
                            :filters="filtersZT"
                        >
                            <template slot-scope="scope">
                                <span :class="[statusColor[scope.row.runstatus]]">{{ status[scope.row.runstatus] }}</span>
                            </template>
                        </el-table-column>

                        <el-table-column property="address" label="总时长(分钟)" align="center">
                            <slot slot-scope="scope">
                                {{ scope.row.timelengths | noValue }}
                            </slot>
                        </el-table-column>
                        <el-table-column property="address" label="开始时间" width="280" align="center">
                            <slot slot-scope="scope">
                                {{ scope.row.begintime | noValue }}
                            </slot>
                        </el-table-column>
                        <el-table-column property="address" label="结束时间" width="280" align="center">
                            <slot slot-scope="scope">
                                {{ scope.row.endtime | noValue }}
                            </slot>
                        </el-table-column>
                        <el-table-column property="address" label="上报时间" width="280" align="center">
                            <slot slot-scope="scope">
                                {{ scope.row.createtime | noValue }}
                            </slot>
                        </el-table-column>
                    </el-table>
                    <div style="text-align: right; margin-top: 0.1rem">
                        <el-pagination
                            background
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="paramsDuoXuan.pager.page"
                            :page-sizes="[10, 20, 50, 100]"
                            :page-size="paramsDuoXuan.pager.rows"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="handTotal"
                        >
                        </el-pagination>
                    </div>
                </div>
                <div class="footerhd">
                    <span slot="footer" class="dialog-footer">
                        <button class="handChaxun handXiao" @click="dialogHand = false">取 消</button>
                        <button class="handChaxun" @click="getFunc_shangbao">上 报</button>
                    </span>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import {
    query_warning_log,
    query_report_list,
    query_device_list,
    func_shangbao,
    fun_shangbao_cancel,
    query_device_room
} from '../../api/api';
import { getTime, time_to_sec, yestodayTimeFun } from '../../utils/index';
import dateCom from './component/dateCom';
import titleCheck from './component/titleCheck.vue';
import compLogo from './component/compLogo.vue';
import '../common/loginStatus';
export default {
    components: { compLogo, dateCom, titleCheck },
    data() {
        let _minTime = null;
        let _maxTime = null;
        return {
            allCheJian: '',
            allCheJianArr: [],
            dateValue: '',
            tableData: [],
            dialogTableVisible: false,
            dialogHand: false,
            gridData: [],
            roomName: '',
            begintime: '',
            endtime: '',
            loading: false,
            loadingMX: false,
            moremStartTime: '',
            moremEndTime: '',
            // tableDataFu: [],
            zhanweiColor: true,
            num: 0,
            currentTime: '',
            cheJianHao: [],
            comp_id: 0,
            tableBorder: '',
            zhanweiBg: '',
            focus: true,
            checkNum: 5,
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
            filtersZT: [
                { text: '运行', value: 2 },
                { text: '手动', value: 99 },
                { text: '复位', value: 0 },
                { text: '停止', value: 1 },
                { text: '离线', value: -1 },
                { text: '暂停', value: 3 },
                { text: '开机', value: 4 },
                { text: '回原点', value: 5 },
                { text: '预热', value: 6 },
                { text: '拉水平', value: 7 },
                { text: '打表分中', value: 8 },
                { text: '换刀对刀', value: 9 },
                { text: '换程序', value: 10 },
                { text: '检查', value: 11 }
            ],
            handDataList: [
                // { id: 1 ,name:'000'},
                // { id: 2 ,name:'000'},
                // { id: 3 ,name:'000'},
                // { id: 4 ,name:'000'},
                // { id: 5 ,name:'000'},
                // { id: 6 ,name:'000'},
                // { id: 7 ,name:'000'},
                // { id: 8 ,name:'000'},
                // { id: 9 ,name:'000'},
                // { id: 10,name:'000' },
                // { id: 11,name:'000' }
            ],
            handTotal: 0,
            loadinghd: false,
            formInline: {},
            sheBeiArr: [],
            ShangBaoArr: [
                { id: 1, room: '机器维修' },
                { id: 2, room: '保养' },
                { id: 3, room: '缺料' },
                { id: 4, room: '无工待机' },
                { id: 5, room: '无生产任务' },
                { id: 6, room: '其他' }
            ],
            multipleSelection: [],
            personUp: localStorage.getItem('shangBaoName'),
            sbRoom: '',
            shebeiVal: '',
            arrids: '',
            istype: '',
            mignxiID: -1,
            currentPage4: 1,
            paramsDuoXuan: {
                pager: {
                    page: 1,
                    rows: 10
                },
                obj: {}
            },
            dateValueTan: '',
            begintimeTan: '',
            endtimeTan: '',
            pickerOptions: {
                // onPick(time) {
                //     // 如果选择了只选择了一个时间
                //     if (!time.maxDate) {
                //         let timeRange = 14 * 24 * 60 * 60 * 1000; // 6天
                //         _minTime = time.minDate.getTime() - timeRange; // 最小时间
                //         _maxTime = time.minDate.getTime() + timeRange; // 最大时间
                //         // 如果选了两个时间，那就清空本次范围判断数据，以备重选
                //     } else {
                //         _minTime = _maxTime = null;
                //     }
                // },
                // disabledDate(time) {
                //     // onPick后触发
                //     // 该方法会轮询当3个月内的每一个日期，返回false表示该日期禁选
                //     if (_minTime && _maxTime) {
                //         return time.getTime() < _minTime || time.getTime() > _maxTime;
                //     }
                // }
            }
        };
    },
    computed: {},
    watch: {},
    mounted() {
        if (localStorage.getItem('login_staus') == 1) {
            this.tableBorder = '#424B72';
            this.zhanweiBg = '#242C4A';
        } else if (localStorage.getItem('login_staus') == 2) {
            this.tableBorder = '#2B3B5C';
            this.zhanweiBg = '#242C4A';
        } else {
            this.tableBorder = '#ccc ';
            this.zhanweiBg = '#fff';
        }
        this.comp_id = Number(localStorage.getItem('comp_id'));

        // this.getQuery_device_room();
        this.init();
        this.timeInitTan();

        let userArr = JSON.parse(localStorage.getItem('dateValue'));
        if (userArr) {
        } else {
            this.dingshiTime();
        }


        function resizeFont() {
            //获取屏幕宽度
            let clientWidth = document.documentElement.clientWidth || document.body.clientWidth; //设计图参考宽度
            let design = 1920;
            if (clientWidth <= 820) {
                let rem = 820 / 19.2;
                document.getElementsByTagName('html').item(0).style.fontSize = rem + 'px';
            } else {
                document.getElementsByTagName('html').item(0).style.fontSize = (clientWidth / design) * 95.5 + 'px';
            }
        }
        resizeFont();
        window.onresize = function () {
            resizeFont();
        };
    },
    methods: {
        dingshiTime() {
            this.fiveTimer = setInterval(() => {
                this.init();
                // this.currentTime = getTime();
            }, 9000);

            // this.num = 9;
            // this.oneMinutes = setInterval(() => {
            //     if (this.num === 1) {
            //         this.num = 9;
            //     } else {
            //         this.num -= 1;
            //     }
            // }, 1000);
        },
        cleardingshi() {
            clearInterval(this.fiveTimer);
            clearInterval(this.oneMinutes);
        },
        init() {
            this.timeInit(this.focus);
            // this.timeInitTan();
            this.getQuery_report_list();
        },
        timeInit(focus) {
            if (focus) {
                let userArr = JSON.parse(localStorage.getItem('dateValue'));
                if (userArr) {
                    this.dateValue = userArr;
                    this.begintime = userArr[0];
                    this.endtime = userArr[1];
                    this.zhanweiColor = false;
                } else {
                    if (this.comp_id == 1) {
                        // 当前时间晚于七点半，默认查询时间是当天早上七点半-当前时间
                        // 当前时间早于七点半，默认查询时间是昨天早上七点半-当前时间
                        let currentGetTime = time_to_sec(getTime().split(' ')[1]);
                        let yesTodayTime = time_to_sec('07:30:00');
                        if (currentGetTime > yesTodayTime) {
                            this.moremStartTime = getTime().split(' ')[0] + ' 07:30:00';
                            this.moremEndTime = getTime();

                            let dateval = [];
                            dateval[0] = this.moremStartTime;
                            dateval[1] = this.moremEndTime;
                            this.dateValue = dateval;
                            this.begintime = dateval[0];
                            this.endtime = dateval[1];
                            this.$forceUpdate();
                        } else {
                            this.moremStartTime = yestodayTimeFun() + ' 07:30:00';
                            this.moremEndTime = getTime();

                            let dateval = [];
                            dateval[0] = this.moremStartTime;
                            dateval[1] = this.moremEndTime;
                            this.dateValue = dateval;
                            this.begintime = dateval[0];
                            this.endtime = dateval[1];
                            this.$forceUpdate();
                        }
                    } else {
                        let dateval = [];
                        this.begintime = getTime().split(' ')[0] + ' 00:00:00';

                        this.endtime = getTime().split(' ')[0] + ' 23:59:59';
                        dateval[0] = this.begintime;
                        dateval[1] = this.endtime;
                        this.dateValue = dateval;
                    }
                }
            } else {
            }
        },
        timeInitTan() {
            let dateval = [];
            this.begintimeTan = getTime().split(' ')[0] + ' 00:00:00';

            this.endtimeTan = getTime().split(' ')[0] + ' 23:59:59';
            dateval[0] = this.begintimeTan;
            dateval[1] = this.endtimeTan;
            this.dateValueTan = dateval;
        },
        selectChange() {
            let cheJian = this.allCheJian;
            // localStorage.setItem('allCheJian', cheJian);
        },
        onselhandXun() {
            this.getQuery_warning_log();
            this.arrids = '';
            this.multipleSelection = [];

            this.$refs.multipleTable.clearSelection();
        },
        sortNumber(a, b) {
            //升序
            return a - b;
        },
        handleSelectionChange(val) {
            let multipleSelection = val;
            let stringArr = [];
            if (multipleSelection.length >= 2) {
                let arr = [];
                for (let i = 0; i < multipleSelection.length; i++) {
                    arr.push(multipleSelection[i].wei_id);
                }
                arr.sort((a, b) => {
                    return a - b;
                });
                var result = [];
                var tmp;
                while ((tmp = arr.shift())) {
                    if (result.length == 0) {
                        result.push([tmp]);
                        continue;
                    }

                    var e = result[result.length - 1];
                    if (tmp == e[e.length - 1] + 1) {
                        e.push(tmp);
                        
                    } else {
                        result.push([tmp]);
                    }
                }
                let checkId;
                for (let i = 0; i < result.length; i++) {
                    for (let j = 0; j < result[i].length; j++) {
                        if (result[i].length <= 1) {
                            checkId = result[i];
                        }
                    }
                }
                // console.log(checkId, 'checkId');
                if (checkId >= 1) {
                    for (let i = 0; i < multipleSelection.length; i++) {
                        if (multipleSelection[i].wei_id == checkId.toString()) {
                            this.$message.warning('请选择连续的行');
                            this.$refs.multipleTable.toggleRowSelection(multipleSelection[i]);
                            return;
                        }
                    }
                }
                if (
                    multipleSelection[multipleSelection.length - 1].device_name !=
                    multipleSelection[multipleSelection.length - 2].device_name
                ) {
                    this.$message.warning('请选择相同的设备');
                    this.$refs.multipleTable.toggleRowSelection(multipleSelection[multipleSelection.length - 1]);
                    return;
                }
            }
            this.multipleSelection = multipleSelection;

            for (let i = 0; i < multipleSelection.length; i++) {
                stringArr.push(multipleSelection[i].id);
            }

            // console.log(stringArr.toString(),'stringArr===');
            this.arrids = stringArr.toString();
        },
        clearTime() {
            this.dateValue = '';
            this.changeDate();
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
            if (this.dateValue) {
                this.zhanweiColor = false;
                this.begintime = this.dateValue[0];
                this.endtime = this.dateValue[1];

                let endTime1 = this.endtime.split(' ');
                let begintime1 = this.begintime.split(' ');
                if (endTime1[1] == '00:00:00' && begintime1[0] != endTime1[0]) {
                    var datetime = new Date(this.endtime);
                    datetime.setSeconds(datetime.getSeconds() - 1);
                    var year = datetime.getFullYear();
                    var month = datetime.getMonth() + 1 < 10 ? '0' + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
                    var date = datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate();
                    var hour = datetime.getHours() < 10 ? '0' + datetime.getHours() : datetime.getHours();
                    var minute = datetime.getMinutes() < 10 ? '0' + datetime.getMinutes() : datetime.getMinutes();
                    var second = datetime.getSeconds() < 10 ? '0' + datetime.getSeconds() : datetime.getSeconds();
                    // console.log(year + "-" + month + "-" + date+" "+hour+":"+minute+":"+second,"22222222222");
                    this.endtime = year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;

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
        clearTimeTan() {
            this.dateValueTan = '';
            this.changeDateTan();
        },
        // focusDateTan() {
        //     this.focus = false;
        //     this.timeInit(this.focus);
        // },
        // blurDateTan() {
        //     this.focus = true;
        //     this.timeInit(this.focus);
        // },
        changeDateTan() {
            console.log(this.dateValueTan, 'this.dateValueTan====');
            if (this.dateValueTan) {
                this.zhanweiColor = false;
                this.begintimeTan = this.dateValueTan[0];
                this.endtimeTan = this.dateValueTan[1];
                console.log(this.begintimeTan, 'begintimeTan');
                let endTime1 = this.endtimeTan.split(' ');
                let begintime1 = this.begintimeTan.split(' ');
                console.log(begintime1, 'begintime1');
                if (endTime1[1] == '00:00:00' && begintime1[0] != endTime1[0]) {
                    var datetime = new Date(this.endtimeTan);
                    datetime.setSeconds(datetime.getSeconds() - 1);
                    var year = datetime.getFullYear();
                    var month = datetime.getMonth() + 1 < 10 ? '0' + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
                    var date = datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate();
                    var hour = datetime.getHours() < 10 ? '0' + datetime.getHours() : datetime.getHours();
                    var minute = datetime.getMinutes() < 10 ? '0' + datetime.getMinutes() : datetime.getMinutes();
                    var second = datetime.getSeconds() < 10 ? '0' + datetime.getSeconds() : datetime.getSeconds();
                    // console.log(year + "-" + month + "-" + date+" "+hour+":"+minute+":"+second,"22222222222");
                    this.endtimeTan = year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;

                    this.dateValueTan[1] = this.endtimeTan;
                } else if (this.begintimeTan == this.endtimeTan) {
                    this.endtimeTan = endTime1[0] + ' 23:59:59';
                    this.dateValueTan[1] = this.endtimeTan;
                }
                // localStorage.setItem('dateValueTan', JSON.stringify(this.dateValueTan));
            } else {
                // localStorage.removeItem('dateValueTan');
                // this.zhanweiColor = true;
                // this.timeInit(this.focus);
            }
        },

        filterTag(value, row) {
            // 一般用两个参数就可以，分别是filters筛选出来的value和每一行row
            return row['runstatus'] == value;
            // 把具体哪个字段跟筛选的值去比较，然后返回
        },

        filterTagCheJian(value, row) {
            return row['room'] == value;
        },
        filterTag2(value, row) {
            if (value == 1) {
                return row['runbi'] > 60;
            } else {
                return row['runbi'] <= 60;
            }
        },
        sortByDate(obj1, obj2) {
            let val1 = Number(obj1.over_time);
            let val2 = Number(obj2.over_time);
            return val1 - val2;
        },
        sortByDateYX(obj1, obj2) {
            let val1 = Number(obj1.run_time);
            let val2 = Number(obj2.run_time);
            return val1 - val2;
        },
        chooseSearch() {
            this.init();
        },
        handData() {
            this.dialogHand = true;
            this.getQuery_warning_log();
        },
        handleClose() {
            this.gridData = [];
            this.roomName = '';
        },

        mingxi(row) {
            this.dialogTableVisible = true;
            this.loadingMX = true;
            this.mignxiID = row.id;
            let params = {
                pager: {
                    page: 1,
                    rows: 2000
                },
                obj: {
                    compid: localStorage.getItem('comp_id'),
                    room: this.allCheJian ? this.allCheJian : 0,
                    device_id: 0,
                    ishandle: null
                }
            };
            query_warning_log(params).then((res) => {
                const { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    if (row) {
                        this.gridData = Data.rows;
                        this.roomName = row.room + '-' + row.device_name + '#';
                    }
                }
                this.loadingMX = false;
            });
        },
        mxCheXiao() {
            this.$confirm('确认要撤销此条上报数据?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    let params = {
                        compid: localStorage.getItem('comp_id'), //必填
                        id: this.mignxiID
                    };
                    fun_shangbao_cancel(params).then((res) => {
                        const { ReturnCode, Data } = res;
                        if (ReturnCode == 200) {
                            this.$message.success('撤销成功');
                            this.dialogTableVisible = false;
                            this.getQuery_report_list();
                        }
                    });
                })
                .catch(() => {
                    // this.$message({
                    //     type: 'info',
                    //     message: '已取消删除'
                    // });
                });
        },

        tableRowClassName({ row, rowIndex }) {
            if (rowIndex % 2 == 1) {
                return 'warning-row';
            } else {
                return 'success-row';
            }
        },
        headerStyle({ row, column, rowIndex, columnIndex }) {
            return 'tableStyle';
        },
        headerStyleDia({ row, column, rowIndex, columnIndex }) {
            return 'tableStyleDia';
        },
        getQuery_warning_log() {
            this.loadinghd = true;

            this.paramsDuoXuan.obj.compid = localStorage.getItem('comp_id');
            this.paramsDuoXuan.obj.room = this.sbRoom ? this.sbRoom : 0;
            this.paramsDuoXuan.obj.device_id = this.shebeiVal ? this.shebeiVal : 0;
            this.paramsDuoXuan.obj.ishandle = 0;
            this.paramsDuoXuan.obj.begintime = this.begintimeTan;
            this.paramsDuoXuan.obj.endtime = this.endtimeTan;
            query_warning_log(this.paramsDuoXuan).then((res) => {
                const { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    if (Data.rows != null) {
                        this.handDataList = Data.rows;
                        this.handTotal = Data.total;
                        if (this.handDataList.length > 0) {
                            for (let i = 0; i < this.handDataList.length; i++) {
                                // this.handDataList[i].wei_id = i + 1;
                                this.handDataList[i].wei_id = (this.paramsDuoXuan.pager.page - 1) * this.paramsDuoXuan.pager.rows + i;
                            }
                        }
                    } else {
                        this.handDataList = [];
                        this.handTotal = Data.total;
                    }
                }
                this.loadinghd = false;
            });
        },
        getQuery_report_list() {
            let params = {
                pager: {
                    page: 1,
                    rows: 2000
                },
                obj: {
                    compid: localStorage.getItem('comp_id'),
                    room: this.allCheJian ? this.allCheJian : 0,
                    device_id: 0,
                    istype: 0,
                    begintime: this.dateValue ? this.begintime : this.moremStartTime,
                    endtime: this.dateValue ? this.endtime : this.moremEndTime
                }
            };
            query_report_list(params).then((res) => {
                const { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    this.tableData = Data.rows;
                }
                this.loading = false;
            });
        },
        parentFn(dateValue, begintime, endtime) {
            this.dateValue = dateValue;
            this.begintime = begintime;
            this.endtime = endtime;
        },
        getQuery_device_list() {
            let params = {
                pager: {
                    page: 1,
                    rows: 2000
                },
                obj: {
                    compid: localStorage.getItem('comp_id'),
                    room: this.sbRoom ? this.sbRoom : 0,
                    device_id: 0
                }
            };
            query_device_list(params).then((res) => {
                const { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    this.sheBeiArr = Data.rows;
                }
            });
        },
        shebeiFocus() {
            this.getQuery_device_list();
        },
        getFunc_shangbao() {
            if (this.arrids == '') {
                this.$message.warning('请选择上报行');
                return;
            }
            var istypes = '';
            if (this.istype == '') {
                this.$message.warning('请选择上报原因');
                return;
            } else {
                for (let i = 0; i < this.ShangBaoArr.length; i++) {
                    if (this.ShangBaoArr[i].id == this.istype) {
                        istypes = this.ShangBaoArr[i].room;
                    }
                }
            }
            let params = {
                compid: localStorage.getItem('comp_id'),
                device_id: this.multipleSelection[0].device_id,
                arrids: this.arrids,
                istype: this.istype,
                istypes: istypes,
                createman: this.personUp
            };
            func_shangbao(params).then((res) => {
                const { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    this.$message.success('上报成功');
                    this.dialogHand = false;

                    this.init();
                }
            });
        },
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            this.paramsDuoXuan.pager.rows = val;
            this.getQuery_warning_log();
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.paramsDuoXuan.pager.page = val;
            this.getQuery_warning_log();
        },
        getQuery_device_room() {
            let params = {
                compid: localStorage.getItem('comp_id')
            };
            query_device_room(params).then((res) => {
                const { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    this.cheJianHao = Data;
                    for (let i = 0; i < this.cheJianHao.length; i++) {
                        this.cheJianHao[i].text = '车间' + this.cheJianHao[i].room;
                        this.cheJianHao[i].value = this.cheJianHao[i].room;
                    }
                }
            });
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
    destroyed() {
        clearInterval(this.fiveTimer);
        clearInterval(this.oneMinutes);
    },
    activated() {}
};
</script>
<style lang='scss'>
.allStatusClass .el-select .el-input__inner {
    width: 1.62rem;
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
    .el-range-editor--small .el-range-input {
        background: transparent;
    }
}
.allStatusClass_2 .el-select .el-input__inner{
    background: #3d9aff;
}
.upZhe{
     width: 4.8rem;
    .el-input__inner{
    width: 4.8rem;
}
.el-range-separator{
    color: #000;
}

}
</style>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.chooseBtn {
    background: #3d9aff 100% no-repeat;
    color: #fff;
}
</style>