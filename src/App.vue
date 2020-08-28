<template>
    <div id="app" class="app_wrap bneedsfocus page">
        <transition :name="`${$store.state.router.direction}`">
        	<router-view/>
    	</transition>
    </div>
</template>
<script>
import { getSession, setSession, clearSession, getUrlParams } from 'thinkive-hvue'
import service from  '@/service/mobileService'
import common from '@/util/common'
import IosAndorid from '@/util/iosAndroid'

export default {
    name: 'App',
    data() {
        return {

        }
    },
    beforeCreate() {
        
    },
    created() {
        console.debug("app created invoke!");
    },
    methods: {
        pageBack() {
            this.$router.go(-1)
        },
    }
}
</script>
<style lang="scss">
/* page transition css  start*/
.app_wrap{position: fixed; left: 0; top: 0; width: 100%; overflow: hidden; height:100%;}
.page_header{ position: relative; z-index: 0;}
.page_main{position: fixed; left: 0; top:44px; right: 0; height: calc(100% - 44px); overflow:auto}

.left-enter-active,
.left-leave-active,
.right-enter-active,
.right-leave-active {
  transition: all .3s;
}
.left-enter {
  opacity: .5;
  transform: translate3d(100%, 0, 0);
}
.left-leave-active {
  opacity: .5;
  transform: translate3d(-100%, 0, 0);
}
.right-enter {
  opacity: .5;
  transform: translate3d(-100%, 0, 0);
}
.right-leave-active {
  opacity: .5;
  transform: translate3d(100%, 0, 0);
}
/* page transition css  end*/

/* thinkive-hui root css */
html{ font-size: 100px; touch-action: none}


#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
