<template>
    <div class="detailBing" style="height: auto">
        <div class="homePageTitle" flex="cross:center main:justify">
            <div>
                <div flex="cross:center ">
                    <comp-logo :comp_id="comp_id"></comp-logo>
                    <title-check :num="checkNum"></title-check>
                    <div class="allStatusClass" style="margin: 0 20px 0 0">
                        <!-- <el-select
                            v-model="allCheJian"
                            @change="selectChange"
                            clearable
                            :popper-append-to-body="false"
                            placeholder="全部车间"
                        >
                            <el-option v-for="item in cheJianHao" :key="item.room" :label="item.room + '号车间'" :value="item.room">
                            </el-option>
                        </el-select> -->
                        <cheJian :allCheJian="allCheJian" @childChejian="parentChejian"></cheJian>
                    </div>
                    <div class="DateChoose DateChooseSingle" :class="{ zhanweiColor: zhanweiColor }">
                        <el-date-picker
                            @change="changetodayDate"
                            :clearable="false"
                            v-model="todayDate"
                            value-format="yyyy-MM-dd"
                            type="date"
                            :placeholder="$t('menu.xuanzeriqi')"
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
                            :start-placeholder="$t('menu.startTime')"
                            :end-placeholder="$t('menu.jieshushijian')"
                            :placeholder="$t('menu.xuanzeshijianfanwei')"
                            value-format="HH:mm:ss"
                            popper-class="mydatestyle"
                            @change="changetodayMinDate"
                        >
                        </el-time-picker>
                        <i class="el-icon-circle-close closeIcon" @click="cleartodayMinDate"></i>
                    </div>
                    <div class="allStatusClass" style="margin: 0 0 0 20px">
                        <el-select
                            v-model="guoLvShiJian"
                            @change="changeGl"
                            :popper-append-to-body="false"
                            :placeholder="$t('menu.guolvshijian')"
                            clearable
                        >
                            <el-option v-for="item in guoLvShiJianArr" :key="item.value" :label="item.value" :value="item.id"> </el-option>
                        </el-select>
                    </div>

                    <div>
                        <button class="chooseBtn" style="margin: 0 20px" @click="chooseSearch()">{{ $t('menu.search') }}</button>
                    </div>
                </div>
            </div>
            <div style="margin-right: 0.1rem">
                <title-time :currentTime="currentTime" :num="num"></title-time>
                <set-login></set-login>
            </div>
        </div>

        <div class="statisticalBody" style="min-height: 9rem" v-loading="loading" element-loading-background="transparent">
            <div class="ssJinJi">
                <ul flex="main:justify" flex-wrap element-loading-spinner="el-icon-loading" element-loading-background="#182039">
                    <li v-for="(item, index) in zheXianArr" :key="index" style="max-height: 2.9rem">
                        <div class="ssJinJi_title">
                            <div class="st_left" flex="cross:center">
                                <div flex="cross:center" class="fiveLeft">
                                    <span class="st_dot"></span><span>{{ item.room }}-{{ item.device_name }}#</span>
                                </div>
                            </div>
                        </div>
                        <div class="ssJinJi_body" flex="main:justify" v-show="item.time_arr.length > 0">
                            <div style="width: 88%">
                                <div class="ssJinJi_body_left">
                                    <div :id="'Echarts' + index" :ref="'Echarts' + index" style="height: 1.7rem"></div>
                                </div>
                                <div class="ssJinJi_body_right">
                                    <div>
                                        <div class="oneLineHua" @mouseenter="mouseEnter" @mouseleave="mouseleave">
                                            <el-carousel arrow="never" :interval="15000" height="0.72rem" :autoplay="autoplay" :loop="true">
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
                                        <div class="zh_T">{{ $t('menu.pingjunzhi') }}</div>
                                    </li>
                                    <li>
                                        <div class="zh_val" :class="colorClass(item.mathMax)">{{ item.mathMax }}%</div>
                                        <div class="zh_T">{{ $t('menu.zuidazhi') }}</div>
                                    </li>
                                    <li>
                                        <div class="zh_val minVal" :class="colorClass(item.mathMin)">{{ item.mathMin }}%</div>
                                        <div class="zh_T">{{ $t('menu.zuixiaozhi') }}</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="ssJinJi_body" flex="cross:center main:center" v-show="item.time_arr.length <= 0">
                            {{ $t('menu.zanwushuju') }}
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import echarts from 'echarts';
import { GetFreerateOverride, getroom } from '../../api/api';
import titleCheck from './component/titleCheck.vue';
import { getTime, time_to_sec, yestodayTimeFun } from '../../utils/index';
import compLogo from './component/compLogo.vue';
import '../common/loginStatus';
export default {
    components: { compLogo, titleCheck },
    data() {
        return {
            allCheJian: '',
            cheJianHao: [],
            dateValue: '',

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
                PageIndex: 0,
                PageSize: 0
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
            guoLvShiJian: 60,
            guoLvShiJianArr: [
                { id: 60, value: '1 min' },
                { id: 300, value: '5 min' },
                { id: 600, value: '10 min' },
                { id: 1200, value: '20 min' }
            ],
            loading: true,
            xian: '',
            xcolor: '',
            zxcolor: '',
            dengyu100: ''
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.comp_id = Number(localStorage.getItem('comp_id'));

        this.timeInit(this.focus);
        this.init();

        // this.currentTime = getTime();
        this.dingshiTime();
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

        this.$resizeFont.resizeFont();
    },
    methods: {
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

        mouseEnter() {
            this.autoplay = false;
        },
        mouseleave() {
            this.autoplay = true;
        },

        parentChejian(payload) {
            this.allCheJian = payload;
        },
        init() {
            // this.timeInit(this.focus);
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
                Room: Number(this.allCheJian ? this.allCheJian : 0),
                Status: 0,
                Second: this.guoLvShiJian ? this.guoLvShiJian : null
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
            // click  鼠标聚焦mouseover mouseout
            //  this_.myChart.on('mouseover', function (params) {
            //     //触发了点击事件
            //     console.log(params,'触发点击事件4444');
            // });

            window.addEventListener('resize', () => {
                if (resizeTimer) clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    echarts.init(document.getElementById('Echarts' + i)).resize();
                }, 100);
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
.el-icon-loading {
    font-size: 0.3rem;
}
</style>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>