<template>
	<view class="">
		<view class="u-content" :style="{ height: isLongContent && !showMore ? showHeight + 'px' : 'auto' }">
			<slot></slot>
		</view>
		<view @tap="toggleReadMore" v-if="isLongContent" class="u-showmore-wrap" :class="{ 'u-show-more': showMore }">
			<text class="u-readmore-btn" :style="{
				fontSize: fontSize + 'rpx',
				color: color
			}">
				{{ showMore ? openText : closeText }}
			</text>
			<u-icon :color="color" :size="fontSize" class="u-icon" :name="showMore ? 'arrow-up' : 'arrow-down'"></u-icon>
		</view>
	</view>
</template>

<script>
	/**
	 * readMore 阅读更多
	 * @description 该组件一般用于内容较长，预先收起一部分，点击展开全部内容的场景。
	 * @tutorial https://www.uviewui.com/components/readMore.html
	 * @property {String Number} show-height 内容超出此高度才会显示展开全文按钮，单位rpx（默认400）
	 * @property {Boolean} toggle 展开后是否显示收起按钮（默认false）
	 * @property {String} close-text 关闭时的提示文字（默认“展开阅读全文”）
	 * @property {String Number} font-size 提示文字的大小，单位rpx（默认28）
	 * @property {String} open-text 展开时的提示文字（默认“收起”）
	 * @property {String} color 提示文字的颜色（默认#2979ff）
	 * @example <u-read-more><rich-text :nodes="content"></rich-text></u-read-more>
	 */
	export default {
		name: "u-read-more",
		props: {
			// 默认的显示占位高度，单位为px
			showHeight: {
				type: [Number, String],
				default: 400
			},
			// 展开后是否显示"收起"按钮
			toggle: {
				type: Boolean,
				default: false
			},
			// 关闭时的提示文字
			closeText: {
				type: String,
				default: '展开阅读全文'
			},
			// 展开时的提示文字
			openText: {
				type: String,
				default: '收起'
			},
			// 提示的文字颜色
			color: {
				type: String,
				default: '#2979ff'
			},
			// 提示文字的大小
			fontSize: {
				type: [String, Number],
				default: 28
			}
		},
		watch: {
			paramsChange(val) {
				this.init();
			}
		},
		computed: {
			paramsChange() {
				return `${this.toggle}-${this.showHeight}`;
			}
		},
		data() {
			return {
				isLongContent: false, // 是否需要隐藏一部分内容
				showMore: false, // 当前隐藏与显示的状态，true-显示，false-收起
			};
		},
		mounted() {
			this.init();
		},
		methods: {
			init() {
				const query = uni.createSelectorQuery(this).in(this);
				query
					.select('.u-content')
					.boundingClientRect(res => {
						if (res) {
							// 判断高度，如果真实内容高度大于占位高度，则显示收起与展开的控制按钮
							if (res.height > this.showHeight) {
								this.isLongContent = true;
								this.showMore = false;
							}
						}
					})
					.exec();
			},
			// 展开或者收起
			toggleReadMore() {
				this.showMore = !this.showMore;
				// 如果toggle为false，隐藏"收起"部分的内容
				if (this.toggle == false) this.isLongContent = false;
			}
		}
	};
</script>

<style lang="scss" scoped>
	.u-content {
		font-size: 30rpx;
		color: $u-content-color;
		line-height: 1.8;
		text-align: left;
		text-indent: 2em;
		overflow: hidden;
	}

	.u-showmore-wrap {
		position: relative;
		width: 100%;
		background-image: linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, #fff 80%);
		padding-top: 300rpx;
		margin-top: -300rpx;
		padding-bottom: 26rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.u-show-more {
		padding-top: 0;
		background: none;
		margin-top: 20rpx;
	}

	.u-readmore-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		line-height: 1;
	}

	.u-icon {
		margin-left: 14rpx;
	}
</style>
