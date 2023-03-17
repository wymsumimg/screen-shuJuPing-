<template>
    <div class="login-wrap" style="font-size: 16px">
        <div class="ms-login">
            <div class="jiaoBiao1">
                <img class="jbImg1" src="../common/comImg/index/loginBgRight.png" alt="" />
            </div>
            <div class="jiaoBiao2">
                <img class="jbImg1" src="../common/comImg/index/loginBgRight.png" alt="" />
            </div>
            <div class="jiaoBiao3">
                <img class="jbImg1" src="../common/comImg/index/loginBgRight.png" alt="" />
            </div>
            <div class="jiaoBiao4">
                <img class="jbImg1" src="../common/comImg/index/loginBgRight.png" alt="" />
            </div>
            <div class="ms-title">
                <!-- 用户登录 -->
                <div class="title_left">{{ $t('menu.userLogin') }}</div>
                <!-- <div class="title_right" style="width: 110px">
                    <el-select v-model="value" @change="tabLang()" :popper-append-to-body="true" popper-class="operateDropOption">
                        <el-option v-for="item in $global.languageOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div> -->
            </div>
            <el-form :model="param" :rules="rules" ref="param" label-width="0px" class="ms-content">
                <div class="loginInput">
                    <el-form-item
                        prop="username"
                        class="form_container"
                        style="position: relative"
                        :rules="[{ required: true, message: this.$t('menu.slDeparPlace'), trigger: 'blur' }]"
                    >
                        <img class="topDing" src="../common/comImg/index/user.png" alt="" />
                        <el-input v-model="param.username" :placeholder="$t('menu.userName')"> </el-input>
                    </el-form-item>

                    <el-form-item
                        prop="password"
                        style="position: relative"
                        class="form_container"
                        :rules="[{ required: true, message: this.$t('menu.pwPlace'), trigger: 'blur' }]"
                    >
                        <img class="topDing" src="../common/comImg/index/password.png" alt="" />
                        <el-input
                            type="password"
                            :placeholder="$t('menu.password')"
                            v-model="param.password"
                            @keyup.enter.native="submitForm('param')"
                        >
                        </el-input>
                    </el-form-item>
                </div>

                <div class="login-btn">
                    <el-button @click="submitForm('param')">{{ $t('menu.login') }}</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import { GetLogin } from '@/api/api.js';
import { toggleClass } from '../../utils/index';
export default {
    data: function () {
        return {
            isRules: {},
            // 验证码
            disabled: false,
            time: 5,
            rules: {},
            param: {
                username: '',
                password: ''
            },
            keepLogin: false,
            value: 'ch',
            themecolor: 'ff6302', //默认颜色蓝色 409eff
            login_staus: 2
        };
    },

    mounted() {
        localStorage.setItem('baseUrl', '0');

        if (localStorage.getItem('lang') == 'ch') {
            this.$i18n.locale = 'ch';
            this.value = 'ch';
        } else if (localStorage.getItem('lang') == 'jp') {
            this.$i18n.locale = 'jp';
            this.value = 'jp';
        } else if (localStorage.getItem('lang') == 'en') {
            this.$i18n.locale = 'en';
            this.value = 'en';
        } else if (localStorage.getItem('lang') == 'la') {
            this.$i18n.locale = 'la';
            this.value = 'la';
        }
        if (localStorage.getItem('login_staus')) {
            //  localStorage.setItem('login_staus',localStorage.getItem('login_staus'));
            this.login_staus = localStorage.getItem('login_staus');
        }
        // if (localStorage.getItem('comp_id')) {
        //     localStorage.removeItem('comp_id');
        // }
        if (localStorage.getItem('dateValue')) {
            localStorage.removeItem('dateValue');
        }
        if (localStorage.getItem('allCheJian')) {
            localStorage.removeItem('allCheJian');
        }

        toggleClass(document.body, 'custom-' + this.themecolor);
        this.$store.commit('setThemeColor', this.themecolor);
        let curcolor = this.$store.state.themecolor;
        // 根据全局换肤 得到全局颜色
        localStorage.setItem('themeColor', this.themecolor);
        this.$resizeFont.resizeFont();

        // this.submitForm();
    },
    watch: {
        '$route.query': {
            immediate: true,
            handler(newVal, oldVal) {
                if (this.$route.query.uid) {
                    this.login_staus = 3;
                    this.param.username = this.$route.query.uid;
                    this.param.password = this.$route.query.pwd;
                    this.loginSure(this.$route.query.path);
                }
            }
        }
    },
    methods: {
        tabLang() {
            if (this.value == 'ch') {
                this.$i18n.locale = 'ch';
            } else if (this.value == 'jp') {
                this.$i18n.locale = 'jp';
            } else if (this.value == 'en') {
                this.$i18n.locale = 'en';
            } else if (this.value == 'la') {
                this.$i18n.locale = 'la';
            }
        },
        //点击登录
        submitForm(formName) {
            localStorage.setItem('userName', this.param.username);
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loginSure('/index');
                }
            });
            if (this.$i18n.locale == 'ch') {
                localStorage.setItem('lang', 'ch');
            } else if (this.$i18n.locale == 'jp') {
                localStorage.setItem('lang', 'jp');
            } else if (this.$i18n.locale == 'en') {
                localStorage.setItem('lang', 'en');
            } else if (this.$i18n.locale == 'la') {
                localStorage.setItem('lang', 'la');
            }
        },
        loginSure(path) {
            if (this.param.username == '') {
                this.$message.warning('请输入用户名');
                return;
            }
            if (this.param.password == '') {
                this.$message.warning('请输入密码');
                return;
            }
            //用户名密码登录
            const rLoading = this.openLoading();
            let params = {
                name: this.param.username,
                pwd: this.param.password
            };
            GetLogin(params).then((res) => {
                const { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    rLoading.close();
                    localStorage.setItem('comp_id', Data);
                    localStorage.setItem('comp_name1', Data);
                    localStorage.setItem('shangBaoName', Data);
                    if (this.login_staus == 1) {
                        localStorage.setItem('login_staus', 1);
                        import('@/components/common/checkCss1.scss');
                    } else if (this.login_staus == 2) {
                        localStorage.setItem('login_staus', 2);
                        import('@/components/common/checkCss2.scss');
                    } else {
                        localStorage.setItem('login_staus', 3);
                        import('@/components/common/checkCss3.scss');
                    }
                    this.$router.replace(path);
                } else {
                    rLoading.close();
                }
            });
        }
    }
};
</script>
<style lang='scss'>
.el-icon-info {
    font-size: 0.18rem;
}
.el-icon-error {
    font-size: 0.18rem;
}
.el-icon-warning {
    font-size: 0.18rem;
}
.el-icon-success {
    font-size: 0.18rem;
}
.login-btn {
    .el-button {
        background-color: #2966ee;
        color: #fff;
        border: none;
    }
}

