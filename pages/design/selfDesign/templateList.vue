<template>
	<view class="content">
		<!-- 搜索栏 -->
		<view class="search-container">
			<Search v-model="searchKeyword" :placeholder="'搜索模板'" @search="handleSearch"></Search>
		</view>

		<!-- 分类筛选 -->
		<view class="filter-section">
			<view class="filter-row">
				<view 
					class="filter-item" 
					v-for="(item, index) in filters" 
					:key="index" 
					@click="toggleFilter(index)" 
					:class="{'active': activeFilterIndex === index}"
				>
					<text>{{ item.name }}</text>
					<u-icon 
						:name="activeFilterIndex === index ? 'arrow-up' : 'arrow-down'" 
						size="24" 
						:color="activeFilterIndex === index ? '#4CAF50' : '#666'"
					></u-icon>
				</view>
			</view>
			
			<!-- 下拉选项 -->
			<view class="filter-dropdown" v-if="activeFilterIndex !== null">
				<view class="dropdown-options">
					<view 
						class="option-item" 
						v-for="(option, idx) in filters[activeFilterIndex].options" 
						:key="idx"
						@click="selectOption(activeFilterIndex, option)"
						:class="{'selected': selectedOptions[activeFilterIndex] === option}"
					>
						<text>{{ option }}</text>
						<u-icon 
							v-if="selectedOptions[activeFilterIndex] === option" 
							name="checkmark" 
							size="24" 
							color="#4CAF50"
						></u-icon>
					</view>
				</view>
			</view>
			
			<!-- 选中标签展示区域 -->
			<view class="selected-tags" v-if="hasSelectedFilters">
				<view class="tag" v-for="(value, key) in displaySelectedOptions" :key="key" @click="clearOption(key)">
					<text>{{ value }}</text>
					<u-icon name="close" size="22" color="#666"></u-icon>
				</view>
			</view>
		</view>

		<!-- 模板列表 -->
		<view class="template-grid">
			<view class="template-item" v-for="(item, index) in templates" :key="index" @click="handleTemplateClick(item)">
				<image class="template-image" :src="item.image" mode="aspectFill"></image>
				<view class="template-info">
					<text class="template-name">{{ item.name }}</text>
				</view>
			</view>
		</view>
		
		<!-- 遮罩层 - 点击关闭下拉框 -->
		<view class="mask" v-if="activeFilterIndex !== null" @click="closeDropdown"></view>
	</view>
</template>

