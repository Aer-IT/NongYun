<template>
	<view class="container">
		<!-- 顶部包装展开图预览区域 -->
		<view class="preview-area" :style="{'background-color': designData.backgroundColor}">
			<image class="package-image" src="/static/box/image1.png" mode="aspectFit"></image>
			
			<!-- 添加的图案 -->
			<view 
				v-for="(item, index) in addedPatterns" 
				:key="index" 
				class="added-pattern"
				:style="{
					left: item.x + 'px',
					top: item.y + 'px',
					transform: `rotate(${item.rotation}deg) scale(${item.scale})`
				}"
				@touchstart="startDrag(index, $event)"
				@touchmove="onDrag($event)"
				@touchend="endDrag"
			>
				<image :src="item.src" mode="aspectFit"></image>
				<!-- 删除按钮 -->
				<view class="delete-btn" @click.stop="removePattern(index)">
					<u-icon name="close" color="#fff" size="20"></u-icon>
				</view>
			</view>
			
			<!-- 文字元素 -->
			<view 
				v-for="(text, index) in addedTexts" 
				:key="'text-'+index" 
				class="text-element"
				:style="{
					left: text.x + 'px',
					top: text.y + 'px',
					color: text.color,
					fontSize: text.size + 'rpx',
					fontWeight: text.bold ? 'bold' : 'normal',
					fontStyle: text.italic ? 'italic' : 'normal'
				}"
				@touchstart="startDragText(index, $event)"
				@touchmove="onDragText($event)"
				@touchend="endDragText"
			>
				{{ text.content }}
				<!-- 删除按钮 -->
				<view class="delete-btn" @click.stop="removeText(index)">
					<u-icon name="close" color="#fff" size="20"></u-icon>
				</view>
			</view>
		</view>
		
		<!-- 操作指南 - 黑色气泡提示 -->
		<view class="guide-area" v-if="showGuide">
			<text class="guide-text">拖动图案到设计区域，双指缩放调整大小</text>
			<view class="close-guide" @click="closeGuide">
				<u-icon name="close" size="24" color="#fff"></u-icon>
			</view>
		</view>
		
		<!-- 中间区域 - 根据当前Tab显示内容 -->
		<view v-if="currentTab === 'pattern'" class="content-section">
			<view class="section-header">
				<text class="section-title">选择图案添加到设计</text>
			</view>
			
			<!-- 图案素材 - 网格布局 -->
			<view class="materials-grid">
				<view 
					class="material-item" 
					v-for="(pattern, index) in patternList" 
					:key="index"
					@click="addPattern(pattern.src)"
				>
					<image :src="pattern.src" mode="aspectFit"></image>
				</view>
			</view>
		</view>
		
		<view v-if="currentTab === 'color'" class="content-section">
			<view class="section-header">
				<text class="section-title">选择包装底色</text>
			</view>
			
			<!-- 颜色选择 -->
			<view class="color-grid">
				<view 
					class="color-item" 
					v-for="(color, index) in colorList" 
					:key="index"
					:style="{'background-color': color.value}"
					:class="{'active': designData.backgroundColor === color.value}"
					@click="selectBackgroundColor(color.value)"
				>
					<u-icon v-if="designData.backgroundColor === color.value" name="checkmark" color="#fff" size="24"></u-icon>
				</view>
			</view>
		</view>
		
		<view v-if="currentTab === 'text'" class="content-section">
			<view class="section-header">
				<text class="section-title">添加文字到设计</text>
			</view>
			
			<!-- 文字编辑 -->
			<view class="text-edit-area">
				<input 
					type="text" 
					v-model="newText.content" 
					placeholder="输入文字内容" 
					class="text-input"
				/>
				
				<view class="text-options">
					<view class="option-group">
						<text class="option-label">文字颜色</text>
						<view class="color-options">
							<view 
								v-for="(color, index) in textColors" 
								:key="index"
								class="text-color-item"
								:style="{'background-color': color}"
								:class="{'active': newText.color === color}"
								@click="newText.color = color"
							>
								<u-icon v-if="newText.color === color" name="checkmark" color="#fff" size="18"></u-icon>
							</view>
						</view>
					</view>
					
					<view class="option-group">
						<text class="option-label">文字大小</text>
						<view class="size-control">
							<view class="control-btn" @click="decreaseTextSize">
								<u-icon name="minus" size="28" color="#666"></u-icon>
							</view>
							<text class="size-value">{{ newText.size }}</text>
							<view class="control-btn" @click="increaseTextSize">
								<u-icon name="plus" size="28" color="#666"></u-icon>
							</view>
						</view>
					</view>
					
					<view class="option-group">
						<text class="option-label">文字样式</text>
						<view class="style-controls">
							<view 
								class="style-btn" 
								:class="{'active': newText.bold}"
								@click="newText.bold = !newText.bold"
							>
								<u-icon name="text-bold" size="28" :color="newText.bold ? '#4CAF50' : '#666'"></u-icon>
								<text :class="{'active-text': newText.bold}">粗体</text>
							</view>
							<view 
								class="style-btn" 
								:class="{'active': newText.italic}"
								@click="newText.italic = !newText.italic"
							>
								<u-icon name="text-italic" size="28" :color="newText.italic ? '#4CAF50' : '#666'"></u-icon>
								<text :class="{'active-text': newText.italic}">斜体</text>
							</view>
						</view>
					</view>
				</view>
				
				<button class="add-text-btn" @click="addText">添加文字</button>
			</view>
		</view>
		
		<!-- 底部导航菜单 -->
		<view class="bottom-nav">
			<view 
				class="nav-item" 
				:class="{'active': currentTab === 'pattern'}"
				@click="currentTab = 'pattern'"
			>
				<text>图案</text>
			</view>
			
			<view 
				class="nav-item" 
				:class="{'active': currentTab === 'color'}"
				@click="currentTab = 'color'"
			>
				<text>底色</text>
			</view>
			
			<view 
				class="nav-item" 
				:class="{'active': currentTab === 'text'}"
				@click="currentTab = 'text'"
			>
				<text>文字</text>
			</view>
			
			<view class="nav-item save-btn" @click="saveDesign">
				<text>完成</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentTab: 'pattern',
				showGuide: true,
				
				// 设计数据
				designData: {
					backgroundColor: '#ffffff',
					patterns: [],
					texts: []
				},
				
				// 图案相关
				patternList: [
					{ src: '/static/logo.png' },
					{ src: '/static/logo.png' },
					{ src: '/static/logo.png' },
					{ src: '/static/logo.png' },
					{ src: '/static/logo.png' },
					{ src: '/static/logo.png' },
					{ src: '/static/logo.png' },
					{ src: '/static/logo.png' }
				],
				addedPatterns: [],
				draggingPattern: null,
				dragStartX: 0,
				dragStartY: 0,
				
				// 颜色相关
				colorList: [
					{ name: '白色', value: '#ffffff' },
					{ name: '红色', value: '#f44336' },
					{ name: '蓝色', value: '#2196f3' },
					{ name: '绿色', value: '#4caf50' },
					{ name: '黄色', value: '#ffeb3b' },
					{ name: '紫色', value: '#9c27b0' },
					{ name: '橙色', value: '#ff9800' },
					{ name: '粉色', value: '#e91e63' }
				],
				
				// 文本相关
				newText: {
					content: '',
					color: '#000000',
					size: 40,
					bold: false,
					italic: false,
					x: 100,
					y: 100
				},
				textColors: ['#000000', '#ffffff', '#f44336', '#2196f3', '#4caf50', '#ffeb3b', '#9c27b0', '#ff9800'],
				addedTexts: [],
				draggingText: null
			};
		},
		mounted() {
			// 指南在5秒后自动关闭
			setTimeout(() => {
				this.showGuide = false;
			}, 5000);
		},
		methods: {
			// 图案相关方法
			addPattern(src) {
				// 添加图案到预览区中央位置
				// 使用固定值或通过uni.getSystemInfoSync获取屏幕宽高
				const systemInfo = uni.getSystemInfoSync();
				const previewWidth = systemInfo.windowWidth;
				const previewHeight = previewWidth * 0.4; // 预览区高度约为屏幕宽度的40%
				
				this.addedPatterns.push({
					src: src,
					x: previewWidth / 2 - 50,  // 居中
					y: previewHeight / 2 - 50, // 居中
					rotation: 0,
					scale: 1
				});
				
				// 添加后短暂显示指南
				this.showGuide = true;
				setTimeout(() => {
					this.showGuide = false;
				}, 5000);
			},
			
			startDrag(index, event) {
				this.draggingPattern = index;
				// 记录触摸起始点
				const touch = event.touches[0];
				this.dragStartX = touch.clientX - this.addedPatterns[index].x;
				this.dragStartY = touch.clientY - this.addedPatterns[index].y;
			},
			
			onDrag(event) {
				if (this.draggingPattern !== null) {
					const touch = event.touches[0];
					// 更新图案位置
					
					// 获取系统信息来确定预览区域边界
					const systemInfo = uni.getSystemInfoSync();
					const previewWidth = systemInfo.windowWidth;
					const previewHeight = previewWidth * 0.4; // 预览区高度约为屏幕宽度的40%
					
					// 计算新位置，但限制在预览区域内
					let newX = touch.clientX - this.dragStartX;
					let newY = touch.clientY - this.dragStartY;
					
					// 限制图案不超出边界
					newX = Math.max(0, Math.min(previewWidth - 100, newX));
					newY = Math.max(0, Math.min(previewHeight - 100, newY));
					
					this.addedPatterns[this.draggingPattern].x = newX;
					this.addedPatterns[this.draggingPattern].y = newY;
				}
			},
			
			endDrag() {
				this.draggingPattern = null;
			},
			
			removePattern(index) {
				this.addedPatterns.splice(index, 1);
			},
			
			// 颜色相关方法
			selectBackgroundColor(color) {
				this.designData.backgroundColor = color;
			},
			
			// 文字相关方法
			addText() {
				if (this.newText.content.trim() === '') {
					uni.showToast({
						title: '请输入文字内容',
						icon: 'none'
					});
					return;
				}
				
				// 获取系统信息来确定预览区域中心位置
				const systemInfo = uni.getSystemInfoSync();
				const previewWidth = systemInfo.windowWidth;
				const previewHeight = previewWidth * 0.4; // 预览区高度约为屏幕宽度的40%
				
				this.addedTexts.push({
					...this.newText,
					x: previewWidth / 2 - 50,  // 居中
					y: previewHeight / 2 - 50   // 居中
				});
				
				// 重置输入
				this.newText.content = '';
			},
			
			startDragText(index, event) {
				this.draggingText = index;
				// 记录触摸起始点
				const touch = event.touches[0];
				this.dragStartX = touch.clientX - this.addedTexts[index].x;
				this.dragStartY = touch.clientY - this.addedTexts[index].y;
			},
			
			onDragText(event) {
				if (this.draggingText !== null) {
					const touch = event.touches[0];
					
					// 获取系统信息来确定预览区域边界
					const systemInfo = uni.getSystemInfoSync();
					const previewWidth = systemInfo.windowWidth;
					const previewHeight = previewWidth * 0.4; // 预览区高度约为屏幕宽度的40%
					
					// 计算新位置，但限制在预览区域内
					let newX = touch.clientX - this.dragStartX;
					let newY = touch.clientY - this.dragStartY;
					
					// 限制文字不超出边界
					newX = Math.max(0, Math.min(previewWidth - 60, newX));
					newY = Math.max(0, Math.min(previewHeight - 40, newY));
					
					this.addedTexts[this.draggingText].x = newX;
					this.addedTexts[this.draggingText].y = newY;
				}
			},
			
			endDragText() {
				this.draggingText = null;
			},
			
			removeText(index) {
				this.addedTexts.splice(index, 1);
			},
			
			increaseTextSize() {
				if (this.newText.size < 100) {
					this.newText.size += 5;
				}
			},
			
			decreaseTextSize() {
				if (this.newText.size > 20) {
					this.newText.size -= 5;
				}
			},
			
			// 其他方法
			closeGuide() {
				this.showGuide = false;
			},
			
			saveDesign() {
				// 保存设计到设计数据中
				this.designData.patterns = [...this.addedPatterns];
				this.designData.texts = [...this.addedTexts];
				
				// 显示保存成功提示
				uni.showToast({
					title: '设计已保存',
					icon: 'success'
				});
				
				// 这里可以添加跳转逻辑，例如返回上一页或去下一步
				setTimeout(() => {
					uni.navigateBack();
				}, 1500);
			}
		}
	}
