<script>
	export default {
		globalData: {
			wxCode: '',
			cityData: null
		},
		onLaunch() {
			const _this = this
			uni.login({
				success(res) {
					_this.globalData.wxCode = res.code
				},
				fail(err) {
					console.error(err)
				}
			})
			wx.request({
				url: 'https://dmkqiniu.medsnk.cn/assets/json/city.json',
				method: 'GET',
				timeout: 15 * 1000,
				success(res) {
					_this.globalData.cityData = res.data
				},
				fail(err) {
					console.error(err)
				}
			})
		},
		onShow() {
		},
		onHide() {
		}
	}
</script>

<style lang="scss">
	page{
		background: #F3F4F5;
		height: 100%;
	}
	uni-tabbar .uni-tabbar__icon{
		width: 40upx !important;
		height: 40upx !important;
	}
	uni-tabbar .uni-tabbar-border{
		    background-color:#B4B4B4 !important;
	}
</style>
