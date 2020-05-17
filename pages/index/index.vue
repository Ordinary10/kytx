<template>
	<view id="popup" v-if="popupShow"></view>
	<view class="root bjfff" v-else>
		<view class="search-box bjfff flex-b flex-a-c" :style="{'opacity':opacity_num}">
			<view class="sao">
				<image class="wh100" src="https://dmkqiniu.medsnk.cn/8.png" mode=""></image>
			</view>
			<navigator class="input" url="/pages/index/search">
				<i class="iconSearch"></i>
				<input type="text" disabled class="c-8A8A ft26" placeholder="输入关键字搜索" v-model="keyword" placeholder-class="c-8A8A" />
			</navigator>
			<view class="news">
				<image class="wh100" src="https://dmkqiniu.medsnk.cn/6.png" mode=""></image>
			</view>
		</view>
		<view class="content">
			<!-- 头部轮播 -->
			<view class="swiper-box">
				<swiper class="" :indicator-dots="true" :interval="2000" :circular="true" :duration="500" :autoplay="true">
					<swiper-item v-for="(item, index) in data.carousel" :key="index" class="swiper-item">
						<image class="wh100" :src="item.advert_photo" :lazy-load="true" @click="bannerGoNav(item)"/>
					</swiper-item>
				</swiper>
			</view>
			<!-- 消息通知 -->
			<view class="flex-a-c tongzhiBox">
				<view class="tongzhi">
					<image class="wh100" src="https://dmkqiniu.medsnk.cn/60.png" mode=""></image>
				</view>
				<swiper style="flex: 1;height: 40upx;line-height: 40upx;" :circular="true" :interval="2000" :duration="500"
				 :autoplay="true" vertical>
					<swiper-item class="ellipsis" v-for="(item, index) in data.notice" :key="index">
						<text class="ft26 c-666 ellipsis">{{item.advert_name}}</text>
					</swiper-item>
				</swiper>
			</view>
			<!-- 商品分类 -->
			<view class="menu flexWrap bjfff">
				<view class="menu-item " v-for="(item,index) in data.four_nav" :key="index" @click="goodsCategoryGoNav(item)">
					<image class="img" :src="item.advert_photo" :lazy-load="true"></image>
					<view class="name mb20">{{item.advert_name}}</view>
				</view>
			</view>
			<!-- 新品上市 -->
			<view class="bjfff mt20">
				<view class="flex-a-c flex-b nav">
					<view class="fw">新品上新</view>
					<navigator class="flex-a-c c-999 ft24" url="/pages/index/search">
						更多
						<i class="ml10 iconMore"></i>
					</navigator>
				</view>
				<view class="good-banner-top">
					<image class="wh100" :src="data.new_goods_banner[0].advert_photo" :lazy-load="true"></image>
				</view>
				<goodsList :list="data.new_goods || []" name="xpss"></goodsList>
			</view>
			<!-- 好货推荐 -->
			<view class="bjfff mt20">
				<view class="flex-a-c flex-b nav">
					<view class="fw">好货推荐</view>
					<navigator class="flex-a-c c-999 ft24" url="/pages/index/search">
						更多
						<i class="ml10 iconMore"></i>
					</navigator>
				</view>
				<view class="good-banner-top">
					<image class="wh100" :src="data.best_goods_banner[0].advert_photo" :lazy-load="true"></image>
				</view>
				<goodsList :list="lists"></goodsList>
			</view>
			<u-loadmore :status="status" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				popupShow: true,
				data: [],
				page: 1,
				pagesize: 10,
				keyword: '',
				opacity_num: 1,
				status: 'loading',
				bestGoodsList: []
			}
		},
		computed: {
			lists() {
				return this.bestGoodsList
			}
		},
		async onLoad() {
			if(!this.$store.state.isGoodsCategory) {
				const { code, data } = await this.$api({
					url: 'app/common/getScreenInfo'
				})
				if (code) {
					this.$store.state.goodsCategory = data.category || ''
				}
			}
			this.getData()
			this.$common.getShopCard()
			this.$common.getUserInfo()
		},
		onPullDownRefresh() {
			this.page = 1
			this.data = []
			this.getData()
		},
		onPageScroll(e) {
			this.opacity_num = (100 - e.scrollTop) / 100 > 0 ? (100 - e.scrollTop) / 100 : 0
		},
		onReachBottom() {
			if(this.status === 'nomore') return
			this.page++
			this.status = 'loading'
			this.getBestGoods()
		},
		methods: {
			// 获取首页信息
			async getData() {
				const {
					code,
					msg,
					data
				} = await this.$api({
					url: 'app/index/index',
					data: {
						page: this.page,
						pagesize: this.pagesize,
						code: this.code
					}
				})
				if (code) {
					this.data = data
					this.bestGoodsList = data.best_goods
					this.popupShow = false
				}
			},
			// 分页加载推荐好货
			async getBestGoods() {
				const { code, data } = await this.$api({
					url: 'app/index/getBestGoods',
					data: {
						page: this.page,
						pagesize: this.pagesize
					},
					loading: false
				})
				if(code) {
					this.bestGoodsList = this.bestGoodsList.concat(data || [])
					if(!data || data.length < this.pagesize) {
						this.status = 'nomore'
					}
				}
			},
			// 顶部banner跳转
			bannerGoNav(item) {
				if(item.type_id === 1) {
					uni.navigateTo({
						url: `/pages/goods/detail?id=${item.info_id}`
					})
				} else if(item.type_id === 2) {
					uni.navigateTo({
						url: `/pages/index/search?cat_id=${item.info_id}`
					})
				}
			},
			// 商品分类栏跳转
			goodsCategoryGoNav(item) {
				if(item.type_id === 1) {
					uni.navigateTo({
						url: `/pages/goods/detail?id=${item.info_id}`
					})
				} else if(item.type_id === 2) {
					uni.navigateTo({
						url: `/pages/index/search?cat_id=${item.info_id}`
					})
				} else if(item.type_id === 13) {
					uni.navigateTo({
						url: '/pages/my/sign'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.nav {
		height: 84upx;
		padding: 0 24upx;
	}

	.container {
		position: relative;
		// top: 92upx;
		height: 100vh;

		.swiper-box {
			padding-top: 92upx;
		}
	}

	.content {
		padding-top: 92upx;
	}

	.search-box {
		padding: 10upx 16upx 20upx;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 99;

		.news {
			height: 40upx;
			width: 44upx;
		}

		.sao {
			height: 36upx;
			width: 36upx;
		}

		.input {
			flex: 1;
			margin: 4upx 30upx;
			height: 54upx;
			background: rgba(243, 244, 245, 1);
			border-radius: 27upx;
			display: flex;
			align-items: center;
			position: relative;

			input {
				margin-left: 70px;
				margin-top: 12upx;
				margin-bottom: 12upx;
			}

			.iconSearch {
				position: absolute;
				left: 31upx;
				top: 14upx;
			}
		}
	}

	.swiper-item {
		height: 340upx;
	}

	.tongzhiBox {
		height: 80upx;
		padding: 0 24upx;
	}

	.tongzhi {
		width: 32upx;
		height: 32upx;
		margin-right: 11upx;
	}

	.menu {
		.menu-item {
			display: flex;
			width: 20%;
			flex-direction: column;
			align-items: center;

			.img {
				margin-top: 20upx;
				width: 100upx;
				height: 100upx;
			}

			.name {
				color: #333;
				text-align: center;
				font-size: 24upx;

			}
		}
	}

	.good-banner-top {
		height: 220upx;

		image {
			// border-radius: 8upx;
		}
	}
</style>
