<template>
    <div>
        <div class="workShopOperation" style="height: 7.3rem">
            <div class="black_head">
                <ul flex="main:justify">
                    <li>{{$t('menu.equipment')}}</li>
                    <li>{{$t('menu.realtimeStatus')}}</li>

                    <li>{{$t('menu.runningTime')}}</li>
                    <li>{{$t('menu.yunxingbaifen')}}</li>
                    <!-- <li>主轴倍率</li>
                <li>进给倍率</li> -->
                </ul>
            </div>
            <div class="black_body" @mouseenter="mouseEnter" @mouseleave="mouseleave">
                <el-carousel
                    direction="vertical"
                    :autoplay="autoplay"
                    :interval="5000"
                    height="6.6rem"
                    :loop="true"
                    v-if="chejianList.length > 0"
                >
                    <el-carousel-item v-for="(items, indexs) in chejianList" :key="indexs">
                        <ul v-for="(item, index) in items" :key="index">
                            <li flex :class="[index % 2 == 0 ? 'btTrue' : 'btFalse']">
                                <div>
                                    <span class="rsColor">{{ item.Room }}-{{ item.Name }}#</span>
                                </div>
                                <div>
                                    <span :class="[statusColor[item.RunStatus]]">{{ status[item.RunStatus] }}</span>
                                </div>
                                <div class="zier">
                                    <!-- <span v-if="parseInt(item.RunTime / 86400) > 0">{{ parseInt(item.RunTime / 86400) }}天</span> -->
                                    {{ item.RunTime |times | noValue }}
                                </div>
                                <div class="zier">
                                    <span
                                        :class="[
                                            comp_id == 1
                                                ? item.RunPercent * 100 < 30
                                                    ? 'red'
                                                    : 'zier'
                                                : item.RunPercent * 100 < 60
                                                ? 'red'
                                                : 'zier'
                                        ]"
                                        >{{ (item.RunPercent * 100).toFixed(0) }}%</span
                                    >
                                </div>
                            </li>
                        </ul>
                    </el-carousel-item>
                </el-carousel>
                <el-carousel direction="vertical" :autoplay="autoplay" :interval="5000" height="6.6rem" :loop="true" v-else>
                    <span class="noData" flex="main:center cross:center">{{$t('menu.zanwu')}}</span>
                </el-carousel>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            status: {
                '-1': this.$t('menu.lixian'),
                0: this.$t('menu.fuwei'),
                1: this.$t('menu.tingzhi'),
                2: this.$t('menu.yunxing'),
                3: this.$t('menu.zanting'),
                99: this.$t('menu.shoudong'),
                4: this.$t('menu.kaiji'),
                5: this.$t('menu.huiyuandian'),
                6: this.$t('menu.yure'),
                7: this.$t('menu.lashuiping'),
                8: this.$t('menu.dabiaofenzhong'),
                9: this.$t('menu.huandaoduidao'),
                10: this.$t('menu.huanchengxu'),
                11: this.$t('menu.jiancha')
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
            }
        };
    },
    props: {
        chejianList: {
            type: Array
        },
        autoplay: {
            type: Boolean
        },
        comp_id: {
            type: Number,
            default: 0
        }
    },
    computed: {},
    watch: {},
    methods: {
        mouseEnter() {
            // this.autoplay=false
            this.$emit('workautoFnFalse', this.autoplay);
        },
        mouseleave() {
            // this.autoplay=true
            this.$emit('workautoFnTrue', this.autoplay);
        }
    },
    created() {},
    mounted() {},
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
<style lang='scss'>
</style>
<style lang='scss' scoped>
.lixianOne {
    background-image: url('../../common/comImg/index/lixianbg.png');
    margin-top: 0.2rem;

    .blackLixian {
        height: 0.48rem;
    }
    .liXianBody {
        height: 0.46rem;
    }
    .lixian_w {
        width: 25%;
    }
}
.black_head {
    width: 100%;
    ul {
        height: 0.5rem;
        line-height: 0.5rem;
        li {
            width: 25%;
            font-size: 0.18rem;
            font-family: Microsoft YaHei;
            font-weight: 400;
            text-align: center;
        }
    }
}
.black_body {
    ul {
        width: 100%;
        height: 0.48rem;
        line-height: 0.5rem;

        li {
            height: 0.5rem;
            // width: 25%;
            font-size: 0.16rem;
            font-family: Microsoft YaHei;
            font-weight: 400;
            // color: #ffffff;
            text-align: center;
            div {
                width: 100%;
                text-align: center;
            }
        }
    }
}
</style>