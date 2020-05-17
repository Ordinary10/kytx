<template>
	<view>
		<view class="clearBox">
			<view class="fr">
				邀请明细
			</view>
		</view>
		<view class="border-f1">
			
		</view>
		<view class="content">
			<view class="flex-b-c">
				<view class="ft26">
					<text class="c-333">我的邀请码：</text>
					<text class="c-red">3456ER</text>
				</view>
				<view class="yaoqing_btn flex-c">
					复制邀请码
				</view>
			</view>
			<view class="userBox">
				<view class="flex-a-c flex-lr user_top">
					<image class="user_img" src="https://dmkqiniu.medsnk.cn/63.png" mode=""></image>
					<view class="ft32 c-333 ml25 ellipsis">
						张大壮
					</view>
				</view>
				<image class="goods_img" src="https://zkimg.mmxinshe.com/15728468094303.jpg" mode=""></image>
				<view class="flex-b-c code-wrapper">
					<view class="">
						<view class="ft22 c-666">
							加入即可获得199原力
						</view>
						<view class="ft24 c-333 fw mt10">
							长按识别二维码，立即加入
						</view>
					</view>
					<image class="code" src="https://dmkqiniu.medsnk.cn/18.png" mode=""></image>
				</view>
			</view>
			<view class="tips">
				<view class="">
					提示：
				</view>
				<view class="">
					1、保存图片，将二维码图片转发到微信朋友圈，或发送给朋友
				</view>
				<view class="">
					2、二维码带有您的身份识别参数，用户通过识别二维码加入金道圣王，用户注册成功后您获得的奖励可在我的原力里查看
				</view>
			</view>
			<view class="save_btn flex-c">
				保存图片到手机
			</view>
			<view class="mb15 pdt35 ft26 c-333">
				我的邀请链接：
			</view>
			<view class="ft32 c-red">
				https://lanhuapp.com/web/#/item/
			</view>
			<view class="copy_btn flex-c">
				复制链接邀请好友注册
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
page{
	background: #FFFFFF
}
.content{
	padding:49upx 60upx;
}
.yaoqing_btn{
	width:152upx;
	height:56upx;
	color: #fff;
	font-size: 24upx;
	background:linear-gradient(-90deg,rgba(249,50,38,1),rgba(254,139,52,1));
	box-shadow:0px 10upx 20upx 0px rgba(113,17,195,0.1);
	border-radius:6upx;
}
.userBox{
	height:944upx;
	background:rgba(255,255,255,1);
	box-shadow:0px 7upx 31upx 0px rgba(0, 0, 0, 0.09);
	border-radius:8upx;
	margin-top: 71upx;
	.user_top{
		height: 169upx;
		padding: 0 29upx;
	}
	.user_img{
		width: 110upx;
		height: 110upx;
		border-radius: 50%;
	}
	.goods_img{
		height: 614upx;
		width: 100%;
	}
	.code-wrapper{
		padding: 22upx 20upx 0 24upx;
		.code{
			height: 114upx;
			width: 114upx;
		}
	}
}
.tips{
	padding: 60upx 23upx;
	font-size: 20upx;
	color: #666;
	>view{
		line-height: 40upx;
	}
}
.save_btn{
	margin: 30upx auto;
	width:500upx;
	height:80upx;
	background:linear-gradient(-90deg,rgba(249,50,38,1),rgba(254,139,52,1));
	box-shadow:0px 10upx 20upx 0px rgba(226,27,14,0.1);
	border-radius:40upx;
	color: #fff;
	font-size: 29upx;
}
.copy_btn{
	margin: 45upx auto;
	width:500upx;
	height:80upx;
	border:2upx solid #F93226;
	border-radius:40upx;
	color: #FE4338;
	font-size: 29upx;
}
</style>
