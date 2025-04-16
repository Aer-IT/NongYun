<template>
	<view class="content">
		<!-- 搜索栏 -->
		<view class="search-container">
			<Search v-model="searchKeyword" :placeholder="'搜索商品'" @search="handleSearch"></Search>
		</view>

		<!-- 功能区域 -->
		<view class="feature-section">
			<view class="feature-grid">
				<!-- 一键设计 -->
				<view class="feature-card" @click="handleFeatureClick('design')">
					<u-icon name="edit-pen" size="46" color="rgb(102,207,200)"></u-icon>
					<text class="feature-title">一键设计</text>
					<text class="feature-desc">智能设计包装服务</text>
				</view>

				<!-- 选购包装 -->
				<view class="feature-card" @click="handleFeatureClick('shop')">
					<u-icon name="shopping-cart" size="46" color="rgb(102,207,200)"></u-icon>
					<text class="feature-title">选购包装</text>
					<text class="feature-desc">多种包装盒型选择</text>
				</view>

				<!-- 模板库 -->
				<view class="feature-card" @click="handleFeatureClick('template')">
					<u-icon name="folder" size="46" color="rgb(102,207,200)"></u-icon>
					<text class="feature-title">模板库</text>
					<text class="feature-desc">海量包装模板</text>
				</view>
			</view>
		</view>

		<!-- 盒型选项区 -->
		<view class="box-type-section">
			<view class="box-grid">
				<view class="box-item" v-for="(item, index) in boxTypes" :key="index" @click="handleBoxTypeClick(item.type)">
					<view class="box-icon">
						<img :src="item.icon" alt="">
					</view>
					<text class="box-name">{{ item.name }}</text>
					<text class="box-desc">{{ item.desc }}</text>
				</view>
			</view>
		</view>

		<!-- 咨询头条区 -->
		<view class="news-section">
			<view class="news-header"@click="handleNewsHeaderClick(item)">
				<u-icon name="volume" size="32" color="rgb(102,207,200)"></u-icon>
				<text class="news-title">包装资讯</text>
			</view>
			<swiper class="news-swiper" vertical autoplay circular interval="3000">
				<swiper-item v-for="(item, index) in newsList" :key="index" >
					<view class="news-item" @click="handleNewsClick(item)">
						<text class="news-tag" :style="{ background: item.tagColor }">{{ item.tag }}</text>
						<text class="news-content">{{ item.title }}</text>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<!-- 商品列表区域 -->
		<view class="product-section">
			<view class="section-header">
				<view class="section-title">推荐商品</view>
			</view>
			<ProductList />
		</view>
	</view>
</template>

