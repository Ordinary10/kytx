<template>
	<view id="popup" v-if="popupShow"></view>
	<view class="content" v-else>
		<!-- 搜索框 -->
		<view class="top">
			<!-- 关键词搜索 -->
			<view class="search-box  flex-b flex-a-c">
				<uniIcons type="back" size="40"></uniIcons>
				<view class="input">
					<i class="iconSearch" @click="keyWordSearch"></i>
					<input type="text" confirm-type="search" @confirm="keyWordSearch" class="c-8A8A ft26" placeholder="输入关键字搜索" v-model="keyWords" placeholder-class="c-8A8A" />
				</view>
			</view>
			<view class="border-f1"></view>
			<view class="">
				<scroll-view class="big_category_scroll" scroll-x="true" scroll-left="120">
					<view class="flex-a-c">
						<view @click="select_big_category(index)" :class="['item',{'active': active_big_category === index}]" v-for="(item,index) in bigCategory"
						 :key="index">
							{{item.cat_name}}
						</view>
					</view>

				</scroll-view>
			</view>
			<view class="small_category_box flexWrap" v-if="small_category.length > 1">
				<view @click="select_small_category(index)" :class="['item',{'active': active_small_category === index}]" v-for="(item,index) in smallCategory"
				 :key="index">
					{{item.cat_name}}
				</view>
			</view>
			<view class="border-f1"></view>
			<view class="flex-a last_box">
				<view @click="seletct(0)" :class="['item',{'active':last_seletct === 0}]">综合</view>
				<view @click="seletct(1)" :class="['item',{'active':last_seletct === 1}]">销量</view>
				<view @click="seletct(2)" :class="['item',{'active':last_seletct === 2}]">
					<text>价格</text>
					<template v-if="price_sort === 1">
						<image @click.stop="select_price_sort(2)" src="https://dmkqiniu.medsnk.cn/price_s.png" mode=""></image>
					</template>
					<template v-else-if="price_sort === 2">
						<image @click.stop="select_price_sort(1)" src="https://dmkqiniu.medsnk.cn/price_x.png" mode=""></image>
					</template>
					<template v-else>
						<image src="https://dmkqiniu.medsnk.cn/price.png" mode=""></image>
					</template>
				</view>
			</view>
			<view class="border-f1"></view>
		</view>
		<view class="fiexd-top" @click="toTop" v-if="toTopShow">
			<image src="https://dmkqiniu.medsnk.cn/17.png" mode=""></image>
		</view>
		<goodsList :list="lists"></goodsList>
		<u-loadmore :status="status" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				popupShow: true,
				toTopShow: false,
				filters: {
					cat_id: 0,
					brand_id: 0,
					type_id: 0,
					order_by: 0,
					sort_type: 0,
					sw: '',
					page: 1,
					pagesize: 10
				},
				list: [],
				status: 'loading',
				keyWords: '',
				big_category: [],
				active_big_category: 0,
				small_category: [],
				active_small_category: 0,	
				last_seletct: 0,
				price_sort:'',
			}
		},
		computed: {
			lists() {
				return this.list || []
			},
			bigCategory() {
				return this.big_category || []
			},
			smallCategory() {
				return this.small_category || []
			}
		},
		onLoad(option) {
			const cat_id = Number(option.cat_id || 0)
			const categoryData = JSON.parse(JSON.stringify(this.$store.state.goodsCategory || []))
			this.big_category = [
				{
					cat_id: 0,
					cat_name: '全部',
					children: []
				}
			]
			this.small_category = [
				{
					cat_id: 0,
					cat_name: '全部'
				}
			]
			this.big_category = this.big_category.concat(categoryData)
			let categoryData2 = []
			for(let item of categoryData) {
				let arr = JSON.parse(JSON.stringify(item.children || []))
				arr.push(JSON.parse(JSON.stringify(item)))
				categoryData2 = categoryData2.concat(arr)
			}
			this.filters.cat_id = cat_id
			const categoryItem = categoryData2.find((item) => {
				return cat_id === item.cat_id
			})
			if(categoryItem) {
				if(categoryItem.top_pid === 0) {
					this.active_big_category = this.big_category.findIndex((item) => {
						return item.cat_id === cat_id
					})
					this.small_category = this.small_category.concat(JSON.parse(JSON.stringify(this.big_category[this.active_big_category].children || [])))
					this.active_small_category = 0
				} else {
					this.active_big_category = this.big_category.findIndex((item) => {
						return item.cat_id = categoryItem.top_pid
					})
					this.small_category =this.small_category.concat(JSON.parse(JSON.stringify(this.big_category[this.active_big_category].children || [])))
					this.active_small_category = this.small_category.findIndex((item) => {
						return item.cat_id = cat_id
					})
				}
			} else {
				this.active_big_category = 0
				this.small_category = this.small_category.concat(JSON.parse(JSON.stringify(this.big_category[this.active_big_category].children || [])))
				this.active_small_category = 0
			}
			this.getList(true)
		},
		onPageScroll(e) {
			const scrollTop = e.scrollTop
			if(scrollTop > 1000) {
				this.toTopShow = true
			} else {
				this.toTopShow = false
			}
		},
		onReachBottom() {
			if(this.status === 'nomore') return
			this.filters.page++
			this.status = 'loading'
			this.getList(false)
		},
		async onPullDownRefresh() {
			this.init()
			this.active_small_category = 0
			this.small_category = []
			this.active_big_category = 0
			this.list = []
			await this.getList(true)
			uni.stopPullDownRefresh()
		},
		methods: {
			// 初始化筛选条件
			init() {
				this.filters = {
					cat_id: 0,
					brand_id: 0,
					type_id: 0,
					order_by: 0,
					sort_type: 0,
					sw: '',
					page: 1,
					pagesize: 10
				}
			},
			// 获取列表
			async getList(isLoad) {
				const { code,data } = await this.$api({
					url: 'products/list.php',
					data: {
						...this.filters
					},
					loading: isLoad
				})
				if(code) {
					this.list = this.list.concat(data)
					if(data.length < this.filters.pagesize) {
						this.status = 'nomore'
					} else {
						this.status = 'loading'
					}
					this.popupShow = false
				}
			},
			// 关键词搜索
			keyWordSearch() {
				if(this.filters.sw === this.keyWords) return
				this.filters.sw = this.keyWords
				this.list = []
				this.getList(true)
			},
			
			// 选择价格排序
			select_price_sort(num){
				if (this.price_sort === num) return
				this.price_sort = num
				this.filters.sort_type = num
				this.list = []
				this.filters.page = 1
				this.getList(true)
			},
			// 最后一个选择
			seletct(num) {
				if(this.last_seletct === num) return
				this.last_seletct = num
				this.list = []
				this.filters.page = 1
				switch(num) {
					case 0:
						this.filters.order_by = 0
						this.filters.sort_type = 0
						this.getList(true)
					break
					case 1:
						this.filters.order_by = 1
						this.filters.sort_type = 0
						this.getList(true)
					break
					case 2:
						this.filters.order_by = 2
						this.filters.sort_type = 1
						this.price_sort = 1
						this.getList(true)
					break
				}
			},
			
			// 选择 大类
			select_big_category(index) {
				if(this.active_big_category === index) return
				this.active_big_category = index
				this.active_small_category = 0
				this.small_category = [
					{
						cat_id: 0,
						cat_name: '全部'
					}
				]
				this.small_category = this.small_category.concat(JSON.parse(JSON.stringify(this.big_category[this.active_big_category].children || [])))
				this.filters.cat_id = this.big_category[index].cat_id || 0
				this.filters.page = 1
				this.list = []
				this.getList(true)
			},
			// 选择 小类
			select_small_category(index) {
				if(this.active_small_category === index) return
				if(index === 0) {
					this.filters.cat_id = this.big_category[this.active_big_category].cat_id
				} else {
					this.filters.cat_id = this.small_category[index].cat_id || 0
				}
				this.active_small_category = index
				this.filters.page = 1
				this.list = []
				this.getList(true)
			},
			// 回到顶部
			toTop() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				})
			}
		}

	}
