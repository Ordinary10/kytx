<template>
	<view class="page">
		<view class="caozuo_title">
			<view class="" @click="out_list">
				提现记录
			</view>
		</view>
		<view class="border-f1">
		</view>
		<view class="info">
			<view class="item flex-b-c" @click="select_bank_card">
				<!-- <view class="c-333">
					134 3453 2344
				</view> -->
				<view class="flex-a-c">
					<view class="">
						到账银行卡
					</view>
					<image class="cardImg" :src="cardImg" mode=""></image>
					<view class=" ">
						工商银行 (0912)
					</view>
				</view>
				<image src="https://dmkqiniu.medsnk.cn/4.png" mode=""></image>
			</view>
			<view class="border-f1">
			</view>
			
			<view class="border-f1">
			</view>
			<view class="ft26 c-111 mt45">
				提现金额
			</view>
			<view class="money_input">
				<text class="mr10" style="font-size: 56upx;">￥</text>
				<input type="text" value="600.34" />
			</view>
			<view class="border-f1">

			</view>
		</view>
		<view style="flex: 1;overflow: hidden;" class="bjfff mt20">
			<view class="btn flex-c" :style="{'opacity':use_save?'1':'0.52'}" @click="save">
				提现
			</view>
		</view>
		<uni-popup ref="select_bank_card" type="bottom">
			<view class="select_bank_card_box">
				<view class="title ft34 c-0e0e0 flex-c">
					<image @click="close_select_box" class="close" src="https://dmkqiniu.medsnk.cn/22.png" mode=""></image>
					<view class="e te">
						选择到账银行卡
					</view>

				</view>
				<view class="border-f1">
				</view>
				<scroll-view scroll-y="true" class="select_items">
					<view class="select_item flex-a-c" v-for="(item,index) in select_items">
						<image src="https://dmkqiniu.medsnk.cn/sk_ssk.png" mode=""></image>
						<view class="ellipsis">
							工商银行  储蓄卡 (1092）
						</view>
					</view>
					<view class="select_item flex-a-c" @click="add_card">
						<image src="" mode=""></image>
						<view class="ellipsis">
							使用新卡提现
						</view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				// 设置支付密码
				have_password: true,
				cardImg:'https://dmkqiniu.medsnk.cn/sk_ssk.png',
				use_save:false,
				select_items:[
					'','',''
				]
			}
		},
		onShow() {
			let that = this
			if (!that.have_password) {
				that.$refs.have_password.open()
			}
			

		},
		methods: {
			select_bank_card() {
				let that = this
				that.$refs.select_bank_card.open()
			},
			close_select_box(){
				let that = this
				that.$refs.select_bank_card.close()
			},
			save(){
				// uni.navigateTo({
				// 	url:'./transfer_res'
				// })
			},
			out_list(){
				uni.navigateTo({
					url:'./out_list'
				}) 
			},
			add_card(){
				uni.navigateTo({
					url:'./add_card'
				})
			}

		}
	}
</script>

<style lang="scss">
	.info {
		padding: 0 29upx;
		background: #fff;
	}

	.item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		// padding: 0 30upx;
		height: 100upx;
		color: #666;
		font-size: 28upx;
		image {
			width: 26upx;
			height: 26upx;
		}
		.cardImg{
			width: 48upx;
			height: 48upx;
			margin-left: 37upx;
			margin-right: 10upx;
			border-radius: 50%;
		}
	}

	.money_input {
		padding: 30upx 0 28upx;
		font-weight: bold;
		display: flex;
		align-items: baseline;

		input {
			color: #333333;
			font-size: 76upx;
			border: none;
			height: 76upx;
		}
	}

	.page {
		height: 100vh;
		// position: absolute;
		// top: 0;
		// right: 0;
		// left: 0;
		// bottom: 0;
		display: flex;
		flex-direction: column;
	}

	.btn {
		margin: 60upx 55upx 0;
		color: #fff;
		font-size: 30upx;
		height: 90upx;
		border-radius: 45upx;
		background: linear-gradient(-90deg, rgba(249, 50, 38, 1), rgba(254, 139, 52, 1));
		box-shadow: 0px 10upx 20upx 0px rgba(226, 27, 14, 0.1);
	}

	.no_password_box {
		width: 517upx;
		height: 564upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 10upx;
		text-align: center;
		position: relative;

		image {
			width: 304upx;
			height: 214upx;
			margin-top: 37upx;
		}

		.close {
			position: absolute;
			top: 20upx;
			right: 20upx;

			image {
				width: 32upx;
				height: 32upx;
				margin: 0;
			}
		}

		.go_btn {
			width: 381upx;
			height: 75upx;
			background: linear-gradient(-90deg, rgba(230, 68, 54, 1), rgba(240, 143, 73, 1));
			box-shadow: 0px 10upx 20upx 0px rgba(102, 37, 188, 0.1);
			border-radius: 37upx;
			margin: 40upx auto 0;
			color: #fff;
		}
	}

	.select_bank_card_box {
		background: #FFFFFF;

		.title {
			height: 100upx;
			padding: 0 23upx;
			position: relative;

			.close {
				width: 30upx;
				height: 30upx;
				position: absolute;
				left: 23upx;
				top: 35upx;
			}
		}

		.select_items {
			padding: 0 28upx;
			max-height: 520upx;

			.select_item {
				height: 127upx;
				border-bottom: 1upx solid #F1F1F1;
				font-size: 28upx;
				color: #111;

				image {
					width: 48upx;
					height: 48upx;
					margin-right: 17upx;
				}
			}
		}

	}
</style>
