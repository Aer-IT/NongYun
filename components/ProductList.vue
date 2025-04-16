<template>
	<view class="product-section">
		<view class="product-grid">
			<view class="product-card" v-for="(item, index) in productList" :key="index" @click="handleShopClick(item)">
				<view class="product-image">
					<img :src="item.image" alt="">
				</view>
				<view class="product-info">
					<div class="product-price">
						<span class="current-price">{{ item.currentPrice }}</span>
						<span class="original-price">{{ item.originalPrice }}</span>
					</div>
					<div class="product-stats">
						<span>销量：{{ item.sales }}</span>
					</div>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'ProductList',
    data() {
        return {
            productList: [
					{
						id: 1,
						image: '/static/logo.png',
						title: '精美包装盒',
						currentPrice: '¥120',
						originalPrice: '¥150',
						sales: 100,
						favorites: 50
					},
					{
						id: 2,
						image: '/static/logo.png',
						title: '高档礼品盒',
						currentPrice: '¥200',
						originalPrice: '¥250',
						sales: 80,
						favorites: 40
					},
					{
						id: 3,
						image: '/static/logo.png',
						title: '创意翻盖盒',
						currentPrice: '¥180',
						originalPrice: '¥220',
						sales: 90,
						favorites: 50
					},
					{
						id: 4,
						image: '/static/logo.png',
						title: '经典天地盖',
						currentPrice: '¥150',
						originalPrice: '¥180',
						sales: 70,
						favorites: 30
					},
					{
						id: 5,
						image: '/static/logo.png',
						title: '时尚瓶型包装',
						currentPrice: '¥100',
						originalPrice: '¥120',
						sales: 60,
						favorites: 20
					},
					{
						id: 6,
						image: '/static/logo.png',
						title: '独特抽拉盒',
						currentPrice: '¥130',
						originalPrice: '¥160',
						sales: 80,
						favorites: 40
					},
					{
						id: 7,
						image: '/static/logo.png',
						title: '内部填充包装',
						currentPrice: '¥100',
						originalPrice: '¥120',
						sales: 50,
						favorites: 20
					},
					{
						id: 8,
						image: '/static/logo.png',
						title: '更多盒型选择',
						currentPrice: '¥150',
						originalPrice: '¥180',
						sales: 70,
						favorites: 30
					}
				]
        }
    },
	methods: {
		handleShopClick(item) {
			uni.navigateTo({
				url: `/pages/shopDetail/shopDetail?id=${item.id}`
			})
		}
	}
}
</script>

<style lang="scss">
.product-section {
	width: 92%;
	margin: 30rpx auto;
	background: #ffffff;
	border-radius: 20rpx;
	box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
	.product-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 24rpx;
		padding: 6rpx;  
	}

	.product-card {
		background: #ffffff;
		border-radius: 16rpx;
		overflow: hidden;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.06);
		transition: all 0.3s ease;
		border: 2rpx solid rgba(102,207,200,0.1);

		&:active {
			transform: scale(0.97);
		}

		.product-image {
			width: 100%;
			height: 320rpx;
			position: relative;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
				object-fit: cover;
				transition: transform 0.3s ease;
			}

			&::after {
				content: '';
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				height: 60rpx;
				background: linear-gradient(to top, rgba(0,0,0,0.05), transparent);
			}
			
			&:hover {
				image {
					transform: scale(1.05);
				}
			}
		}

		.product-info {
			padding: 20rpx;
			background: linear-gradient(to bottom, #ffffff, rgba(102,207,200,0.03));


			.product-price {
				display: flex;
				align-items: baseline;
				margin-top: 12rpx;
				position: relative;

				.current-price {
					font-size: 36rpx;
					color: #ff6b6b;
					font-weight: bold;
					margin-right: 16rpx;
					
					&::before {
						content: '¥';
						font-size: 24rpx;
						margin-right: 2rpx;
					}
				}

				.original-price {
					font-size: 24rpx;
					color: #999999;
					text-decoration: line-through;
					opacity: 0.8;
				}
			}

			.product-stats {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 16rpx;
				font-size: 22rpx;
				color: #666666;
				padding-top: 12rpx;
				border-top: 2rpx dashed rgba(102,207,200,0.1);
				
				span {
					display: flex;
					align-items: center;
					
					&::before {
						content: '';
						display: inline-block;
						width: 6rpx;
						height: 6rpx;
						background: rgb(102,207,200);
						border-radius: 50%;
						margin-right: 8rpx;
						opacity: 0.6;
					}
				}
			}
		}
	}
}
</style> 