</script>

<style lang="scss">
.container {
	display: flex;
	flex-direction: column;
	height: 100vh;
	background-color: #f8f9fa;
}

.preview-area {
	flex: 1;
	padding: 15rpx;
	background-color: #ffffff;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	transition: background-color 0.3s;
	max-height: 40vh;
	overflow: hidden;
	border-bottom: 1px solid #f5f5f5;
}

.package-image {
	width: 80%;
	height: 80%;
	object-fit: contain;
	z-index: 1;
}

.added-pattern {
	position: absolute;
	width: 100rpx;
	height: 100rpx;
	z-index: 10;
	transition: transform 0.1s ease;
	
	image {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
	
	.delete-btn {
		position: absolute;
		top: -15rpx;
		right: -15rpx;
		width: 36rpx;
		height: 36rpx;
		background-color: #F44336;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 11;
		box-shadow: 0 2rpx 5rpx rgba(0,0,0,0.2);
	}
}

.text-element {
	position: absolute;
	min-width: 60rpx;
	min-height: 40rpx;
	z-index: 10;
	padding: 10rpx;
	transition: transform 0.1s ease;
	
	.delete-btn {
		position: absolute;
		top: -15rpx;
		right: -15rpx;
		width: 36rpx;
		height: 36rpx;
		background-color: #F44336;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 11;
		box-shadow: 0 2rpx 5rpx rgba(0,0,0,0.2);
	}
}

.guide-area {
	position: absolute;
	top: 30rpx;
	left: 50%;
	transform: translateX(-50%);
	background-color: rgba(0,0,0,0.75);
	padding: 12rpx 24rpx;
	border-radius: 30rpx;
	display: flex;
	align-items: center;
	z-index: 100;
	box-shadow: 0 4rpx 10rpx rgba(0,0,0,0.2);
	
	.guide-text {
		color: #fff;
		font-size: 24rpx;
		margin-right: 16rpx;
	}
	
	.close-guide {
		width: 36rpx;
		height: 36rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
	}
}

.content-section {
	flex: 1;
	padding: 10rpx 16rpx;
	overflow-y: auto;
	background-color: #ffffff;
}

.section-header {
	padding: 12rpx 0;
	margin-bottom: 12rpx;
	text-align: center;
	border-bottom: 1px solid #f5f5f5;
}

.section-title {
	font-size: 28rpx;
	color: #333;
	font-weight: 500;
}

.materials-grid {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 16rpx;
	padding: 20rpx;
}

.material-item {
	aspect-ratio: 1/1;
	background-color: #ffffff;
	border-radius: 8rpx;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: 0 2rpx 5rpx rgba(0,0,0,0.05);
	transition: transform 0.2s;
	border: 1px solid #f0f0f0;
	
	&:active {
		transform: scale(0.95);
		background-color: #f8f8f8;
	}
	
	image {
		width: 85%;
		height: 85%;
		object-fit: contain;
	}
}

.color-grid {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 16rpx;
	padding: 20rpx;
}

.color-item {
	aspect-ratio: 1/1;
	border-radius: 8rpx;
	border: 1px solid #f0f0f0;
	transition: all 0.2s;
	display: flex;
	justify-content: center;
	align-items: center;
	
	&.active {
		transform: scale(1.05);
		border: 2px solid #4CAF50;
		box-shadow: 0 2rpx 8rpx rgba(76, 175, 80, 0.2);
	}
}

.text-edit-area {
	padding: 20rpx;
	
	.text-input {
		width: 100%;
		height: 80rpx;
		background-color: #f5f5f5;
		border-radius: 8rpx;
		padding: 0 20rpx;
		margin-bottom: 30rpx;
		font-size: 30rpx;
		border: 1px solid #f0f0f0;
	}
	
	.text-options {
		margin-bottom: 30rpx;
		
		.option-group {
			margin-bottom: 20rpx;
			
			.option-label {
				font-size: 28rpx;
				color: #666;
				margin-bottom: 10rpx;
				display: block;
			}
		}
		
		.color-options {
			display: flex;
			flex-wrap: wrap;
			gap: 16rpx;
			
			.text-color-item {
				width: 80rpx;
				height: 80rpx;
				border-radius: 8rpx;
				border: 2rpx solid #f0f0f0;
				transition: all 0.2s;
				display: flex;
				justify-content: center;
				align-items: center;
				
				&.active {
					transform: scale(1.05);
					border: 3rpx solid #4CAF50;
					box-shadow: 0 2rpx 8rpx rgba(76, 175, 80, 0.2);
				}
			}
		}
		
		.size-control {
			display: flex;
			align-items: center;
			border: 1px solid #f0f0f0;
			border-radius: 8rpx;
			overflow: hidden;
			
			.control-btn {
				width: 80rpx;
				height: 80rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: #f5f5f5;
				
				&:active {
					background-color: #e9e9e9;
				}
			}
			
			.size-value {
				flex: 1;
				text-align: center;
				font-size: 30rpx;
				color: #333;
			}
		}
		
		.style-controls {
			display: flex;
			gap: 20rpx;
			
			.style-btn {
				flex: 1;
				height: 80rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				background-color: #f5f5f5;
				border-radius: 8rpx;
				border: 1px solid #f0f0f0;
				
				&.active {
					background-color: rgba(76, 175, 80, 0.1);
					border-color: #4CAF50;
				}
				
				text {
					font-size: 24rpx;
					color: #666;
					margin-top: 4rpx;
					
					&.active-text {
						color: #4CAF50;
					}
				}
			}
		}
	}
	
	.add-text-btn {
		width: 100%;
		height: 80rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #4CAF50;
		color: #fff;
		border-radius: 8rpx;
		font-size: 30rpx;
		box-shadow: 0 4rpx 8rpx rgba(76, 175, 80, 0.2);
		
		&:active {
			transform: translateY(2rpx);
			box-shadow: 0 2rpx 4rpx rgba(76, 175, 80, 0.2);
		}
	}
}

// 底部导航样式
.bottom-nav {
	display: flex;
	height: 100rpx;
	background-color: #f5f5f5;
}

.nav-item {
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: all 0.2s;
	position: relative;
	background-color: #ffffff;
	
	text {
		font-size: 28rpx;
		color: #666;
	}
	
	&.active {
		color: #4CAF50;
		
		text {
			color: #4CAF50;
			font-weight: 500;
		}
		
		&::after {
			display: none;
		}
	}
	
	&.save-btn {
		background-color: #4CAF50;
		
		text {
			color: #ffffff;
			font-weight: 500;
		}
	}
}
</style>
