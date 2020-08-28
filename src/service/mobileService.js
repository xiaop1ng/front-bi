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

export function loginOrRegist(params, options) {
	let _params = {
		funcNo: '1217301'
	}
	return commonInvoke(_params, params, options)
}

export function getWxJsTick(params, options) {
	let _params = {
		funcNo: '1217610'
	}
	let _options = {}
	return commonInvoke(_params, params, options, _options)
}

/**
 * 获取赛季信息
 */
export function getSeasonAndParagraph(params, options) {
	let _params = {
		funcNo: '1217330',
		appid: $hvue.config.appid
	}
	let _options = {}
	return commonInvoke(_params, params, options, _options)
}

export function matchingRecord(params, options) {
	let _params = {
		funcNo: '1217339',
		appid: $hvue.config.appid
	}
	let _options = {}
	return commonInvoke(_params, params, options, _options)
}

export function checkGold(params, options) {
	let _params = {
		funcNo: '1217337',
		appid: $hvue.config.appid
	}
	let _options = {}
	return commonInvoke(_params, params, options, _options)
}

export function addGold(params, options) {
	let _params = {
		funcNo: '1217338',
		appid: $hvue.config.appid
	}
	let _options = {}
	return commonInvoke(_params, params, options, _options)
}

export function checkAuth(params, options) {
	let _params = {
		funcNo: '1217308',
		appid: $hvue.config.appid
	}
	let _options = {}
	return commonInvoke(_params, params, options, _options)
}

export function getTodayCoin(params, options) {
	let _params = {
		funcNo: '1217340',
		appid: $hvue.config.appid
	}
	let _options = {}
	return commonInvoke(_params, params, options, _options)
}

export function getShareCoin(params, options) {
	let _params = {
		funcNo: '1217603',
		appid: $hvue.config.appid
	}
	let _options = {}
	return commonInvoke(_params, params, options, _options)
}

export function match(params, options) {
	let _params = {
		funcNo: '2217600',
		appid: $hvue.config.appid
	}
	let _options = {}
	return commonInvoke(_params, params, options, _options)
}

export function getSubject(params, options) {
	let _params = {
		funcNo: '12175001',
		appid: $hvue.config.appid
	}
	let _options = {}
	return commonInvoke(_params, params, options, _options)
}

export function sendAnswer(params, options) {
	let _params = {
		funcNo: '12175000',
		appid: $hvue.config.appid
	}
	let _options = {}
	return commonInvoke(_params, params, options, _options)
}

export function settlement(params, options) {
	let _params = {
		funcNo: '12175002',
		appid: $hvue.config.appid
	}
	let _options = {}
	return commonInvoke(_params, params, options, _options)
}

/**
 * 抽取奖品
 */
export function draw(params, options) {
	let _params = {
		funcNo: '1217601'
	}
	let _options = {}
	return commonInvoke(_params, params, options, _options)
}

/**
 * 中奖记录
 */
export function winnedPrizes(params, options) {
	let _params = {
		funcNo: '1217600'
	}
	let _options = {}
	return commonInvoke(_params, params, options, _options)
}

/**
 * 当前活动配置信息
 */
export function aliveActivity(params, options) {
	let _params = {
		funcNo: '1207001'
	}
	let _options = {}
	return commonInvoke(_params, params, options, _options)
}

/**
 * 活动页面配置信息
 */
export function pageCfg(params, options) {
	let _params = {
		funcNo: '1207002'
	}
	let _options = {}
	return commonInvoke(_params, params, options, _options)
}

/** 
 * 发送短信验证码 1217602
 */
export function sms(params, options) {
	let _params = {
		funcNo: '1217602'
	}
	let _options = {}
	return commonInvoke(_params, params, options, _options)
}

/**
 * 分享获取奖励
 */
export function shareCoin(params, options) {
	let _params = {
		funcNo: '1217603'
	}
	let _options = {}
	return commonInvoke(_params, params, options, _options)
}

export function wordcount (params, options) {
	let _params = {}
	let _options = {
		url: SERVER_URL + "/v2/wordcount",
		
	}
	return commonInvoke(_params, params, options, _options)
}

export default {
	'loginOrRegist': loginOrRegist,
	'getWxJsTick': getWxJsTick,
	'getSeasonAndParagraph': getSeasonAndParagraph,
	'matchingRecord': matchingRecord,
	'checkGold': checkGold,
	'addGold': addGold,
	'checkAuth': checkAuth,
	'getTodayCoin': getTodayCoin,
	'getShareCoin': getShareCoin,
	'match': match,
	'getSubject': getSubject,
	'sendAnswer': sendAnswer,
	'settlement': settlement,
	'draw': draw,
	'winnedPrizes': winnedPrizes,
	'aliveActivity': aliveActivity,
	'pageCfg': pageCfg,
	'sms': sms,
	'shareCoin': shareCoin,
	'wordcount': wordcount
}
