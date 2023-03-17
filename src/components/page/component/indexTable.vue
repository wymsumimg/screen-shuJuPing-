<template>
    <div class="chejianYunxing">
        <div class="chejianYunxing_top">
            {{ $t('menu.totalOperatingStatistics') }}<span style="font-size: 0.1rem">&nbsp;&nbsp;{{ $t('menu.unitHour') }}</span>
        </div>
        <div class="chejianYunxing_table">
            <div class="indexTable" :class="{ padd: itClassPadd }" style="height: 1.87rem">
                <el-table
                    :header-cell-class-name="headerStyle"
                    :cell-style="{ borderColor: 'none', padding: '5px 0' }"
                    :header-cell-style="{ borderColor: 'none' }"
                    :row-style="{ height: '0.48rem' }"
                    :data="tableData"
                    style="width: 100%"
                    class="elTable"
                    :row-class-name="tableRowClassName"
                >
                    <el-table-column prop="date" :label="$t('menu.serialNumber')" width="60" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.$index + 1 }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" :label="$t('menu.runningStatus')" align="center">
                        <template slot-scope="scope">
                            <span class="lixianColor" v-show="scope.row.runstatus == -1">{{ $t('menu.equipmentOffline') }}</span>
                            <span class="yunxingColor" v-show="scope.row.runstatus == 2">{{ $t('menu.runningTime') }}</span>
                            <span class="stopColor" v-show="scope.row.runstatus == 100">{{ $t('menu.stopTime') }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="timelengths" :label="$t('menu.runningTime')" align="center">
                        <slot slot-scope="scope">
                            <span v-if="scope.row.RunTime >= 0">{{ (Number(scope.row.RunTime) / 3600).toFixed(1) }}</span>
                            <span v-else>0</span>
                        </slot>
                    </el-table-column>
                    <el-table-column prop="bfb" :label="$t('menu.totalPercentage')" align="center" width="180">
                        <slot slot-scope="scope">
                            <span class="zongliangColor"
                                >{{ scope.row.RunPercent == 'NaN' ? 0 : (scope.row.RunPercent * 100).toFixed(2) }}%</span
                            >
                        </slot>
                    </el-table-column>
                </el-table>
            </div>
            <div class="baifen" style="padding: 0 0.3rem" flex="main:justify cross:center">
                <div v-for="(item, index) in tableData" :key="index" style="text-align: center">
                    <el-progress
                        type="circle"
                        :width="65"
                        :stroke-width="9"
                        :color="oneFixSixArrColor[item.runstatus]"
                        :percentage="item.RunPercent == 'NaN' ? 0 : Number((item.RunPercent * 100).toFixed(2))"
                    ></el-progress>
                    <div class="zhanbiText">{{ threeBox[item.runstatus] }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    props: {
        tableData: {
            type: Array
        },
        itClassPadd: {
            type: Boolean
        },
        threeBox: {
            type: Object
        },
        oneFixSixArrColor: {
            type: Object
        }
    },
    computed: {},
    watch: {},
    methods: {
        tableRowClassName({ row, rowIndex }) {
            if (rowIndex % 2 == 1) {
                return 'warning-row';
            } else {
                return 'success-row';
            }
        },
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
.padd {
    padding: 0 0.2rem;
}
</style>
<style lang='scss'>
</style>