<script>
	import Search from '@/components/search.vue'
	import ProductList from '@/components/ProductList.vue'
	export default {
		components:{
			Search,
			ProductList
		},
		data() {
			return {
				searchKeyword: '', // 搜索关键词
				boxTypes: [
					{
						type: 'normal',
						name: '常规盒型',
						desc: '适用于日常包装',
						icon: '/static/box/image1.png'
					},
					{
						type: 'gift',
						name: '精品礼盒',
						desc: '高端礼品包装',
						icon: '/static/box/image2.png'
					},
					{
						type: 'flip',
						name: '翻盖盒型',
						desc: '方便开合设计',
						icon: '/static/box/image3.png'
					},
					{
						type: 'cover',
						name: '天地盖型',
						desc: '经典包装形式',
						icon: '/static/box/image4.png'
					},
					{
						type: 'bottle',
						name: '瓶型',
						desc: '适用液体包装',
						icon: '/static/box/image5.png'
					},
					{
						type: 'drawer',
						name: '抽拉盒型',
						desc: '独特开启方式',
						icon: '/static/box/image6.png'
					},
					{
						type: 'filling',
						name: '内部填充',
						desc: '保护产品安全',
						icon: '/static/box/image7.png'
					},
					{
						type: 'more',
						name: '更多盒型',
						desc: '探索更多可能',
						icon: '/static/box/image8.png'
					}
				],
				newsList: [
					{
						id: 1,
						tag: '新闻',
						tagColor: 'rgba(102,207,200,0.1)',
						title: '2024包装行业发展新趋势：环保材料成主流',
						url: '/pages/news/detail'
					},
					{
						id: 2,
						tag: '资讯',
						tagColor: 'rgba(102,207,200,0.1)',
						title: '智能包装技术创新：AR技术赋能产品包装',
						url: '/pages/news/detail'
					},
					{
						id: 3,
						tag: '热点',
						tagColor: 'rgba(102,207,200,0.1)',
						title: '定制包装设计如何提升品牌价值？',
						url: '/pages/news/detail'
					}
				],
				
			}
		},
		onLoad() {

		},
		methods: {
			// 处理功能点击
			handleFeatureClick(feature) {
				console.log('点击功能:', feature);
				// TODO: 根据不同功能跳转到相应页面
				if(feature === 'design'){
					uni.switchTab({
						url: '/pages/design/design'
					});
				}
				else if(feature === 'shop'){
					uni.navigateTo({
						url: '/pages/shopDetail/shopList'
					});
				}
				else if(feature === 'template'){
					uni.navigateTo({
						url: '/pages/design/selfDesign/templateList'
					});
				}
			},
			
			// 处理盒型点击
			handleBoxTypeClick(type) {
				console.log('选择盒型:', type);
				// TODO: 处理盒型选择逻辑
				uni.navigateTo({
					url: '/pages/index/boxList'
				});
			},
			
			// 处理新闻点击
			handleNewsClick(news) {
				uni.navigateTo({
					url: "/pages/community/components/consult/details"
				});
			},
			handleNewsHeaderClick(){
				// 将目标标签存储到全局变量
				getApp().globalData = getApp().globalData || {};
				getApp().globalData.targetTab = 'consult';
				
				// 使用switchTab跳转到社区页面
				uni.switchTab({
					url: '/pages/community/community'
				});
			},
			handleSearch(keyword) {
				console.log('搜索关键词:', keyword);
				// TODO: 处理搜索逻辑
				uni.navigateTo({
					url: '/pages/searchPage/searchPage?keyword=' + keyword + '&type=product'
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
		align-items: center;
		padding: 0;
	}
	.product-section{
		width: 100%;
		margin-top: 30rpx;
		background: #ffffff;
		border-radius: 24rpx;
		padding: 24rpx 20rpx;
		box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.08);
		position: relative;
		overflow: hidden;
		margin-bottom: 40rpx;
		
		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 6rpx;
			background: linear-gradient(to right, rgb(102,207,200), rgba(102,207,200,0.3));
		}
		
		.section-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20rpx;
			padding: 0 10rpx;
		}
		
		.section-title {
			font-size: 32rpx;
			font-weight: bold;
			color: #333333;
			padding-left: 20rpx;
			border-left: 4rpx solid rgb(102,207,200);
			position: relative;
		}
		
	}
	.search-container {
		width: 88%;
		margin: 20rpx auto;
		background: #ffffff;
		border-radius: 16rpx;
		box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
	}

	.feature-section {
		width: 90%;
		padding: 16rpx;
		margin-top: 30rpx;
		background: #ffffff;
		border-radius: 50rpx;
		box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
		border: 6rpx solid rgba(195, 196, 196, 0.3);
		
		.feature-grid {
			display: flex;
			justify-content: space-between;
			gap: 12rpx;
			padding: 6rpx;
		}

		.feature-card {
			flex: 1;
			background: #ffffff;
			border-radius: 12rpx;
			padding: 16rpx 12rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			transition: all 0.3s ease;
			position: relative;
			overflow: hidden;
			
			&:active {
				transform: scale(0.98);
			}

			&:hover {
				background: rgba(0, 0, 0, 0.02);
			}

			.feature-title {
				margin-top: 12rpx;
				font-size: 26rpx;
				font-weight: bold;
			}

			.feature-desc {
				margin-top: 6rpx;
				font-size: 22rpx;
				color: #606266;
				text-align: center;
			}

			.feature-tag {
				margin-top: 12rpx;
				font-size: 22rpx;
				background-color: rgba(25, 190, 107, 0.1);
				padding: 4rpx 16rpx;
				border-radius: 20rpx;
			}
		}
	}

	.box-type-section {
		width: 100%;
		padding: 12rpx;
		margin-top: 30rpx;
		background: #ffffff;
		border-radius: 16rpx;
		box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);

		.box-grid {
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			gap: 12rpx;
			padding: 6rpx;
		}

		.box-item {
			background: #ffffff;
			border-radius: 12rpx;
			padding: 10rpx 6rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			transition: all 0.3s ease;
			border: 1rpx solid rgba(102, 207, 200, 0.1);
			
			&:active {
				transform: scale(0.95);
			}

			.box-icon {
				width: 75rpx;
				height: 75rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: 6rpx;
				border-radius: 12rpx;
				overflow: hidden;
				background: #f8f8f8;
				
				img {
					width: 100%;
					height: 100%;
					object-fit: cover;
					transition: transform 0.3s ease;
				}
			}

			&:hover {
				.box-icon img {
					transform: scale(1.05);
				}
			}

			.box-name {
				font-size: 22rpx;
				font-weight: 500;
				color: #333333;
				margin-bottom: 4rpx;
			}

			.box-desc {
				font-size: 18rpx;
				color: #999999;
				text-align: center;
				padding: 0 8rpx;
				line-height: 1.3;
			}
		}
	}

	.news-section {
		width: 90%;
		margin-top: 30rpx;
		padding: 10rpx 16rpx;
		background: #ffffff;
		border-radius: 12rpx;
		box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
		
		.news-header {
			display: flex;
			align-items: center;
			margin-bottom: 6rpx;
			
			.news-title {
				margin-left: 12rpx;
				font-size: 22rpx;
				font-weight: bold;
				color: #333333;
			}
		}
		
		.news-swiper {
			height: 48rpx;
		}
		
		.news-item {
			display: flex;
			align-items: center;
			height: 100%;
			
			.news-tag {
				padding: 2rpx 8rpx;
				border-radius: 8rpx;
				font-size: 24rpx;
				color: rgb(102,207,200);
				margin-right: 6rpx;
			}
			
			.news-content {
				flex: 1;
				font-size: 24rpx;
				color: #333333;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}
</style>
