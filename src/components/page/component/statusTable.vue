<template>
    <div class="">
        <div
            class="autoScoll_one"
            style="100%;overflow-y:hidden;"
            :class="[chaoshi == 4 ? 'borderBott' : '']"
            :style="{
                height: tableHeight + 'rem',
                marginTop: chaoshi < 4 ? '0' : '0.16rem'
            }"
        >
            <div v-if="showTitle == true" class="autoScoll_title" :class="chaoshi < 4 ? 'autoScoll_titleBlue' : 'autoScoll_titleRed'">
                {{ twoRoomTitle1 }} <span class="chaoChu" v-show="chaoshi == 4"> ({{$t('menu.moreBanhour')}})</span>
                <span class="chaoChu" v-show="chaoshi == 3"> ({{$t('menu.shishi')}})</span>
            </div>
            <div :class="[chaoshi == 4 ? 'borderthree' : '']" class="martop">
                <div class="autoScollHead" flex="main:center cross:center">
                    <div v-for="(item, index) in twoRoomHearder1" :key="index" class="autoScollHead_w color_pink">
                        {{ item }}
                    </div>
                </div>
                <div>
                    <div style="color: #fff" @mouseenter="mouseEnter" @mouseleave="mouseleave">
                        <el-carousel
                            direction="vertical"
                            :autoplay="autoplay"
                            :interval="5000"
                            :height="tableHeight - 0.9 + 'rem'"
                            :loop="true"
                            v-if="twoRoom1.length > 0"
                        >
                            <el-carousel-item v-for="(items, indexs) in twoRoom1" :key="indexs">
                                <div v-for="(item, index) in items" :key="index">
                                    <!-- :class="[index% 2==0?'btTrue':'btFalse']" -->
                                    <div
                                        class="autoScollBody"
                                        v-show="chaoshi < 4"
                                        flex="main:center cross:center"
                                        :class="[index % 2 == 0 ? 'btTrue' : 'btFalse']"
                                        :style="{ height: chaoshi < 4 ? '0.43rem' : '0.47rem' }"
                                    >
                                        <div class="autoScollHead_w asB white" v-show="chaoshi == 1 || chaoshi == 2 || chaoshi == 3">
                                            {{ item.Room }}-{{ item.Name }}#
                                        </div>
                                        <div class="autoScollHead_w asB" v-show="chaoshi == 3 && threeTure">
                                            {{ item.BeginTime ? item.BeginTime.split(' ')[1] : '00:00:00' | noValue }}
                                        </div>
                                        <div class="autoScollHead_w asB" v-show="chaoshi == 1">
                                            {{ item.RunTime |times | noValue }}
                                        </div>
                                        <div class="autoScollHead_w asB" v-show="chaoshi == 2">
                                            {{ item.StopTime|times | noValue }}
                                        </div>
                                        <div class="autoScollHead_w asB" v-show="chaoshi == 3">{{ item.TotalSecond|times | noValue }}</div>
                                        <div
                                            class="autoScollHead_w asB"
                                            v-show="chaoshi == 1"
                                            :class="[
                                                comp_id == 1
                                                    ? item.RunPercent*100 < 30
                                                        ? 'redClass'
                                                        : 'whiteClass'
                                                    : item.RunPercent*100 < 60
                                                    ? 'redClass'
                                                    : 'whiteClass'
                                            ]"
                                        >
                                            <div flex="cross:center" v-if="login_staus > 2">
                                                <div
                                                    class="zhanbiBox"
                                                    :class="[
                                                        comp_id == 1
                                                            ? item.RunPercent*100 < 30
                                                                ? 'redClassBg'
                                                                : 'whiteClassBg'
                                                            : item.RunPercent*100 < 60
                                                            ? 'redClassBg'
                                                            : 'whiteClassBg'
                                                    ]"
                                                >
                                                    <div
                                                        class="zhanboSon"
                                                        :style="{ width: item.RunPercent*100 + '%' }"
                                                        :class="[
                                                            comp_id == 1
                                                                ? item.RunPercent*100 < 30
                                                                    ? 'redClassBgSon'
                                                                    : 'whiteClassBgSon'
                                                                : item.RunPercent*100 < 60
                                                                ? 'redClassBgSon'
                                                                : 'whiteClassBgSon'
                                                        ]"
                                                    ></div>
                                                </div>
                                                <div>{{ (item.RunPercent*100).toFixed(0) + '%' }}</div>
                                            </div>
                                            <div v-if="login_staus <= 2">
                                                {{ (item.RunPercent*100).toFixed(0) + '%' }}
                                            </div>
                                        </div>
                                        <div
                                            class="autoScollHead_w asB"
                                            v-show="chaoshi == 2"
                                            :class="[
                                                comp_id == 1
                                                    ? item.StopPercent*100 < 30
                                                        ? 'redClass'
                                                        : 'whiteClass'
                                                    : item.StopPercent*100 < 60
                                                    ? 'redClass'
                                                    : 'whiteClass'
                                            ]"
                                        >
                                            <div v-if="login_staus > 2" flex="cross:center">
                                                <div
                                                    class="zhanbiBox"
                                                    :class="[
                                                        comp_id == 1
                                                            ? item.StopPercent*100 < 30
                                                                ? 'redClassBg'
                                                                : 'whiteClassBg'
                                                            : item.StopPercent*100 < 60
                                                            ? 'redClassBg'
                                                            : 'whiteClassBg'
                                                    ]"
                                                >
                                                    <div
                                                        class="zhanboSon"
                                                        :style="{ width: item.StopPercent*100 + '%' }"
                                                        :class="[
                                                            comp_id == 1
                                                                ? item.StopPercent*100 < 30
                                                                    ? 'redClassBgSon'
                                                                    : 'whiteClassBgSon'
                                                                : item.StopPercent*100 < 60
                                                                ? 'redClassBgSon'
                                                                : 'whiteClassBgSon'
                                                        ]"
                                                    ></div>
                                                </div>
                                                <div>{{ (item.StopPercent*100).toFixed(0) + '%' }}</div>
                                            </div>
                                            <div v-if="login_staus <= 2">
                                                {{ (item.StopPercent*100).toFixed(0) + '%' }}
                                            </div>
                                        </div>
                                        <div class="autoScollHead_w asB" v-show="chaoshi == 3" :class="colorClass(item.FeedrateOverride)">
                                            {{ item.FeedrateOverride + '%' }}
                                        </div>
                                    </div>
                                    <div
                                        class="autoScollBody"
                                        v-show="chaoshi == 4"
                                        flex="main:center cross:center"
                                        :class="[index % 2 == 0 ? 'btTrue' : 'btFalse']"
                                        :style="{ height: chaoshi < 4 ? '0.43rem' : '0.47rem' }"
                                    >
                                        <div class="autoScollHead_w asB white">{{ item.Room }}-{{ item.Name }}#</div>
                                        <div class="autoScollHead_w asB">
                                            <span :class="[$global.statusColor[item.RunTime]]">{{ $global.status[item.RunTime] }}</span>
                                        </div>
                                        <div class="autoScollHead_w asB">{{ String(item.BeginTime).split(' ')[1] | noValue }}</div>
                                        <div class="autoScollHead_w asB">{{ item.TotalSecond |times | noValue }}</div>
                                    </div>
                                </div>
                            </el-carousel-item>
                        </el-carousel>
                        <el-carousel
                            direction="vertical"
                            :autoplay="autoplay"
                            :interval="5000"
                            :height="chaoshi == 4 ? '2rem' : '3rem'"
                            :loop="true"
                            v-else
                        >
                            <span class="noData" v-show="chaoshi == 1" flex="main:center cross:center">{{$t('menu.zanwuRuning')}}</span>
                            <span class="noData" v-show="chaoshi == 2" flex="main:center cross:center">{{$t('menu.wuStop')}}</span>
                            <span class="noData" v-show="chaoshi == 3" flex="main:center cross:center">{{$t('menu.wudisu')}}</span>
                            <span class="noData" v-show="chaoshi == 4" flex="main:center cross:center">{{$t('menu.wuchaoshi')}}</span>
                        </el-carousel>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            login_staus: 0
        };
    },
    props: {
        twoRoom1: {
            type: Array
        },
        twoRoomHearder1: {
            type: Array
        },
        twoRoomTitle1: {
            type: String
        },
        autoplay: {
            type: Boolean
        },
        chaoshi: {
            type: Number,
            default: 1
        },
        threeTure: {
            type: Boolean,
            default: false
        },
        comp_id: {
            type: Number,
            default: 0
        },
        showTitle: {
            type: Boolean,
            default: true
        },
        tableHeight: {
            type: Number
        }
    },
    computed: {},
    watch: {},
    methods: {
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
        mouseEnter() {
            // this.autoplay=false
            this.$emit('autoFnFalse', this.autoplay);
        },
        mouseleave() {
            // this.autoplay=true
            this.$emit('autoFnTrue', this.autoplay);
        }
    },
    created() {},
    mounted() {
        this.login_staus = localStorage.getItem('login_staus');
    },
    beforeCreate() {},
    beforeMount() {},
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed() {},
    activated() {}
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>