<template>
	<view class="third-step-container">
		<!-- 顶部区域 -->
		<view class="header-section">
			<view class="avatar-section">
				<image src="/static/logo.png" mode="aspectFit" class="avatar"></image>
			</view>
			<view class="title-section">
				<text class="title">第三步：请选择推荐的包装盒型</text>
				<text class="subtitle">包装尺寸可在下方进行选择</text>
			</view>
		</view>
		
		<!-- 包装盒展示区域 -->
		<view class="box-showcase">
			<swiper 
				class="box-swiper"
				:indicator-dots="true"
				:autoplay="false"
				:interval="3000"
				:duration="500"
				:circular="true"
				indicator-active-color="#00b894"
				indicator-color="rgba(255, 255, 255, 0.3)"
			>
				<swiper-item v-for="(page, pageIndex) in boxPages" :key="pageIndex">
					<view class="box-grid">
						<view 
							class="box-item"
							v-for="(box) in page" 
							:key="box.id"
							:class="{ active: selectedBox === box.id }"
							@click="handleBoxSelect(box.id)"
						>
							<image src="/static/logo.png" mode="aspectFit" class="box-image"></image>
							<text class="box-name">{{ box.name }}</text>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		
		<!-- 包装尺寸选择 -->
		<view class="size-section">
			<text class="section-title">包装尺寸</text>
			<scroll-view scroll-x class="size-scroll">
				<view 
					class="size-item"
					v-for="(size, index) in packageSizes" 
					:key="index"
					:class="{ active: selectedSize === size.id }"
					@click="handleSizeSelect(size.id)"
				>
					<text>{{ size.name }}</text>
				</view>
			</scroll-view>
		</view>
		
		<!-- 下一步按钮 -->
		<view class="button-section">
			<u-button
				text="下一步"
				type="primary"
				shape="circle"
				:disabled="!canProceed"
				:custom-style="{
					background: canProceed ? 'linear-gradient(45deg, #00b894, #00cec9)' : 'rgba(255, 255, 255, 0.1)',
					width: '85%',
					height: '88rpx',
					fontSize: '32rpx',
					fontWeight: '600',
					boxShadow: canProceed ? '0 8rpx 24rpx rgba(0, 184, 148, 0.4)' : 'none',
					border: 'none'
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
				selectedBox: '',
				selectedSize: '',
				boxTypes: [
					{
						id: 'box1',
						name: '天地盖礼盒'
					},
					{
						id: 'box2',
						name: '翻盖礼盒'
					},
					{
						id: 'box3',
						name: '抽屉式礼盒'
					},
					{
						id: 'box4',
						name: '手提式礼盒'
					},
					{
						id: 'box5',
						name: '双开门礼盒'
					},
					{
						id: 'box6',
						name: '折叠式礼盒'
					},
					{
						id: 'box7',
						name: '磁吸式礼盒'
					},
					{
						id: 'box8',
						name: '抽拉式礼盒'
					}
				],
				packageSizes: [
					{
						id: 'size1',
						name: '1斤装'
					},
					{
						id: 'size2',
						name: '2斤装'
					},
					{
						id: 'size3',
						name: '5斤装'
					},
					{
						id: 'size4',
						name: '10斤装'
					},
					{
						id: 'size5',
						name: '15斤装'
					},
					{
						id: 'size6',
						name: '20斤装'
					}
				]
			};
		},
		computed: {
			canProceed() {
				return this.selectedBox && this.selectedSize;
			},
			boxPages() {
				const pages = [];
				for (let i = 0; i < this.boxTypes.length; i += 4) {
					pages.push(this.boxTypes.slice(i, i + 4));
				}
				return pages;
			}
		},
		methods: {
			handleBoxSelect(boxId) {
				this.selectedBox = boxId;
			},
			handleSizeSelect(sizeId) {
				this.selectedSize = sizeId;
			},
			handleNextStep() {
				if (!this.canProceed) return;
				
				uni.navigateTo({
					url: `/pages/design/autoDesign/load?box=${encodeURIComponent(this.selectedBox)}&size=${encodeURIComponent(this.selectedSize)}`
				});
			}
		}
	}
