<template>
	<view class="loading-container">
		<!-- 背景几何线条和点阵 -->
		<view class="background-elements">
			<view class="geometric-lines"></view>
			<view class="dot-matrix"></view>
		</view>
		
		<!-- 中心聚焦区域 -->
		<view class="center-focus">
			<!-- 六边形图标 -->
			<view class="hexagon-icon">
				<view class="hexagon-inner"></view>
			</view>
			
			<!-- 加载文字 -->
			<text class="loading-text">方案智能生成中...</text>
			
			<!-- 进度条 -->
			<view class="progress-bar-container">
				<view class="progress-bar">
					<view class="progress-fill" :style="{ width: `${progress}%` }"></view>
				</view>
				<text class="progress-text">{{ progress }}%</text>
			</view>
		</view>
		
		<!-- 步骤列表 -->
		<view class="steps-container">
			<view 
				v-for="(step, index) in steps" 
				:key="index"
				class="step-item"
				:class="step.status"
			>
				<view class="step-icon">
					<text v-if="step.status === 'completed'" class="iconfont icon-check"></text>
					<text v-else-if="step.status === 'current'" class="iconfont icon-loading"></text>
					<text v-else class="step-number">{{ step.id }}</text>
				</view>
				<text class="step-text">{{ step.text }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				progress: 0,
				steps: [
					{ id: 1, text: '用户输入信息识别中...', status: 'pending' },
					{ id: 2, text: '产品设计属性定位中...', status: 'pending' },
					{ id: 3, text: '设计风格确定中...', status: 'pending' },
					{ id: 4, text: '正在从素材库调取...', status: 'pending' },
					{ id: 5, text: '智能排版中...', status: 'pending' },
					{ id: 6, text: '智能配色中...', status: 'pending' },
					{ id: 7, text: '准备产出方案', status: 'pending' }
				],
				boxType: '',
				boxSize: '',
				timer: null
			};
		},
		onLoad(options) {
			// 获取URL参数
			try {
				if (options.box) {
					this.boxType = decodeURIComponent(options.box);
				}
				if (options.size) {
					this.boxSize = decodeURIComponent(options.size);
				}
				
				// 启动进度模拟
				this.startProgressSimulation();
			} catch (error) {
				console.error('加载参数出错:', error);
				// 出错时也启动进度模拟
				this.startProgressSimulation();
			}
		},
		onUnload() {
			// 清除定时器
			if (this.timer) {
				clearInterval(this.timer);
				this.timer = null;
			}
		},
		methods: {
			startProgressSimulation() {
				// 初始化第一个步骤为当前状态
				this.steps[0].status = 'current';
				
				// 使用不同的时间间隔和增量来模拟真实的加载过程
				const simulateStepProgress = (startProgress, endProgress, stepIndex, duration) => {
					return new Promise(resolve => {
						const startTime = Date.now();
						const updateProgress = () => {
							const elapsedTime = Date.now() - startTime;
							const progressRatio = Math.min(elapsedTime / duration, 1);
							
							// 使用缓动函数使进度看起来更自然
							const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
							const easedProgress = easeOutCubic(progressRatio);
							
							this.progress = Math.floor(startProgress + (endProgress - startProgress) * easedProgress);
							
							if (progressRatio < 1) {
								// 使用setTimeout替代requestAnimationFrame
								setTimeout(updateProgress, 16); // 约60fps
							} else {
								// 当前步骤完成
								if (stepIndex < this.steps.length) {
									this.steps[stepIndex].status = 'completed';
									
									// 开始下一个步骤
									if (stepIndex + 1 < this.steps.length) {
										this.steps[stepIndex + 1].status = 'current';
									}
								}
								resolve();
							}
						};
						
						updateProgress();
					});
				};
				
				// 按顺序执行每个步骤的进度模拟
				const runSimulation = async () => {
					try {
						// 第1步：用户输入信息识别 (0% - 15%)
						await simulateStepProgress(0, 15, 0, 500);
						
							// 第2步：产品设计属性定位 (15% - 30%)
						await simulateStepProgress(15, 30, 1, 500);
						
						// 第3步：设计风格确定 (30% - 45%)
						await simulateStepProgress(30, 45, 2, 500);
						
						// 第4步：从素材库调取 (45% - 60%)
						await simulateStepProgress(45, 60, 3, 500);
						
						// 第5步：智能排版 (60% - 75%)
						await simulateStepProgress(60, 75, 4, 500);

						// 第6步：智能配色 (75% - 90%)
						await simulateStepProgress(75, 90, 5, 500);
						
						// 第7步：准备产出方案 (90% - 100%)
						await simulateStepProgress(90, 100, 6, 1500);
						
						// 完成后导航到结果页面
						setTimeout(() => {
							this.navigateToResult();
						}, 800);
					} catch (error) {
						console.error('模拟进度出错:', error);
						// 出错时也导航到结果页面，避免用户卡在加载页
						setTimeout(() => {
							this.navigateToResult();
						}, 1000);
					}
				};
				
				runSimulation();
			},
			navigateToResult() {
				// 导航到结果页面，并传递参数
				try {
					uni.navigateTo({
						url: `/pages/design/autoDesign/result?box=${encodeURIComponent(this.boxType)}&size=${encodeURIComponent(this.boxSize)}`,
						fail: (err) => {
							console.error('导航失败:', err);
							// 备用导航方法
							this.fallbackNavigation();
						}
					});
				} catch (error) {
					console.error('导航出错:', error);
					// 备用导航方法
					this.fallbackNavigation();
				}
			},
			fallbackNavigation() {
				// 备用导航方法，不带参数直接跳转
				setTimeout(() => {
					uni.navigateTo({
						url: '/pages/design/autoDesign/result',
						fail: () => {
							// 如果还是失败，尝试返回上一页
							uni.navigateBack({
								delta: 1
							});
						}
					});
				}, 500);
			}
		}
	}
