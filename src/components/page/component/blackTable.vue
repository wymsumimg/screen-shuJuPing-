<template>
    <div>
        <div class="itClass blackTableBox">
            <div class="black_head">
                <ul flex="main:justify">
                    <li>{{ $t('menu.ranking') }}</li>
                    <li>{{ $t('menu.equipment') }}</li>
                    <li>{{ $t('menu.runOf') }}</li>
                    <li>{{ $t('menu.stopProportion') }}</li>
                </ul>
            </div>
            <div class="black_body" @mouseenter="mouseEnter" @mouseleave="mouseleave">
                <el-carousel
                    direction="vertical"
                    :autoplay="autoplay"
                    :interval="5000"
                    height="4.8rem"
                    :loop="true"
                    v-if="tableData.length > 0"
                >
                    <el-carousel-item v-for="(items, indexs) in tableData" :key="indexs">
                        <ul v-for="(item, index) in items" :key="index">
                            <!-- :style="{'background':index% 2==0?'#424B72':'#242C4A'}" -->
                            <li flex :class="[index % 2 == 0 ? 'btTrue' : 'btFalse']">
                                <div flex="main:center cross:center">
                                    <span v-if="item.index + 1 == 1" class="circleTop circleTop1 top1">{{ item.index + 1 }} </span>
                                    <span v-else-if="item.index + 1 == 2" class="circleTop circleTop2 top1">{{ item.index + 1 }} </span>
                                    <span v-else-if="item.index + 1 == 3" class="circleTop circleTop3 top1">{{ item.index + 1 }} </span>
                                    <span v-else class="circleTop">{{ item.index + 1 }} </span>
                                </div>
                                <div>
                                    <span v-if="item.index + 1 == 1 || item.index + 1 == 2 || item.index + 1 == 3" class="top3"
                                        >{{ item.Room }}-{{ item.Name }}#</span
                                    >

                                    <span v-else class="zi">{{ item.Room }}-{{ item.Name }}#</span>
                                </div>
                                <div>
                                    <span v-if="item.index + 1 == 1 || item.index + 1 == 2 || item.index + 1 == 3" class="top3"
                                        >{{ (item.RunPercent * 100).toFixed(0) + '%' }}
                                    </span>
                                    <span v-else class="zi">{{ (item.RunPercent * 100).toFixed(0) + '%' }} </span>
                                </div>
                                <div>
                                    <span v-if="item.index + 1 == 1 || item.index + 1 == 2 || item.index + 1 == 3" class="top3">{{
                                        ((item.StopPercent * 100).toFixed(0) + '%') | noValue
                                    }}</span>

                                    <span v-else class="zi">{{ ((item.StopPercent * 100).toFixed(0) + '%') | noValue }}</span>
                                </div>
                            </li>
                        </ul>
                    </el-carousel-item>
                </el-carousel>
                <el-carousel direction="vertical" :autoplay="autoplay" :interval="5000" height="4.8rem" :loop="true" v-else>
                    <span class="noData" flex="main:center cross:center">{{ $t('menu.gaoxiaoruning') }}</span>
                </el-carousel>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {};
    },
    props: {
        tableData: {
            type: Array
        },
        autoplay: {
            type: Boolean
        }
    },
    computed: {},
    watch: {},
    methods: {
        mouseEnter() {
            // this.autoplay=false
            this.$emit('autoFnFalse', this.autoplay);
        },
        mouseleave() {
            // this.autoplay=true
            this.$emit('autoFnTrue', this.autoplay);
        },
        // tableRowClassName({ row, rowIndex }) {
        //     if (rowIndex % 2 == 1) {
        //         return 'warning-row';
        //     } else {
        //         return 'success-row';
        //     }
        // },
        headerStyle({ row, column, rowIndex, columnIndex }) {
            return 'tableStyle';
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
        // height: 0.48rem;
    }
    .liXianBody {
        // height: 0.46rem;
    }
    .lixian_w {
        width: 25%;
    }
}
.black_head {
    width: 100%;
    ul {
        // height: 0.5rem;
        line-height: 0.5rem;
        li {
            width: 25%;
            font-size: 0.18rem;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #7785b9;
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
            // width: 25%;
            font-size: 0.16rem;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #ffffff;
            text-align: center;
            div {
                width: 100%;
                text-align: center;
            }
        }
    }
}
</style>