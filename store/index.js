import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		// 登录用户信息
		get userInfo() {
			return uni.getStorageSync('KWTX_USERINFO')
		},
		set userInfo(value) {
			uni.setStorageSync('KWTX_USERINFO', value)
		},
		get isLogin() {
			return uni.getStorageSync('KWTX_USERINFO') ? true : false
		},
		// 商品分类筛选基础数据
		get goodsCategory() {
			return uni.getStorageSync('KWTX_GoodsCategory')
		},
		set goodsCategory(value) {
			uni.setStorageSync('KWTX_GoodsCategory', value)
		},
		get isGoodsCategory() {
			return uni.getStorageSync('KWTX_GoodsCategory') ? true : false
		},
		shopCardList: [],
		addressList: [],
		myInfo: null
	},
	mutations: {
		setShopCardList(state, data) {
			state.shopCardList = JSON.parse(JSON.stringify(data || []))
		},
		setAddressList(state, data) {
			state.addressList = JSON.parse(JSON.stringify(data))
		},
		setMyInfo(state, data) {
			state.myInfo = JSON.parse(JSON.stringify(data))
		}
	},
	actions: {
	}
})

export default store