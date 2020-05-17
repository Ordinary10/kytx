<template>
	<view id="popup" v-if="popupShow"></view>
	<view class="content" v-else>
		<navigator class="addressBox flex-a-c flex-b" v-if="address" url="/pages/my/address/index?isCard=1">
			<view class="flex-a-c">
				<image class="mr20" src="https://dmkqiniu.medsnk.cn/assets/img/order/add.png" mode=""></image>
				<view style="max-width: 560upx;">
					<view class="">
						<text class="ft32 c-111 mr15">{{address.consignee}}</text>
						<text class="c-666 ft22">{{address.mobile}}</text>
					</view>
					<view class="ft26 ellipsis2 c-333">
						{{address.city_name}}{{address.province_name}}{{address.district_name}}{{address.address}}
					</view>
				</view>
			</view>
			<i class="ml10 iconMore"></i>
		</navigator>
		<view v-else class="add_address flex-c">
			<navigator class="flex-c" url="/pages/my/address/add">添加收货地址</navigator>
		</view>

		<view class="mt20">
			<view class="item" v-for="(item,index) in list" :key="index">
				<view class="goods-list-item">
					<view class="img">
						<image :src="item.goods_thumb" mode=""></image>
					</view>
					<view class="info">
						<view class="">
							<view class="title">
								{{item.goods_name}}
							</view>
							<view class="title2" v-if="item.attr_detail&&item.attr_detail.length>0">
								<view v-for="(val,i) in item.attr_detail" :key="i">
									{{ val.attr_name }} {{ val.attr_value }}
								</view>
							</view>
						</view>
						<view class="caozuo">
							<view class="ft24 c-red fw">￥{{item.show_price}}</view>
							<view class="ft26 c-666">x{{item.buy_num}}</view>
						</view>
					</view>

				</view>
			</view>
		</view>
		<view class="mt20 info">
			<view class="flex-b-c info_item ft28">
				<view class="flex-a-c">
					<view class="left">
						商品金额：
					</view>
				</view>
				<view class=" c-red">
					￥{{data.total_price}}
				</view>
			</view>
			<view class="flex-b-c info_item ft28">
				<view class="flex-a-c">
					<view class="left">
						DMK：
					</view>
					<view class="c-999">
						共{{data.heart_balance}},可用{{data.total_heart_num}}
					</view>
				</view>
				<view class=" c-red">
					￥-{{data.total_heart_num}}
				</view>
			</view>
			<view class="flex-b-c info_item ft28">
				<view class="flex-a-c">
					<view class="left">
						运费：
					</view>
				</view>
				<view class=" c-red">
					￥{{data.shipping_fee}}
				</view>
			</view>
			<view class="flex-b-c info_item ft28">
				<view class="flex-a-c">
					<view class="left">
						留言：
					</view>
					<view>
						<input type="text" v-model="postscript" placeholder-class="c-999" placeholder="给卖家留言" />
					</view>
				</view>
			</view>
		</view>
		<view class="jiesuanBox flex-a-c flex-b ft28 c-333">
			<view class="flex-a-c">
				<view class="ft30 mr20">
					<text>实付金额：</text>
					<text class="c-red">￥{{data.pay_fee}}</text>
				</view>
			</view>
			<view class="flex-a-c">
				<view class="btn" @click="save">
					提交订单
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				popupShow: true,
				postscript: '',
				data: null,
				parmas: null,
				address: null
			}
		},
		computed: {
			list() {
				return this.data.detail
			}
		},
		onLoad(option) {
			this.parmas = option.data || ''
			this.getOrderData()
		},
		async onShow() {
			await this.$common.getAddressList()
			const addressList = this.$store.state.addressList
			if (addressList.length > 0) {
				let address = addressList.find(item => {
					return item.is_default === '1'
				})
				this.address = address ? JSON.parse(JSON.stringify(address)) : JSON.parse(JSON.stringify(addressList[0]))
			} else {
				this.address = null
			}
		},
		methods: {
			async getOrderData() {
				const {
					code,
					data
				} = await this.$api({
					url: 'app/order/getOrderPrevInfo',
					data: {
						detail: this.parmas
					}
				})
				if (code) {
					this.data = data
					this.popupShow = false
				}
			},
			async save() {
				const parmas = {
					address_id: this.address.address_id || 0,
					postscript: this.postscript,
					detail: this.parmas
				}
				if(parmas.address_id === 0) {
					this.$common.toast('请选择收货地址')
				} else {
					const { code, msg, data} = await this.$api({
						url: 'app/order/edit',
						data: parmas
					})
					if(code) {
						this.$common.toast(msg)
						let timer = setTimeout(function() {
							uni.redirectTo({
								url: './order_detail?order_id='+data.order_id
							})
						}, 1000)
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	.addressBox {
		height: 136upx;
		background: #fff;
		padding: 25upx;

		image {
			height: 58upx;
			width: 58upx;
		}
	}

	.add_address {
		width: 100%;
		height: 136rpx;

		navigator {
			height: 60rpx;
			line-height: 60rpx;
			border: 2rpx solid #d1d1d1;
			border-radius: 30rpx;
			font-size: 24rpx;
			color: #333;
			padding: 0 120rpx;
		}
	}

	.info {
		background: #fff;

		.info_item {
			margin: 0 29upx;
			padding: 25upx 0;
			border-bottom: 1upx solid #f1f1f1;
		}

		.left {
			font-weight: 400;
			width: 140upx;
		}

		input {
			width: 560upx;
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
		height: 100upx;
		box-sizing: border-box;
		padding: 20upx 24upx;
		background: #fff;

		.btn {
			height: 60upx;
			line-height: 60upx;
			background: linear-gradient(-46deg, rgba(249, 50, 38, 1), rgba(254, 139, 52, 1));
			border-radius: 30upx;
			padding: 0 38upx;
			color: #fff;
		}
	}

	.item {
		background: #fff;
		padding: 0 24upx;

		.goods-list-item {
			border-bottom: 2upx solid #F1F1F1;
			padding: 26upx 0;
		}

		&:last-of-type {
			.goods-list-item {
				border: none;
			}
		}
	}
</style>
