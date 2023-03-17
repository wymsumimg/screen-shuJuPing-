<template>
    <div class="">
        <div flex="cross:center main:left">
            <div v-if="showchooseTime" flex="cross:center main:justify">
                <div class="bctime" flex="cross:center main:center">
                    <div class="qianhou" @click="beforeDay()">前一天</div>
                    <div class="qianhouTime" style="margin: 0 8px">
                        <el-date-picker
                            @change="changet"
                            :clearable="false"
                            v-model="chooseDateTime"
                            value-format="yyyy-MM-dd"
                            type="date"
                            :placeholder="$t('menu.xuanzeriqi')"
                        >
                        </el-date-picker>

                        <!-- <i class="el-icon-circle-close closeIcon" @click="clearDateTime"></i> -->
                    </div>
                    <div class="qianhou" @click="nextDay(houtian)" :style="{ color: houtian ? '' : '#ccc' }">后一天</div>
                </div>

                <div class="fengeTime" @click="shezhiBanci()">
                    <span class="ftTieBian">
                        {{ checkTime(begintime) }}&nbsp;<i class="el-icon-minus"></i>&nbsp;{{ checkTime(endtime) }}
                        <span v-if="begintime.split(' ')[0] != endtime.split(' ')[0]" class="jiayi">+1</span>
                    </span>
                </div>
            </div>
            <div class="bcBan" flex="cross:center main:center" v-show="this.checkList[0] == 1 && jbTime1">
                <!-- <el-checkbox-group v-model="checkListTitle" @change="setChangeTitle">
                    <div class="top_shezhiName" flex="cross:center main:center">
                        <div><el-checkbox label="1">白班</el-checkbox></div>
                        <img v-if="login_staus == 1" src="../../common/comImg/index/check1.png" :class="[rotate ? 'go' : 'bcImg']" alt="" />
                        <img v-if="login_staus == 2" src="../../common/comImg/index/check.png" :class="[rotate ? 'go' : 'bcImg']" alt="" />
                        <img v-if="login_staus == 3" src="../../common/comImg/index/check3.png" :class="[rotate ? 'go' : 'bcImg']" alt="" />
                        <div><el-checkbox label="2">夜班</el-checkbox></div>
                    </div>
                </el-checkbox-group> -->
                <div class="chongTime" flex="cross:center main:center">
                    <div class="guding" @click="xuanzhong()" :class="[active ? 'xiedong' : '']">
                        {{ checkListTitle[0] == 1 ? '白班' : '夜班' }}
                    </div>
                    <div class="zhongjian" @click="xuanzhong()">
                        <img v-if="login_staus == 1" src="../../common/comImg/index/check1.png" :class="[rotate ? 'go' : 'bcImg']" alt="" />
                        <img v-if="login_staus == 2" src="../../common/comImg/index/check.png" :class="[rotate ? 'go' : 'bcImg']" alt="" />
                        <img v-if="login_staus == 3" src="../../common/comImg/index/check3.png" :class="[rotate ? 'go' : 'bcImg']" alt="" />
                    </div>
                    <div class="xia" @click="xuanzhong()" :class="[active ? 'xieshang' : '']">
                        {{ checkListTitle[0] == 1 ? '夜班' : '白班' }}
                    </div>
                </div>
            </div>
            <!-- <div>
                <button class="chooseBtn" style="margin-right: 0.2rem" @click="shezhiBanci()">{{ $t('menu.setBanci') }}</button>
            </div> -->
        </div>

        <!-- 设置班次 -->
        <div v-if="banciDio">
            <div class="editPassword exoprtData setData" style="min-width: 0">
                <el-dialog :title="$t('menu.setBanci')" :visible.sync="banciDio" @close="banClose" width="6.8rem">
                    <div class="setBody">
                        <div>
                            <div>
                                <el-checkbox-group v-model="checkList" @change="setChange">
                                    <div flex="dir:top" class="shezhiName">
                                        <div class="shezhiName_li" flex>
                                            <el-checkbox label="1">12小时</el-checkbox>

                                            <time-input ref="timeref" style="margin-left: 0.5rem" :getvalue="jbTime1"></time-input>
                                        </div>
                                        <div class="shezhiName_li" flex>
                                            <el-checkbox label="2">24小时</el-checkbox>

                                            <time-input ref="timeref1" style="margin-left: 0.5rem" :getvalue="jbTime2"></time-input>
                                        </div>
                                        <div class="shezhiName_li" flex>
                                            <el-checkbox label="3">自定义时间</el-checkbox>

                                            <div class="qujianName">
                                                <el-date-picker
                                                    @change="changeDate"
                                                    style="margin-left: 0.2rem"
                                                    v-model="jbTime3"
                                                    type="datetimerange"
                                                    range-separator="-"
                                                    :start-placeholder="$t('menu.kaishiriqi')"
                                                    :end-placeholder="$t('menu.jieshuriqi')"
                                                    format="yyyy-MM-dd HH:mm"
                                                    value-format="yyyy-MM-dd HH:mm:ss"
                                                >
                                                </el-date-picker>
                                            </div>
                                        </div>
                                    </div>
                                </el-checkbox-group>
                            </div>
                            <div class="setTop">
                                <el-button type="primary" class="savebtnClass" @click="bcSure()">{{ $t('menu.sure') }}</el-button>
                                <el-button class="fangqiBtn" @click="cancelbanciDio">{{ $t('menu.cancel') }}</el-button>
                            </div>
                        </div>
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
import timeInput from '../component/timeInput.vue';
import { getNowFormatDate, checkDateToTime, changeBL, getTime, getNextDate } from '../../../utils/index';
export default {
    components: {
        timeInput
    },
    data() {
        return {
            banciDio: false,
            checkList: [],
            jbTime1: '',
            jbTime2: '',
            jbTime3: '',
            checkListTitle: [],
            chooseDateTime: '',
            endtime: '',
            begintime: '',
            showchooseTime: false,
            login_staus: 0,
            rotate: false,
            houtian: true,
            active: false
        };
    },
    props: {},
    computed: {},
    watch: {
        chooseDateTime(newData, oldData) {
            if (newData == getTime().split(' ')[0]) {
                this.houtian = false;
            } else {
                this.houtian = true;
            }
        }
    },
    mounted() {
        this.login_staus = localStorage.getItem('login_staus');
    },
    methods: {
        huancunTime() {
            if (localStorage.getItem('localSetBanCi')) {
                let localSetBanCi = JSON.parse(localStorage.getItem('localSetBanCi'));
                this.bcTime = localSetBanCi.bcTime;
                this.jbTime1 = localSetBanCi.jbTime1;
                this.jbTime2 = localSetBanCi.jbTime2;
                this.checkIndex = localSetBanCi.checkIndex;
                this.checkList[0] = localSetBanCi.checkIndex;
                this.chooseDateTime = localSetBanCi.chooseDateTime ? localSetBanCi.chooseDateTime : getNowFormatDate();
                // if (this.checkIndex == 1) {
                // this.jbTime1 = this.jbTime1;
                // } else if (this.checkIndex == 2) {
                // this.jbTime2 = this.jbTime2;
                // } else if (this.checkIndex == 3) {
                this.jbTime3 = this.bcTime;
                // }
                let shouci = '1';
                this.jisuanshijian(shouci);
                this.checkListTitle = localSetBanCi.checkListTitle;
            } else {
                this.chooseDateTime = getNowFormatDate();
                this.begintime = getTime().split(' ')[0] + ' 00:00:00';

                this.endtime = getTime().split(' ')[0] + ' 23:59:59';
            }
        },
        cancelbanciDio() {
            this.banClose();
            this.banciDio = false;
        },
        banClose() {
            if (!localStorage.getItem('localSetBanCi')) {
                this.jbTime1 = '';
                this.jbTime2 = '';
                this.jbTime3 = '';
                this.checkIndex = '';
                this.checkList = [];
            }
        },

        bcSure() {
            if (this.checkList.length > 0) {
                this.jbTime1 = this.$refs.timeref.value;
                this.jbTime2 = this.$refs.timeref1.value;
                if (this.checkList[0] == 1) {
                    if (this.jbTime1 == '') {
                        this.$message.warning('请设置交班时间');
                        return;
                    }
                    this.bcTime = this.jbTime1;
                }
                if (this.checkList[0] == 2) {
                    if (this.jbTime2 == '') {
                        this.$message.warning('请设置交班时间');
                        return;
                    }
                    this.bcTime = this.jbTime2;
                }
                if (this.checkList[0] == 3) {
                    if (!this.jbTime3) {
                        this.$message.warning('请设置交班时间');
                        return;
                    }
                    this.bcTime = this.jbTime3;
                }

                this.checkIndex = this.checkList[0];

                this.jisuanshijian();
            } else {
                this.$message.warning('请选择班次');
                return;
            }

            this.banciDio = false;
        },
        jisuanshijian(valname) {
            if (this.checkIndex == '') {
                return;
            }
            if (this.checkList[0]) {
                if (this.checkList[0] == 1) {
                    this.showchooseTime = true;
                    // 用选中的时间替换今天时间 （getNowFormatDate()）

                    this.setCheckTime = (this.chooseDateTime ? this.chooseDateTime : getNowFormatDate()) + ' ' + this.bcTime + ':00';
                    if (valname == 1) {
                    } else {
                        let xxx = (this.chooseDateTime ? this.chooseDateTime : getNowFormatDate()) + ' ' + this.bcTime + ':00';
                        if (
                            this.isDuringDate(
                                (this.chooseDateTime ? this.chooseDateTime : getNowFormatDate()) + ' 06:00:00',
                                (this.chooseDateTime ? this.chooseDateTime : getNowFormatDate()) + ' 18:00:00',
                                xxx
                            ) == true
                        ) {
                            this.checkListTitle = ['1'];
                        } else {
                            this.checkListTitle = ['2'];
                        }
                    }
                } else if (this.checkList[0] == 2) {
                    this.showchooseTime = true;
                    this.setCheckTime = (this.chooseDateTime ? this.chooseDateTime : getNowFormatDate()) + ' ' + this.bcTime + ':00';
                    let jieshu = new Date(this.setCheckTime).getTime();
                    let time = checkDateToTime(jieshu, 24);
                    let dateval = [];
                    this.begintime = this.setCheckTime;
                    this.endtime = changeBL(time);
                    dateval[0] = this.begintime;
                    dateval[1] = this.endtime;
                    this.dateValue = dateval;
                } else if (this.checkList[0] == 3) {
                    this.showchooseTime = false;
                    this.setCheckTime = this.bcTime;

                    let dateval = [];
                    this.begintime = this.setCheckTime[0];
                    this.endtime = this.setCheckTime[1];
                    dateval[0] = this.begintime;
                    dateval[1] = this.endtime;
                    this.dateValue = dateval;
                }

                this.setChangeTitle();
            }
        },
        isDuringDate(beginDateStr, endDateStr, xxx) {
            var curDate = new Date(xxx),
                beginDate = new Date(beginDateStr),
                endDate = new Date(endDateStr);
            if (curDate >= beginDate && curDate <= endDate) {
                return true; //早
            }
            return false;
        },
        setChange() {
            if (this.checkList.length > 1) {
                this.checkList.shift();
            }

            
        },
        setChangeTitle() {
            if (this.checkListTitle.length > 1) {
                this.checkListTitle.shift();
            }

            if (this.checkListTitle[0] == 1) {
                // this.$refs.bcImg.style.transform = `rotate(360deg)`;

                if (this.checkIndex == 1) {
                    let jieshu = new Date(
                        (this.chooseDateTime ? this.chooseDateTime : getNowFormatDate()) + ' ' + this.bcTime + ':00'
                    ).getTime();
                    let time = checkDateToTime(jieshu, 12);

                    let dateval = [];
                    this.begintime = (this.chooseDateTime ? this.chooseDateTime : getNowFormatDate()) + ' ' + this.bcTime + ':00';

                    this.endtime = changeBL(time);
                    dateval[0] = this.begintime;
                    dateval[1] = this.endtime;
                    this.dateValue = dateval;
                }
            }
            if (this.checkListTitle[0] == 2) {
                // this.$refs.bcImg.style.transform = `rotate(180deg)`;
                if (this.checkIndex == 1) {
                    let jieshu = new Date(
                        (this.chooseDateTime ? this.chooseDateTime : getNowFormatDate()) + ' ' + this.bcTime + ':00'
                    ).getTime();
                    let time = checkDateToTime(jieshu, 12);
                    let b = changeBL(time);

                    let time2 = checkDateToTime(jieshu, 24);
                    let e = changeBL(time2);

                    let dateval = [];
                    this.begintime = b;
                    this.endtime = e;
                    dateval[0] = this.begintime;
                    dateval[1] = this.endtime;
                    this.dateValue = dateval;
                }
            }
            this.$emit('dateValue', this.dateValue);
            this.$emit('begintime', this.begintime);
            this.$emit('endtime', this.endtime);
            this.$emit('checkIndex', this.checkIndex);
            this.$emit('checkList', this.checkList);
            this.$emit('checkListTitle', this.checkListTitle);
            this.$emit('bcTime', this.bcTime);
            this.$emit('banciDio', this.banciDio);
            let localSetBanCi = {
                bcTime: this.bcTime,
                checkIndex: this.checkIndex,
                checkListTitle: this.checkListTitle,
                jbTime1: this.jbTime1,
                jbTime2: this.jbTime2,
                chooseDateTime: this.chooseDateTime
            };
            localStorage.setItem('localSetBanCi', JSON.stringify(localSetBanCi));
            let time = {
                begintime: this.begintime,
                endtime: this.endtime
            };
            localStorage.setItem('saveTime', JSON.stringify(time));
        },
        shezhiBanci() {
            this.banciDio = true;
        },
        changeDate() {
            if (this.jbTime3) {
                // localStorage.removeItem('chooseDateTime');
                // this.clearDateTime();
                this.begintime = this.jbTime3[0];
                this.endtime = this.jbTime3[1];

                let endTime1 = this.endtime.split(' ');
                let begintime1 = this.begintime.split(' ');
                if (endTime1[1] == '00:00:00' && begintime1[0] != endTime1[0]) {
                    this.endtime = endTime1[0] + ' 23:59:59';
                    this.jbTime3[1] = this.endtime;
                } else if (this.begintime == this.endtime) {
                    this.endtime = endTime1[0] + ' 23:59:59';
                    this.jbTime3[1] = this.endtime;
                }
            }
        },
        clearDateTime() {
            this.chooseDateTime = '';
        },
        changet() {
            let shouci = '1';
            this.jisuanshijian(shouci);
        },
        checkTime(time) {
            // let time = '2022-11-11 23:59:58';
            if (time) {
                let quMiao = time.split(' ')[1];
                return quMiao.split(':')[0] + ':' + quMiao.split(':')[1];
            }
        },
        beforeDay() {
            this.chooseDateTime = getNextDate(this.chooseDateTime, -1);
            let shouci = '1';
            this.jisuanshijian(shouci);
        },
        nextDay(houtian) {
            if (houtian) {
                this.chooseDateTime = getNextDate(this.chooseDateTime, 1);
                let shouci = '1';
                this.jisuanshijian(shouci);
            }
        },
        xuanzhong() {
            this.active = true;

            this.rotate = !this.rotate;
            this.setChangeTitle();
            setTimeout(() => {
                this.active = false;
                this.checkListTitle[0] == 1 ? (this.checkListTitle = ['2']) : (this.checkListTitle = ['1']);
            }, 500);
        }
    },
    created() {},

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
.shezhiName {
    line-height: 0.5rem;
    .shezhiName_li {
        display: flex;
        align-items: center;
    }
}
.setTop {
    margin-top: 1.5rem;
    text-align: center;
}
.setBody {
    height: 3.8rem;
    display: flex;
    // align-items: center;
    justify-content: center;
    padding: 0.2rem 0;
}
.bcImg {
    transition: all 2s;
}
.go {
    transform: rotate(180deg);
    transition: all 2s;
    width: 0.18rem;
    height: 0.18rem;
    margin: 0 0.07rem;
}

.xiedong {
    transition: all 1s;
    transform: translate(30px, 5px);
}
.xieshang {
    transition: all 1s;
    transform: translate(-30px, -5px);
}
</style>