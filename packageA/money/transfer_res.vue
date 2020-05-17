<template>
	<view>
		<view class="caozuo_title">
			<view class="">
				关闭
			</view>
		</view>
		<view class="positionR" style="padding: 34upx 22upx 0;">
				<image class="bj" src="https://dmkqiniu.medsnk.cn/money1.png" mode=""></image>
			<view class="info">
				<view class="flex-c">
					<image class="tubiao" src="https://dmkqiniu.medsnk.cn/money2.png" mode=""></image>
				</view>
				<view class="text-c ft36 fw">
					转账成功
				</view>
				<view class="text-c c-0e0e0e mt25">
					<text class="fw ft50" >600.34</text>
					<text class="ft40 ml5">BTC</text>
				</view>
				<view class="flex-b-c ft28 c-333" style="padding-left: 78upx; padding-right: 89upx;margin-top: 209upx;">
					<view class="">
						收款用户
					</view>
					<view class="c-666 ellipsis">
						徐心心(*三三)
					</view>
				</view>
				<view class="flex-b-c ft28 c-333 mt30" style="padding-left: 78upx; padding-right: 89upx;">
					<view class="">
						转账币种
					</view>
					<view class="c-666 ellipsis">
						BTC
					</view>
				</view>
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
.bj{
	width: 706upx;
	height: 738upx;
}
.info{
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
	.tubiao{
		width: 160upx;
		height: 160upx;
		margin: 76upx auto 25upx;
	}
}
</style>
