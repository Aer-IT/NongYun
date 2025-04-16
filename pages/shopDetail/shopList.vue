<template>
	<view class="content">
		<!-- 搜索栏 -->
		<view class="search-container">
			<view class="search-box">
				<input type="text" v-model="searchKeyword" :placeholder="placeholder" @confirm="handleSearch" />
				<text class="clear-icon" v-if="searchKeyword" @click="clearSearch">×</text>
			</view>
		</view>
		
		<!-- 分类筛选区域 -->
		<view class="filter-container">
			<view class="filter-item" 
				v-for="(item, index) in filterItems" 
				:key="index" 
				:class="{active: currentFilter === index}"
				@click="selectFilter(index)">
				{{ item.name }}
			</view>
		</view>
		
		<!-- 商品列表区域 -->
		<view class="product-section" v-if="productList.length > 0">
			<view class="product-grid">
				<view class="product-card" v-for="(item, index) in filteredProductList" :key="index" @click="goToDetail(item)">
					<view class="product-image">
						<image :src="item.image" mode="aspectFill"></image>
					</view>
					<view class="product-info">
						<view class="product-title">{{ item.title }}</view>
						<view class="product-price">
							<text class="current-price">{{ item.currentPrice }}</text>
							<text class="original-price">{{ item.originalPrice }}</text>
						</view>
						<view class="product-stats">
							<text class="sales">销量: {{ item.sales }}</text>
							<text class="rating">评分: {{ item.rating }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 无数据提示 -->
		<view class="empty-state" v-else>
			<image src="/static/empty.png" mode="aspectFit"></image>
			<text>暂无商品数据</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchKeyword: '',
				placeholder: '搜索商品名称',
				currentFilter: 0,
				filterItems: [
					{ name: '全部', type: 'all' },
					{ name: '最新上架', type: 'new' },
					{ name: '销量优先', type: 'sales' },
					{ name: '价格优先', type: 'price' }
				],
				productList: [
					{
						id: 1,
						image: '/static/logo.png',
						title: '优质苹果包装盒',
						currentPrice: '¥18.90',
						originalPrice: '¥25.00',
						sales: 356,
						rating: 4.8,
						type: 'fruit'
					},
					{
						id: 2,
						image: '/static/logo.png',
						title: '高档水果礼盒',
						currentPrice: '¥32.50',
						originalPrice: '¥40.00',
						sales: 289,
						rating: 4.7,
						type: 'gift'
					},
					{
						id: 3,
						image: '/static/logo.png',
						title: '环保蔬菜包装',
						currentPrice: '¥12.80',
						originalPrice: '¥16.50',
						sales: 412,
						rating: 4.5,
						type: 'vegetable'
					},
					{
						id: 4,
						image: '/static/logo.png',
						title: '精美瓜果纸盒',
						currentPrice: '¥22.90',
						originalPrice: '¥28.00',
						sales: 198,
						rating: 4.6,
						type: 'fruit'
					},
					{
						id: 5,
						image: '/static/logo.png',
						title: '创意农产品包装',
						currentPrice: '¥26.50',
						originalPrice: '¥32.00',
						sales: 256,
						rating: 4.9,
						type: 'creative'
					},
					{
						id: 6,
						image: '/static/logo.png',
						title: '通用水果包装盒',
						currentPrice: '¥15.80',
						originalPrice: '¥20.00',
						sales: 325,
						rating: 4.7,
						type: 'fruit'
					}
				]
			};
		},
		computed: {
			filteredProductList() {
				let result = [...this.productList];
				
				// 关键词搜索过滤
				if (this.searchKeyword.trim()) {
					result = result.filter(item => 
						item.title.toLowerCase().includes(this.searchKeyword.toLowerCase())
					);
				}
				
				// 根据筛选条件排序
				const filterType = this.filterItems[this.currentFilter].type;
				if (filterType === 'new') {
					// 假设id越大越新
					result.sort((a, b) => b.id - a.id);
				} else if (filterType === 'sales') {
					result.sort((a, b) => b.sales - a.sales);
				} else if (filterType === 'price') {
					// 去掉价格的¥符号并转为数字
					result.sort((a, b) => {
						const priceA = parseFloat(a.currentPrice.replace('¥', ''));
						const priceB = parseFloat(b.currentPrice.replace('¥', ''));
						return priceA - priceB;
					});
				}
				return result;
			}
		},
		methods: {
			handleSearch() {
				console.log('搜索关键词:', this.searchKeyword);
				// 可以在这里添加额外的搜索逻辑
				uni.showToast({
					title: '搜索: ' + this.searchKeyword,
					icon: 'none'
				});
			},
			clearSearch() {
				this.searchKeyword = '';
			},
			selectFilter(index) {
				this.currentFilter = index;
			},
			goToDetail(item) {
				uni.navigateTo({
					url: `/pages/shopDetail/shopDetail?id=${item.id}`
				});
			}
		}
	}
