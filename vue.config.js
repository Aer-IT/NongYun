module.exports = {
    // 在生产环境下查看源码映射，方便排查问题
    productionSourceMap: false,
    
    // transpileDependencies为uView-UI的依赖添加转译支持
    transpileDependencies: ['uview-ui', '@/uni_modules/uview-ui']
} 