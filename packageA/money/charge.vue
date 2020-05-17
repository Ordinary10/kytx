<template>
	<view class="pd30">
		<view class="ft34 c-111" style="margin-top: 50upx;margin-bottom: 45upx;">
			选择充值金额
		</view>
		<view class="flexWrap">
			<view :class="['money',{'active':i==100}] " v-for="i in list">
				{{i}}元
			</view>
		</view>
		<view class="input">
			<input type="number" placeholder="也可输入其他金额" placeholder-class="c-999" />
		</view>
		<view class="btn">
			充值
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[
					'100',
					'200',
					'400',
					'600',
					'1000',
					'2000',
					'4000',
					'5000',
				]
			};
		}
	}
</script>

<style lang="scss">
	page{
		background: #fff;
	}
	.money{
		width:146upx;
		height:84upx;
		border:2upx solid rgba(211,211,211,1);
		border-radius:10upx;
		font-size: 34upx;
		color: #777777;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 30upx;
		margin-bottom: 30upx;
		&.active{
			border-color: #FE4338;
			color: #FE4338;
		}
		&:nth-of-type(4n){
			margin-right: 0;
		}
	}
	.input{
		margin-top: 10upx;
		height:88upx;
		padding: 0 20upx;
		border:2upx solid rgba(211,211,211,1);
		border-radius:10upx;
		display: flex;
		align-items: center;
		justify-content: center;
		input{
			width: 100%;
			font-size: 34upx;
		}
	}
	.btn{
		margin: 109upx 28upx 0 ;
		height:88upx;
		line-height:88upx;
		background:linear-gradient(-90deg,rgba(249,50,38,1),rgba(255,122,21,1));
		box-shadow:0px 8upx 16upx 0px rgba(249,52,38,0.2);
		border-radius:44upx;
		color: #fff;
		font-size: 36upx;
		text-align: center;
	}
</style>
