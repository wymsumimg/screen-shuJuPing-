<template>
    <div class="location">
        <div class="title-box" flex="main:justify">
            <div class="time-box">
                <span style="display: inline-block; width: 19%">{{ nowTimes }}</span>
                <span class="time">{{ nowTime }}</span>
            </div>
            <div class="title">
                <img src="../../assets/img/title.png" class="title-gl" alt="" />
                数据综合
            </div>
            <div class="weather-box" flex="main:right">
                <!-- <weather :city="city"></weather> -->
            </div>
        </div>
        <div class="center" flex>
            <div class="left-box" :style="zoom ? 'width:16.5%;transition: 0.3s;' : 'transition: 0.3s;'">
                <div class="box left-up">
                    <div class="left-top commn-border"></div>
                    <div class="right-top commn-border"></div>
                    <div class="left-bottom commn-border"></div>
                    <div class="right-bottom commn-border"></div>
                    <div class="left-up-title">设备统计<span class="left-up-titles">EQUIPMENT STATISTICS</span></div>
                    <div class="left-up-box" :style="zoom ? 'width: 79%;top: -0.4rem;' : ''">
                        <ul :style="zoom ? 'width: 100%;' : ''">
                            <li :style="zoom ? 'width: 1.17rem;height: 0.78rem;' : 'transition: 0.3s'">
                                <img
                                    :style="zoom ? 'width: 0;transition: 0.3s; position: absolute;' : 'transition: 0.3s'"
                                    src="../../assets/img/img-1.png"
                                    alt=""
                                />
                                <div :style="zoom ? 'margin-left:0.3rem' : ''">
                                    <div class="num">{{ allNum || 0 }}</div>
                                    <div class="num-title">设备总数</div>
                                </div>
                            </li>
                            <li :style="zoom ? 'width: 1.17rem;height: 0.78rem;' : 'transition: 0.3s'">
                                <img
                                    :style="zoom ? 'width: 0;transition: 0.3s; position: absolute;' : 'transition: 0.3s'"
                                    src="../../assets/img/img-2.png"
                                    alt=""
                                />
                                <div :style="zoom ? 'margin-left:0.3rem' : ''">
                                    <div class="num">{{ run || 0 }}</div>
                                    <div class="num-title">运行数</div>
                                </div>
                            </li>
                            <li :style="zoom ? 'width: 1.17rem;height: 0.78rem;' : 'transition: 0.3s'">
                                <img
                                    :style="zoom ? 'width: 0;transition: 0.3s; position: absolute;' : 'transition: 0.3s'"
                                    src="../../assets/img/img-3.png"
                                    alt=""
                                />
                                <div :style="zoom ? 'margin-left:0.3rem' : ''">
                                    <div class="num" style="color: #f39b57">{{ pause || 0 }}</div>
                                    <div class="num-title">暂停数</div>
                                </div>
                            </li>
                            <li :style="zoom ? 'width: 1.17rem;height: 0.78rem;' : 'transition: 0.3s'">
                                <img
                                    :style="zoom ? 'width: 0;transition: 0.3s; position: absolute;' : 'transition: 0.3s'"
                                    src="../../assets/img/img-4.png"
                                    alt=""
                                />
                                <div :style="zoom ? 'margin-left:0.3rem' : ''">
                                    <div class="num">{{ offline || 0 }}</div>
                                    <div class="num-title">离线数</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="left-up-footer" :style="zoom ? 'position: relative;width: 100%;top: -0.4rem;' : ''">
                        <div style="width: 50%">
                            <div ref="echarts" class="footer-1" id="main" style="width: 100%; height: 100%"></div>
                            <div class="echarts-title" :style="zoom ? 'left: 0.35rem;' : ''">运行设备占比</div>
                        </div>
                        <div style="width: 50%">
                            <div ref="echarts1" class="footer-2" id="main1" style="width: 100%; height: 100%"></div>
                            <div class="echarts-title" :style="zoom ? 'left: 0.35rem;' : ''">暂停设备占比</div>
                        </div>
                    </div>
                </div>

                <div class="box left-down">
                    <div class="left-top commn-border"></div>
                    <div class="right-top commn-border"></div>
                    <div class="left-bottom commn-border"></div>
                    <div class="right-bottom commn-border"></div>
                    <div class="left-up-title">运行设备<span class="left-up-titles">OPERATING EQUIPMENT</span></div>
                    <div @mouseenter="mouseEnterLeft" @mouseleave="mouseleaveLeft" class="facility">
                        <div flex="main:center cross:center" style="width: 93%; margin: 0 auto">
                            <div class="facility-title" :style="zoom ? 'width:50%' : ''">设备号</div>
                            <div class="facility-title" :style="zoom ? 'width:50%' : ''">加工时长</div>
                            <div class="facility-title" v-show="!zoom">运行占比</div>
                        </div>
                        <el-carousel
                            direction="vertical"
                            class="facility_body"
                            :interval="5000"
                            arrow="never"
                            height="100%"
                            :autoplay="autoplayLeft"
                            v-if="twoRoom1.length > 0"
                        >
                            <el-carousel-item style="height: 3.4rem" v-for="(item, index) in twoRoom1" :key="index">
                                <div v-for="(items, indexs) in item" :key="indexs" @click="onLeft(items)">
                                    <div class="facility-center" :style="id == items.Device_id ? 'background: #30406B;' : ''">
                                        <div :style="zoom ? 'width:50%' : ''">{{ items.Room }}-{{ items.Name }}</div>
                                        <div :style="zoom ? 'width:50%' : ''">{{ items.RunTime | times | noValue }}</div>
                                        <div v-show="!zoom">{{ (items.RunPercent * 100).toFixed(0) + '%' }}</div>
                                    </div>
                                </div>
                            </el-carousel-item>
                        </el-carousel>
                        <div
                            v-else
                            style="width: 100%; height: 3.4rem; color: #ffffff; font-size: 0.14rem; text-align: center; line-height: 3.4rem"
                        >
                            暂无数据
                        </div>
                    </div>
                </div>
            </div>

            <div class="center-box" :style="zoom ? 'width:63%;transition: 0.3s' : 'transition: 0.3s'">
                <div class="box center-up" :style="zoom ? 'height:70%;transition: 0.3s' : 'transition: 0.3s'">
                    <div class="left-top commn-border"></div>
                    <div class="right-top commn-border"></div>
                    <div class="left-bottom commn-border"></div>
                    <div class="right-bottom commn-border"></div>
                    <!-- <div class="left-up-title">设备总览<span class="left-up-titles">EQUIPMENT STATISTICS</span></div> -->
                    <div class="center-content" ref="UnityBox">
                        <!-- <Unity src="/Build/Build.json" unityLoader="/Build/UnityLoader.js" ref="unityvue" class="main-unity"></Unity> -->
                        <Unity :unity="unityContext" ref="unityvue" class="main-unity" />

                        <ul class="tip" :style="tipShow && tipBtnShow ? 'transition: 0.3s;' : 'width:0;transition: 0.3s;'">
                            <li
                                v-for="item in zheXianArres"
                                :key="item.index"
                                @click="onTip(item)"
                                :style="tipId == item.DeviceID ? 'border: 1px solid #01bfff;' : ''"
                            >
                                <div class="tip-title">{{ item.Room }}-{{ item.DeviceName }}#</div>
                                <!-- <div class="tip-style">
                                    加工进度：<span>{{ item.SpindleSpeed }}%</span>
                                </div> -->
                                <div class="tip-style">
                                    加工时长：<span>{{ item.CircalTime | times }}</span>
                                </div>
                                <div class="tip-style">
                                    进给倍率：<span>{{ item.FeedrateOverride }}%</span>
                                </div>
                            </li>
                        </ul>
                        <img
                            class="tip-img"
                            v-show="tipBtnShow"
                            :style="tipShow && tipBtnShow ? 'transition:left 0.3s;' : 'left: 0.1rem;transition:left 0.3s;'"
                            :src="tipShow ? require('../../assets/img/tip-suo.png') : require('../../assets/img/tip-fang.png')"
                            alt=""
                            @click="onImg"
                        />
                        <!-- <img
                            class="tip-img"
                            v-show="!tipShow && tipBtnShow"
                            style="left: 0.1rem"
                            src="../../assets/img/tip-fang.png"
                            alt=""
                            @click="onImg"
                        /> -->

                        <div class="center-status" flex="main:justify">
                            <div><i style="background: #4dff4d"></i><span>设备运行</span></div>
                            <div><i style="background: #8c34f6"></i><span>设备维修</span></div>
                            <div><i style="background: #f76a06"></i><span>设备暂停</span></div>
                            <div><i style="background: #fb4166"></i><span>设备停机</span></div>
                            <div><i style="background: #4d4d4d"></i><span>设备离线</span></div>
                        </div>
                        <!-- <div class="center-zoom" @click="contentZoom">
                            <i :style="zoom ? 'transform: rotate(145deg);top: -10px;left: 13px;' : ''"></i>
                            <i :style="zoom ? 'transform: rotate(145deg);top: -8px;left: 10px;' : ''"></i>
                        </div> -->
                    </div>
                </div>

                <div class="box center-down" v-show="!zoom" :style="zoom ? 'width:63%' : ''">
                    <div class="left-top commn-border"></div>
                    <div class="right-top commn-border"></div>
                    <div class="left-bottom commn-border"></div>
                    <div class="right-bottom commn-border"></div>
                    <div class="left-up-title">设备运行进给倍率<span class="left-up-titles">FEED RATE OF EQUIPMENT OPERATION</span></div>
                    <div
                        @mouseenter="mouseoveAl"
                        @mouseleave="mouseleaveAl"
                        ref="echarts2"
                        id="main2"
                        style="width: 100%; height: 85%"
                        v-show="echartsData.length > 0"
                    ></div>
                    <div
                        v-show="!echartsData.length > 0"
                        style="width: 100%; height: 2.3rem; color: #ffffff; font-size: 0.14rem; text-align: center; line-height: 2.3rem"
                    >
                        暂无数据
                    </div>
                </div>

                <div style="width: 100.5%; height: 26.1%" v-show="zoom" flex>
                    <div class="box center-down-left">
                        <div class="left-top commn-border"></div>
                        <div class="right-top commn-border"></div>
                        <div class="left-bottom commn-border"></div>
                        <div class="right-bottom commn-border"></div>
                        <div class="left-up-title">设备动态<span class="left-up-titles">REAL TIME STATUS</span></div>
                        <div @mouseenter="mouseEnterCenterLeft" @mouseleave="mouseleaveCenterLeft" class="facility">
                            <el-carousel
                                direction="vertical"
                                class="facility_body"
                                :interval="5000"
                                arrow="never"
                                height="100%"
                                :autoplay="autoplayCenterLeft"
                                v-if="ArrDevice.length > 0"
                            >
                                <el-carousel-item style="height: 1.75rem" v-for="(item, index) in ArrDevice" :key="index">
                                    <div v-for="(items, indexs) in item" :key="indexs">
                                        <div class="facility-center">
                                            <div :style="zoom ? 'width:40%; padding-left: 0.1rem;' : ''">
                                                {{ items.Room }}-{{ items.Name }}-<span
                                                    :style="items.RunStatus == 3 ? 'color: #f39b57' : ''"
                                                >
                                                    {{ allStatusArr[items.RunStatus] }}
                                                </span>
                                            </div>
                                            <div>进给:{{ items.FeedrateOverride }}%</div>
                                            <div :style="zoom ? 'text-align:right;padding-right: 0.1rem;' : ''">
                                                {{ items.CreateTime.slice(11) }}
                                            </div>
                                        </div>
                                    </div>
                                </el-carousel-item>
                            </el-carousel>
                            <div
                                v-else
                                style="
                                    width: 100%;
                                    height: 1.75rem;
                                    color: #ffffff;
                                    font-size: 0.14rem;
                                    text-align: center;
                                    line-height: 1.75rem;
                                "
                            >
                                暂无数据
                            </div>
                        </div>
                    </div>

                    <div class="box center-down" style="width: 51%; height: 100%">
                        <div class="left-top commn-border"></div>
                        <div class="right-top commn-border"></div>
                        <div class="left-bottom commn-border"></div>
                        <div class="right-bottom commn-border"></div>
                        <div class="left-up-title">
                            设备运行进给倍率<span class="left-up-titles">FEED RATE OF EQUIPMENT OPERATION</span>
                        </div>
                        <div
                            @mouseenter="mouseoveAls"
                            @mouseleave="mouseleaveAls"
                            ref="echarts3"
                            id="main3"
                            style="width: 100%; height: 85%"
                            v-show="echartsData.length > 0"
                        ></div>
                        <div
                            v-show="!echartsData.length > 0"
                            style="
                                width: 100%;
                                height: 1.75rem;
                                color: #ffffff;
                                font-size: 0.14rem;
                                text-align: center;
                                line-height: 1.75rem;
                            "
                        >
                            暂无数据
                        </div>
                    </div>

                    <div class="box center-down-right">
                        <div class="left-top commn-border"></div>
                        <div class="right-top commn-border"></div>
                        <div class="left-bottom commn-border"></div>
                        <div class="right-bottom commn-border"></div>
                        <div class="left-up-title">订单动态<span class="left-up-titles">REAL TIME STATUS</span></div>
                        <div @mouseenter="mouseEnterCenterRight" @mouseleave="mouseleaveCenterRight" class="facility">
                            <el-carousel
                                direction="vertical"
                                class="facility_body"
                                :interval="5000"
                                arrow="never"
                                height="100%"
                                :autoplay="autoplayCenterRight"
                                v-if="Data.length > 0"
                            >
                                <el-carousel-item style="height: 1.75rem" v-for="(item, index) in Data" :key="index">
                                    <div v-for="(items, indexs) in item" :key="indexs">
                                        <div class="facility-center">
                                            <div :style="zoom ? 'width:70%;padding-left: 0.15rem;line-height: 0.36rem;' : ''">
                                                {{ items.mess.slice(0, 7) }}- <span> {{ DataStatus[items.status] }}</span>
                                            </div>
                                            <div
                                                :style="
                                                    zoom ? 'width:30%;padding-right: 0.15rem;text-align:right;line-height: 0.36rem;' : ''
                                                "
                                            >
                                                {{ items.ctTime.split(' ')[1] }}
                                            </div>
                                        </div>
                                    </div>
                                </el-carousel-item>
                            </el-carousel>
                            <div
                                v-else
                                style="
                                    width: 100%;
                                    height: 1.75rem;
                                    color: #ffffff;
                                    font-size: 0.14rem;
                                    text-align: center;
                                    line-height: 1.75rem;
                                "
                            >
                                暂无数据
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="right-box" :style="zoom ? 'width:16.5%;transition: 0.3s;' : 'transition: 0.3s;'">
                <div class="box right-up">
                    <div class="left-top commn-border"></div>
                    <div class="right-top commn-border"></div>
                    <div class="left-bottom commn-border"></div>
                    <div class="right-bottom commn-border"></div>
                    <div class="left-up-title">订单统计<span class="left-up-titles">ORDER STATISTICS</span></div>
                    <div class="left-up-box" :style="zoom ? 'width: 79%;top: -0.4rem;' : ''">
                        <ul :style="zoom ? 'width: 100%;' : ''">
                            <li :style="zoom ? 'width: 1.17rem;height: 0.78rem;' : 'transition: 0.3s'">
                                <img
                                    :style="zoom ? 'width: 0;transition: 0.3s; position: absolute;' : 'transition: 0.3s'"
                                    src="../../assets/img/img1.png"
                                    alt=""
                                />
                                <div :style="zoom ? 'margin-left:0.3rem' : ''">
                                    <div class="num">{{ all || 0 }}</div>
                                    <div class="num-title">订单总数</div>
                                </div>
                            </li>
                            <li :style="zoom ? 'width: 1.17rem;height: 0.78rem;' : 'transition: 0.3s'">
                                <img
                                    :style="zoom ? 'width: 0;transition: 0.3s; position: absolute;' : 'transition: 0.3s'"
                                    src="../../assets/img/img2.png"
                                    alt=""
                                />
                                <div :style="zoom ? 'margin-left:0.3rem' : ''">
                                    <div class="num" style="color: #f39b57">{{ warrning || 0 }}</div>
                                    <div class="num-title">预警</div>
                                </div>
                            </li>
                            <li :style="zoom ? 'width: 1.17rem;height: 0.78rem;' : 'transition: 0.3s'">
                                <img
                                    :style="zoom ? 'width: 0;transition: 0.3s; position: absolute;' : 'transition: 0.3s'"
                                    src="../../assets/img/img3.png"
                                    alt=""
                                />
                                <div :style="zoom ? 'margin-left:0.3rem' : ''">
                                    <div class="num">{{ working || 0 }}</div>
                                    <div class="num-title">加工中</div>
                                </div>
                            </li>
                            <li :style="zoom ? 'width: 1.17rem;height: 0.78rem;' : 'transition: 0.3s'">
                                <img
                                    :style="zoom ? 'width: 0;transition: 0.3s; position: absolute;' : 'transition: 0.3s'"
                                    src="../../assets/img/img4.png"
                                    alt=""
                                />
                                <div :style="zoom ? 'margin-left:0.3rem' : ''">
                                    <div class="num">{{ Pause || 0 }}</div>
                                    <div class="num-title">加工暂停</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="box right-down">
                    <div class="left-top commn-border"></div>
                    <div class="right-top commn-border"></div>
                    <div class="left-bottom commn-border"></div>
                    <div class="right-bottom commn-border"></div>
                    <div class="left-up-title">
                        订单加工进度
                        <span class="left-up-titles"> ORDER PROCESSING {{ !zoom ? 'PROGRESS' : '' }}</span>
                    </div>
                    <div @mouseenter="mouseEnterRight" @mouseleave="mouseleaveRight" class="facility">
                        <el-carousel
                            direction="vertical"
                            class="facility_body"
                            :interval="5000"
                            arrow="never"
                            height="100%"
                            :autoplay="autoplayRight"
                            v-if="MoldPress.length > 0"
                        >
                            <el-carousel-item style="height: 5.4rem" v-for="(item, index) in MoldPress" :key="index">
                                <div v-for="(items, indexs) in item" :key="indexs" @click="onRight(items)">
                                    <div class="facility-center" :style="false ? 'border-left: 0.03rem solid #f39b57' : ''">
                                        <div
                                            class="right-down-title"
                                            :style="name == items[0] ? 'color: #ffffff;text-shadow: 0px 0px 5px #01fefa' : ''"
                                        >
                                            {{ items[0] }}<span class="right-down-titles">3/10</span>
                                        </div>
                                        <div class="progress1" :style="zoom ? 'width:49%' : ''">
                                            <div class="progress2" :style="{ width: Number(items[1]).toFixed(0) + '%' }">
                                                <div class="progress3">
                                                    <div class="progress4"></div>
                                                </div>
                                            </div>
                                            <div class="progress-title">{{ Number(items[1]).toFixed(0) }}%</div>
                                        </div>
                                    </div>
                                </div>
                            </el-carousel-item>
                        </el-carousel>

                        <div
                            v-else
                            style="width: 100%; height: 5.4rem; color: #ffffff; font-size: 0.14rem; text-align: center; line-height: 5.4rem"
                        >
                            暂无数据
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import weather from './component/weather.vue';
import elementResizeDetectorMaker from 'element-resize-detector';

