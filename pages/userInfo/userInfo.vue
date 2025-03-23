<template>
	<view class="user-container">
		<!-- 用户信息区域 -->
		<view class="user-header">
			<view class="user-info">
				<view class="left-content">
					<view class="name-row">
						<text class="username">小农001用户</text>
						<u-tag text="小农会员" type="warning" size="mini" />
					</view>
					<view class="credit-score">
						<text class="score-text">小农信用分</text>
						<text class="score-value">99.9</text>
					</view>
					<view class="social-stats">
						<view class="stat-item">
							<text class="num">60</text>
							<text class="label">我的关注</text>
						</view>
						<view class="stat-item">
							<text class="num">77</text>
							<text class="label">我的粉丝</text>
						</view>
					</view>
				</view>
				<view class="avatar-wrapper">
					<u-avatar
						size="140"
						:src="userInfo.avatar"
						@click="changeAvatar"
					></u-avatar>
					<view class="vip-entry" @click="goToVip">
						<text>进入会员中心</text>
						<u-icon name="arrow-right" size="24" color="#666"></u-icon>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 功能菜单区域 -->
		<view class="menu-section">
			<view class="menu-header">
				<text class="slogan">星光不问赶路人，时光不负新农人</text>
			</view>
			
			<!-- 订单相关 -->
			<view class="menu-group">
				<view class="group-title">
					<text>我的订单</text>
					<view class="more" @click="viewAllOrders">
						<text>全部订单</text>
						<u-icon name="arrow-right" size="24" color="#666"></u-icon>
					</view>
				</view>
				<view class="quick-actions">
					<view class="action-item" v-for="(item, index) in orderActions" :key="index" @click="handleAction(item)">
						<u-badge :count="item.count" :offset="[-8, -8]">
							<u-icon :name="item.icon" size="40" color="#666"></u-icon>
						</u-badge>
						<text>{{ item.text }}</text>
					</view>
				</view>
			</view>
			
			<!-- 功能列表 -->
			<view class="menu-list">
				<view class="menu-item" v-for="(item, index) in menuItems" :key="index" @click="handleMenu(item)">
					<view class="item-left">
						<u-icon :name="item.icon" size="32" color="#666"></u-icon>
						<text>{{ item.text }}</text>
					</view>
					<u-icon name="arrow-right" size="24" color="#666"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {
					avatar: '/static/avatar/default.png',
					username: '小农001用户',
					credit: 99.9,
					follows: 60,
					fans: 77
				},
				orderActions: [
					{ icon: 'wallet', text: '待付款', count: 2 },
					{ icon: 'car', text: '待收货', count: 1 },
					{ icon: 'star', text: '待评价', count: 0 },
					{ icon: 'server-fill', text: '售后', count: 0 }
				],
				menuItems: [
					{ icon: 'photo', text: '我的作品' },
					{ icon: 'star-fill', text: '收藏夹' },
					{ icon: 'trash', text: '回收站' },
					{ icon: 'map', text: '收货地址' },
					{ icon: 'chat', text: '客服中心' },
					{ icon: 'setting', text: '设置' }
				]
			}
		},
		methods: {
			changeAvatar() {
				// TODO: 实现更换头像功能
				console.log('更换头像');
			},
			goToVip() {
				// TODO: 跳转会员中心
				console.log('进入会员中心');
			},
			viewAllOrders() {
				// TODO: 查看全部订单
				console.log('查看全部订单');
			},
			handleAction(item) {
				// TODO: 处理订单相关操作
				console.log('订单操作:', item.text);
			},
			handleMenu(item) {
				// TODO: 处理菜单项点击
				console.log('菜单点击:', item.text);
			}
		}
	}
</script>

<style lang="scss">
.user-container {
	min-height: 100vh;
	background-color: #f8f8f8;
	
	.user-header {
		background: linear-gradient(to right, #ff9500, #ff5722);
		padding: 40rpx 30rpx;
		color: #ffffff;
		
		.user-info {
			display: flex;
			justify-content: space-between;
			
			.left-content {
				flex: 1;
				
				.name-row {
					display: flex;
					align-items: center;
					margin-bottom: 20rpx;
					
					.username {
						font-size: 36rpx;
						font-weight: bold;
						margin-right: 16rpx;
					}
				}
				
				.credit-score {
					margin-bottom: 30rpx;
					
					.score-text {
						font-size: 26rpx;
						margin-right: 12rpx;
					}
					
					.score-value {
						font-size: 40rpx;
						font-weight: bold;
						color: #ffe400;
					}
				}
				
				.social-stats {
					display: flex;
					gap: 40rpx;
					
					.stat-item {
						display: flex;
						flex-direction: column;
						
						.num {
							font-size: 32rpx;
							font-weight: bold;
							margin-bottom: 4rpx;
						}
						
						.label {
							font-size: 24rpx;
							opacity: 0.9;
						}
					}
				}
			}
			
			.avatar-wrapper {
				display: flex;
				flex-direction: column;
				align-items: center;
				
				.vip-entry {
					margin-top: 16rpx;
					display: flex;
					align-items: center;
					background: rgba(255, 255, 255, 0.2);
					padding: 6rpx 16rpx;
					border-radius: 30rpx;
					
					text {
						font-size: 24rpx;
						margin-right: 8rpx;
					}
				}
			}
		}
	}
	
	.menu-section {
		margin-top: -20rpx;
		border-radius: 20rpx 20rpx 0 0;
		background: #ffffff;
		padding: 30rpx;
		
		.menu-header {
			text-align: center;
			margin-bottom: 30rpx;
			
			.slogan {
				font-size: 28rpx;
				color: #666666;
				font-style: italic;
			}
		}
		
		.menu-group {
			background: #ffffff;
			border-radius: 16rpx;
			padding: 24rpx;
			margin-bottom: 20rpx;
			box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
			
			.group-title {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 30rpx;
				
				text {
					font-size: 30rpx;
					font-weight: bold;
					color: #333333;
				}
				
				.more {
					display: flex;
					align-items: center;
					
					text {
						font-size: 26rpx;
						color: #666666;
						font-weight: normal;
						margin-right: 8rpx;
					}
				}
			}
			
			.quick-actions {
				display: grid;
				grid-template-columns: repeat(4, 1fr);
				gap: 20rpx;
				
				.action-item {
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 12rpx;
					
					text {
						font-size: 26rpx;
						color: #666666;
					}
				}
			}
		}
		
		.menu-list {
			.menu-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 30rpx 20rpx;
				border-bottom: 2rpx solid #f5f5f5;
				
				.item-left {
					display: flex;
					align-items: center;
					gap: 20rpx;
					
					text {
						font-size: 28rpx;
						color: #333333;
					}
				}
				
				&:active {
					background-color: #f8f8f8;
				}
			}
		}
	}
}
</style>
