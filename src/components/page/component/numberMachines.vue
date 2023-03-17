<template>
    <div class="">
        <!-- 2运行   99手动  0复位  1停机  3暂停  -1离线 -->
        <div class="b_left_top" :class="{ activeAllBg: allBg }" flex="cross:center main:center" v-if="nm==1">
            <ul flex="cross:center main:center">
                <li @click="clickjiqiArr()">
                    <div class="numTai">
                        <span>
                            {{ allNum }} </span
                        >{{$t('menu.tai')}}
                    </div>
                    <div class="jiAllNum">{{$t('menu.totalNumberMachines')}}</div>
                </li>
                <li v-for="(item, index) in jiqiArr" :key="index" @click="clickjiqi(item)">
                    <div class="numTai">
                        <span>
                            {{ item.count }} </span
                        >{{$t('menu.tai')}}
                    </div>
                    <div class="jiAllNum">
                        {{ item.label }}
                    </div>
                </li>
            </ul>
        </div>

        <div class="bl3_she_t_body" v-if="nm==2">
            <ul flex flex-wrap>
                <li flex="cross:center main:center" v-for="(item, index) in jiqiArr" :key="index" @click="clickjiqi(item)">
                    <div>
                        <img :src="require('../../common/comImg/index/a' + (index + 1) + '.png')" alt="" />
                    </div>
                    <div flex="dir:top">
                        <span class="yun_t">
                            {{ item.label }}
                        </span>
                        <span class="yun_num"> {{ item.count }} <span class="yun_tai">{{$t('menu.tai')}}</span> </span>
                    </div>
                </li>
            </ul>
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
        jiqiArr: {
            type: Array
        },
        allNum: {
            type: Number
        },
        allBg: {
            type: Boolean,
            default: false
        },
        nm:{
            type:Number
        }
    },
    computed: {},
    watch: {},
    methods: {
        clickjiqi(item) {
            this.$emit('jiqic', item.runstatus);
        },
        clickjiqiArr() {
            this.$emit('jiqiArrc', []);
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
.b_left_top {
    // background-color: #242C4A;
    height: 0.92rem;
    ul {
        width: 100%;

        li {
            width: 14%;
            height: 100%;
            color: #fff;
            text-align: center;

            .numTai {
                font-size: 0.16rem;
                span {
                    font-size: 0.3rem;
                }
            }
            .jiAllNum {
                font-size: 0.14rem;
                font-weight: 400;
            }
        }
        li:last-child {
            border-right: none;
        }
    }
}
</style>