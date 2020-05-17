<template>
	<view>
		<view class="title">
			请选择您的反馈问题类型（必选）
		</view>
		<view class="info">
			<view class="flexWrap">
				<view class="size_box" :class="{active: index === activeIndex}" v-for="(item,index) in size_list" :key='index' @click="changeActive(index)">
					{{item.name}}
				</view>
			</view>
			<view class="textarea-wrapper">
				<textarea class="ft26 c-333" v-model="form.content" placeholder="说点儿什么吧" placeholder-class="ft26 c-999"></textarea>
			</view>
			<view class="mt20 upload_img" @click="chooseImg">
				<image class="img_path" :src="form.img" mode="center" v-if="form.img"></image>
				<uni-icons type="plus-filled" size="30" color="#999" v-if="!form.img"></uni-icons>
				<image v-if="form.img" style="background-color: #999;border-radius: 50%;" class="img_icon" src="https://dmkqiniu.medsnk.cn/assets/img/feedback/delete.png" @click.stop="form.img = ''"></image>
			</view>
		</view>
		<view class="ft24 flex-a-c mt20 pdl30 pdr30 bjfff" style="height: 90upx;">
			<view class="c-333" @click="aaa" style="width: 150upx;">
				联系方式
			</view>
			<view class="">
				<input type="number" maxlength="11" class="ft24 c-333" v-model="form.mobile" placeholder="请输入您的联系方式"
				 placeholder-class="ft24 c-999" />
			</view>
		</view>
		<view class="btn flex-c" @click="submit">
			提交问题
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					type: '',
					content: '',
					img: '',
					mobile: ''
				},
				mobile: '15236333333',
				activeIndex: 0,
				img: 'https://gss0.bdstatic.com/70cFfyinKgQIm2_p8IuM_a/daf/pic/item/34fae6cd7b899e5195d5334f4da7d933c8950d15.jpg',
				size_list: [{
						vlaue: 1,
						name: '投诉销售'
					},
					{
						vlaue: 2,
						name: '投诉客服'
					},
					{
						vlaue: 3,
						name: '商品问题'
					},
					{
						vlaue: 4,
						name: '新品需求'
					},
					{
						vlaue: 5,
						name: '其他'
					}
				]
			}
		},
		onLoad() {
			this.form.mobile = this.$store.state.userInfo.user_mobile
		},
		methods: {
			changeActive(index) {
				this.activeIndex = index
				this.form.type = this.size_list[index].value
			},
			async chooseImg() {
				const path = await this.$common.uploadImage()
				this.form.img = path
			},
			async submit() {
				if(this.form.content === '') {
					this.$common.toast('请填写反馈内容')
				} else {
					const {code,msg} = await this.$api({
						url: 'app/user/feedBack',
						data: {
							...this.form
						},
						loadingStr: '提交中...'
					})
					if(code) {
						this.$common.toast(msg)
						let timer = setTimeout(function(){
							uni.navigateBack()
							clearTimeout(timer)
							timer = null
						},1500)
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	.info {
		padding: 20upx 30upx;
		background: #fff;

		.size_box {
			font-size: 28upx;
			color: #666;
			border: 1upx solid #e6e6e6;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 50upx;
			border-radius: 25upx;
			box-sizing: border-box;
			min-width: 152upx;
			padding: 0 16upx;
			margin-right: 20upx;
			margin-bottom: 20upx;
			text-align: center;
		}
		
		.upload_img {
			width: 140rpx;
			height: 140rpx;
			border-radius: 10rpx;
			position: relative;
			border: 2rpx dashed #999;
			display: flex;
			justify-content: center;
			align-items: center;
			
			.img_path {
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
				z-index: 99;
			}
			.img_icon {
				width: 40rpx;
				height: 40rpx;
				position: absolute;
				top: -20rpx;
				right: -20rpx;
				z-index: 100;
			}
		}
		
		.active {
			color: white;
			background-color: #fe8b34;
			border: 1upx solid #fe8b34;
		}
		.textarea-wrapper {
			border: 1upx solid #e6e6e6;
			padding: 30upx;
			border-radius: 10upx;
		}

		// .add_Img_box{
		// 	image{
		// 		width: 140upx;
		// 		height: 140upx;
		// 	}
		// }
	}

	.title {
		height: 70upx;
		line-height: 70upx;
		color: #666;
		font-size: 24upx;
		padding: 0 30upx;
	}

	.item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30upx;
		background: #fff;
		height: 88upx;
		color: #666;
		border-bottom: 1upx solid #F1F1F1;

		input {
			color: #333;
			font-size: 30upx;
			width: 70%;
		}
	}

	.btn {
		margin: 64upx 80upx 0;
		color: #fff;
		font-size: 30upx;
		height: 90upx;
		border-radius: 45upx;
		background: linear-gradient(-90deg, rgba(249, 50, 38, 1), rgba(254, 139, 52, 1));
		box-shadow: 0px 10upx 20upx 0px rgba(226, 27, 14, 0.1);
	}
</style>
