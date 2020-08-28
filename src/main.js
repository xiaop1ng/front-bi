import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// fastclick为改过源码版本
import FastClick from 'fastclick-hvue'
FastClick.attach(document.body)

import './assets/css/common.css'
import './assets/css/style.css'
import 'thinkive-hui/lib/theme-default/hui.css'

import { Toast, Loading, Alert, Confirm, DateTime } from 'thinkive-hui';


window._hvueToast = Toast;
window._hvueLoading = Loading;
Vue.prototype.$alert = Alert;
Vue.prototype.$confirm = Confirm;
Vue.prototype.$toast = function(txt) {
    Toast({mes: txt})
};
Vue.prototype.$pageBack = function() {
    this.$router.go(-1);
}
Vue.prototype.$tip = function(txt) {
    this.$alert({mes: txt});
}
Vue.use(DateTime)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')