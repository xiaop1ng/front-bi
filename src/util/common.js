import service from '@/service/mobileService'
import { getSession, setSession, clearSession, getUrlParams, isFunction } from 'thinkive-hvue'
import wx from 'weixin-js-sdk'
import IosAndorid from '@/util/iosAndroid'
// 初始化方法


// 关闭当前应用
var exit = function () {
    let channel = getSession('channel')
    if (channel == '0') {
        wx.closeWindow();
    } else if (channel == '1') {
        // TODO: App 关闭当前应用
        IosAndorid.goBackAction({
            "type": 'component'
        });	
    }
}

// 初始化渠道
var initChannel = function () {

    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") { //在微信中打开
        // qq or qq 浏览器
        if ( /qq\//i.test(navigator.userAgent) ) {
            console.debug('qq channel');
            return
        }
        setSession('channel', '0'); // WEIXIN
        return '0'
    } else {
        IosAndorid.checkJsBridge();
        setSession('channel', '1'); // APP
        return '1'
    }
}

// 获取活动信息
var activityInfo = function(callback) {
    let act_id = getUrlParams(null, 'act_id')
    let cacheActInfo = getSession('act_info');
    console.log('[cacheAct]' + cacheActInfo)
    if (cacheActInfo && !act_id) {
        
        callback();
        return;
    }
    console.log('activityInfo invoke!')
    
    if (!act_id) {
        act_id = getSession('act_id')
    }
    service.aliveActivity({version: 'common', act_id: act_id}).then(res => {
        console.log("存活的活动", res)
        if (res.error_no == 0 && res.results && res.results.length > 0) {
            let actInfo = res.results[0]
            setSession('act_info', actInfo)
            setSession('act_id', actInfo.act_id)
        } else {
            clearSession('act_info')
            clearSession('act_id')
        }
        callback()
    })
}

// 登录用户信息 callback 响应用户信息或者错误信息（登录失败）
var login = function (callback) {
    
    let channel = getSession('channel');
    let act_id = getSession('act_id');
    if (!act_id) {
        if ( isFunction(callback) ) {
            callback()
        }
        return
    }
    
    if (channel && channel != '0' && channel != '1') {
        channel = initChannel();
    }


    if (channel == '0') {
        // wx
        let openid = getUrlParams(null, 'openid')
        console.log('openid', openid)
        if (!openid) {
            openid = getSession('openid')
        }
        if (!openid) {
            toAuthorizationUrl()
            return
        }
        var from = getUrlParams(null, 'from');
        if (from && from != '') {
            toAuthorizationUrl();
            return;
        }
        setSession('openid', openid)
        let param = {
            open_id: openid,
            act_id: act_id
        }
        service.loginOrRegist(param).then(res => {
            if (res.error_no == 0) {
                let ret = res.results[0]
                if (ret) {
                    if (ret.nick_name && ret.nick_name.length > 5) {
                        ret.nick_name = ret.nick_name.substring(0, 5)
                    }
                    setSession('user_info', ret)
                }
            }

            if (isFunction(callback)) {
                callback(res)
            }
        })

    } else if (channel == '1') { 
        // app
       IosAndorid.getClientInfo ({
            info_type: "hq",
            call_type: "login",
            callback_url: $hvue.config.wxShareLink,
            key_type: "zs_sdweb"
        }, function(res) {
            console.log("res", res)
            if (res.login_status && res.param) {
                var param = {
                    act_id: act_id,
                    param: res.param
                }
                service.loginOrRegist(param).then(res => {
                    if (res.error_no == 0) {
                        let ret = res.results[0]
                        if (ret) {
                            if (ret.nick_name && ret.nick_name.length > 5) {
                                ret.nick_name = ret.nick_name.substring(0, 5)
                            }
                            setSession('user_info', ret)
                        }
                    }
        
                    if (isFunction(callback)) {
                        callback(res)
                    }
                });
            }
        })
            

    } else {
        // 其他渠道，不处理
    }
}

