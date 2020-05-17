<template>
	<view>
		<view class="card">
			<view class="money">
				-400.40元
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
			<view class="mt40">
				到账时间：2019-09-19 12:12:12
			</view>
		</view>
		<view class="btn flex-c" @click="quxiao">
			取消提现
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
			quxiao(){
				uni.showModal({
					cancelColor:'#FE4338',
					confirmColor:'#FE4338',
					 content: '确定要取消提现吗',
					success:function(res){
						 if (res.confirm) {
						            console.log('用户点击确定');
						        } else if (res.cancel) {
						            console.log('用户点击取消');
						        }
					}
				})
			}
		}
	}
</script>

<style lang="scss">
.card{
	margin: 20upx auto;
	padding: 29upx 29upx 60upx;
	box-sizing: border-box;
	width:680upx;
	min-height:464upx;
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
.btn{
	margin:110upx auto 0;
	width:600upx;
	height:78upx;
	background:linear-gradient(126deg,#B3B4C1,#C0C1CF);
	box-shadow:0px 10upx 20upx 0px rgba(134,135,147,0.2);
	border-radius:39upx;
	font-size: 32upx;
	color: #fff;
}
</style>
