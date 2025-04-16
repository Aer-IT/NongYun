<template>
	<view class="order-container">
		<!-- 顶部标题 -->
		<view class="top-header">
			<text class="page-title">我的订单</text>
		</view>
		
		<!-- 订单状态选项卡 -->
		<view class="order-tabs">
			<view 
				class="tab-item" 
				v-for="(tab, index) in tabs" 
				:key="index"
				:class="{ active: currentTab === tab.value }"
				@click="switchTab(tab.value)"
			>
				<text>{{ tab.name }}</text>
				<view class="tab-line" v-if="currentTab === tab.value"></view>
			</view>
		</view>
		
		<!-- 订单列表 -->
		<scroll-view scroll-y class="order-list" v-if="filteredOrders.length > 0">
			<view class="order-item" v-for="(order, index) in filteredOrders" :key="index">
				<!-- 订单商家信息 -->
				<view class="order-shop">
					<view class="left-content">
						<u-avatar size="70" :src="order.shopLogo"></u-avatar>
						<text class="shop-name">{{ order.shopName }}</text>
					</view>
					<u-icon name="arrow-right" color="#999" size="28"></u-icon>
				</view>
				
				<!-- 订单商品信息 -->
				<view class="order-product">
					<image class="product-image" :src="order.productImage" mode="aspectFill"></image>
					<view class="product-info">
						<view class="product-title">{{ order.productTitle }}</view>
						<view class="product-specs">{{ order.productSpecs }}</view>
						<view class="product-price-qty">
							<text class="price">{{ order.price }}</text>
							<text class="qty">x{{ order.quantity }}</text>
						</view>
					</view>
				</view>
				
				<!-- 订单金额和发货时间 -->
				<view class="order-info">
					<view class="delivery-time">{{ order.deliveryTime }}</view>
					<view class="order-total">
						<text>需付款：</text>
						<text class="total-amount">{{ order.totalAmount }}</text>
					</view>
				</view>
				
				<!-- 订单操作按钮 -->
				<view class="order-actions">
					<view class="action-button cancel" v-if="order.status === 'pending'" @click="cancelOrder(order)">
						取消订单
					</view>
					<view class="action-button primary" v-if="order.status === 'pending'" @click="payOrder(order)">
						付款
					</view>
					<view class="action-button normal" v-if="order.status === 'shipping'" @click="viewLogistics(order)">
						查看物流
					</view>
					<view class="action-button normal" v-if="order.status === 'shipping'" @click="confirmReceive(order)">
						确认收货
					</view>
					<view class="action-button normal" v-if="order.status === 'completed'" @click="writeReview(order)">
						评价
					</view>
				</view>
			</view>
		</scroll-view>
		
		<!-- 空状态 -->
		<view class="empty-state" v-else>
			<u-empty mode="order" icon="http://cdn.uviewui.com/uview/empty/order.png">
				<text slot="text">暂无相关订单</text>
			</u-empty>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentTab: 'pending', // 当前选中的标签
				tabs: [
					{ name: '待付款', value: 'pending' },
					{ name: '待收货', value: 'shipping' },
					{ name: '售后', value: 'afterSale' }
				],
				orders: [
					{
						id: 1,
						shopLogo: '/static/shop_logo.jpg',
						shopName: '河南启航包装制品有限公司',
						productImage: '/static/box1.jpg',
						productTitle: '新款石榴高档礼盒包装',
						productSpecs: '五层瓦楞纸厚度六斤装',
						price: '¥4700',
						quantity: 1,
						totalAmount: '¥4700',
						deliveryTime: '48小时发货',
						status: 'pending'
					},
					{
						id: 2,
						shopLogo: '/static/shop_logo2.jpg',
						shopName: '郑州顺丰包装材料有限公司',
						productImage: '/static/box2.jpg',
						productTitle: '环保水果包装盒',
						productSpecs: '三层加厚瓦楞纸',
						price: '¥2300',
						quantity: 2,
						totalAmount: '¥4600',
						deliveryTime: '72小时发货',
						status: 'shipping'
					},
					{
						id: 3,
						shopLogo: '/static/shop_logo3.jpg',
						shopName: '郑州优创包装设计有限公司',
						productImage: '/static/box3.jpg',
						productTitle: '高档苹果礼盒',
						productSpecs: '精装版瓦楞纸',
						price: '¥3800',
						quantity: 1,
						totalAmount: '¥3800',
						deliveryTime: '48小时发货',
						status: 'completed'
					}
				]
			};
		},
		computed: {
			filteredOrders() {
				if (this.currentTab === 'all') {
					return this.orders;
				}
				return this.orders.filter(order => order.status === this.currentTab);
			}
		},
		onLoad(options) {
			// 如果有传入的tab参数，则切换到指定标签
			if (options && options.tab) {
				this.currentTab = options.tab;
			}
		},
		methods: {
			switchTab(tabValue) {
				this.currentTab = tabValue;
				console.log('切换到', tabValue);
			},
			cancelOrder(order) {
				uni.showModal({
					title: '提示',
					content: '确定要取消该订单吗？',
					success: (res) => {
						if (res.confirm) {
							// 这里模拟取消订单的操作
							console.log('取消订单', order.id);
							uni.showToast({
								title: '已取消订单',
								icon: 'success'
							});
						}
					}
				});
			},
			payOrder(order) {
				uni.navigateTo({
					url: `/pages/payment/payment?orderId=${order.id}&amount=${order.totalAmount}`
				});
			},
			viewLogistics(order) {
				uni.navigateTo({
					url: `/pages/logistics/logistics?orderId=${order.id}`
				});
			},
			confirmReceive(order) {
				uni.showModal({
					title: '确认收货',
					content: '请确认您已收到商品？',
					success: (res) => {
						if (res.confirm) {
							// 这里模拟确认收货的操作
							console.log('确认收货', order.id);
							uni.showToast({
								title: '确认收货成功',
								icon: 'success'
							});
						}
					}
				});
			},
			writeReview(order) {
				uni.navigateTo({
					url: `/pages/review/review?orderId=${order.id}`
				});
			}
		}
	}
