<template>
    <div class="screen">
        <!-- <div class="screenClass"><img src="../../common/comImg/index/screenFull.png" alt="全屏" @click="showFlow()" v-show="!isScreenFull"></div>
        <div class="screenClass"><img src="../../common/comImg/index/cancelScreenFull.png" alt="取消全屏" @click="clearBackAll" v-show="isScreenFull"></div> -->
        <!-- <el-button type="primary" size="mini" @click="showFlow()" v-show="!isScreenFull">全屏</el-button>
        <el-button type="text" icon="el-icon-arrow-left" style="color: #fff" @click="clearBackAll" v-show="isScreenFull">返回</el-button> -->
    </div>
</template>

<script>
import screenfull from 'screenfull';
export default {
    components: {},
    data() {
        return {
            isScreenFull: false
        };
    },
    computed: {},
    watch: {},
    created() {
        // let that = this;
        // window.onresize = function () {
        //     if (!that.checkFull()) {
        //         // 退出全屏后要执行的动作
        //         that.isScreenFull = false;
        //         // that.backGo();
        //         that.$resizeFont.resizeFontFull();
        //     }
        // };
    },
    mounted() {
        window.addEventListener('keydown', this.KeyDown); // 监听按键事件
    },
    methods: {
        //f11键盘事件
        KeyDown(event) {
            if (event.keyCode === 122) {
                // event.returnValue = false;
                // this.showFlow(); //触发全屏的按钮
                this.$resizeFont.resizeFontFull();
            }
        },
        // 全屏
        showFlow() {
            if (!screenfull.isEnabled) {
                this.$message({
                    message: this.$t('menu.buzhichiquanping'),
                    type: 'warning'
                });
                return false;
            }
            screenfull.toggle();
            this.$resizeFont.resizeFontFull();
            this.isScreenFull = true;
        },
        // 取消全屏
        clearBackAll() {
            if (screenfull.isFullscreen) {
                screenfull.exit();
                this.$resizeFont.resizeFont();
                this.isScreenFull = false;
            }
        },
        //全屏判断状态 取消
        checkFull() {
            //判断浏览器是否处于全屏状态 （需要考虑兼容问题）
            //火狐浏览器
            var isFull =
                document.mozFullScreen ||
                document.fullScreen ||
                //谷歌浏览器及Webkit内核浏览器
                document.webkitIsFullScreen ||
                document.webkitRequestFullScreen ||
                document.mozRequestFullScreen ||
                document.msFullscreenEnabled;
            if (isFull === undefined) {
                isFull = false;
            }
            return isFull;
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
<style lang='scss' scoped>
//@import url(); 引入公共css类
.screen{
    // position: fixed;
    // right: 0;
    // top: 0;
    cursor: pointer;
}
.screenClass{
    img{
        width: 0.28rem;
    }
}
</style>