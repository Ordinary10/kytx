<template>
	<!-- 数据加载遮罩层 -->
	<view id="popup" v-if="maskShow"></view>
	<!-- 内容 -->
	<view class="bjfff" v-else>
		<view class="topCard">
			<image class="wh100b" src="https://dmkqiniu.medsnk.cn/user_top_bg.png" mode=""></image>
			<view class="right flex-a-c ">
				<navigator url="/pages/my/news/list">
					<image class="mesBox" src="https://dmkqiniu.medsnk.cn/user_top_news.png" mode=""></image>
				</navigator>
				<navigator url="/pages/my/set/index">
					<image class="szBox" src="https://dmkqiniu.medsnk.cn/user_sz.png" mode=""></image>
				</navigator>
			</view>
			<navigator class="signBox flex-a-c " url="/pages/my/sign">
				<view class="c-blue ft26 fw">
					签到
				</view>
				<image class="szBox" src="https://dmkqiniu.medsnk.cn/user_more.png" mode=""></image>
			</navigator>
			<view class="infoBox ft24 c-fff flex-lr flex-a-e positionA" style="top: 0;">
				<image :src="data.head_pic || 'https://dmkqiniu.medsnk.cn/assets/img/user/user_mr.png'" mode=""></image>
				<view class="ml27" style="max-width: 500upx;">
					<view class="ft40 ellipsis">
						{{ data.nick_name || data.user_name || data.user_mobile }}
					</view>
					<view class="huiyuan_wenzi">
						LV{{ data.grade_id }} {{ data.grade_name }}
					</view>
					<view class="flex-a-c">
						<view class="">
							邀请码：{{ data.code_num }}
						</view>
						<view class="copy" @click="$common.copyText(data.code_num)">
							复制
						</view>
					</view>

				</view>
			</view>
		</view>
		<view class="user_info">
			<view class="flex-b text-c top1_box">
				<navigator class="view" url="/packageA/money/index">
					<view class="fw ft30 pdt10 c-13">
						{{ data.balance }}
					</view>
					<view class="ft24 pdt10 c-04">
						{{ data.balance_name }}{{data.balance_unit}}
					</view>
				</navigator>
				<view class="line"></view>
				<navigator class="view" url="/pages/dmk/index">
					<view class="fw ft30 pdt10 c-13">
						{{ data.heart_balance }}
					</view>
					<view class="ft24 pdt10 c-04">
						{{ data.heart_balance_name }}{{ data.heart_balance_unit }}
					</view>
				</navigator>
			</view>
			<view class="mt20 bannerImg">
				<image src="https://dmkqiniu.medsnk.cn/assets/img/common/pos-750x220.png"></image>
			</view>
			<view class="flex-b-c pd24-lr title">
				<view class="ft30 fw">
					我的订单
				</view>
				<navigator class="flex-a-c c-999 ft24" url="/pages/my/order_list?status=0">
					查看全部
					<i class="ml10 iconMore"></i>
				</navigator>
			</view>
			<view class="border-f1"></view>
			<view class="order-wrapper flex-b">
				<navigator class="order_sign" :url="'/pages/my/order_list?status='+item.status" v-for="(item,index) in order_list"
				 :key="index">
					<view class="flex-c">
						<view class="image-wrapper">
							<image :src="item.img" mode=""></image>
						</view>
					</view>
					<view class="tip">
						{{item.name}}
					</view>
				</navigator>
			</view>
			<view class="flex-b-c pd24-lr title">
				<view class="ft30 fw">
					会员中心
				</view>
			</view>
			<view class="border-f1"></view>
			<view class="center-wrapper flexWrap">
				<navigator class="center_sign" :url="item.pagePath" v-for="(item,index) in center_list" :key="index">
					<view class="flex-c">
						<view class="image-wrapper">
							<image :src="item.img" mode=""></image>
						</view>
					</view>
					<view class="tip">
						{{item.name}}
					</view>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: null,
				maskShow: true,
				order_list: [{
						img: 'https://dmkqiniu.medsnk.cn/user_dfk.png',
						status: 1,
						name: '待付款'
					},
					{
						img: 'https://dmkqiniu.medsnk.cn/user_dfh.png',
						status: 5,
						name: '待发货'
					},
					{
						img: 'https://dmkqiniu.medsnk.cn/user_dsh.png',
						status: 10,
						name: '待收货'
					},
					{
						img: 'https://dmkqiniu.medsnk.cn/user_dpj.png',
						status: 15,
						name: '待评价'
					},
					{
						img: 'https://dmkqiniu.medsnk.cn/user_th.png',
						status: 20,
						name: '退货退款'
					},
				],
				center_list: [{
						img: 'https://dmkqiniu.medsnk.cn/user_smrz.png',
						name: '实名认证',
						pagePath: '/pages/my/real_auth'
					},
					{
						img: 'https://dmkqiniu.medsnk.cn/user_fx.png',
						name: '我的邀请',
						pagePath: '/pages/my/share'
					},
					{
						img: 'https://dmkqiniu.medsnk.cn/user_sc.png',
						name: '我的收藏',
						pagePath: '/pages/my/collect'
					},
					{
						img: 'https://dmkqiniu.medsnk.cn/user_gz.png',
						name: '我的关注',
						pagePath: '/pages/my/concerned'
					},
					{
						img: 'https://dmkqiniu.medsnk.cn/user_zz.png',
						name: '我要转账',
						pagePath: '/packageA/money/transfer'
					},
					{
						img: 'https://dmkqiniu.medsnk.cn/user_sk.png',
						name: '我要收款',
						pagePath: '/packageA/money/income_code'
					},
					{
						img: 'https://dmkqiniu.medsnk.cn/user_ds.png',
						name: '我的导师',
						pagePath: '/pages/my/teachter'
					},
					{
						img: 'https://dmkqiniu.medsnk.cn/user_dmk.png',
						name: 'DMK',
						pagePath: '/pages/dmk/index'
					},
					{
						img: 'https://dmkqiniu.medsnk.cn/user_yemx.png',
						name: '余额明细',
						pagePath: '/packageA/money/index'
					},
					{
						img: 'https://dmkqiniu.medsnk.cn/user_location.png',
						name: '地址管理',
						pagePath: '/pages/my/address/index'
					},
					{
						img: 'https://dmkqiniu.medsnk.cn/user_xtsz.png',
						name: '系统设置',
						pagePath: '/pages/my/set/index'
					}
				]
			}
		},
		onLoad() {
			this.getData()
		},
		async onPullDownRefresh() {
			await this.getData()
			uni.stopPullDownRefresh()
		},
		methods: {
			// 获取我的首页信息
			async getData() {
				const {
					code,
					data
				} = await this.$api({
					url: 'user/index.php'
				})
				if (code) {
					this.data = data
					this.maskShow = false
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.user_info {
		margin-top: -142upx;
		position: relative;
		margin-left: 20upx;
		margin-right: 20upx;
		background: #fff;
		border-radius: 10upx;

		.top1_box {
			height: 100upx;
			padding: 31upx;

			.view {
				flex: 1;
			}

			.line {
				height: 100upx;
				width: 2upx;
				background: #F1F1F1;
			}
		}
	}

	.bannerImg {
		image {
			height: 178upx;
			width: 100%;
			border-radius: 20upx;
		}

	}

	.title {
		height: 80upx;
	}

	.center-wrapper {
		font-size: 24upx;
		color: #333333;

		.center_sign {
			width: 25%;
			display: flex;
			flex-direction: column;
			justify-content: center;

			.image-wrapper {
				margin-bottom: 15upx;
				margin-top: 28upx;
			}

			.tip {
				text-align: center;
				margin-bottom: 30upx;
			}

			image {
				width: 54upx;
				height: 54upx;
			}
		}
	}

	.order-wrapper {
		font-size: 24upx;
		color: #4E4E4E;

		.order_sign {
			width: 20%;
			display: flex;
			flex-direction: column;
			justify-content: center;

			.image-wrapper {
				margin-bottom: 15upx;
				margin-top: 28upx;
				position: relative;

				.number {
					position: absolute;
					top: -16upx;
					right: -16upx;
					border: 2upx solid rgba(255, 255, 255, 1);
					border-radius: 50%;
					font-size: 20upx;
					color: #fff;
					display: flex;
					align-items: center;
					justify-content: center;
					height: 32upx;
					min-width: 32upx;
					box-sizing: border-box;
					background: linear-gradient(-46deg, rgba(11, 40, 245, 1), rgba(80, 184, 249, 1));
				}
			}

			.tip {
				text-align: center;
				margin-bottom: 30upx;
			}

			image {
				width: 50upx;
				height: 50upx;
			}
		}
	}

	.topCard {
		// background: url('https://dmkqiniu.medsnk.cn/my/user_top_bg.png') no-repeat center;
		height: 446upx;
		background-size: 100% 100%;
		position: relative;

		.right {
			position: absolute;
			right: 32upx;
			top: 59upx;
		}

		.mesBox {
			width: 46upx;
			height: 45upx;
		}

		.szBox {
			width: 38upx;
			height: 33upx;
			margin-left: 30upx;
		}

		.infoBox {
			padding: 115upx 54upx 0;

			image {
				width: 100upx;
				height: 100upx;
				margin-bottom: 12upx;
			}

			.huiyuan_wenzi {
				margin-top: 3upx;
				margin-bottom: 6upx;
			}
		}

		.copy {
			border: 1px solid #fff;
			border-radius: 4upx;
			padding: 0 8upx;
			margin-left: 10upx;
		}

		.signBox {
			height: 48upx;
			padding-left: 22upx;
			box-sizing: border-box;
			position: absolute;
			right: 0;
			top: 195upx;
			width: 110upx;
			border-radius: 24upx 0 0 24upx;
			background: linear-gradient(180deg, rgba(255, 255, 255, 1), rgba(195, 240, 253, 1));

			image {
				width: 20upx;
				height: 20upx;
				margin-left: 11upx;
			}
		}
	}
</style>
