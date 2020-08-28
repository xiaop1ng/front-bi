/*	原生壳子调用H5方法 
	集合写在这里，供原生调用H5
*/
//var msgFunction = {}
/**
 * 公用	
 * 日期控件回调H5
 * 说明：日期控件的调用必须要写在页面UI的事件处理函数中，否则多模块开发原生无法获取到当前激活的模块从而导致无法回调H5
 * @param funcNo 50251
 * @param date String 日期 Y
 * @param selector String H5的元素选择器 N
 */
export const function50251 = function(paramMap) {
	alert(JSON.stringify(paramMap));
};

/**
 * 公用		
 * 设置系统软件的主题风格
 * @param funcNo 50104
 * @param theme String 主题颜色(见数据字典) Y 0：红色，1：蓝色，2：黑色，3：黄色，9：绿色
 */
export const function50104 = function(paramMap) {
	alert(JSON.stringify(paramMap));
};

/**
 * 公用		
 * 原生的信息提示框回调H5
 * @param funcNo 50111
 * @param flag	String	业务标志	N
 */
export const function50111 = function(paramMap) {
	alert(JSON.stringify(paramMap));
};

/**
 * 公用		
 * 通知H5分享后的状态
 * @param funcNo 50232
 * @param shareType	String	分享平台（数据字典）	Y
 * @param flag	String	分享状态（0：失败，1：成功)	Y
 * @param info	String	备注信息	N
 */
export const function50232 = function(paramMap) {
	alert(JSON.stringify(paramMap));
};

/**
 * 公用		
 * 验证手势密码中忘记密码，修改账号回调H5
 * @param funcNo 50262
 * @param type	String	类型(0：忘记密码，1：修改账号）	N
 */
export const function50262 = function(paramMap) {
	$.alert(JSON.stringify(paramMap));
};

export const function7300122 = (paramMap, callback) => {
	// 拿到原生给的参数 paramMap 做处理后把结果通过callback传回原生
	paramMap.doOver = 'yes'
	let returnValue = paramMap
	if (callback) {
		callback(returnValue)
	}
};

export const function60352 = (params) => {
    //done something
    console.log(params)
    let userData = params;
    alert(params)
    //watch->userData;
}

export const function90000 = (params, callback) => {
    //done something
    //console.log(params)
    //alert(params)
    callback && callback({'key999': '999'})
    
}