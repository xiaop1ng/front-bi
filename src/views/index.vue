<template>

    <section class="main fixed">
        <header>
            <div class="header-inner">
                <h1 @click="menuShow = !menuShow">{{title}}<img src="../assets/images/arrow-down.png" style="height: .20rem;"/></h1>
            </div>
        </header>
        <article class="content mt5">
            <h-cell-group>
                <h-cell-item v-for="item in list" type="link" :href="'/'+ dist + '/word/' + item.word" :key="item.word" arrow>
                    <span slot="left">{{item.word}}</span>
                    <span slot="right">{{item.count}}</span>
                </h-cell-item>
            </h-cell-group>
        </article>
        <h-actionsheet :actions="menu" v-model="menuShow"></h-actionsheet>
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
            title: '游戏话题',
            list: [
                
            ],
            menu: [{
                label: '游戏话题',
                dist: 'game',
                callback: item => {
                    this.changeDist(item);
                }
            },{
                label: '实事新闻',
                dist: 'news',
                callback: item => {
                    this.changeDist(item);
                }
            }],
            menuShow: false,
            dist: 'game'
        }
    },
    components: {
        Footer,
    },
    beforeCreate() {
        console.log('index beforeCreate invoke!')
        
    },
    created(){
        this.dist = this.$route.params.dist || 'game'
        this.menu.forEach(T => {
            if(T.dist == this.dist) {
                this.title = T.label
                return false
            }
        })
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
        pageBack() {
            // 退出应用
            common.exit()
        },
        inputBlur() {
            // ios
            window.scroll(0,0);
        },
        changeDist(item) {
            if (item.dist == this.dist) return
            this.getWordCount(item.dist)
            this.dist = item.dist
            this.title = item.label
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
