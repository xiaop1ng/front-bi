<template>

    <section class="main fixed">
        <header>
            <div class="header-inner">
                <h1>游戏话题</h1>
            </div>
        </header>
        <article class="content mt5">
            <h-cell-group>
                <h-cell-item v-for="item in list" type="link" :href="'/word/' + item.word" :key="item.word" arrow>
                    <span slot="left">{{item.word}}</span>
                    <span slot="right">{{item.count}}</span>
                </h-cell-item>
            </h-cell-group>
        </article>
        <Footer :idx="1" ></Footer>
    </section>
</template>

<script>
import {wordcount} from '@/service/mobileService'
import common from '@/util/common'
import Footer from '@/components/Footer'
import { getSession, setSession, clearSession, getUuid, getUrlParams } from 'thinkive-hvue'


export default {
    data () {
        return {
            list: [
                
            ]
        }
    },
    components: {
        Footer,
    },
    beforeCreate() {
        console.log('index beforeCreate invoke!')
        
    },
    created(){
        wordcount({dist: 'game'}).then(data => {
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
            common.exit()
        },
        inputBlur() {
            // ios
            window.scroll(0,0);
        }
    }
}
</script>

<style>
.captcha-box {
    padding-right: 0 !important;
}

.captcha-input {
    display: inline !important;
    width: 50% !important;
}

.captcha-img {
    min-width: 100px;
    width: 45%;
}
</style>
