<template>
	<view id="popup" v-if="popupShow"></view>
	<view class="content " v-else>
		<view class="top">
			<view class="tabs_box">
				<u-tabs :list="tabs" active-color="#fe4338" :is-scroll="true" :current="tabIndex" @change="change"></u-tabs>
			</view>
			<view class="items" v-if="data.length > 0">
				<view class="item" v-for="(item,index) in lists" :key="index" @click="goDetail(item)">
					<view class="item-info">
						<view class="flex-b-c time_box">
							<view class="flex-a-c ft24 c-999">
								<image class="time_img" src="https://dmkqiniu.medsnk.cn/20.png" mode=""></image>
								<view class="">
									{{ item.add_time }}
								</view>
							</view>
							<view class="ft26 c-red">
								{{ item.status_name }}
							</view>
						</view>
						<view class="border-f1 mb10"></view>
						<view class="goods-list-item" v-for="(val, i) in item.detail" :key="i">
							<view class="img">
								<image :src="val.goods_thumb" mode=""></image>
							</view>
							<view class="info">
								<view class="">
									<view class="title">
										{{val.goods_name}}
									</view>
									<view class="title2" v-for="(v, _i) in val.attr_detail" :key="_i">
										{{v.attr_name}}:{{v.attr_value}}
									</view>
								</view>
								<view class="caozuo">
									<view class="ft24 c-red fw">￥{{val.total_buy_price}}</view>
									<view class="ft26 c-666">x{{val.buy_num}}</view>
								</view>
							</view>
						</view>
						<view class="clearBox ft26 fw  pdt25 pdb25">
							<view class="fr">
								<text class="c-111">共{{item.detail.length}}件商品 合计：</text>
								<text class="c-red">￥{{item.goods_amount}}</text>
							</view>
						</view>
					</view>
					<view class="border-f1"></view>
					<view class="btns">
						<view class="btn" @click.stop="delOrder(item.order_id)" v-if="item.order_status < 5 || item.order_status >= 30">
							删除订单
						</view>
						<view class="btn" @click.stop="cancelOrder(item.order_id)" v-if="item.order_status < 5">
							取消订单
						</view>
						<view class="btn red_btn" @click.stop="buyOrder(item)" v-if="item.order_status === 1">
							去支付
						</view>
					</view>
				</view>
				<u-loadmore v-if="data.length>0" :status="loadStatus" bg-color="#F3F4F5" />
			</view>
			<view v-if="data.length === 0 && !apiIsLoad">
				<u-empty text="订单为空" mode="order"></u-empty>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				popupShow: true,
				loadStatus: 'loading',
				tabs: [{
						name: '全部',
						status: 0
					},
					{
						name: '待付款',
						status: 1
					},
					{
						name: '待发货',
						status: 5
					},
					{
						name: '待收货',
						status: 10
					},
					{
						name: '待评价',
						status: 15
					},
					{
						name: '退款/售后',
						status: 20
					}
				],
				data: [],
				tabIndex: 0,
				status: 0,
				page: 1,
				pagesize: 10,
				apiIsLoad: false
			}
		},
		computed: {
			lists() {
				return this.data
			}
		},
		onLoad(option) {
			this.status = Number(option.status || 0)
			this.tabIndex = this.tabs.findIndex(item => {
				return item.status === this.status
			})
		},
		onShow() {
			this.getData(true)
		},
		onHide() {
			this.data = []
			this.tabIndex = 0
			this.status = 0
			this.popupShow = true
		},
		async onPullDownRefresh() {
			this.tabIndex = 0
			this.status = 0
			this.page = 1
			this.data = []
			await this.getData(true)
			uni.stopPullDownRefresh()
		},
		onReachBottom() {
			if (this.loadStatus === 'loading') {
				this.page++
				this.getData()
			}
		},
		methods: {
			async getData(isLoad = false) {
				this.apiIsLoad = true
				const {
					code,
					data
				} = await this.$api({
					url: 'app/order/getLists',
					data: {
						page: this.page,
						pagesize: this.pagesize,
						status: this.status
					},
					loading: isLoad
				})
				if (code) {
					this.data = [...this.data, ...data.lists]
					this.loadStatus = data.count > this.pagesize ? 'loading' : 'nomore'
					this.apiIsLoad = false
					this.popupShow = false
				}
			},
			change(val) {
				this.tabIndex = val
				this.status = this.tabs[val].status
				this.page = 1
				this.loadStatus = 'loading'
				this.data = []
				this.getData(true)
			},
			buyOrder(item) {
				uni.navigateTo({
					url: `/pages/car/cashier?order_id=${item.order_id}&order_type=1`
				})
			},
			goDetail(item) {
				uni.navigateTo({
					url: `/pages/car/order_detail?order_id=${item.order_id}`
				})
			},
			async cancelOrder(order_id) {
				uni.showModal({
					title: '提示',
					content: '确定取消该订单？',
					success: async ({ confirm }) => {
						if(confirm) {
							const {code, msg} = await this.$api({
								url: 'app/order/cancel',
								data: {
									order_id
								},
								loadingStr: '取消中...'
							})
							if(code) {
								this.page = 1
								this.data = []
								this.getData(true)
							} 
						}
					}
				})
			},
			async delOrder(order_id) {
				uni.showModal({
					title: '提示',
					content: '确定删除该订单？',
					success: async ({ confirm }) => {
						if(confirm) {
							const {code, msg} = await this.$api({
								url: 'app/order/notShow',
								data: {
									order_id
								},
								loadingStr: '删除中...'
							})
							if(code) {
								this.page = 1
								this.data = []
								this.getData(true)
							} 
						}
					}
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.tabs_box {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		background-color: white;
		z-index: 9999;
	}
	.content {
		padding: 0 0 40rpx 0;
	}

	.status_list_scroll {
		background: #fff;
		padding: 0 20upx;

		.item {
			flex-shrink: 0;
			font-size: 30upx;
			color: #111;
			line-height: 30upx;
			padding: 27upx 5upx 31upx;
			margin: 0 23upx;
			position: relative
		}

		.active {
			color: #FE4338;
			border-bottom: 4upx solid #FE4338;
		}
	}

	.items {
		padding-top: 100upx;

		.item {
			margin-top: 20upx;
			background: #fff;

			.item-info {
				padding: 10upx 23upx 10upx 18upx;
			}

			.time_box {
				height: 70upx;
			}

			.time_img {
				width: 26upx;
				height: 26upx;
				margin-right: 21upx;
				margin-left: 5upx;
			}

			.goods-list-item {
				background: #fafafa;
				border-bottom: 2upx solid #F1F1F1;
				padding: 26upx 0;

				.img {
					margin-left: 18upx;
				}
			}

			.btns {
				display: flex;
				justify-content: flex-end;
				height: 90upx;
				align-items: center;
				font-size: 24upx;
				color: #999999;

				.btn {
					height: 50upx;
					line-height: 50upx;
					border: 1upx solid rgba(216, 216, 216, 1);
					border-radius: 25upx;
					margin-right: 24upx;
					min-width: 140upx;
					text-align: center;
				}

				.red_btn {
					border-color: #FE4338;
					color: #FE4338
				}
			}
		}
	}
</style>
