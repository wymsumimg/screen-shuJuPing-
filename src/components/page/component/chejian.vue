<template>
    <div class="">
        <el-select v-model="allCheJianes" @change="selectChange" clearable :popper-append-to-body="false" :placeholder="$t('menu.quanbuchejian')">
            <el-option v-for="item in cheJianHao" :key="item.room" :label="item.text" :value="item.value"> </el-option>
        </el-select>
    </div>
</template>

<script>
import { getroom } from '../../../api/api';
export default {
    components: {},
    data() {
        return {
            allCheJianes: '',
            cheJianHao: []
        };
    },
    props: {
        allCheJian: {
            require: true,
            type: String,
            default: ''
        }
    },
    watch: {},
    created() {},
    mounted() {
        if (localStorage.getItem('allCheJian')) {

            this.allCheJianes = localStorage.getItem('allCheJian');
            this.$emit('childChejian', this.allCheJianes);
        }else{
            this.allCheJianes = this.allCheJian;
        }
        
        this.getGetroom();
    },
    methods: {
        getGetroom() {
            let params = {
                CP_ID: localStorage.getItem('comp_id')
            };
            getroom(params).then((res) => {
                let arr = [];
                const { ReturnCode, Data } = res;
                if (ReturnCode == 200) {
                    this.cheJianHao = Data;
                    for (let i = 0; i < this.cheJianHao.length; i++) {
                        let obj = {
                            text: this.cheJianHao[i].name,
                            value: this.cheJianHao[i].room.toString()
                        };
                        arr.push(obj);
                    }
                }
                this.cheJianHao = arr;
            });
        },
        selectChange() {
            let cheJian = this.allCheJianes;
            localStorage.setItem('allCheJian', cheJian);
            this.$emit('childChejian', cheJian);
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
</style>