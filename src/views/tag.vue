<template>
    <section class="main fixed">
        <Header v-on:menuChange="changeDist"></Header>
        <article class="content mt8">
            <canvas id="my_canvas" :width="canvasWidth" height="340"></canvas>
        </article>
        <Footer :idx="2" ></Footer>
    </section>
</template>

<script>
import {wordcount} from '@/service/mobileService'
import Footer from '@/components/Footer'
import WordCloud from 'wordcloud'
import Header from '@/components/Header'

export default {
    data () {
        return {
            dist: 'game',
            shape: ['cloud', 'circle', 'cardioid', 'diamond', 'square', 'triangle-forward', 'triangle', 'triangle-upright', 'pentagon', 'star'],
            canvasWidth: window.innerWidth
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
        
    },
    mounted(){
        this.dist = this.$route.params.dist || 'game'
        this.getWordCount(this.dist)
    },
    methods: {
        inputBlur() {
            // ios
            window.scroll(0,0);
        },
        getWordCount(dist) {
            wordcount({dist: dist}).then(data => {
                console.debug("data", data)
                if (data.err == '0') {
                    var array = [];
                    data.data.forEach(item => {
                        var i = [];
                        i.push(item.word)
                        let factor = data.data.length < 20 ? 10 : 3
                        i.push(item.count * factor)
                        array.push(i)
                    })
                    WordCloud(document.getElementById('my_canvas'), {
                        list: array,
                        shape: this.shape[Math.floor((Math.random()*this.shape.length))],
                        click: item => {
                            console.debug(item)
                            this.$router.push('/' + this.dist + /word/ + item[0])
                        }
                    });
                }
            })
        },
        changeDist(item) {
            this.dist=item.dist
            this.getWordCount(item.dist)
            this.$router.replace('/tag/' + item.dist)
        }
    }
}
</script>

<style>

</style>