</script>

<style scoped lang="less">
	// page {
	// 	background: #fff;
	// }
	.content{
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		background: #fff;
		.goodsList_scroll{
			flex: 1;
		}
	}
	.fiexd-top{
		position: fixed;
		right: 46upx;
		bottom: 40upx;
		z-index: 999;
		image{
			width: 80upx;
			height: 80upx;
		}
	}
	.search-icon {
		padding: 6rpx;
	}
	
	.last_box {
		height: 88upx;
		.item {
			font-size: 26upx;
			text-align: center;
			display: flex;
			align-items: center;
			color: #666;
			border-bottom: 4upx solid #fff;
			margin-bottom: 2px;
			position: relative;
			image{
				width: 12upx;
				height: 19upx;
				margin-left: 5upx;
				position:absolute;
				top: 25upx;
				right: -28upx;
				padding: 10upx;
			}
		}

		.active {
			color: #FF2A26;
			border-color: #FF2A26;
		}
	}

	.small_category_box {
		padding: 28upx 16upx 0 29upx;

		.item {
			background: #F1F1F1;
			font-size: 24upx;
			color: #333;
			padding: 0 20upx;
			box-sizing: border-box;
			height: 52upx;
			line-height: 52upx;
			border-radius: 26upx;
			margin-right: 30upx;
			margin-bottom: 30upx;
		}

		.active {
			color: #FE4338;
			background: #FCF0EB;
		}
	}

	.big_category_scroll {
		// height: 92upx;
		background: #fafafa;

		.item {
			flex-shrink: 0;
			font-size: 28upx;
			color: #111;
			line-height: 30upx;
			padding: 27upx 5upx 31upx;
			margin: 0 25upx;
			position: relative
		}

		.active {
			color: #FE4338;
			font-size: 32upx;
		}

		.active_border {
			position: absolute;
			width: 100%;
			height: 4upx;
			bottom: 4upx;
			left: 50%;
			transform: translateX(-50%);
			background: linear-gradient(270deg, rgba(249, 50, 38, 1), rgba(254, 139, 52, 1));
		}
	}

	.search-box {
		padding: 0 25upx;

		.input {
			flex: 1;
			margin: 17upx 9upx 17upx 25upx;
			height: 54upx;
			background: rgba(243, 244, 245, 1);
			border-radius: 27upx;
			display: flex;
			align-items: center;
			position: relative;

			input {
				margin-left: 70upx;
				margin-top: 12upx;
				margin-bottom: 12upx;
				width: 500upx;
			}

			.iconSearch {
				position: absolute;
				left: 31upx;
				top: 14upx;
			}
		}
	}
</style>
