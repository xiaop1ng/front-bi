<template>

    <section class="main fixed">
        <header>
            <div class="header-inner">
                <a  @click="pageBack()" class="back-btn"></a>
                <h1>{{word}}</h1>
            </div>
        </header>
        <article class="content mt5">
            <h-cell-group>
                <h-cell-item v-for="item in list" type="a" :href="item.url" :key="item.word" style="min-height:58px;" arrow>
                    <span slot="icon" class="hui-cell-icon icon"><img :src="getIcon(item)"></span>
                    <span style="white-space: break-spaces;" slot="left">{{item.tit}}</span>
                </h-cell-item>
            </h-cell-group>
        </article>
    </section>
</template>

<script>
import {worddetail} from '@/service/mobileService'

export default {
    data () {
        return {
            word: '话题',
            list: []
        }
    },
    beforeCreate() {
        console.log('index beforeCreate invoke!')
        
    },
    created(){
        this.dist = this.$route.params.dist
        this.word = this.$route.params.key
        worddetail({dist: this.dist, word: this.word}).then(data => {
            console.debug("data", data)
            if (data.err == '0') {
                this.list = data.data
            }
        })
    },
    mounted(){
        
        
    },
    methods: {
        pageBack() {
            // 退出应用
            this.$router.go(-1)
        },
        inputBlur() {
            // ios
            window.scroll(0,0)
        },
        getIcon(item) {
            let arr = item.url.split('/'); //以“/”进行分割
            let domain = ''; //如果url不正确就取空
            if( arr[2] ) {
                domain = arr[2];
            }
            console.debug(domain)
            if (domain.indexOf('www.')!= -1) {
                domain = domain.replace('www.', '')
            } else if (domain.indexOf('api.')!= -1){
                domain = domain.replace('api.', '')
            }
            if (domain) {
                return "https://file.ipadown.com/tophub/assets/images/media/" + domain + ".png_50x50.png"
            }
        }
    }
}
</script>

<style>

</style>
