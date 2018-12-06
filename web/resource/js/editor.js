import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from '../axios/api.vue';
Vue.prototype.$api = axios;
Vue.use(VueRouter)
import myMenu from './components/menu/index.vue';
import router from './router/index.js';
require("./src/smartresize");

let _myApp = new Vue({
    components: { editor },
	el: "#app",
	template: '<div class="right_col" role="main" id="app"><router-view></router-view></div>',
	router
});


let _myMenu = new Vue({
	el: "#app_menu",
	router,
	components: { myMenu },
	template: '<myMenu />'
});


