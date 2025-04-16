<template>
	<view class="box-container">
		<view class="box-list">
			<view class="box-item" v-for="(item, index) in boxList" :key="index" @click="goToDetail(item)">
				<view class="box-image">
					<image :src="item.image" mode="aspectFill"></image>
				</view>
				<view class="box-info">
					<view class="box-title">{{item.title}}</view>
					<view class="box-price">
						<text class="current-price">{{item.currentPrice}}</text>
						<text class="original-price">{{item.originalPrice}}</text>
					</view>
					<view class="box-stats">
						<text class="delivery-time">{{item.deliveryTime}}小时发货</text>
						<text class="deal-rate">{{item.dealRate}}%成交率</text>
					</view>
					<view class="box-company">{{item.company}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				boxList: [
					{
						id: 1,
						image: '/static/logo.png',
						title: '通版苹果常规盒型10斤装',
						currentPrice: '¥1.90',
						originalPrice: '¥2.30',
						deliveryTime: 48,
						dealRate: 75.5,
						company: '河南平安包装材料设计有限公司',
						totalSales: '成交3000+元'
					},
					{
						id: 2,
						image: '/static/logo.png',
						title: '通版水果常规盒型10斤装',
						currentPrice: '¥2.30',
						originalPrice: '¥2.80',
						deliveryTime: 48,
						dealRate: 75.5,
						company: '郑州鑫顺包装制品有限公司',
						totalSales: '成交7000+元'
					},
					{
						id: 3,
						image: '/static/logo.png',
						title: '通版果蔬常规盒型10斤装',
						currentPrice: '¥2.60',
						originalPrice: '¥3.10',
						deliveryTime: 48,
						dealRate: 75.5,
						company: '河南鑫顺包装制品有限公司',
						totalSales: '成交3000+元'
					},
					{
						id: 4,
						image: '/static/logo.png',
						title: '通版苹果常规盒型10斤装',
						currentPrice: '¥2.30',
						originalPrice: '¥2.80',
						deliveryTime: 48,
						dealRate: 75.5,
						company: '郑州平安包装材料设计有限公司',
						totalSales: '成交7000+元'
					},
					{
						id: 5,
						image: '/static/logo.png',
						title: '通版猕猴桃常规盒型10斤装',
						currentPrice: '¥2.70',
						originalPrice: '¥3.20',
						deliveryTime: 48,
						dealRate: 66.8,
						company: '河南昊阳包装制品有限公司',
						totalSales: '成交3500+元'
					},
					{
						id: 6,
						image: '/static/logo.png',
						title: '通版水果常规盒型10斤装',
						currentPrice: '¥2.60',
						originalPrice: '¥3.10',
						deliveryTime: 48,
						dealRate: 49.5,
						company: '郑州开元包装印刷有限公司',
						totalSales: '成交4000+元'
					}
				]
			};
		},
		methods: {
			goToDetail(item) {
				uni.navigateTo({
					url: `/pages/shopDetail/shopDetail?id=${item.id}`
				});
			}
		}
	}
</script>

<style lang="scss">
.box-container {
	background-color: #f5f5f5;
	padding: 20rpx;
	min-height: 100vh;
}

.box-list {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.box-item {
	background-color: #ffffff;
	border-radius: 12rpx;
	overflow: hidden;
	display: flex;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
	position: relative;
	
	&:active {
		opacity: 0.9;
	}
}

.box-image {
	width: 260rpx;
	height: 260rpx;
	flex-shrink: 0;
	
	image {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
}

.box-info {
	flex: 1;
	padding: 20rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.box-title {
	font-size: 30rpx;
	font-weight: 500;
	color: #333;
	margin-bottom: 15rpx;
}

.box-price {
	display: flex;
	align-items: baseline;
	margin-bottom: 15rpx;
	
	.current-price {
		font-size: 36rpx;
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

.box-stats {
	display: flex;
	margin-bottom: 15rpx;
	font-size: 24rpx;
	color: #666;
	
	.delivery-time {
		margin-right: 20rpx;
		
		&::before {
			content: "";
			display: inline-block;
			width: 12rpx;
			height: 12rpx;
			background-color: #66ccff;
			border-radius: 50%;
			margin-right: 6rpx;
			vertical-align: middle;
		}
	}
	
	.deal-rate {
		&::before {
			content: "";
			display: inline-block;
			width: 12rpx;
			height: 12rpx;
			background-color: #66cc99;
			border-radius: 50%;
			margin-right: 6rpx;
			vertical-align: middle;
		}
	}
}

.box-company {
	font-size: 22rpx;
	color: #999;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>
