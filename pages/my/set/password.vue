<template>
	<view>
		<view class="title">
			设置密码钱需验证您的身份信息
		</view>
		<view class="item ">
			<input type="number" v-model="form.user_mobile" placeholder="" disabled="" />
			<view class="yzmBox" @click="getCode">
				{{ codeText }}
			</view>
		</view>
		<view class="item ">
			<input 
				type="number"
				placeholder="请输入验证码" 
				placeholder-class="c-999 ft30" 
				maxlength="6"
				v-model="form.mt_code"
			 />
		</view>
		<view class="item ">
			<input
				type="password"
				placeholder="请输入支付密码" 
				maxlength="6"
				placeholder-class="c-999 ft30" 
				v-model="form.trade_pass"
			 />
		</view>
		<view class="item ">
			<input
				type="password"
				placeholder="请再次输入支付密码" 
				maxlength="6"
				placeholder-class="c-999 ft30" 
				v-model="form.trade_pass_con"
			 />
		</view>
		<view class="title">
			密码由6位数字组成
		</view>
		<view class="btn flex-c" @click="submit">
			确认
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					user_mobile: '',
					mt_code: '',
					trade_pass: '',
					trade_pass_con: ''
				},
				codeText: '获取验证码',
				count: 60,
				timer: null
			}
		},
		onLoad() {
			this.form.user_mobile = this.$store.state.userInfo.user_mobile
		},
		methods: {
			async getCode() {
				if(this.count === 60) {
					const phone = this.form.user_mobile
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
				}
			},
			async submit() {
				if(!/^[0-9]{6}$/.test(this.form.mt_code)) {
					this.$common.toast('请输入六位验证码')
				} else if(this.form.trade_pass !== this.form.trade_pass_con) {
					this.$common.toast('密码不一致')
				} else {
					const { code, msg } = await this.$api({
						url: 'user/pwd/setTradePass.php',
						data: {
							...this.form
						},
						loadingStr: '修改中...'
					})
					if(code) {
						this.$common.toast(msg)
						let timer = setTimeout(function(){
							uni.navigateBack()
							clearTimeout(timer)
							timer = null
						}, 1500)
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	.title{
		height: 100upx;
		line-height: 100upx;
		color: #666;
		font-size: 24upx;
		padding: 0 30upx;
	}
.item{
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 30upx;
	background: #fff;
	height: 88upx;
	color: #666;
	border-bottom: 1upx solid #F1F1F1;
	.yzmBox{
		font-size: 24upx;
		color: #666;
		border: 1upx solid #fbeeda;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 30upx;
		height: 54upx;
		border-radius: 27upx;
	}
	input{
		color: #333;
		font-size: 30upx;
		flex: 1;
	}
}
.btn{
	margin: 30upx 80upx 0;
	color: #fff;
	font-size: 30upx;
	height: 90upx;
	border-radius: 45upx;
	background:linear-gradient(-90deg,rgba(249,50,38,1),rgba(254,139,52,1));
	box-shadow:0px 10upx 20upx 0px rgba(226,27,14,0.1);
}
</style>
