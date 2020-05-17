<template>
	<view class="">
		<view class="item flex-b-c" @click="go_detail">
			<view class="">
				<view class="ft30 c-0e0e0e">
					收款-张三三
				</view>
				<view class="ft24 c-B3B4C0">
					2019-09-20 06:43
				</view>
			</view>
			<view class="ft34 c-red fw">
				+400.40 RMB
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
			go_detail(){
			uni.navigateTo({
				url:'./income_list_detail'
			})	
			}
		}
	}
</script>

<style lang="scss">
page{
	background: #fff;
}
.item{
	margin: 0 30upx;
	border-bottom: 1px solid #F1F1F1;
	min-height: 145upx;
}
</style>
