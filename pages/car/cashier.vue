<template>
	<view id="popup" v-if="popupShow"></view>
	<view class="content" v-else>
		<view class="order_price ft28">
			<view class="c-333 text-c">
				订单金额
			</view>
			<view class="c-red price_box">
				<text class="">¥</text>
				<text class="price">{{data.total_price}}</text>
			</view>
		</view>
		<view class="center_box mt20 mb20">
			<view class="flex-b-c center_item" @click="go_payment(1)">
				<view class="flex-a-c">
					<image src="https://dmkqiniu.medsnk.cn/syt_ye.png" mode=""></image>
					<text class="c-111 mr15">余额支付</text>
					<text class="ft26">余额</text>
					<text class="ft26 c-red">￥{{data.balance}} </text>
				</view>
				<i class="iconMore"></i>
			</view>
			<view class="border-f1">
			</view>
			<view class="flex-b-c center_item"  @click="go_payment(2)">
				<view class="flex-a-c">
					<image src="https://dmkqiniu.medsnk.cn/syt_dsf.png" mode=""></image>
					<text class="c-111 mr15">第三方支付</text>
					<text class="ft26">最高可抵扣</text>
					<text class="ft26 c-red">0</text>
					<text class="ft26">元</text>
				</view>
				<i class="iconMore"></i>
			</view>
		</view>
		<view class="info">
			<view class="flex-b-c info_item">
				<view class="flex-a-c">
					<view class="left">
						订单金额
					</view>
				</view>
				<view class="ft32 c-111">
					{{data.total_price}}
				</view>
			</view>
			<view class="flex-b-c info_item">
				<view class="flex-a-c">
					<view class="left">
						DMK
					</view>
				</view>
				<view class="ft32 c-111">
					{{data.coin_info[0].available}}
				</view>
			</view>
			<view class="flex-b-c info_item">
				<view class="flex-a-c">
					<view class="left">
						余额
					</view>
				</view>
				<view class="ft32 c-111">
					{{data.balance}}
				</view>
			</view>
		</view>
		<view class="jiesuanBox flex-a-c flex-b c-333">
			<view class="flex-a-c">
				<view class="ft24 mr20">
					<text>应付款:</text>
					<text class="c-red ft28 mr10">￥</text>
					<text class="c-red ft44">{{data.pay_fee}}</text>
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
				data: null,
				popupShow: true
			};
		},
		onLoad(option) {
			this.getData(option)
		},
		methods: {
			async getData({ order_id, order_type }) {
				const { code, data } = await this.$api({
					url: 'app/order/getOrderPayInfo',
					data: {
						order_id,
						order_type
					}
				})
				if(code) {
					this.data = data
					this.popupShow = false
				}
			},
			go_payment(type){
				if(type==1){
					uni.navigateTo({
						url:'./payment'
					})
				}else{
					uni.navigateTo({
						url:'./payment_3'
					})
				}
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
	.center_box{
		padding-left: 33upx;
		font-size: 30upx;
		color: #C3C3C3;
		background: #fff;
		image{
			width: 50upx;
			height: 50upx;
			margin-right: 27upx;
		}
		.center_item{
			height: 150upx;
			padding-right: 25upx;
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