import { GetStatusLog, GetDeviceStatusHome } from '../../api/api';
import { getTime, time_to_sec, yestodayTimeFun, compare, sortByKey } from '../../utils/index';

import domainsFuc from '@/api/domains';
import { TokenKeys } from '@/utils/variable';

// import Unity from 'vue-unity-webgl';
import UnityWebgl from 'unity-webgl';
const Unity = new UnityWebgl({
    loaderUrl: '/Build/Build.loader.js',
    dataUrl: '/Build/Build.data',
    frameworkUrl: '/Build/Build.framework.js',
    codeUrl: '/Build/Build.wasm'
});
export default {
    name: 'location',
    components: {
        weather,
        //  Unity
        Unity: UnityWebgl.vueComponent
    },
    data() {
        return {
            unityContext: Unity,
            autoplayLeft: true,
            autoplayCenterLeft: true,
            autoplayCenterRight: true,
            autoplayRight: true,
            nowTime: '',
            nowTimes: '',
            city: '',
            zoom: true,
            dateValue: [],
            begintime: '',
            endtime: '',
            moremStartTime: '',
            moremEndTime: '',
            allNum: '',
            run: '', //
            pause: '', //
            offline: '', //
            runOf: '', //
            layOff: '',
            twoRoom1: [],
            echartsData: [], //
            echartsName: [],
            echartsDatas: [], //
            echartsNames: [],
            all: '',
            warrning: '',
            working: '',
            Pause: '',
            MoldPress: [],
            id: '',
            name: '',
            ArrDevice: [],
            allStatusArr: this.$global.status,
            Data: [],
            DataStatus: {
                0: '待加工',
                1: '开始加工',
                2: '加工完成',
                3: '准备加工',
                4: '加工暂停',
                5: '工艺跳过'
            },
            idArr: [],
            zheXianArr: [],
            wses: '',
            tipId: '',
            tipShow: false,
            tipBtnShow: false,
            rightArr: [10002103, 10002102, 10002105, 10002107, 10002104, 10002209],
            zheXianArres: []
        };
    },
    watch: {
        zoom(val) {
            this.UnityBox();
            if (val) {
                this.echartsData = JSON.parse(JSON.stringify(this.echartsDatas));
                this.echartsName = JSON.parse(JSON.stringify(this.echartsNames));
                for (let index = 0; index < this.echartsData.length % 7; index++) {
                    this.echartsData.push('');
                    this.echartsName.push('');
                }
                this.$nextTick(() => {
                    this.drawLine(this.runOf);
                    this.drawLine1(this.layOff);
                    this.drawLine3(this.echartsName, this.echartsData);
                });
            } else {
                this.echartsData = JSON.parse(JSON.stringify(this.echartsDatas));
                this.echartsName = JSON.parse(JSON.stringify(this.echartsNames));
                for (let index = 0; index < this.echartsData.length % 10; index++) {
                    this.echartsData.push('');
                    this.echartsName.push('');
                }
                this.$nextTick(() => {
                    this.drawLine(this.runOf);
                    this.drawLine1(this.layOff);
                    this.drawLine2(this.echartsName, this.echartsData);
                });
            }
        }
    },
    mounted() {
        this.domainsUrl = domainsFuc(TokenKeys.PRODUCT_ENV).domain;
        // if (this.domainsUrl.substr(0, 21) == 'http://202.202.202.10') {
        //     // 赛豪私有
        //     this.wses = 'ws://202.202.202.10:9222';
        // } else if (this.domainsUrl.substr(0, 21) == 'http://192.168.0.216:') {
        //     // 精诚私有
        //     this.wses = 'ws://192.168.0.216:9222';
        // } else {
        //     // 正式
        //     this.wses = 'wss://data.wfjar.com:9222';
        // }
        this.wses = window.wssURL;

        this.comp_id = 10002;
        this.comp_name1 = 10002;
        // if (localStorage.getItem('allCheJian')) {
        //     this.allCheJian = localStorage.getItem('allCheJian');
        // }
        // this.getQuery_device_room();
        this.websocket();
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
        // this.$nextTick(() => {

        // });
        window.onresize = () => {
            resizeFont();
        };
        setTimeout(() => {
            this.UnityBox();
        }, 1000);
    },
    methods: {
        drawLine(runOf) {
            var chartDom = document.getElementById('main');
            var myChart = echarts.init(chartDom);
            var option;
            let resizeTimer = null;

            option = {
                title: [
                    {
                        text: runOf + '%',
                        x: 'center',
                        y: 'center',
                        textStyle: {
                            fontSize: '15',
                            color: '#FFFFFF',
                            fontFamily: 'DINAlternate-Bold, DINAlternate',
                            foontWeight: '600'
                        }
                    }
                ],

                polar: {
                    radius: ['52%', '62%'],
                    center: ['50%', '50%']
                },
                angleAxis: {
                    max: 100,
                    show: false
                },
                radiusAxis: {
                    type: 'category',
                    show: true,
                    axisLabel: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    }
                },
                series: [
                    {
                        name: '',
                        type: 'bar',
                        roundCap: true,
                        barWidth: 20,
                        showBackground: true,
                        backgroundStyle: {
                            color: '#29405d'
                        },
                        data: [runOf],
                        coordinateSystem: 'polar',
                        itemStyle: {
                            color: '#F39B57'
                        }
                    },
                    {
                        name: '',
                        type: 'pie',
                        startAngle: 80,
                        radius: ['70%'],
                        hoverAnimation: false,
                        center: ['50%', '50%'],
                        itemStyle: {
                            color: 'rgba(66, 66, 66, .1)',
                            borderWidth: 3,
                            borderColor: '#29405d'
                        },
                        data: [100]
                    },
                    {
                        name: '',
                        type: 'pie',
                        startAngle: 80,
                        radius: ['42%'],
                        hoverAnimation: false,
                        center: ['50%', '50%'],
                        itemStyle: {
                            color: 'rgba(34,53,90,0.5)',
                            borderWidth: 1,
                            borderColor: '#273961'
                        },
                        data: [100]
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

            //  随外层div的大小变化自适应
            let erd = elementResizeDetectorMaker();
            erd.listenTo(this.$refs.echarts, () => {
                this.$nextTick(() => {
                    myChart.resize();
                });
            });
        },
        drawLine1(layOff) {
            var chartDom = document.getElementById('main1');
            var myChart = echarts.init(chartDom);
            var option;
            let resizeTimer = null;

            option = {
                title: [
                    {
                        text: layOff + '%',
                        x: 'center',
                        y: 'center',
                        textStyle: {
                            fontSize: '15',
                            color: '#FFFFFF',
                            fontFamily: 'DINAlternate-Bold, DINAlternate',
                            foontWeight: '600'
                        }
                    }
                ],

                polar: {
                    radius: ['52%', '62%'],
                    center: ['50%', '50%']
                },
                angleAxis: {
                    max: 100,
                    show: false
                },
                radiusAxis: {
                    type: 'category',
                    show: true,
                    axisLabel: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    }
                },
                series: [
                    {
                        name: '',
                        type: 'bar',
                        roundCap: true,
                        barWidth: 20,
                        showBackground: true,
                        backgroundStyle: {
                            color: '#29405d'
                        },
                        data: [layOff],
                        coordinateSystem: 'polar',
                        itemStyle: {
                            color: '#F39B57'
                        }
                    },
                    {
                        name: '',
                        type: 'pie',
                        startAngle: 80,
                        radius: ['70%'],
                        hoverAnimation: false,
                        center: ['50%', '50%'],
                        itemStyle: {
                            color: 'rgba(66, 66, 66, .1)',
                            borderWidth: 3,
                            borderColor: '#29405d'
                        },
                        data: [100]
                    },
                    {
                        name: '',
                        type: 'pie',
                        startAngle: 80,
                        radius: ['42%'],
                        hoverAnimation: false,
                        center: ['50%', '50%'],
                        itemStyle: {
                            color: 'rgba(34,53,90,0.5)',
                            borderWidth: 1,
                            borderColor: '#273961'
                        },
                        data: [100]
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
            let erd = elementResizeDetectorMaker();
            erd.listenTo(this.$refs.echarts1, () => {
                this.$nextTick(() => {
                    myChart.resize();
                });
            });
        },
        drawLine2(echartsName, echartsData) {
            var chartDom = document.getElementById('main2');
            var myChart = echarts.init(chartDom);
            this.myChart2 = myChart;
            var option;
            let resizeTimer = null;

            option = {
                dataZoom: [
                    //滚动条
                    {
                        show: false,
                        type: 'slider',
                        realtime: true,
                        startValue: 0,
                        endValue: 9,
                        xAxisIndex: [0],
                        bottom: '8',
                        left: '30',
                        height: 5,
                        borderColor: 'rgba(0,0,0,0)',
                        textStyle: {
                            color: '#05D5FF'
                        }
                    }
                ],
                grid: {
                    top: '28px',
                    left: '50px',
                    right: '30px',
                    bottom: '35px'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                    formatter: function (params) {
                        var relVal = params[0].name;
                        for (var i = 0, l = params.length; i < l; i++) {
                            relVal += '<br/>' + params[i].value + '%';
                        }
                        return relVal;
                    }
                },
                xAxis: {
                    type: 'category',
                    data: echartsName,
                    axisLine: {
                        //y轴线的颜色以及宽度
                        show: false,
                        lineStyle: {
                            color: '#D5EBFD',
                            width: 1,
                            type: 'solid'
                        }
                    },
                    axisTick: {
                        show: false
                    }
                },
                yAxis: {
                    name: '(%)         ', //y轴上方的单位
                    nameTextStyle: {
                        //y轴上方单位的颜色
                        color: '#D5EBFD'
                    },
                    type: 'value',
                    axisLine: {
                        //y轴线的颜色以及宽度
                        show: false,
                        lineStyle: {
                            color: '#D5EBFD',
                            width: 1,
                            type: 'solid'
                        }
                    },
                    splitLine: {
                        //分割线配置
                        show: true,
                        lineStyle: {
                            color: 'rgba(255,255,255,0.1)'
                        }
                    },
                    axisTick: {
                        show: false
                    }
                },
                series: [
                    {
                        data: echartsData,
                        type: 'pictorialBar',
                        symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
                        itemStyle: {
                            normal: {
                                //渐变色
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: '#338B96'
                                    },
                                    {
                                        offset: 0.65,
                                        color: 'rgba(51, 139, 150, 0.6)'
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(51, 139, 150, 0.05)'
                                    }
                                ]),
                                label: {
                                    formatter: '{c}' + '%',
                                    show: true,
                                    position: 'top',
                                    textStyle: {
                                        fontWeight: '400',
                                        fontSize: '12',
                                        color: '#fff'
                                    }
                                }
                            }
                        }
                    }
                ]
            };

            this.option2 = option;

            option && myChart.setOption(option);

            myChart.resize();

            window.addEventListener('resize', () => {
                if (resizeTimer) clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    echarts.init(document.getElementById('main2')).resize();
                }, 100);
            });
            let erd = elementResizeDetectorMaker();
            erd.listenTo(this.$refs.echarts2, () => {
                this.$nextTick(() => {
                    myChart.resize();
                });
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
            // 定时器
            clearInterval(this.setInterValAl);
            let that = this;
            this.setInterValAl = setInterval(function () {
                // 每次向后滚动一个，最后一个从头开始。
                if (that.option2.dataZoom[0].endValue == that.echartsData.length - 1) {
                    that.option2.dataZoom[0].endValue = 9;
                    that.option2.dataZoom[0].startValue = 0;
                } else {
                    that.option2.dataZoom[0].endValue = that.option2.dataZoom[0].endValue + 10;
                    that.option2.dataZoom[0].startValue = that.option2.dataZoom[0].startValue + 10;
                }
                that.myChart2.setOption(that.option2);
            }, 4000);
        },
        drawLine3(echartsName, echartsData) {
            var chartDom = document.getElementById('main3');
            var myChart = echarts.init(chartDom);
            this.myChart3 = myChart;
            var option;
            let resizeTimer = null;

            option = {
                dataZoom: [
                    //滚动条
                    {
                        show: false,
                        type: 'slider',
                        realtime: true,
                        startValue: 0,
                        endValue: 6,
                        xAxisIndex: [0],
                        bottom: '13',
                        left: '30',
                        height: 5,
                        borderColor: 'rgba(0,0,0,0)',
                        textStyle: {
                            color: '#05D5FF'
                        }
                    }
                ],

                grid: {
                    top: '30px',
                    left: '40px',
                    right: '20px',
                    bottom: '40px'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                    formatter: function (params) {
                        var relVal = params[0].name;
                        for (var i = 0, l = params.length; i < l; i++) {
                            relVal += '<br/>' + params[i].value + '%';
                        }
                        return relVal;
                    }
                },
                xAxis: {
                    axisLabel: {
                        interval: 0
                    },
                    type: 'category',
                    data: echartsName,
                    axisLine: {
                        //y轴线的颜色以及宽度
                        show: false,
                        lineStyle: {
                            color: '#D5EBFD',
                            width: 1,
                            type: 'solid'
                        }
                    },
                    axisTick: {
                        show: false
                    }
                },
                yAxis: {
                    name: '(%)         ', //y轴上方的单位
                    nameTextStyle: {
                        //y轴上方单位的颜色
                        color: '#D5EBFD'
                    },
                    type: 'value',
                    axisLine: {
                        //y轴线的颜色以及宽度
                        show: false,
                        lineStyle: {
                            color: '#D5EBFD',
                            width: 1,
                            type: 'solid'
                        }
                    },
                    splitLine: {
                        //分割线配置
                        show: true,
                        lineStyle: {
                            color: 'rgba(255,255,255,0.1)'
                        }
                    },
                    axisTick: {
                        show: false
                    }
                },
                series: [
                    {
                        data: echartsData,
                        type: 'pictorialBar',
                        symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
                        itemStyle: {
                            normal: {
                                //渐变色
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: '#338B96'
                                    },
                                    {
                                        offset: 0.65,
                                        color: 'rgba(51, 139, 150, 0.6)'
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(51, 139, 150, 0.05)'
                                    }
                                ]),
                                label: {
                                    formatter: '{c}' + '%',
                                    show: true,
                                    position: 'top',
                                    textStyle: {
                                        fontWeight: '400',
                                        fontSize: '12',
                                        color: '#fff'
                                    }
                                }
                            }
                        }
                    }
                ]
            };
            this.option3 = option;
            option && myChart.setOption(option);

            myChart.resize();

            window.addEventListener('resize', () => {
                if (resizeTimer) clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    echarts.init(document.getElementById('main3')).resize();
                }, 100);
            });
            let erd = elementResizeDetectorMaker();
            erd.listenTo(this.$refs.echarts3, () => {
                this.$nextTick(() => {
                    myChart.resize();
                });
            });
            this.setIntervalAlls();
        },
        //划入
        mouseoveAls() {
            clearInterval(this.setInterValAls);
        },
        //划出
        mouseleaveAls() {
            this.setIntervalAlls();
        },
        setIntervalAlls() {
            // 定时器
            clearInterval(this.setInterValAls);
            let that = this;
            this.setInterValAls = setInterval(function () {
                // 每次向后滚动一个，最后一个从头开始。
                if (that.option3.dataZoom[0].endValue == that.echartsData.length - 1) {
                    that.option3.dataZoom[0].endValue = 6;
                    that.option3.dataZoom[0].startValue = 0;
                } else {
                    that.option3.dataZoom[0].endValue = that.option3.dataZoom[0].endValue + 7;
                    that.option3.dataZoom[0].startValue = that.option3.dataZoom[0].startValue + 7;
                }
                that.myChart3.setOption(that.option3);
            }, 4000);
        },

        mouseEnterLeft() {
            this.autoplayLeft = false;
        },
        mouseleaveLeft() {
            this.autoplayLeft = true;
        },
        mouseEnterCenterLeft() {
            this.autoplayCenterLeft = false;
        },
        mouseleaveCenterLeft() {
            this.autoplayCenterLeft = true;
        },
        mouseEnterCenterRight() {
            this.autoplayCenterRight = false;
        },
        mouseleaveCenterRight() {
            this.autoplayCenterRight = true;
        },
        mouseEnterRight() {
            this.autoplayRight = false;
        },
        mouseleaveRight() {
            this.autoplayRight = true;
        },
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
            const self = this;
            AMap.plugin('AMap.Geolocation', function () {
                var geolocation = new AMap.Geolocation({
                    // 是否使用高精度定位，默认：true
                    enableHighAccuracy: true,
                    // 设置定位超时时间，默认：无穷大
                    timeout: 10000
                });
                geolocation.getCurrentPosition();
                AMap.event.addListener(geolocation, 'complete', onComplete);
                AMap.event.addListener(geolocation, 'error', onError);
                function onComplete(data) {
                    // data是具体的定位信息 精准定位
                    console.log(data);
                }
                function onError(data) {
                    // 定位出错  非精准定位
                    // console.log(data)
                    self.getLngLatLocation();
                }
            });
        },
        getLocations() {
            const self = this;
            AMap.plugin('AMap.Geolocation', function () {
                var geolocation = new AMap.Geolocation({
                    // 是否使用高精度定位，默认：true
                    enableHighAccuracy: true,
                    // 设置定位超时时间，默认：无穷大
                    timeout: 10
                });
                geolocation.getCurrentPosition();
                AMap.event.addListener(geolocation, 'complete', onComplete);
                AMap.event.addListener(geolocation, 'error', onError);
                function onComplete(data) {
                    // data是具体的定位信息 精准定位
                    console.log(data, 22222222222222222);
                }
                function onError(data) {
                    // 定位出错  非精准定位
                    // console.log(data, 333333333333333333333);
                    self.getLngLatLocation();
                }
            });
        },
        // 获取经纬度，在获取具体定位失败时调用
        getLngLatLocation() {
            AMap.plugin('AMap.CitySearch', function () {
                var citySearch = new AMap.CitySearch();
                citySearch.getLocalCity(function (status, result) {
                    if (status === 'complete' && result.info === 'OK') {
                        // 查询成功，result即为当前所在城市信息

                        AMap.plugin('AMap.Geocoder', function () {
                            var geocoder = new AMap.Geocoder({
                                // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                                city: result.adcode
                            });
                            var lnglat = result.rectangle.split(';')[0].split(',');
                            geocoder.getAddress(lnglat, function (status, data) {
                                if (status === 'complete' && data.info === 'OK') {
                                    // result为对应的地理位置详细信息
                                }
                            });
                        });
                    }
                });
            });
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
        contentZoom() {
            this.zoom = !this.zoom;
        },
        group(array, subGroupLength) {
            let index = 0;
            let newArray = [];
            while (index < array.length) {
                newArray.push(array.slice(index, (index += subGroupLength)));
            }
            return newArray;
        },
        timeInit() {
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
        },
        postGetDeviceStatusHome() {
            let params = {
                CP_ID: 1,
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
                    this.run = Data.Status2;
                    this.pause = Data.Status3;
                    this.offline = Data.StatusOffLine;
                    this.runOf = (Data.Status2 / Data.StatusALL).toFixed(2) * 100;
                    this.layOff = (Data.Status3 / Data.StatusALL).toFixed(2) * 100;

                    this.twoRoom = [];
                    this.fourRoom = [];
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
                    this.twoRoom.map((item) => {
                        this.echartsName.push(`${item.Room}-${item.Name}#`);
                        this.echartsData.push(item.FeedrateOverride);
                        this.echartsNames.push(`${item.Room}-${item.Name}#`);
                        this.echartsDatas.push(item.FeedrateOverride);
                    });
                    this.twoRoom.sort(compare('RunPercent', true));
                    let indexList = Math.ceil(this.twoRoom.length / (this.login_staus > 2 ? 10 : 8));
                    let newArr = [];
                    for (var i = 0; i < indexList; i++) {
                        newArr[i] = this.twoRoom.splice(0, this.login_staus > 2 ? 10 : 8);
                    }
                    this.twoRoom1 = newArr;
                }
                this.drawLine(this.runOf);
                this.drawLine1(this.layOff);
                for (let index = 0; index < this.echartsData.length % 7; index++) {
                    this.echartsData.push('');
                    this.echartsName.push('');
                }

                this.drawLine2(this.echartsName, this.echartsData);
                this.drawLine3(this.echartsName, this.echartsData);
            });
        },
        MoldHome() {
            let params = {
                cp_id: 2
            };
            this.$axios.post('https://order.moldcube.com:8100/api/data/MoldHome', params).then((res) => {
                let { ReturnCode, Data } = res.data;
                if (ReturnCode == 200) {
                    this.all = Data.O_ALL;
                    this.warrning = Data.O_Warrning;
                    this.working = Data.O_Working;
                    this.Pause = Data.M_Pause;

                    let MoldPress = [];
                    Data.MoldPress.map((item) => {
                        MoldPress.push({ ...item });
                    });
                    this.MoldPress = this.group(MoldPress, 10);
                    this.Data = this.group(Data.RunTimeMess, 5);
                }
            });
        },
        onLeft(item) {
            // Boolean(idArr.indexOf(items.Device_id) + 1)
            // let a = this.idArr.indexOf(item.Device_id);
            // if (a != -1) {
            //     var id = this.idArr.splice(a, 1);
            //     this.$refs.unityvue.message('JsMessage', 'HideTarget', id[0].toString());
            // } else {
            //     this.id = item.Device_id;
            //     this.$refs.unityvue.message('JsMessage', 'FocussingTarget', this.id.toString());
            //     this.idArr.push(this.id);
            // }
            if (this.name != '') {
                Unity.send('JsMessage', 'HideTarget', this.rightArr.join('-'));
                Unity.send('JsMessage', 'HideName', this.tipId.toString());
                // this.$refs.unityvue.message('JsMessage', 'HideTarget', this.rightArr.join('-'));
                // this.$refs.unityvue.message('JsMessage', 'HideName', this.tipId.toString());
                this.name = '';
                this.tipBtnShow = false;
            }

            if (this.id == item.Device_id) {
                this.id = '';
                Unity.send('JsMessage', 'HideTarget', item.Device_id.toString());
                // this.$refs.unityvue.message('JsMessage', 'HideTarget', item.Device_id.toString());
            } else {
                if (this.id != '') {
                    Unity.send('JsMessage', 'HideTarget', this.id.toString());
                    // this.$refs.unityvue.message('JsMessage', 'HideTarget', this.id.toString());
                }
                Unity.send('JsMessage', 'FocussingTarget', item.Device_id.toString());
                // this.$refs.unityvue.message('JsMessage', 'FocussingTarget', item.Device_id.toString());
                this.id = item.Device_id;
            }
        },
        onRight(item) {
            if (this.id != '') {
                Unity.send('JsMessage', 'HideTarget', this.id.toString());
                // this.$refs.unityvue.message('JsMessage', 'HideTarget', this.id.toString());
                this.id = '';
            }
            if (this.name == item[0]) {
                this.name = '';
                this.tipBtnShow = false;
                Unity.send('JsMessage', 'HideTarget', this.rightArr.join('-'));
                Unity.send('JsMessage', 'HideName', this.tipId.toString());
                // this.$refs.unityvue.message('JsMessage', 'HideTarget', this.rightArr.join('-'));
                // this.$refs.unityvue.message('JsMessage', 'HideName', this.tipId.toString());
                this.tipId = '';
            } else {
                this.name = item[0];
                let arr = [];

                for (let i = 0; i < this.zheXianArr.length; i++) {
                    for (let j = 0; j < this.rightArr.length; j++) {
                        if (this.zheXianArr[i].DeviceID == this.rightArr[j]) {
                            arr.push(this.zheXianArr[i]);
                        }
                    }
                }
                this.zheXianArres = arr;

                this.tipBtnShow = true;
                this.tipShow = true;
                Unity.send('JsMessage', 'HideName', this.tipId.toString());
                // this.$refs.unityvue.message('JsMessage', 'HideName', this.tipId.toString());
                this.tipId = '';
                Unity.send('JsMessage', 'FocussingTarget', this.rightArr.join('-'));
                // this.$refs.unityvue.message('JsMessage', 'FocussingTarget', this.rightArr.join('-'));
            }
        },
        tabData() {
            let params = {
                CP_ID: 10002,
                Device_ID: 0,
                Room: 0,
                BeginTime: this.dateValue ? this.begintime : this.moremStartTime, //'2021-09-12 00:00:00',
                EndTime: this.dateValue ? this.endtime : this.moremEndTime,
                EndablePager: 0, //是否分页
                PageIndex: 0,
                PageSize: 0,
                Status: 0
            };
            GetStatusLog(params).then((res) => {
                const { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    this.ArrDevice = this.group(Data, 5);
                }
            });
        },
        UnityBox() {
            let erd = elementResizeDetectorMaker();
            this.$nextTick(() => {
                erd.listenTo(document.getElementsByClassName('center-content'), (element) => {
                    var width = element.offsetWidth;
                    var height = element.offsetHeight;
                    // document.getElementById('#canvas').width = width;
                    // document.getElementById('#canvas').height = height;
                });
            });
        },
        websocket() {
            // if (this.domainsUrl.substr(0, 21) == 'http://202.202.202.10') {
            //     // 赛豪私有
            //     let ws = new WebSocket('ws://202.202.202.10:9222');
            // }else if (this.domainsUrl.substr(0, 21) == 'http://192.168.0.216:') {
            //     // 精诚私有
            //     let ws = new WebSocket('ws://192.168.0.216:9222');
            // }else{
            //     // 正式
            //     let ws = new WebSocket('wss://data.wfjar.com:9222');
            // }
            let ws = new WebSocket(this.wses);

            ws.onopen = () => {
                // Web Socket 已连接上，使用 send() 方法发送数据
                ws.send('b-1&' + this.comp_name1);
                // console.log(this.$t('menu.shujufasongzhong'), 'b-1&' + this.comp_name1);
            };
            ws.onmessage = (msg) => {
                // console.log('数据已接收...')
                let oneArr = JSON.parse(msg.data);
                // console.log(oneArr);

                if (this.zheXianArr.length == 0) {
                    this.zheXianArr.push(oneArr);
                } else {
                    let flag = false;
                    for (let i = 0; i < this.zheXianArr.length; i++) {
                        if (this.zheXianArr[i].DeviceID == oneArr.DeviceID) {
                            // this.zheXianArr[i]=oneArr
                            this.zheXianArr[i].Room = oneArr.Room;
                            this.zheXianArr[i].Device = oneArr.Device;
                            this.zheXianArr[i].RunStatus = oneArr.RunStatus;
                            this.zheXianArr[i].SpindleSpeed = oneArr.SpindleSpeed;
                            this.zheXianArr[i].SpindleOverride = oneArr.SpindleOverride;
                            this.zheXianArr[i].PartsCount = oneArr.PartsCount;
                            this.zheXianArr[i].Feedrate = oneArr.Feedrate;
                            this.zheXianArr[i].FeedrateOverride = oneArr.FeedrateOverride;
                            this.zheXianArr[i].CircalTime = oneArr.CircalTime;
                            this.zheXianArr[i].RelX = oneArr.RelX;
                            this.zheXianArr[i].RelY = oneArr.RelY;
                            this.zheXianArr[i].RelZ = oneArr.RelZ;
                            this.zheXianArr[i].RunCode = oneArr.RunCode;
                            this.zheXianArr[i].RunLine = oneArr.RunLine;
                            flag = true;
                            break;
                        }
                    }
                    if (flag == false) {
                        this.zheXianArr.push(oneArr);
                        sortByKey(this.zheXianArr, 'Device');
                    }
                }
            };
            ws.onclose = function () {
                // 关闭 websocket
                // console.log('连接已关闭...');
            };
            // 路由跳转时结束websocket链接
            this.$router.afterEach(function () {
                ws.close();
            });
        },
        onTip(item) {
            if (this.tipId == item.DeviceID) {
                this.tipId = '';
                Unity.send('JsMessage', 'HideName', item.DeviceID.toString());
                // this.$refs.unityvue.message('JsMessage', 'HideName', item.DeviceID.toString());
            } else {
                Unity.send('JsMessage', 'HideName', this.tipId.toString());
                Unity.send('JsMessage', 'FocussingShowName', item.DeviceID.toString());
                // this.$refs.unityvue.message('JsMessage', 'HideName', this.tipId.toString());
                // this.$refs.unityvue.message('JsMessage', 'FocussingShowName', item.DeviceID.toString());
                this.tipId = item.DeviceID;
            }
        },
        onImg() {
            this.tipShow = !this.tipShow;
        }
    },
    created() {
        this.showTimes();
        this.getLocation();
        this.getLocations();
        this.timeInit();
        this.postGetDeviceStatusHome();
        this.MoldHome();
        this.tabData();
    },
    destroyed() {
        clearInterval(this.NowTimer);
        clearInterval(this.setInterValAl);
        clearInterval(this.setInterValAls);
    }
};
</script>

<style lang='scss' scoped>
</style>
<style lang='scss'>
.facility .el-carousel__indicator--vertical .el-carousel__button {
    background: #283e5b;
}
.facility .el-carousel__indicator.is-active button {
    background: #096095;
}
</style>