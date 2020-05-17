<template>
	<view id="popup" v-if="popupShow"></view>
	<view class="" v-else>
		<view v-if="goodsList && goodsList.length>0">
			<view class="items">
				<view class="del_box">
					<text class="del_car" @click="delCarCancel">删除</text>
				</view>
				<view class="item" v-for="(item,index) in list" :key="index">
					<view class="flex-lr">
						<view class="flex-c" style="width: 96upx;" @click="selcect_goods(item)">
							<text v-if="item.isSelect" class="icon_selected"></text>
							<text v-else class="icon_select "></text>
						</view>
						<view class="goods-list-item">
							<view class="img">
								<image :src="item.goods_thumb" mode=""></image>
							</view>
							<view class="info">
								<view class="">
									<view class="title">
										{{ item.goods_name }}
									</view>
									<view class="title2" v-if="item.attr_detail&&item.attr_detail.length>0">
										<view v-for="(val,i) in item.attr_detail" :key="i">
											{{ val.attr_name }} {{ val.attr_value }}
										</view>
									</view>
								</view>
								<view class="caozuo">
									<view class="ft24 c-red fw">￥{{item.show_price}}</view>
									<view class="num-change">
										<text @click="numberChange('sub', item)">-</text>
										<input type="number" placeholder="1" maxlength="4" :value="item.cart_num" @input="numberChange($event, item)" />
										<text @click="numberChange('add', item)">+</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="jiesuanBox flex-a-c flex-b ft28 c-333">
				<view class="flex-a-c" @click="caozuo_all">
					<text v-if="all_select" class="icon_selected "></text>
					<text v-else class="icon_select "></text>
					<view class="ml20">
						全选
					</view>
				</view>
				<view class="flex-a-c">
					<view class="ft30 mr20">
						<text>总计：</text>
						<text class="c-red">￥{{all_price}}</text>
					</view>
					<view class="btn" @click="go_confirm">
						结算
					</view>
				</view>
			</view>
		</view>
		<view v-else class="bjfff">
			<nullImg :option="option"></nullImg>
			<view class="flex-b btns">
				<navigator class="btn" url="/pages/index/search">为你推荐</navigator>
				<navigator class="btn" url="/pages/index/search">猜你喜欢</navigator>
			</view>
			<view class="c-111 xihuan_title">猜 你 喜 欢</view>
			<goodsList :list="liveList"></goodsList>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				popupShow: true,
				option: {
					img: 'https://dmkqiniu.medsnk.cn/assets/img/car/car.png',
					tip: '购物车空空如也'
				},
				goodsList: [],
				all_select: false,
				all_price: 0,
				liveList: []
			}
		},
		computed: {
			list() {
				return this.goodsList || []
			}
		},
		async onPullDownRefresh() {
			await this.getCarList()
			uni.stopPullDownRefresh()
		},
		// 上拉加载
		onReachBottom() {},
		onShow() {
			this.popupShow = true
			this.getCarList()
		},
		methods: {
			async getCarList() {
				const res = await this.$common.getShopCard()
				res.map((item => {
					return item.isSelect = false
				}))
				this.all_select = false
				this.goodsList = res
				if (res.length === 0) {
					const res = await this.$api({
						url: 'app/index/index'
					})
					if (res) {
						this.liveList = res.data.love_goods
					}
				}
				this.popupShow = false
				this.jisuan()
			},
			// 修改数量
			numberChange(e, item) {
				if (e === 'add') {
					item.cart_num++
				} else if (e === 'sub') {
					if (item.cart_num !== 1) item.cart_num--
				} else {
					item.cart_num = parseInt(e.detail.value) < 1 ? 1 : parseInt(e.detail.value)
				}
				return item.cart_num
			},
			// 选择商品
			selcect_goods(item) {
				item.isSelect = !item.isSelect
				const isAllSelect = this.goodsList.find(item => {
					return item.isSelect === false
				})
				this.all_select = isAllSelect ? false : true
				this.jisuan()
			},
			// 全部操作按钮
			caozuo_all() {
				this.goodsList.map(item => {
					return item.isSelect = !this.all_select
				})
				this.all_select = !this.all_select
				this.jisuan()
			},
			// 计算金额
			jisuan() {
				let nums = 0
				for (let item of this.goodsList) {
					if (item.isSelect) {
						nums += Number(item.show_price) * item.cart_num
					}
				}
				this.all_price = nums.toFixed(2)
			},
			// 删除购物车询问
			delCarCancel() {
				const delList = this.goodsList.filter(item => {
					return item.isSelect === true
				})
				if (delList.length > 0) {
					uni.showModal({
						title: '提示',
						content: '是否删除购物车商品',
						success: ({
							confirm
						}) => {
							if (confirm) {
								this.delCar(delList)
							}
						}
					})
				} else {
					this.$common.toast('请选择商品')
				}
			},
			// 删除购物车
			async delCar(delList) {
				let cart_id = ''
				for (let index in delList) {
					if (Number(index) === Number(delList.length - 1)) {
						cart_id += `${delList[index].cart_id}`
					} else {
						cart_id += `${delList[index].cart_id},`
					}
				}
				const {
					code,
					msg
				} = await this.$api({
					url: 'cart/del.php',
					data: {
						cart_id
					},
					loadingStr: '删除中...'
				})
				if (code) {
					this.$common.toast(msg)
					this.getCarList()
				}
			},
			// 
			go_confirm() {
				const delList = this.goodsList.filter(item => {
					return item.isSelect === true
				})
				if (delList.length > 0) {
					let detail = []
					for (let item of delList) {
						detail.push({
							goods_id: item.goods_id,
							product_id: item.product_id,
							buy_num: item.cart_num,
							cart_id: item.cart_id
						})
					}
					uni.navigateTo({
						url: `/pages/car/confirm?data=${JSON.stringify(detail)}`
					})
				} else {
					this.$common.toast('请选择商品')
				}
			}
		}
	}
</script>

<style lang="scss">
	.items {
		padding-bottom: 120upx;
	}

	.del_box {
		padding: 10rpx 20rpx;
		background-color: white;
		border-bottom: 1px solid #eee;
	}

	.del_car {
		font-size: 14px;
		color: red;
		padding: 0 10rpx;
		line-height: 30px;
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

	.btns {
		padding: 0 150upx;
		margin: 20upx 0 37upx;

		.btn {
			font-size: 28upx;
			width: 200upx;
			height: 50upx;
			border-radius: 25upx;
			text-align: center;
			line-height: 50upx;
			border: 1px solid rgba(204, 204, 204, 1);
		}
	}

	.xihuan_title {
		background: #F3F4F5;
		font-size: 33rpx;
		height: 100upx;
		line-height: 100upx;
	}

	/deep/ .good-banner-box {
		padding-top: 0 !important;
	}

	.num-change {
		width: 264rpx;
		height: 50rpx;
		display: flex;
		align-items: center;
		border: 1px solid #999;

		text:nth-of-type(1) {
			width: 80rpx;
			height: 50rpx;
			line-height: 50rpx;
			font-size: 40rpx;
			color: #333;
			text-align: center;
			border-right: 1px solid #999;
		}

		text:nth-of-type(2) {
			width: 80rpx;
			height: 50rpx;
			line-height: 50rpx;
			font-size: 40rpx;
			color: #333;
			text-align: center;
			border-left: 1px solid #999;
		}

		input {
			width: 100rpx;
			color: #333;
			height: 50rpx;
			border-color: transparent;
			text-align: center;
			padding: 2rpx;
			margin: 0;
		}
	}
</style>
