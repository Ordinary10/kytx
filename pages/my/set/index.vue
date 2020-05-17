<template>
	<view>
		<navigator class="item mt20" url="/pages/my/set/password">
			<view class="">
				设置交易密码
			</view>
			<image src="https://dmkqiniu.medsnk.cn/4.png" mode=""></image>
		</navigator>
		<view class="border-f1"></view>
		<navigator class="item " url="/pages/my/set/feedback">
			<view class="">
				意见反馈
			</view>
			<image src="https://dmkqiniu.medsnk.cn/4.png" mode=""></image>
		</navigator>
		<navigator class="item mt20" url="/pages/login/protocol">
			<view class="">
				隐私协议
			</view>
			<image src="https://dmkqiniu.medsnk.cn/4.png" mode=""></image>
		</navigator>
		<view class="btn flex-c" @click="loginOut">
			退出登录
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			loginOut() {
				const _this = this
				uni.showModal({
					title: '提示',
					content: '是否退出当前账号？',
					success({ confirm, cancel }) {
						if(confirm) {
							_this.$store.state.userInfo = ''
							uni.reLaunch({
								url: '/pages/login/index'
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
.item{
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 30upx;
	background: #fff;
	height: 88upx;
	color: #666;
	font-size: 28upx;
	image{
		width: 20upx;
		height: 20upx;
	}
}
.btn{
	margin: 104upx 80upx 0;
	color: #fff;
	font-size: 30upx;
	height: 90upx;
	border-radius: 45upx;
	background:linear-gradient(-90deg,rgba(249,50,38,1),rgba(254,139,52,1));
	box-shadow:0px 10upx 20upx 0px rgba(226,27,14,0.1);
}
</style>
