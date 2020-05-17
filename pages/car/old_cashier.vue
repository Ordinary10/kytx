<template>
	<view class="content">
		<view class="order_price ft28">
			<view class="c-333 text-c">
				订单金额
			</view>
			<view class="c-red price_box">
				<text class="">¥</text>
				<text class="price">39.8</text>
			</view>
		</view>
		<view class="info">
			<view class="title">
				<image src="https://dmkqiniu.medsnk.cn/pay_zf.png" mode=""></image>
				<view class="">
					支付信息
				</view>
			</view>
			<view class="flex-b-c info_item">
				<view class="flex-a-c">
					<view class="left">
						原力
					</view>
					<view class="right">
						300
					</view>
				</view>
				<view class="">
					<image src="https://dmkqiniu.medsnk.cn/pay_kai.png" mode=""></image>
				</view>
			</view>
			<view class="flex-b-c info_item">
				<view class="flex-a-c">
					<view class="left">
						可用原力
					</view>
					<view class="right">
						30
					</view>
				</view>
			</view>
			<view class="flex-b-c info_item">
				<view class="flex-a-c">
					<view class="left">
						余额
					</view>
					<view class="right">
						¥300.34
					</view>
				</view>
				<view class="">
					<image src="https://dmkqiniu.medsnk.cn/pay_kai_pre.png" mode=""></image>
				</view>
			</view>
			<view class="flex-b-c info_item">
				<view class="flex-a-c">
					<view class="left">
						当前使用
					</view>
					<view class="right">
						¥30
					</view>
				</view>
				<view class="">
				</view>
			</view>
			
			<view class="title mt20">
				<image src="https://dmkqiniu.medsnk.cn/pay_mx.png" mode=""></image>
				<view class="">
					明细
				</view>
			</view>
			<view class="flex-b-c info_item">
				<view class="flex-a-c">
					<view class="left">
						订单金额
					</view>
				</view>
				<view class="ft32 c-111">
					39.8
				</view>
			</view>
			<view class="flex-b-c info_item">
				<view class="flex-a-c">
					<view class="left">
						原力
					</view>
				</view>
				<view class="ft32 c-111">
					-10.00
				</view>
			</view>
			<view class="flex-b-c info_item">
				<view class="flex-a-c">
					<view class="left">
						余额
					</view>
				</view>
				<view class="ft32 c-111">
					-10.00
				</view>
			</view>
		</view>
		<view class="jiesuanBox flex-a-c flex-b c-333">
			<view class="flex-a-c">
				<view class="ft24 mr20">
					<text>实付金额:</text>
					<text class="c-red ft28 mr10">￥</text>
					<text class="c-red ft44">{{all_price}}</text>
				</view>
			</view>
			<view class="flex-a-c">
				<view class="btn" @click="save">
					去支付
				</view>
			</view>
		</view>




	</view>
</template>

<script>
	export default {

		data() {
			return {
				all_price: 9.8
			};
		},


		onShow() {
			console.log()

		},
		methods: {
			init() {
				let that = this
			},
			save() {
				let that = this
				
			}


		},
		watch: {

		}

	}
</script>

<style lang="scss">
	.order_price{
		height: 186upx;
		background: #fff;
		display: flex;
		justify-content: center;
		flex-direction: column;
		.price_box{
			text-align: center;
			.price{
				font-size: 66upx;
				margin-left: 10upx;
			}
		}
	}
	.title{
		background: #FEF8F2;
		display: flex;
		align-items: center;
		height: 70upx;
		padding: 0 39upx;
		font-size: 24upx;
		color: #FF9732;
		image{
			width: 36upx;
			height: 36upx;
			margin-right: 11upx;
		}
	}
	.info {
		.info_item {
			padding: 0 29upx;
			background: #fff;
			height: 92upx;
			border-bottom: 1upx solid #f1f1f1;
			font-size: 28upx;
			color: #666;
			image{
				width: 82upx;
				height: 50upx;
			}
			.left {
				font-weight: 400;
				width: 220upx;
			}
			.right{
				color: #111111;
			}
		}

	}
	
	.content {
		padding-bottom: 120upx;
	}

	.jiesuanBox {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 128upx;
		box-sizing: border-box;
		padding: 20upx 24upx;
		background: #fff;

		.btn {
			height: 78upx;
			line-height: 78upx;
			background: linear-gradient(-46deg, rgba(249, 50, 38, 1), rgba(254, 139, 52, 1));
			border-radius: 39upx;
			padding: 0 41upx;
			color: #fff;
			font-size: 36upx;
		}
	}

	
</style>
