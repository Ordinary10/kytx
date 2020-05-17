<template>
	<view class="">
		<view class="userBox ">
			<image class="wh100b" src="https://dmkqiniu.medsnk.cn/tx_bg.png" mode=""></image>
			<view class="mmoney_list ft32 c-fff" style="position: absolute;right: 30upx;top: 100upx;" @click="go_list">
				资金明细
			</view>
			<view class="user flex-column-c">
				<view class="ft28 flex-a-c">
					总资产(元)
					<image src="https://dmkqiniu.medsnk.cn/25.png" mode=""></image>
				</view>
				<view class="money">
					72,045.00
				</view>
				<view class="ft28 flex-a-c">
					今日收益(元) 200.00
					<image src="https://dmkqiniu.medsnk.cn/25.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="signBox">
			<view class="flex-a-c">
				<view class="caozuo flex-column-c" @click="charge">
					<image src="https://dmkqiniu.medsnk.cn/ye_cz.png" mode=""></image>
					<view class="c-111 mt10">
						充值
					</view>
				</view>
				<view class="line"></view>
				<view class="caozuo flex-column-c" @click="transfer">
					<image src="https://dmkqiniu.medsnk.cn/ye_zz.png" mode=""></image>
					<view class="c-111 mt10">
						转账
					</view>
				</view>
			</view>
		</view>
		<view class="tixian_box">
			<view class="ft28 c-666">
				可提现(元)
				<image src="https://dmkqiniu.medsnk.cn/23.png" mode=""></image>
			</view>
			<view class="flex-b-c mt35">
				<view style="font-size: 42upx;" class="fw c-111">
					600.00
				</view>
				<view class="tixian_btn flex-c" @click="out">
					提现
				</view>
			</view>
		</view>

		<view class="items">
			<view class="item" v-for="(item, index) in dataList" :key="index">
				<view class="">
					<view class="flex-a-c">
						<text class="ft28 c-666 ">冻结(DMK)</text>
						<image class="help" src="https://dmkqiniu.medsnk.cn/23.png" mode=""></image>
					</view>
					<view class="ft40 c-111 mt35">
						453
					</view>
				</view>
				<image src="https://dmkqiniu.medsnk.cn/4.png" mode=""></image>
			</view>
		</view>

	</view>

</template>

<script>
	export default {
		data() {
			return {
				dataList: [
					'', ''
				]
			};
		},
		methods: {
			charge() {
				uni.navigateTo({
					url: './charge'
				})
			},
			out() {
				uni.navigateTo({
					url: './out'
				})
			},
			transfer() {
				uni.navigateTo({
					url: './transfer'
				})
			},
			go_list() {
				uni.navigateTo({
					url: './list'
				})
			}
		}
	}
</script>

<style lang="scss">
	.userBox {
		height: 460upx;
		position: relative;

		.user {
			position: absolute;
			top: 162upx;
			left: 0upx;
			right: 0upx;
			color: #fff;

			image {
				width: 28upx;
				height: 28upx;
				margin-left: 15upx;
			}

			.money {
				font-size: 72upx;
				margin: 25upx 0;
			}
		}
	}


	.title {
		height: 97upx;
		padding: 0 30upx;
		margin-top: 86upx;
		background: #fff;

	}

	.signBox {
		background: #fff;
		height: 135upx;
		padding: 25upx;
		box-sizing: border-box;
		position: absolute;
		top: 411upx;
		left: 20upx;
		right: 20upx;
		border-radius: 10upx;

		.caozuo {
			flex: 1;
			font-size: 28upx;

			image {
				width: 42upx;
				height: 42upx;
			}
		}

		.line {
			width: 2upx;
			height: 46upx;
			background: rgba(241, 241, 241, 1);
		}
	}

	.tixian_box {
		margin: 106upx 20upx 0;
		box-sizing: border-box;
		height: 200upx;
		background: #fff;
		border-radius: 20upx;
		padding: 24upx;

		image {
			width: 30upx;
			height: 30upx;
			margin-left: 28upx;
		}

		.tixian_btn {
			width: 136upx;
			height: 60upx;
			border: 2upx solid rgba(16, 64, 246, 1);
			border-radius: 30upx;
			color: #1040F6;
			font-size: 28upx;
		}
	}

	.items {
		margin: 20upx 20upx;
		width: 710upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 20upx;
	}

	.item {
		padding: 0 28upx;
		height: 179upx;
		border-bottom: 1upx solid #F1F1F1;
		display: flex;
		align-items: center;
		justify-content: space-between;

		image {
			height: 30upx;
			width: 30upx;
		}

		.help {
			height: 30upx;
			width: 30upx;
			margin-left: 28upx;
			display: block;
		}
	}
</style>
