<template>
    <div class="detailBing" style="height: auto">
        <div class="homePageTitle" flex="cross:center main:justify">
            <div>
                <div flex="cross:center ">
                    <div class="allStatusClass allStatusClass_2" style="margin: 0 20px 0 20px">
                        <el-select
                            v-model="allCheJian"
                            @change="selectChange"
                            clearable
                            :popper-append-to-body="false"
                            placeholder="全部车间"
                        >
                            <el-option v-for="item in cheJianHao" :key="item.room" :label="item.room + '号车间'" :value="item.room">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="DateChoose DateChooseSingle leftJiaoData neizhizhe" :class="{ zhanweiColor: zhanweiColor }">
                        <div class="leftJiao"></div>
                        <el-date-picker
                            @change="changetodayDate"
                            :clearable="false"
                            v-model="todayDate"
                            value-format="yyyy-MM-dd"
                            type="date"
                            placeholder="选择日期"
                        >
                        </el-date-picker>
                        <i class="el-icon-circle-close closeIcon" @click="cleartodayDate"></i>
                    </div>
                    <div class="DateChoose DateChooseSingleMines leftJiaoData zhequjian" :class="{ zhanweiColor: zhanweiColor }">
                        <div class="leftJiao"></div>
                        <el-time-picker
                            is-range
                            :clearable="false"
                            v-model="todayMinDate"
                            range-separator="-"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                            placeholder="选择时间范围"
                            value-format="HH:mm:ss"
                            popper-class="mydatestyle"
                            @change="changetodayMinDate"
                        >
                        </el-time-picker>
                        <i class="el-icon-circle-close closeIcon" @click="cleartodayMinDate"></i>
                    </div>

                    <div>
                        <button class="chooseBtn" style="margin: 0 20px" @click="chooseSearch()">查询</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="statisticalBody" style="min-height: 9rem" v-loading="loading" element-loading-background="transparent">
            <div class="ssJinJi">
                <ul flex="main:justify" flex-wrap element-loading-spinner="el-icon-loading" element-loading-background="#182039">
                    <li v-for="(item, index) in zheXianArr" :key="index" style="max-height: 3.2rem">
                        <div class="ssJinJi_title">
                            <div class="st_left" flex="cross:center">
                                <div flex="cross:center" class="fiveLeft">
                                    <span class="st_dot"></span><span>{{ item.room }}-{{ item.device_name }}#</span>
                                </div>
                            </div>
                            <div class="st_right" @click="mingxi(item)">明细</div>
                        </div>
                        <div class="ssJinJi_body" flex="main:justify" v-show="item.time_arr.length > 0" style="height: 3rem">
                            <div style="width: 88%">
                                <div class="ssJinJi_body_left">
                                    <div :id="'Echarts' + index" :ref="'Echarts' + index" style="width: 100%; height: 1.7rem"></div>
                                </div>
                                <div class="ssJinJi_body_right">
                                    <div>
                                        <div class="oneLineHua stat_olhua" @mouseenter="mouseEnter" @mouseleave="mouseleave">
                                            <el-carousel arrow="never" :interval="15000" height="0.85rem" :autoplay="autoplay" :loop="true">
                                                <el-carousel-item v-for="(items, indexs) in item.zmEndOneArr" :key="indexs" flex>
                                                    <div
                                                        v-for="(itemOne, index) in items"
                                                        :key="index"
                                                        class="zheXianWidth"
                                                        flex="dir:top cross:center "
                                                    >
                                                        <div class="small h3" :class="colorClass(itemOne.value)">
                                                            {{ itemOne.value
                                                            }}<span style="font-size: 0.12rem" v-show="itemOne.value != '--'">%</span>
                                                        </div>
                                                        <div class="small h5">{{ itemOne.time }}</div>
                                                    </div>
                                                </el-carousel-item>
                                            </el-carousel>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="zheJun" style="width: 12%">
                                <ul class="zheJun_Hei">
                                    <li>
                                        <div class="zh_val" :class="colorClass(item.mathAverage)">{{ item.mathAverage }}%</div>
                                        <div class="zh_T">平均值</div>
                                    </li>
                                    <li>
                                        <div class="zh_val" :class="colorClass(item.mathMax)">{{ item.mathMax }}%</div>
                                        <div class="zh_T">最大值</div>
                                    </li>
                                    <li>
                                        <div class="zh_val minVal" :class="colorClass(item.mathMin)">{{ item.mathMin }}%</div>
                                        <div class="zh_T">最小值</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="ssJinJi_body" flex="cross:center main:center" v-show="item.time_arr.length <= 0">
                            设备未运行，暂无数据
                        </div>
                    </li>
                </ul>
                <!-- <ul v-else style="height:8.5rem;background:#182039;font-size:0.18rem;color:#ddd;text-align:center;padding-top:0.2rem;" >
                    暂无数据
                </ul> -->
            </div>
        </div>

        <div class="mingxiBox">
            <el-dialog :title="roomName" :visible.sync="dialogTableVisible" @close="handleClose" width="95%" class="tanTable tableTan">
                <el-table
                    :data="gridData"
                    border
                    :header-cell-class-name="headerStyleDia"
                    v-loading="loadingMX"
                    element-loading-background="transparent"
                    :row-class-name="tableRowClassName"
                    @filter-change="filterChange"
                >
                    <el-table-column property="date" label="序号" align="center" width="60">
                        <slot slot-scope="scope">
                            <span>
                                {{ (paramsMX.pageindex - 1) * paramsMX.pagesize + scope.$index + 1 }}
                            </span>
                        </slot>
                    </el-table-column>
                    <el-table-column prop="name" property="name" label="状态" align="center" column-key="RunStatus" :filters="filtersZT">
                        <template slot-scope="scope">
                            <span :class="[$global.statusColor[scope.row.RunStatus]]">{{ $global.status[scope.row.RunStatus] }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column property="address" label="总时长" align="center">
                        <slot slot-scope="scope">
                            {{ scope.row.TotalSecond | times | noValue }}
                        </slot>
                    </el-table-column>
                    <el-table-column property="address" label="主轴转数" align="center">
                        <slot slot-scope="scope">
                            {{ scope.row.SpindleSpeed | noValue }}
                        </slot>
                    </el-table-column>
                    <el-table-column property="address" label="主轴倍率" align="center">
                        <slot slot-scope="scope">
                            <span v-show="scope.row.SpindleOverride > 100" :style="{ color: '#E63A3F' }">
                                {{ scope.row.SpindleOverride }}%
                            </span>
                            <span v-show="scope.row.SpindleOverride < 100" :style="{ color: '#44c881' }">
                                {{ scope.row.SpindleOverride }}%
                            </span>
                            <span v-show="scope.row.SpindleOverride == 100"> {{ scope.row.SpindleOverride }}% </span>
                        </slot>
                    </el-table-column>
                    <el-table-column property="address" label="进给速度" align="center">
                        <slot slot-scope="scope">
                            {{ scope.row.Feedrate | noValue }}
                        </slot>
                    </el-table-column>
                    <el-table-column property="address" label="进给倍率" align="center">
                        <slot slot-scope="scope">
                            <span v-show="scope.row.FeedrateOverride > 100" :style="{ color: '#E63A3F' }">
                                {{ scope.row.FeedrateOverride }}%
                            </span>
                            <span v-show="scope.row.FeedrateOverride < 100" :style="{ color: '#44c881' }">
                                {{ scope.row.FeedrateOverride }}%
                            </span>
                            <span v-show="scope.row.FeedrateOverride == 100"> {{ scope.row.FeedrateOverride }}% </span>
                        </slot>
                    </el-table-column>
                    <el-table-column property="address" label=" 程序名" width="" align="center">
                        <slot slot-scope="scope">
                            <el-tooltip :content="scope.row.Program | noValue" placement="top">
                                <span class="chengxuxz">{{ scope.row.Program | noValue }}</span>
                            </el-tooltip>
                        </slot>
                    </el-table-column>
                    <!-- <el-table-column property="address" label="刀具编号" width="" align="center">
                        <slot slot-scope="scope">
                            {{ scope.row.CutterCode | noValue }}
                        </slot>
                    </el-table-column>
                    <el-table-column property="address" label="刀具直径" width="" align="center">
                        <slot slot-scope="scope">
                            {{ scope.row.CutterDiameter | noValue }}
                        </slot>
                    </el-table-column>
                    <el-table-column property="address" label="刀具尺寸" width="" align="center">
                        <slot slot-scope="scope">
                            {{ scope.row.CutterSize  | noValue }}
                        </slot>
                    </el-table-column> -->
                    <el-table-column property="address" label="开始时间" width="170" align="center">
                        <slot slot-scope="scope">
                            {{ scope.row.BeginTime | noValue }}
                        </slot>
                    </el-table-column>
                    <el-table-column property="address" label="结束时间" width="170" align="center">
                        <slot slot-scope="scope">
                            {{ scope.row.EndTime | noValue }}
                        </slot>
                    </el-table-column>

                    <el-table-column property="address" label="智能合约" align="center">
                        <slot slot-scope="scope">
                            <!-- <span class="shenglue" >
                                {{ scope.row.linkID | noValue }}
                            </span> -->
                            <el-tooltip :content="scope.row.linkID | noValue" placement="top">
                                <i class="el-icon-document" @click="hashClick(scope.row)"></i>
                            </el-tooltip>
                        </slot>
                    </el-table-column>
                </el-table>
                <div>
                    <el-pagination
                        style="text-align: right; margin-top: 10px"
                        background
                        @size-change="handleSizeMX"
                        @current-change="handleCurrentMX"
                        :current-page="paramsMX.pageindex"
                        :page-sizes="[20, 50, 100]"
                        :page-size="paramsMX.pagesize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalMX"
                    >
                    </el-pagination>
                </div>
            </el-dialog>
        </div>
        <el-dialog title="智能合约查询结果" :visible.sync="hashDio" width="50%">
            <div style="font-weight: 600">
                <div>智能合约: {{ rowLinkText }}</div>
                <br />
                <div>原始数据：</div>
                <br />
                <div>
                    {{ pageHash }}
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import echarts from 'echarts';
import { GetFreerateOverride, getroom, GetDeviceDetial } from '../../api/api';
import titleCheck from './component/titleCheck.vue';
import { getTime, time_to_sec, yestodayTimeFun } from '../../utils/index';
import compLogo from './component/compLogo.vue';
import '../common/loginStatus';
let Base64 = require('js-base64').Base64;
export default {
    components: { compLogo, titleCheck },
    data() {
        return {
            allStatus: '',
            allStatusArr: [
                { runstatus: -1, label: '离线' },
                { runstatus: 0, label: '复位' },
                { runstatus: 1, label: '停止' },
                { runstatus: 2, label: '运行' },
                { runstatus: 3, label: '暂停' },
                { runstatus: 99, label: '手动' }
            ],
            allCheJian: '',
            cheJianHao: [],
            SearchValue: '',
            dateValue: '',
            tableData: [],
            begintime: '',
            endtime: '',
            zhanweiColor: true,
            currentTime: '',
            num: 0,
            comp_id: 0,
            focus: true,
            checkNum: 3,
            oneLineBox: [],
            params: {
                pager: {
                    page: 1,
                    rows: 10
                },
                obj: {}
            },
            newArrOne: [],
            todayMinDate: '',
            todayDate: '',
            flagtype: 1,
            autoplay: true,

            diodevice_id0: '',
            diodevice_id1: '',
            zmEndOneArr: [],
            zmEndTwoArr: [],
            zheXianArr: [],
            guoLvShiJian: '',
            guoLvShiJianArr: [
                { id: 60, value: '1 min' },
                { id: 300, value: '5 min' },
                { id: 600, value: '10 min' },
                { id: 1200, value: '20 min' }
            ],
            loading: false,
            xian: '',
            xcolor: '',
            zxcolor: '',
            dengyu100: '',
            paramsMX: {
                pageindex: 1,
                pagesize: 20
            },
            totalMX: 0,
            loadingMX: false,
            gridData: [],
            roomName: '',
            dialogTableVisible: false,

            pageHash: '',
            rowLinkText: '',
            hashDio: false,
            filtersZT: [
                { text: '手动', value: 99 },
                { text: '离线', value: -1 },
                { text: '复位', value: 0 },
                { text: '停止', value: 1 },
                { text: '运行', value: 2 },
                { text: '暂停', value: 3 },
                { text: '开机', value: 4 },
                { text: '回原点', value: 5 },
                { text: '预热', value: 6 },
                { text: '拉水平', value: 7 },
                { text: '打表分中', value: 8 },
                { text: '换刀对刀', value: 9 },
                { text: '换程序', value: 10 },
                { text: '检查', value: 11 }
            ]
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.comp_id = Number(localStorage.getItem('comp_id'));
        
        if (localStorage.getItem('allCheJian')) {
            this.allCheJian = Number(localStorage.getItem('allCheJian'));
        }
        this.getGetroom();
        this.timeInit(this.focus);
        this.init();

        this.dingshiTime();

        function resizeFont() {
            let clientWidth = document.documentElement.clientWidth || document.body.clientWidth; 
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
        filterChange(filterObj) {
            if (filterObj.RunStatus.length > 0) {
                this.paramsMX.runStatus = filterObj.RunStatus;
            } else {
                this.paramsMX.runStatus = '';
            }
            this.mingxi(this.rowMX);
        },
        hashClick(row) {
            this.hashDio = true;
            this.rowLinkText = row.linkID;

            this.$axios
                .post('https://link.moldcube.com/', {
                    jsonrpc: '2.0',
                    id: row.ID,
                    method: 'Chain33.QueryTransaction',
                    params: [
                        {
                            hash: row.linkID
                        }
                    ]
                })
                .then((res) => {
                    let linshi = this.HexToString(res.data.result.tx.rawPayload.substr(2)).trim();

                    this.pageHash = Base64.decode(JSON.parse(linshi).data);
                });
        },
        HexToString(str) {
            if (str.length % 2 != 0) {
                this.$message.error('必须为偶数');
                return '';
            }
            let num;
            let arr = [];
            for (var i = 0; i < str.length; i = i + 2) {
                num = parseInt(str.substr(i, 2), 16);
                arr.push(String.fromCharCode(num));
            }
            return arr.join('');
        },
        handleSizeMX(val) {
            this.paramsMX.pagesize = val;
            this.mingxi(this.rowMX);
        },
        handleCurrentMX(val) {
            this.paramsMX.pageindex = val;
            this.mingxi(this.rowMX);
        },
        tableRowClassName({ row, rowIndex }) {
            if (rowIndex % 2 == 1) {
                return 'warning-row';
            } else {
                return 'success-row';
            }
        },
        headerStyleDia({ row, column, rowIndex, columnIndex }) {
            return 'tableStyleDia';
        },

        handleClose() {
            this.gridData = [];
            this.roomName = '';
            this.paramsMX.pageindex = 1;
        },
        dingshiTime() {
            this.fiveTimer = setInterval(() => {
                this.init();
            }, 9000);
        },
        cleardingshi() {
            clearInterval(this.fiveTimer);
            clearInterval(this.oneMinutes);
        },
        colorClass(val) {
            let returnVal;
            if (0 <= val && val <= 50) {
                returnVal = 'activeCol1';
            } else if (50 < val && val <= 99) {
                returnVal = 'activeCol2';
            } else if (99 < val && val <= 100) {
                returnVal = 'activeCol3';
            } else if (val > 100) {
                returnVal = 'activeCol4';
            }
            return returnVal;
        },
        changeGl() {},
        changeZhu() {
            this.flagtype = 2;
            this.getGet_number_ave_time();
        },
        changeJin() {
            this.flagtype = 1;
            this.getGet_number_ave_time();
        },
        mouseEnter() {
            this.autoplay = false;
        },
        mouseleave() {
            this.autoplay = true;
        },
        selectChange() {
            let cheJian = this.allCheJian;
            localStorage.setItem('allCheJian', cheJian);
        },
        init() {
            this.getGetFreerateOverride();
        },
        timeInit(focus) {
            if (focus) {
                this.zhanweiColor = true;
                this.todayDate = getTime().split(' ')[0];

                let todayMin = [];
                this.begintime = getTime().split(' ')[0] + ' 00:00:00';

                this.endtime = getTime().split(' ')[0] + ' 23:59:59';
                todayMin[0] = '00:00:00';
                todayMin[1] = '23:59:59';
                this.todayMinDate = todayMin;
            } else {
            }
        },
        clearTime() {
            this.dateValue = '';
            this.changeDate();
        },
        cleartodayDate() {
            this.todayDate = getTime().split(' ')[0];
            this.zhanweiColor = true;
            this.cleardingshi();
            this.dingshiTime();
        },
        cleartodayMinDate() {
            let todayMin = [];
            todayMin[0] = '00:00:00';
            todayMin[1] = '23:59:59';
            this.todayMinDate = todayMin;
            this.zhanweiColor = true;
            this.cleardingshi();
            this.dingshiTime();
        },
        changetodayMinDate() {
            this.zhanweiColor = false;
            this.cleardingshi();
        },
        changetodayDate() {
            this.zhanweiColor = false;
            this.cleardingshi();
        },
        chooseSearch() {
            this.getGetFreerateOverride();
        },
        getGetFreerateOverride() {
            this.params = {
                CP_ID: localStorage.getItem('comp_id'),
                Device_ID: 0,
                BeginTime: this.todayDate ? this.todayDate + ' ' + this.todayMinDate[0] : this.begintime, //'2021-09-12 00:00:00',
                EndTime: this.todayDate ? this.todayDate + ' ' + this.todayMinDate[1] : this.endtime, //'2021-09-12 20:00:00',
                EndablePager: 0, //是否分页
                Room: this.allCheJian ? this.allCheJian : 0,
                Status: 0
                // miao: this.guoLvShiJian ? this.guoLvShiJian : 60
            };
            GetFreerateOverride(this.params).then((res) => {
                const { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    let feeData = [];
                    Object.keys(Data).forEach((key) => {
                        feeData.push(Data[key]);
                    });
                    var zx = [];
                    for (let i = 0; i < feeData.length; i++) {
                        var timeArr = [];
                        var timeedArr = [];
                        var numArr = [];
                        var kongobj = {};
                        var room = '';
                        var device_name = '';
                        var device_id = -1;
                        for (let j = 0; j < feeData[i].length; j++) {
                            let begin = feeData[i][j].BeginTime.split(' ')[1].substring(
                                0,
                                feeData[i][j].BeginTime.split(' ')[1].length - 3
                            );
                            let end = feeData[i][j].EndTime.split(' ')[1].substring(0, feeData[i][j].EndTime.split(' ')[1].length - 3);
                            numArr.push(feeData[i][j].FeedrateOverride);
                            timeArr.push(begin);
                            timeedArr.push(begin + '-' + end);
                            room = feeData[i][0].Room;
                            device_name = feeData[i][0].Name;
                            device_id = feeData[i][0].Device_id;
                        }
                        kongobj.time_arr = timeArr;
                        kongobj.timeed_arr = timeedArr;
                        kongobj.num_arr = numArr;
                        kongobj.room = room;
                        kongobj.device_name = device_name;
                        kongobj.device_id = device_id;
                        zx.push(kongobj);
                    }
                    let zheXianArr = zx;
                    for (let i = 0; i < zheXianArr.length; i++) {
                        zheXianArr[i].mathMax = zheXianArr[i].num_arr.length > 0 ? Math.max(...zheXianArr[i].num_arr) : 0;
                        zheXianArr[i].mathMin = zheXianArr[i].num_arr.length > 0 ? Math.min(...zheXianArr[i].num_arr) : 0;
                        zheXianArr[i].mathAverage =
                            zheXianArr[i].num_arr.length > 0
                                ? Math.floor(zheXianArr[i].num_arr.reduce((a, b) => a + b) / zheXianArr[i].num_arr.length)
                                : 0;
                        let zouMaOneArr = [];

                        for (let j = 0; j < zheXianArr[i].num_arr.length; j++) {
                            for (let m = 0; m < zheXianArr[i].timeed_arr.length; m++) {
                                if (j == m) {
                                    let zouMaOne = {};
                                    zouMaOne.value = zheXianArr[i].num_arr[j];
                                    zouMaOne.time = zheXianArr[i].timeed_arr[j];
                                    zouMaOneArr.push(zouMaOne);
                                }
                            }
                        }
                        // 二维
                        let zouMaOneArrLength = Math.ceil(zouMaOneArr.length / 10);
                        let newArrLength = [];
                        for (let n = 0; n < zouMaOneArrLength; n++) {
                            if (zouMaOneArr.length >= 10) {
                                newArrLength[n] = zouMaOneArr.splice(0, 10);
                            } else {
                                newArrLength[n] = zouMaOneArr.splice(0, 10);
                                let num = Number(10 - newArrLength[n].length);
                                for (let k = 0; k < num; k++) {
                                    newArrLength[n].push({ value: '--', time: '' });
                                }
                            }
                        }
                        zheXianArr[i].zmEndOneArr = newArrLength;
                    }
                    this.zheXianArr = zheXianArr;
                    this.$nextTick(() => {
                        if (localStorage.getItem('login_staus') > 2) {
                            this.xian = '#EFEFEF';
                            this.xcolor = '#786E8B';
                            this.zxcolor = '#F09B5F';
                            this.dengyu100 = '#3B1E65';
                        } else {
                            this.xian = '#2D4063';
                            this.xcolor = '#8798FF';
                            this.zxcolor = '#66E1FB';
                            this.dengyu100 = '#fff';
                        }
                        for (let i = 0; i < zheXianArr.length; i++) {
                            this.echarts(
                                i,
                                zheXianArr[i].mathMax,
                                zheXianArr[i].time_arr,
                                zheXianArr[i].num_arr,
                                zheXianArr[i].device_name,
                                zheXianArr[i].timeed_arr
                            );
                        }
                    });
                }
                this.loading = false;
            });
        },
        echarts(i, mathMax, dateList, valueList, device_id0, timeed_arr) {
            let this_ = this;
            this_.myChart = echarts.init(document.getElementById('Echarts' + i));
            let resizeTimer = null;

            let option = {
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params) {
                        let firstParams = params[0];
                        return firstParams.marker + device_id0 + '#' + '&nbsp' + firstParams.name + '<br>' + firstParams.data + ' %';
                    }
                },
                xAxis: {
                    data: dateList,
                    gridIndex: 0,
                    type: 'category',
                    boundaryGap: false,
                    axisLine: {
                        lineStyle: {
                            color: this_.xian //X轴的颜色
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: this_.xcolor, //x轴文字颜色
                            fontSize: '12'
                        }
                    },
                    axisTick: {
                        //x轴刻度线
                        show: false
                    }
                },
                yAxis: {
                    gridIndex: 0,
                    type: 'value',
                    max: mathMax,
                    // min: 0,
                    axisLine: {
                        lineStyle: {
                            color: this_.xian //y轴的颜色
                        }
                    },
                    splitLine: {
                        show: true, //虽然是y轴  但是是横线
                        lineStyle: {
                            color: [this_.xian],
                            width: 1,
                            type: 'solid'
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: this_.xcolor,
                            fontSize: '12'
                        }
                    },
                    nameTextStyle: {
                        color: [this_.xcolor]
                    },
                    axisTick: {
                        //y轴刻度线
                        show: false
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '8%',
                    top: '10%',
                    containLabel: true
                },
                visualMap: {
                    show: false,
                    type: 'piecewise',
                    pieces: [
                        {
                            gte: 0,
                            lte: 50,
                            color: '#e63a3f'
                        },
                        {
                            gt: 50,
                            lte: 99,
                            color: '#FF9399'
                        },
                        {
                            gt: 99,
                            lte: 100,
                            color: this_.dengyu100
                        },
                        {
                            gt: 100,
                            color: '#E8B988'
                        }
                    ]
                },
                series: [
                    {
                        type: 'line',
                        showSymbol: true,
                        data: valueList,
                        smooth: true, //圆滑的曲线
                        symbol: 'circle', //设定为实心点
                        symbolSize: 8, //设定实心点的大小

                        itemStyle: {
                            normal: {
                                color: this_.zxcolor, //线的颜色
                                lineStyle: {
                                    color: this_.zxcolor
                                }
                            }
                        }
                    }
                ]
            };
            this_.myChart.setOption(option, true);
            this_.myChart.resize();

            window.addEventListener('resize', () => {
                if (resizeTimer) clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    echarts.init(document.getElementById('Echarts' + i)).resize();
                }, 100);
            });
        },

        mingxi(row) {
            this.rowMX = row;
            this.dialogTableVisible = true;
            this.loadingMX = true;
            this.paramsMX.CP_ID = localStorage.getItem('comp_id');
            this.paramsMX.BeginTime = this.begintime; //2021-09-12 00:00:00',
            this.paramsMX.EndTime = this.endtime; //'2021-09-13 00:00:00', //
            this.paramsMX.Device_ID = row.device_id;
            this.paramsMX.EndablePager = 1;
            GetDeviceDetial(this.paramsMX).then((res) => {
                const { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    this.gridData = Data.Data;
                    this.totalMX = Data.PageCount;
                    if (row) {
                        this.roomName = row.room + '-' + row.device_name + '#运行明细';
                    }
                }
                this.loadingMX = false;
            });
        },
        dioClose() {
            this.diodevice_id0 = '';
            this.diodevice_id1 = '';
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
    },
    activated() {}
};
</script>
<style lang='scss'>
.stat_olhua {
    .el-carousel {
        .el-carousel__container {
            margin-bottom: 0.35rem;
        }
    }
}
.el-icon-loading {
    font-size: 0.3rem;
}
.allStatusClass .el-select .el-input__inner {
    width: 1.62rem;
}
.DateChooseSingleMines .el-range-editor--small .el-range-input {
    width: 1.8rem;
}

.leftJiaoData {
    border: none;
    position: relative;
    .el-range-separator {
        color: #000;
    }
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
.allStatusClass_2 .el-select .el-input__inner {
    background: #3d9aff;
}
.neizhizhe {
    width: 2.3rem;
}
.neizhizhe .el-input__inner {
    width: 2.3rem;
}
</style>
<style lang='scss' scoped>
//@import url(); 引入公共css类

.detailBing {
    min-width: 1160px;
}
.statisticalBody .ssJinJi ul li {
    margin-bottom: 0.5rem;
    .ssJinJi_body {
        height: 2.8rem;
    }
}

.zhequjian {
    width: 3.8rem;
}
.zhequjian .el-input__inner {
    width: 3.8rem;
}
.chengxuxz {
    display: block;
    width: 70px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
}

.statisticalBody .ssJinJi ul li .ssJinJi_title .st_right {
    cursor: pointer;
}
.chooseBtn {
    background: #3d9aff 100% no-repeat;
    color: #fff;
}
</style>