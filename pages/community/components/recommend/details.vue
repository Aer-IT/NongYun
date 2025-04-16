<template>
	<view class="detail-container">
		
		<!-- 主要内容区 -->
		<scroll-view scroll-y class="content-scroll">
			<!-- 图片浏览器 -->
			<swiper class="swiper" circular :indicator-dots="detail.images.length > 1" indicator-active-color="#4CAF50">
				<swiper-item v-for="(img, index) in detail.images" :key="index" @click="previewImage(img)">
					<image class="main-image" :src="img" mode="aspectFit"></image>
				</swiper-item>
			</swiper>
			
			<!-- 指示点 -->
			<view v-if="detail.images.length > 1" class="indicator">
				<view class="dot" v-for="(img, index) in detail.images" :key="index" :class="{'active': index === currentImageIndex}"></view>
			</view>
			
			<!-- 用户描述 -->
			<view class="desc-section">
				<text class="desc-text">{{ detail.description }}</text>
				
				<!-- 标签区域 -->
				<view class="tags-container">
					<text v-for="(tag, index) in tagList" :key="index" class="tag-item">#{{ tag }}</text>
				</view>
				
				<!-- 产地信息 -->
				<view class="related-search" @click="handleSearch">
					<text>🌱 产地信息：</text>
					<text class="search-keyword">{{ detail.relatedSearch }}</text>
					<u-icon name="arrow-right" size="24" color="#999"></u-icon>
				</view>
				
				<!-- 发布时间 -->
				<view class="publish-info">
					<text class="publish-time">{{ detail.publishTime }}</text>
					<text class="publish-location" v-if="detail.location">{{ detail.location }}</text>
				</view>
			</view>
			
			<!-- 评论区 -->
			<view class="comment-section">
				<view class="comment-header">
					<text class="comment-count">共{{ commentList.length }}条评论</text>
				</view>
				
				<!-- 评论列表 -->
				<view class="comment-list">
					<view v-if="commentList.length === 0" class="empty-comment">
						<text>暂无评论，快来发表第一条评论吧</text>
					</view>
					<view v-else v-for="(comment, index) in commentList" :key="index" class="comment-item">
						<u-avatar :src="comment.avatar" size="40"></u-avatar>
						<view class="comment-content">
							<view class="comment-user">
								<text class="comment-username">{{ comment.username }}</text>
							</view>
							<text class="comment-text">{{ comment.content }}</text>
							<view class="comment-actions">
								<text class="comment-time">{{ comment.time }}</text>
								<view class="comment-btns">
									<view class="comment-like" @click="toggleCommentLike(index)">
										<u-icon :name="comment.isLiked ? 'thumb-up-fill' : 'thumb-up'" :size="24" :color="comment.isLiked ? '#4CAF50' : '#999'"></u-icon>
										<text :class="{'active': comment.isLiked}">{{ comment.likes }}</text>
									</view>
									<view class="comment-reply" @click="replyComment(comment)">
										<u-icon name="chat" size="24" color="#999"></u-icon>
										<text>{{ comment.replies }}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		
		<!-- 底部操作栏 -->
		<view class="bottom-bar">
			<!-- 评论输入框 -->
			<view class="comment-input-wrapper" @click="focusComment">
				<text class="placeholder-text">说说你对这款农产品的看法...</text>
			</view>
			
			<!-- 互动按钮 -->
			<view class="action-icons">
				<view class="action-item" @click="toggleLike">
					<u-icon :name="detail.isLiked ? 'heart-fill' : 'heart'" :size="28" :color="detail.isLiked ? '#4CAF50' : '#666'"></u-icon>
					<text>{{ detail.likes }}</text>
				</view>
				<view class="action-item">
					<u-icon name="star" size="28" color="#666"></u-icon>
					<text>{{ detail.stars || 28 }}</text>
				</view>
				<view class="action-item">
					<u-icon name="chat" size="28" color="#666"></u-icon>
					<text>{{ commentList.length }}</text>
				</view>
			</view>
		</view>
		
		<!-- 评论弹出层 -->
		<u-popup :show="showCommentPopup" mode="bottom" @close="closeCommentPopup" round>
			<view class="comment-popup">
				<view class="comment-popup-header">
					<text>添加评论</text>
					<u-icon name="close" size="24" color="#333" @click="closeCommentPopup"></u-icon>
				</view>
				<view class="comment-popup-input">
					<textarea 
						v-model="commentText" 
						auto-height 
						maxlength="200"
						placeholder="说说你对这款农产品的看法..." 
						focus
						class="comment-textarea"
					></textarea>
					<text class="comment-count">{{ commentText.length }}/200</text>
				</view>
				<view class="comment-popup-footer">
					<u-button type="primary" size="medium" @click="submitComment" style="background-color: #4CAF50;">发布</u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
