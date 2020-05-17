<template>
	<view class="page">
		<view class="title ft32 c-333 flex-a-c">
			<image src="https://dmkqiniu.medsnk.cn/tx_ts.png" mode=""></image>
			最高可抵扣30元
		</view>
		
		<view class="info mt20">
			<view class="border-f1">
			</view>
			<view class="item pdt15" @click="select_type">
				<view class="flex-a-c">
					<view class="common_moeny mr20"></view>
					<text>DMK   0.5元/枚   余额:300枚</text>
				</view>
				<view class="iconMore">
				</view>
			</view>
			<view class="border-f1">
			</view>
			<view class="ft26 c-666 mt45">
				使用数量(枚)
			</view>
			<view class="money_input">
				<input type="text" value="600.34" />
			</view>
			<view class="ft26 c-666 mb30">
				<text>抵扣金额 </text>
				<text class="c-red ml5 mr5"> 30 </text>
				<text>元 </text>
			</view>
			<view class="border-f1">
			</view>
		</view>
		<view style="flex: 1;overflow: hidden;" class="bjfff mt20">
			<view class="btn flex-c" :style="{'opacity':use_save?'1':'0.52'}" @click="save">
				确认
			</view>
		</view>
		<uni-popup ref="select_type" type="bottom">
			<view class="select_type_box">
				<view class="title ft34 c-0e0e0 flex-c">
					<image @click="close_select_box" class="close" src="https://dmkqiniu.medsnk.cn/22.png" mode=""></image>
					<view class="e te">
						选择抵扣
					</view>
				</view>
				<view class="border-f1">
				</view>
				<scroll-view scroll-y="true" class="select_items">
					<view class="select_item flex-a-c" v-for="i in 5" :key="i">
						<view class="common_moeny mr20">
						</view>
						<view class="ellipsis">
							0.1元/枚
						</view>
						<view class="ellipsis">
							余额 500枚
						</view>
					</view>
				</scroll-view>


			</view>
		</uni-popup>
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
				// 设置支付密码
				have_password: true,
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
			// 选择币种
			select_type() {
				let that = this
				that.$refs.select_type.open()
			},
			// 关闭选择币种
			close_select_box(){
				let that = this
				that.$refs.select_type.close()
			},
			save(){
				uni.navigateTo({
					url:'./transfer_res'
				})
			}

		}
	}
</script>

<style lang="scss">
	
	.info {
		padding: 0 29upx;
		background: #fff;
	}
	.title{
		background: #FFFFFF;
		height: 100upx;
		padding: 0 20upx;
		image {
			width: 40upx;
			height: 40upx;
			margin-right: 22upx;
		}
		
	}
	.item {
		display: flex;
		align-items: center;
		justify-content: space-between;
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

	

	.select_type_box {
		background: #FFFFFF;

		.title {
			height: 100upx;
			padding: 0 23upx;
			position: relative;

			.close {
				width: 30upx;
				height: 30upx;
				position: absolute;
				left: 23upx;
				top: 35upx;
			}
		}

		.select_items {
			padding: 0 28upx;
			max-height: 520upx;

			.select_item {
				height: 127upx;
				border-bottom: 1upx solid #F1F1F1;
				font-size: 28upx;
				color: #111;

				image {
					width: 48upx;
					height: 48upx;
					margin-right: 17upx;
				}
			}
		}

	}
</style>
