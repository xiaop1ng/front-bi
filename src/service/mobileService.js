import {
	request,
	getCookie
} from 'thinkive-hvue'

// 接口请求服务类

var commonInvoke = function (_params, params, options, _options = {}) {
	return new Promise((resolve, reject) => {
		_options.headers = {
			'Accept': 'application/json'
		}
		var authorization = getCookie('Authorization');
		// 如果存在令牌将令牌放入请求头中
		if (authorization) {
			_options.headers = {
				'Authorization': 'Bearer ' + authorization
			}
		}
		_options.method = 'get'
		
		request({
			_params,
			params,
			options,
			_options
		}).then(res => {
			resolve(res)
		}, err => {
			reject(err)
		})
	})
}

export function wordcount (params, options) {
	let _params = {}
	let _options = {
		url: SERVER_URL + "v2/wordcount",
		
	}
	return commonInvoke(_params, params, options, _options)
}

export function worddetail (params, options) {
	let _params = {}
	let _options = {
		url: SERVER_URL + "v2/wordcount/" + params.word,
		
	}
	return commonInvoke(_params, params, options, _options)
}
export function feel (params, options) {
	let _params = {}
	let _options = {
		url: SERVER_URL + "v2/feel/" + params.dist,
	}
	return commonInvoke(_params, params, options, _options)
}


export default {
	'wordcount': wordcount,
	'worddetail': worddetail,
	'feel': feel
}
