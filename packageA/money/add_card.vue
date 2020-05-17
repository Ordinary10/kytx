<template>
	<view>
		<view class="title flex-a-c ft26 c-B3B4C0">
			<image src="https://dmkqiniu.medsnk.cn/tx_ts.png" mode=""></image>
			请绑定持卡人本人的银行卡
		</view>
		<view class="items">
			<view class="item">
				<text class="left">姓名</text>
				<input type="text" value="" placeholder="请输入姓名" placeholder-class="ft32 c-9294A7" />
			</view>
			<picker @change="select_bank" :range="bank_list" :value="current_bank" range-key="name">
				<view class="item">
					<text class="left">银行</text>
					<input type="text" value="" placeholder="选择开户银行" disabled placeholder-class="ft32 c-9294A7" />
					<image src="https://dmkqiniu.medsnk.cn/4.png" mode=""></image>
				</view>
			</picker>

			<picker @change="select_address" 
			:range="address_list" 
			mode="multiSelector" 
			range-key="name">
				<view class="item">
					<text class="left">银行所在地</text>
					<input type="text" value="" placeholder="请选择银行所在地" disabled placeholder-class="ft32 c-9294A7" />
					<image src="https://dmkqiniu.medsnk.cn/4.png" mode=""></image>
				</view>
			</picker>
			<view class="item">
				<text class="left">开户行名称</text>
				<input type="text" value="" placeholder="请填写开户行名称" placeholder-class="ft32 c-9294A7" />
			</view>
			<view class="item">
				<text class="left">银行卡号</text>
				<input type="text" value="" placeholder="请输入银行卡号" placeholder-class="ft32 c-9294A7" />
			</view>
		</view>
		<view class="btn flex-c">
			确 认
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current_bank: 2,
				 multiArray: [['无脊柱动物', '脊柱动物'], ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'], ['猪肉绦虫', '吸血虫']],
				bank_list: [{
						name: '建行',
						id: 3
					},
					{
						name: '工行',
						id: 4
					},
					{
						name: '邮政',
						id: 5
					},
				],
				// current_address:2,
				address_list: [

					[{

							name: "江苏",

							key: "1"

						},

						{

							name: "安徽",

							key: "2"

						}
					],

					[{

							name: "南京",

							key: "1"

						},

						{

							name: "宿迁",

							key: "2"

						}
					]

				]

			};
		},
		methods: {
			select_bank(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
			},
			select_address(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
			}
		}
	}
</script>

<style lang="scss">
	.title {
		padding: 0 26upx;
		height: 70upx;

		image {
			width: 36upx;
			height: 36upx;
			margin-right: 18upx;
		}
	}

	.items {
		background: #fff;
		padding: 0 26upx;
		font-size: 32upx;

		.item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 108upx;
			border-bottom: 1upx solid #F1F1F1;

			&::last-of-type {
				border: none;
			}

			.left {
				color: #111;
				width: 260upx;
			}

			input {
				flex: 1;
			}

			image {
				width: 20upx;
				height: 20upx;
			}
		}

	}

	.btn {
		width: 640upx;
		height: 88upx;
		background: linear-gradient(-90deg, rgba(230, 68, 54, 1), rgba(240, 143, 73, 1));
		box-shadow: 0px 10upx 20upx 0px rgba(102, 37, 188, 0.1);
		border-radius: 44upx;
		margin: 40upx auto 0;
		color: #fff;
		font-size: 36upx;
	}
</style>
