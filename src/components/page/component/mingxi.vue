<template>
    <div class="">
        <div class="mingxiBox">
            <el-dialog
                :title="roomName"
                v-if="dialogTableVisible"
                :visible.sync="dialogTableVisible"
                @close="handleClose"
                width="95%"
                class="tanTable tableTan"
                :modal="false"
            >
                <el-table
                    :data="gridData"
                    border
                    :header-cell-class-name="headerStyleDia"
                    v-loading="loadingMX"
                    element-loading-background="transparent"
                    :row-class-name="tableRowClassName"
                    @filter-change="filterChange"
                    @sort-change="sortTableFun"
                >
                    <el-table-column property="date" :label="$t('menu.serialNumber')" align="center" width="60">
                        <slot slot-scope="scope">
                            <span>
                                {{ (paramsMX.PageIndex - 1) * paramsMX.PageSize + scope.$index + 1 }}
                            </span>
                        </slot>
                    </el-table-column>

                    <el-table-column
                        prop="name"
                        property="name"
                        :label="$t('menu.zhuangtai')"
                        align="center"
                        column-key="RunStatus"
                        :filter-method="filterTag1"
                        :filters="filtersZT"
                    >
                        <template slot-scope="scope">
                            <span :class="[statusColor[scope.row.RunStatus]]">{{ status[scope.row.RunStatus] }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column property="totalsecond2" sortable="custom" :label="$t('menu.zongshichang')" align="center">
                        <slot slot-scope="scope">
                            <!-- {{ scope.row.TotalSecond | times | noValue }} -->

                            <span v-if="!miao">{{ scope.row.TotalSecond | times | noValue }}</span>
                            <span v-if="scope.row.TotalSecond && miao">{{ quMiao(scope.row.TotalSecond) }}</span>
                        </slot>
                    </el-table-column>
                    <el-table-column property="address" :label="$t('menu.zhuzhouzhuanshu')" align="center">
                        <slot slot-scope="scope">
                            {{ scope.row.SpindleSpeed | noValue }}
                        </slot>
                    </el-table-column>
                    <el-table-column property="address" :label="$t('menu.zhuzhoubeilv')" align="center">
                        <slot slot-scope="scope">
                            <span v-show="scope.row.SpindleOverride > 100" :style="{ color: '#E63A3F' }">
                                {{ scope.row.SpindleOverride }}%
                            </span>
                            <span v-show="scope.row.SpindleOverride < 100" :style="{ color: '#44c881' }">
                                {{ scope.row.SpindleOverride }}%
                            </span>
                            <span v-show="scope.row.SpindleOverride == 100"> {{ scope.row.SpindleOverride }}% </span>
                        </slot>
                    </el-table-column>
                    <el-table-column property="address" :label="$t('menu.jingeisudu')" align="center">
                        <slot slot-scope="scope">
                            {{ scope.row.Feedrate | noValue }}
                        </slot>
                    </el-table-column>
                    <el-table-column property="FeedrateOverride" sortable="custom" :label="$t('menu.feedRate')" align="center">
                        <slot slot-scope="scope">
                            <span v-show="scope.row.FeedrateOverride > 100" :style="{ color: '#E63A3F' }">
                                {{ scope.row.FeedrateOverride }}%
                            </span>
                            <span v-show="scope.row.FeedrateOverride < 100" :style="{ color: '#44c881' }">
                                {{ scope.row.FeedrateOverride }}%
                            </span>
                            <span v-show="scope.row.FeedrateOverride == 100"> {{ scope.row.FeedrateOverride }}% </span>
                        </slot>
                    </el-table-column>
                    <el-table-column property="address" :label="$t('menu.chengxuming')" width="" align="center">
                        <slot slot-scope="scope">
                            <el-tooltip :content="scope.row.Program | noValue" placement="top">
                                <span class="chengxuxz">{{ scope.row.Program | noValue }}</span>
                            </el-tooltip>
                        </slot>
                    </el-table-column>
                    <el-table-column property="address" :label="$t('menu.daojubianhao')" width="" align="center">
                        <slot slot-scope="scope">
                            {{ scope.row.CutterCode | noValue }}
                        </slot>
                    </el-table-column>
                    <el-table-column property="address" :label="$t('menu.daojuzhijing')" width="" align="center">
                        <slot slot-scope="scope">
                            {{ scope.row.CutterDiameter | noValue }}
                        </slot>
                    </el-table-column>
                    <el-table-column property="address" :label="$t('menu.daojuchichun')" width="" align="center">
                        <slot slot-scope="scope">
                            {{ scope.row.CutterSize | noValue }}
                        </slot>
                    </el-table-column>
                    <el-table-column property="address" :label="$t('menu.startTime')" width="250" align="center">
                        <slot slot-scope="scope">
                            {{ scope.row.BeginTime | noValue }}
                        </slot>
                    </el-table-column>
                    <el-table-column property="address" :label="$t('menu.jieshushijian')" width="250" align="center">
                        <slot slot-scope="scope">
                            {{ scope.row.EndTime | noValue }}
                        </slot>
                    </el-table-column>

                    <el-table-column property="address" :label="$t('menu.zhinengheyue')" align="center">
                        <slot slot-scope="scope">
                            <!-- <span class="shenglue" >
                                {{ scope.row.linkID | noValue }}
                            </span> -->
                            <el-tooltip :content="scope.row.linkID | noValue" placement="top">
                                <i class="el-icon-document" @click="hashClick(scope.row)"></i>
                            </el-tooltip>
                        </slot>
                    </el-table-column>
                </el-table>
                <div>
                    <el-pagination
                        style="text-align: right; margin-top: 10px"
                        background
                        @size-change="handleSizeMX"
                        @current-change="handleCurrentMX"
                        :current-page="paramsMX.PageIndex"
                        :page-sizes="[50, 70, 100]"
                        :page-size="paramsMX.PageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalMX"
                    >
                    </el-pagination>
                </div>
            </el-dialog>
        </div>
        <el-dialog :title="$t('menu.zhinengchaxunjieguo')" :visible.sync="hashDio" :modal="false" width="50%">
            <div style="font-weight: 600">
                <div>{{ this.$t('menu.zhinengheyue') }}: {{ rowLinkText }}</div>
                <br />
                <div>{{ this.$t('menu.yuanshishuju') }}：</div>
                <br />
                <div>
                    {{ pageHash }}
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { Get_run_status_log, GetDeviceDetial } from '../../../api/api';
import { time_to_sec, times } from '../../../utils/index';
export default {
    components: {},
    data() {
        return {
            roomName: '',
            dialogTableVisible: false,
            gridData: [],
            loadingMX: false,
            paramsMX: {
                PageIndex: 1,
                PageSize: 50,
                orderby: 0,
                orderCol: ''

                // runStatus: []
            },
            totalMX: 0,
            hashDio: false,
            rowLinkText: '',
            pageHash: ''
        };
    },
    props: {
        filtersZT: {
            type: Array
        },
        begintime: {
            type: String
        },
        endtime: {
            type: String
        },
        statusColor: {
            type: Object
        },
        status: {
            type: Object
        },
        miao: {
            type: Boolean
        }
    },
    computed: {},
    watch: {},
    methods: {
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
        hashClick(row) {
            console.log(row, '--99');
            this.hashDio = true;
            this.rowLinkText = row.linkID;

            this.$axios
                .post('https://link.moldcube.com/', {
                    jsonrpc: '2.0',
                    id: row.ID,
                    method: 'Chain33.QueryTransaction',
                    params: [
                        {
                            hash: row.linkID
                        }
                    ]
                })
                .then((res) => {
                    let linshi = this.HexToString(res.data.result.tx.rawPayload.substr(2)).trim();
                    this.pageHash = Base64.decode(JSON.parse(linshi).data);
                });
        },
        mingxi(row, name) {
            if (name == 1) {
                this.paramsMX.runStatus = '';
            }
            this.rowMX = row;
            this.dialogTableVisible = true;
            this.loadingMX = true;
            this.paramsMX.CP_ID = localStorage.getItem('comp_id');
            this.paramsMX.BeginTime = this.begintime; //2021-09-12 00:00:00',
            console.log(this.paramsMX.BeginTime, 'this.paramsMX.BeginTime');
            this.paramsMX.EndTime = this.endtime; //'2021-09-13 00:00:00', //
            console.log(this.paramsMX.EndTime, 'this.paramsMX.EndTime');

            this.paramsMX.Device_ID = this.rowMX.Device_id ? this.rowMX.Device_id : this.rowMX.DeviceID;
            this.paramsMX.EndablePager = 1;

            // this.paramsMX.orderby = 0
            // this.paramsMX.orderCol='totalsecond2'

            // this.paramsMX.runStatus=[]
            console.log(this.paramsMX);
            GetDeviceDetial(this.paramsMX).then((res) => {
                const { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    this.gridData = Data.Data;
                    this.totalMX = Data.PageCount;
                    if (this.rowMX) {
                        this.roomName =
                            this.rowMX.Room +
                            '-' +
                            (this.rowMX.Name ? this.rowMX.Name : this.rowMX.DeviceName) +
                            `#` +
                            this.$t('menu.yunxingmingxi');
                    }
                }
                this.loadingMX = false;
            });
        },
        handleClose() {
            this.gridData = [];
            this.roomName = '';
            this.paramsMX.PageIndex = 1;
        },
        headerStyleDia({ row, column, rowIndex, columnIndex }) {
            return 'tableStyleDia';
        },
        tableRowClassName({ row, rowIndex }) {
            if (rowIndex % 2 == 1) {
                return 'warning-row';
            } else {
                return 'success-row';
            }
        },
        filterChange(filterObj, row) {
            console.log(row, filterObj.RunStatus, '传进来的row');
            if (filterObj.RunStatus.length > 0) {
                console.log('jin');
                this.paramsMX.runStatus = filterObj.RunStatus;
            } else {
                this.paramsMX.runStatus = '';
            }
            console.log(this.paramsMX.runStatus, '0099');
            this.rowMX = row;
            this.mingxi(this.rowMX);
        },
        sortTableFun(column) {
            console.log(column);
            console.log(column.prop);

            this.paramsMX.orderCol = column.prop; //该方法获取到当前列绑定的prop字段名赋值给一个变量，之后这个变量做为入参传给后端
            // this.paramsMX.orderCol='totalsecond2'
            if (column.prop) {
                //该列有绑定prop字段走这个分支
                if (column.order == 'ascending') {
                    //当用户点击的是升序按钮，即ascending时
                    this.paramsMX.orderby = 1; //将order这个变量赋值为后端接口文档定义的升序的字段名，之后作为入参传给后端
                } else if (column.order == 'descending') {
                    //当用户点击的是升序按钮，即descending时
                    this.paramsMX.orderby = 0; //将order这个变量赋值为后端接口文档定义的降序的字段名，之后作为入参传给后端
                } else {
                    this.paramsMX.orderCol = '';
                }
                //   this.indexQueryListFun()//且发起后端请求的接口
                this.mingxi(this.rowMX);
            }
        },
        handleSizeMX(val) {
            this.paramsMX.PageSize = val;
            this.mingxi(this.rowMX);
        },
        handleCurrentMX(val) {
            this.paramsMX.PageIndex = val;
            this.mingxi(this.rowMX);
        },
        filterTag1(value, row) {
            return row['RunStatus'] == value;
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