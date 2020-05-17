<template>
	<!-- 空值状态显示 -->
	<view class="layerBox">
		<view class="editAdrees"> 
			<view class="title">
				{{submitdata.title}}
				<view class="close" @click="cancelbtn">
					<image src="../static/image/16.png" mode=""></image>
				</view>
			</view>
			 <view class="info  ft26 c-111">
				{{submitdata.text}}
			</view>
			<view class="border-f1"></view>
			 <view class="footer ft26 flex-c" @click="surebtn">
				 <view class="c-red" >{{submitdata.btn}}</view>
			 </view>
		</view>
	</view>
	
</template>
<script>
	export default {
		props:["submitdata"],
		data() {
			return {
				
			}
		}, 
		created() {
			let  that = this;
			
		 },
		methods: {
             surebtn(){
             	this.$emit('surebtn')
             },
			 cancelbtn(){
			 	this.$emit('cancelbtn')
			 }
		}
	}
</script>

<style lang="scss">
	.layerBox{
		text-align: center;
	}
	.editAdrees{
		.title{
			text-align: center;
			font-size: 30upx;
			font-weight: bold;
			padding-top: 45upx;
			position: relative;
			.close{
				position: absolute;
				top: 21upx;
				right: 19upx;
				image{
					width: 46upx;
					height: 46upx;
				}
			}
		}
		
		.ft30{
			font-size: 30upx;
		}
		position: fixed;
		z-index: 100;
		top:420upx;
		left:calc((100% - 560upx) / 2);
		width:560upx;
		min-height:338upx;
		background:rgba(255,255,255,1);
		box-shadow:0px 6upx 12upx rgba(0,0,0,0.16);
		opacity:1;
		border-radius:20upx;
		.info{
			min-height: 180upx;
			margin: auto;
			padding: 0 50upx;
			line-height: 50upx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.footer{
			width:100%;
			height:90upx;
			opacity:1;
			border-radius:0px 0px 20px 20px;
		}
	}
	
</style>
