<template>
    <div class="detailBing" style="height: auto">
        <div class="homePageTitle" flex="cross:center main:justify">
            <div>
                <div flex="cross:center " style="margin-left: 20px">
                    <!-- <comp-logo :comp_id="comp_id"></comp-logo> -->
                    <!-- <title-check :num="checkNum"></title-check> -->

                    <div class="titleSearch">
                        <el-input v-model="SearchValue" clearable placeholder="请输入设备编号" @change="changeSearch"> </el-input>
                        <!-- <span class="el-icon-search jiqiIcon"></span> -->
                    </div>
                    <div class="allStatusClass allStatusClass_2" style="margin: 0 0 0 20px">
                        <!-- <el-select
                            v-model="allCheJian"
                            @change="selectChange"
                            clearable
                            :popper-append-to-body="false"
                            placeholder="全部车间"
                        >
                            <el-option v-for="item in cheJianHao" :key="item.room" :label="item.room+'号车间' " :value="item.room">
                            </el-option>
                        </el-select> -->
                        <cheJian :allCheJian="allCheJian" @childChejian="parentChejian"></cheJian>

                    </div>

                    <div>
                        <button class="chooseBtn" style="margin: 0 0 0 20px" @click="chooseSearch()">查询</button>
                    </div>
                    <div class="checked" style="margin-top: 0.35rem">
                        <el-checkbox v-model="checkedLiXian" @change="yincangLiXian">隐藏离线设备</el-checkbox>
                    </div>
                </div>
            </div>
            <div style="margin-right: 0.1rem">
                <!-- <set-login></set-login> -->
            </div>
        </div>

        <div class="statisticalBody" v-if="weicha" style="min-height: 9rem" v-loading="loading" element-loading-background="transparent">
            <div class="ssJinJi statusss">
                <ul flex flex-wrap element-loading-spinner="el-icon-loading" element-loading-background="#182039">
                    <li v-for="(item, index) in zheXianArr" :key="index">
                        <div class="ss_dott" :class="[statusColorbg[item.RunStatus]]"></div>
                        <div class="ss_topTitle" flex="main:justify">
                            <div flex="cross:center">
                                <span class="ss_topTitle_left">{{ item.Room }}-{{ item.DeviceName }}#</span>
                                <span class="ss_topTitle_right" style="margin-left: 0.2rem"
                                    >状态：<span class="daiji" :class="[statusColor[item.RunStatus]]">{{
                                        status[item.RunStatus]
                                    }}</span></span
                                >
                            </div>
                            <div
                                class="ss_topTitle_right"
                                v-show="comp_id <= 2"
                                @click="threeD(item)"
                                :class="item.RunStatus == -1 ? 'nsFray' : 'nsWhite'"
                            >
                                孪生
                            </div>
                        </div>
                        <div class="statusLi">
                            <div class="ss_content_top" flex>
                                <div class="ss_c_t" flex="dir:top cross:bottom">
                                    <div class="ss_t_l" flex="cross:center">
                                        <div class="ss_text">主轴转数</div>
                                        <div class="ss_kaung">{{ item.SpindleSpeed }}</div>
                                    </div>
                                    <div class="ss_t_l" flex="cross:center">
                                        <div class="ss_text">主轴倍率</div>
                                        <div class="ss_kaung ss_cheng">{{ item.SpindleOverride }}%</div>
                                    </div>
                                    <div class="ss_t_l" flex="cross:center">
                                        <div class="ss_text">加工计件</div>
                                        <div class="ss_kaung">{{ item.PartsCount }}</div>
                                    </div>
                                </div>
                                <div class="ss_c_r" flex="dir:top cross:top">
                                    <div class="ss_t_l" flex="cross:center">
                                        <div class="ss_text">进给速度</div>
                                        <div class="ss_kaung">{{ item.Feedrate }}</div>
                                    </div>
                                    <div class="ss_t_l" flex="cross:center">
                                        <div class="ss_text">进给倍率</div>
                                        <div class="ss_kaung ss_hong">{{ item.FeedrateOverride }}%</div>
                                    </div>
                                    <div class="ss_t_l" flex="cross:center">
                                        <div class="ss_text">循环时间</div>
                                        <div class="ss_kaung">{{ Math.round(item.CircalTime / 60) }}min</div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="ss_t_l" flex="cross:center" style="margin-left: 0.5rem">
                                    <div class="ss_text">执行语句</div>
                                    <el-tooltip :content="item.RunCode | noValue" placement="top">
                                        <div class="ss_kaung shenglue" style="width: 4rem">
                                            {{ item.RunCode }}
                                        </div>
                                    </el-tooltip>
                                </div>
                                <div class="ss_t_l" flex="cross:center" style="margin-left: 0.5rem">
                                    <div class="ss_text">执行行号</div>
                                    <div class="ss_kaung" style="width: 4rem">{{ item.RunLine }}</div>
                                </div>
                            </div>
                            <div class="ss_content_bottom" flex>
                                <div class="ss_b_li">X：{{ item.RelX }}</div>
                                <div class="ss_b_li">Y：{{ item.RelY }}</div>
                                <div class="ss_b_li">Z：{{ item.RelZ }}</div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="statisticalBody" v-if="!weicha" style="min-height: 9rem" v-loading="loading" element-loading-background="transparent">
            <div class="ssJinJi statusss">
                <ul flex flex-wrap element-loading-spinner="el-icon-loading" element-loading-background="#182039">
                    <li v-for="(item, index) in arr1" :key="index">
                        <div class="ss_dott" :class="[statusColorbg[item.RunStatus]]"></div>
                        <div class="ss_topTitle" flex="main:justify">
                            <span class="ss_topTitle_left">{{ item.Room }}#{{ item.DeviceName }}</span>
                            <span class="ss_topTitle_right"
                                >状态：<span class="daiji" :class="[statusColor[item.RunStatus]]">{{ status[item.RunStatus] }}</span></span
                            >
                        </div>
                        <div class="statusLi">
                            <div class="ss_content_top" flex>
                                <div class="ss_c_t" flex="dir:top cross:bottom">
                                    <div class="ss_t_l" flex="cross:center">
                                        <div class="ss_text">主轴转数</div>
                                        <div class="ss_kaung">{{ item.SpindleSpeed }}</div>
                                    </div>
                                    <div class="ss_t_l" flex="cross:center">
                                        <div class="ss_text">主轴倍率</div>
                                        <div class="ss_kaung ss_cheng">{{ item.SpindleOverride }}%</div>
                                    </div>
                                    <div class="ss_t_l" flex="cross:center">
                                        <div class="ss_text">加工计件</div>
                                        <div class="ss_kaung">{{ item.PartsCount }}</div>
                                    </div>
                                </div>
                                <div class="ss_c_r" flex="dir:top cross:top">
                                    <div class="ss_t_l" flex="cross:center">
                                        <div class="ss_text">进给速度</div>
                                        <div class="ss_kaung">{{ item.Feedrate }}</div>
                                    </div>
                                    <div class="ss_t_l" flex="cross:center">
                                        <div class="ss_text">进给倍率</div>
                                        <div class="ss_kaung ss_hong">{{ item.FeedrateOverride }}%</div>
                                    </div>
                                    <div class="ss_t_l" flex="cross:center">
                                        <div class="ss_text">循环时间</div>
                                        <div class="ss_kaung">{{ Math.round(item.CircalTime / 60) }}min</div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="ss_t_l" flex="cross:center" style="margin-left: 0.5rem">
                                    <div class="ss_text">执行语句</div>
                                    <el-tooltip :content="item.RunCode | noValue" placement="top">
                                        <div class="ss_kaung shenglue" style="width: 4rem">
                                            {{ item.RunCode }}
                                        </div>
                                    </el-tooltip>
                                </div>
                                <div class="ss_t_l" flex="cross:center" style="margin-left: 0.5rem">
                                    <div class="ss_text">执行行号</div>
                                    <div class="ss_kaung" style="width: 4rem">{{ item.RunLine }}</div>
                                </div>
                            </div>
                            <div class="ss_content_bottom" flex>
                                <div class="ss_b_li">X：{{ item.RelX }}</div>
                                <div class="ss_b_li">Y：{{ item.RelY }}</div>
                                <div class="ss_b_li">Z：{{ item.RelZ }}</div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <el-dialog
            :title="roomName"
            :visible.sync="dialogTableVisible3d"
            @close="handleClose3d"
            width="1160px"
            height="700px"
            class="tanTable1"
        >
            <div style="overflow: hidden">
                <iframe :src="iframeValue" style="width: 1160px; height: 700px" frameborder="0"></iframe>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { TokenKeys } from '@/utils/variable';
