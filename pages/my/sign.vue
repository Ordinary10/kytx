<template>
	<view id="popup" v-if="popupShow"></view>
	<view class="" v-else>
		<view class="userBox ">
			<image class="wh100b" src="https://dmkqiniu.medsnk.cn/jff_bg.png" mode=""></image>
			<navigator class="user flex-a-c" url="/pages/dmk/index">
				<image class="tx" src="https://dmkqiniu.medsnk.cn/assets/img/user/user_mr.png"></image>
				<text class="ft32">我的DMK</text>
				<text class="ft38 fw ml10">{{data.dmk_balance}}</text>
				<image class="icon" src="https://dmkqiniu.medsnk.cn/qd_gd.png" mode=""></image>
			</navigator>
		</view>
		<view class="signBox">
			<view class="flex-b-c">
				<view class="">
					<view class="fw c-111 ft30">
						{{data.sing_title}}
					</view>
					<view class="c-999 ft24 mt10">
						{{data.sing_tip}}
					</view>
				</view>
				<view class="signBtn" v-if="data.today_is_sign !== '1'" @click="sign">
					<image src="https://dmkqiniu.medsnk.cn/qdzq_qd.png" mode=""></image>
					签到
				</view>
			</view>
			<view class="time_boxs flexWrap">
				<view class="time_box ft22" v-for="(item,index) in data.sign_list" :key="index">
					<view class="flex-column-c bj">
						<view class="c-999 text-c" v-if="item.is_sign">
							{{item.score}}
						</view>
						<view class="c-666 text-c" v-else>
							{{item.score}}
						</view>
						<view class="flex-c mt5">
							<image v-if="item.is_sign == 1" src="https://dmkqiniu.medsnk.cn/qdd_yl.png" mode=""></image>
							<image v-else src="https://dmkqiniu.medsnk.cn/qdd_wl.png" mode=""></image>
						</view>
					</view>
					<view class="mt10">
						<view class="c-999 text-c" v-if="item.is_today">
							今天
						</view>
						<view class="c-999 text-c" v-else-if="item.is_sign">
							已领
						</view>
						<view class="c-666 text-c" v-else>
							{{item.score}}天
						</view>
					</view>
					
				</view>
			</view>
		</view>
		<view class="title flex-a-c">
			<view class="line"></view>
			<view class="ft36 ml25 c-111">
				获取条件
			</view>
		</view>
		<view class="border-f1">
		</view>
		<view class="bjfff">
			<view class="item flex-b-c">
				<view class="flex-b-c">
					<image src="https://dmkqiniu.medsnk.cn/qd_mr.png" mode=""></image>
					<view class="">
						<view class="ft34 c-111">
							每日签到
						</view>
						<view class="c-999 ft22 mt5">
							连续签到获得更多DMK
						</view>
					</view>
				</view>
				
			</view>
			
			<view class="item flex-b-c">
				<view class="flex-b-c">
					<image src="https://dmkqiniu.medsnk.cn/qd_gw.png" mode=""></image>
					<view class="">
						<view class="ft34 c-111">
							购物获得
						</view>
						<view class="c-999 ft22 mt5">
							购买不同的商品获得不同的DMK
						</view>
					</view>
				</view>
				<navigator class="btn" url="/pages/index/search">
					去购买
				</navigator>
			</view>
			
			<view class="item flex-b-c">
				<view class="flex-b-c">
					<image src="https://dmkqiniu.medsnk.cn/qd_mr.png" mode=""></image>
					<view class="">
						<view class="ft34 c-111">
							邀请好友
						</view>
						<view class="c-999 ft22 mt5">
							邀请您的好友加入可获得相应的DMK
						</view>
					</view>
				</view>
				<navigator class="btn" url="/pages/my/share">
					去邀请
				</navigator>
			</view>
		</view>
		
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				popupShow: true,
				data: null
			}
		},
		onShow() {
			this.getSignInfo()
		},
		methods: {
			async getSignInfo() {
				const {code,data} = await this.$api({
					url: 'user/sign/index.php'
				})
				if(code) {
					this.data = data
					this.popupShow = false
				}
			},
			async sign() {
				const {code,msg} = await this.$api({
					url: 'user/sign/add.php'
				})
				if(code) {
					this.$common.toast(msg)
					let timer = setTimeout(() => {
						this.getSignInfo()
						clearTimeout(timer)
						timer = null
					}, 1500)
				}
			}
		}
	}
</script>

<style lang="scss">
	.userBox{
		height: 257upx;
		position: relative;
		.user{
			position: absolute;
			top: 30upx;
			left: 30upx;
			right: 30upx;
			color: #fff;
			.tx{
				width: 52upx;
				height: 52upx;
				border-radius: 50%;
				margin-right: 9upx;
			}
			.icon{
				width: 22upx;
				height: 22upx;
				margin-left: 7upx;
			}
		}
	}
	.item{
		margin:0 25upx;
		height: 127upx;
		border-bottom: 1upx solid #f1f1f1;
		image{
			width: 44upx;
			height: 44upx;
			margin-left: 12upx;
			margin-right: 30upx;
		}
		.btn{
			height:47upx;
			line-height: 47upx;
			background:linear-gradient(-90deg,rgba(249,50,38,1),rgba(254,139,52,1));
			border-radius:24upx;
			width: 109upx;
			font-size: 24upx;
			color: #FFFFFF;
			text-align: center;
		}
	}
	.title{
		height: 97upx;
		padding: 0 30upx;
		margin-top: 195upx;
		background: #fff;
		.line{
			width:8upx;
			height:34upx;
			background:rgba(254,67,56,1);
		}
	}
.signBox{
	width: 688upx;
	background: #fff;
	height: 312upx;
	padding: 20upx;
	box-sizing: border-box;
	position: absolute;
	top: 121upx;
	left: 30upx;
	border-radius:10upx;
	.signBtn{
		display: flex;
		align-items: center;
		width: 155upx;
		height: 60upx;
		border-radius:30upx;
		justify-content: center;
		font-size: 26upx;
		color: #fff;
		background: #FD7C32;
		image{
			width: 36upx;
			height: 36upx;
			margin-right: 10upx;
		}
	}
	.time_boxs{
		margin-top: 50upx;
		.time_box{
			margin-right: 26upx;
			&:last-of-type{
				margin-right: 0;
			}
			.bj{
				width:68upx;
				height:80upx;
				background:rgba(240,240,240,1);
				border-radius:14upx;
				image{
					width:32upx;
					height:32upx;
				}
			}
		}
	}
}
</style>