var browser = {
    versions: function () {
        var u = navigator.userAgent,
            app = navigator.appVersion;
        return { //移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}

var wxShareFlag = false;

var share = function () {
    var channel = getSession('channel');
    if (channel == '0') {
        // wx
        this.$tip('点击右上角`...`按钮，分享给你的朋友吧');
    } else if (channel == '1') {
        // app
        appShare();
    }
}

var appShare = function() {
    var user_info = getSession('user_info');
    var act_id = getUrlParams(null, 'act_id')
    if (!act_id) {
        act_id = getSession('act_id')
    }
    
    // app
    IosAndorid.share({
        type: '1',
        title: $hvue.config.shareTitle,
        content: $hvue.config.shareDesc,
        url: $hvue.config.wxShareLink + "?share_account_id=" + user_info.account_id + "&act_id=" + act_id,
        bmpRes: '1',
        bmpUrl: $hvue.config.shareImgUrl,
    });
    
}

// 微信分享
var initWxShare = function () {
    var channel = getSession("channel");
    if (channel != '0') {
        // 非微信端
        return;
    }
    let url= getSession("first_url");
    if(url==undefined||(!browser.versions.ios&&!browser.versions.iPhone&&!browser.versions.iPad)){
        // 获取当前 url 的签名
        url = location.href;
        setSession("first_url",url);
    } else {
        // ios
    }
    let param = {
        'url': url
    }
    service.getWxJsTick(param).then(res => {
        if (res.error_no == 0) {
            var results = res.results[0];
            var act_id = getUrlParams(null, 'act_id')
            if (!act_id) {
                act_id = getSession('act_id')
            }
            if (results != undefined) {
                
                //注入权限
                wx.config({
                    debug: false, // 开启调试模式,
                    appId: results.appid, // 必填，公众号的唯一标识
                    timestamp: results.timestamp, // 必填，生成签名的时间戳
                    nonceStr: results.nonceStr, // 必填，生成签名的随机串
                    signature: results.signature, // 必填，签名，见附录1
                    //这里是配置一些使用的微信方法
                    jsApiList: [
                        'checkJsApi',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        // 'onMenuShareQQ',
                        // 'onMenuShareWeibo'
                    ]
                });

                //初始化分享
                wx.ready(function () {
                    var slink = $hvue.config.wxShareLink + "?act_id" + act_id;
                    wx.onMenuShareAppMessage({
                        title: $hvue.config.shareTitle, // 分享标题
                        desc: $hvue.config.shareDesc, // 分享描述
                        link: slink, // 分享链接
                        imgUrl: $hvue.config.shareImgUrl, // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数 
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }

                    });

                    wx.onMenuShareTimeline({
                        title: $hvue.config.sharePyqTitle, // 分享标题
                        desc: $hvue.config.sharePyqDesc, // 分享描述
                        link: slink, // 分享链接
                        imgUrl: $hvue.config.shareImgUrl, // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });

                });
            }
        }

    })
}

// 跳转微信授权地址
var toAuthorizationUrl = function () {

    var auth_flag = getSession("auth_flag")
    if (auth_flag === true || auth_flag == "true") {
        // 正在授权, 5s 后释放
        setTimeout(function () {
            setSession("auth_flag", false);
            console.log( 'auth_flag', getSession("auth_flag") );
        }, 5000);
        return;
    }
    clearSession('first_url');
    setSession("auth_flag", true);
    window.location = $hvue.config.wx_oauth_url;
}

// 复制
var copy = function (obj) {
    return JSON.parse(JSON.stringify(obj));
}

export default {
    'exit': exit,
    'activityInfo': activityInfo,
    'login': login,
    'initChannel': initChannel,
    'initWxShare': initWxShare,
    'appShare': appShare,
    'toAuthorizationUrl': toAuthorizationUrl,
    'copy': copy,
    'share': share
}