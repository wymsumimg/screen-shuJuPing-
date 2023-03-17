<template>
    <div class="">
        <div class="currentFixed">
            <!-- <div>刷新时间：{{ currentTime.split(' ')[1] }}</div> -->
            <div>
                {{$t('menu.refreshCountdown')}}：<span class="miao">{{ num }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'titleTime',
    components: {},
    data() {
        return {};
    },
    props: {
        currentTime: {
            type: String
        },
        num: {
            type: Number
        }
    },
    computed: {},
    watch: {},
    methods: {},
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