</script>

<style lang="scss">
	.loading-container {
		min-height: 100vh;
		background: linear-gradient(135deg, #0a1128, #1c2541);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 40rpx;
		position: relative;
		overflow: hidden;
		
		// 背景几何线条和点阵
		.background-elements {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
			opacity: 0.2;
			
			.geometric-lines {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-image: 
					linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
					linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px);
				background-size: 60rpx 60rpx;
				/* 小程序环境中可能不支持复杂动画，简化或移除 */
				/* animation: backgroundMove 60s linear infinite; */
			}
			
			.dot-matrix {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
				background-size: 30rpx 30rpx;
				/* 小程序环境中可能不支持复杂动画，简化或移除 */
				/* animation: backgroundMove 40s linear infinite reverse; */
			}
		}
		
		// 中心聚焦区域
		.center-focus {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-bottom: 60rpx;
			z-index: 2;
			
			// 六边形图标
			.hexagon-icon {
				width: 160rpx;
				height: 180rpx;
				position: relative;
				margin-bottom: 40rpx;
				animation: pulse 2s infinite ease-in-out;
				
				&::before, &::after {
					content: '';
					position: absolute;
					width: 100%;
					height: 100%;
					background: linear-gradient(135deg, #00b894, #0984e3);
					clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
				}
				
				&::before {
					opacity: 0.7;
					animation: rotate 6s infinite linear;
				}
				
				&::after {
					opacity: 0.5;
					/* 简化动画，避免多层动画导致性能问题 */
					/* animation: rotate 8s infinite linear reverse; */
				}
				
				.hexagon-inner {
					position: absolute;
					top: 10rpx;
					left: 10rpx;
					right: 10rpx;
					bottom: 10rpx;
					background: #1c2541;
					clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
					z-index: 1;
					display: flex;
					align-items: center;
					justify-content: center;
					
					&::after {
						content: '';
						width: 40%;
						height: 40%;
						background: linear-gradient(135deg, #00b894, #0984e3);
						border-radius: 50%;
						animation: glow 2s infinite alternate;
						box-shadow: 0 0 20rpx rgba(0, 184, 148, 0.6);
					}
				}
			}
			
			// 加载文字
			.loading-text {
				font-size: 36rpx;
				color: #ffffff;
				font-weight: 600;
				margin-bottom: 40rpx;
				text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.3);
				animation: fadeInOut 2s infinite alternate;
			}
			
			// 进度条
			.progress-bar-container {
				width: 80%;
				display: flex;
				flex-direction: column;
				align-items: center;
				
				.progress-bar {
					width: 100%;
					height: 16rpx;
					background: rgba(255, 255, 255, 0.1);
					border-radius: 8rpx;
					overflow: hidden;
					margin-bottom: 16rpx;
					box-shadow: inset 0 2rpx 4rpx rgba(0, 0, 0, 0.2);
					
					.progress-fill {
						height: 100%;
						background: linear-gradient(90deg, #00b894, #0984e3);
						border-radius: 8rpx;
						transition: width 0.3s ease;
						position: relative;
						overflow: hidden;
						
						&::after {
							content: '';
							position: absolute;
							top: 0;
							left: 0;
							right: 0;
							bottom: 0;
							background: linear-gradient(
								90deg, 
								rgba(255, 255, 255, 0) 0%, 
								rgba(255, 255, 255, 0.4) 50%, 
								rgba(255, 255, 255, 0) 100%
							);
							/* 简化动画，使用更简单的方式实现闪光效果 */
							opacity: 0.6;
							/* animation: shimmer 1.5s infinite; */
						}
					}
				}
				
				.progress-text {
					font-size: 28rpx;
					color: rgba(255, 255, 255, 0.8);
					font-weight: 500;
					transition: all 0.3s ease;
				}
			}
		}
		
		// 步骤列表
		.steps-container {
			width: 80%;
			z-index: 2;
			
			.step-item {
				display: flex;
				align-items: center;
				margin-bottom: 24rpx;
				transition: all 0.3s ease;
				opacity: 0.7;
				transform: translateX(0);
				
				&.completed {
					.step-icon {
						background: rgba(0, 184, 148, 0.2);
						border-color: #00b894;
						
						.icon-check {
							color: #00b894;
						}
					}
					
					.step-text {
						color: rgba(255, 255, 255, 0.6);
					}
					
					/* 简化动画，避免在小程序环境中出现问题 */
					opacity: 0.6;
					transform: translateX(-5rpx);
					/* animation: slideOutLeft 0.5s forwards; */
				}
				
				&.current {
					opacity: 1;
					transform: translateX(5rpx);
					
					.step-icon {
						background: rgba(9, 132, 227, 0.2);
						border-color: #0984e3;
						transform: scale(1.1);
						box-shadow: 0 0 15rpx rgba(9, 132, 227, 0.4);
						
						.icon-loading {
							color: #0984e3;
							animation: rotate 2s infinite linear;
						}
					}
					
					.step-text {
						color: #ffffff;
						font-weight: 500;
						transform: scale(1.05);
						text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.3);
					}
					
					/* 简化动画，避免在小程序环境中出现问题 */
					/* animation: pulse 2s infinite alternate; */
				}
				
				.step-icon {
					width: 48rpx;
					height: 48rpx;
					border-radius: 50%;
					background: rgba(255, 255, 255, 0.1);
					border: 2rpx solid rgba(255, 255, 255, 0.3);
					display: flex;
					align-items: center;
					justify-content: center;
					margin-right: 20rpx;
					flex-shrink: 0;
					transition: all 0.3s ease;
					
					.iconfont {
						font-size: 24rpx;
						color: #ffffff;
					}
					
					.step-number {
						font-size: 24rpx;
						color: rgba(255, 255, 255, 0.7);
					}
				}
				
				.step-text {
					font-size: 28rpx;
					color: rgba(255, 255, 255, 0.5);
					line-height: 1.4;
					transition: all 0.3s ease;
				}
			}
		}
	}
	
	// 动画
	@keyframes pulse {
		0% { transform: scale(1); }
		50% { transform: scale(1.05); }
		100% { transform: scale(1); }
	}
	
	@keyframes rotate {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}
	
	@keyframes glow {
		0% { opacity: 0.5; }
		100% { opacity: 1; }
	}
	
	@keyframes fadeInOut {
		0% { opacity: 0.8; }
		100% { opacity: 1; }
	}
	
	@keyframes shimmer {
		0% { transform: translateX(-100%); }
		100% { transform: translateX(100%); }
	}
	
	@keyframes backgroundMove {
		0% { transform: translate(0, 0); }
		100% { transform: translate(60rpx, 60rpx); }
	}
	
	@keyframes slideOutLeft {
		0% { opacity: 1; transform: translateX(0); }
		100% { opacity: 0.6; transform: translateX(-10rpx); }
	}
	
	// 图标字体
	@font-face {
		font-family: "iconfont";
		src: url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAALcAAsAAAAABqwAAAKPAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDBgqBFIEUATYCJAMMCwgABCAFhG0HNRvZBcgekiSIQAEFAKAoHuDf7+/cffuS/CRNolGtJtFMJBKJUjRCpVAJhUKieZ7uXgLlQrJQubp0dVY2LFcPzMO8/H+OmS4fz29zuUdRnTpKoyiOUkBjbxrYQBHkDmM3ETyB5xMYNi9Z7qSiqgEWCrQvEFcGlQELI5FSqDc0C2uLeEbVpgfpIZ4G348/lsLCpJaBgycXZQWU/gx+VviM+YwCHUEgnM4BbRMZK4BCnDSmjspFjFUYNi5nrwooqjfwc1nxs8L//5jTaxvYf3iSiKiBbB/YJTPxM0hm8LOSzMbPKn/+3QzDgDywl9wB7Ax0X1Vpnv24vdnXrh1/8ODk/fsnHj48df/+yQf3N967t+HOnfV37669fXvtrVvrbtzYdPPm5tu3t9y5s+3u3R337u28f3/Xw4d7Hj3a9/jxgSdPDj59evjZsyPPnx99+fLYq1fHX78+8ebNybdvT717d/r9+zMfPpz9+PHc58/nv3y58PXrxW/fLn3/fvnHjys/f179/fva37/X//278e/fzf//3/r//7bAXwB/zNsXACDv+79sDvBzcXkA/NuuGQDfcPnbXzCY9X/LHMD3ZlR9qViwKJRVKRjWKwyjAQxLYMXVDkXkbW1o2LCJhKZxCZLGFGRNs7TAV6DqWIWmaR2GLetxfMcEL0VRwrAMBYRuD0i6PSPr9kIL/Buqfr/Q1B0Rhi0j5YQdS+DFKDKMkfqBOlE4ybJGTMrXqO8bxDydIvEFD+QJlqgXdcwJC+QeY/aYIeccUcAULMMZuB9mkUdMkTtizuQ8qe9r6rjvReFEkWEYRuQHyCYUHGnqMaz8/DXS5zMQxqNLJd8VeEA8gaVTXigHcwRXyO0yvblHIY5jCAUwCiyGZsA5hpkQj2QvnUOYxjgeSfkZNUq51ub19RP3AcPAXliRIkeJGo3Kkk/JsZJjKwAAAA==') format('woff2');
	}

	.iconfont {
		font-family: "iconfont" !important;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.icon-check:before {
		content: "\e645";
	}

	.icon-loading:before {
		content: "\e62b";
	}
</style>
