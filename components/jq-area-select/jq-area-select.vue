<template>
	<!-- 地址选择器 -->
	<uni-popup ref="popup_area" type="bottom" :maskClick="false">
		<view class="popup_area_title">
			<text @click="closePopup">取消</text>
			<text @click="areaChange">确定</text>
		</view>
		<picker-view indicator-style="height: 100rpx;" style="width: 100%; height: 400rpx;background-color: white;" @change="pickerChange">
			<picker-view-column>
				<view class="select-item" v-for="(item, index) in provinceList" :key="item.value">{{item.lable}}</view>
			</picker-view-column>
			<picker-view-column>
				<view class="select-item" v-for="(item, index) in cityList" :key="item.value">{{item.lable}}</view>
			</picker-view-column>
			<picker-view-column>
				<view class="select-item" v-for="(item, index) in countyList" :key="item.value">{{item.lable}}</view>
			</picker-view-column>
		</picker-view>
	</uni-popup>
</template>

<script>
	export default {
		props: {
			value: {
				type: Boolean,
				default: false
			},
			startSelectIndex: {
				type: Array,
				default: [0,0,0]
			}
		},
		data() {
			return {
				cityData: [],
				areaSelectIndex: [0, 0, 0],
				areaSelectValue: []
			}
		},
		computed: {
			provinceList() {
				return this.cityData || []
			},
			cityList() {
				return this.cityData.length > 0 ? this.cityData[this.areaSelectIndex[0]].children || [] : []
			},
			countyList() {
				return this.cityData.length > 0 && this.cityData[this.areaSelectIndex[0]].children.length > 0 ? this.cityData[this
					.areaSelectIndex[0]].children[this.areaSelectIndex[1]].children || [] : []
			}
		},
		created() {
			this.areaSelectIndex = JSON.parse(JSON.stringify(this.$props.startSelectIndex))
			const app = getApp()
			this.cityData = app.globalData.cityData
			this.areaSelectValue = [
					{
						value: this.cityData[this.areaSelectIndex[0]].value,
						lable: this.cityData[this.areaSelectIndex[0]].lable
					},
					{
						value: this.cityData[this.areaSelectIndex[0]].children[this.areaSelectIndex[1]].value,
						lable: this.cityData[this.areaSelectIndex[0]].children[this.areaSelectIndex[1]].lable
					},
					{
						value: this.cityData[this.areaSelectIndex[0]].children[this.areaSelectIndex[1]].children[this.areaSelectIndex[2]].value,
						lable: this.cityData[this.areaSelectIndex[0]].children[this.areaSelectIndex[1]].children[this.areaSelectIndex[2]].lable
					}
				]
		},
		methods: {
			// popup弹窗开关，需传入ref-name
			popupOpen(name) {
				this.$refs[name] ? this.$refs[name].open() : '';
				this.searchFocus = true;
			},
			popupClose(name) {
				this.$refs[name] ? this.$refs[name].close() : '';
			},
			closePopup() {
				this.$emit("input", false)
				this.$emit("Confirm")
			},
			areaChange() {
				this.$emit('jqSubmit', this.areaSelectValue)
				this.$emit("input", false)
				this.$emit("Confirm")
			},
			pickerChange(e) {
				const changeArr = e.detail.value
				if(this.areaSelectIndex[0] !== changeArr[0]) {
					this.areaSelectIndex = [changeArr[0], 0, 0]
				} else if(this.areaSelectIndex[1] !== changeArr[1]) {
					this.areaSelectIndex = [changeArr[0], changeArr[1], 0]
				} else if(this.areaSelectIndex[2] !== changeArr[2]) {
					this.areaSelectIndex = changeArr
				} else {
					this.areaSelectIndex = [0, 0, 0]
				}
				this.areaSelectValue = [
					{
						value: this.cityData[this.areaSelectIndex[0]].value,
						lable: this.cityData[this.areaSelectIndex[0]].lable
					},
					{
						value: this.cityData[this.areaSelectIndex[0]].children[this.areaSelectIndex[1]].value,
						lable: this.cityData[this.areaSelectIndex[0]].children[this.areaSelectIndex[1]].lable
					},
					{
						value: this.cityData[this.areaSelectIndex[0]].children[this.areaSelectIndex[1]].children[this.areaSelectIndex[2]].value,
						lable: this.cityData[this.areaSelectIndex[0]].children[this.areaSelectIndex[1]].children[this.areaSelectIndex[2]].lable
					}
				]
			}
		},
		watch: {
			value: function(newVal, oldVal) {
				if (newVal) {
					this.popupOpen('popup_area')
				} else {
					this.popupClose('popup_area')
				}
			}
		}
	}
</script>

<style lang="scss">
.popup_area_title {
	height: 80rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 40rpx;
	font-size: 14px;
	font-weight: 600;
	background-color: white;
	
	text:nth-of-type(1) {
		line-height: 80rpx;
		color: #939393;
	}
	
	text:nth-of-type(2) {
		line-height: 80rpx;
		color: #1AAD19;
	}
}
.select-item {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100rpx;
}
</style>
