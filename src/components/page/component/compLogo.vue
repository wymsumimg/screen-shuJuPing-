<template>
    <div class="">
        <!-- https://data.moldcube.com/cpLogo/1.png -->
        <div class="tlogo" :style="{ 'background-color': comp_id == 4 ? 'transparent' : '' }" flex="main:center cross:center">
            <img :src="getSrc()" alt="" v-bind:class="{ teshudaxiao: isActive }" />
        </div>
    </div>
</template>

<script>
import { TokenKeys } from '@/utils/variable';
import domainsFuc from '@/api/domains';

export default {
    components: {},
    data() {
        return {
            login_staus: 0,
            isActive: false,
            domainsUrl: ''
        };
    },
    props: {
        comp_id: {
            type: Number
        }
    },
    computed: {},
    watch: {},
    methods: {
        getSrc() {
            let src = '';
            let url = window.location.href;

            let domainsUrl = url.split('/#/')[0];

            if (this.login_staus == 3) {
                if (this.domainsUrl.substr(0, 21) == 'http://202.202.202.10') {
                    // 赛豪私有
                    src = 'http://202.202.202.10:8001/cpLogo/homeLogo' + this.comp_id + '-3.png';
                } else if (this.domainsUrl.substr(0, 21) == 'http://192.168.0.216:') {
                    // 精诚私有
                    src = 'http://192.168.0.216:8101/cpLogo/homeLogo' + this.comp_id + '-3.png';
                } else {
                    // 正式
                    src = domainsUrl + '/cpLogo/homeLogo' + this.comp_id + '-3.png';
                }
            } else {
                if (this.domainsUrl.substr(0, 21) == 'http://202.202.202.10') {
                    // 赛豪私有
                    src = 'http://202.202.202.10:8001/cpLogo/homeLogo' + this.comp_id + '.png';
                } else if (this.domainsUrl.substr(0, 21) == 'http://192.168.0.216:') {
                    // 精诚私有
                    src = 'http://192.168.0.216:8101/cpLogo/homeLogo' + this.comp_id + '.png';
                } else {
                    // 正式
                    src = domainsUrl + '/cpLogo/homeLogo' + this.comp_id + '.png';
                }
            }

            return src;
        }
        // isHasImg(pathImg) {
        //     var ImgObj = new Image();
        //     ImgObj.src = pathImg;
        //     if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {
        //         return true;
        //     } else {
        //         return false;
        //     }
        // }
    },
    created() {},
    mounted() {
        this.domainsUrl = domainsFuc(TokenKeys.PRODUCT_ENV).domain;
        this.login_staus = localStorage.getItem('login_staus');
        if (this.login_staus == 3 && this.comp_id == 3) {
            this.isActive = true;
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
.teshudaxiao {
    width: 2.38rem;
    height: 0.46rem;
}
</style>