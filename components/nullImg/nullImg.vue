<template>
	<view class="null-img">
		<view class="img-wrapper">
			<image class="img" :src="data.img" mode=""></image>
		</view>
		<view class="img-tips">
			{{data.tip}}
		</view>
	</view>
</template>

<script>
	export default {

		data() {
			return {

			}
		},
		props: {
			option: {
				type: Object,
				default () {
					return {
						tip: '',
						img: ''
					}
				}
			}
		},
		computed: {
			data() {
				return this.$props.option
			}
		}
	}
</script>

<style scoped>
	.null-img {
		background: #fff;
		padding: 100upx 0 0;
	}

	.img-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.img {
		width: 100upx;
		height: 100upx;
	}

	.img-tips {
		text-align: center;
		color: #333;
		font-size: 26upx;
		margin: 34upx 0;
	}
</style>
