<template>
	<view id="popup" v-if="popupShow"></view>
	<view v-else>
		<!-- 头部轮播 -->
		<view class="swiper-box">
			<!-- <view class="back">
				<image src="https://dmkqiniu.medsnk.cn/back.png" mode=""></image>
			</view> -->
			<swiper @change="change_swiper" class="swiper" :interval="2000" :duration="500" :circular="true" :autoplay="true">
				<swiper-item v-for="(item, index) in data.images" :key="index" class="swiper-item">
					<image class="wh100" :src="item" />
				</swiper-item>
			</swiper>
			<view class="num">
				{{current_swiper}} / {{data.images.length}}
			</view>
		</view>
		<view class="info-wrapper">
			<view class="info bjfff">
				<view class="price-box">
					<view class="c-red ft40">
						￥{{ data.shop_price }}
					</view>
					<view class="ml20 ft30 c-333">
						￥{{ data.vip_price }}
					</view>
					<view class="vip_sign ml3" style="transform: translateY(-5upx);">VIP专享礼</view>
				</view>
				<view class="flex-b  ft26 mt20 mb20 flex-a-c" @click="showVipTips">
					<view class="c-red open_vip">
						开VIP会员可省{{ data.difference_price }}元
					</view>
					<view class="c-red open_vip">
						{{ data.vip_goods_tips }}
					</view>
					<view class="c-red flex-a-c">
						立即开通
						<i class="icon_red_next ml13"></i>
					</view>
				</view>
				<view class="flex-lr positionR">
					<view class="mr7 mt5">
						<view class="jingxuan">
							精选
						</view>
					</view>
					<button class="shareBox" open-type="share">
						<image src="https://dmkqiniu.medsnk.cn/15.png" mode=""></image>
						分享
					</button>
					<view class="">
						<view class="ft32 fw" style="max-width: 518upx;">
							{{ data.goods_name }}
						</view>
						<view class="ft22 c-999 mt25 mb30">
							{{ data.slogan }}
						</view>
						<view class="flexWrap ft24 c-666">
							<view class="mr50">
								快递：包邮
							</view>
							<view class="mr50">
								销量：{{ data.sale_num }}
							</view>
							<view class="mr50">
								库存：{{ data.curr_attr_stock }} {{ data.goods_unit }}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class=" bjfff mt20 mb20">
				<view class="flex-lr pd31 ft28">
					<view class="title125">获得DMK</view>
					<view class=" c-333">
						全额现金购买可获得{{data.shop_price}}DMK
					</view>
				</view>
				<view class="border-f1"></view>
				<view class="flex-lr pd31 ft28">
					<view class="title125">DMK抵扣</view>
					<view class=" c-333">
						可使用{{data.heart_num}}DMK抵扣，已抵扣部分不再重复赠送DMK
					</view>
				</view>
			</view>
			<view class="chose mt20 mb20"  @click="goods_add">
				<view class="flex-b flex-a-c">
					<view class="flex-a-cs" style="display: flex;">
						<view class="ft28 title125">已选</view>
						<view class="ft32 c-333 ellipsis " style="max-width: 500upx;">
							<text v-for="(item, index) in data.attributes" :key="index" style="padding-right: 20rpx;">
								{{item.attr_value[item.activeIndex]}}
							</text>
							<text>{{ goodsNumber }}{{ data.goods_unit }} </text>
						</view>
					</view>
					<view class="flex-a-c">
						<i class="icon_more"></i>
					</view>
				</view>
			</view>
			<view class="chose" @click="areaShow = true">
				<view class="flex-b flex-a-c">
					<view class="flex-a-c">
						<view class="ft28 c-999">配送地址</view>
						<view class="ft28 c-333 ellipsis content">
							{{address}}
						</view>
					</view>
					<view class="flex-a-c">
						<i class="icon_more"></i>
					</view>
				</view>		
			</view>
			<view class="border-f1"></view>
			<view class="chose" v-if="data.transfer_desc">
				<view class="flex-b flex-a-c">
					<view class="flex-a-c">
						<view class="ft28 c-999">快递说明</view>
						<view class="ft28 c-333 content">
							{{data.transfer_desc}}
						</view>
					</view>
					<view class="flex-a-c">
					</view>
				</view>
			</view>
			<view class="border-f1" v-if="data.transfer_desc"></view>
			<!-- <view class="chose">
				<view class="flex-b flex-a-c">
					<view class="flex-a-c">
						<view class="ft28 c-999">库存</view>
						<view class="ft28 c-333 ellipsis content">
							{{ data.curr_attr_stock }} {{ data.goods_unit }}
						</view>
					</view>
					<view class="flex-a-c">
					</view>
				</view>
			</view> -->

			<view class="bjfff mt20 mb20 pdt32 pdl30">
				<view class="flex flexWrap ft22 c-333">
					<view class="flex-a-c mb16 " v-for="(item, index) in data.goods_ensure" :key="index">
						<i class="icon_red_gou mr10"></i>
						<text class="mr30">{{item}}</text>
					</view>

				</view>
			</view>
			<view class="tabs flex-b bjfff flex-a-c">
				<view class="tab" @click="tabIndex = 1" :style="{color: tabIndex === 1 ? '#fe4338' : '#999'}">图文详情</view>
				<view class="line"></view>
				<view class="tab" @click="tabIndex = 2" :style="{color: tabIndex === 2 ? '#fe4338' : '#999'}">购买须知</view>
			</view>
			<view v-if="tabIndex === 1" style="margin-top: 20rpx;width: 100%;">
				<view class="note-content" v-html="data.content"></view>
			</view>
			<view v-if="tabIndex === 2" style="margin-top: 20rpx;width: 100%;"></view>
		</view>
		<view class="caozuo_box flex-a-c">
			<view class="left">
				<view class="img">
					<image @click="click_shouchang(0)" v-if="data.is_favorite" src="https://dmkqiniu.medsnk.cn/active_xinxin.png" mode=""></image>
					<image @click="click_shouchang(1)" v-else src="https://dmkqiniu.medsnk.cn/xinxin.png" mode=""></image>
				</view>
				<view class="tip">
					收藏
				</view>
			</view>
			<view class="left">
				<view class="img" style="position: relative;">
					<image @click="click_car(0)" v-if="car" src="https://dmkqiniu.medsnk.cn/active_car_detail.png" mode=""></image>
					<image @click="click_car(1)" v-else src="https://dmkqiniu.medsnk.cn/car_detail.png" mode=""></image>
					<u-badge size="small" type="success" :count="count" :offset="[-10, 25]"></u-badge>
				</view>
				<view class="tip" >
					购物车
				</view>
			</view>
			<view class="right">
				<view class="add" @click="goods_add">
					加入购物车
				</view>
				<view class="buy" @click="goods_add">
					立即购买
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class=" buybox bjfff">
				<view class="buy_details_box ">
					<view class="flex-lr mb30">
						<view class="img">
							<image class="wh100b" :src="data.goods_thumb" mode=""></image>
						</view>
						<view class="ft26 c-666">
							<view class="ft28 c-111 fw ellipsis2">
								{{data.goods_name}}
							</view>
							<view class="mt7 mb7">
								赠送 <text class="c-red ml3 mr3">{{data.shop_price}}</text>DMK
							</view>
							<view class="">
								可用DMK抵扣<text class="c-red">{{data.heart_num}}</text>元
							</view>
							<view class="mt10 mb5">
								<text class="c-red ft32">￥</text>
								<text class="c-red ft40">{{ data.shop_price }}</text>
								<text class="ft28 c-666" style="text-decoration:line-through;">￥{{ data.vip_price }}</text>
							</view>
							<view class="c-999">
								库存{{ data.curr_attr_stock }} {{ data.goods_unit }}
							</view>
						</view>
					</view>
					<view class="attributes" v-for="(item, index) in data.attributes" :key="index">
						<view class="title">
							{{ item.attr_name }}
						</view>
						<view class="flexWrap">
							<view :class="['box_select',{'box_selected':i===item.activeIndex}]" v-for="(val,i) in item.attr_value" :key="i"
							 @click="attributesSelect(item, val, i)">
								{{val}}
							</view>
						</view>
					</view>
					<view class="flex-b-c mb20 mt20">
						<view class="ft28 c-333">
							数量
						</view>
						<view class="num-change">
							<text @click="numberChange('sub')">-</text>
							<input type="number" placeholder="1" maxlength="4" :value="goodsNumber" @input="numberChange" />
							<text @click="numberChange('add')">+</text>
						</view>
					</view>
				</view>
				<view class="btns">
					<view class="add" @click="addBuyCard">
						加入购物车
					</view>
					<view class="buy" @click="addOrder">
						立即购买
					</view>
				</view>
			</view>
		</uni-popup>
		
		<uni-popup ref="popup_vip" type="bottom">
			<view class="vip_info">
				<view class="title">
					升级VIP
					<u-icon class="del_icon" name="close" color="#333" size="28" @click="closeVipTips"></u-icon>
				</view>
				<view class="note1">
					除医疗器械版块的产品外，其他产品（大健康产品）累计购买满200元即可升级为VIP （不计购买次数，累积消费金额满200元后即可升级为VIP）
				</view>
				<view class="note2">
					*升级VIP的同时，再额外赠送200个DMK
				</view>
			</view>
		</uni-popup>
	
		<jq-area-select v-model="areaShow" @jqSubmit="areaChange"></jq-area-select>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				popupShow: true,
				data: null,
				tabIndex: 1,
				current_swiper: 1,
				shouchang: false,
				car: false,
				goodsNumber: 1,
				address: '请选择送货地址',
				areaShow: false,
				areaData: null
			}
		},
		computed: {
			count() {
				return this.$store.state.shopCardList.length
			}
		},
		onLoad(option) {
			if (!option.id) {
				uni.navigateBack()
			}
			this.id = option.id
			this.getData()
		},
		onShow() {
			const cityData = getApp().globalData.cityData
			this.address = `${cityData[0].lable}-${cityData[0].children[0].lable}-${cityData[0].children[0].children[0].lable}`
			// uni.showModal({
			// 	title: '温馨提示',
			// 	content: '您购买的产品不累计计入VIP升级',
			// 	showCancel: false,
			// 	confirmText: '我知道了',
			// 	confirmColor: '#FE4338'
			// })
		},
		async onPullDownRefresh() {
			await this.getData()
			uni.stopPullDownRefresh()
		},
		onShareAppMessage() {
			return {
				title: this.data ? this.data.share_title : null,
				imageUrl: this.data ? this.data.share_photo : null,
			}
		},
		methods: {
			// 获取商品详情
			async getData() {
				const {
					code,
					data
				} = await this.$api({
					url: 'app/products/view',
					data: {
						goods_id: this.id || 0,
						product_id: '',
						code_num: 'baisd'
					}
				})
				if (code) {
					data.attributes = data.attributes.map((item) => {
						item.activeIndex = 0
						return item
					})
					this.data = data
					this.popupShow = false
				}
			},
			// 地址选择
			areaChange(e) {
				this.areaData = e
				this.address = `${e[0].lable}-${e[1].lable}-${e[2].lable}`
			},
			// 弹出选择
			goods_add() {
				this.$refs.popup.open()
			},
			
			// vip升级说明
			showVipTips() {
				this.$refs.popup_vip.open()
			},
			closeVipTips() {
				this.$refs.popup_vip.close()
			},
			// 加入购物车
			async addBuyCard() {
				const { code, msg } = await this.$api({
					url: 'cart/add.php',
					data: {
						goods_id: this.data.goods_id,
						product_id: this.data.product_id,
						cart_num: this.goodsNumber,
						is_add: 1
					},
					loadingStr: '正在加入购物车'
				})
				if(code) {
					this.$common.$toast({
						title: msg
					})
					let timer = setTimeout(() => {
						uni.switchTab({
							url: '/pages/car/index'
						})
						clearTimeout(timer)
					}, 2000)
				}
			},
			// 购买
			addOrder() {
				const data = [
					{
						"buy_num":this.goodsNumber,
						"goods_id":this.data.goods_id,
						"product_id":this.data.product_id
					}
				]
				uni.navigateTo({
					url: '/pages/car/confirm?data=' + JSON.stringify(data)
				})
			},
			// 收藏
			async click_shouchang(i) {
				const {code} = await this.$api({
					url: 'app/user/favoriteGoods',
					data: {
						goods_id: this.data.goods_id,
						is_add: i
					}
				})
				if(code) {
					this.data.is_favorite = i ? 1 : null
				}
			},
			// 进入 购物车
			click_car(i) {
				uni.switchTab({
					url: '../car/index'
				})
			},
			change_swiper(event) {
				this.current_swiper = event.detail.current + 1
			},
			// 属性选择
			attributesSelect(item, val, i) {
				item.activeIndex = i
				console.log(item)
			},
			// 修改数量
			numberChange(e) {
				let num = Number(this.goodsNumber)
				if (e === 'sub' && num === 1) return this.goodsNumber
				if (e === 'sub' && num > 1) {
					num--
				} else if (e === 'add' && this.data.curr_attr_stock > num) {
					num++
				} else if (e.detail) {
					num = parseInt(e.detail.value)
					if (num > this.data.curr_attr_stock) {
						this.$common.toast('不能超过库存')
						num = this.data.curr_attr_stock
					}
				} else if (e === 'add' && this.data.curr_attr_stock === num) {
					num = this.data.curr_attr_stock
					this.$common.toast('不能超过库存')
				}
				this.goodsNumber = num + ''
				return num + ''
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 富文本
	.note-content img,
	.note-content p,
	.note-content image,
	.note-content view,
	.note-content {
		display: block;
		width: 100%;
	}
	.vip_info {
		width: 100%;
		background-color: white;
		padding: 0 30rpx;
		.title {
			height: 72px;
			width: 100%;
			font-size: 36rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
			color: #333;
			
			.del_icon {
				position: absolute;
				top: 50%;
				right: 0;
				transform: translateY(-50%);
			}
		}
		.note1 {
			width: 100%;
			font-size: 28rpx;
			padding: 28rpx 0;
			color: #333;
		}
		.note2 {
			width: 100%;
			padding: 28rpx 0;
			font-size: 28rpx;
			color: #fe4338;
		}
		
	}
	// 购买弹框
	.buybox {
		.buy_details_box {
			padding: 32upx 32upx 0;

			.img {
				width: 200upx;
				height: 200upx;
				margin-right: 20upx;
				border-radius: 5upx;
				overflow: hidden;
			}

			.title {
				color: #888888;
				font-size: 24upx;
				height: 65upx;
				line-height: 65upx;
			}

			.box_select {
				font-size: 24upx;
				height: 48upx;
				line-height: 46upx;
				color: #323232;
				box-sizing: border-box;
				padding: 0 28upx;
				background: rgba(238, 238, 238, 1);
				border: 1upx solid rgba(238, 238, 238, 1);
				border-radius: 4upx;
				margin-right: 20upx;
				margin-bottom: 20upx;
				min-width: 122upx;
				text-align: center;

				&.box_selected {
					color: #FF2A26;
					background: rgba(255, 219, 215, 1);
					border-color: #FF968A;
				}
			}
		}

		.btns {
			border-top: 2upx solid #F1F1F1;
			height: 100upx;
			padding: 0 45upx;
			display: flex;
			align-items: center;
			font-size: 26upx;
			color: #fff;

			&>view {
				width: 330upx;
				display: flex;
				justify-content: center;
				align-items: center;
				height: 72upx;
			}

			.add {
				background: linear-gradient(-90deg, rgba(255, 211, 0, 1), rgba(255, 152, 15, 1));
				border-radius: 36upx 0px 0px 36upx;
			}

			.buy {
				background: linear-gradient(-90deg, rgba(249, 50, 38, 1), rgba(247, 131, 41, 1));
				border-radius: 0 36upx 36upx 0;
			}
		}
	}

	.caozuo_box {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 100upx;
		border-top: 1px solid #f1f1f1;
		background: #fff;

		.right {
			height: 72upx;
			line-height: 72upx;
			color: #fff;
			text-align: center;
			display: flex;
			font-size: 26upx;

			.add {
				width: 230upx;
				background: linear-gradient(-90deg, rgba(255, 211, 0, 1), rgba(255, 152, 15, 1));
				border-radius: 36upx 0px 0px 36upx;
			}

			.buy {
				width: 230upx;
				background: linear-gradient(-90deg, rgba(249, 50, 38, 1), rgba(247, 131, 41, 1));
				border-radius: 0px 36upx 36upx 0px;
			}
		}

		.left {
			width: 130upx;
			display: flex;
			flex-direction: column;
			justify-content: center;

			.img {
				display: flex;
				justify-content: center;
			}

			image {
				width: 40upx;
				height: 40upx;
			}

			.tip {
				font-size: 20upx;
				color: #333;
				text-align: center;
				margin-top: 5upx
			}
		}
	}

	.info-wrapper {
		padding-bottom: 100upx;
	}

	.info {
		padding: 28upx 27upx 28upx 23upx;

		.price-box {
			display: flex;
			align-items: baseline;
			margin-left: 5upx;

			.vip_sign {
				width: 92upx;
				height: 22upx;
				color: #fff;
				font-size: 15upx;
				font-weight: bold;
				line-height: 22upx;
				text-align: center;
				background: url('https://dmkqiniu.medsnk.cn/14.png') no-repeat;
				background-size: 100% 100%;
			}
		}

		.open_vip {
			padding: 8upx 14upx;
			background: #FFFDF7F2;
			border-radius: 8upx;
		}

		.jingxuan {
			font-size: 18upx;
			font-weight: 500;
			padding: 3upx;
			color: #fff;
			border-radius: 4upx;
			line-height: 25upx;
			background: linear-gradient(90deg, rgba(253, 60, 74, 1), rgba(249, 114, 68, 1));
		}

		.shareBox {
			font-size: 22upx;
			color: #999;
			background: #F4F4F4;
			border-radius: 24upx 0px 0px 24upx;
			height: 48upx;
			line-height: 48upx;
			display: flex;
			align-items: center;
			padding: 12upx 19upx;
			box-sizing: border-box;
			position: absolute;
			right: -26upx;

			image {
				height: 24upx;
				width: 24upx;
				margin-right: 4upx;
			}
		}

	}

	.title125 {
		width: 125upx;
		color: #999;
		margin-right: 24upx;
	}

	.tabs {
		height: 80upx;
		line-height: 80upx;
		padding: 0 134upx;

		.line {
			width: 1px;
			background: #DCDCDC;
			height: 40%;
		}

		.tab {
			font-size: 28upx;
			color: #999;
		}
	}

	.chose {
		padding: 32upx 31upx;
		background: #fff;

		.content {
			margin-left: 60upx;
			max-width: 500upx;
		}
	}

	.swiper-box {
		position: relative;

		.num {
			background: rgba(255, 255, 255, .3);
			position: absolute;
			bottom: 15px;
			z-index: 99;
			border-radius: 40upx;
			color: #fff;
			padding: 0 20upx;
			right: 10upx;
			font-size: 32upx;
		}

		.back {
			position: absolute;
			left: 0;
			top: 0;
			padding: 30upx 20upx;
			z-index: 99;

			image {
				width: 54upx;
				height: 54upx;
			}
		}
	}

	.swiper {
		height: 750upx;
		width: 100%;
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
