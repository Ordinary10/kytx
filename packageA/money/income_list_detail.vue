<template>
	<view>
		<view class="card">
			<view class="money">
				400.40 BTC
			</view>
			<view class="mt30 c-666 ft30 pdb30">
				已收款
			</view>
			<view class="mt40">
				转账用户：134 3455 3454
			</view>
			<view class="mt40">
				到账时间：2019-09-19 12:12:12
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
			
		}
	}
</script>

<style lang="scss">
.card{
	margin: 20upx auto;
	padding: 29upx;
	box-sizing: border-box;
	width:680upx;
	height:464upx;
	background:rgba(255,255,255,1);
	box-shadow:5upx 9upx 20upx 0px rgba(224,224,224,0.2);
	border-radius:10upx 10px 2upx 2upx;
	font-size: 28upx;
	color: #111;
	.money{
		font-size: 64upx;
		margin-top: 50upx;
	}
}
</style>
