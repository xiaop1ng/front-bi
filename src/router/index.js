import Vue from 'vue'
import Router from 'vue-router'
import { setTransitionName, setPageTitle, cancelRequest } from 'thinkive-hvue'

//可以根据菜单栏目 把页面路由分组到各栏目模块中，再引入来扩展
Vue.use(Router)
import Index from '@/views/index.vue' // 首页
import Tag from '@/views/tag.vue'
import Word from '@/views/word.vue'
import Page404 from '@/views/page404.vue' // 404 错误页

/*
  路由懒加载采用官方推荐的ES6 import()语法，
  webpackChunkName相同会打包成一个模块，不同则为不同模块
*/
const router = new Router({
    //路由模式：history, hash. 默认设置为 history
    mode: 'hash',
    //采用history模式时，要设置base路径; hash模式不用设置(注释掉)
    //环境变量BASE_URL同步publicPath设置
    base: process.env.BASE_URL,
    scrollBehavior(to, from, savedPosition) {
        // 页面滚动行为, 保持缓存页面的滚动位置, 否则返回页面顶部 
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
    routes: [{
            path: '/index',
            name: 'index',
            component: Index
        },
        {
            path: '/index/:dist',
            name: 'indexDist',
            component: Index
        },
        {
            path: '/',
            redirect: 'index',
        },
        {
            path: '/tag',
            name: 'tag',
            component: Tag
        },
        {
            path: '/:dist/word/:key',
            name: 'word',
            component: Word
        },
        {
            path: '*',
            name: 'page404', // 404 页面
            component: Page404
        }
    ]
})

router.beforeEach((to, from, next) => {
    //页面切换动画
    if (from.name == 'tag' || from.name == 'index' || from.name == 'rank') {
        router.app.$store.commit("router/updateDirection", "")
    } else {
        setTransitionName();
    }
        
    //cancelRequest();
    // if ( to.name == 'index' && from.name == 'result') {
    //     // 去往首页，设置动画
    //     router.app.$store.commit("router/updateDirection","right")
    // } else {
    //     setTransitionName();
    // }
    
    next();
});

router.afterEach((route) => {
    //页面切换更改title
    //这里可以根据业务需求调整取title的顺序
    //默认先取业务跳转参数query中title，再取路由元信息中title
    if (route.query.title) {
        setPageTitle(route.query.title)
    } else if (route.meta.title) {
        setPageTitle(route.meta.title)
    }
})

export default router;