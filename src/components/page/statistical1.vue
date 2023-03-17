<template>
    <div class="detailBing">
        <div class="currentFixed">
            <div>上次刷新时间：{{ this.currentTime.split(' ')[1] }}</div>
            <div>
                刷新倒计时：<span class="miao">{{ this.num }}</span>
            </div>
        </div>
        <div>
            <div class="homePageTitle" flex="cross:center ">
                <!-- <div class="tlogo" flex="main:center cross:center">
                    <img v-show="comp_id == 1" src="../common/comImg/index/homeLogo.png" alt="" />
                    <img v-show="comp_id >1" src="../common/comImg/index/homeLogo1.png" alt="" />
                </div> -->
                <title-check :num="checkNum"></title-check>
                <div class="allStatusClass" style="margin: 0 20px 0 0">
                    <el-select v-model="allCheJian" @change="selectChange" :popper-append-to-body="false" placeholder="全部车间">
                        <el-option v-for="item in allCheJianArr" :key="item.room" :label="item.room" :value="item.id"> </el-option>
                    </el-select>
                </div>
                <div class="DateChoose DateChooseSingle" :class="{ zhanweiColor: zhanweiColor }">
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
                <div class="DateChoose DateChooseSingleMin" :class="{ zhanweiColor: zhanweiColor }">
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
                <div class="beilv">
                    <ul flex="cross:center">
                        <li @click="changeZhu">
                            <span :class="[flagtype == 2 ? 'zhubl' : '']">主轴倍率</span>
                        </li>
                        <li @click="changeJin">
                            <span :class="[flagtype == 1 ? 'zhubl' : '']">进给倍率</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="statisticalBody">

            <el-table
                ref="multipleTable"
                border
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                
                <el-table-column
                label="日期"
                >
                <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名"
                >
                </el-table-column>
                <el-table-column
                prop="address"
                label="地址"
                align="center"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                type="selection"
                width="55"
                >
                </el-table-column>
            </el-table>
            <div class="ssJinJi">
                <ul flex="main:justify" flex-wrap>
                    <li v-for="(item, index) in newArrOne" :key="index">
                        <div class="ssJinJi_title">
                            <div class="st_left" flex="cross:center">
                                <div flex="cross:center" class="fiveLeft">
                                    <span class="st_dot"></span><span>{{ item.device_id1 }}#</span>
                                </div>
                                <div flex="cross:center" class="sixLeft">
                                    <span class="st_dot1"></span><span>{{ item.device_id0 }}#</span>
                                </div>
                            </div>
                            <div class="st_right" @click="detailBeilv(index)">详情</div>
                        </div>
                        <div class="ssJinJi_body" flex="main:justify">
                            <div class="ssJinJi_body_left">
                                <div :id="'Echarts' + index" :ref="'Echarts' + index" style="height: 1.8rem"></div>
                            </div>
                            <!-- <div class="ssJinJi_body_right">
                                <div>
                                    <div flex="cross:center" class="st_left littleLeft">
                                        <span class="st_dot"></span><span>{{ item.device_id1 }}#</span>
                                    </div>
                                    <div class="oneLineHua" @mouseenter="mouseEnter" @mouseleave="mouseleave">
                                        <el-carousel arrow="never" :interval="15000" height="0.78rem" :autoplay="autoplay" :loop="true">
                                            <el-carousel-item v-for="(items, indexs) in item.zmEndOneArr" :key="indexs" flex>
                                                <div
                                                    v-for="(itemOne, index) in items"
                                                    :key="index"
                                                    class="zheXianWidth"
                                                    flex="dir:top cross:center "
                                                >
                                                    <div
                                                        class="small h3"
                                                        :style="{
                                                            color:
                                                                itemOne.value < 100 ? '#FF9399' : itemOne.value > 100 ? '#E8B988' : '#fff'
                                                        }"
                                                    >
                                                        {{ itemOne.value
                                                        }}<span style="font-size: 0.12rem" v-show="itemOne.value != '--'">%</span>
                                                    </div>
                                                    <div class="small h5">{{ itemOne.time }}</div>
                                                </div>
                                            </el-carousel-item>
                                        </el-carousel>
                                    </div>
                                </div>
                                <div>
                                    <div flex="cross:center" class="st_left littleLeft">
                                        <span class="st_dot1"></span><span>{{ item.device_id0 }}#</span>
                                    </div>
                                    <div class="oneLineHua" @mouseenter="mouseEnter" @mouseleave="mouseleave">
                                        <el-carousel arrow="never" :interval="15000" height="0.78rem" :autoplay="autoplay" :loop="true">
                                            <el-carousel-item v-for="(items, indexs) in item.zmEndTwoArr" :key="indexs" flex>
                                                <div
                                                    v-for="(itemOne, index) in items"
                                                    :key="index"
                                                    class="zheXianWidth"
                                                    flex="dir:top cross:center "
                                                >
                                                    <div
                                                        class="small h3"
                                                        :style="{
                                                            color:
                                                                itemOne.value < 100 ? '#FF9399' : itemOne.value > 100 ? '#E8B988' : '#fff'
                                                        }"
                                                    >
                                                        {{ itemOne.value
                                                        }}<span style="font-size: 0.12rem" v-show="itemOne.value != '--'">%</span>
                                                    </div>
                                                    <div class="small h5">{{ itemOne.time }}</div>
                                                </div>
                                            </el-carousel-item>
                                        </el-carousel>
                                    </div>
                                </div>
                            </div> -->
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="blDetail">
            <el-dialog :title="flagtype == 1 ? '进给倍率' : '主轴倍率'" :visible.sync="dialogVisible" width="80%" @close="dioClose">
                <div>
                    <div flex="cross:center" class="DataFenxi">
                        数据分析
                        <div class="st_left" flex="cross:center" style="margin-left: 0.4rem">
                            <div flex="cross:center" class="fiveLeft">
                                <span class="st_dot"></span><span>{{ diodevice_id1 }}#</span>
                            </div>
                            <div flex="cross:center" class="sixLeft" style="margin-left: 0.2rem">
                                <span class="st_dot1"></span><span>{{ diodevice_id0 }}#</span>
                            </div>
                        </div>
                    </div>
                    <div style="border-bottom: 1px solid #2b3b5c">
                        <div id="EchartsBig" ref="EchartsBig" style="height: 4.85rem"></div>
                    </div>
                    <div class="ssJinJi_body_right">
                        <div class="ssJinJi_body_right_dotRelative">
                            <span class="st_dot"></span>
                            <div
                                class="oneLineHua"
                                @mouseenter="mouseEnter"
                                @mouseleave="mouseleave"
                                style="border-bottom: 1px solid #2b3b5c"
                            >
                                <el-carousel arrow="never" :interval="15000" height="0.85rem" :autoplay="autoplay" :loop="true">
                                    <el-carousel-item v-for="(items, indexs) in zmEndOneArr" :key="indexs" flex>
                                        <div
                                            v-for="(itemOne, index) in items"
                                            :key="index"
                                            class="zheXianWidth"
                                            flex="dir:top cross:center "
                                            style="width: 7%"
                                        >
                                            <div
                                                class="small h3"
                                                :style="{
                                                    color: itemOne.value < 100 ? '#FF9399' : itemOne.value > 100 ? '#E8B988' : '#fff'
                                                }"
                                            >
                                                {{ itemOne.value }}<span style="font-size: 0.12rem" v-show="itemOne.value != '--'">%</span>
                                            </div>
                                            <div class="small h5">{{ itemOne.time }}</div>
                                        </div>
                                    </el-carousel-item>
                                </el-carousel>
                            </div>
                        </div>
                        <div class="ssJinJi_body_right_dotRelative">
                            <span class="st_dot1"></span>
                            <div class="oneLineHua" @mouseenter="mouseEnter" @mouseleave="mouseleave">
                                <el-carousel arrow="never" :interval="15000" height="0.85rem" :autoplay="autoplay" :loop="true">
                                    <el-carousel-item v-for="(items, indexs) in zmEndTwoArr" :key="indexs" flex>
                                        <div
                                            v-for="(itemOne, index) in items"
                                            :key="index"
                                            class="zheXianWidth"
                                            flex="dir:top cross:center "
                                            style="width: 7%"
                                        >
                                            <div
                                                class="small h3"
                                                :style="{
                                                    color: itemOne.value < 100 ? '#FF9399' : itemOne.value > 100 ? '#E8B988' : '#fff'
                                                }"
                                            >
                                                {{ itemOne.value }}<span style="font-size: 0.12rem" v-show="itemOne.value != '--'">%</span>
                                            </div>
                                            <div class="small h5">{{ itemOne.time }}</div>
                                        </div>
                                    </el-carousel-item>
                                </el-carousel>
                            </div>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import echarts from 'echarts';
