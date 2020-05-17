<template>
	<view class="content">
<!-- 	   <rich-text class="rich" :nodes="showdata"></rich-text> -->
        <view class="title">
			用户协议与隐私政策
		</view> 
	   <view v-html='showdata'></view>						
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showdata:'用户协议用户协议用户协议用户协议',
			}
		},
		onLoad(val) {
		   let that=this
		 
		},
		methods: {
            getInfo(){
				let that=this
				// that.$post('/wechat/Login/Agreement', {
				// }, function(res) {
				// 	that.showdata = res.data
				// })
				
			},
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #fff;
	}
	.title{
		font-size:60upx;
		font-weight:500;
		color:#333;
	}
	.content {
	    padding: 35upx 60upx;
		font-family:PingFang SC;
		
	}
</style>