<script>
	import Search from '@/components/search.vue'
	export default {
		components: {
			Search
		},
		data() {
			return {
				searchKeyword: '',
				activeFilterIndex: null, // 当前激活的过滤器索引
				selectedOptions: {}, // 选中的选项
				filters: [
					{ name: '产品品类', options: ['农产品', '食品', '电子产品', '服装', '化妆品'] },
					{ name: '包装盒型', options: ['常规盒型', '精品礼盒', '翻盖盒型', '天地盖型', '瓶型'] },
					{ name: '包装款式', options: ['简约风格', '传统风格', '现代风格', '复古风格', '奢华风格'] },
					{ name: '包装材质', options: ['瓦楞纸', '白卡纸', '牛皮纸', '特种纸', '塑料'] }
				],
				templates: [
					{
						id: 1,
						name: '鸡蛋高档礼盒包装',
						desc: '适用于高端农产品礼品包装',
						image: '/static/logo.png'
					},
					{
						id: 2,
						name: '物流箱包装设计',
						desc: '适用于农产品物流运输',
						image: '/static/logo.png'
					},
					{
						id: 3,
						name: '手提式鸡蛋包装设计',
						desc: '便携式农产品包装',
						image: '/static/logo.png'
					},
					{
						id: 4,
						name: '抽拉式果蔬包装设计',
						desc: '创新水果包装解决方案',
						image: '/static/logo.png'
					},
					{
						id: 5,
						name: '水果天地盖式包装设计',
						desc: '高端水果礼盒包装',
						image: '/static/logo.png'
					},
					{
						id: 6,
						name: '抽拉式水果包装设计',
						desc: '创意水果包装方案',
						image: '/static/logo.png'
					}
				]
			}
		},
		computed: {
			// 判断是否有选中的筛选条件
			hasSelectedFilters() {
				return Object.keys(this.selectedOptions).length > 0;
			},
			// 用于显示已选择的选项
			displaySelectedOptions() {
				const result = {};
				for (const key in this.selectedOptions) {
					result[key] = this.selectedOptions[key];
				}
				return result;
			}
		},
		methods: {
			handleSearch(keyword) {
				console.log('搜索关键词:', keyword)
				// TODO: 实现搜索逻辑
			},
			// 切换筛选下拉框
			toggleFilter(index) {
				if (this.activeFilterIndex === index) {
					this.activeFilterIndex = null; // 如果点击的是当前打开的筛选器，则关闭
				} else {
					this.activeFilterIndex = index; // 否则打开点击的筛选器
				}
			},
			// 选择筛选选项
			selectOption(filterIndex, option) {
				this.selectedOptions[filterIndex] = option;
				this.activeFilterIndex = null; // 选择后关闭下拉框
				this.filterTemplates(); // 应用筛选
			},
			// 清除某个筛选选项
			clearOption(filterIndex) {
				delete this.selectedOptions[filterIndex];
				this.filterTemplates(); // 应用筛选
			},
			// 关闭下拉框
			closeDropdown() {
				this.activeFilterIndex = null;
			},
			// 应用筛选逻辑
			filterTemplates() {
				console.log('应用筛选:', this.selectedOptions);
				// TODO: 实际筛选逻辑
			},
			handleTemplateClick(template) {
				// TODO: 实现模板选择逻辑
				uni.navigateTo({
					url: '/pages/design/selfDesign/Details'
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		min-height: 100vh;
		background: linear-gradient(to bottom, #f8f9fa, #e9ecef);
		padding-bottom: 30rpx;
		position: relative;
	}

	.search-container {
		width: 92%;
		margin: 20rpx auto;
		background: #ffffff;
		border-radius: 16rpx;
		box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
		transition: all 0.3s ease;
	}

	.filter-section {
		width: 100%;
		background: #ffffff;
		padding: 20rpx 0;
		margin-bottom: 20rpx;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
		position: relative;
		z-index: 10;
		border-radius: 0 0 16rpx 16rpx;

		.filter-row {
			display: flex;
			justify-content: space-around;
			align-items: center;
			padding: 0 20rpx;
		}

		.filter-item {
			display: flex;
			align-items: center;
			padding: 16rpx 24rpx;
			font-size: 28rpx;
			color: #2c3e50;
			border-radius: 12rpx;
			transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
			position: relative;
			cursor: pointer;

			&:hover {
				background-color: rgba(76, 175, 80, 0.08);
			}

			&:active {
				transform: scale(0.98);
				background-color: rgba(76, 175, 80, 0.12);
			}
			
			&.active {
				color: #4CAF50;
				background-color: rgba(76, 175, 80, 0.1);
				font-weight: 500;
				box-shadow: 0 2rpx 8rpx rgba(76, 175, 80, 0.2);
			}

			text {
				margin-right: 12rpx;
			}
		}
		
		.filter-dropdown {
			position: absolute;
			width: 100%;
			background: #ffffff;
			box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.12);
			border-radius: 16rpx;
			z-index: 11;
			max-height: 500rpx;
			overflow-y: auto;
			transform-origin: top center;
			animation: dropdownFade 0.2s cubic-bezier(0.4, 0, 0.2, 1);
			
			.dropdown-options {
				padding: 10rpx 0;
				
				.option-item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 24rpx 40rpx;
					font-size: 28rpx;
					color: #333;
					transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
					
					&:hover {
						background-color: rgba(76, 175, 80, 0.05);
					}
					
					&:active, &.selected {
						background-color: rgba(76, 175, 80, 0.1);
					}
					
					&.selected {
						color: #4CAF50;
						font-weight: 500;
					}
				}
			}
		}
		
		.selected-tags {
			display: flex;
			flex-wrap: wrap;
			padding: 20rpx 30rpx 10rpx;
			gap: 16rpx;
			
			.tag {
				display: flex;
				align-items: center;
				background-color: rgba(76, 175, 80, 0.08);
				padding: 10rpx 20rpx;
				border-radius: 30rpx;
				border: 1px solid rgba(76, 175, 80, 0.2);
				transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
				
				&:active {
					transform: scale(0.95);
				}
				
				text {
					color: #4CAF50;
					font-size: 24rpx;
					margin-right: 8rpx;
					font-weight: 500;
				}
			}
		}
	}

	.template-grid {
		width: 92%;
		margin: 0 auto;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 24rpx;
		padding: 10rpx;
		position: relative;
		z-index: 1;

		.template-item {
			background: #ffffff;
			border-radius: 16rpx;
			overflow: hidden;
			box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
			transition: all 0.3s ease;

			&:active {
				transform: scale(0.98);
				box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.12);
			}

			.template-image {
				width: 100%;
				height: 300rpx;
				background-color: #f8f8f8;
				transition: opacity 0.3s ease;

				&.loading {
					opacity: 0.6;
				}
			}

			.template-info {
				padding: 20rpx;

				.template-name {
					font-size: 30rpx;
					font-weight: 600;
					color: #2c3e50;
					margin-bottom: 10rpx;
				}

				.template-desc {
					font-size: 26rpx;
					color: #666;
					line-height: 1.4;
				}
			}
		}
	}
	
	// 遮罩层
	.mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.3);
		z-index: 9;
		animation: maskFade 0.2s ease-in-out;
	}

	@keyframes maskFade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>


