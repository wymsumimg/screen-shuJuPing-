export default {
    /**
	 * @type {string | array} 'production' | ['production', 'development']
	 * @description 在什么环境中记录日志，生产环境还是开发环境
	 * 默认生产环境写入错误日志，避免在开发环境调试期间错误日志过多且影响性能
	 * 如果需要在开发环境中记录错误日志，可以修改为 ['production', 'development']
	 */
	errorLog: ['production', 'development']
}