<template>

    <section class="main fixed bgone">
        <header class="header hidden">
            <div class="header_inner">
                <a @click="pageBack()" class="icon_back" href="javascript:;"></a>
                
            </div>
        </header>
        <article class="content">
            <canvas id="my_canvas" width="480" height="340"></canvas>
        </article>
    </section>
</template>

<script>
import {wordcount} from '@/service/mobileService'
import common from '@/util/common'
import { getSession, setSession, clearSession, getUuid, getUrlParams } from 'thinkive-hvue'
import WordCloud from 'wordcloud'


export default {
    data () {
        return {
            
        }
    },
    beforeCreate() {
        console.log('index beforeCreate invoke!')
        
    },
    created(){

    },
    mounted(){
        wordcount({dist: 'game'}).then(data => {
            console.debug("data", data)
            if (data.err == '0') {
                var array = [];
                data.data.forEach(item => {
                    var i = [];
                    i.push(item.word)
                    i.push(item.count)
                    array.push(i)
                })
                WordCloud(document.getElementById('my_canvas'), { list: array } );
            }
        })
        
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
