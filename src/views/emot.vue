<template>
    <section class="main fixed">
        <Header v-on:menuChange="changeDist"></Header>
        <article class="content mt8">
            <svg class="pie_chart"></svg>
        </article>
        <Footer :idx="3" ></Footer>
    </section>
</template>

<script>
import {feel} from '@/service/mobileService'
import Footer from '@/components/Footer'
import chartXkcd from 'chart.xkcd'
import Header from '@/components/Header'

export default {
    data () {
        return {
            dist: 'game',
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
        this.getEmot(this.dist)
    },
    methods: {
        inputBlur() {
            // ios
            window.scroll(0,0);
        },
        getEmot(dist) {
            const svg = document.querySelector('.pie_chart')
            feel({dist: dist}).then(data => {
                console.debug("data", data)
                if (data.err == '0') {
                    const pieChart = new chartXkcd.Pie(svg, {
                        title: "today's mood", // optional
                        data: {
                            labels: ['负向', '中性', '正向'],
                            datasets: [{
                                data: [data.data.negative, data.data.normal, data.data.positive],
                            }],
                        },
                        options: { // optional
                            innerRadius: 0.5,
                            legendPosition: chartXkcd.config.positionType.upRight,
                        },
                    });
                }
            })
            
            
        },
        changeDist(item) {
            this.dist=item.dist
            this.getEmot(item.dist)
            this.$router.replace('/emot/' + item.dist)
        }
    }
}
</script>

<style>

</style>
