import store from '@/store'
import {
	isString,
	isArray
} from './util'
 
import config from './settings'
 
const install = function (Vue) {
	const {
		errorLog: needErrorLog
	} = config
	
	function checkNeed() {
		const env = process.env.NODE_ENV
		
		if (isString(needErrorLog)) {
			return env === needErrorLog
		}
		
		if (isArray(needErrorLog)) {
			return needErrorLog.includes(env)
		}
		
		return false
	}
	
	function writeErrorLog({err,route}) {
		// ajax 调用后台接口去记录日志
		
		var errInfo = new Error(err)
		// console.log('抛出错误',errInfo.message)
		Vue.nextTick(() => {  
		// 3
			Vue.axios.post('http://tool.wfjar.com:12003/APi/ExceptionMsg/add', {
				// 此参数就是写到请求体中的参数
				"msg_type":"系统异常",
				"project_name":"mars前端",
				"msg_content":errInfo.message
			  }).then((res) => {
				const {ReturnCode,Data}=res
				if(ReturnCode==200){
					// console.log('异常提交成功')
				}
			  }).catch((error) => {
				// console.log(error);
			  });
		
	  
			// 1
			// let params={
			// 	"msg_type":"系统异常",
			// 	"project_name":"mars前端",
			// 	"msg_content":errInfo.message
			// }
			// ExceptionMsgAdd(params).then(res=>{
			// 	const {ReturnCode,Data}=res
			// 	if(ReturnCode==200){
			// 		console.log('异常提交成功')
			// 	}
			// })
			
		})
		

	}
	
	function errorHandler(err, vm, info, a) {
		// route： uni-app路由，这里可以修改成自己的内容或去掉
		// let pages = getCurrentPages(),
		// 	route = ''
		
		// if (pages.length) {
		// 	route = pages[pages.length - 1].route;
		// }
		
		console.error('globalError', err)
		vm && console.error('globalError-vm', vm)
		// console.log(vm.$route.fullPath,'route')
		info && console.error(info)
		// route && console.error('page', route) // route： uni-app路由，这里可以修改成自己的内容或去掉
		
		if (checkNeed()) {
			// Don't ask me why I use Vue.nextTick, it just a hack.
			// detail see https://forum.vuejs.org/t/dispatch-in-vue-config-errorhandler-has-some-problem/23500
			Vue.nextTick(() => {
				store.dispatch('errorLog/addErrorLog', {
					err,
					info,
					// route // route： uni-app路由，这里可以修改成自己的内容或去掉
				})
				
				writeErrorLog({
					err,
					info,
					// route // route： uni-app路由，这里可以修改成自己的内容或去掉
				})
			})
		}
	}
	
	// 挂载在原型上，即可以在其他页面中使用this.$throw
	Vue.prototype.$throw = errorHandler
	Vue.config.errorHandler = errorHandler
}
 
export default install;