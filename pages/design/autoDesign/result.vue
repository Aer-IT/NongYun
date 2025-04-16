<template>
	<view class="result-container">
		<!-- 顶部区域 -->
		<view class="header-section">
			<text class="title">设计完成</text>
			<text class="subtitle">您的定制包装已生成</text>
		</view>
		
		<!-- 中央区域：包装盒展示 -->
		<view class="package-showcase">
			<view class="package-box" ref="packageBox">
				<image :src="currentDesign.imageUrl" mode="aspectFit" class="package-image"></image>
				<view class="package-overlay">
					<text class="package-text">鲜蛋包装</text>
					<text class="package-subtext">定制设计</text>
				</view>
			</view>
			
			<!-- 包装盒详情信息 -->
			<view class="package-details">
				<view class="detail-item">
					<text class="detail-label">包装名称</text>
					<text class="detail-value">{{ currentDesign.name }}</text>
				</view>
				<view class="detail-item">
					<text class="detail-label">材质</text>
					<text class="detail-value">{{ currentDesign.material }}</text>
				</view>
				<view class="detail-item">
					<text class="detail-label">容量</text>
					<text class="detail-value">{{ currentDesign.capacity }}</text>
				</view>
				<view class="detail-item">
					<text class="detail-label">价格</text>
					<text class="detail-value price">{{ currentDesign.price }}</text>
				</view>
				
				<!-- 环保标签 -->
				<view class="eco-tags">
					<view class="eco-tag">
						<u-icon name="star" color="#27ae60" size="40"></u-icon>
						<text class="tag-text">环保材质</text>
					</view>
					<view class="eco-tag">
						<u-icon name="reload" color="#27ae60" size="40"></u-icon>
						<text class="tag-text">可回收</text>
					</view>
					<view class="eco-tag">
						<u-icon name="star" color="#27ae60" size="40"></u-icon>
						<text class="tag-text">天然原料</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 底部区域：功能按钮 -->
		<view class="action-buttons">
			<view class="action-button save-button" @tap="handleSave">
				<u-icon name="download" color="#3498db" size="44"></u-icon>
				<text class="button-text">保存设计</text>
			</view>
			<view class="action-button order-button" @tap="handleOrder">
				<text class="button-text">立即下单</text>
			</view>
			<view class="action-button change-button" @tap="handleChange">
				<u-icon name="reload" color="#3498db" size="44"></u-icon>
				<text class="button-text">换个试试</text>
			</view>
		</view>
		
		<!-- 成功提示弹窗 -->
		<view class="toast-container" v-if="showToast">
			<view class="toast-content">
				<u-icon :name="toastIcon === 'success' ? 'checkmark-circle' : 'close-circle'" 
					:color="toastIcon === 'success' ? '#27ae60' : '#e74c3c'" 
					size="60"></u-icon>
				<text class="toast-text">{{ toastMessage }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 设计选项数组
				designOptions: [
					{
						id: 1,
						name: '生态鸡蛋包装',
						imageUrl: '/static/package-box1.png',
						price: '¥12.99',
						material: '可降解纸浆',
						capacity: '12枚装',
						color: '#27ae60'
					},
					{
						id: 2,
						name: '农场新鲜鸡蛋',
						imageUrl: '/static/package-box2.png',
						price: '¥15.99',
						material: '再生纸板',
						capacity: '6枚装',
						color: '#e67e22'
					},
					{
						id: 3,
						name: '有机鸡蛋礼盒',
						imageUrl: '/static/package-box3.png',
						price: '¥19.99',
						material: '竹纤维',
						capacity: '10枚装',
						color: '#8e44ad'
					},
					{
						id: 4,
						name: '乡村风情包装',
						imageUrl: '/static/package-box4.png',
						price: '¥14.99',
						material: '麦秆纤维',
						capacity: '8枚装',
						color: '#d35400'
					}
				],
				currentDesignIndex: 0,
				showToast: false,
				toastMessage: '',
				toastIcon: 'success'
			}
		},
		computed: {
			currentDesign() {
				return this.designOptions[this.currentDesignIndex];
			}
		},
		onLoad() {
			// 随机选择一个初始设计
			this.currentDesignIndex = Math.floor(Math.random() * this.designOptions.length);
		},
		methods: {
			// 保存设计到手机
			handleSave() {
				const self = this;
				// 检查保存权限
				uni.getSetting({
					success: (res) => {
						if (!res.authSetting['scope.writePhotosAlbum']) {
							uni.authorize({
								scope: 'scope.writePhotosAlbum',
								success: function() {
									self.saveImageToAlbum();
								},
								fail: function() {
									self.showToastMessage('请授权保存图片到相册', 'error');
									// 引导用户去设置页面授权
									setTimeout(() => {
										uni.openSetting();
									}, 1000);
								}
							});
						} else {
							self.saveImageToAlbum();
						}
					},
					fail: () => {
						self.showToastMessage('获取授权信息失败', 'error');
					}
				});
			},
			
			// 保存图片到相册
			saveImageToAlbum() {
				const self = this;
				uni.downloadFile({
					url: this.currentDesign.imageUrl,
					success: (res) => {
						if (res.statusCode === 200) {
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success: function() {
									self.showToastMessage('设计已保存到相册', 'success');
								},
								fail: function() {
									self.showToastMessage('保存失败，请重试', 'error');
								}
							});
						} else {
							self.showToastMessage('下载图片失败', 'error');
						}
					},
					fail: () => {
						self.showToastMessage('下载图片失败', 'error');
					}
				});
			},
			
			// 前往下单
			handleOrder() {
				uni.navigateTo({
					url: '/pages/design/autoDesign/order?id=' + this.currentDesign.id + '&name=' + this.currentDesign.name
				});
			},
			
			// 更换设计
			handleChange() {
				// 随机选择一个不同的设计
				let newIndex;
				do {
					newIndex = Math.floor(Math.random() * this.designOptions.length);
				} while (newIndex === this.currentDesignIndex && this.designOptions.length > 1);
				
				this.currentDesignIndex = newIndex;
			},
			
			// 显示提示消息
			showToastMessage(message, icon = 'success') {
				this.toastMessage = message;
				this.toastIcon = icon;
				this.showToast = true;
				
				setTimeout(() => {
					this.showToast = false;
				}, 2000);
			}
		}
	}
