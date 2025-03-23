<template>
	<view class="consult-container">
		<view class="news-list">
			<view class="news-item" v-for="(item, index) in newsList" :key="index" @click="goToDetail(item)">
				<view class="news-content">
					<view class="news-header">
						<u-tag 
							:text="item.category" 
							type="primary" 
							size="mini" 
							:plain="true"
						/>
						<text class="source">{{ item.source }}</text>
					</view>
					<text class="title">{{ item.title }}</text>
					<text class="summary">{{ item.summary }}</text>
					<view class="news-footer">
						<view class="stats">
							<view class="stat-item">
								<u-icon name="eye" size="26" color="#999"></u-icon>
								<text>{{ item.views }}</text>
							</view>
							<view class="stat-item">
								<u-icon name="heart" size="26" color="#999"></u-icon>
								<text>{{ item.likes }}</text>
							</view>
						</view>
						<text class="time">{{ item.time }}</text>
					</view>
				</view>
				<image class="news-image" :src="item.image" mode="aspectFill"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'consult',
		data() {
			return {
				newsList: [
					{
						title: '2024中国农业农村发展趋势报告',
						summary: '农村信息化水平迅速提高，农业生产数字化起步。新冠肺炎疫情使农业电商的作用更加凸显。本报告回顾了2023年我国农业农村发展情况...',
						category: '学习—实践',
						source: '经济日报',
						time: '2024-02-10',
						image: '/static/logo.png',
						views: 2453,
						likes: 189
					},
					{
						title: '智慧农业引领现代化农业发展新方向',
						summary: '随着5G技术的普及，智慧农业在我国快速发展。从自动灌溉到无人机植保，科技赋能让农业生产效率大幅提升...',
						category: '学习—教育',
						source: '人民日报',
						time: '1个月前',
						image: '/static/logo.png',
						views: 1892,
						likes: 145
					},
					{
						title: '乡村振兴战略实施成效显著',
						summary: '近年来，我国乡村振兴战略实施取得显著成效。农村居民收入持续增长，农村基础设施不断完善，乡村面貌焕然一新...',
						category: '学习—理论',
						source: '羊城晚报',
						time: '2024-01-15',
						image: '/static/logo.png',
						views: 3267,
						likes: 256
					},
					{
						title: '数字农业助力农产品质量提升',
						summary: '通过物联网技术和大数据分析，农产品生产全程可追溯，质量安全得到有效保障。数字化转型正在重塑农业生产方式...',
						category: '学习—实践',
						source: '农民日报',
						time: '2周前',
						image: '/static/logo.png',
						views: 1756,
						likes: 134
					}
				]
			}
		},
		methods: {
			goToDetail(item) {
				// TODO: 跳转到新闻详情页
				console.log('查看新闻详情:', item.title);
				uni.navigateTo({
					url: "/pages/community/components/consult/details"
				});
			}
		}
	}
</script>

<style lang="scss">
.consult-container {
	padding: 20rpx;
	background-color: #f8f8f8;
	min-height: 100vh;
	
	.news-list {
		.news-item {
			display: flex;
			background: #ffffff;
			padding: 24rpx;
			margin-bottom: 20rpx;
			border-radius: 16rpx;
			box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
			
			.news-content {
				flex: 1;
				margin-right: 24rpx;
				
				.news-header {
					display: flex;
					align-items: center;
					margin-bottom: 16rpx;
					
					.source {
						margin-left: 16rpx;
						font-size: 24rpx;
						color: #666666;
					}
				}
				
				.title {
					font-size: 32rpx;
					font-weight: bold;
					color: #333333;
					margin-bottom: 12rpx;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}
				
				.summary {
					font-size: 26rpx;
					color: #666666;
					line-height: 1.6;
					margin-bottom: 16rpx;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}
				
				.news-footer {
					display: flex;
					justify-content: space-between;
					align-items: center;
					
					.stats {
						display: flex;
						gap: 24rpx;
						
						.stat-item {
							display: flex;
							align-items: center;
							gap: 8rpx;
							
							text {
								font-size: 24rpx;
								color: #999999;
							}
						}
					}
					
					.time {
						font-size: 24rpx;
						color: #999999;
					}
				}
			}
			
			.news-image {
				width: 200rpx;
				height: 160rpx;
				border-radius: 12rpx;
				object-fit: cover;
			}
			
			&:active {
				transform: scale(0.99);
				transition: transform 0.2s ease;
			}
		}
	}
}
</style>
