import Vue from 'vue'
import App from './App'
import common from './assets/js/common.js'
import { api } from './api/request.js'
import store from "./store"
import filters from './assets/js/filters.js'
import './assets/scss/index.scss'
import './assets/css/xy.css'
import uView from "@/uview";
Vue.use(uView);

Vue.config.productionTip = false
App.mpType = 'app'

Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})
Vue.prototype.$common = common
Vue.prototype.$validate = common.validate
Vue.prototype.$api = api
const app = new Vue({
	...App,
	store
})
app.$mount()
