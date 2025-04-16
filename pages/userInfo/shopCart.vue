<template>
	<view class="cart-container">
		<!-- 商品列表 -->
		<view class="cart-list">
			<view class="cart-item" v-for="(item, index) in cartItems" :key="index">
				<checkbox :checked="item.selected" @tap="toggleSelect(index)" />
				<image class="product-image" :src="item.image" mode="aspectFill"></image>
				<view class="product-info">
					<text class="product-name">{{ item.name }}</text>
					<text class="product-spec">{{ item.spec }}</text>
					<view class="price-quantity">
						<text class="price">¥{{ item.price }}</text>
						<view class="quantity-control">
							<u-icon name="minus" size="20" @click="decreaseQuantity(index)" />
							<input type="number" v-model="item.quantity" class="quantity-input" />
							<u-icon name="plus" size="20" @click="increaseQuantity(index)" />
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 底部结算栏 -->
		<view class="settlement-bar">
			<view class="select-all">
				<checkbox :checked="allSelected" @tap="toggleSelectAll" />
				<text>全选</text>
			</view>
			<view class="total-info">
				<text class="total-text">总计：</text>
				<text class="total-price">¥{{ totalPrice }}</text>
			</view>
			<button class="checkout-btn" @click="checkout">结算</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cartItems: [
					{
						name: '新款石榴高档礼盒包装',
						spec: '五层瓦楞纸厚度六斤装',
						price: 20,
						quantity: 1,
						image: '/static/box/image1.png',
						selected: true
					},
					{
						name: '新款石榴高档礼盒包装',
						spec: '五层瓦楞纸厚度六斤装',
						price: 10,
						quantity:1,
						image: '/static/box/image2.png',
						selected: true
					},
					{
						name: '新款石榴高档礼盒包装',
						spec: '五层瓦楞纸厚度六斤装',
						price: 30,
						quantity: 3,
						image: '/static/box/image3.png',
						selected: true
					}
				]
			};
		},
		computed: {
			allSelected() {
				return this.cartItems.every(item => item.selected);
			},
			totalPrice() {
				return this.cartItems
					.filter(item => item.selected)
					.reduce((total, item) => total + item.price * item.quantity, 0);
			}
		},
		methods: {
			toggleSelect(index) {
				this.cartItems[index].selected = !this.cartItems[index].selected;
			},
			toggleSelectAll() {
				const newState = !this.allSelected;
				this.cartItems.forEach(item => item.selected = newState);
			},
			decreaseQuantity(index) {
				if (this.cartItems[index].quantity > 1) {
					this.cartItems[index].quantity--;
				}
			},
			increaseQuantity(index) {
				this.cartItems[index].quantity++;
			},
			checkout() {
				uni.showToast({
					title: '正在开发中',
					icon: 'none'
				});
			}
		}
	}
</script>

<style lang="scss">
.cart-container {
	min-height: 100vh;
	background-color: #f8f8f8;
	padding-bottom: 120rpx;

	.cart-list {
		padding: 20rpx;

		.cart-item {
			background-color: #ffffff;
			border-radius: 16rpx;
			padding: 20rpx;
			margin-bottom: 20rpx;
			display: flex;
			align-items: center;
			gap: 20rpx;

			.product-image {
				width: 160rpx;
				height: 160rpx;
				border-radius: 8rpx;
			}

			.product-info {
				flex: 1;

				.product-name {
					font-size: 28rpx;
					color: #333;
					margin-bottom: 10rpx;
				}

				.product-spec {
					font-size: 24rpx;
					color: #666;
					margin-bottom: 20rpx;
				}

				.price-quantity {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.price {
						color: #ff5722;
						font-size: 32rpx;
						font-weight: bold;
					}

					.quantity-control {
						display: flex;
						align-items: center;
						gap: 20rpx;

						.quantity-input {
							width: 80rpx;
							text-align: center;
							font-size: 28rpx;
						}
					}
				}
			}
		}
	}

	.settlement-bar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #ffffff;
		padding: 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);

		.select-all {
			display: flex;
			align-items: center;
			gap: 10rpx;

			text {
				font-size: 28rpx;
				color: #333;
			}
		}

		.total-info {
			flex: 1;
			text-align: right;
			padding-right: 20rpx;

			.total-text {
				font-size: 28rpx;
				color: #333;
			}

			.total-price {
				color: #ff5722;
				font-size: 36rpx;
				font-weight: bold;
			}
		}

		.checkout-btn {
			background: linear-gradient(to right, #ff9500, #ff5722);
			color: #ffffff;
			padding: 20rpx 60rpx;
			border-radius: 40rpx;
			font-size: 28rpx;
		}
	}
}
</style>
