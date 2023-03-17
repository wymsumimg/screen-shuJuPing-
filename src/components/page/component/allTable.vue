<template>
    <div class="tableDetail">
        <el-table
            ref="filterTable"
            v-loading="loading"
            element-loading-background="transparent"
            border
            :header-cell-class-name="headerStyle"
            :cell-style="{ borderColor: tableBorder, padding: '5px 0' }"
            :header-cell-style="{ borderColor: tableBorder }"
            :row-style="{ height: '0.62rem' }"
            :data="tableData"
            class="elTabledetail"
            style="width: 100%"
            :stripe="true"
        >
            <el-table-column
                prop="room"
                :label="$t('menu.chejianhao')"
                width="100"
                align="center"
                :filter-method="filterTagCheJian"
                :filters="cheJianHao"
            >
                <slot slot-scope="scope">
                    <span class="white">
                        {{ scope.row.Room | noValue }}
                    </span>
                </slot>
            </el-table-column>
            <el-table-column prop="name" :label="$t('menu.shebeihao')" width="100" align="center" :sortable="true">
                <slot slot-scope="scope">
                    <span class="white"> {{ scope.row.Name | noValue }}# </span>
                </slot>
            </el-table-column>
            <!-- :filtered-value="[2]" -->
            <el-table-column
                width="110"
                prop="now_status"
                :label="$t('menu.realtimeStatus')"
                align="center"
                :filter-method="filterTag1"
                :filters="filtersZT"
                :filtered-value="filteredValue"
            >
                <template slot-scope="scope">
                    <span :class="[statusColor[scope.row.RunStatus]]">{{ status[scope.row.RunStatus] }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="run_times" :label="$t('menu.runningTime')" align="center" :sortable="true" :sort-method="sortByDateYX">
                <slot slot-scope="scope">
                    <span v-if="!miao">{{ scope.row.RunTime | times }}</span>
                    <span v-if="miao">
                        <span v-if="scope.row.RunTime">{{ quMiao(scope.row.RunTime) }}</span>
                        <span v-if="!scope.row.RunTime">00:00</span>
                    </span>

                    <!-- {{ scope.row.RunTime | times | noValue }} -->
                </slot>
            </el-table-column>
            <!-- <el-table-column prop="hand_times" label="手动时长" align="center">
                <slot slot-scope="scope">
                    {{ scope.row.Time_99 | times | noValue }}
                </slot>
            </el-table-column>
            <el-table-column prop="reset_times" label="复位时长" align="center">
                <slot slot-scope="scope">
                    {{ scope.row.Time_0 | times | noValue }}
                </slot>
            </el-table-column> -->
            <el-table-column
                prop="stop_times"
                :label="$t('menu.tingjishichang')"
                align="center"
                :sortable="true"
                :sort-method="sortByDateTJ"
            >
                <slot slot-scope="scope">
                    <span style="cursor: pointer" v-if="!miao" @click="getmingxi1(scope.row, flagName)">{{
                        scope.row.StopTime | times
                    }}</span>
                    <span v-if="miao">
                        <span style="cursor: pointer" v-if="scope.row.StopTime" @click="getmingxi1(scope.row, flagName)">{{
                            quMiao(scope.row.StopTime)
                        }}</span>
                        <span style="cursor: pointer" v-if="!scope.row.StopTime">00:00</span>
                    </span>
                </slot>
            </el-table-column>
            <!-- <el-table-column prop="etc_times" label="暂停时长" align="center">
                <slot slot-scope="scope">
                    <span>{{ scope.row.Time_3 | times | noValue }}</span>
                </slot>
            </el-table-column> -->
            <el-table-column prop="etc_times" :label="$t('menu.lixianshichang')" align="center" :sortable="true" :sort-method="sortByDate">
                <slot slot-scope="scope">
                    {{ scope.row.OfflineTime | times | noValue }}
                </slot>
            </el-table-column>

            <el-table-column prop="etc_times" :label="$t('menu.feedRate')" align="center">
                <slot slot-scope="scope">
                    <!-- {{ scope.row.FeedrateOverride | 0 }}% -->
                    <span v-show="scope.row.FeedrateOverride > 100" :style="{ color: '#E63A3F' }"> {{ scope.row.FeedrateOverride }}% </span>
                    <span v-show="scope.row.FeedrateOverride < 100" :style="{ color: '#44c881' }"> {{ scope.row.FeedrateOverride }}% </span>
                    <span v-show="scope.row.FeedrateOverride == 100"> {{ scope.row.FeedrateOverride }}% </span>
                </slot>
            </el-table-column>
            <el-table-column prop="etc_times" :label="$t('menu.daojubianhao')" align="center">
                <slot slot-scope="scope">
                    {{ scope.row.CutterCode | noValue }}
                </slot>
            </el-table-column>
            <el-table-column prop="etc_times" :label="$t('menu.daojuzhijing')" align="center">
                <slot slot-scope="scope">
                    {{ scope.row.CutterDiameter | noValue }}
                </slot>
            </el-table-column>
            <el-table-column prop="etc_times" :label="$t('menu.daojuchichun')" align="center">
                <slot slot-scope="scope">
                    {{ scope.row.CutterSize | noValue }}
                </slot>
            </el-table-column>
            <el-table-column prop="etc_times" :label="$t('menu.chengxuming')" align="center">
                <slot slot-scope="scope">
                    <el-tooltip :content="scope.row.Program | noValue" placement="top">
                        <span class="chengxuxz cxwidth">{{ scope.row.Program | noValue }}</span>
                    </el-tooltip>
                </slot>
            </el-table-column>
            <!-- <el-table-column prop="etc_times" :label="$t('menu.dianya')" align="center">
                <slot slot-scope="scope">
                    <el-tooltip :content="scope.row.Program | noValue" placement="top">
                        <span class="chengxuxz cxwidth">{{ scope.row.Program | noValue }}</span>
                    </el-tooltip>
                </slot>
            </el-table-column> -->
            <el-table-column
                prop="runbi"
                :label="$t('menu.runOf')"
                align="center"
                :filter-method="filterTag2"
                :filters="[
                    { text: '>60%', value: 1 },
                    { text: '<60%', value: 0 }
                ]"
            >
                <slot slot-scope="scope">
                    <div>
                        <span :class="scope.row.RunPercent * 100 < 60 ? 'rbRed' : 'rbWhite'"
                            >{{ (scope.row.RunPercent * 100).toFixed(0) }}%</span
                        >
                    </div>
                </slot>
            </el-table-column>
            <el-table-column prop="etc_times" :label="$t('menu.caozuo')" align="center" v-if="showMX">
                <slot slot-scope="scope">
                    <div flex="main:center cross:center">
                        <div @click="mingxi(scope.row, 1)" style="cursor: pointer; width: 60px; text-align: center">
                            {{ $t('menu.mingxi') }}
                        </div>
                        <div
                            v-show="comp_id <= 2"
                            @click="threeD(scope.row)"
                            :class="scope.row.RunStatus == -1 ? 'nsFray' : 'nsWhite'"
                            style="cursor: pointer; width: 60px; text-align: center"
                        >
                            {{ $t('menu.luansheng') }}
                        </div>
                    </div>
                </slot>
            </el-table-column>
        </el-table>
        <mingxi
            ref="mingxiChild"
            :filtersZT="filtersZT"
            :begintime="begintime"
            :endtime="endtime"
            :statusColor="statusColor"
            :status="status"
            :miao="miao"
        ></mingxi>

        <el-dialog
            :title="roomName"
            :visible.sync="dialogTableVisible3d"
            @close="handleClose3d"
            width="1320px"
            height="720px"
            class="tanTable1"
        >
            <div style="overflow: hidden">
                <iframe :src="iframeValue" style="width: 1280px; height: 720px" frameborder="0"></iframe>
            </div>
        </el-dialog>
    </div>
