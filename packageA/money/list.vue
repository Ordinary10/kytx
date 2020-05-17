<template>
	<view class="">
		
		
		<view class="bjfff">
			<view class="item " v-for="i in 5">
				<view class="flex-b-c">
					<view class="ft30 c-111">
						分润收益
					</view>
					<view class="c-red ft34 ">
						+4.40
					</view>
				</view>
				<view class="flex-b-c c-B3B4C1 ft24 mt10">
					<view class="">
						2019-09-20 06:43
					</view>
					<view class=" ">
						已到账 >
					</view>
				</view>
			</view>
		</view>

	</view>

</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
	

	.item {
		margin: 0 30upx;
		height: 148upx;
		border-bottom: 1upx solid #f1f1f1;
		display: flex;
		flex-direction: column;
		justify-content: center;

	}

	

	
</style>
