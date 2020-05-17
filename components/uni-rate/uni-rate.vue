<template>
	<view class="flex">
		<view class="mr5 flex-a-c" v-for="i in 5" :key='i'>
			<view v-if="i<=value" class="iconXin1"></view>
			<view v-else class="iconXin"></view>
		</view>
	</view>
</template>

<script>
	
	export default {
		name: "UniRate",
		components: {
			
		},
		props: {

			value: {
				// 当前评分
				type: [Number, String],
				default: 0
			},
			max: {
				// 最大评分
				type: [Number, String],
				default: 5
			},
			
		},
		data() {
			return {
				valueSync: ""
			};
		},
		computed: {
			
		},
		created() {
		},
		methods: {
			
		}
	};
</script>

<style lang="scss" scoped>
	

</style>
