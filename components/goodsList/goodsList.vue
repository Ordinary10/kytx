<template>
	<view class="good-banner-box flexWrap" :class="[{'bjfff':type == 1},{'bjf3':type == 2}]">
		<view class="good-banner-item" v-for="(item,index) in list" :key="item.goods_id">
			<view class="image" @click="goDetail(item.goods_id)">
				<image class="wh100" :src="item.goods_thumb" :lazy-load="true"></image>
			</view>
			<template>
				<view class="info">
					<view class="name">
						<text class="dmk c-red-2">送{{ item.give_heart_num }}DMK</text>
						<text class="c-111">{{ item.goods_name }}</text>
					</view>
					<view style="line-height: 40upx;" class=" ft24 ellipsis c-999">{{ item.slogan }}</view>
					<view class="flex-a-c pdt6 pdb6">
						<text class=" ft32 c-red">￥{{ item.vip_price }}</text>
						<text class="old-price ft24 c-aaa">￥{{ item.market_price }}</text>
					</view>
				</view>
			</template>
		</view>
	</view>
</template>
<script>
	export default {
		props: {
			list: {
				type: Array,
				default: ['', '', '', '']
			}
		},
		methods: {
			goDetail(id) {
				uni.navigateTo({
					url: '/pages/goods/detail?id=' + id
				})
			}
		}

	}
</script>


<style scoped lang="scss">
	.good-banner-box {
		padding: 20upx 20upx 0;

		.good-banner-item {
			width: 50%;
			box-sizing: border-box;
			padding-right: 10upx;
			margin-bottom: 20upx;

			&:nth-of-type(2n) {
				padding-right: 0upx;
				padding-left: 10upx;
			}

			.image {
				width: 100%;
				height: 350upx;
				border-radius: 10upx;
				overflow: hidden;
			}

			.dmk {
				display: inline;
				font-size: 26upx;
				padding: 4upx 6upx;
				margin-right: 6upx;
				background: #ffcfc7;
			}

			.name {
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				min-height: 80rpx;
			}

			.old-price {
				margin-left: 6upx;
				text-decoration: line-through;
			}

			.info {
				background-color: #f5f5f5;
				padding-left: 10upx;
				padding-bottom: 8upx;
				border-bottom-right-radius: 10px;
				border-bottom-left-radius: 10px;
			}

			.red-price {
				font-size: 28upx;
				font-weight: bold;
				color: #FE4338;
			}

			.info2 {
				padding: 10upx !important;
				background-color: #fff
			}

		}
	}
</style>