.keepLo .el-checkbox {
    color: #bebebf;
}
/* .el-input-group__append, .el-input-group__prepend{
    padding: 0 12px !important;
} */
.el-input-group__prepend {
    padding: 0 12px !important;
}
.loginInput .el-input__inner {
    padding-left: 37px;
    border: 1px solid #1b7fc0;
    background-color: #256899;
    color: #fff;
}
.keepLo .el-checkbox__inner {
    border: 1px solid #46a6dc;
    background: transparent;
}
.form_container input::-webkit-input-placeholder {
    color: #fff;
}
.form_container input:-moz-placeholder {
    color: #fff;
}
.form_container input::-moz-placeholder {
    color: #fff;
}
.form_container input:-ms-input-placeholder {
    color: #fff;
}
.title_right .el-input__inner {
    background: rgba(70, 166, 220, 0.5) !important;
    color: #fff;
    border: none;
}
.operateDropOption ul .el-select-dropdown__item.hover,
.operateDropOption ul .el-select-dropdown__item:hover {
    background-color: #b3cbff;
}
.operateDropOption {
    background: rgba(70, 166, 220, 0.5) !important;
    ul {
        li {
            color: #fff;
        }
        .el-select-dropdown__item.hover,
        .el-select-dropdown__item:hover {
            background-color: #46a6dc;
        }
    }
    .el-select-dropdown__item.selected {
        color: #2966ee;
        font-weight: bold;
    }
}
</style>

<style  scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background: 100% url(../../assets/img/login-bg.jpg) no-repeat #072454;
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 0.5rem;
    font-size: 0.2rem;
    color: #fff;
    border: 2px solid #065c9a;
    border-bottom: none;
    padding: 0.15rem 0.3rem 0;
    overflow: hidden;
    box-sizing: border-box;
}
.title_left {
    float: left;
}
.title_right {
    float: right;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 4rem;
    margin: -1.9rem 0 0 -1.75rem;
    background: rgb(0 42 107 / 80%);
    overflow: hidden;
}
.ms-content {
    border: 2px solid #065c9a;
    border-top: none;
    padding: 0.1rem 0.3rem 0.3rem;
}
.login-btn {
    text-align: center;
    margin-top: 0.1rem;
}
.login-btn button {
    width: 100%;
    height: 0.36rem;
    margin-bottom: 0.1rem;
}
.login-tips {
    font-size: 0.12rem;
    line-height: 0.3rem;
    color: #fff;
}
</style>
<style lang="scss" scoped>
.titlePosi {
    padding-top: 7%;
    .titleQi {
        text-align: center;
        // font-size: 53px;
        font-family: 缁忓吀缁嗗渾绠€;
        font-weight: 400;
        background: linear-gradient(to right, #009df4 0%, #00e9d0 100%);
        -webkit-background-clip: text;
        color: transparent;
    }
    .titleQiEn {
        text-align: center;
        font-size: 17px;
        font-family: FZLTXHJW;
        font-weight: normal;
        background: linear-gradient(to right, #009df4 0%, #00e9d0 100%);
        -webkit-background-clip: text;
        color: transparent;
    }
}
.jiaoBiao1 {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 36px;
    height: 36px;

    .jbImg1 {
        width: 100%;
        transform: rotate(270deg);
    }
}
.jiaoBiao2 {
    position: absolute;
    right: 0px;
    top: 0px;
    width: 36px;
    height: 36px;
    .jbImg1 {
        width: 100%;
    }
}
.jiaoBiao3 {
    position: absolute;

    width: 36px;
    height: 36px;
    left: 0px;
    bottom: 0px;
    .jbImg1 {
        width: 100%;
        transform: rotate(180deg);
    }
}
.jiaoBiao4 {
    position: absolute;

    width: 36px;
    height: 36px;
    right: 0px;
    bottom: 0px;
    .jbImg1 {
        width: 100%;
        transform: rotate(90deg);
    }
}
.topDing {
    position: absolute;
    left: 12px;
    top: 7px;
    z-index: 22;
    width: 17px;
}
</style> 