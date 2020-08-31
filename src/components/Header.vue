<template>
    <header>
        <div class="header-inner">
            <h1 @click="menuShow = !menuShow">{{title}}<img src="../assets/images/arrow-down.png" style="height: .20rem;"/></h1>
        </div>
        <h-actionsheet :actions="menu" v-model="menuShow"></h-actionsheet>
    </header>
    
</template>

<script>
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
                    this.onChange(item);
                }
            },{
                label: '实事新闻',
                dist: 'news',
                callback: item => {
                    this.onChange(item);
                }
            },{
                label: 'v2ex',
                dist: 'explore',
                callback: item => {
                    this.onChange(item);
                }
            }],
            menuShow: false,
            dist: 'game' 
        }
    },
    created(){
        this.menu.forEach(T => {
            this.dist = this.$route.params.dist || 'game'
            if(T.dist == this.dist) {
                this.title = T.label
                return false
            }
        })
    },
    methods: {
        onChange(item) {
            if (item.dist == this.dist) return
            this.dist = item.dist
            this.title = item.label
            this.$emit('menuChange', item)
        }
    }
}
</script>

<style>

</style>