<template>
	<view class="">
		<view class="uni-numbox" v-if="type==='img'">
			<view @click="_calcValue('minus')" class="caozuo uni-numbox__minus">
				<image class="wh100b" src="https://dmkqiniu.medsnk.cn/number_remove.png" mode=""></image>
			</view>
			<view  class="uni-numbox__value">{{inputValue}}</view>
			<view @click="_calcValue('plus')" class="caozuo uni-numbox__plus">
				<image class="wh100b" src="https://dmkqiniu.medsnk.cn/number_add.png" mode=""></image>
			</view>
		</view>
		<view class="border-wrapper" v-else>
			<view @click="_calcValue('minus')" class="caozuo left">
				-
			</view>
			<view  class="uni-numbox__value">{{inputValue}}</view>
			<view @click="_calcValue('plus')" class="caozuo right">
				+
			</view>
		</view>
	</view>
	
</template>
<script>
	export default {
		name: "UniNumberBox",
		props: {
			value: {
				type: [Number, String],
				default: 1
			},
			index: {
				type: [Number, String,Object],
				default: undefined
			},
			type:{
				type: [String],
				// 用img样式还是border样式
				default:'img'
			},
			min: {
				type: Number,
				default: 1
			},
			max: {
				type: Number,
				default: 100
			}
		},
		data() {
			return {
				inputValue: 1
			};
		},
		watch: {
			value(val) {
				this.inputValue = +val;
			},
			inputValue(newVal, oldVal) {
				if (+newVal !== +oldVal) {
					this.$emit("change", newVal,this.index);
				}
			}
		},
		created() {
			this.inputValue = +this.value;
		},
		methods: {
			_calcValue(type) {
				let value = +this.inputValue;
				if (type === "minus") {
					value -= 1;
					if (value < this.min) {
						return;
					}
					if(value > this.max){
						value = this.max
					}
				} else if (type === "plus") {
					value += 1;
					if (value > this.max) {
						return;
					}
					if(value < this.min){
						value = this.min
					}
				}
				this.inputValue = String(value);
			},
			
		
		}
	};
</script>
<style lang="scss" scoped>
	.border-wrapper{
		height:50upx;
		border:1upx solid #999;
		border-radius:5upx;
		box-sizing: content-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		min-width: 195upx;
		.caozuo{
			font-size: 36upx;
			color: #0C0C0C;
			display: flex;
			align-items: center;
			justify-content: center;
			height: 50upx;
			width: 65upx;
		}
		.left{
			border-right:1upx solid #999;
		}
		.right{
			border-left:1upx solid #999;
		}
		.uni-numbox__value{
			padding: 0 24upx;
		}
	}
	
	
	
	.uni-numbox {
		display: flex;
		align-items: center;
		min-width: 120upx;
	}

	.uni-numbox__value {
		color: #111;
		font-size: 28upx;
		padding: 0 10upx;
	}
	.caozuo{
		width: 30upx;
		height: 30upx;
	}
	.uni-numbox__minus {
		// background: url(https://dmkqiniu.medsnk.cn/number_remove.png) no-repeat center;
		// background-size: 100% 100%;
		padding-right: 10upx;
	}

	.uni-numbox__plus {
		// background: url(https://dmkqiniu.medsnk.cn/number_add.png) no-repeat center;
		// background-size: 100% 100%;
		padding-left: 10upx;
	}

	
</style>
