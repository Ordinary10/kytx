<template>
	<view class="page">
		
		<view class="info mt20">
			<view class="border-f1">
			</view>
			<view class="item pdt15">
				 <text> 可用余额：</text>
				 <text class="c-red"> ¥30</text>
			</view>
			<view class="border-f1">
			</view>
			<view class="ft26 c-666 mt45">
				请输入使用金额
			</view>
			<view class="money_input">
				<text class="mr10" style="font-size: 56upx;">￥</text>
				<input type="text" value="600.34" />
			</view>
			<view class="border-f1">
			</view>
		</view>
		<view style="flex: 1;overflow: hidden;" class="bjfff mt20">
			<view class="btn flex-c" :style="{'opacity':use_save?'1':'0.52'}" @click="save">
				确认
			</view>
		</view>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				
				userImg:'https://dmkqiniu.medsnk.cn/sk_ssk.png',
				use_save:false
			}
		},
		onShow() {
			let that = this
			if (!that.have_password) {
				that.$refs.have_password.open()
			}
			

		},
		methods: {
			save(){
				// uni.navigateTo({
				// 	url:'./transfer_res'
				// })
			}

		}
	}
</script>

<style lang="scss">
	.info {
		padding: 0 29upx;
		background: #fff;
	}
	.item {
		display: flex;
		align-items: center;
		// justify-content: space-between;
		height: 100upx;
		color: #333;
		font-size: 28upx;
		image {
			width: 48upx;
			height: 48upx;
			margin-right: 20upx;
		}
	}

	.money_input {
		padding: 30upx 0 28upx;
		font-weight: bold;
		display: flex;
		align-items: baseline;

		input {
			color: #333333;
			font-size: 76upx;
			border: none;
			height: 76upx;
		}
	}

	.page {
		height: 100vh;
		// position: absolute;
		// top: 0;
		// right: 0;
		// left: 0;
		// bottom: 0;
		display: flex;
		flex-direction: column;
	}

	.btn {
		margin: 60upx 55upx 0;
		color: #fff;
		font-size: 30upx;
		height: 90upx;
		border-radius: 45upx;
		background: linear-gradient(-90deg, rgba(249, 50, 38, 1), rgba(254, 139, 52, 1));
		box-shadow: 0px 10upx 20upx 0px rgba(226, 27, 14, 0.1);
	}

</style>
