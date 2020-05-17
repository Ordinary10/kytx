<template>
	<!-- 空值状态显示 -->
	<view class="nullPage" :style="{'padding-top':nulldata.top}">
		<image class='nullImg' :src="nulldata.img"  :style="{'width':nulldata.width,'height':nulldata.height}"></image>
		<view class="nullText">{{nulldata.text}}</view>
	</view>
	
</template>
<script>
	export default {
		props:["nulldata"],
		data() {
			return {
				is:false
			}
		}, 
		created() {
			let  that = this;
			if(that.nulldata.top){
				that.is=true
			}
		 },
		methods: {

		}
	}
</script>

<style>
	.active{
		padding-top:275upx !important;
	}
	.nullPage{
		padding-top:142upx;
		text-align: center;
		padding-bottom: 100upx;
	}
	.nullImg{
		width: 272upx;
		height: 204upx;
		margin-bottom: 35upx;
	}
	.nullText{
		color: #FF9E20;
		font-size: 28upx;
	}
	
</style>
