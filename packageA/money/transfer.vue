<template>
	<view class="page">
		<view class="caozuo_title">
			<view class="" @click="transfer_list">
				转账明细
			</view>
		</view>
		<view class="border-f1">
		</view>
		<view class="info">
			<view class="item">
				<!-- <view class="c-333">
					134 3453 2344
				</view> -->
				<view class="flex-a-c">
					<image class="userImg" :src="userImg" mode=""></image>
					<view class="ft28 c-111">
						转账给徐心心(*三三)
					</view>
				</view>
			</view>
			<view class="border-f1">
			</view>
			<view class="item pdt15" @click="select_type">
				<view class="">
					<text>转账币种</text>
					<text>RMB</text>
					<text>(余额:¥300)</text>
				</view>
				<image src="https://dmkqiniu.medsnk.cn/4.png" mode=""></image>
			</view>
			<view class="border-f1">
			</view>
			<view class="ft26 c-666 mt45">
				金额
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
				确认转账
			</view>
		</view>
		<uni-popup :maskClick="false" ref="have_password" type="center">
			<view class="no_password_box">
				<view class="flex-c">
					<image src="https://dmkqiniu.medsnk.cn/wxts_tt.png" mode=""></image>
				</view>
				<view class="ft36 c-red mt35">
					温馨提示
				</view>
				<view class="ft32 c-666 mt20">
					您还未设置支付密码
				</view>
				<view class="go_btn flex-c">
					去设置
				</view>
				<view class="close">
					<image src="https://dmkqiniu.medsnk.cn/22.png" mode=""></image>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="select_type" type="bottom">
			<view class="select_type_box">
				<view class="title ft34 c-0e0e0 flex-c">
					<image @click="close_select_box" class="close" src="https://dmkqiniu.medsnk.cn/22.png" mode=""></image>
					<view class="e te">
						选择转账币种
					</view>

				</view>
				<view class="border-f1">
				</view>
				<scroll-view scroll-y="true" class="select_items">
					<view class="select_item flex-a-c" v-for="i in 5" :key="i">
						<image src="https://dmkqiniu.medsnk.cn/sk_ssk.png" mode=""></image>
						<view class="ellipsis">
							BTC (余额 400btc)
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
			},
			transfer_list(){
				uni.navigateTo({
					url:'./transfer_list'
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

	.item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		// padding: 0 30upx;
		height: 100upx;
		color: #666;
		font-size: 28upx;
		image {
			width: 26upx;
			height: 26upx;
		}
		.userImg{
			width: 71upx;
			height: 71upx;
			margin-right: 15upx;
			border-radius: 50%;
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

	.no_password_box {
		width: 517upx;
		height: 564upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 10upx;
		text-align: center;
		position: relative;

		image {
			width: 304upx;
			height: 214upx;
			margin-top: 37upx;
		}

		.close {
			position: absolute;
			top: 20upx;
			right: 20upx;

			image {
				width: 32upx;
				height: 32upx;
				margin: 0;
			}
		}

		.go_btn {
			width: 381upx;
			height: 75upx;
			background: linear-gradient(-90deg, rgba(230, 68, 54, 1), rgba(240, 143, 73, 1));
			box-shadow: 0px 10upx 20upx 0px rgba(102, 37, 188, 0.1);
			border-radius: 37upx;
			margin: 40upx auto 0;
			color: #fff;
		}
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
