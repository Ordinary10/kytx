<template>
	<view class="">
		<view class="userBox ">
			<view class="ft32 c-fff information">
				使用说明
			</view>
			<image class="wh100b" src="https://dmkqiniu.medsnk.cn/ax_top_bg.png" mode=""></image>
			<view class="user">
				<image class="wh100b" src="https://dmkqiniu.medsnk.cn/ax_bg.png" mode=""></image>
				<view class="positionA" style="top:80upx;left: 46upx;">
					<view class="ft30">
						我的DMK
					</view>
					<view class="number flex-a-c">
						3456
						<image src="https://dmkqiniu.medsnk.cn/24.png" mode=""></image>
					</view>
				</view>
			</view>
			
		</view>
		<view class="items">
			<view class="item" v-for="(item,index) in dataList" :key="index">
					<view class="">
						<view class="flex-a-c">
							<text class="ft28 c-666 ">冻结(DMK)</text>
							<image class="help" src="https://dmkqiniu.medsnk.cn/23.png" mode=""></image>
						</view>
						<view class="ft40 c-111 mt35">
							453
						</view>
					</view>
					<image src="https://dmkqiniu.medsnk.cn/4.png" mode=""></image>
			</view>
		</view>
		
	</view>

</template>

<script>
	export default {
		data() {
			return {
					dataList:[
						'',''
					]
			};
		},
		methods:{
			charge(){
				uni.navigateTo({
					url:'./charge'
				})
			}
		}
	}
</script>

<style lang="scss">
	.userBox {
		height: 314upx;
		position: relative;
		.information{
			position: absolute;
			right: 30upx;
			top: 30upx;
			z-index: 3;
		}
		.user {
			position: absolute;
			top: 150upx;
			left: 20upx;
			right: 20upx;
			height: 280upx;
			color: #fff;
			.number {
				font-size: 60upx;
				margin-top: 20upx;
				image{
					width: 36upx;
					height: 36upx;
					margin-left: 10upx;
				}
			}
		}
	}
	.items{
		margin: 136upx 20upx;
		width:710upx;
		background:rgba(255,255,255,1);
		border-radius:20upx;
	}
	.item{
		padding: 0 28upx;
		height: 179upx;
		border-bottom: 1upx solid #F1F1F1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		image{
			height: 30upx;
			width: 30upx;
		}
		.help{
			height: 30upx;
			width: 30upx;
			margin-left: 28upx;
			display: block;
		}
	}
</style>
