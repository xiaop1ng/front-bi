<template>
    <footer>
        <div class="ui layout footer-nav-inner">
            <div v-for="nav in navs" :key="nav.index" :class="'row-1 nav-0' + nav.index">
                <a @click="toPage(nav)" :class="'nav-item ' + (idx == nav.index ?' active':'') ">{{nav.name}}</a>
            </div>
        </div>
    </footer>
</template>

<script>

export default {
    name:'etfFooter',
    data() {
        return {
            navs: [
                {
                    index: 1,
                    name: '首页',
                    target: '/'
                },
                {
                    index: 2,
                    name: '标签云',
                    target: '/tag'
                },
                // {
                //     index: 3,
                //     name: '排行',
                //     target: '/rank'
                // }
            ],
        }
    },
    props: {
        idx: {
            type: Number,
            default: 0
        }
    },
    created() {
    },
    mounted () {
    	
    },
   	methods: {
        toPage(nav) {
            if (this.idx == nav.index) return
            if (nav.target) {
                // 跳转指定页面
                this.$router.push({
                    path: nav.target
                });
            }
        },
	}
}
</script>

<style scoped>

</style>