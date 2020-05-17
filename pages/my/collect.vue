<template>
	<view class="">
		<view class=" caozuo_title">
			<view v-if="!caozuo" @click="caozuo=true">
				删除
			</view>
			<view v-else @click="caozuo=false">
				完成
			</view>
		</view>
		<view class="border-f1">

		</view>
		<view class="items">
			<view class="item" v-for="(item,index) in goodsList" :key="index">
				<view class="flex-lr">
					<view v-if="caozuo" class="flex-c" style="width: 96upx;" @click="selcect_goods(item)">
						<text v-if="item.select" class="icon_selected"></text>
						<text v-else class="icon_select "></text>
					</view>
					<view v-else style="width: 17upx;height: 1upx;">

					</view>
					<view class="goods-list-item">
						<view class="img">
							<image src="https://dmkqiniu.medsnk.cn/15853814829328.jpg" mode=""></image>
						</view>
						<view class="info">
							<view class="">
								<view class="title">
									太赫兹磁眠枕
								</view>
								<view class="title2">规格：大规格</view>
							</view>
							<view class="caozuo">
								<view class="ft24 c-red fw">￥{{item.goods_price}}</view>
							</view>
						</view>

					</view>

				</view>
			</view>
		</view>
		<view class="jiesuanBox flex-a-c flex-b ft28 c-666" v-if="caozuo">
			<view class="flex-a-c" @click="caozuo_all">
				<text v-if="all_select" class="icon_selected "></text>
				<text v-else class="icon_select "></text>
				<view class="ml20">
					全选
				</view>
			</view>
			<view class="flex-a-c ft28">
				<view class=" mr20">
					<text>已选</text>
					<text class="c-red">{{jiesuan_number}}</text>
					<text>件</text>
				</view>
				<view class="btn" @click="go_confirm">
					删除
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		components: {
			uniIcons
		},
		data() {
			return {

				goodsList: [{
						id: 1,
						goods_price: 168,
						select: false
					},
					{
						id: 2,
						goods_price: 169,
						select: true
					}
				],
				all_select: false,
				jiesuan_number: 0,
				caozuo: false
			};
		},
		onPullDownRefresh() {
			let that = this
			that.init()
		},
		// 上拉加载
		onReachBottom() {
			let that = this

		},
		onShow() {
			console.log()
			this.jisuan()
		},
		onLoad() {
			uni.hideShareMenu();
			wx.hideShareMenu()
		},
		methods: {
			init() {
				let that = this
			},

			// 选择商品
			selcect_goods(item) {
				item.select = !item.select
				console.log(item)
			},
			// 全部操作按钮
			caozuo_all() {
				let that = this
				for (let i in that.goodsList) {
					that.goodsList[i].select = !that.all_select
				}
			},
			// 计算全选 金额
			jisuan() {
				console.log(1)
				let newVal = this.goodsList
				this.all_select = newVal.every(function(item, ) {
					return item.select;
				})
				let jiesuan_number = 0
				let all_price = 0
				for (let i in newVal) {
					if (newVal[i].select) {
						jiesuan_number++
						all_price += Number(newVal[i].goods_number) * Number(newVal[i].goods_price)
					}
				}
				this.jiesuan_number = jiesuan_number
			},
		},
		watch: {
			goodsList: {
				handler: function(newVal, oldVal) {
					console.log(newVal)
					this.jisuan()
				},
				deep: true
			}
		}

	}
</script>

<style lang="scss">
	// .page-top-title{
	// 	color: #000;
	// 	padding: 0 23upx;
	// 	background: #fff;
	// 	border-bottom: 1upx solid #EEEEEE;
	// 	height: 134upx;
	// 	padding-top: 28upx;
	// 	box-sizing: border-box;
	// 	position: relative;
	// 	.back{
	// 		position: absolute;
	// 	}
	// }
	.items {
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
			height: 78upx;
			line-height: 78upx;
			background: linear-gradient(-46deg, rgba(249, 50, 38, 1), rgba(254, 139, 52, 1));
			border-radius: 39upx;
			text-align: center;
			min-width: 190upx;
			color: #fff;

		}
	}

	.item {
		background: #fff;

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
