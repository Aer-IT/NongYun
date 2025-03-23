<template>
	<view class="second-step-container">
		<!-- 顶部区域 -->
		<view class="header-section">
			<view class="avatar-section">
				<image src="/static/logo.png" mode="aspectFit" class="avatar"></image>
			</view>
			<view class="title-section">
				<text class="title">第二步：请填写您的品牌信息</text>
				<text class="subtitle">信息可在生成的界面调整</text>
			</view>
		</view>
		
		<!-- 输入区域 -->
		<view class="input-section">
			<!-- 商品名称输入 -->
			<view class="input-group">
				<text class="input-label">商品名称</text>
				<input
					v-model="productName"
					placeholder="例如：温县铁棍山药"
					class="custom-input"
					placeholder-class="input-placeholder"
				/>
			</view>
			
			<!-- 商品卖点输入 -->
			<view class="input-group">
				<text class="input-label">商品卖点</text>
				<input
					v-model="productSellingPoint"
					placeholder="例如：千礼桃一，六年地力，一生健康"
					class="custom-input"
					placeholder-class="input-placeholder"
				/>
			</view>
			
			<!-- LOGO上传 -->
			<view class="input-group">
				<text class="input-label">商品LOGO</text>
				<view class="upload-section">
					<text class="upload-tip">建议上传高清透明LOGO</text>
					<text class="upload-status">（暂无可不上传）</text>
					<view class="upload-btn" @click="handleUpload">
						<u-icon name="download" size="32" color="#ffffff"></u-icon>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 下一步按钮 -->
		<view class="button-section">
			<u-button
				text="下一步"
				type="primary"
				shape="circle"
				:disabled="!canProceed"
				:custom-style="{
					background: 'linear-gradient(45deg, #00b894, #00cec9)',
					width: '80%',
					height: '88rpx',
					fontSize: '32rpx',
					fontWeight: '500',
					boxShadow: '0 8rpx 24rpx rgba(0, 184, 148, 0.3)'
				}"
				@click="handleNextStep"
			></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				productName: '',
				productSellingPoint: '',
				logoUrl: ''
			};
		},
		computed: {
			canProceed() {
				return this.productName.trim() && this.productSellingPoint.trim();
			}
		},
		methods: {
			handleUpload() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						this.logoUrl = res.tempFilePaths[0];
					}
				});
			},
			handleNextStep() {
				if (!this.canProceed) return;
				
				uni.navigateTo({
					url: `/pages/design/autoDesign/thirdStep?product=${encodeURIComponent(this.productName)}&sellingPoint=${encodeURIComponent(this.productSellingPoint)}&logo=${encodeURIComponent(this.logoUrl)}`
				});
			}
		}
	}
</script>

<style lang="scss">
	.second-step-container {
		min-height: 100vh;
		background: linear-gradient(135deg, #1a1a1a, #2d3436);
		padding: 40rpx;
		display: flex;
		flex-direction: column;
		
		.header-section {
			margin-bottom: 60rpx;
			
			.avatar-section {
				display: flex;
				justify-content: center;
				margin-bottom: 30rpx;
				
				.avatar {
					width: 120rpx;
					height: 120rpx;
					border-radius: 60rpx;
					box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.2);
				}
			}
			
			.title-section {
				text-align: center;
				
				.title {
					display: block;
					color: #ffffff;
					font-size: 36rpx;
					font-weight: 500;
					margin-bottom: 16rpx;
				}
				
				.subtitle {
					display: block;
					color: rgba(255, 255, 255, 0.6);
					font-size: 28rpx;
				}
			}
		}
		
		.input-section {
			flex: 1;
			
			.input-group {
				margin-bottom: 40rpx;
				
				.input-label {
					display: block;
					color: #ffffff;
					font-size: 28rpx;
					margin-bottom: 20rpx;
					font-weight: 500;
				}
				
				.custom-input {
					width: 100%;
					height: 80rpx;
					background: rgba(255, 255, 255, 0.1);
					border-radius: 40rpx;
					padding: 0 30rpx;
					color: #ffffff;
					font-size: 28rpx;
					box-sizing: border-box;
				}
				
				.input-placeholder {
					color: rgba(255, 255, 255, 0.6);
					font-size: 28rpx;
				}
				
				.upload-section {
					background: rgba(255, 255, 255, 0.1);
					border-radius: 40rpx;
					padding: 30rpx;
					text-align: center;
					
					.upload-tip {
						display: block;
						color: rgba(255, 255, 255, 0.8);
						font-size: 28rpx;
						margin-bottom: 8rpx;
					}
					
					.upload-status {
						display: block;
						color: rgba(255, 255, 255, 0.4);
						font-size: 24rpx;
						margin-bottom: 20rpx;
					}
					
					.upload-btn {
						display: inline-flex;
						align-items: center;
						background: rgba(0, 184, 148, 0.2);
						padding: 16rpx 40rpx;
						border-radius: 40rpx;
						border: 2rpx solid rgba(0, 184, 148, 0.4);
						transition: all 0.3s ease;
						
						text {
							color: #ffffff;
							font-size: 28rpx;
							margin-left: 12rpx;
						}
						
						&:active {
							transform: scale(0.98);
						}
					}
				}
			}
		}
		
		.button-section {
			margin-top: auto;
			padding-bottom: 40rpx;
			display: flex;
			justify-content: center;
		}
	}
</style>
