<template>
    <div class="digitalFactory">
        <div class="title-bg">
            <div class="title"><span style="color: #ffffff">智慧工厂</span>监管平台</div>
            <div
                class="view-bg"
                :style="back ? `background: url(${backUrl}) no-repeat;background-size: 100% 100%;color:#fff` : ''"
                @click="backs"
            >
                {{ back ? '回到主视图' : '主视图' }}
            </div>
            <div class="time">
                <div class="time1">{{ nowTimes }}</div>
                <div class="time2">{{ nowTime }}</div>
            </div>
            <div class="weather">
                <div class="line"></div>
                <weather :city="city"></weather>
            </div>
        </div>
        <div class="content">
            <div class="left">
                <div class="Level">
                    <div class="head">设备液位</div>
                    <div id="main" style="height: 2.32rem"></div>
                </div>
                <div class="Level">
                    <div class="head">冷却系统温度</div>
                    <div id="main1" style="height: 2.32rem"></div>
                </div>
                <div class="Level">
                    <div class="head">设备类别 <span style="color: #00ffff"> ( 7 )</span></div>
                    <div style="height: 3.22rem" flex>
                        <ul class="classifier">
                            <li
                                v-for="(item, index) in liTitle"
                                :key="index"
                                @click="onLi(item, index)"
                                :style="i == index ? `background: url(${imgUrl}) no-repeat;background-size: 100% 100%;` : ''"
                            >
                                {{ item.name }}
                            </li>
                        </ul>
                        <div class="classifier-box">
                            <ul>
                                <li
                                    v-for="(item, index) in facilityList[i]"
                                    :key="index"
                                    @click="onLis(index)"
                                    :style="is == index ? 'color:#00FFFF' : ''"
                                >
                                    {{ item.title }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right" v-if="show" :style="zoom ? 'width: 0;transition: 0.3s' : 'transition: 0.3s'">
                <div class="Level align">
                    <div class="head" style="width: 4.5rem">仓料称重</div>
                    <div id="main2" style="width: 4.5rem; height: 2.15rem"></div>
                </div>
                <div class="Level align">
                    <div class="head" style="width: 4.5rem">设备计量统计</div>
                    <div style="height: 3.82rem; overflow: auto; margin-right: 0.3rem">
                        <div id="main3" style="width: 4.5rem; height: 9.5rem"></div>
                    </div>
                </div>
                <div class="Level">
                    <div class="head" style="width: 4.87rem">设备实时数据</div>

                    <div @mouseenter="mouseEnter" @mouseleave="mouseleave" style="height: 2.46rem; margin-right: 0.3rem">
                        <div flex="main:center cross:center" class="facility-box" style="background: rgba(130, 209, 255, 0.14)">
                            <div style="width: 1.6rem">名称</div>
                            <div>水温(℃)</div>
                            <div>料温(℃)</div>
                            <div>频率(Hz)</div>
                            <div>电流(A)</div>
                            <div>称重(t)</div>
                            <div style="width: 0.85rem">压力(MPa)</div>
                        </div>
                        <el-carousel
                            direction="vertical"
                            :interval="5000"
                            arrow="never"
                            height="2.1rem"
                            :autoplay="autoplay"
                            v-if="facilityData.length > 0"
                        >
                            <el-carousel-item v-for="(item, index) in facilityData" :key="index">
                                <div
                                    flex="main:center cross:center"
                                    class="facility-box"
                                    style="color: #ffffff"
                                    v-for="(items, indexs) in item"
                                    :key="indexs"
                                >
                                    <div style="width: 1.6rem">{{ items.name }}</div>
                                    <div :style="items.water > 25 ? 'color:rgba(243, 65, 57, 1)' : ''">{{ items.water }}</div>
                                    <div :style="items.feed > 30 ? 'color:rgba(243, 65, 57, 1)' : ''">{{ items.feed }}</div>
                                    <div :style="items.frequency > 50 ? 'color:rgba(243, 65, 57, 1)' : ''">{{ items.frequency }}</div>
                                    <div :style="items.electricity > 90 ? 'color:rgba(243, 65, 57, 1)' : ''">{{ items.electricity }}</div>
                                    <div :style="items.weigh > 90 ? 'color:rgba(243, 65, 57, 1)' : ''">{{ items.weigh }}</div>
                                    <div style="width: 0.85rem" :style="items.stress > 0.08 ? 'color:rgba(243, 65, 57, 1)' : ''">
                                        {{ items.stress }}
                                    </div>
                                </div>
                            </el-carousel-item>
                        </el-carousel>
                        <div
                            v-else
                            style="width: 100%; height: 2.1rem; color: #ffffff; font-size: 0.14rem; text-align: center; line-height: 2.1rem"
                        >
                            暂无数据
                        </div>
                    </div>
                </div>
            </div>
            <div class="right" v-else :style="zooms ? 'width: 0;transition: 0.3s' : 'width: 5.19rem;transition: 0.3s'">
                <div class="Level align" style="margin-left: 0.83rem">
                    <div class="head">设备位置</div>
                    <div
                        class="facility"
                        v-for="(item, index) in facilityList[idx]"
                        :key="index"
                        :style="
                            is == index
                                ? `border-image: url(${facilityUrl}) 13 5 10 5/13px 5px 10px 5px stretch;background-color: rgba(217, 247, 254,0.4);`
                                : ''
                        "
                    >
                        <div class="facility-title" flex>
                            <div class="triangle"></div>
                            &nbsp;&nbsp;{{ item.title }}
                        </div>
                        <ul class="facility-content">
                            <li v-for="(items, indexs) in item.liArr" :key="indexs" flex>
                                <span>{{ items.name }}</span>
                                <div>{{ items.content }}</div>
                            </li>
                            <li v-if="item.liArr.length % 2 != 0"></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import weather from './component/weather.vue';
import * as echarts from 'echarts';
export default {
    name: 'digitalFactory',
    components: {
        weather
    },
    data() {
        return {
            nowTime: '',
            nowTimes: '',
            city: '',
            liTitle: [
                { name: '1#涂装胶' },
                { name: '2#涂装胶' },
                { name: '1#胶生产单元' },
                { name: '2#胶生产单元' },
                { name: '3#胶生产单元' },
                { name: '4#胶生产单元' },
                { name: '5#胶生产单元' }
            ],
            i: -1,
            imgUrl: require('../common/comImg/digitalFactory/li-bg.png'),
            // liContent: [
            //     [
            //         { name: '料仓1#' },
            //         {
            //             name: '卧式搅拌机1#'
            //         },
            //         {
            //             name: '15T熟化釜1#'
            //         },
            //         {
            //             name: '6T熟化釜1#'
            //         }
            //     ],
            //     [
            //         { name: '料仓2#' },
            //         {
            //             name: '卧式搅拌机2#'
            //         },
            //         {
            //             name: '15T熟化釜2#'
            //         },
            //         {
            //             name: '6T熟化釜2#'
            //         }
            //     ],
            //     [
            //         { name: '料仓3#' },
            //         {
            //             name: '1# 3000L真空捏合机'
            //         }
            //     ],
            //     [
            //         { name: '料仓4#' },
            //         {
            //             name: '2# 3000L真空捏合机'
            //         }
            //     ],
            //     [
            //         { name: '料仓5#' },
            //         {
            //             name: '1# 1000L真空捏合机'
            //         }
            //     ],
            //     [
            //         { name: '料仓6#' },
            //         {
            //             name: '2# 1000L真空捏合机'
            //         }
            //     ],
            //     [
            //         { name: '料仓7#' },
            //         {
            //             name: '行星搅拌机'
            //         }
            //     ]
            // ],
            is: 0,
            zoom: false,
            show: true,
            zooms: true,
            facilityList: [
                [
                    { title: '料仓1#', liArr: [{ name: '称重：', content: '0.5T' }] },
                    {
                        title: '卧式搅拌机1#',
                        liArr: [
                            { name: 'IP80：', content: '0.5T/H' },
                            { name: 'DINP：', content: '0.3T/H' },
                            { name: '搅拌机频率：', content: '3000HZ' },
                            { name: '搅拌机电流：', content: '35A' },
                            { name: '水温：', content: '98℃' },
                            { name: '料温：', content: '108℃' },
                            { name: '出料压力：', content: '——' },
                            { name: '称重：', content: '——' },
                            { name: '进水温度：', content: '——' },
                            { name: '回水温度：', content: '——' }
                        ]
                    },
                    {
                        title: '15T熟化釜1#',
                        liArr: [
                            { name: 'IP80：', content: '0.5T/H' },
                            { name: 'DINP：', content: '0.3T/H' },
                            { name: '搅拌机频率：', content: '3000HZ' },
                            { name: '搅拌机电流：', content: '35A' },
                            { name: '水温：', content: '98℃' },
                            { name: '料温：', content: '108℃' },
                            { name: '出料压力：', content: '0.8Mpa' },
                            { name: '称重：', content: '0.5T' },
                            { name: '进水温度：', content: '——' },
                            { name: '回水温度：', content: '——' }
                        ]
                    },
                    {
                        title: '6T熟化釜1#',
                        liArr: [
                            { name: 'IP80：', content: '0.5T/H' },
                            { name: 'DINP：', content: '0.3T/H' },
                            { name: '搅拌机频率：', content: '3000HZ' },
                            { name: '搅拌机电流：', content: '35A' },
                            { name: '水温：', content: '98℃' },
                            { name: '料温：', content: '108℃' },
                            { name: '出料压力：', content: '0.8Mpa' },
                            { name: '称重：', content: '0.5T' },
                            { name: '进水温度：', content: '——' },
                            { name: '回水温度：', content: '——' }
                        ]
                    }
                ],
                [
                    { title: '料仓2#', liArr: [{ name: '称重：', content: '0.5T' }] },
                    {
                        title: '卧式搅拌机2#',
                        liArr: [
                            { name: 'IP80：', content: '0.5T/H' },
                            { name: 'DINP：', content: '0.3T/H' },
                            { name: '搅拌机频率：', content: '3000HZ' },
                            { name: '搅拌机电流：', content: '35A' },
                            { name: '水温：', content: '98℃' },
                            { name: '料温：', content: '108℃' },
                            { name: '出料压力：', content: '——' },
                            { name: '称重：', content: '——' },
                            { name: '进水温度：', content: '——' },
                            { name: '回水温度：', content: '——' }
                        ]
                    },
                    {
                        title: '15T熟化釜2#',
                        liArr: [
                            { name: 'IP80：', content: '0.5T/H' },
                            { name: 'DINP：', content: '0.3T/H' },
                            { name: '搅拌机频率：', content: '3000HZ' },
                            { name: '搅拌机电流：', content: '35A' },
                            { name: '水温：', content: '98℃' },
                            { name: '料温：', content: '108℃' },
                            { name: '出料压力：', content: '0.8Mpa' },
                            { name: '称重：', content: '0.5T' },
                            { name: '进水温度：', content: '——' },
                            { name: '回水温度：', content: '——' }
                        ]
                    },
                    {
                        title: '6T熟化釜2#',
                        liArr: [
                            { name: 'IP80：', content: '0.5T/H' },
                            { name: 'DINP：', content: '0.3T/H' },
                            { name: '搅拌机频率：', content: '3000HZ' },
                            { name: '搅拌机电流：', content: '35A' },
                            { name: '水温：', content: '98℃' },
                            { name: '料温：', content: '108℃' },
                            { name: '出料压力：', content: '0.8Mpa' },
                            { name: '称重：', content: '0.5T' },
                            { name: '进水温度：', content: '——' },
                            { name: '回水温度：', content: '——' }
                        ]
                    }
                ],
                [
                    { title: '料仓3#', liArr: [{ name: '称重：', content: '0.5T' }] },
                    {
                        title: '1# 3000L真空捏合机',
                        liArr: [
                            { name: 'IP80：', content: '0.5T/H' },
                            { name: 'DINP：', content: '0.3T/H' },
                            { name: '搅拌机频率：', content: '3000HZ' },
                            { name: '搅拌机电流：', content: '35A' },
                            { name: '水温：', content: '98℃' },
                            { name: '料温：', content: '108℃' },
                            { name: '出料压力：', content: '——' },
                            { name: '称重：', content: '——' },
                            { name: '进水温度：', content: '——' },
                            { name: '回水温度：', content: '——' }
                        ]
                    }
                ],
                [
                    { title: '料仓4#', liArr: [{ name: '称重：', content: '0.5T' }] },
                    {
                        title: '2# 3000L真空捏合机',
                        liArr: [
                            { name: 'IP80：', content: '0.5T/H' },
                            { name: 'DINP：', content: '0.3T/H' },
                            { name: '搅拌机频率：', content: '3000HZ' },
                            { name: '搅拌机电流：', content: '35A' },
                            { name: '水温：', content: '98℃' },
                            { name: '料温：', content: '108℃' },
                            { name: '出料压力：', content: '——' },
                            { name: '称重：', content: '——' },
                            { name: '进水温度：', content: '——' },
                            { name: '回水温度：', content: '——' }
                        ]
                    }
                ],
                [
                    { title: '料仓5#', liArr: [{ name: '称重：', content: '0.5T' }] },
                    {
                        title: '1# 3000L真空捏合机',
                        liArr: [
                            { name: 'IP80：', content: '0.5T/H' },
                            { name: 'DINP：', content: '0.3T/H' },
                            { name: '搅拌机频率：', content: '3000HZ' },
                            { name: '搅拌机电流：', content: '35A' },
                            { name: '水温：', content: '98℃' },
                            { name: '料温：', content: '108℃' },
                            { name: '出料压力：', content: '——' },
                            { name: '称重：', content: '——' },
                            { name: '进水温度：', content: '——' },
                            { name: '回水温度：', content: '——' }
                        ]
                    }
                ],
                [
                    { title: '料仓6#', liArr: [{ name: '称重：', content: '0.5T' }] },
                    {
                        title: '2# 3000L真空捏合机',
                        liArr: [
                            { name: 'IP80：', content: '0.5T/H' },
                            { name: 'DINP：', content: '0.3T/H' },
                            { name: '搅拌机频率：', content: '3000HZ' },
                            { name: '搅拌机电流：', content: '35A' },
                            { name: '水温：', content: '98℃' },
                            { name: '料温：', content: '108℃' },
                            { name: '出料压力：', content: '——' },
                            { name: '称重：', content: '——' },
                            { name: '进水温度：', content: '——' },
                            { name: '回水温度：', content: '——' }
                        ]
                    }
                ],
                [
                    { title: '料仓7#', liArr: [{ name: '称重：', content: '0.5T' }] },
                    {
                        title: '行星搅拌机',
                        liArr: [
                            { name: '低频率：', content: '3000HZ' },
                            { name: '低电流：', content: '35A' },
                            { name: '1#高频率：', content: '3000HZ' },
                            { name: '1#高电流：', content: '35A' },
                            { name: '2#高频率：', content: '3000HZ' },
                            { name: '2#高电流：', content: '35A' },
                            { name: '进水温度：', content: '20℃' },
                            { name: '回水温度：', content: '98℃' },
                            { name: '称重：', content: '0.5T' }
                        ]
                    }
                ]
            ],
            facilityUrl: require('../common/comImg/digitalFactory/facility.png'),
            autoplay: true,
            facilityData: [
                [
                    { name: '15T熟化釜1#', water: '20', feed: '30', frequency: '25', electricity: '22.0', weigh: '30', stress: '0.00' },
                    { name: '卧式搅拌机1#', water: '21', feed: '20', frequency: '38', electricity: '33.0', weigh: '90', stress: '0.06' },
                    { name: '料仓2#', water: '22', feed: '27', frequency: '36', electricity: '33.0', weigh: '80', stress: '0.03' },
                    { name: '卧式搅拌机2#', water: '23', feed: '22', frequency: '48', electricity: '55.0', weigh: '30', stress: '0.05' },
                    {
                        name: '2# 3000L真空捏合机',
                        water: '24',
                        feed: '24',
                        frequency: '26',
                        electricity: '77.0',
                        weigh: '50',
                        stress: '0.02'
                    },
                    {
                        name: '1# 1000L真空捏合机',
                        water: '21',
                        feed: '28',
                        frequency: '49',
                        electricity: '40.0',
                        weigh: '50',
                        stress: '0.03'
                    }
                ],
                [
                    {
                        name: '行星搅拌机(1#高速)',
                        water: '20',
                        feed: '28',
                        frequency: '38',
                        electricity: '70.0',
                        weigh: '50',
                        stress: '0.04'
                    },
                    {
                        name: '行星搅拌机(2#高速)',
                        water: '25',
                        feed: '24',
                        frequency: '28',
                        electricity: '44.0',
                        weigh: '40',
                        stress: '0.05'
                    },
                    {
                        name: '行星搅拌机(低速)',
                        water: '24',
                        feed: '27',
                        frequency: '33',
                        electricity: '55.0',
                        weigh: '40',
                        stress: '0.06'
                    }
                ]
            ],
            back: false,
            backUrl: require('../common/comImg/digitalFactory/back.png'),
            idx: 0,
            echartsData: [123, 100, 125],
            echartsData1: [25, 22, 80, 34, 20, 80, 70],
            echartsData1s: [30, 10, 35, 20, 75, 25, 85],
            echartsData2: [20, 88, 50, 38, 88, 20, 80],
            echartsData3: [0, 65, 13, 33, 34, 36, 23, 65, 36, 38, 38, 73, 63, 65, 33, 30, 30, 37, 53, 50, 60, 0],
            timers: null
        };
    },
    mounted() {
        function resizeFont() {
            //获取屏幕宽度
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
        window.onresize = () => {
            resizeFont();
        };
        this.drawLine();
        this.drawLine1();
        setTimeout(() => {
            this.drawLine2();
            this.drawLine3();
        }, 300);
        this.timers = setInterval(() => {
            this.echartsData = this.echartsData.map(function (index) {
                return index + Math.floor(Math.random() * 5) - 2;
            });
            this.echartsData1 = this.echartsData1.map(function (index) {
                let sum = index + Math.floor(Math.random() * 5) - 2;
                return sum < 0 ? 0 : sum > 100 ? 100 : sum;
            });
            this.echartsData1s = this.echartsData1s.map(function (index) {
                let sum = index + Math.floor(Math.random() * 5) - 2;
                return sum < 0 ? 0 : sum > 100 ? 100 : sum;
            });
            this.echartsData2 = this.echartsData2.map(function (index) {
                let sum = index + Math.floor(Math.random() * 5) - 2;
                return sum < 0 ? 0 : sum > 100 ? 100 : sum;
            });
            this.echartsData3 = this.echartsData3.map(function (index) {
                let sum = index + Math.floor(Math.random() * 5) - 2;
                return sum < 0 ? 1 : sum > 100 ? 100 : sum;
            });
            this.drawLine();
            this.drawLine1();
            this.DataTest();
            if (this.show) {
                this.drawLine2();
                this.drawLine3();
            }
        }, 3000);
    },
    created() {
        this.showTimes();
        this.getLocation();
        this.DataTest();
        document.oncontextmenu = function () {
            return false;
        };
    },
    methods: {
        // 显示当前时间
        timeFormate(timeStamp) {
            let year = new Date(timeStamp).getFullYear();
            let month =
                new Date(timeStamp).getMonth() + 1 < 10 ? '0' + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1;
            let date = new Date(timeStamp).getDate() < 10 ? '0' + new Date(timeStamp).getDate() : new Date(timeStamp).getDate();
            let hh = new Date(timeStamp).getHours() < 10 ? '0' + new Date(timeStamp).getHours() : new Date(timeStamp).getHours();
            let mm = new Date(timeStamp).getMinutes() < 10 ? '0' + new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes();
            let ss = new Date(timeStamp).getSeconds() < 10 ? '0' + new Date(timeStamp).getSeconds() : new Date(timeStamp).getSeconds();
            let week = new Date(timeStamp).getDay();
            let weeks = ['日', '一', '二', '三', '四', '五', '六'];
            let getWeek = '星期' + weeks[week];
            this.nowTime = year + '-' + month + '-' + date + ' ' + getWeek;
            this.nowTimes = hh + ':' + mm + ':' + ss;
        },
        showTimes() {
            this.timeFormate(new Date());
            clearInterval(this.NowTimer);
            this.NowTimer = setInterval(this.showTimes, 1000);
        },
        getLocation() {
            var that = this;

            AMap.plugin('AMap.CitySearch', function () {
                var citySearch = new AMap.CitySearch();
                citySearch.getLocalCity(function (status, result) {
                    if (status === 'complete' && result.info === 'OK') {
                        // 查询成功，result即为当前所在城市信息
                        that.city = result.city;
                        AMap.plugin('AMap.Weather', function () {
                            //创建天气查询实例
                            var weather = new AMap.Weather();
                            //执行实时天气信息查询
                            weather.getLive(result.city, function (err, data) {
                                that.number = data.temperature;
                                that.weather = data.weather;
                                that.day = data.reportTime.split(' ')[0];
                            });
                        });
                    }
                });
            });
        },
        drawLine() {
            var chartDom = document.getElementById('main');
            var myChart = echarts.init(chartDom);
            var option;
            let resizeTimer = null;

            option = {
                title: {
                    text: '单位(L)',
                    textStyle: {
                        color: '#fff',
                        fontSize: 13
                    }
                },
                legend: {
                    x: 'right',
                    padding: [5, 30, 0, 0],
                    icon: 'roundRect',
                    itemHeight: 2, //修改icon图形大小
                    // icon: "path://M512 881.777778 512 881.777778C716.222629 881.777778 881.777778 716.222629 881.777778 512 881.777778 307.777371 716.222629 142.222222 512 142.222222 307.777373 142.222222 142.222222 307.777371 142.222222 512 142.222222 716.222629 307.777373 881.777778 512 881.777778L512 881.777778ZM512 1024 512 1024C229.230208 1024 0 794.769789 0 512 0 229.230211 229.230208 0 512 0 794.769789 0 1024 229.230211 1024 512 1024 794.769789 794.769789 1024 512 1024L512 1024Z",
                    textStyle: {
                        fontSize: 13,
                        color: 'white' // 文字的颜色。
                    }
                },
                backgroundColor: 'transparent',
                /**区域位置*/
                grid: {
                    left: '3%',
                    right: '10%',
                    top: '15%',
                    bottom: '0',
                    containLabel: true
                },
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    data: ['IP80罐', '1#DNIP罐', '2#DNIP罐'],
                    axisLine: {
                        show: true,
                        fontSize: 13,
                        lineStyle: {
                            color: '#fff',
                            width: 0,
                            type: 'solid'
                        }
                    },
                    axisTick: {
                        show: false
                    }
                },
                yAxis: {
                    max: 150,
                    min: 0,
                    axisLine: {
                        show: true,

                        lineStyle: {
                            color: 'rgba(202, 255, 253,0.2)',
                            width: 1,
                            type: 'solid'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(202, 255, 253,0.2)',
                            type: 'dashed'
                        }
                    },
                    axisLabel: {
                        show: true,
                        fontSize: 13,
                        textStyle: {
                            color: 'white' //更改坐标轴文字颜色
                        }
                    },
                    axisTick: {
                        show: false
                    }
                },
                series: [
                    {
                        name: '当日设备液位',
                        type: 'pictorialBar',
                        barCategoryGap: '40%',
                        symbol: 'triangle',
                        barWidth: '100%',
                        symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
                        itemStyle: {
                            normal: {
                                opacity: 0.8,
                                // color:'RGBA(133, 255, 105, 1)',
                                color: new echarts.graphic.LinearGradient(
                                    0,
                                    1,
                                    0,
                                    0,
                                    [
                                        {
                                            offset: 0,
                                            color: 'rgba(0, 251, 255, 0.76)' // 0% 处的颜色
                                        },
                                        {
                                            offset: 0.6,
                                            color: 'rgba(0, 251, 255, 0.76)' // 60% 处的颜色
                                        },
                                        {
                                            offset: 1,
                                            color: 'rgba(0, 251, 255, 0.76)' // 100% 处的颜色
                                        }
                                    ],
                                    false
                                )
                            },
                            emphasis: {
                                opacity: 1
                            }
                        },
                        data: this.echartsData,
                        z: 10
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
        drawLine1() {
            var chartDom = document.getElementById('main1');
            var myChart = echarts.init(chartDom);
            var option;
            let resizeTimer = null;

            option = {
                title: {
                    text: '温度(℃)',
                    textStyle: {
                        color: '#fff',
                        fontSize: 13
                    }
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['回水', '进水'],
                    textStyle: {
                        color: '#fff',
                        fontSize: 13
                    },
                    x: 'right',
                    padding: [10, 30, 0, 0]
                },
                grid: {
                    left: '3%',
                    right: '10%',
                    bottom: '3%',
                    top: '15%',
                    containLabel: true
                },
                // toolbox: {
                //     feature: {
                //         saveAsImage: {}
                //     }
                // },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
                    axisLabel: {
                        show: true,

                        fontSize: 13,
                        textStyle: {
                            color: '#fff' //X轴文字颜色
                        }
                    },
                    axisTick: {
                        show: false
                    }
                },
                yAxis: {
                    max: 100,
                    min: 0,
                    type: 'value',
                    axisLabel: {
                        show: true,

                        fontSize: 13,
                        textStyle: {
                            color: '#fff' //X轴文字颜色
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#1E2573',
                            width: 0.5,
                            type: 'dashed'
                        }
                    },
                    axisTick: {
                        show: false
                    }
                },
                series: [
                    {
                        name: '回水',
                        type: 'line',
                        // stack: 'Total',
                        symbol: 'circle',
                        symbolSize: 6,
                        data: this.echartsData1,
                        smooth: true,
                        itemStyle: {
                            normal: {
                                color: 'rgba(231, 136, 51, 1)',
                                lineStyle: {
                                    width: 1.5,
                                    normal: {
                                        width: 2,
                                        color: 'rgba(231, 136, 51, 1)' // 线条颜色
                                    }
                                }
                            }
                        },

                        areaStyle: {
                            normal: {
                                //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                                color: new echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        {
                                            offset: 0,
                                            color: 'rgba(231, 136, 51, 0.4)'
                                        },
                                        {
                                            offset: 1,
                                            color: 'rgba(231, 136, 51, 0)'
                                        }
                                    ],
                                    false
                                )
                            }
                        }
                    },
                    {
                        name: '进水',
                        type: 'line',
                        // stack: 'Total',
                        symbol: 'circle',
                        symbolSize: 6,
                        data: this.echartsData1s,
                        smooth: true,

                        itemStyle: {
                            normal: {
                                color: 'rgba(0, 251, 255, 1)',
                                lineStyle: {
                                    width: 1.5,
                                    normal: {
                                        width: 2,
                                        color: 'rgba(0, 251, 255, 1)' // 线条颜色
                                    }
                                }
                            }
                        },
                        areaStyle: {
                            normal: {
                                //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                                color: new echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        {
                                            offset: 0,
                                            color: 'rgba(0, 251, 255, 0.4)'
                                        },
                                        {
                                            offset: 1,
                                            color: 'rgba(0, 251, 255, 0)'
                                        }
                                    ],
                                    false
                                )
                            }
                        }
                    }
                ]
            };
            option && myChart.setOption(option);

            myChart.resize();

            window.addEventListener('resize', () => {
                if (resizeTimer) clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    echarts.init(document.getElementById('main1')).resize();
                }, 100);
            });
        },
        drawLine2() {
            var chartDom = document.getElementById('main2');
            var myChart = echarts.init(chartDom);
            var option;
            let resizeTimer = null;

            /**
             *
             * 作者: missMa
             * 描述: 柱状图
             *
             */
            let xLabel = ['料仓1#', '料仓2#', '料仓3#', '料仓4#', '料仓5#', '料仓6#', '料仓7#'];
            option = {
                tooltip: {},
                backgroundColor: 'transparent',
                animation: false,
                grid: {
                    top: '20%',
                    left: '10%',
                    right: '0%',
                    bottom: '15%' //也可设置left和right设置距离来控制图表的大小
                },
                legend: {
                    x: 'right',
                    padding: [10, 0, 0, 0],
                    icon: 'roundRect',
                    itemHeight: 2, //修改icon图形大小
                    // icon: "path://M512 881.777778 512 881.777778C716.222629 881.777778 881.777778 716.222629 881.777778 512 881.777778 307.777371 716.222629 142.222222 512 142.222222 307.777373 142.222222 142.222222 307.777371 142.222222 512 142.222222 716.222629 307.777373 881.777778 512 881.777778L512 881.777778ZM512 1024 512 1024C229.230208 1024 0 794.769789 0 512 0 229.230211 229.230208 0 512 0 794.769789 0 1024 229.230211 1024 512 1024 794.769789 794.769789 1024 512 1024L512 1024Z",
                    textStyle: {
                        fontSize: 13,
                        color: 'white' // 文字的颜色。
                    }
                },
                xAxis: {
                    data: xLabel,
                    axisLine: {
                        show: true, //隐藏X轴轴线
                        lineStyle: {
                            color: 'rgba(130, 209, 255, 1)'
                        }
                    },
                    axisTick: {
                        show: false //隐藏X轴刻度
                    },
                    axisLabel: {
                        show: true,
                        margin: 14,
                        fontSize: 13,
                        textStyle: {
                            color: '#fff' //X轴文字颜色
                        }
                    }
                },
                yAxis: [
                    {
                        type: 'value',
                        gridIndex: 0,
                        min: 0,
                        max: 100,
                        interval: 25,
                        // splitNumber: 4,
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: 'transparent',
                                width: 1
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba(130, 209, 255, 1)'
                            }
                        },
                        axisLabel: {
                            show: true,
                            margin: 14,
                            fontSize: 13,
                            formatter: '{value}t',
                            textStyle: {
                                color: '#fff' //X轴文字颜色
                            }
                        }
                    }
                ],
                series: [
                    {
                        // 值
                        name: '当日仓料重量',
                        type: 'bar',
                        barWidth: 20,
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: 'RGBA(15, 251, 255, 1)'
                                    },
                                    {
                                        offset: 1,
                                        color: 'RGBA(15, 251, 255, 1)'
                                    }
                                ])
                            }
                        },
                        data: this.echartsData2,
                        z: 10,
                        zlevel: 2,
                        label: {
                            show: true,
                            position: 'top',
                            distance: 10,
                            fontSize: 13,
                            fontFamily: 'DIN',
                            color: '#ffffff',
                            zlevel: 4,
                            z: 10,
                            formatter: '{c}t'
                        }
                    },
                    {
                        // 值分隔
                        type: 'pictorialBar',
                        itemStyle: {
                            normal: {
                                color: '#1f272c'
                            }
                        },
                        symbolRepeat: 'fixed',
                        symbolMargin: 3,
                        symbol: 'rect',
                        symbolClip: true,
                        symbolSize: [20, 6],
                        symbolPosition: 'start',
                        symbolOffset: [0, -1],
                        // symbolBoundingData: this.total,
                        data: this.echartsData2,
                        width: 20,
                        z: 0,
                        zlevel: 3
                    },
                    {
                        //辅助背景图形
                        // name: '背景条',
                        type: 'bar', //pictorialBar
                        barWidth: '20',
                        barGap: '-100%',
                        itemStyle: {
                            normal: {
                                borderWidth: 0,
                                color: 'RGBA(29, 37, 41, 0.1)'
                            },
                            barBorderRadius: 10
                        },
                        data: [0, 0, 0, 0, 0, 0, 0],
                        z: 0,
                        zlevel: 0
                    }
                ]
            };

            option && myChart.setOption(option);

            myChart.resize();

            window.addEventListener('resize', () => {
                if (resizeTimer) clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    echarts.init(document.getElementById('main2')).resize();
                }, 100);
            });
        },
        drawLine3() {
            var chartDom = document.getElementById('main3');
            var myChart = echarts.init(chartDom);
            var option;
            let resizeTimer = null;

            var tick = '/asset/get/s/data-1638435304481-PS5i9afqe.png';

            let bjlxChartData = {
                areaName: [
                    '',
                    '卧式搅拌机1#IP80计量',
                    '卧式搅拌机1#DINP计量',
                    '15T熟化釜1#IP80计量',
                    '15T熟化釜1#DINP计量',
                    '6T熟化釜1#IP80计量',
                    '6T熟化釜1#DINP计量',
                    '卧式搅拌机2#IP80计量',
                    '卧式搅拌机2#DINP计量',
                    '15T熟化釜2#IP80计量',
                    '15T熟化釜2#DINP计量',
                    '6T熟化釜2#IP80计量',
                    '6T熟化釜2#DINP计量',
                    '1# 3000L真空捏合机IP80计量',
                    '1# 3000L真空捏合机DINP计量',
                    '2# 3000L真空捏合机IP80计量',
                    '2# 3000L真空捏合机DINP计量',
                    '1# 1000L真空捏合机IP80计量',
                    '1# 1000L真空捏合机DINP计量',
                    '2# 1000L真空捏合机IP80计量',
                    '2# 1000L真空捏合机DINP计量',
                    ''
                ],
                eventCount: this.echartsData3
            };
            let max = Math.max(...bjlxChartData.eventCount);
            var maxArr = [];
            for (var i = 0; i < bjlxChartData.eventCount.length; i++) {
                maxArr.push(100);
            }
            option = {
                backgroundColor: 'transparent',
                grid: {
                    left: '3%',
                    top: '-4%',
                    right: '10%',
                    bottom: '-7%',
                    containLabel: true
                },
                xAxis: [
                    {
                        show: false
                    }
                ],
                yAxis: [
                    {
                        axisTick: 'none',
                        axisLine: 'none',
                        inverse: true,
                        offset: '10',
                        axisLabel: {
                            inside: true,
                            textStyle: {
                                color: 'white',
                                fontSize: 13,
                                verticalAlign: 'bottom',
                                align: 'left',
                                padding: [0, 0, 10, 0]
                            },
                            formatter: function (value) {
                                return `{warnValue|}{value|${value}}`;
                            },

                            rich: {
                                value: {
                                    color: 'white',
                                    fontSize: 13
                                }
                            }
                        },
                        data: bjlxChartData.areaName
                    },
                    {
                        axisTick: 'none',
                        axisLine: 'none',
                        inverse: true,
                        axisLabel: {
                            textStyle: {
                                color: 'white',
                                fontSize: 13,
                                // verticalAlign: "bottom",
                                padding: [35, -35, 20, 0],
                                align: 'right'
                            },
                            formatter: function (value, index) {
                                return `{value|${value}T/H}\n{img|}`;
                            },
                            rich: {
                                value: {
                                    align: 'right',
                                    color: 'white',
                                    marginLeft: 100,
                                    fontSize: 13
                                }
                            }
                        },

                        data: bjlxChartData.eventCount
                    },
                    {
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(0,0,0,0)'
                            }
                        },
                        data: []
                    }
                ],
                series: [
                    {
                        name: '条',
                        type: 'bar',
                        stack: '圆',
                        yAxisIndex: 0,
                        // data: data,
                        data: bjlxChartData.eventCount,
                        barWidth: 4,
                        // itemStyle: {
                        //     normal: {
                        //         color: {
                        //             type: 'linear',
                        //             x: 0,
                        //             y: 0,
                        //             x2: 1,
                        //             y2: 0,
                        //             colorStops: [
                        //                 {
                        //                     offset: 0,
                        //                     color: 'rgba(0, 255, 255, 0.1)' // 0% 处的颜色
                        //                 },
                        //                 {
                        //                     offset: 1,
                        //                     color: 'rgba(0, 255, 255, 1)' // 100% 处的颜色
                        //                 }
                        //             ]
                        //         },
                        //         barBorderRadius: 10
                        //     }
                        // },
                        itemStyle: {
                            color: function (params) {
                                if (params.dataIndex % 2 === 0) {
                                    return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                        {
                                            offset: 1,
                                            color: 'rgba(0, 255, 255, 1)'
                                        },

                                        {
                                            offset: 0,
                                            color: 'rgba(0, 255, 255, 0.1)'
                                        }
                                    ]);
                                }
                                return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                    {
                                        offset: 1,
                                        color: 'rgba(220, 131, 52, 1)'
                                    },

                                    {
                                        offset: 0,
                                        color: 'rgba(220, 131, 52, 0.1)'
                                    }
                                ]);
                            }
                        },

                        z: 2
                    },
                    {
                        name: 'XXX',
                        type: 'pictorialBar',
                        // symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAMAAAApB0NrAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABC1BMVEUA/7QA/7QA/7QA/7QA/7QA/7QA/7QA/7QA/7QA/7QA/7QA/7QA/7QA/7QA/7QA/7QA/7QA/7QA/7QA/7QA/7QA/7QA/7QA/7QA/7QA/7QA/7SO/86O/86O/86O/86O/86O/86O/86O/86O/86O/86O/86O/86O/86O/86O/86O/86O/86O/86O/85K/8IT/7gM/7YP/7cs/7wB/7QH/7Vl/8cZ/7kA/7QH/7WJ/80C/7Qk/7st/7wM/7aO/84g/7oI/7Y8/78N/7aO/84E/7UA/7Q1/76O/84q/7wB/7QN/7Yp/7wD/7UB/7QR/7ct/7wa/7kg/7pr/8iO/86O/86O/86O/84A/7QAAAAmnbE7AAAAV3RSTlMAAwsQFBcYFhINBgkaDgIHGREFDwEKBAwIFRMHDRETEg8KAgsXGhkQAxUJBRgELnSThkT0riNl/rIb4U5CkhRUpTeIBs77OwFH9opI1PF6Q2NTIQgWDA6QHRcgAAAAAWJLR0RY7bXEjgAAAAd0SU1FB+ULEBQKJQdQcX4AAAITSURBVDjLbVRnY5swEBVmCMxhC2MgdrwdPJK46d5N2roJ3Stt/f//SXUnbFbeF3THk+54pwdjBWgN3TAtk9tOk90N14AcpteqM9ocQPiNptbSOm6AgdMtM7o6AA8LyaYtE1GR0jJAxJVtTQ7iqEDpgdmpVe/6RVIfuKZWx4PhaDyZzlQUgNhvdcBUlPlJorBYrijhA1cdRAJIjtU6ybE4pXIcPOLYEODj7DwpYUCNg8ASHRAo1+okqeBUVQuoMTpmVKUkiw2dYMmOLMDej7MX9y7uP3iYrce4twdtFoFZOObi0U7i8RMV4cd5smsXfLmaqeTTZzvCcxXOcY7Ql+I4h1IvXu4yvKJ4iPdF1gmgIVdTyr3eU3ZvKL5EiUAwHUJUmHJXB85bitfYKUDpnHcHznuKRzhvsGQ/qPZWNfkho1zfULjESQGX32XLVbqg5MdPivM5Vxrfa/IsiaHKfvkqGd++Z0KnNAb53VwKydhmP4EfP3/9zpYT3GzipXBIRDapzet8RhLiGDQBeLfTy+pIt7jVgBgfulQbx7EuU27JczR2qYBFErF0WaD8OSPjWqQwkYXy7na8Z8xTuqqGKqHuv5UZfHb7999gusnMI/2SO1o6Kaz5K+qBVXRqAGBrZQfGomJmFgoQeu7VVmwC+BV3M83HP4oeu2039PAvw49YHZFnHX4/wr6LQeg0Ar/v63G7VOU/Y9Ve2lDCOJ4AAAAASUVORK5CYII=',
                        symbolSize: [8, 8],
                        symbolPosition: 'end',
                        symbolOffset: [8, -3],
                        z: 12,
                        itemStyle: {
                            color: function (params) {
                                if (params.dataIndex % 2 === 0) {
                                    return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                        {
                                            offset: 1,
                                            color: 'rgba(0, 255, 255, 1)'
                                        },

                                        {
                                            offset: 0,
                                            color: 'rgba(0, 255, 255, 1)'
                                        }
                                    ]);
                                }
                                return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                    {
                                        offset: 1,
                                        color: 'rgba(220, 131, 52, 1)'
                                    },

                                    {
                                        offset: 0,
                                        color: 'rgba(220, 131, 52, 1)'
                                    }
                                ]);
                            }
                        },
                        data: bjlxChartData.eventCount
                    },
                    {
                        name: '背景',
                        type: 'bar',
                        barWidth: 10,
                        barGap: '-100%',
                        data: maxArr,
                        itemStyle: {
                            normal: {
                                color: 'rgba(52, 52, 52, 0.69)',

                                barBorderRadius: 5
                            }
                        }
                    }
                ]
            };

            option && myChart.setOption(option);

            myChart.resize();

            window.addEventListener('resize', () => {
                if (resizeTimer) clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    echarts.init(document.getElementById('main3')).resize();
                }, 100);
            });
        },
        mouseEnter() {
            this.autoplayCenterLeft = false;
        },
        mouseleave() {
            this.autoplayCenterLeft = true;
        },
        onLi(item, index) {
            this.is = 0;

            this.back = true;
            this.zoom = !this.zoom;
            this.i = index;
            setTimeout(() => {
                this.show = false;
                this.zooms = true;
            }, 300);

            setTimeout(() => {
                this.idx = index;
                this.zooms = false;
            }, 600);
            if (window.vuplex) {
                this.sendMessageToCSharp(item.name);
            } else {
                window.addEventListener('vuplexready', this.sendMessageToCSharp);
            }
        },
        onLis(index) {
            this.is = index;
        },
        backs() {
            this.zooms = true;
            setTimeout(() => {
                this.show = true;
                setTimeout(() => {
                    this.zoom = false;
                    this.i = -1;
                }, 300);
            }, 300);
            setTimeout(() => {
                this.drawLine2();
                this.drawLine3();
            }, 500);
            this.back = false;
            if (window.vuplex) {
                this.sendMessageToCSharp('back');
            } else {
                window.addEventListener('vuplexready', this.sendMessageToCSharp);
            }
        },
        sendMessageToCSharp(item) {
            window.vuplex.postMessage(item);
        },
        DataTest() {
            this.$axios.post('https://api.moldcube.com:8101/api/Other/DataTest').then((res) => {
                let { ReturnCode, Data } = res.data;
                if (ReturnCode == 200) {
                    let Arr = [
                        [
                            {
                                title: '卧式搅拌机1#',
                                liArr: [
                                    { name: '搅拌机转速：', content: Data[10].Current_Value + 'Hz' },
                                    { name: '搅拌机电流：', content: Data[8].Current_Value + 'A' },
                                    { name: '水温：', content: Data[7].Current_Value + '℃' },
                                    { name: '料温：', content: Data[0].Current_Value + '℃' },
                                    { name: '时间：', content: Data[9].Current_Value + 'h' }
                                ]
                            },
                            {
                                title: '15T熟化釜1#',
                                liArr: [
                                    { name: '搅拌机频率：', content: Data[4].Current_Value + 'Hz' },
                                    { name: '水温：', content: Data[2].Current_Value + '℃' },
                                    { name: '料温：', content: Data[3].Current_Value + '℃' },
                                    { name: '时间：', content: Data[5].Current_Value + 'h' },
                                    { name: '真空度：', content: Data[6].Current_Value + 'Mpa' }
                                ]
                            },
                            {
                                title: '6T熟化釜1#',
                                liArr: [
                                    { name: '搅拌机频率：', content: Data[13].Current_Value + 'Hz' },
                                    { name: '水温：', content: Data[12].Current_Value + '℃' },
                                    { name: '料温：', content: Data[11].Current_Value + '℃' },
                                    { name: '时间：', content: Data[14].Current_Value + 'h' },
                                    { name: '真空度：', content: Data[1].Current_Value + 'Mpa' }
                                ]
                            }
                        ],
                        [
                            {
                                title: '卧式搅拌机2#',
                                liArr: [
                                    { name: '搅拌机转速：', content: Data[10].Current_Value + Math.floor(Math.random() * 4) + 'Hz' },
                                    { name: '搅拌机电流：', content: Data[8].Current_Value + Math.floor(Math.random() * 4) + 'A' },
                                    { name: '水温：', content: Data[7].Current_Value + Math.floor(Math.random() * 4) + '℃' },
                                    { name: '料温：', content: Data[0].Current_Value + Math.floor(Math.random() * 4) + '℃' },
                                    { name: '时间：', content: Data[9].Current_Value + Math.floor(Math.random() * 4) + 'h' }
                                ]
                            },
                            {
                                title: '15T熟化釜2#',
                                liArr: [
                                    { name: '搅拌机频率：', content: Data[4].Current_Value + Math.floor(Math.random() * 4) + 'Hz' },
                                    { name: '水温：', content: Data[2].Current_Value + Math.floor(Math.random() * 4) + '℃' },
                                    { name: '料温：', content: Data[3].Current_Value + Math.floor(Math.random() * 4) + '℃' },
                                    { name: '时间：', content: Data[5].Current_Value + Math.floor(Math.random() * 4) + 'h' },
                                    { name: '真空度：', content: Data[6].Current_Value + Math.floor(Math.random() * 4) / 100 + 'Mpa' }
                                ]
                            },
                            {
                                title: '6T熟化釜2#',
                                liArr: [
                                    { name: '搅拌机频率：', content: Data[13].Current_Value + Math.floor(Math.random() * 4) + 'Hz' },
                                    { name: '水温：', content: Data[12].Current_Value + Math.floor(Math.random() * 4) + '℃' },
                                    { name: '料温：', content: Data[11].Current_Value + Math.floor(Math.random() * 4) + '℃' },
                                    { name: '时间：', content: Data[14].Current_Value + Math.floor(Math.random() * 4) + 'h' },
                                    { name: '真空度：', content: Data[1].Current_Value + Math.floor(Math.random() * 4) / 100 + 'Mpa' }
                                ]
                            }
                        ],
                        [
                            { title: '料仓3#', liArr: [{ name: '称重：', content: '0.5T' }] },
                            {
                                title: '1# 3000L真空捏合机',
                                liArr: [
                                    { name: 'IP80：', content: '0.5T/H' },
                                    { name: 'DINP：', content: '0.3T/H' },
                                    { name: '搅拌机频率：', content: '3000HZ' },
                                    { name: '搅拌机电流：', content: '35A' },
                                    { name: '水温：', content: '98℃' },
                                    { name: '料温：', content: '108℃' },
                                    { name: '出料压力：', content: '——' },
                                    { name: '称重：', content: '——' },
                                    { name: '进水温度：', content: '——' },
                                    { name: '回水温度：', content: '——' }
                                ]
                            }
                        ],
                        [
                            { title: '料仓4#', liArr: [{ name: '称重：', content: '0.5T' }] },
                            {
                                title: '2# 3000L真空捏合机',
                                liArr: [
                                    { name: 'IP80：', content: '0.5T/H' },
                                    { name: 'DINP：', content: '0.3T/H' },
                                    { name: '搅拌机频率：', content: '3000HZ' },
                                    { name: '搅拌机电流：', content: '35A' },
                                    { name: '水温：', content: '98℃' },
                                    { name: '料温：', content: '108℃' },
                                    { name: '出料压力：', content: '——' },
                                    { name: '称重：', content: '——' },
                                    { name: '进水温度：', content: '——' },
                                    { name: '回水温度：', content: '——' }
                                ]
                            }
                        ],
                        [
                            { title: '料仓5#', liArr: [{ name: '称重：', content: '0.5T' }] },
                            {
                                title: '1# 3000L真空捏合机',
                                liArr: [
                                    { name: 'IP80：', content: '0.5T/H' },
                                    { name: 'DINP：', content: '0.3T/H' },
                                    { name: '搅拌机频率：', content: '3000HZ' },
                                    { name: '搅拌机电流：', content: '35A' },
                                    { name: '水温：', content: '98℃' },
                                    { name: '料温：', content: '108℃' },
                                    { name: '出料压力：', content: '——' },
                                    { name: '称重：', content: '——' },
                                    { name: '进水温度：', content: '——' },
                                    { name: '回水温度：', content: '——' }
                                ]
                            }
                        ],
                        [
                            { title: '料仓6#', liArr: [{ name: '称重：', content: '0.5T' }] },
                            {
                                title: '2# 3000L真空捏合机',
                                liArr: [
                                    { name: 'IP80：', content: '0.5T/H' },
                                    { name: 'DINP：', content: '0.3T/H' },
                                    { name: '搅拌机频率：', content: '3000HZ' },
                                    { name: '搅拌机电流：', content: '35A' },
                                    { name: '水温：', content: '98℃' },
                                    { name: '料温：', content: '108℃' },
                                    { name: '出料压力：', content: '——' },
                                    { name: '称重：', content: '——' },
                                    { name: '进水温度：', content: '——' },
                                    { name: '回水温度：', content: '——' }
                                ]
                            }
                        ],
                        [
                            { title: '料仓7#', liArr: [{ name: '称重：', content: '0.5T' }] },
                            {
                                title: '行星搅拌机',
                                liArr: [
                                    { name: '低频率：', content: '3000HZ' },
                                    { name: '低电流：', content: '35A' },
                                    { name: '1#高频率：', content: '3000HZ' },
                                    { name: '1#高电流：', content: '35A' },
                                    { name: '2#高频率：', content: '3000HZ' },
                                    { name: '2#高电流：', content: '35A' },
                                    { name: '进水温度：', content: '20℃' },
                                    { name: '回水温度：', content: '98℃' },
                                    { name: '称重：', content: '0.5T' }
                                ]
                            }
                        ]
                    ];
                    this.facilityList = Arr;
                }
            });
        }
    },
    destroyed() {
        clearInterval(this.timers);
        this.timers = null;
    }
};
</script>

<style lang='scss' scoped>
</style>