import { get_number_ave_time } from '../../api/api';
import titleCheck from './component/titleCheck.vue';
import { getTime, time_to_sec, yestodayTimeFun } from '../../utils/index';
export default {
    components: { titleCheck },
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
            allCheJianArr: [],
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
            dialogVisible: false,
            diodevice_id0: '',
            diodevice_id1: '',
            zmEndOneArr: [],
            zmEndTwoArr: [],
               tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: []
        };
    },
    computed: {},
    watch: {},
    mounted() {
        // let timeArr=["00:00:00", "00:58:30", "01:01:32", "01:15:43", "03:30:45", "03:31:24", "10:20:46", "10:53:30", "11:06:26","11:26:41", "11:26:54", "11:27:45", "12:06:29", "12:06:48", "14:14:55", "14:16:29", "14:17:07", "14:17:26", "14:18:21", "14:18:53", "14:19:10", "14:19:56"]
        // console.log(timeArr.length);
        // let timeArr2=[]

        // for (let i=0,len=timeArr.length;i<len;i++){

        //     timeArr2.push(timeArr[i]+'-'+timeArr[i+1])
        // }
        // timeArr2.pop()
        // console.log(timeArr2);

        this.comp_id = Number(localStorage.getItem('comp_id'));
        if (this.comp_id == 1) {
            this.allCheJianArr = [
                { id: 0, room: '全部车间' },
                { id: 2, room: '二车间' },
                { id: 4, room: '四车间' },
                { id: 6, room: '六车间' }
            ];
        } else  {
            this.allCheJianArr = [
                { id: 0, room: '全部车间' },
                { id: 1, room: '一车间' },
                { id: 2, room: '二车间' }
            ];
        }
        if (localStorage.getItem('allCheJian')) {
            this.allCheJian = Number(localStorage.getItem('allCheJian'));
        }
        this.timeInit(this.focus);
        this.init();

        this.currentTime = getTime();
        this.fiveTimer = setInterval(() => {
            this.init();
            this.currentTime = getTime();
        }, 10000);
        this.num = 10;
        this.oneMinutes = setInterval(() => {
            if (this.num === 1) {
                this.num = 10;
            } else {
                this.num -= 1;
            }
        }, 1000);


    },
    methods: {
        handleSelectionChange(){},
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
            // this.timeInit(this.focus);
            this.getGet_number_ave_time();
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
        },
        cleartodayMinDate() {
            let todayMin = [];
            todayMin[0] = '00:00:00';
            todayMin[1] = '23:59:59';
            this.todayMinDate = todayMin;
            this.zhanweiColor = true;
        },
        changetodayMinDate() {
            this.zhanweiColor = false;
        },
        changetodayDate() {
            this.zhanweiColor = false;
        },
        chooseSearch() {
            this.getGet_number_ave_time();
        },
        getGet_number_ave_time() {
            this.params.obj = {
                compid: localStorage.getItem('comp_id'),
                flagtype: this.flagtype,
                begintime: this.todayDate ? this.todayDate + ' ' + this.todayMinDate[0] : this.begintime,
                endtime: this.todayDate ? this.todayDate + ' ' + this.todayMinDate[1] : this.endtime,
                device_id: 0,
                room: this.allCheJian ? this.allCheJian : 0
            };
            get_number_ave_time(this.params).then((res) => {
                const { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    let zheXianArr = Data.rows;
                    let newArr = [];
                    let zheXianArrIndex = Math.ceil(zheXianArr.length / 2);
                    for (let i = 0; i < zheXianArrIndex; i++) {
                        newArr[i] = zheXianArr.splice(0, 2);
                    }
                    let newArrOne = [];
                    for (let i = 0; i < newArr.length; i++) {
                        let newHeOne = {};
                        if (newArr[i].length > 1) {
                            for (let j = 0; j < newArr[i].length; j++) {
                                newHeOne.device_id0 = newArr[i][0].device_name;
                                newHeOne.device_id1 = newArr[i][1].device_name;
                                newHeOne.now_status0 = newArr[i][0].now_status;
                                newHeOne.now_status1 = newArr[i][1].now_status;
                                newHeOne.num_arr0 = newArr[i][0].num_arr;
                                newHeOne.num_arr1 = newArr[i][1].num_arr;
                                newHeOne.time_arr0 = newArr[i][0].time_arr;
                                newHeOne.time_arr1 = newArr[i][1].time_arr;
                                newHeOne.mathMax =
                                    Math.max(...newArr[i][0].num_arr) > Math.max(...newArr[i][1].num_arr)
                                        ? Math.max(...newArr[i][0].num_arr)
                                        : Math.max(...newArr[i][1].num_arr);
                            }
                        } else {
                            newHeOne.device_id0 = newArr[i][0].device_name;
                            newHeOne.now_status0 = newArr[i][0].now_status;
                            newHeOne.num_arr0 = newArr[i][0].num_arr;
                            newHeOne.time_arr0 = newArr[i][0].time_arr;
                            newHeOne.mathMax = Math.max(...newArr[i][0].num_arr);
                        }
                        newArrOne.push(newHeOne);
                    }

                    this.newArrOne = newArrOne;

                    for (let i = 0; i < newArrOne.length; i++) {
                        let zouMaOneArr = [];
                        let zouMaTwoArr = [];

                        for (let j = 0; j < newArrOne[i].num_arr0.length; j++) {
                            for (let m = 0; m < newArrOne[i].time_arr0.length; m++) {
                                if (j == m) {
                                    let zouMaOne = {};
                                    zouMaOne.value = newArrOne[i].num_arr0[j];
                                    zouMaOne.time = newArrOne[i].time_arr0[j];
                                    zouMaOneArr.push(zouMaOne);
                                }
                            }
                        }
                        for (let j = 0; j < newArrOne[i].num_arr1.length; j++) {
                            for (let m = 0; m < newArrOne[i].time_arr1.length; m++) {
                                if (j == m) {
                                    let zouMaTwo = {};
                                    zouMaTwo.value = newArrOne[i].num_arr1[j];
                                    zouMaTwo.time = newArrOne[i].time_arr1[j];
                                    zouMaTwoArr.push(zouMaTwo);
                                }
                            }
                        }

                        // 二维
                        let zouMaOneArrLength = Math.ceil(zouMaOneArr.length / 6);
                        let newArrLength = [];
                        for (let n = 0; n < zouMaOneArrLength; n++) {
                            if (zouMaOneArr.length >= 6) {
                                newArrLength[n] = zouMaOneArr.splice(0, 6);
                            } else {
                                newArrLength[n] = zouMaOneArr.splice(0, 6);
                                let num = Number(6 - newArrLength[n].length);
                                for (let k = 0; k < num; k++) {
                                    newArrLength[n].push({ value: '--', time: '' });
                                }
                            }
                        }
                        newArrOne[i].zmEndOneArr = newArrLength;

                        let zouMaTwoArrLength = Math.ceil(zouMaTwoArr.length / 6);
                        let newArrLength2 = [];
                        for (let n = 0; n < zouMaTwoArrLength; n++) {
                            // newArrLength2[n] = zouMaTwoArr.splice(0, 6);
                            if (zouMaTwoArr.length >= 6) {
                                newArrLength2[n] = zouMaTwoArr.splice(0, 6);
                            } else {
                                newArrLength2[n] = zouMaTwoArr.splice(0, 6);
                                let num = Number(6 - newArrLength2[n].length);
                                for (let k = 0; k < num; k++) {
                                    newArrLength2[n].push({ value: '--', time: '' });
                                }
                            }
                        }
                        newArrOne[i].zmEndTwoArr = newArrLength2;
                    }

                    this.$nextTick(() => {
                        for (let i = 0; i < newArrOne.length; i++) {
                            if (newArrOne[i].num_arr1) {
                                this.echarts(
                                    i,
                                    newArrOne[i].mathMax,
                                    newArrOne[i].time_arr0,
                                    newArrOne[i].num_arr0,

                                    newArrOne[i].device_id0,
                                    newArrOne[i].device_id1,

                                    newArrOne[i].time_arr1,
                                    newArrOne[i].num_arr1
                                );
                            } else {
                                this.echarts(
                                    i,
                                    newArrOne[i].mathMax,
                                    newArrOne[i].time_arr0,
                                    newArrOne[i].num_arr0,
                                    newArrOne[i].device_id0,
                                    newArrOne[i].device_id1
                                );
                            }
                        }
                    });
                }
            });
        },
        echarts(i, mathMax, dateList, valueList, device_id0, device_id1, dateList2, valueList2) {
            let this_ = this;
            this_.myChart = echarts.init(document.getElementById('Echarts' + i));
            let resizeTimer = null;
            let option = {
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params) {
                        //自定义鼠标移上去显示的框
                        // console.log(params, '22222'); // 当我们想要自定义提示框内容时，可以先将鼠标悬浮的数据打印出来，然后根据需求提取出来即可
                        if (params[0] && params[1]) {
                            let firstParams = params[0];
                            let sndParams = params[1];
                            return (
                                firstParams.marker +
                                device_id0 +
                                '#' +
                                '&nbsp' +
                                firstParams.name +
                                '<br>' +
                                firstParams.data +
                                ' %' +
                                '<br>' +
                                sndParams.marker +
                                device_id1 +
                                '#' +
                                '&nbsp' +
                                sndParams.name +
                                '<br>' +
                                sndParams.data +
                                ' %'
                            );
                        } else {
                            let firstParams = params[0];
                            return firstParams.marker + device_id0 + '#' + '&nbsp' + firstParams.name + '<br>' + firstParams.data + ' %';
                        }
                    }
                },
                xAxis: [
                    {
                        data: dateList2,
                        type: 'category',
                        boundaryGap: false,
                        axisLine: {
                            lineStyle: {
                                color: '#2D4063' //X轴的颜色
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#75A9BF', //x轴文字颜色
                                fontSize: '10'
                            }
                        },
                        axisTick: {
                            //x轴刻度线
                            show: false
                        }
                    },
                    {
                        data: dateList,
                        gridIndex: 0,
                        type: 'category',
                        boundaryGap: false,
                        axisLine: {
                            lineStyle: {
                                color: '#2D4063' //X轴的颜色
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#8798FF', //x轴文字颜色
                                fontSize: '10'
                            }
                        },
                        axisTick: {
                            //x轴刻度线
                            show: false
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        max: mathMax,
                        min: 0,
                        axisLine: {
                            lineStyle: {
                                color: '#2D4063' //y轴的颜色
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
                                color: '#75A9BF',
                                fontSize: '10'
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
                    {
                        gridIndex: 0,
                        type: 'value',
                        max: mathMax,
                        min: 0,
                        axisLine: {
                            lineStyle: {
                                color: '#2D4063' //y轴的颜色
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
                                color: '#8798FF',
                                fontSize: '10'
                            }
                        },
                        nameTextStyle: {
                            color: ['#8798FF']
                        },
                        axisTick: {
                            //y轴刻度线
                            show: false
                        }
                    }
                ],
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    top: '10%',
                    containLabel: true
                },
                visualMap: {
                    show: false,
                    type: 'piecewise',
                    pieces: [
                        {
                            gt: 0,
                            lte: 99,
                            color: '#FF9399'
                        },
                        {
                            gt: 99,
                            lte: 100,
                            color: '#fff'
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
                        data: valueList2,
                        smooth: true, //圆滑的曲线
                        symbol: 'circle', //设定为实心点
                        symbolSize: 8, //设定实心点的大小

                        itemStyle: {
                            normal: {
                                color: '#7cffb1', //线的颜色
                                lineStyle: {
                                    color: '#7cffb1'
                                }
                            }
                        }
                    },
                    {
                        type: 'line',
                        showSymbol: true, //出现小圆点
                        data: valueList,
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        smooth: true, //圆滑的曲线
                        symbol: 'circle', //设定为实心点
                        symbolSize: 8, //设定实心点的大小
                        itemStyle: {
                            normal: {
                                color: '#6672fb',
                                lineStyle: {
                                    color: '#6672fb'
                                }
                            }
                        }
                    }
                ]
            };
            this_.myChart.setOption(option);

            window.addEventListener('resize', () => {
                if (resizeTimer) clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    echarts.init(document.getElementById('Echarts' + i)).resize();
                }, 100);
            });
        },
        echartsBig(mathMax, dateList, valueList, dateList2, valueList2, device_id0, device_id1) {
            let this_ = this;
            this_.myChart1 = echarts.init(document.getElementById('EchartsBig'));
            let resizeTimer = null;
            let option = {
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params) {
                        //自定义鼠标移上去显示的框
                        // console.log(params, '22222'); // 当我们想要自定义提示框内容时，可以先将鼠标悬浮的数据打印出来，然后根据需求提取出来即可
                        if (params[0] && params[1]) {
                            let firstParams = params[0];
                            let sndParams = params[1];
                            return (
                                firstParams.marker +
                                device_id0 +
                                '#' +
                                '&nbsp' +
                                firstParams.name +
                                '<br>' +
                                firstParams.data +
                                ' %' +
                                '<br>' +
                                sndParams.marker +
                                device_id1 +
                                '#' +
                                '&nbsp' +
                                sndParams.name +
                                '<br>' +
                                sndParams.data +
                                ' %'
                            );
                        } else {
                            let firstParams = params[0];
                            return firstParams.marker + device_id0 + '#' + '&nbsp' + firstParams.name + '<br>' + firstParams.data + ' %';
                        }
                    }
                },
                xAxis: [
                    {
                        data: dateList2,
                        type: 'category',
                        boundaryGap: false,
                        axisLine: {
                            lineStyle: {
                                color: '#2D4063' //X轴的颜色
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#75A9BF', //x轴文字颜色
                                fontSize: '16'
                            }
                        },
                        axisTick: {
                            //x轴刻度线
                            show: false
                        }
                    },
                    {
                        data: dateList,
                        gridIndex: 0,
                        type: 'category',
                        boundaryGap: false,
                        axisLine: {
                            lineStyle: {
                                color: '#2D4063' //X轴的颜色
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#8798FF', //x轴文字颜色
                                fontSize: '16'
                            }
                        },
                        axisTick: {
                            //x轴刻度线
                            show: false
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        max: mathMax,
                        min: 0,
                        axisLine: {
                            lineStyle: {
                                color: '#2D4063' //y轴的颜色
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
                                color: '#75A9BF',
                                fontSize: '16'
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
                    {
                        gridIndex: 0,
                        type: 'value',
                        max: mathMax,
                        min: 0,
                        axisLine: {
                            lineStyle: {
                                color: '#2D4063' //y轴的颜色
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
                                color: '#8798FF',
                                fontSize: '16'
                            }
                        },
                        nameTextStyle: {
                            color: ['#8798FF']
                        },
                        axisTick: {
                            //y轴刻度线
                            show: false
                        }
                    }
                ],
                grid: {
                    left: '1%',
                    right: '1%',
                    bottom: '8%',
                    top: '5%',
                    containLabel: true
                },
                series: [
                    {
                        type: 'line',
                        showSymbol: true,
                        data: valueList2,
                        smooth: true, //圆滑的曲线
                        symbol: 'circle', // 设置标记的图形为circle

                        itemStyle: {
                            normal: {
                                color: '#7cffb1',
                                lineStyle: {
                                    color: '#7cffb1'
                                }
                            }
                        }
                    },
                    {
                        type: 'line',
                        showSymbol: true, //出现小圆点
                        data: valueList,
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        smooth: true, //圆滑的曲线
                        symbol: 'circle', // 设置标记的图形为circle
                        itemStyle: {
                            normal: {
                                color: '#6672fb',
                                lineStyle: {
                                    color: '#6672fb'
                                }
                            }
                        }
                    }
                ]
            };
            this_.myChart1.setOption(option);

            window.addEventListener('resize', () => {
                if (resizeTimer) clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    this_.myChart1.resize();
                }, 100);
            });
        },
        detailBeilv(index) {
            this.dialogVisible = true;
            this.diodevice_id0 = this.newArrOne[index].device_id0;
            this.diodevice_id1 = this.newArrOne[index].device_id1;

            let zouMaOneArr = [];
            let zouMaTwoArr = [];

            for (let j = 0; j < this.newArrOne[index].num_arr0.length; j++) {
                for (let m = 0; m < this.newArrOne[index].time_arr0.length; m++) {
                    if (j == m) {
                        let zouMaOne = {};
                        zouMaOne.value = this.newArrOne[index].num_arr0[j];
                        zouMaOne.time = this.newArrOne[index].time_arr0[j];
                        zouMaOneArr.push(zouMaOne);
                    }
                }
            }
            for (let j = 0; j < this.newArrOne[index].num_arr1.length; j++) {
                for (let m = 0; m < this.newArrOne[index].time_arr1.length; m++) {
                    if (j == m) {
                        let zouMaTwo = {};
                        zouMaTwo.value = this.newArrOne[index].num_arr1[j];
                        zouMaTwo.time = this.newArrOne[index].time_arr1[j];
                        zouMaTwoArr.push(zouMaTwo);
                    }
                }
            }
            // 拆成二维
            let zouMaOneArrLength = Math.ceil(zouMaOneArr.length / 14);
            let newArrLength = [];
            for (let n = 0; n < zouMaOneArrLength; n++) {
                // newArrLength[n] = zouMaOneArr.splice(0, 14);
                if (zouMaOneArr.length >= 14) {
                    newArrLength[n] = zouMaOneArr.splice(0, 14);
                } else {
                    newArrLength[n] = zouMaOneArr.splice(0, 14);
                    let num = Number(14 - newArrLength[n].length);
                    for (let k = 0; k < num; k++) {
                        newArrLength[n].push({ value: '--', time: '' });
                    }
                }
            }
            this.newArrOne[index].zmEndOneArr = newArrLength;

            let zouMaTwoArrLength = Math.ceil(zouMaTwoArr.length / 14);
            let newArrLength2 = [];
            for (let n = 0; n < zouMaTwoArrLength; n++) {
                // newArrLength2[n] = zouMaTwoArr.splice(0, 14);
                if (zouMaTwoArr.length >= 14) {
                    newArrLength2[n] = zouMaTwoArr.splice(0, 14);
                } else {
                    newArrLength2[n] = zouMaTwoArr.splice(0, 14);
                    let num = Number(14 - newArrLength2[n].length);
                    for (let k = 0; k < num; k++) {
                        newArrLength2[n].push({ value: '--', time: '' });
                    }
                }
            }
            this.newArrOne[index].zmEndTwoArr = newArrLength2;
            this.zmEndOneArr = this.newArrOne[index].zmEndOneArr;
            this.zmEndTwoArr = this.newArrOne[index].zmEndTwoArr;

            this.$nextTick(() => {
                this.echartsBig(
                    this.newArrOne[index].mathMax,
                    this.newArrOne[index].time_arr0,
                    this.newArrOne[index].num_arr0,
                    this.newArrOne[index].time_arr1,
                    this.newArrOne[index].num_arr1,
                    this.diodevice_id0,
                    this.diodevice_id1
                );
            });
        },
        dioClose() {
            this.diodevice_id0 = '';
            this.diodevice_id1 = '';
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
.statisticalBody{
    .el-table--border th:nth-of-type(3){
        border-right: none ;
    }
    .el-table--border td:nth-of-type(3){
        border-right: none ;
    }
}

</style>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>