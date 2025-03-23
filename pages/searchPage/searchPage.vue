<template>
	<view class="content">
	<view class="search-container">
		<Search v-model="searchKeyword" :placeholder="'请输入搜索内容'" @search="handleSearch"></Search>
	</view>

	<!-- 商品列表区域 -->
	 
		<view class="product-section"  v-if="type==='product'&&confirm">
			<ProductList></ProductList>
		</view>
		 <Recommend v-if="type==='recommend'&&confirm"></Recommend>
		<Consult v-if="type==='consult'&&confirm"></Consult>
	</view>
</template>

<script>
	import Search from '@/components/search.vue'
	import ProductList from '@/components/ProductList.vue'
	import Recommend from '@/pages/community/components/recommend/recommend.vue'
	import Consult from '@/pages/community/components/consult/consult.vue'
	export default {
		components:{
			Search,
			ProductList,
			Recommend,
			Consult
		},
		data() {
			return {
				searchKeyword: '', // 搜索关键词
				type:'',
				confirm:false
			}
		},
		methods:{
			handleSearch(keyword){
				console.log('搜索关键词:', keyword);
				this.confirm = true;
			},
		},
		onLoad(e) {
			console.log('搜索页面参数:', e);
			this.type = e.type;
			if (e.keyword) {	
				this.searchKeyword = e.keyword;
				this.handleSearch(e.keyword);
			}
		}
	}
</script>

<style lang="scss">
	.content{
		background-color: #f5f5f5;
	}
	.search-container {
		width: 100%;
		margin: 20rpx auto;
		background: #ffffff;
		border-radius: 16rpx;
		box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
	}
	.product-section{
		width: 100%;
		margin-top: 30rpx;
		background: #ffffff;
		border-radius: 24rpx;
		padding: 24rpx 20rpx;
		box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.08);
		position: relative;
		overflow: hidden;
		margin-bottom: 40rpx;
	}
	
</style>
