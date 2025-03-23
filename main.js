import App from './App'
import Vue from 'vue'

// #ifndef VUE3
import './uni.promisify.adaptor'

// 引入uview-ui并初始化
// 注意路径，使用相对路径
import uView from './uni_modules/uview-ui'
// 先使用插件
Vue.use(uView)

// 确保在uni对象上存在$u对象及$parent方法
import indexFunctions from './uni_modules/uview-ui/libs/function/index.js'
if (!uni.$u) uni.$u = {}
uni.$u.$parent = indexFunctions.$parent

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  
  // 引入uview-ui并初始化
  import('./uni_modules/uview-ui').then(module => {
    app.use(module.default)
    
    // 确保在uni对象上存在$u对象及$parent方法
    import('./uni_modules/uview-ui/libs/function/index.js').then(functionModule => {
      if (!uni.$u) uni.$u = {}
      uni.$u.$parent = functionModule.default.$parent
    })
  })
  
  return {
    app
  }
}
// #endif