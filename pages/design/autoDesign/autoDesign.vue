<template>
	<view class="auto-design-container">
		<!-- Logo -->
		<view class="logo-section">
			<image src="/static/logo.png" mode="aspectFit" class="logo"></image>
		</view>
		
		<!-- 顶部提示 -->
		<view class="header">
			<text class="title">第一步：请选择或输入您经营的商品</text>
			<text class="subtitle">将为您推荐合适的包装设计</text>
		</view>
		
		<!-- 商品选项网格 -->
		<view class="product-grid">
			<view 
				class="product-item" 
				v-for="(item, index) in productList" 
				:key="index"
				:class="{ active: selectedProduct === item }"
				@click="handleProductSelect(item)"
			>
				<text>{{ item }}</text>
			</view>
		</view>
		
		<!-- 输入提示 -->
		<view class="input-section">
			<text class="input-tip">输入您的产品种类，例如：石榴</text>
			<input
				v-model="customProduct"
				placeholder="请输入产品名称"
				class="custom-input"
				placeholder-class="input-placeholder"
				@focus="handleInputFocus"
				@blur="handleInputBlur"
			/>
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
				selectedProduct: '',
				customProduct: '',
				productList: [
					'鸡蛋', '山药', '苹果', '香蕉',
					'橙子', '草莓', '葡萄', '其他'
				]
			};
		},
		computed: {
			canProceed() {
				return this.selectedProduct === '其他' ? this.customProduct.trim() : this.selectedProduct;
			}
		},
		methods: {
			handleProductSelect(product) {
				this.selectedProduct = product;
				if (product !== '其他') {
					this.customProduct = '';
				}
			},
			handleInputFocus() {
				this.selectedProduct = '其他';
			},
			handleInputBlur() {
				if (!this.customProduct.trim()) {
					this.selectedProduct = '';
				}
			},
			handleNextStep() {
				if (!this.canProceed) return;
				
				const product = this.selectedProduct === '其他' ? this.customProduct : this.selectedProduct;
				uni.navigateTo({
					url: `/pages/design/autoDesign/secondStep?product=${encodeURIComponent(product)}`
				});
			}
		}
	}
</script>

<style lang="scss">
	.auto-design-container {
		min-height: 100vh;
		background: linear-gradient(135deg, #1a1a1a, #2d3436);
		padding: 40rpx;
		display: flex;
		flex-direction: column;
		
		.logo-section {
			display: flex;
			justify-content: center;
			margin-bottom: 40rpx;
			padding-top: 20rpx;
			
			.logo {
				width: 160rpx;
				height: 160rpx;
				border-radius: 20rpx;
				box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.2);
			}
		}
		
		.header {
			margin-bottom: 50rpx;
			
			.title {
				display: block;
				color: #ffffff;
				font-size: 36rpx;
				font-weight: 500;
				margin-bottom: 16rpx;
				text-align: center;
			}
			
			.subtitle {
				display: block;
				color: rgba(255, 255, 255, 0.8);
				font-size: 28rpx;
				text-align: center;
			}
		}
		
		.product-grid {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 24rpx;
			margin-bottom: 50rpx;
			
			.product-item {
				height: 140rpx;
				background: rgba(255, 255, 255, 0.1);
				border-radius: 20rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				transition: all 0.3s ease;
				border: 2rpx solid transparent;
				
				text {
					color: #ffffff;
					font-size: 32rpx;
					font-weight: 500;
				}
				
				&.active {
					background: rgba(0, 184, 148, 0.2);
					border-color: rgba(0, 184, 148, 0.4);
					box-shadow: 0 0 20rpx rgba(0, 184, 148, 0.2);
				}
				
				&:active {
					transform: scale(0.98);
				}
			}
		}
		
		.input-section {
			margin-bottom: 50rpx;
			
			.input-tip {
				display: block;
				color: rgba(255, 255, 255, 0.8);
				font-size: 28rpx;
				margin-bottom: 20rpx;
				text-align: center;
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
		}
		
		.button-section {
			margin-top: auto;
			padding-bottom: 40rpx;
			display: flex;
			justify-content: center;
		}
	}
</style>
