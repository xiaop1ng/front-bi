import service from '@/service/mobileService'
import { getSession } from 'thinkive-hvue'

var IosAndorid = {
    checkJsBridge: function () {
        try {
            IosAndorid.connectWebViewJavascriptBridge(function (bridge) {
                bridge.init(function (message, responseCallback) {})
            })
        } catch (e) {
            var timer = setTimeout(function () {
                IosAndorid.checkJsBridge()
                clearTimeout(timer)
            }, 100)
        }
    },
    /**
     * 调用客户端方法封装函数checkJsBridge
     * @param callback function 回调函数
     */
    connectWebViewJavascriptBridge: function (callback) {
        if (window.WebViewJavascriptBridge) {
            callback(window.WebViewJavascriptBridge)
        } else {
            document.addEventListener('WebViewJavascriptBridgeReady', function () {
                callback(window.WebViewJavascriptBridge)
            }, false)
        }
    },
    // 是否安卓系统
    isAndroid: /Android/.test(window.navigator.userAgent) || /Linux/.test(window.navigator.userAgent),
    // 是否苹果手机
    isIphone: /Iphone/.test(window.navigator.userAgent) || /iPhone/.test(window.navigator.userAgent),
    /**
     * 客户端回退方法
     * @param params 调用方法的入参
     */
    goBackAction: function (params) {
        params = params ? params : {}
        try {
            IosAndorid.connectWebViewJavascriptBridge(function (bridge) {
                bridge.callHandler('goback', params, function (response) {

                })
            });
        } catch (e) {
            alert('当前版本不支持！请更新！')
        }
    },
    /**
     * 客户端打开pdf
     * @param params 调用方法的入参
     */
    getOpenPDFFun: function (params) {
        params = params ? params : {}
        try {
            IosAndorid.connectWebViewJavascriptBridge(function (bridge) {
                bridge.callHandler('HXDownloadFile', params, function (response) {

                })
            });
        } catch (e) {
            alert('当前版本不支持！请更新！')
        }
    },
    /**
     * 客户端登录方法
     * @param params 调用方法的入参
     */
    getClientInfo: function (params, successFun, errorFun) {
        params = params ? params : {}
        params.info_type = params.info_type ? params.info_type : 'wt'
        params.call_type = params.call_type ? params.call_type : 'login'
        successFun = successFun ? successFun : function () {}
        errorFun = errorFun ? errorFun : function () {}
        try {
            //	        $.alert(JSON.stringify(params));
            IosAndorid.connectWebViewJavascriptBridge(function (bridge) {
                bridge.callHandler('getUserInfoByRsa', params, function (response) {
                    if (response) {
                        successFun(response)
                    } else {
                        errorFun(new Error('用户信息查询失败!'))
                    }
                })
            })
        } catch (e) {
            params.errorFun(e)
        }
    },

    /**
     * 客户端分享方法
     * @param params 调用方法的入参
     */
    share: function (params, callback) {
        params = params ? params : {}
        try {
            IosAndorid.connectWebViewJavascriptBridge(function (bridge) {
                bridge.callHandler('hexinShare', params, function (response) {
                    console.log("[hexinShare callback!]");
                    var user_info = getSession('user_info')

                    service.shareCoin({
                        account_id: user_info.account_id,
                        act_id: getSession('act_id')
                    }).then(res => {
                  
                    });
                })
            })
        } catch (e) {
            alert('ShareError: ' + JSON.stringify(e))
        }
    }
}

export default IosAndorid