</script>

<style lang="scss">
	.result-container {
		min-height: 100vh;
		background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 40rpx;
		box-sizing: border-box;
		position: relative;
		
		// 顶部区域
		.header-section {
			margin-bottom: 60rpx;
			text-align: center;
			
			.title {
				display: block;
				font-size: 48rpx;
				font-weight: 600;
				color: #2c3e50;
				margin-bottom: 16rpx;
				text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
			}
			
			.subtitle {
				display: block;
				font-size: 32rpx;
				color: #34495e;
				opacity: 0.8;
			}
		}
		
		// 中央区域：包装盒展示
		.package-showcase {
			width: 100%;
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-bottom: 60rpx;
			
			.package-box {
				width: 600rpx;
				height: 600rpx;
				position: relative;
				border-radius: 20rpx;
				box-shadow: 0 20rpx 40rpx rgba(0, 0, 0, 0.15);
				overflow: hidden;
				margin-bottom: 40rpx;
				transition: all 0.3s ease;
				
				.package-image {
					width: 100%;
					height: 100%;
					object-fit: cover;
					transition: all 0.5s ease;
				}
				
				.package-overlay {
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					background: rgba(0, 0, 0, 0.2);
					
					.package-text {
						font-size: 72rpx;
						font-weight: 700;
						color: #ffffff;
						text-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.3);
						margin-bottom: 20rpx;
					}
					
					.package-subtext {
						font-size: 32rpx;
						font-weight: 500;
						color: #ffffff;
						text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.3);
					}
				}
			}
			
			// 包装盒详情信息
			.package-details {
				width: 100%;
				background: rgba(255, 255, 255, 0.8);
				border-radius: 16rpx;
				padding: 30rpx;
				box-shadow: 0 10rpx 20rpx rgba(0, 0, 0, 0.1);
				
				.detail-item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 20rpx;
					padding-bottom: 10rpx;
					border-bottom: 1rpx solid rgba(0, 0, 0, 0.05);
					
					&:last-child {
						margin-bottom: 30rpx;
						border-bottom: none;
					}
					
					.detail-label {
						font-size: 28rpx;
						font-weight: 500;
						color: #7f8c8d;
					}
					
					.detail-value {
						font-size: 28rpx;
						font-weight: 600;
						color: #2c3e50;
					}
					
					.price {
						font-size: 32rpx;
						font-weight: 700;
						color: #27ae60;
					}
				}
				
				// 环保标签
				.eco-tags {
					display: flex;
					justify-content: space-around;
					align-items: center;
					margin-top: 20rpx;
					padding-top: 20rpx;
					border-top: 1rpx solid rgba(0, 0, 0, 0.05);
					
					.eco-tag {
						display: flex;
						flex-direction: column;
						align-items: center;
						
						.tag-text {
							font-size: 24rpx;
							color: #7f8c8d;
							margin-top: 8rpx;
						}
					}
				}
			}
		}
		
		// 底部区域：功能按钮
		.action-buttons {
			width: 100%;
			display: flex;
			justify-content: space-between;
			margin-bottom: 40rpx;
			
			.action-button {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				padding: 24rpx;
				border-radius: 16rpx;
				transition: all 0.3s ease;
				
				.button-text {
					font-size: 28rpx;
					font-weight: 500;
					margin-top: 10rpx;
				}
				
				&:active {
					transform: scale(0.95);
				}
			}
			
			.save-button {
				background: rgba(52, 152, 219, 0.1);
				color: #3498db;
				border: 2rpx solid rgba(52, 152, 219, 0.3);
				flex: 1;
				margin-right: 20rpx;
			}
			
			.order-button {
				background: #27ae60;
				color: #ffffff;
				border: 2rpx solid #27ae60;
				flex: 1.5;
				margin-right: 20rpx;
				height: 120rpx;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				
				.button-text {
					font-size: 32rpx;
					font-weight: 600;
					margin-top: 0;
				}
			}
			
			.change-button {
				background: rgba(52, 152, 219, 0.1);
				color: #3498db;
				border: 2rpx solid rgba(52, 152, 219, 0.3);
				flex: 1;
			}
		}
		
		// 成功提示弹窗
		.toast-container {
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			z-index: 999;
			
			.toast-content {
				background: rgba(0, 0, 0, 0.7);
				color: #ffffff;
				padding: 30rpx 60rpx;
				border-radius: 16rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				
				.toast-text {
					font-size: 32rpx;
					margin-top: 16rpx;
				}
			}
		}
	}
</style>
