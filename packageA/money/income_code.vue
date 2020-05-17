<template>
	<view class="page">
		<view class="card">
			<view class="card-header flex-a-c">
				<image class="mr20" src="https://dmkqiniu.medsnk.cn/sk_ssk.png" mode=""></image>
				<view class="">
					二维码收款
				</view>
			</view>
			<view class="card-body">
				<view class="text-c c-666 ft26 mt50">
					无需加好友，扫二维码向我转账
				</view>
				<image class="code" src="https://dmkqiniu.medsnk.cn/18.png" mode=""></image>
			</view>
			<view class="flex-b-c" @click="go_list" style="padding: 0 30upx;height: 115upx;">
				<view class="flex-a-c">
					<image 
					style="width: 28upx;height: 28upx; margin-left: 12upx;"
					 class="mr20" 
					 src="https://dmkqiniu.medsnk.cn/ssk_zb.png" mode=""></image>
					<view class="ft26 c-111">
						收款记录
					</view>
				</view>
				<image style="width: 24upx;height: 24upx;" class="mr20" src="https://dmkqiniu.medsnk.cn/4.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			go_list(){
				uni.navigateTo({
					url:'./income_list'
				})
			}
		}
	}
</script>

<style lang="scss">
	.page{
		height: 100vh;
		background: #D8B34C;
		overflow: hidden;
	}
	.card{
		width:712upx;
		height:800upx;
		background:rgba(255,255,255,1);
		border-radius:6upx;
		margin: 200upx auto;
		.card-header{
			height: 102upx;
			background: #F7F7F7;
			color: #DAB858;
			font-size: 28upx;
			padding: 0 39upx;
			image{
						width: 34upx;
						height: 34upx;
			}
		}
		.card-body{
			border-bottom: 1upx solid #f1f1f1;
			padding: 1upx 36upx;
			height: 580upx;
			.code{
				width: 358upx;
				height: 358upx;
				margin: 55upx auto 0;
				display: block;
			}
		}
	}

</style>