import domainsFuc from '@/api/domains';
import { get_number_ave_time, query_device_room } from '../../api/api';
import titleCheck from './component/titleCheck.vue';
import { getTime, time_to_sec, yestodayTimeFun, sortByKey } from '../../utils/index';
import compLogo from './component/compLogo.vue';
import '../common/loginStatus';
export default {
    components: { compLogo, titleCheck },
    data() {
        return {
            num: 0,
            comp_id: 0,
            checkNum: 6,
            zheXianArr: [],
            loading: false,
            zhanweiColor: true,
            dateValue: '',
            begintime: '',
            endtime: '',
            focus: true,
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
            statusColorbg: {
                '-1': 'lxbg',
                0: 'fwbg',
                1: 'tzbg',
                2: 'yxbg',
                3: 'ztbg',
                99: 'sdbg',
                4: 'sdbg',
                5: 'sdbg',
                6: 'sdbg',
                7: 'sdbg',
                8: 'sdbg',
                9: 'sdbg',
                10: 'sdbg',
                11: 'sdbg'
            },

            socket: '',
            SearchValue: '',
            weicha: true,
            arr1: [],
            checkedLiXian: false,
            allCheJian: '',
            cheJianHao: [],
            domainsUrl: '',
            wses: '',
            dialogTableVisible3d: false,
            iframeValue: '',
            roomName: '',
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.domainsUrl = domainsFuc(TokenKeys.PRODUCT_ENV).domain;
        if (this.domainsUrl.substr(0, 21) == 'http://202.202.202.10') {
            // 赛豪私有
            this.wses = 'ws://202.202.202.10:9222';
        } else if (this.domainsUrl.substr(0, 21) == 'http://192.168.0.216:') {
            // 精诚私有
            this.wses = 'ws://192.168.0.216:9222';
        } else {
            // 正式
            this.wses = 'wss://data.wfjar.com:9222';
        }

        this.comp_id = Number(localStorage.getItem('comp_id'));
        this.comp_name1 = Number(localStorage.getItem('comp_name1'));
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
        window.onresize = function () {
            resizeFont();
        };
    },
    methods: {
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
                // console.log('数据发送中...', 'b-1&' + this.comp_name1);
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

        chooseSearch() {
            // console.log(this.SearchValue, 'this.SearchValue111');
            // console.log(this.allCheJian, 'this.allCheJian222');
            let arr1 = [];
            let arr2 = [];
            if (this.SearchValue == '' && this.allCheJian == '') {
                this.weicha = true;
            } else if (this.SearchValue == '' && this.allCheJian) {
                this.weicha = false;
                for (let i = 0; i < this.zheXianArr.length; i++) {
                    if (this.zheXianArr[i].Room == this.allCheJian) {
                        arr1.push(this.zheXianArr[i]);
                    }
                }
            } else if (this.SearchValue && this.allCheJian == '') {
                this.weicha = false;
                for (let i = 0; i < this.zheXianArr.length; i++) {
                    if (this.zheXianArr[i].Device == this.SearchValue) {
                        arr1.push(this.zheXianArr[i]);
                    }
                }
            } else if (this.SearchValue && this.allCheJian) {
                this.weicha = false;
                for (let i = 0; i < this.zheXianArr.length; i++) {
                    if (this.zheXianArr[i].Room == this.allCheJian) {
                        arr2.push(this.zheXianArr[i]);
                    }
                }
                for (let j = 0; j < arr2.length; j++) {
                    if (arr2[j].Device == Number(this.SearchValue)) {
                        arr1.push(arr2[j]);
                    }
                }
            }

            this.arr1 = arr1;
        },
        changeSearch() {
            // this.weicha = true;
        },

        yincangLiXian() {
            this.arr1 = [];
            if (this.checkedLiXian) {
                this.weicha = false;
                for (let i = 0; i < this.zheXianArr.length; i++) {
                    if (this.zheXianArr[i].RunStatus != -1) {
                        this.arr1.push(this.zheXianArr[i]);
                    }
                }
            } else {
                this.weicha = true;
                this.arr1 = this.zheXianArr;
            }
        },
        selectChange() {
            console.log(this.allCheJian);
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
        threeD(row) {
            if (row.RunStatus == -1) {
                return;
            }
            // this.iframeValue = 'https://tool.wfjar.com:9997?id=' + row.device_id + '&cpid=' + this.comp_id;
            this.iframeValue = 'https://gl.moldcube.com/index_2.html?id=' + row.DeviceID + '&cpid=' + this.comp_id;
            this.roomName = row.Room + '-' + row.DeviceName + '#';
            this.dialogTableVisible3d = true;
        },
        handleClose3d() {
            this.dialogTableVisible3d = false;
            this.iframeValue = '';
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
    destroyed() {},
    activated() {}
};
</script>
<style lang='scss'>
.allStatusClass .el-select .el-input__inner {
    width: 1.62rem;
}
.allStatusClass_2 .el-select .el-input__inner {
    background: #3d9aff;
}
</style>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.detailBing {
    min-width: 1160px;
}
.statisticalBody .statusss ul li {
    width: 32.3%;
    height: 3.2rem;
}
.statisticalBody .statusss ul li .statusLi .ss_content_top .ss_c_t {
    width: 50%;
    padding-right: 1rem;
}
.statisticalBody .statusss ul li .ss_topTitle .ss_topTitle_right {
    cursor: pointer;
}
.chooseBtn {
    background: #3d9aff 100% no-repeat;
    color: #fff;
}
</style>