<template>
	<view id="popup" v-if="popupShow"></view>
	<view v-else>
		<view class="items">
			<view class="item">
				<view class="flex-a-c">
					<view class="left">
						收货人
					</view>
					<view class="flex-a-c">
						<input type="text" v-model="from.consignee" placeholder="请填写姓名" placeholder-class="c-999 ft30" />
					</view>
				</view>
			</view>
			<view class="item">
				<view class="flex-a-c">
					<view class="left">
						联系电话
					</view>
					<view class="flex-a-c">
						<input type="number" maxlength="11" v-model="from.mobile" placeholder="请填写联系电话" placeholder-class="c-999 ft30" />
					</view>
				</view>
			</view>
			<view class="item" @click="areaShow = true">
				<view class="flex-a-c">
					<view class="left">
						配送地址
					</view>
					<view class="flex-a-c">
						{{from.province_name}}{{from.city_name}}{{from.district_name}}
					</view>
				</view>
				<view class="flex-a-c">
					<i class="ml10 iconMore"></i>
				</view>
			</view>
			<view class="item">
				<view class="textarea-wrapper">
					<textarea v-model="from.address" placeholder="请填写详细地址(街道、楼牌号等)" placeholder-class="c-999 ft26"></textarea>
				</view>
			</view>
		</view>
		<view class="item bjfff" style="margin: 20upx 0 0; padding: 0 30upx;">
			<view class="flex-a-c c-333">
				设为默认地址
			</view>
			<view class="flex-a-c">
				<switch color="#FE4338" :checked="isChecked" @change="swichChange"/>
			</view>
		</view>
		<view class="btn flex-c" @click="submit">
			提交
		</view>
		<jq-area-select v-model="areaShow" @jqSubmit="areaChange" :startSelectIndex="startSelectIndex" v-if="areaIsLoad"></jq-area-select>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isChecked: false,
				isNewAdd: true,
				areaIsLoad:false,
				startSelectIndex: [0,0,0],
				areaShow: false,
				from: {
					address_id: 0,
					consignee: '',
					mobile: '',
					address: '',
					country: '',
					country_name: "",
					province: '110000',
					province_name: "北京",
					city: '110100',
					city_name: "北京市",
					district: '110101',
					district_name: "东城区",
					address_name: '',
					best_time: '09:00-12:00',
					is_default: '0'
				},
				address_id: -1,
				popupShow: true
			}
		},
		onLoad(option) {
			if (option.address_id) {
				this.address_id = option.address_id
				this.getAddressDetail(option.address_id)
			} else {
				this.popupShow = false
				this.areaIsLoad = true
			}
		},
		methods: {
			async getAddressDetail(address_id) {
				const {
					code,
					data
				} = await this.$api({
					url: 'user/address/view.php',
					data: {
						address_id
					}
				})
				if (code) {
					this.from = JSON.parse(JSON.stringify(data))
					this.isChecked = this.from.is_default === '1'
					const app = getApp()
					const cityData = app.globalData.cityData
					const index0 = cityData.findIndex(item => {
						return item.value = data.province
					})
					const index1 = cityData[index0].children.findIndex(item => {
						return item.value = data.city
					})
					const index2 = cityData[index0].children[index1].children.findIndex(item => {
						return item.value = data.district
					})
					this.startSelectIndex = [index0, index1, index2]
					this.areaIsLoad = true
					this.popupShow = false
				}
			},
			swichChange(e) {
				const isChecked = e.detail.value
				this.from.is_default = isChecked ? '1' : '0'
			},
			areaChange(e) {
				this.from.province = e[0].value
				this.from.city = e[1].value
				this.from.district = e[2].value
				this.from.province_name = e[0].lable
				this.from.city_name = e[1].lable
				this.from.district_name = e[2].lable
			},
			async submit() {
				const {
					consignee,
					mobile,
					address,
					country,
					province,
					city,
					district,
					address_name,
					best_time,
					is_default
				} = this.from
				if(consignee === '') {
					this.$common.toast('请填写收货人姓名')
				} else if(!this.$common.validate.isPhone(mobile)) {
					this.$common.toast('请输入正确的手机号')
				} else if(address === '') {
					this.$common.toast('请输入详细地址')
				} else {
					let url = 'user/address/add.php'
					if(this.address_id !== -1) {
						url = 'user/address/edit.php'
					}
					const {code,msg} = await this.$api({
						url,
						data: {
							address_id: this.address_id,
							consignee,
							mobile,
							address,
							country,
							province,
							city,
							district,
							address_name,
							best_time,
							is_default
						}
					})
					if(code) {
						this.$common.toast(msg)
						let timer = setTimeout(function() {
							uni.navigateBack()
							clearTimeout(timer)
						}, 1000)
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	.items {
		background: #fff;
	}

	.item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 0 30upx;
		background: #fff;
		min-height: 88upx;
		color: #666;
		font-size: 30upx;
		border-bottom: 1upx solid #f1f1f1;

		.left {
			color: #333;
			width: 150upx;
		}

		input {}

		.textarea-wrapper {
			width: 100%;

			textarea {
				padding: 30upx 0;
				width: 100%;
				font-size: 26upx;
				height: 150upx;
			}
		}
	}

	.btn {
		margin: 50upx 30upx;
		height: 90upx;
		font-size: 32upx;
		color: #fff;
		border-radius: 45upx;
		background: linear-gradient(90deg, #ff8600, red);
	}
</style>
