<template>
	<view>
		<!-- 顶部 -->
		<view class="top">
			<u-icon 
				name="search" 
				size="32"
				color="#ffffff"
				class="search-icon"
				@click="doSearch"
			></u-icon>
			<view class="title">
				<text :class="{ active: currentTab === 'recommend' }" @click="switchTab('recommend')">推荐</text>
				<text :class="{ active: currentTab === 'consult' }" @click="switchTab('consult')">咨询</text>
			</view>
		</view>
		<!-- 顶部占位 -->
		<view style="height: 88rpx;"></view>
		<!-- 内容区 -->
		<Recommend v-if="currentTab === 'recommend'"></Recommend>
		<Consult v-else></Consult>
		
	</view>
</template>

<script>
import Recommend from './components/recommend/recommend.vue'
import Consult from './components/consult/consult.vue'

export default {
	components: {
		Recommend,
		Consult
	},
		data() {
			return {
				currentTab: '' // 当前选中的标签
			};
		},
		methods:{
			doSearch(){
				console.log('搜索')
				uni.navigateTo({
					url: '/pages/searchPage/searchPage?type=' + this.currentTab
				});
			},
			switchTab(tab) {
				this.currentTab = tab;
				// TODO: 根据tab切换内容
				console.log('切换到:', tab);
			}
		},
		onShow(e){
			// 检查e是否存在，避免尝试访问undefined的属性
			if (e && e.tab) {
				this.currentTab = e.tab;
			} else {
				// 检查全局变量中是否有目标标签
				const app = getApp();
				if (app.globalData && app.globalData.targetTab) {
					this.currentTab = app.globalData.targetTab;
					// 使用后清除，避免影响下次进入
					app.globalData.targetTab = null;
				} else if (!this.currentTab) {
					// 如果没有指定标签，则默认选择'recommend'
					this.currentTab = 'recommend';
				}
			}
			console.log('当前标签:', this.currentTab);
		}
	}
</script>

<style lang="scss">
	.top {
		background: linear-gradient(to right, rgb(102, 207, 200), rgb(122, 227, 220));
		display: flex;
		width: 100%;
		height: 88rpx;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
		padding: 0 32rpx;
		box-shadow: 0 2rpx 12rpx rgba(102, 207, 200, 0.15);
		
		.search-icon {
			height: 88rpx;
			display: flex;
			align-items: center;
			background: transparent;
			padding: 12rpx;
			transition: all 0.3s ease;
			
			&:active {
				transform: scale(0.9);
				opacity: 0.8;
			}
		}
		
		.title {
			flex: 1;
			display: flex;
			justify-content: center;
			gap: 60rpx;
			font-size: 32rpx;
			color: #ffffff;
			margin-right: 88rpx; // 补偿搜索图标的宽度，使标题居中
			
			text {
				margin: auto 0;
				position: relative;
				padding: 8rpx 12rpx;
				font-weight: 500;
				transition: all 0.3s ease;
				
				&:active {
					opacity: 0.8;
				}
				
				&::after {
					content: '';
					position: absolute;
					bottom: -4rpx;
					left: 50%;
					transform: translateX(-50%);
					width: 0;
					height: 4rpx;
					background: #ffffff;
					transition: all 0.3s ease;
				}
				
				&.active {
					font-weight: bold;
					
					&::after {
						width: 80%;
					}
				}
			}
		}
	}
</style>
