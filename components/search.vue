<template>
		<!-- 搜索栏 -->
			<view class="search-section">
			<view class="search-box">
				<input
					type="text"
					:value="value"
					:placeholder="placeholder"
					confirm-type="search"
					@input="onInput"
					@confirm="doSearch"
					class="search-input"
				/>
				<view class="icon-group">
					<u-icon
						v-if="value"
						name="close"
						size="32"
						color="#909399"
						@click="clearSearch"
						class="clear-icon"
					></u-icon>
					<u-icon 
						name="search" 
						size="36"
						color="#909399"
						class="search-icon"
						@click="doSearch"
					></u-icon>
				</view>
			</view>
		</view>
</template>

<script>
	export default {
		name:"search",
		model: {
			prop: 'value',
			event: 'input'
		},
		props:{
			placeholder:{
				type:String,
				default:''
			},
			value:{
				type:String,
				default:''
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			onInput(e) {
				this.$emit('input', e.detail.value);
			},
			clearSearch(){
				this.$emit('input', '');
			},
			// 执行搜索
			doSearch() {
				if (!this.value.trim()) {
					uni.showToast({
						title: '请输入搜索内容',
						icon: 'none'
					});
					return;
				}
				
				console.log('执行搜索:', this.value);
				this.$emit('search', this.value);
				// TODO: 这里添加实际的搜索逻辑
			},
		}
	}
</script>

<style lang="scss">
	.search-section {
		width: 90%;
		margin: 0 auto;
		position: relative;
		background: #ffffff;
		padding: 16rpx;
		transition: all 0.3s ease;
		
		&:hover {
			box-shadow: 0 8rpx 32rpx rgba(102, 207, 200, 0.12);
			border-color: rgba(102, 207, 200, 0.2);
		}
		
		.search-box {
			width: 100%;
			display: flex;
			align-items: center;
			background: linear-gradient(to right, #f8f8f8, #f5f7fa);
			border-radius: 36rpx;
			padding: 16rpx 10rpx;
			transition: all 0.3s ease;
			
			&:focus-within {
				background: #ffffff;
				box-shadow: inset 0 2rpx 8rpx rgba(102, 207, 200, 0.08);
			}
			
			.search-input {
				flex: 1;
				font-size: 28rpx;
				color: #2c3e50;
				height: 40rpx;
				line-height: 40rpx;
				padding: 0 20rpx;
				letter-spacing: 1rpx;
				
				&::placeholder {
					color: #95a5a6;
					font-size: 26rpx;
					font-weight: 300;
				}
			}
			
			.icon-group {
				display: flex;
				align-items: center;
				width: 120rpx;
				justify-content: flex-end;
				height: 48rpx;
				position: relative;
				margin-left: 12rpx;
				padding: 0 8rpx;
				
				&::before {
					content: '';
					position: absolute;
					left: -12rpx;
					top: 50%;
					transform: translateY(-50%);
					height: 28rpx;
					width: 2rpx;
					background: rgba(102, 207, 200, 0.15);
				}
				
				.clear-icon {
					opacity: 0.75;
					transition: all 0.2s ease;
					padding: 6rpx;
					position: absolute;
					right: 52rpx;
					
					&:active {
						opacity: 0.5;
						transform: scale(0.92);
					}
				}
				
				.search-icon {
					opacity: 0.85;
					transition: all 0.2s ease;
					padding: 6rpx;
					
					&:active {
						opacity: 0.6;
						transform: scale(0.92);
					}
					
					&:hover {
						opacity: 1;
					}
				}
			}
		}
	}
</style>