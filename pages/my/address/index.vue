<template>
	<view id="popup" v-if="popupShow"></view>
	<view v-else class="box">
		<view class="items" v-if="addressList.length > 0">
			<view class="item" v-for="(item, index) in list" :key="index">
				<view class="" style="padding: 28upx 30upx;">
					<view class="flex-b-c" style="line-height: 56rpx;">
						<view class="flex">
							<view class="name ellipsis">
								{{item.consignee}}
							</view>
							<view class="mobile">
								{{item.mobile}}
							</view>
						</view>
						<image class="use_btn_img" v-if="item.is_default === '1'" src="https://dmkqiniu.medsnk.cn/21.png" mode=""></image>
						<view class="use_btn" v-else @click="setDefault(item)">
							使用
						</view>
					</view>
					<view class="address">
						{{item.city_name}}-{{item.province_name}}-{{item.district_name}} {{item.address}}
					</view>
				</view>
				<view class="flex-b-c btns">
					<view class="default flex-a-c" v-if="item.is_default === '1'">
						<image src="https://dmkqiniu.medsnk.cn/selected.png" mode=""></image>
						<text class="c-red">设为默认</text>
					</view>
					<view class="default flex-a-c" v-else @click="setDefault(item)">
						<image src="https://dmkqiniu.medsnk.cn/select.png" mode=""></image>
						<text>设为默认</text>
					</view>
					<view class="flex-a-c" v-if="!isCard">
						<view class="edit flex-a-c" @click="editorAddress(item)">
							<image src="https://dmkqiniu.medsnk.cn/edit.png" mode=""></image>
							<text>编辑</text>
						</view>
						<view class="del flex-a-c" @click="delAddress(item)">
							<image src="https://dmkqiniu.medsnk.cn/delete.png" mode=""></image>
							<text>删除</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="no-address" v-else>
			<image src="https://dmkqiniu.medsnk.cn/assets/img/common/zwsj.png"></image>
			<text>暂无数据～</text>
		</view>
		<view class="footer_btn flex-c" @click="go_add">
			添加地址
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				popupShow: true,
				addressList: [],
				isCard: false
			}
		},
		computed: {
			list() {
				return this.addressList
			}
		},
		onLoad(option) {
			this.isCard = option.isCard || false
		},
		async onShow() {
			await this.$common.getAddressList()
			this.addressList = this.$store.state.addressList
			this.popupShow = false
		},
		onHide() {
			this.popupShow = true
		},
		methods: {
			async setDefault(item) {
				const {
					code,
					msg
				} = await this.$api({
					url: 'user/address/setDefault.php',
					data: {
						address_id: item.address_id
					}
				})
				if (code) {
					this.$common.toast(msg)
					await this.$common.getAddressList()
					this.addressList = this.$store.state.addressList
					this.isCard && uni.navigateBack()
				}
			},
			editorAddress(item) {
				uni.navigateTo({
					url: '/pages/my/address/add?address_id=' + item.address_id
				})
			},
			async delAddress(item) {
				uni.showModal({
					title: '提示',
					content: '确定删除该地址吗？',
					success: async ({
						confirm
					}) => {
						if (confirm) {
							const {
								code,
								msg
							} = await this.$api({
								url: 'user/address/del.php',
								data: {
									address_id: item.address_id
								}
							})
							if (code) {
								this.$common.toast(msg)
								await this.$common.getAddressList()
								this.addressList = this.$store.state.addressList
							}
						}
					}
				})
			},
			go_add() {
				uni.navigateTo({
					url: '/pages/my/address/add'
				})
			}
		}
	}
</script>

<style lang="scss">
	.items {
		padding-bottom: 90upx;
	}

	.no-address {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		image {
			width: 174rpx;
			height: 174rpx;
			margin-bottom: 42rpx;
		}

		text {
			font-size: 14px;
			color: #111;
		}
	}

	.footer_btn {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		height: 90upx;
		font-size: 32upx;
		color: #fff;
		background: linear-gradient(90deg, #ff8600, red);
	}

	.item {
		background: #FFFFFF;
		min-height: 248upx;
		box-sizing: border-box;
		margin-bottom: 20upx;

		.name {
			font-size: 32upx;
			color: #292621;
			margin-right: 30upx;
			max-width: 300upx;
		}

		.mobile {
			font-size: 32upx;
			color: #292621;
		}

		.use_btn {
			padding: 10upx 30upx;
			border-radius: 40upx;
			border: 1px solid #8a857c;
			font-size: 24upx;
			color: #8a857c;
			line-height: 24upx;

		}

		.use_btn_img {
			width: 36upx;
			height: 26upx;
		}

		.address {
			margin-top: 20upx;
			width: 80%;
			font-size: 28upx;
			color: #292621;
		}

		.btns {
			border-top: 1upx solid #F1F1F1;
			font-size: 24upx;
			color: #8a857c;
			padding: 0 30upx;
			height: 80upx;

			.default {
				image {
					width: 36upx;
					height: 36upx;
					margin-right: 12upx;
				}
			}

			.edit {
				image {
					width: 30upx;
					height: 30upx;
					margin-right: 10upx;
					margin-left: 30upx;
				}
			}

			.del {
				image {
					width: 30upx;
					height: 30upx;
					margin-right: 10upx;
					margin-left: 30upx;
				}
			}
		}
	}
</style>
