<template>
	<view class="design-container">
		<!-- 背景效果 -->
		<view class="bg-effects">
			<view class="light-beam"></view>
			<view class="light-beam"></view>
			<view class="light-beam"></view>
		</view>
		
		<!-- 主要内容区 -->
		<view class="content">
			<!-- 六边形标志 -->
			<view class="hexagon-container">
				<view class="hexagon">
					<u-icon name="edit-pen" size="48" color="#ffffff"></u-icon>
				</view>
				<text class="slogan">一键设计，专属定制</text>
			</view>
			
			<!-- 球形图案 -->
			<view class="sphere-container">
				<view class="sphere">
					<view class="sphere-line" v-for="i in 8" :key="i" :style="{ transform: `rotate(${i * 45}deg)` }"></view>
					<view class="sphere-dots">
						<view class="dot" v-for="i in 12" :key="i" :style="{ transform: `rotate(${i * 30}deg) translateY(-120rpx)` }"></view>
					</view>
				</view>
			</view>
			
			<!-- 功能按钮区 -->
			<view class="button-group">
				<u-button 
					text="智能设计包装" 
					type="primary" 
					shape="circle"
					:custom-style="{
						background: 'linear-gradient(45deg, #00b894, #00cec9)',
						width: '80%',
						height: '88rpx',
						fontSize: '32rpx',
						fontWeight: '500',
						boxShadow: '0 8rpx 24rpx rgba(0, 184, 148, 0.3)'
					}"
					@click="handleSmartDesign"
				></u-button>
				
				<u-button 
					text="DIY定制专属包装" 
					type="primary" 
					shape="circle"
					:custom-style="{
						background: 'linear-gradient(45deg, #00cec9, #00b894)',
						width: '80%',
						height: '88rpx',
						fontSize: '32rpx',
						fontWeight: '500',
						marginTop: '30rpx',
						boxShadow: '0 8rpx 24rpx rgba(0, 206, 201, 0.3)'
					}"
					@click="handleDIYDesign"
				></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			handleSmartDesign() {
				uni.navigateTo({
					url: '/pages/design/autoDesign/autoDesign'
				})
			},
			handleDIYDesign() {
				uni.navigateTo({
					url: '/pages/design/selfDesign/templateList'
				})
			}
		}
	}
</script>

<style lang="scss">
	.design-container {
		min-height: 100vh;
		background: linear-gradient(135deg, #1a1a1a, #2d3436);
		position: relative;
		overflow: hidden;
		
		.bg-effects {
			position: absolute;
			width: 100%;
			height: 100%;
			overflow: hidden;
			
			.light-beam {
				position: absolute;
				width: 200%;
				height: 2rpx;
				background: linear-gradient(90deg, transparent, rgba(0, 184, 148, 0.1), transparent);
				animation: beamMove 8s infinite linear;
				
				&:nth-child(1) {
					top: 20%;
					animation-delay: 0s;
				}
				
				&:nth-child(2) {
					top: 40%;
					animation-delay: 2s;
				}
				
				&:nth-child(3) {
					top: 60%;
					animation-delay: 4s;
				}
			}
		}
		
		.content {
			position: relative;
			z-index: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 60rpx 40rpx;
		}
		
		.hexagon-container {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-bottom: 60rpx;
			
			.hexagon {
				width: 160rpx;
				height: 160rpx;
				background: rgba(0, 184, 148, 0.2);
				clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: 30rpx;
				border: 2rpx solid rgba(0, 184, 148, 0.3);
				box-shadow: 0 0 30rpx rgba(0, 184, 148, 0.2);
			}
			
			.slogan {
				color: #ffffff;
				font-size: 32rpx;
				font-weight: 500;
				letter-spacing: 2rpx;
				text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.2);
			}
		}
		
		.sphere-container {
			width: 400rpx;
			height: 400rpx;
			position: relative;
			margin: 60rpx 0;
			
			.sphere {
				width: 100%;
				height: 100%;
				position: relative;
				animation: sphereRotate 20s infinite linear;
				
				.sphere-line {
					position: absolute;
					width: 2rpx;
					height: 100%;
					background: rgba(0, 184, 148, 0.1);
					left: 50%;
					transform-origin: center;
				}
				
				.sphere-dots {
					position: absolute;
					width: 100%;
					height: 100%;
					
					.dot {
						position: absolute;
						width: 8rpx;
						height: 8rpx;
						background: rgba(0, 184, 148, 0.6);
						border-radius: 50%;
						left: 50%;
						top: 50%;
						transform-origin: center;
						box-shadow: 0 0 10rpx rgba(0, 184, 148, 0.4);
					}
				}
			}
		}
		
		.button-group {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-top: 60rpx;
		}
	}
	
	@keyframes beamMove {
		0% {
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(100%);
		}
	}
	
	@keyframes sphereRotate {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
