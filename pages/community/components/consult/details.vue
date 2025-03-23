<template>
	<view class="report-container">
		<!-- 报告标题 -->
		<view class="report-title">
			{{ reportData.title }}
		</view>
		
		<!-- 报告来源 -->
		<view class="report-source">
			来源: {{ reportData.source }}
		</view>
		
		<!-- 报告内容 -->
		<view class="report-content">
			<rich-text :nodes="reportData.content"></rich-text>
		</view>
		
		<!-- 报告图片 -->
		<view class="report-image" v-if="reportData.image">
			<image :src="reportData.image" mode="widthFix"></image>
		</view>
		
		<!-- 报告数据 -->
		<view class="report-data" v-if="reportData.data">
			<rich-text :nodes="reportData.data"></rich-text>
		</view>
		
		<!-- 责任编辑 -->
		<view class="report-editor" v-if="reportData.editor">
			责任编辑: {{ reportData.editor }}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				reportData: {
					title: '2022中国农业农村发展趋势报告',
					source: '经济日报',
					content: `在宏观经济平稳运行的背景下，我国农业农村改革发展取得显著成效，农业作为经济社会发展压舱石的作用日益显著。本报告回顾了2021年我国农业农村发展情况，分析了2022年面临的重要机遇和挑战，并对其发展趋势做出预判，在此基础上结合农业农村经济社会发展过程中需要关注的热点问题提出相关对策建议。`,
					image: '/static/logo.png', // 请确保图片路径正确
					data: `2021年是"十四五"的开局之年，我国克服新冠肺炎疫情与国际经济形势复杂多变的不利影响，经济整体复苏，农业继续保持高质量稳步发展，农民生活水平持续提升，农村面貌进一步改善。<br/><br/>
					农业经济平稳增长，粮食产量再创新高。2021年第一产业增加值比上年增长7.1%，达到83086亿元，占国内生产总值的7.26%，与2020年相比有所下降；前三季度，农林牧渔业总产值累计达到92863.4亿元。其中，农业总产值为46671.1亿元，林业总产值为3841.3亿元，牧业总产值为28329.0亿元，渔业总产值为9129.6亿元。`,
					editor: '杨怡'
				}
			};
		},
		onLoad(options) {
			// 如果有传入参数，可以在这里获取报告ID并请求数据
			if (options.id) {
				this.getReportDetail(options.id);
			}
		},
		methods: {
			getReportDetail(id) {
				// 这里可以添加获取报告详情的API请求
				// 例如：
				// uni.request({
				//   url: 'your-api-url/report/' + id,
				//   success: (res) => {
				//     this.reportData = res.data;
				//   }
				// });
			}
		}
	}
</script>

<style lang="scss">
	.report-container {
		padding: 30rpx;
		background-color: #fff;
	}

	.report-title {
		font-size: 40rpx;
		font-weight: bold;
		line-height: 1.4;
		margin-bottom: 20rpx;
	}

	.report-source {
		font-size: 28rpx;
		color: #999;
		margin-bottom: 30rpx;
	}

	.report-content {
		font-size: 32rpx;
		line-height: 1.6;
		color: #333;
		margin-bottom: 30rpx;
		text-align: justify;
	}

	.report-image {
		width: 100%;
		margin: 20rpx 0;
		
		image {
			width: 100%;
			border-radius: 8rpx;
		}
	}

	.report-data {
		font-size: 32rpx;
		line-height: 1.6;
		color: #333;
		margin: 30rpx 0;
		text-align: justify;
	}

	.report-editor {
		font-size: 28rpx;
		color: #999;
		margin-top: 40rpx;
		padding-top: 20rpx;
		border-top: 1px solid #eee;
	}
</style>
