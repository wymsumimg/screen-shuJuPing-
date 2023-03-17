<template>
    <div class="">
        <div class="pageChange" style="margin: 0 20px">
            <ul flex="cross:center main:center">
                <li
                    :style="{ width: item.id == 3 || item.id == 5 || item.id == 6 ? '30%' : '20%' }"
                    v-for="(item, index) in titleData"
                    :key="index"
                    :class="{ homeActived: num == item.id }"
                    @click="tabClick(item, index)"
                >
                    <button :class="{ homeActivedTxt: num == item.id }">{{ item.title }}</button>
                    <!-- {{ item.title }} -->
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    props: {
        num: {
            type: Number
        }
    },
    data() {
        return {
            // num:0,
            titleData: [
                { id: 0, title: this.$t('menu.homePage'), url: '/' },
                { id: 1, title: this.$t('menu.table'), url: '/detailPage' },
                { id: 2, title: this.$t('menu.workHome'), url: '/detailBing' },
                { id: 3, title: this.$t('menu.feedRate'), url: '/statistical' },
                { id: 4, title: this.$t('menu.statement'), url: '/report' },
                // {id:5,title:'状态上报',url:'/statusUp'},
                { id: 6, title: this.$t('menu.realtimeStatus'), url: '/statusShi' }
            ]
        };
    },
    computed: {},
    watch: {},
    methods: {
        tabClick(item) {
            this.$router.replace(item.url);
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