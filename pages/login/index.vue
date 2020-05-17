<template>
	<view id="popup" v-if="popupShow"></view>
	<view class="content" v-else>
		<view class="top">
			<view class="titel">登录</view>
			<view class="item">
				<view class="itemtext">手机号</view>
				<view class="flex-b-c">
					<input class="uni-input ft36" v-model="form.phone" maxlength="11" @focus="phonefocus=true" @blur="phonefocus=false"
					 type="number" placeholder-style="color:#AEB2B8" placeholder-class="ft36" placeholder="请输入手机号码" />
					<image v-show="$validate.isPhone(form.phone)" src="https://dmkqiniu.medsnk.cn/selected.png"></image>
					<!-- <image v-show="!validate_phone" src="https://dmkqiniu.medsnk.cn/select.png" mode=""></image> -->
				</view>
			</view>
			<view class="border-select" v-if="phonefocus"></view>
			<view class="border-f1" v-else></view>
			<view class="item" style="margin-top: 70upx;">
				<view class="codeBox flex-b-c">
					<input class="uni-input ft24" v-model="form.code" maxlength="6" type="number" @focus="codefocus=true" @blur="codefocus=false"
					 placeholder-style="color:#AEB2B8" placeholder="请输入验证码" />
					<text class="c-77808A ft27 code" @click="sendYzm">{{ codeText }}</text>
				</view>
			</view>
			<view class="border-select" v-if="codefocus"></view>
			<view class="border-f1" v-else></view>
		</view>
		<!-- 按钮 -->
		<view class="btn ft28 c-fff flex-c" @click="submit()">
			登录
		</view>
		<view class="weixin flex-c">
			<button class="flex-column-c" open-type="getPhoneNumber" @getphonenumber="getphonenumber">
				<image style="width: 44upx;height: 44upx;" src="https://dmkqiniu.medsnk.cn/weixin.png" mode=""></image>
				<view class="ft20 mt7" style="color: #AEB2B8;">
					微信快捷登录
				</view>
			</button>
		</view>
		<view class="agreeBox flex-c">
			<view class="ft24 c-AEB2B8">
				<text>登录即代表同意</text>
				<navigator class="c-red" url="/pages/login/protocol">
					《用户服务协议及隐私政策》
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					phone: '',
					code: '',
				},
				codeText: '获取验证码',
				timer: null,
				count: 60,
				phonefocus: false,
				codefocus: false,
				popupShow: true
			}
		},
		onLoad() {
			if(this.$store.state.isLogin) {
				this.$common.$toast({
					title: '你已授权登录,即将前往首页'
				})
				let timer = setTimeout(() => {
					uni.switchTab({
						url: '/pages/index/index'
					})
				}, 1500)
			} else {
				this.popupShow = false
			}
		},
		methods: {
			// 获取验证码
			async sendYzm() {
				const phone = this.form.phone
				if (!this.timer) {
					if (!this.$validate.isPhone(phone)) {
						this.$common.toast('请输入正确的手机号')
						return
					}
					const {
						code,
						msg
					} = await this.$api({
						url: 'user/sendCode.php',
						data: {
							user_mobile: phone
						},
						loadingStr: '短信发送中...'
					})
					if (code) {
						this.$common.toast(msg)
						this.codeText = `${this.count}S后重新发送`
						this.timer = setInterval(() => {
							if (this.count !== 0) {
								this.count--
								this.codeText = `${this.count}S后重新发送`
							} else {
								clearInterval(this.timer)
								this.timer = null;
								this.codeText = '重新获取'
								this.count = 60
							}
						}, 1000)
					}
				}
			},
			// 微信授权获取手机号
			getphonenumber(res) {
				console.log(res)
			},
			// 提交
			async submit() {
				if (!this.$common.isObjectEmpty(this.form)) {
					this.$common.toast('请填写完整信息后提交')
					return
				}
				const {
					code,
					msg,
					data
				} = await this.$api({
					url: 'user/login.php',
					data: {
						user_mobile: this.form.phone,
						mt_code: this.form.code
					},
					loadingStr: '登录中...'
				})
				if (code) {
					this.$common.$toast({
						title: '登录成功',
						icon: 'success'
					})
					this.$store.state.userInfo = data
					const timer = setTimeout(() => {
						uni.switchTab({
							url: '/pages/index/index'
						})
					}, 1000)
				}
			}
		}
	}
</script>

<style lang="scss">
	.border-f1 {
		background: #D3DFEF;
		height: 4upx;
	}

	.border-select {
		height: 4upx;
		background: linear-gradient(136deg, rgba(249, 50, 38, 1) 0%, rgba(254, 139, 52, 1) 100%);
	}

	page {
		background-color: #fff;
	}

	.content {
		width: 100%;
		height: 100vh;
		background-size: 100% !important;
		background-position: bottom !important;
		background-repeat: no-repeat !important;

		.top {
			padding: 220upx 29upx 0 29upx;

			.titel {
				font-size: 52upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: rgba(51, 51, 51, 1);
				padding-bottom: 54upx;
			}

			.item {
				padding: 20upx 0;
				font-size: 24upx;

				.itemtext {
					width: 179upx;
					color: #77808A;
					padding-bottom: 20upx;
				}

				.uni-input {
					width: 60%;
				}

				image {
					width: 28upx;
					height: 28upx;
				}

			}
		}

		.btn {
			margin: auto;
			margin-top: 86upx;
			margin-bottom: 80upx;
			width: 630upx;
			height: 88upx;
			background: linear-gradient(270deg, rgba(249, 50, 38, 1) 0%, rgba(254, 139, 52, 1) 100%);
			border-radius: 44upx;
		}

		.agreeBox {
			position: fixed;
			bottom: 26upx;
			left: 0;
			right: 0;
		}


	}

	.code {
		width: 230upx;
		text-align: right;
	}
</style>
