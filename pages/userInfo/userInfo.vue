<template>
	<view class="user-container">
		<!-- 用户信息区域 -->
		<view class="user-header">
			<view class="user-info">
				<view class="left-content">
					<view class="name-row">
						<text class="username">小农001用户</text>
						<view class="user-tag">普通会员</view>
					</view>
				</view>
				<view class="avatar-wrapper">
					<u-avatar
						size="140"
						:src="userInfo.avatar"
						@click="changeAvatar"
					></u-avatar>
					<text class="edit-text">编辑</text>
				</view>
			</view>
		</view>
		
		<!-- 功能菜单区域 -->
		<view class="menu-section">
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
						<u-badge :count="item.count" :offset="[-8, -8]" :show="item.count > 0">
							<u-icon :name="item.icon" size="44" color="#666"></u-icon>
						</u-badge>
						<text>{{ item.text }}</text>
						<text class="count-text">{{ item.count }}</text>
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
					avatar: '/static/logo.png',
					username: '小农001用户'
				},
				orderActions: [
					{ icon: 'wallet', text: '待付款', count: 1 },
					{ icon: 'car', text: '待发货', count: 1 },
					{ icon: 'star', text: '待评价', count: 1 },
					{ icon: 'server-fill', text: '售后', count: 0 }
				],
				menuItems: [
					{ icon: 'map', text: '收货地址' },
					{ icon: 'shopping-cart', text: '购物车' },
					{ icon: 'setting', text: '设置' }
				]
			}
		},
		methods: {
			changeAvatar() {
				// 实现更换头像功能
				uni.chooseImage({
					count: 1,
					success: (res) => {
						// 这里只是示例，实际应该上传到服务器
						this.userInfo.avatar = res.tempFilePaths[0];
						uni.showToast({
							title: '头像更新成功',
							icon: 'success'
						});
					}
				});
			},
			viewAllOrders() {
				// 查看全部订单
				uni.navigateTo({
					url: '/pages/userInfo/order?tab=all'
				});
			},
			handleAction(item) {
				// 处理订单相关操作
				uni.navigateTo({
					url: `/pages/userInfo/order?tab=${item.text === '待付款' ? 'pending' : item.text === '待发货' ? 'shipping' : item.text === '待评价' ? 'completed' : item.text === '售后' ? 'afterSale' : 'all'}`
				});
			},
			handleMenu(item) {
				// 处理菜单项点击
				let url = '';
				switch(item.text) {
					case '收货地址':
						url = '/pages/userInfo/address';
						break;
					case '购物车':
						url = '/pages/userInfo/shopCart';
						break;
					case '设置':
						url = '/pages/userInfo/settings';
						break;
					default:
						url = '';
				}
				
				if(url) {
					uni.navigateTo({ url });
				}
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
		padding: 50rpx 30rpx;
		color: #ffffff;
		
		.user-info {
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			.left-content {
				flex: 1;
				
				.name-row {
					display: flex;
					align-items: center;
					
					.username {
						font-size: 40rpx;
						font-weight: bold;
						margin-right: 16rpx;
					}
					
					.user-tag {
						background-color: rgba(255, 255, 255, 0.2);
						border-radius: 30rpx;
						padding: 4rpx 16rpx;
						font-size: 22rpx;
					}
				}
			}
			
			.avatar-wrapper {
				display: flex;
				flex-direction: column;
				align-items: center;
				
				.edit-text {
					font-size: 24rpx;
					margin-top: 10rpx;
					opacity: 0.8;
				}
			}
		}
	}
	
	.menu-section {
		margin-top: -20rpx;
		border-radius: 20rpx 20rpx 0 0;
		background: #ffffff;
		padding: 30rpx;
		
		.menu-group {
			background: #ffffff;
			border-radius: 16rpx;
			padding: 30rpx 24rpx;
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
				gap: 10rpx;
				
				.action-item {
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 12rpx;
					padding: 20rpx 0;
					
					text {
						font-size: 24rpx;
						color: #666666;
					}
					
					.count-text {
						font-size: 22rpx;
						color: #999;
					}
					
					&:active {
						background-color: #f8f8f8;
						border-radius: 10rpx;
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
				
				&:last-child {
					border-bottom: none;
				}
			}
		}
	}
}
</style>
