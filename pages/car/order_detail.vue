<template>
	<view id="popup" v-if="popupShow"></view>
	<view class="content" v-else>
		<view class="time_box c-fff positionR">
			<image style="width: 100%;height: 100%;" src="https://dmkqiniu.medsnk.cn/18.png" mode=""></image>
			<view class="positionA" style="left: 31upx;top:30upx;right: 31upx;">
				<view class="flex-a-c ">
					<image v-if="data.order_status === 1" src="https://dmkqiniu.medsnk.cn/19.png" mode=""></image>
					<image v-else src="https://dmkqiniu.medsnk.cn/assets/img/order/qx.png" mode=""></image>
					<view class="ft36 ml15">
						{{data.status_name}}
					</view>
				</view>
				<view class="ft26 mt15">
					{{data.status_desc}}
				</view>
			</view>
		</view>
		<view class="addressBox flex-a-c flex-b mt20">
			<view class="flex-a-c">
				<image class="mr20" src="https://dmkqiniu.medsnk.cn/user_location.png" mode=""></image>
				<view style="max-width: 560upx;">
					<view class="">
						<text class="ft32 c-111 mr15">{{data.consignee}}</text>
						<text class="c-666 ft22">{{data.mobile}}</text>
					</view>
					<view class="ft26 ellipsis2 c-333">
						{{data.province}}{{data.city}}{{data.district}}{{data.address}}
					</view>
				</view>
			</view>
		</view>

		<view class="mt20 bjfff">
			<view class="card_title">
				商品详情
			</view>
			<view class="item" v-for="(item,index) in data.detail" :key="index">
				<view class="goods-list-item">
					<view class="img">
						<image :src="item.goods_thumb" mode=""></image>
					</view>
					<view class="info">
						<view class="">
							<view class="title">
								{{item.goods_name}}
							</view>
							<view class="title2" v-for="(val,i) in item.attr_detail" :key="i">
								{{val.attr_name}}:{{val.attr_value}}
							</view>
						</view>
						<view class="caozuo">
							<view class="ft24 c-red fw">￥{{item.buy_price}}</view>
							<view class="ft26 c-666">x{{item.buy_num}}</view>
						</view>
					</view>

				</view>
			</view>
			<view class="pd29-lr flex-b-c c-111 ft26 pdt20 pdb20">
				<view class="">
					商品总额
				</view>
				<view class=" ">￥{{data.goods_amount}}</view>
			</view>
			<view class="pd29-lr flex-b-c c-111 ft26 pdt20 pdb20">
				<view class="">
					运费
				</view>
				<view class=" ">￥{{data.card_fee}}</view>
			</view>
			<view class="border-f1 mt10">
			</view>
			<view class="clearBox ft26 fw pdr25 pdt30 pdb30">
				<view class="fr">
					<text class="c-111">共{{data.detail.length}}件商品 总计：</text>
					<text class="c-red">￥{{data.goods_amount}}</text>
				</view>
			</view>
		</view>
		<view class="mt20 bjfff ft28">
			<view class="card_title">
				订单详情
			</view>
			<view class="flex-a-c pd29-lr pdt30 pdb15">
				<view class="c-666 mr50">
					订单编号
				</view>
				<view class="c-333">
					{{data.order_sn}}
				</view>
			</view>
			<view class="flex-a-c pd29-lr pdt15 pdb28">
				<view class="c-666 mr50">
					下单时间
				</view>
				<view class="c-333">
					{{data.add_time}}
				</view>
			</view>
		</view>
		<view class="jiesuanBox flex-a-c  ft24 c-333">

			<view class="flex-a-c">
				<view class="btn default_btn" @click.stop="delOrder()" v-if="data.order_status < 5 || data.order_status >= 30">
					删除订单
				</view>
			</view>
			<view class="flex-a-c">
				<view class="btn default_btn" @click.stop="cancelOrder()" v-if="data.order_status < 5">
					取消订单
				</view>
			</view>
			<view class="flex-a-c">
				<view class="btn" @click.stop="buyOrder()" v-if="data.order_status === 1">
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
				order_id: '',
				data: null,
				popupShow: true,

				goodsList: [{
						id: 1,
						goods_price: 168,
						goods_number: 1
					},
					{
						id: 2,
						goods_price: 169,
						goods_number: 2
					},

				],
				all_price: 240
			};
		},
		onLoad(option) {
			this.order_id = option.order_id
			this.getData()
		},
		methods: {
			async getData() {
				const {
					code,
					data
				} = await this.$api({
					url: 'app/order/getDetailInfo',
					data: {
						order_id: this.order_id
					}
				})
				if (code) {
					this.data = data
					this.popupShow = false
				}
			},
			buyOrder() {
				uni.navigateTo({
					url: `/pages/car/cashier?order_id=${this.data.order_id}&order_type=${this.data.pay_info.order_type_id}`
				})
			},
			async cancelOrder() {
				uni.showModal({
					title: '提示',
					content: '确定取消该订单？',
					success: async ({
						confirm
					}) => {
						if (confirm) {
							const {
								code,
								msg
							} = await this.$api({
								url: 'app/order/cancel',
								data: {
									order_id: this.data.order_id
								},
								loadingStr: '取消中...'
							})
							if (code) {
								uni.navigateBack()
							}
						}
					}
				})
			},
			async delOrder(order_id) {
				uni.showModal({
					title: '提示',
					content: '确定删除该订单？',
					success: async ({
						confirm
					}) => {
						if (confirm) {
							const {
								code,
								msg
							} = await this.$api({
								url: 'app/order/notShow',
								data: {
									order_id: this.data.order_id
								},
								loadingStr: '删除中...'
							})
							if (code) {
								uni.navigateBack()
							}
						}
					}
				})
			}

		},
	}
</script>

<style lang="scss" scoped>
	.time_box {
		// background: url('https://dmkqiniu.medsnk.cn/18.png') no-repeat center;
		background-size: 100% 100%;
		height: 196upx;
		width: 100%;

		image {
			width: 36upx;
			height: 36upx;
		}

	}

	.addressBox {
		height: 136upx;
		background: #fff;
		padding: 25upx;

		image {
			height: 58upx;
			width: 58upx;
		}
	}

	.card_title {
		color: #000000;
		font-size: 28upx;
		height: 80upx;
		line-height: 80upx;
		padding: 0 29upx;
		border-bottom: 1upx solid #F1F1F1;
	}

	.content {
		padding-bottom: 110upx;
	}

	.jiesuanBox {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 90upx;
		box-sizing: border-box;
		padding: 20upx 24upx;
		background: #fff;
		justify-content: flex-end;

		.btn {
			height: 50upx;
			line-height: 50upx;
			background: linear-gradient(-46deg, rgba(249, 50, 38, 1), rgba(254, 139, 52, 1));
			border-radius: 30upx;
			padding: 0 34upx;
			color: #fff;
			margin-left: 28upx;
		}

		.default_btn {
			border: 1px solid rgba(216, 216, 216, 1);
			box-sizing: border-box;
			background: #fff;
			color: #999;
		}
	}

	.item {
		padding: 0 18upx;

		.goods-list-item {
			border-bottom: 2upx solid #F1F1F1;
			padding: 26upx 0;
			background: #FAFAFA;

			.img {
				margin-left: 18upx;
			}

		}

		&:last-of-type {
			.goods-list-item {
				border: none;
			}
		}
	}
</style>
