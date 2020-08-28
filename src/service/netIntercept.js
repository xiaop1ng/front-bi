import router from 'router'
export default {
	//请求是否显示loading，(统一设置:单个请求的入参会覆盖这里，下同),默认 true
	loading: true,
	//请求参数签名(统一设置), 默认false
	sign: false,
	//请求方法, 默认 get
	method: 'get',
	//请求超时时间(统一设置), 默认 30000(ms)
	timeout: 20000,
	//跨域是否带cookie验证，默认为true
	withCredentials: true,
	//参数是否utf-8编码, 默认true
	encode: true,
	//后端接口版本(统一设置)，默认1.0，目前是中台产品线需要用2.0，统一封装支持。
	servletVersion: '1.0',
	//是否原生代理请求(统一设置), 默认false
	nativeProxy: false,
	//原生代理 请求加密模式，对应50118插件号的入参:mode, 默认0(正常不加密)
	nativeProxyMode: 0,
	//请求头，默认{}
	headers: {},
	//请求前统一拦截处理方法
	interceptRequest: function(config) {
		//console.log(config)
	},
	//请求响应统一拦截处理方法, 返回false则中断promise链
	interceptResponse: function(res) {
		// 登录拦截统一处理
		if(res && res.error_no == '-999') {
			router.push({path:'/index'})
			
			_hvueToast({
				icon: 'error',
				mes: '请先登录(-999)'
			})
			return false
		}else if (res && res.error_no == '-101') {
			_hvueToast({
				icon: 'error',
				mes: '系统异常(-101)'
			})
			return false
		}
	},
	// 请求服务器报错时处理方法(即没有正常返回响应结果时进入)
	handleError: handleError
}

function handleError(err) {
	if (err && err.response) {
		switch (err.response.status) {
			case 401:
				_hvueToast({
					icon: 'error',
					mes: '访问未授权(401)'
				})
				break;
			case 403:
				_hvueToast({
					icon: 'error',
					mes: '访问被拒绝(403)'
				})
				break;
			case 404:
				_hvueToast({
					icon: 'error',
					mes: '请求地址或接口不存在(404)'
				})
				break;
			case 500:
				_hvueToast({
					icon: 'error',
					mes: '服务器内部服务错误(500)'
				})
				break;
			case 501:
				_hvueToast({
					icon: 'error',
					mes: '请求服务未实现(501)'
				})
				break;
			case 502:
				_hvueToast({
					icon: 'error',
					mes: 'Web服务器故障(502)'
				})
				break;
			case 503:
				_hvueToast({
					icon: 'error',
					mes: '服务不可用(503)'
				})
				break;
			case 504:
				_hvueToast({
					icon: 'error',
					mes: '网关超时(504)'
				})
				break;
			case 505:
				_hvueToast({
					icon: 'error',
					mes: '服务器不支持</br>请求HTTP版本(505)'
				})
				break;
			default:
				_hvueToast({
					icon: 'error',
					mes: `ajax请求出错(${err.response.status})`
				})
				break;
		}
	} else {
		if (err.message.indexOf('Network Error') !== -1) {
			_hvueToast({
				icon: 'error',
				mes: '网络异常或中断'

			})
		} else if (err.message.indexOf('timeout of') !== -1) {
			_hvueToast({
				icon: 'error',
				mes: '请求超时(timeout)'
			})
		} else {
			_hvueToast({
				icon: 'error',
				mes: `请求错误: ${err.message}`
			})
		}
	}
	//返回false则中断promise 
	return false
}