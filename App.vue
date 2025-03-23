<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/* 引入主题样式，放在最前面 */
	@import "@/uni_modules/uview-ui/theme.scss";
	/* 引入 uView 基础样式 */
	@import "@/uni_modules/uview-ui/index.scss";
	/*每个页面公共css */
</style>
