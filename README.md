# hvue-cli3

## 简介

hvue-cli3 脚手架工程：

- 基于vue.js 官方脚手架基于vue-cli3 搭建的二次开发脚手架库。
- 使用 npm + webpack + @babel/preset-env 的工作流，支持ES2018。
- 提供配置好的vue-router, vuex, axios, core-js 模板及配置文件。
- 提供常用存取操作cookie,localStorage,sessionStorage方法, 及依赖`crypto-js`的加密方法。
- 提供基本ui组件及ajax请求调用的示例。

##与原hvue-cli脚手工程区别：
- 版本升级: `vue-cli`升级`3`; `webpack`升级到`4`
- css的提取插件更改为 `mini-css-extract-plugin`
- js的压缩插件更改为 `terser-webpack-plugin`
- 对es6支持由`babel-polyfill`改为`@babel/core-js`
- 打包支持入口页资源文件预加载
- 把`webpack runtime`文件插入`index.html`中，减少入口请求数; 并把`index.html`压缩 gzip
- 提供`typeScript`, `sass`, `less`的编译支持
- 开发启用`eslint`检查。`(后期提供通用检查规范)`
- 配置目录更改，所有配置在 `vue.config.js` 中

## 浏览器支持

> 现代浏览器和 IE9 及以上


## 工程安装启动

``` bash
# install dependencies
npm i

# serve with hot reload at localhost:8080
npm run serve

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

```
