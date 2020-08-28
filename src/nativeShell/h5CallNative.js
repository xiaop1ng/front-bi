/*	H5调用原生壳子方法 集合写在这里  */
import {callMessageNative} from 'thinkive-hvue'

/*
 * @param funcNo 70032 H5启动竞赛模拟交易页面
 */
export const function70032 = function(paramMap) {
	// 用es6语法简化代码
	let param = {
		funcNo: '70032'
	};
	Object.assign(param, paramMap);
	return callMessageNative(param);
};

/*
 * @param funcNo 70033 H5启动竞赛支付页面
 */
export const function70033 = function(paramMap) {
	// 用es6语法简化代码
	let param = {
		funcNo: '70033'
	};
	// param['funcNo'] = '70033';
	// param['moduleName'] = paramMap.moduleName;
	// param['competition_id'] = paramMap.competition_id;
	// param['competition_name'] = paramMap.competition_name;
	// param['competition_time'] = paramMap.competition_time;
	// param['competition_money'] = paramMap.competition_money;
	// param['competition_image_url'] = paramMap.competition_image_url;
	// param['competition_protocol'] = paramMap.competition_protocol;
	Object.assign(param, paramMap);
	return callMessageNative(param);
	//return result;
};

/*
 * @param funcNo 70003 查询用户信息 
 // 回调函数可以改成Promise的方式
 */
export const function70003 = function(paramMap) {
	let param = {
		funcNo: '70003'
	};
	Object.assign(param, paramMap);
	return new Promise((resolve, reject) => {
		callMessageNative(param, function(){
			if(res && res.error_no == 0){
				resolve(res)
			}else {
				reject(res)
			}
		});
	})
};
/*
 * @param funcNo 70004 跳转app登录页
 */
export const function70004 = function(paramMap) {
	let param = {};
	param["funcNo"] = "70004";
	param["moduleName"] = paramMap.moduleName;
	let result = callMessageNative(param);
	return result;
};
/**
 * @param funcNo 50010 获取app 应用版本号
 */
export const function50010 = function(paramMap, callback) {
	let param = {};
	param["funcNo"] = "50010";
	let result = callMessageNative(param, callback);
	return result;
};

/**
 * @param funcNo 60350 登录
 */
export const function60350 = function(paramMap, callback) {
	let param = {
		funcNo: '60350',
		loginType: '1'
	};
	Object.assign(param, paramMap);
	let result = callMessageNative(param, callback);
	return result;
};
