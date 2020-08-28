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
        this.word = this.$route.params.key
        worddetail({dist: 'game', word: this.word}).then(data => {
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
        }
    }
}
</script>

<style>

</style>