</template>

<script>
let Base64 = require('js-base64').Base64;
import { time_to_sec, times } from '../../../utils/index';

import mingxi from '../../page/component/mingxi.vue';

export default {
    components: {
        mingxi
    },
    data() {
        return {
            tableBorder: '#424B72',
            dialogTableVisible3d: false,
            dialogTableVisible: false,

            iframeValue: '',
            roomName: '',

            zhanweiBg: '',

            arrShuaxuan: [],
            flagName: 2
        };
    },
    props: {
        tableData: {
            type: Array
        },
        cheJianHao: {
            type: Array
        },
        loading: {
            type: Boolean
        },
        comp_id: {
            type: Number
        },
        filtersZT: {
            type: Array
        },
        statusColor: {
            type: Object
        },
        status: {
            type: Object
        },
        begintime: {
            type: String
        },
        endtime: {
            type: String
        },
        moremStartTime: {
            type: String
        },
        moremEndTime: {
            type: String
        },
        filteredValue: {
            type: Array,
            default: []
        },
        showMX: {
            type: Boolean
        },
        miao: {
            type: Boolean
        }
    },
    created() {
        // console.log(this.filteredValue, '11111111111');
    },
    mounted() {
        // this.miao = Boolean(localStorage.getItem('getMiao')) ? Boolean(localStorage.getItem('getMiao')) : this.miao;
        
    },

    methods: {
        mingxi(row, name) {
            this.$refs.mingxiChild.mingxi(row, name);
        },
        quMiao(hms) {
            if (hms && hms > 0) {
                hms = times(hms);
                // hms = '7天06:12:26';
                // console.log(hms.split(':')[0] + ':' + hms.split(':')[1], '-----hms');
                return hms.split(':')[0] + ':' + hms.split(':')[1];
            } else {
                return '00:00';
            }
        },
        sortByDate(obj1, obj2) {
            let val1 = Number(obj1.OfflineTime);
            let val2 = Number(obj2.OfflineTime);
            return val1 - val2;
        },
        sortByDateYX(obj1, obj2) {
            let val1 = Number(obj1.RunTime);
            let val2 = Number(obj2.RunTime);
            return val1 - val2;
        },
        sortByDateTJ(obj1, obj2) {
            let val1 = Number(obj1.StopTime);
            let val2 = Number(obj2.StopTime);
            return val1 - val2;
        },

        filterTag1(value, row) {
            return row['RunStatus'] == value;
        },
        filterTagCheJian(value, row) {
            return row['Room'] == value;
        },
        filterTag2(value, row) {
            if (value == 1) {
                return row['RunPercent'] * 100 > 60;
            } else {
                return row['RunPercent'] * 100 <= 60;
            }
        },
        headerStyle({ row, column, rowIndex, columnIndex }) {
            return 'tableStyle';
        },

        getmingxi1(row) {
            console.log(row, 'row---');
            // document.getElementsByClassName('.mingxiBox .el-table__column-filter-trigger').style.background = 'transparent';
            let filterObj = {
                RunStatus: [-1, 0, 1, 3, 5, 6, 99]
            };
            // this.rowMX = row;
            // this.filterChange(filterObj);
            this.$refs.mingxiChild.filterChange(filterObj, row);
        },

        threeD(row) {
            if (row.RunStatus == -1) {
                return;
            }
            // this.iframeValue = 'https://tool.wfjar.com:9997?id=' + row.device_id + '&cpid=' + this.comp_id;
            this.iframeValue = 'https://gl.moldcube.com?id=' + row.Device_id + '&cpid=' + this.comp_id;

            this.dialogTableVisible3d = true;
        },
        handleClose3d() {
            this.dialogTableVisible3d = false;
            this.iframeValue = '';
        },

        HexToString(str) {
            if (str.length % 2 != 0) {
                this.$message.error(this.$t('menu.bixuweioushu'));
                return '';
            }
            let num;
            let arr = [];
            for (var i = 0; i < str.length; i = i + 2) {
                num = parseInt(str.substr(i, 2), 16);
                arr.push(String.fromCharCode(num));
            }
            return arr.join('');
        }
    },
    mounted() {
        if (localStorage.getItem('login_staus') == 1) {
            this.tableBorder = '#424B72';
            this.zhanweiBg = '#242C4A';
        } else if (localStorage.getItem('login_staus') == 2) {
            this.tableBorder = '#2B3B5C';
            this.zhanweiBg = '#242C4A';
        } else {
            this.tableBorder = '#ccc';
            this.zhanweiBg = '#fff';
        }
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
<style lang='scss' >
//@import url(); 引入公共css类
.mingxiBox .el-table__column-filter-trigger {
    // display: none;
}
</style>