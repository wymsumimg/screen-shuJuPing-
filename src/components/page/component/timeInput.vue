<template>
    <div class="timeBox" @mouseleave="leave" @mouseover="over">
        <el-input
            ref="inp"
            @focus="inputAbort"
            @keyup.enter.native="ent"
            @blur="inputBlur"
            @input="Ipt"
            placeholder="请选择日期"
            prefix-icon="el-icon-time"
            v-model="value"
            type="time"
        >
        </el-input>
        <div v-show="show" class="box-card">
            <div class="xiaoshi">小时</div>
            <ul class="cardUl">
                <li v-for="item in 24" :key="item" @click="hour(item)" :style="color == item ? 'background-color: #409eff;color:#fff' : ''">
                    {{ item < 11 ? '0' + (item - 1) : item - 1 }}
                </li>
                <div v-show="show1" class="box-card1" :style="'top: ' + height + 'px; left:' + width + 'px'">
                    <div class="xiaoshi">分钟</div>
                    <ul class="cardUl1">
                        <li
                            v-for="item in 12"
                            :key="item"
                            @click="minu(item)"
                            :style="color1 == item ? 'background-color: #409eff;color:#fff' : ''"
                        >
                            {{ item < 2 ? '00' : item < 3 ? '05' : (item - 1) * 5 }}
                        </li>
                    </ul>
                </div>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value: '',
            show: false,
            show1: false,
            color: '',
            color1: '',
            status: false,
            height: 0,
            width: 0
        };
    },
    props: {
        getvalue: {
            type: String
        }
    },
    mounted() {
        this.value = this.getvalue;
    },
    methods: {
        inputAbort() {
            this.show = true;
        },
        hour(item) {
            this.value = (item < 11 ? '0' + (item - 1) : item - 1) + ':00';
            this.show1 = true;
            this.color = item;
            this.$refs.inp.focus();
            if (0 < item && item < 7) {
                this.height = 80;
            } else if (6 < item && item < 13) {
                this.height = 110;
            } else if (12 < item && item < 19) {
                this.height = 140;
            } else if (18 < item && item < 25) {
                this.height = 170;
            }
            if (item == 1 || item == 7 || item == 13 || item == 19) {
                this.width = 50;
            } else if (item == 2 || item == 8 || item == 14 || item == 20) {
                this.width = 80;
            } else if (item == 3 || item == 9 || item == 15 || item == 21) {
                this.width = 110;
            } else if (item == 4 || item == 10 || item == 16 || item == 22) {
                this.width = -80;
            } else if (item == 5 || item == 11 || item == 17 || item == 23) {
                this.width = -50;
            } else if (item == 6 || item == 12 || item == 18 || item == 24) {
                this.width = -20;
            }
        },
        minu(item) {
            this.value = this.value.split(':')[0] + ':' + (item < 2 ? '00' : item < 3 ? '05' : (item - 1) * 5);
            this.color1 = 1;
            this.show = false;
            this.show1 = false;
        },
        ent() {
            // if (this.value.length != 5) {
            //     return this.$message({
            //         message: '请输入正确的时间！',
            //         type: 'warning'
            //     });
            // }
            // let reg = /\:/g;
            // let regs = /\：/g;
            // if (reg.test(this.value)) {
            //     if (this.value.split(':')[0] > 24 || this.value.split(':')[1] > 60) {
            //         return this.$message({
            //             message: '请输入正确的时间！',
            //             type: 'warning'
            //         });
            //     }
            // } else if (regs.test(this.value)) {
            //     if (this.value.split('：')[0] > 24 || this.value.split('：')[1] > 60) {
            //         return this.$message({
            //             message: '请输入正确的时间！',
            //             type: 'warning'
            //         });
            //     }
            // }
            // this.show = false;
            // this.show1 = false;
            // this.$refs.inp.blur();
            // this.status = false;
        },
        inputBlur() {
            if (this.status) {
                this.show = false;
                this.show1 = false;
                // if (this.value.length != 5 && this.value.length != 0) {
                //     return this.$message({
                //         message: '请输入正确的时间！',
                //         type: 'warning'
                //     });
                // }
            }
        },
        leave() {
            this.status = true;
        },
        over() {
            this.status = false;
        },
        Ipt() {
            this.color = Number(this.value.split(':')[0]) + 1;
            console.log(this.color, 'this.color =');
        }
    }
};
</script>

<style scoped lang="scss">
.timeBox {
    width: 300px;
    position: relative;
    font-size: 15px;
    .xiaoshi {
        font-size: 0.12rem;
        height: 0.2rem;
        line-height: 0.2rem;
    }
    .box-card {
        width: 2.1rem;
        position: absolute;
        background-color: #ffffff;
        border: 1px solid #eee;
        box-shadow: 2px 2px 2px #eee;
        padding: 15px;
        z-index: 998;
        font-size: 0.12rem;
        .cardUl {
            width: 230px;
            height: 140px;
            display: flex;
            flex-wrap: wrap;
            justify-self: center;

            li {
                width: 30px;
                height: 30px;
                text-align: center;
                line-height: 30px;
                border-radius: 50%;
                margin: 2px;
                cursor: pointer;
            }

            .box-card1 {
                width: 170px;
                position: absolute;
                top: 50px;
                left: 230px;
                z-index: 999;
                background-color: #ffffff;
                border: 1px solid #eee;
                box-shadow: 2px 2px 2px #eee;
                padding: 15px;

                .cardUl1 {
                    width: 170px;
                    height: 90px;
                    display: flex;
                    flex-wrap: wrap;

                    li {
                        width: 30px;
                        height: 30px;
                        text-align: center;
                        line-height: 30px;
                        border-radius: 50%;
                        margin: 2px;
                        cursor: pointer;
                    }
                }
            }
        }
    }
}
</style>
<style>
input[type='time']::-webkit-calendar-picker-indicator {
    background: none;
    display: none;
}
</style>