</script>

<style lang="scss">
.content {
	min-height: 100vh;
	background-color: #f5f5f5;
	display: flex;
	flex-direction: column;
	padding: 20rpx;
}

.search-container {
	width: 100%;
	margin-bottom: 20rpx;
	
	.search-box {
		display: flex;
		align-items: center;
		background-color: #ffffff;
		border-radius: 40rpx;
		padding: 15rpx 25rpx;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
		
		.search-icon {
			font-size: 32rpx;
			color: #999;
			margin-right: 15rpx;
		}
		
		input {
			flex: 1;
			height: 70rpx;
			font-size: 28rpx;
		}
		
		.clear-icon {
			font-size: 40rpx;
			color: #bbb;
			padding: 0 10rpx;
		}
	}
}

.filter-container {
	display: flex;
	justify-content: space-between;
	background-color: #ffffff;
	border-radius: 12rpx;
	padding: 20rpx;
	margin-bottom: 20rpx;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
	
	.filter-item {
		font-size: 28rpx;
		color: #666;
		padding: 10rpx 20rpx;
		border-radius: 30rpx;
		
		&.active {
			background-color: #28c8c0;
			color: #fff;
		}
	}
}

.product-section {
	width: 100%;
	background: #ffffff;
	border-radius: 12rpx;
	padding: 20rpx;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
	margin-bottom: 30rpx;
}

.product-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: 20rpx;
}

.product-card {
	background-color: #ffffff;
	border-radius: 12rpx;
	overflow: hidden;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
	
	&:active {
		opacity: 0.9;
	}
}

.product-image {
	width: 100%;
	height: 300rpx;
	
	image {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
}

.product-info {
	padding: 20rpx;
}

.product-title {
	font-size: 28rpx;
	font-weight: 500;
	color: #333;
	margin-bottom: 10rpx;
	line-height: 1.4;
	height: 80rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}

.product-price {
	display: flex;
	align-items: baseline;
	margin-bottom: 15rpx;
	
	.current-price {
		font-size: 32rpx;
		color: #ff5050;
		font-weight: bold;
		margin-right: 10rpx;
	}
	
	.original-price {
		font-size: 24rpx;
		color: #999;
		text-decoration: line-through;
	}
}

.product-stats {
	display: flex;
	justify-content: space-between;
	font-size: 24rpx;
	color: #999;
}

.empty-state {
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 100rpx 0;
	
	image {
		width: 200rpx;
		height: 200rpx;
		margin-bottom: 30rpx;
	}
	
	text {
		font-size: 28rpx;
		color: #999;
	}
}

// 图标字体
@font-face {
	font-family: "iconfont";
	src: url('data:font/woff2;charset=utf-8;base64,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') format('woff2');
}

.iconfont {
	font-family: "iconfont" !important;
	font-style: normal;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
</style>
