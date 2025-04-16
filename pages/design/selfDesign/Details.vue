<template>
	<view class="details-container">
		<!-- 顶部轮播图 -->
		<view class="swiper-section">
			<swiper class="swiper" circular :indicator-dots="false" autoplay :interval="3000" :duration="500" @change="swiperChange">
				<swiper-item v-for="(item, index) in packageImages" :key="index">
					<image :src="item" mode="aspectFit" class="package-image"></image>
				</swiper-item>
			</swiper>
			<!-- 自定义指示器 -->
			<view class="custom-indicator">
				<view 
					v-for="(item, index) in packageImages" 
					:key="index"
					class="indicator-dot"
					:class="{active: currentSwiper === index}"
				></view>
			</view>
		</view>
		
		<!-- 包装名称和标签 -->
		<view class="package-title-section">
			<view class="title-row">
				<text class="package-title">{{packageInfo.title}}</text>
			</view>
		</view>
		
		<!-- 详细信息区域 -->
		<view class="info-section">
			<view class="info-row">
				<text class="info-label">行业：</text>
				<text class="info-value">{{packageInfo.industry}}</text>
			</view>
			<view class="info-row">
				<text class="info-label">规格：</text>
				<text class="info-value">{{packageInfo.specification}}</text>
			</view>
			<view class="info-row">
				<text class="info-label">用途：</text>
				<text class="info-value">{{packageInfo.usage}}</text>
			</view>
			<view class="info-row">
				<text class="info-label">风格：</text>
				<text class="info-value">{{packageInfo.style}}</text>
			</view>
			<view class="info-row">
				<text class="info-label">材质：</text>
				<text class="info-value">{{packageInfo.material}}</text>
			</view>
		</view>
		
		<!-- 规格选择 -->
		<view class="spec-section">
			<text class="spec-title">选择设计规格：</text>
			<view class="spec-options">
				<view 
					v-for="(item, index) in specOptions" 
					:key="index"
					class="spec-option"
					:class="{active: selectedSpec === item}"
					@click="selectSpec(item)"
				>
					<text>{{item}}</text>
				</view>
			</view>
		</view>
		
		<!-- 底部按钮 -->
		<view class="bottom-actions">
			<view class="customer-service">
				<u-icon name="server-man" size="48" color="#ff9500"></u-icon>
			</view>
			<view class="start-design-btn">
				<u-button 
					text="开始设计" 
					type="primary" 
					shape="circle"
					:custom-style="{
						background: 'linear-gradient(45deg, #00b894, #00cec9)',
						width: '100%',
						height: '88rpx',
						fontSize: '32rpx',
						fontWeight: '500',
						boxShadow: '0 8rpx 24rpx rgba(0, 184, 148, 0.3)'
					}"
					@click="startDesign"
				></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentSwiper: 0,
				packageImages: [
					'/static/logo.png',
					'/static/logo.png'
				],
				packageInfo: {
					title: '鸡蛋自锁底手提箱包装设计',
					industry: '蛋类',
					specification: '5/10斤装',
					usage: '外包装',
					style: '休闲 文艺 简约 扁平 时尚',
					material: '纸板'
				},
				specOptions: ['5斤装', '10斤装'],
				selectedSpec: '5斤装'
			};
		},
		methods: {
			// 轮播图切换事件
			swiperChange(e) {
				this.currentSwiper = e.detail.current;
			},
			// 选择规格
			selectSpec(spec) {
				this.selectedSpec = spec;
			},
			// 开始设计
			startDesign() {
				console.log('开始设计，选择的规格:', this.selectedSpec);
				// TODO: 跳转到设计页面
				uni.navigateTo({
					url: '/pages/design/selfDesign/startDesign?spec=' + this.selectedSpec
				});
			}
		}
	}
</script>

<style lang="scss">
	.details-container {
		min-height: 100vh;
		background-color: #f5f5f5;
		padding-bottom: 120rpx; // 为底部按钮留出空间
	}
	
	.swiper-section {
		position: relative;
		width: 100%;
		height: 750rpx;
		background-color: #ffffff;
		
		.swiper {
			width: 100%;
			height: 100%;
		}
		
		.package-image {
			width: 100%;
			height: 100%;
			background-color: #ffffff;
		}
		
		.custom-indicator {
			position: absolute;
			bottom: 30rpx;
			left: 0;
			right: 0;
			display: flex;
			justify-content: center;
			
			.indicator-dot {
				width: 16rpx;
				height: 16rpx;
				border-radius: 50%;
				background-color: rgba(255, 255, 255, 0.5);
				margin: 0 8rpx;
				transition: all 0.3s ease;
				
				&.active {
					width: 24rpx;
					background-color: #ffffff;
				}
			}
		}
	}
	
	.package-title-section {
		padding: 30rpx;
		background-color: #ffffff;
		margin-bottom: 20rpx;
		
		.title-row {
			display: flex;
			align-items: center;
			
			.free-tag {
				padding: 6rpx 16rpx;
				background-color: #ff9500;
				color: #ffffff;
				font-size: 24rpx;
				border-radius: 6rpx;
				margin-right: 20rpx;
			}
			
			.package-title {
				font-size: 36rpx;
				font-weight: bold;
				color: #333333;
			}
		}
	}
	
	.info-section {
		padding: 30rpx;
		background-color: #ffffff;
		margin-bottom: 20rpx;
		
		.info-row {
			display: flex;
			justify-content: space-between;
			margin-bottom: 20rpx;
			
			&:last-child {
				margin-bottom: 0;
			}
			
			.info-label {
				color: #999999;
				font-size: 28rpx;
			}
			
			.info-value {
				color: #333333;
				font-size: 28rpx;
				text-align: right;
				flex: 1;
			}
		}
	}
	
	.spec-section {
		padding: 30rpx;
		background-color: #ffffff;
		
		.spec-title {
			font-size: 28rpx;
			color: #333333;
			margin-bottom: 20rpx;
			display: block;
		}
		
		.spec-options {
			display: flex;
			flex-wrap: wrap;
			
			.spec-option {
				padding: 16rpx 40rpx;
				border-radius: 100rpx;
				border: 2rpx solid #e0e0e0;
				margin-right: 20rpx;
				margin-bottom: 20rpx;
				transition: all 0.3s ease;
				
				text {
					font-size: 28rpx;
					color: #666666;
				}
				
				&.active {
					border-color: #00b894;
					background-color: rgba(0, 184, 148, 0.1);
					
					text {
						color: #00b894;
					}
				}
			}
		}
	}
	
	.bottom-actions {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #ffffff;
		padding: 20rpx 30rpx;
		display: flex;
		align-items: center;
		box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
		
		.customer-service {
			margin-right: 30rpx;
		}
		
		.start-design-btn {
			flex: 1;
		}
	}
</style>