</script>

<style lang="scss">
	.third-step-container {
		min-height: 100vh;
		background: linear-gradient(135deg, #1a1a1a, #2d3436);
		padding: 30rpx 20rpx;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		
		.header-section {
			margin-bottom: 30rpx;
			
			.avatar-section {
				display: flex;
				justify-content: center;
				margin-bottom: 20rpx;
				
				.avatar {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50rpx;
					box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.3);
					border: 3rpx solid rgba(0, 184, 148, 0.3);
				}
			}
			
			.title-section {
				text-align: center;
				
				.title {
					display: block;
					color: #ffffff;
					font-size: 36rpx;
					font-weight: 600;
					margin-bottom: 12rpx;
					text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.3);
				}
				
				.subtitle {
					display: block;
					color: rgba(255, 255, 255, 0.7);
					font-size: 26rpx;
				}
			}
		}
		
		.box-showcase {
			flex: 0 0 auto;
			margin-bottom: 30rpx;
			height: 700rpx;
			
			.box-swiper {
				height: 100%;
				
				.box-grid {
					height: 100%;
					display: grid;
					grid-template-columns: repeat(2, 1fr);
					grid-template-rows: repeat(2, 1fr);
					gap: 20rpx;
					padding: 20rpx;
					box-sizing: border-box;
					
					.box-item {
						background: rgba(255, 255, 255, 0.08);
						border-radius: 16rpx;
						padding: 20rpx;
						text-align: center;
						transition: all 0.3s ease;
						border: 2rpx solid transparent;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						height: 100%;
						position: relative;
						overflow: hidden;
						
						&::after {
							content: '';
							position: absolute;
							bottom: 0;
							left: 0;
							right: 0;
							height: 60rpx;
							background: linear-gradient(to top, rgba(0, 0, 0, 0.2), transparent);
							opacity: 0.5;
							border-bottom-left-radius: 16rpx;
							border-bottom-right-radius: 16rpx;
						}
						
						&.active {
							background: rgba(0, 184, 148, 0.15);
							border-color: #00b894;
							box-shadow: 0 0 20rpx rgba(0, 184, 148, 0.3);
							transform: translateY(-3rpx);
						}
						
						.box-image {
							width: 120rpx;
							height: 120rpx;
							margin-bottom: 20rpx;
							border-radius: 10rpx;
							object-fit: contain;
						}
						
						.box-name {
							color: #ffffff;
							font-size: 26rpx;
							font-weight: 500;
							line-height: 1.3;
							position: relative;
							z-index: 1;
							text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.3);
						}
						
						&:active {
							transform: scale(0.97);
						}
					}
				}
			}
		}
		
		.size-section {
			margin: 20rpx 0;
			
			.section-title {
				display: block;
				color: #ffffff;
				font-size: 30rpx;
				font-weight: 500;
				margin-bottom: 16rpx;
				padding-left: 10rpx;
			}
			
			.size-scroll {
				white-space: nowrap;
				padding: 5rpx 0;
				
				.size-item {
					display: inline-block;
					background: rgba(255, 255, 255, 0.08);
					padding: 16rpx 30rpx;
					border-radius: 40rpx;
					margin-right: 16rpx;
					margin-top: 10rpx;
					transition: all 0.3s ease;
					border: 2rpx solid transparent;
					box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
					
					&:last-child {
						margin-right: 0;
					}
					
					&.active {
						background: rgba(0, 184, 148, 0.15);
						border-color: #00b894;
						box-shadow: 0 4rpx 16rpx rgba(0, 184, 148, 0.3);
						transform: translateY(-2rpx);
					}
					
					text {
						color: #ffffff;
						font-size: 26rpx;
						font-weight: 500;
					}
					
					&:active {
						transform: scale(0.95);
					}
				}
			}
		}
		
		.button-section {
			margin-top: 20rpx;
			padding-bottom: 30rpx;
			display: flex;
			justify-content: center;
		}
	}
</style>
