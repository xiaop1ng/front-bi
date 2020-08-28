var origin = "http://wx.stocke.com.cn:8092";

const config = {
	//请求签名所需参数对象
	ssoSign: {
		merchant_id: 'financeweb',    //商户id
		//后端给的加签key再用signEncrypt方法加密后的key
		sign_key: 'OdDd+M4OHraSurI5/yRW3i1DohAZihnuvYOlohQ3r1DjyFimJqJy1w==',
		corp_id: '101000000001',   //统一账户公司编号
		app_id: '102000000001',   //统一账户应用编号
		encrypt_mode: '',  //请求参数加密模式: aes, des, base64. 默认base64.
		encrypt_key: '',
		sign_version: '1.0'   // 加签名方法的版本，可与后端确定版本号。version: '1.0' or '2.0'
	},
	ssoSignNew: {
		sign_key: 'm53TzVkpa0OB4+zAawoUDxf+gYmPfy77/5HYbJ6oKHEKcZ264wPVjw==',
		company_id: 'THINKIVE',   //公司id
		system_id: 'TAMP',     //系统id
		encrypt_mode: 'none',   //请求参数加密模式: aes, des, base64, none. 默认base64
		encrypt_key: '',
		system_version: '1.0.2',  //系统版本, 这个值固定 '1.0.2'
		sign_version: '2.0'  // 加签名方法的版本，可与后端确定版本号。version: '1.0' or '2.0'
	},
	//session数据保存到app内存中, true/false, 默认false
	sessionSaveToApp: false,
	//开启session数据保存到app内存中选项后，需要配置此项来过滤存储的key, 
	//配置在数组中key才会存在app内存中
	sessionKeyToApp: [],
}

window.$hvue = { config }
export default config