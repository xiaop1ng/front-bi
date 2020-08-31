<template>

    <section class="main fixed">
        <Header v-on:menuChange="changeDist"></Header>
        <article class="content mt5">
            <h-cell-group>
                <h-cell-item v-for="item in list" type="link" :href="'/'+ dist + '/word/' + item.word" :key="item.word" arrow>
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
import Header from '@/components/Header'
import { getSession, setSession, clearSession, getUuid, getUrlParams } from 'thinkive-hvue'


export default {
    data () {
        return {
            list: [
                
            ],
            dist: 'game'
        }
    },
    components: {
        Footer,
        Header
    },
    beforeCreate() {
        console.log('index beforeCreate invoke!')
        
    },
    created(){
        console.debug(this.$route.params.dist)
        this.dist = this.$route.params.dist || 'game'
        this.getWordCount(this.dist)
    },
    mounted(){
        
    },
    methods: {
        getWordCount(dist){
            wordcount({dist: dist}).then(data => {
                console.debug("data", data)
                if (data.err == '0') {
                    this.list = data.data
                }
            })
        },
        inputBlur() {
            // ios
            window.scroll(0,0);
        },
        changeDist(item) {
            this.dist=item.dist
            this.getWordCount(item.dist)
            this.$router.replace('/index/' + item.dist)
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
