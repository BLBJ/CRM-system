/**
 * @author wbding
 * @date 2018/10/17.
 * @description
 */
import Vue from 'vue';
import axios from '../axios/api.vue';
Vue.prototype.$api = axios;
import Plugins from './plugins/components.js';
Vue.use(Plugins);

import Login from './components/login/index.vue';
import Register from './components/register/index.vue';


let _myApp = new Vue({
    el: "#login",
    components: {Login},
    template: '<Login />'
});

let phone = new Vue({
    el: '#register',
    components: {Register},
    template: '<Register />'
});