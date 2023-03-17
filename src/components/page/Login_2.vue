<template>
    <div></div>
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
            options: [
                {
                    value: 'ch',
                    label: '简体中文'
                },
                {
                    value: 'jp',
                    label: '日本語'
                }
                // {
                // value: 'la',
                // label: '拉丁语'
                // }
            ],

            themecolor: 'ff6302', //默认颜色蓝色 409eff
            login_staus: 2
        };
    },

    mounted() {
        if (localStorage.getItem('login_staus')) {
            //  localStorage.setItem('login_staus',localStorage.getItem('login_staus'));
            this.login_staus = localStorage.getItem('login_staus');
        }
        if (localStorage.getItem('comp_id')) {
            localStorage.removeItem('comp_id');
        }
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


        // this.submitForm();
    },
    watch: {
        '$route.query': {
            immediate: true,
            handler(newVal, oldVal) {
                if (this.$route.query.uid) {
                    this.login_staus = 3;
                    localStorage.setItem('login_staus', 3);
                    this.param.username = this.$route.query.uid;
                    this.param.password = this.$route.query.pwd;
                    this.loginSure(this.$route.query.path);
                }
            }
        }
    },
    methods: {
        //点击登录
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loginSure('/index');
                }
            });
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
    color: #46a6dc;
    border: none;
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