</script>

<style lang="scss">
.order-container {
	min-height: 100vh;
	background-color: #f8f8f8;
	
	.top-header {
		background-color: #66cfca;
		padding: 20rpx 30rpx;
		color: #ffffff;
		text-align: center;
		
		.page-title {
			font-size: 36rpx;
			font-weight: bold;
		}
	}
	
	.order-tabs {
		background-color: #ffffff;
		display: flex;
		justify-content: space-around;
		padding: 20rpx 0;
		border-bottom: 2rpx solid #f0f0f0;
		
		.tab-item {
			font-size: 30rpx;
			color: #666666;
			padding: 10rpx 20rpx;
			position: relative;
			
			&.active {
				color: #66cfca;
				font-weight: bold;
			}
			
			.tab-line {
				position: absolute;
				bottom: -10rpx;
				left: 50%;
				transform: translateX(-50%);
				width: 60rpx;
				height: 6rpx;
				border-radius: 3rpx;
				background-color: #66cfca;
			}
		}
	}
	
	.order-list {
		padding: 20rpx;
		max-height: calc(100vh - 180rpx);
	}
	
	.order-item {
		background-color: #ffffff;
		border-radius: 12rpx;
		margin-bottom: 20rpx;
		overflow: hidden;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
		
		.order-shop {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx;
			border-bottom: 2rpx solid #f5f5f5;
			
			.left-content {
				display: flex;
				align-items: center;
				
				.shop-name {
					font-size: 28rpx;
					color: #333333;
					font-weight: 500;
					margin-left: 15rpx;
				}
			}
		}
		
		.order-product {
			display: flex;
			padding: 20rpx;
			border-bottom: 2rpx solid #f5f5f5;
			
			.product-image {
				width: 160rpx;
				height: 160rpx;
				border-radius: 8rpx;
				margin-right: 20rpx;
				flex-shrink: 0;
			}
			
			.product-info {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				
				.product-title {
					font-size: 28rpx;
					color: #333333;
					font-weight: 500;
					margin-bottom: 10rpx;
				}
				
				.product-specs {
					font-size: 24rpx;
					color: #999999;
					margin-bottom: 10rpx;
				}
				
				.product-price-qty {
					display: flex;
					justify-content: space-between;
					
					.price {
						font-size: 26rpx;
						color: #333333;
					}
					
					.qty {
						font-size: 26rpx;
						color: #999999;
					}
				}
			}
		}
		
		.order-info {
			padding: 20rpx;
			border-bottom: 2rpx solid #f5f5f5;
			
			.delivery-time {
				font-size: 24rpx;
				color: #999999;
				margin-bottom: 10rpx;
			}
			
			.order-total {
				display: flex;
				justify-content: flex-end;
				align-items: center;
				
				text {
					font-size: 26rpx;
					color: #666666;
				}
				
				.total-amount {
					font-size: 32rpx;
					color: #ff5722;
					font-weight: bold;
				}
			}
		}
		
		.order-actions {
			display: flex;
			justify-content: flex-end;
			padding: 20rpx;
			gap: 20rpx;
			
			.action-button {
				border-radius: 30rpx;
				padding: 10rpx 30rpx;
				font-size: 26rpx;
				
				&.normal {
					border: 2rpx solid #ddd;
					color: #666;
				}
				
				&.primary {
					background-color: #ff5722;
					color: #fff;
				}
				
				&.cancel {
					border: 2rpx solid #ddd;
					color: #999;
				}
			}
		}
	}
	
	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 100rpx 0;
	}
}
</style>
