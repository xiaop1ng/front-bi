<template>
    <section class="main fixed">
        <header>
            <div class="header-inner">
                <h1>标签</h1>
            </div>
        </header>
        <article class="content mt8">
            <canvas id="my_canvas" width="480" height="340"></canvas>
        </article>
        <Footer :idx="2" ></Footer>
    </section>
</template>

<script>
import {wordcount} from '@/service/mobileService'
import Footer from '@/components/Footer'
import WordCloud from 'wordcloud'


export default {
    data () {
        return {
            
        }
    },
    components: {
        Footer
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

</style>
