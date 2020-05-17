<template>

	<view class="img_box positionR">

		<image @click="choose_img" v-show="!new_img_url" class="wh100b" src="/static/image/add_img.png" mode=""></image>
		<view @click="show_img" v-show="new_img_url">
			<image :src="new_img_url" mode=""></image>
		</view>

		<view @click="del" v-show="new_img_url" class="del">
			<image src="/static/image/del_img.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	import common from "../static/js/common.js"
	export default {
		data() {
			return {
				new_img_url: ''
			};
		},
		// name:'uploadImg',
		props: {
			// 服务器url
			url: {
				type: String,
				default: common.base_url + '/api/Upload/uploads_imgs'
			},
			img_url: {
				type: String,
				default: ''
			}

		},
		created() {
			let _self = this;
			_self.new_img_url = _self.img_url

		},
		methods: {
			show_img() {
				let _self = this;
				uni.previewImage({
					urls: [_self.new_img_url]
				})
			},
			choose_img() {
				console.log(11);
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						console.log(JSON.stringify(res.tempFilePaths));
					}
				});
			},
			del(idx) {
				let _self = this;
				_self.new_img_url = ''
				_self.emit();
			},
			emit() {
				let _self = this;
				_self.$emit('change', _self.new_img_url);
			}
		}
	};
</script>

<style lang="scss">
	@charset "UTF-8";

	image ,.img_box{
		width: 140upx;
		height: 140upx;
	}

	.del {
		position: absolute;
		width: 40upx;
		height: 40upx;
		top: 0;
		right: -36upx;
		background-color: rgba(0, 0, 0, .5);
		border-radius: 50%;
		transform: translate(-50%, -50%);
		z-index: 999;

		image {
			width: 40upx;
			height: 40upx;
		}
	}
</style>