export default {
	data() {
		return {
			id: null,
			currentImageIndex: 0,
			showCommentPopup: false,
			detail: {
				id: 0,
				images: ['/static/logo.png'],
				username: '乡村好物推荐官',
				avatar: '/static/logo.png',
				likes: 245,
				stars: 28,
				isLiked: false,
				description: '【现摘现发】这批砀山酥梨真的太香甜多汁了！\n产地直发，不打蜡不催熟，皮薄核小，汁多味甜，脆嫩爽口，冰箱冷藏后口感更佳～',
				publishTime: '02-27',
				location: '安徽砀山',
				tag: '#砀山酥梨#当季水果#产地直发#现摘现发',
				relatedSearch: '砀山梨产地直发'
			},
			tagList: ['砀山酥梨', '当季水果', '产地直发', '现摘现发'],
			commentList: [
				{
					username: '爱评论的人运气都不差',
					avatar: '/static/logo.png',
					content: '买过的人都说好',
					time: '',
					likes: 0,
					isLiked: false,
					replies: 0
				},
				{
					username: '果果妈妈',
					avatar: '/static/logo.png',
					content: '已经买过三次了，真的超级好吃！孩子们都很喜欢，老人吃也不怕硬，真是全家人的最爱~',
					time: '刚刚',
					likes: 299,
					isLiked: false,
					replies: 28
				}
			],
			commentText: '',
			isInputFocused: false,
			replyToUser: null
		};
	},
	onLoad(options) {
		if (options.id) {
			this.id = parseInt(options.id);
			this.fetchDetail();
		}
	},
	methods: {
		
		// 获取详情数据
		fetchDetail() {
			// 模拟请求后端数据
			// 使用图片中的数据来模拟
			setTimeout(() => {
				this.detail = {
					id: this.id || 1,
					images: ['/static/logo.png'],
					username: '乡村好物推荐官',
					avatar: '/static/logo.png',
					likes: 245,
					stars: 28,
					isLiked: false,
					description: '【现摘现发】这批砀山酥梨真的太香甜多汁了！\n产地直发，不打蜡不催熟，皮薄核小，汁多味甜，脆嫩爽口，冰箱冷藏后口感更佳～\n五斤装只要29.9元，十斤装更划算，买就送专用果袋和削皮刀！',
					publishTime: '02-27',
					location: '安徽砀山',
					tag: '#砀山酥梨#当季水果#产地直发#现摘现发',
					relatedSearch: '砀山梨产地直发'
				};
				
				// 解析标签
				if (this.detail.tag) {
					this.tagList = this.detail.tag.split('#').filter(tag => tag.trim() !== '');
				}
			}, 500);
		},
		
		// 处理图片轮播变化
		handleSwiperChange(e) {
			this.currentImageIndex = e.detail.current;
		},
		
		// 预览图片
		previewImage(url) {
			uni.previewImage({
				urls: this.detail.images,
				current: url
			});
		},
		
		// 处理搜索
		handleSearch() {
			uni.showToast({
				title: '正在搜索: ' + this.detail.relatedSearch,
				icon: 'none'
			});
		},
		
		// 切换点赞状态
		toggleLike() {
			this.detail.isLiked = !this.detail.isLiked;
			this.detail.likes = this.detail.isLiked ? this.detail.likes + 1 : this.detail.likes - 1;
			
			// 添加点赞反馈
			if (this.detail.isLiked) {
				uni.showToast({
					title: '点赞成功',
					icon: 'none',
					duration: 800
				});
			}
		},
		
		// 切换评论点赞状态
		toggleCommentLike(index) {
			const comment = this.commentList[index];
			comment.isLiked = !comment.isLiked;
			comment.likes = comment.isLiked ? comment.likes + 1 : comment.likes - 1;
			
			if (comment.isLiked) {
				uni.showToast({
					title: '点赞成功',
					icon: 'none',
					duration: 800
				});
			}
		},
		
		// 聚焦评论输入框
		focusComment() {
			this.showCommentPopup = true;
		},
		
		// 关闭评论弹窗
		closeCommentPopup() {
			this.showCommentPopup = false;
			this.commentText = '';
			this.replyToUser = null;
		},
		
		// 回复评论
		replyComment(comment) {
			this.replyToUser = comment.username;
			this.commentText = `回复 @${comment.username}: `;
			this.focusComment();
		},
		
		// 提交评论
		submitComment() {
			if (!this.commentText.trim()) {
				uni.showToast({
					title: '评论内容不能为空',
					icon: 'none'
				});
				return;
			}
			
			// 添加新评论
			this.commentList.splice(1, 0, {
				username: '我',
				avatar: '/static/logo.png',
				content: this.commentText,
				time: '刚刚',
				likes: 0,
				isLiked: false,
				replies: 0
			});
			
			// 清空输入框并关闭弹窗
			this.closeCommentPopup();
			
			uni.showToast({
				title: '评论成功，会有机会获得新人优惠券哦',
				icon: 'success'
			});
		}
	}
}
</script>

