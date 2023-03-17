<template>
    <div class="">
        <!-- 这是时间组建 -->
        <el-date-picker
            @change="changeDate"
            v-model="dateValue"
            type="datetimerange"
            range-separator="-"
            :start-placeholder="$t('menu.kaishiriqi')"
            :end-placeholder="$t('menu.jieshuriqi')"
            value-format="yyyy-MM-dd HH:mm:ss"
        >
        </el-date-picker>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            begintime: '',
            endtime: ''
        };
    },
    props: {
        dateValue: {
            type: Array
        }
    },
    computed: {
        // dateValue:function(){
        //     return dateValue
        // }
    },
    watch: {},
    methods: {
        changeDate() {
            if (this.dateValue) {
                this.begintime = this.dateValue[0];
                this.endtime = this.dateValue[1];
                let endTime1 = this.endtime.split(' ');
                let begintime1 = this.begintime.split(' ');
                if (endTime1[1] == '00:00:00' && begintime1[0] != endTime1[0]) {
                    var datetime = new Date(this.endtime);
                    datetime.setSeconds(datetime.getSeconds() - 1);
                    var year = datetime.getFullYear();
                    var month = datetime.getMonth() + 1 < 10 ? '0' + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
                    var date = datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate();
                    var hour = datetime.getHours() < 10 ? '0' + datetime.getHours() : datetime.getHours();
                    var minute = datetime.getMinutes() < 10 ? '0' + datetime.getMinutes() : datetime.getMinutes();
                    var second = datetime.getSeconds() < 10 ? '0' + datetime.getSeconds() : datetime.getSeconds();
                    // console.log(year + "-" + month + "-" + date+" "+hour+":"+minute+":"+second,"22222222222");
                    this.endtime = year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
                } else if (this.begintime == this.endtime) {
                    this.endtime = endTime1[0] + ' 23:59:59';
                    this.dateValue[1] = this.endtime;
                }
            } else {
            }

            this.$emit('childFn', this.dateValue, this.begintime, this.endtime);
            let obj = {
                dateValue: this.dateValue,
                begintime: this.begintime,
                endtime: this.endtime
            };
            this.$store.commit('SET_DATEINFO', obj);
        }
    },
    created() {
        // this.dateValue=this.dateValue
        // this.begintime=this.dateValue[0]
        // this.endtime=this.dateValue[1]
    },
    mounted() {
        this.begintime = this.dateValue[0];
        this.endtime = this.dateValue[1];
        this.$emit('childFn', this.dateValue, this.begintime, this.endtime);
        let obj = {
            dateValue: this.dateValue,
            begintime: this.begintime,
            endtime: this.endtime
        };
        this.$store.commit('SET_DATEINFO', obj);

        let dateInfo = this.$store.state.dateInfo;
        this.dateValue = dateInfo.dateValue;
        this.begintime = dateInfo.begintime;
        this.endtime = dateInfo.endtime;
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