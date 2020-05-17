<template>
	<view>
		<view class="">
			<view class="card">
				<view class="title">
					请拍摄并上传你的身份证照片
				</view>
				<view class="flex-b-c">
					<view class="uploadImg">
						<image src="https://dmkqiniu.medsnk.cn/rz_zm.png" mode=""></image>
						<view class="ft26 c-333">
							<text>点击上传</text>
							<text class="ml3 c-red">人像面</text>
						</view>
					</view>
					<view class="uploadImg">
						<image src="https://dmkqiniu.medsnk.cn/rz_fm.png" mode=""></image>
						<view class="ft26 c-333">
							<text>点击上传</text>
							<text class="ml3 c-red">
								国徽面
							</text>
						</view>
					</view>
				</view>
			</view>
			<view class="items">
				<view class="item">
					<view class="left">
						真实姓名
					</view>
					<view class="right">
						<input type="text" placeholder="请输入您的姓名" placeholder-class="c-d7 ft30" />
					</view>
				</view>
				<view class="border-f1">

				</view>
				<view class="item">
					<view class="left">
						身份证号码
					</view>
					<view class="right">
						<input type="text" placeholder="请输入您的身份证号" placeholder-class="c-d7 ft30" />
					</view>
				</view>
			</view>
			<view class="mt20 ft26 bjfff" style="padding: 15upx 30upx;">
				<view class="title">
					拍摄身份证要求：
				</view>
				<view class="c-91">
					大陆公民持有的本人有效二代身份证；<br>
					拍摄时确保身份证
					<text class="c-red">
						边框完整，字体清晰，亮度均匀；
					</text>
				</view>
				<view class="flexWrap yaoqiu">
					<view  
					class=" flex-column-c yaoqiu_item"
					v-for="(item,index) in yaoqiu"
					:key="index"
					>
						<image :src="item.img" mode=""></image>
						<view class="mt5">
							{{item.name}}
						</view>
					</view>
				</view>
			</view>
			<view class="btn flex-c">
				身份认证
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
yaoqiu:[
	{img:'https://dmkqiniu.medsnk.cn/yq_1.png',name:'标准'},
	{img:'https://dmkqiniu.medsnk.cn/yq_2.png',name:'边框缺失'},
	{img:'https://dmkqiniu.medsnk.cn/yq_3.png',name:'边框缺失'},
	{img:'https://dmkqiniu.medsnk.cn/yq_4.png',name:'闪光强烈'},
]
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.yaoqiu{
		font-size: 26upx;
		color: #999;
		margin-top: 65upx;
		.yaoqiu_item{
			width: 160upx;
			margin-right: 17upx;
			&:last-of-type{
				margin-right:0
			}
		}
		image{
			width: 160upx;
			height: 118upx;
		}
	}
	.items {
		padding: 60upx 53upx 0;
		background: #fff;

		.item {
			font-size: 30upx;
			color: #333;
			height: 72upx;
			display: flex;
			align-items: center;

			.left {
				width: 155upx;
				margin-right: 39upx;
			}

			.right {
				input {
					border: none;
					width: 420upx;
				}
			}
		}
	}

	.title {
		font-size: 30upx;
		color: #111111;
		padding: 24upx 0;
	}

	.card {
		padding: 26upx 53upx 0;
		background: #fff;



		.uploadImg {
			width: 313upx;
			height: 180upx;
			box-shadow: 0px 6upx 16upx 0px rgba(209, 209, 209, 0.35);
			border-radius: 4upx;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;

			image {
				width: 132upx;
				height: 98upx;
			}
		}
	}

	.btn {
		height: 88upx;
		background: linear-gradient(-90deg, rgba(249, 50, 38, 1), rgba(254, 139, 52, 1));
		border-radius: 44upx;
		margin: 100upx 46upx 0;
		font-size: 34upx;
		color: #fff;
	}
</style>
