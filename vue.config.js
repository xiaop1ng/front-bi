const path = require('path')
var pkg = require('./package.json')
const webpack = require('webpack')

function resolve(dir) {
    return path.join(__dirname, '.', dir)
}

let _config = {
    entry: {
        app: './src/main.js'
    }
}
//开发生产通用基本项
_config.base = {
    //路由前缀
    publicPath: '/'+ pkg.name +'/views/',
    //打包输出路径
    outputDir: 'dist/'+ pkg.name +'/views',
    //主页输出路径,相对于outputDir
    indexPath: 'index.html',
    //使用vue的运行编译版本
    runtimeCompiler: false,
    //文件名加哈希值
    filenameHashing: true,
    //开启eslint代码规范检测
    lintOnSave: true,
    //打包生成生产环境sourceMap文件
    productionSourceMap: true,
    //需要bable编译的npm模块
    transpileDependencies: [
        'thinkive-hvue',
        '_thinkive-hvue'
    ]
}
//设置别名
_config.alias = {
    //thinkive-hvue start
    'config': 'src/config.js',
    'store': 'src/store/index.js',
    'router': 'src/router/index.js',
    'netIntercept': 'src/service/netIntercept.js',
    'nativeCallH5': 'src/nativeShell/nativeCallH5.js',
    'h5CallNative': 'src/nativeShell/h5CallNative.js',
    //thinkive-hvue end
}
//开发环境配置
_config.dev = {
    devServer: {
        //浏览器控制台输出
        clientLogLevel: 'warning',
        //开启gzip压缩
        compress: true,
        hot: true,
        // host: '0.0.0.0',
        // port: 8080,
        useLocalIp: true,
        //自动打开浏览器
        open: false,
        overlay: {
            warnings: false,
            errors: true
        },
        watchOptions: {
            poll: false
        },
        //跨域请求代理
        proxy: {
            '/api': {
                target: 'http://106.52.167.42:8080',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        disableHostCheck: true,
    },
    css: {
        //提取组件css为单独文件
        //MiniCssExtractPlugin暂不支持热更新, 开发模式不提取
        extract: false,
        sourceMap: false,
        modules: false
    },
    //webpack环境变量
    webpackEnv: {
        SERVER_URL: process.env.npm_config_server ? JSON.stringify('/api/') : JSON.stringify('/api/'),
        WEBSOCKETBASHPATH: JSON.stringify('./public/websocket/'),
    }
}
//生产环境配置
_config.build = {
    css: {
        //提取组件css为单独文件
        extract: {
            filename: 'css/[name].[contenthash:10].css',
            chunkFilename: 'css/[name].[contenthash:10].css'
        },
        sourceMap: false,
        modules: false
    },
    //压缩gzip
    isGzip: true,
    //生产打包删除console.log
    delConsoleLog: true,
    //webpack环境变量
    webpackEnv: {
        SERVER_URL: JSON.stringify('/'),
    }
}

module.exports = Object.assign({
    devServer: _config.dev.devServer,
    css: process.env.NODE_ENV === 'production' ? _config.build.css : _config.dev.css,
    configureWebpack: config => {
        //入口文件
        config.entry = _config.entry;
        //项目模块名-webpack环境变量
        config.plugins.push(new webpack.DefinePlugin({
            MODULE_NAME: JSON.stringify(pkg.name),
        }))
        //开发环境
        if(process.env.NODE_ENV !== 'production'){
            config.plugins.push(new webpack.DefinePlugin(_config.dev.webpackEnv))
        }
        //生产环境
        else {
            config.plugins.push(new webpack.DefinePlugin(_config.build.webpackEnv))
            //把webpack runtime 插入index.html中，减少请求
            const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
            config.plugins.push(new ScriptExtHtmlWebpackPlugin({
                inline: /(runtime|styles)\..*\.js$/
            }))
            //js压缩-minimizer选项
            //webpack4后已改为使用terser-webpack-plugin插件
            //vuecli3默认的压缩配置在依赖中：@vue/cli-service/lib/config/terserOptions
            Object.assign(config.optimization.minimizer[0].options.terserOptions.compress, {
                warnings: false,
                drop_debugger: true,
                drop_console: _config.build.delConsoleLog,
                pure_funcs: ['console.log']
            })

            Object.assign(config.optimization, {
                //把webpack runtime单独提取出来
                runtimeChunk: 'single',
                splitChunks: {
                    automaticNameDelimiter: '-',
                    chunks: 'initial',
                    //拆分文件大小下限（未压缩前的js文件大小）
                    minSize: 60000,
                    cacheGroups: {
                        default: false,
                        vendor: {
                            test: /[\\/]node_modules[\\/].+(?<!css)$/,
                            name: 'vendor',
                            priority: 40,
                            chunks: 'initial',
                            reuseExistingChunk: true
                        },
                        'vendor-hui': {
                            test: /[\\/]node_modules[\\/](thinkive-hui).+(?<!css)$/,
                            name: 'vendor-hui',
                            priority: 50
                        },
                        common: {
                            name: 'common',
                            minChunks: 2,
                            priority: -10,
                            chunks: 'initial',
                            reuseExistingChunk: true
                        },
                        styles: {
                            test: module => module.nameForCondition && /\.(s?css|vue|less)$/.test(module.nameForCondition()) && !/^javascript/.test(module.type),
                            name: 'styles',
                            chunks: 'all',
                            priority: 1,
                            enforce: true,
                            reuseExistingChunk: true
                        },
                    }
                }
            })

            //gzip压缩
            if(_config.build.isGzip){
                const CompressionWebpackPlugin = require('compression-webpack-plugin')
                config.plugins.push(new CompressionWebpackPlugin({
                    filename: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: new RegExp('\\.(' +['js', 'css', 'html'].join('|') +')$'),
                    threshold: 2048,
                    minRatio: 0.8,
                    cache: true,
                    deleteOriginalAssets: false
                }))
            }
            // npm run build --report 构建加上参数 --report生成包文件分析页面
            if(process.env.npm_config_report){
                const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
                config.plugins.push(new BundleAnalyzerPlugin())
            }
            //config.plugins.push(new MiniCssExtractPluginCleanup(/styles.*\.js$/))
        }
    },
    chainWebpack: config => {
        //移除 prefetch 插件
        //如果有需要 prefetch, 可以在路由引入时，用内联注释方式注明
        //import(/* webpackPrefetch: true */ './someAsyncComponent.vue')
        config.plugins.delete('prefetch')
        config.plugin('html').tap(options => {
            options.excludeChunks = ['runtime', 'styles']
            return options
        });
        //webpack runtime插入index.html后，删除预加载runtime文件
        config.plugin('preload').tap(options => {
            Object.assign(options[0], {
                fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\S*\.js$/, /styles\S*\.js$/]
            })
            return options
        })
        //设置别名
        for (let key in _config.alias) {
            config.resolve.alias.set(key, resolve(_config.alias[key]))
        }
        
        //设置转换成base64的图片大小上限(bit)
        config.module.rule('images')
            .use('url-loader')
            .loader('url-loader')
            .tap(options => {
                options.limit = 500
                return options
            });
        config.module.rule('media')
            .use('url-loader')
            .loader('url-loader')
            .tap(options => {
                options.limit = 50
                return options
            });
        config.module.rule('fonts')
            .use('url-loader')
            .loader('url-loader')
            .tap(options => {
                options.limit = 50
                return options
            });
        config.module.rule('svg')
            .use('file-loader')
            .loader('file-loader')
            .tap(options => {
                options.limit = 50
                return options
            });

        //image(jpg,gif,png)压缩配置项，各参数已经测试校验过，保证压缩与质量比例最优.
        //如需更改，请先行熟悉各参数项的意义
        config.module.rule('images')
            .use('image-webpack-loader')
            .loader('image-webpack-loader')
            .options({
                mozjpeg: {
                    progressive: true,
                    quality: 92
                },
                gifsicle: {
                    interlaced: true,
                    optimizationLevel: 3
                },
                optipng: {
                    enabled: false
                },
                pngquant: {
                    quality: [0.70, 0.92],
                    speed: 4
                }
            })
            .end()
         
    }
}, _config.base)
