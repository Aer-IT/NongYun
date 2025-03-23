<template>
	<view class="recommend-container">
		<view class="grid-container">
			<view class="card" v-for="(item, index) in flowList" :key="index">
				<image class="card-image" :src="item.image" mode="widthFix" @click="goToDetail(item)"></image>
				<view class="card-content" @click="goToDetail(item)">
					<view class="tags">
						<u-tag 
							:text="item.tag" 
							type="warning" 
							size="mini" 
							:plain="true"
						/>
					</view>
					<view class="title">{{ item.title }}</view>
					<view class="footer">
						<view class="user" @click.stop>
							<u-avatar :src="item.avatar" size="40"></u-avatar>
							<text class="username">{{ item.username }}</text>
						</view>
						<view class="likes" @click.stop="toggleLike(index)">
							<u-icon name="heart" :size="28" :color="item.isLiked ? '#ff6b6b' : '#999'"></u-icon>
							<text>{{ item.likes }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'recommend',
	data() {
		return {
			flowList: [
				{
					id: 1,
					image: '/static/logo.png',
					title: '农产品制作过程展示',
					tag: '#产品实拍#工厂制作中',
					username: '小农',
					avatar: '/static/logo.png',
					likes: 44,
					isLiked: false
				},
				{
					id: 2,
					image: '/static/logo.png',
					title: '直播带货现场实况',
					tag: '#产品实拍#正在直播中',
					username: '农产品推广员',
					avatar: '/static/logo.png',
					likes: 88,
					isLiked: false
				},
				{
					id: 3,
					image: '/static/logo.png',
					title: '新鲜水果采摘现场',
					tag: '#产品实拍#采摘进行时',
					username: '果园主',
					avatar: '/static/logo.png',
					likes: 66,
					isLiked: false
				},
				{
					id: 4,
					image: '/static/logo.png',
					title: '蔬菜种植技术分享',
					tag: '#技术分享#种植教程',
					username: '农技专家',
					avatar: '/static/logo.png',
					likes: 120,
					isLiked: false
				}
			]
		};
	},
	methods: {
		goToDetail(item) {
			uni.navigateTo({
				url: '/pages/community/components/recommend/details?id=' + item.id,
				success: () => {
					console.log('跳转到详情页:', item.title);
				},
				fail: (err) => {
					console.error('跳转失败:', err);
				}
			});
		},
		
		// 切换点赞状态
		toggleLike(index) {
			const item = this.flowList[index];
			item.isLiked = !item.isLiked;
			item.likes = item.isLiked ? item.likes + 1 : item.likes - 1;
			
			// 添加点赞反馈
			if (item.isLiked) {
				uni.showToast({
					title: '点赞成功',
					icon: 'none',
					duration: 800
				});
			}
			
			console.log('点赞状态:', item.isLiked ? '已点赞' : '取消点赞', '点赞数:', item.likes);
		}
	}
}
</script>

<style lang="scss">
.recommend-container {
	padding: 20rpx;
	background-color: #f8f8f8;
	min-height: 100vh;
	
	.grid-container {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 20rpx;
		padding: 6rpx;
	}
	
	.card {
		background: #ffffff;
		border-radius: 16rpx;
		overflow: hidden;
		box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
		
		.card-image {
			width: 100%;
			border-radius: 16rpx 16rpx 0 0;
		}
		
		.card-content {
			padding: 20rpx;
			
			.tags {
				margin-bottom: 16rpx;
			}
			
			.title {
				font-size: 28rpx;
				color: #333333;
				margin-bottom: 16rpx;
				line-height: 1.4;
			}
			
			.footer {
				display: flex;
				justify-content: space-between;
				align-items: center;
				
				.user {
					display: flex;
					align-items: center;
					gap: 12rpx;
					
					.username {
						font-size: 24rpx;
						color: #666666;
					}
				}
				
				.likes {
					display: flex;
					align-items: center;
					gap: 8rpx;
					padding: 6rpx 10rpx;
					border-radius: 30rpx;
					transition: all 0.3s ease;
					
					&:active {
						background-color: rgba(0, 0, 0, 0.05);
						transform: scale(0.95);
					}
					
					text {
						font-size: 24rpx;
						color: #999999;
						transition: color 0.3s ease;
					}
					
					// 激活状态的样式
					::v-deep .u-icon {
						transition: transform 0.3s ease;
						
						&:active {
							transform: scale(1.2);
						}
					}
				}
			}
		}
	}
}
</style>