<style lang="scss">
.detail-container {
	min-height: 100vh;
	background-color: #ffffff;
	display: flex;
	flex-direction: column;
	position: relative;
	
	
	.content-scroll {
		flex: 1;
		height: calc(100vh - 180rpx);
	}
	
	.swiper {
		width: 100%;
		height: 800rpx; // 根据图片比例调整
		
		.main-image {
			width: 100%;
			height: 100%;
			display: block;
			background-color: #f8fbf5; // 更改为浅绿色背景，更符合农产品感觉
		}
	}
	
	.indicator {
		display: flex;
		justify-content: center;
		padding: 16rpx 0;
		
		.dot {
			width: 12rpx;
			height: 12rpx;
			border-radius: 50%;
			background-color: #dddddd;
			margin: 0 8rpx;
			
			&.active {
				background-color: #4CAF50; // 更改为绿色，更符合农产品感觉
			}
		}
	}
	
	.desc-section {
		padding: 20rpx 30rpx;
		background-color: #ffffff;
		
		.desc-text {
			font-size: 30rpx;
			color: #333333;
			line-height: 1.6;
			margin-bottom: 20rpx;
			white-space: pre-line;
		}
		
		.tags-container {
			margin-bottom: 16rpx;
			
			.tag-item {
				font-size: 28rpx;
				color: #4CAF50; // 更改为绿色，更符合农产品感觉
				margin-right: 8rpx;
				display: inline-block;
			}
		}
		
		.related-search {
			display: flex;
			align-items: center;
			margin-bottom: 16rpx;
			padding: 16rpx 0;
			border-bottom: 1px solid #f5f5f5;
			
			text {
				font-size: 26rpx;
				color: #999999;
			}
			
			.search-keyword {
				color: #666666;
				flex: 1;
			}
		}
		
		.publish-info {
			display: flex;
			font-size: 24rpx;
			color: #999999;
			
			.publish-time {
				margin-right: 16rpx;
			}
		}
	}
	
	.comment-section {
		background-color: #ffffff;
		padding: 20rpx 30rpx;
		padding-bottom: 140rpx;
		
		.comment-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20rpx;
			
			.comment-count {
				font-size: 28rpx;
				color: #333333;
				font-weight: bold;
			}
			
			.comment-tip {
				font-size: 26rpx;
				color: #4CAF50; // 更改为绿色，更符合农产品感觉
			}
		}
		
		.comment-list {
			.empty-comment {
				text-align: center;
				padding: 40rpx 0;
				color: #999999;
				font-size: 26rpx;
			}
			
			.comment-item {
				display: flex;
				margin-bottom: 30rpx;
				
				.comment-content {
					flex: 1;
					margin-left: 16rpx;
					
					.comment-user {
						margin-bottom: 8rpx;
						
						.comment-username {
							font-size: 28rpx;
							color: #333333;
							font-weight: 500;
						}
					}
					
					.comment-text {
						font-size: 28rpx;
						color: #333333;
						line-height: 1.5;
						margin-bottom: 10rpx;
					}
					
					.comment-actions {
						display: flex;
						justify-content: space-between;
						align-items: center;
						
						.comment-time {
							font-size: 24rpx;
							color: #999999;
						}
						
						.comment-btns {
							display: flex;
							
							.comment-like, .comment-reply {
								display: flex;
								align-items: center;
								margin-left: 24rpx;
								
								text {
									font-size: 24rpx;
									color: #999999;
									margin-left: 6rpx;
									
									&.active {
										color: #4CAF50;
									}
								}
							}
						}
					}
				}
			}
		}
	}
	
	.bottom-bar {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 16rpx 30rpx;
		background-color: #ffffff;
		border-top: 1rpx solid #f0f0f0;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		z-index: 99;
		
		.comment-input-wrapper {
			flex: 1;
			height: 70rpx;
			background-color: #f5f5f5;
			border-radius: 35rpx;
			padding: 0 20rpx;
			display: flex;
			align-items: center;
			margin-right: 20rpx;
			
			.placeholder-text {
				color: #999999;
				font-size: 28rpx;
			}
		}
		
		.action-icons {
			display: flex;
			
			.action-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-left: 24rpx;
				
				text {
					font-size: 22rpx;
					color: #666666;
					margin-top: 4rpx;
				}
			}
		}
	}
	
	.comment-popup {
		padding: 30rpx;
		
		.comment-popup-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20rpx;
			
			text {
				font-size: 32rpx;
				font-weight: bold;
			}
		}
		
		.comment-popup-input {
			position: relative;
			margin-bottom: 20rpx;
			
			.comment-textarea {
				width: 100%;
				min-height: 200rpx;
				padding: 20rpx;
				background-color: #f5f5f5;
				border-radius: 12rpx;
				font-size: 28rpx;
			}
			
			.comment-count {
				position: absolute;
				bottom: 20rpx;
				right: 20rpx;
				font-size: 24rpx;
				color: #999999;
			}
		}
		
		.comment-popup-footer {
			display: flex;
			justify-content: flex-end;
		}
	}
}
</style>
