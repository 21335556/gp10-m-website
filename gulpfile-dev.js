// const gulp = require('gulp')
const { src, dest, series, parallel,watch } = require('gulp')
const gulpWebserver = require('gulp-webserver')
const webpackStream = require('webpack-stream')
const path = require('path')
const gulpSass = require('gulp-sass')
const proxy = require('http-proxy-middleware')     //代理模块
const del = require('del')



// 移动libs中不需要压缩或其他操作的文件
function copyLibs() {
  return src('./src/lib/**/*')
  .pipe( dest('./dev/libs') )
}

function copyimages() {
  return src('./src/images/**/*')
  .pipe( dest('./dev/images') )
}

function copyicons() {
  return src('./src/icons/**/*')
  .pipe( dest('./dev/icons') )
}

// 复制index.html文件
function copyhtml() {
  return src('./*.html')
  .pipe(dest('./dev/'))
}

// 服务器搭建
function webserver() {
  return src('./dev/')
  .pipe( gulpWebserver({
    host:'localhost',
    port: 8090,
    livereload : true,
    middleware: [           //代理
      proxy('/api', {     //代理到指定网页    api作为标记 一起拿到指定的网址上
        target: 'https://m.lagou.com',
        changeOrigin: true,     // 解决访问域名不同，配置 布尔
        pathRewrite: {
          '^/api' : ''
        }
      }),
      proxy('/fe/api', {     //代理到指定网页    api作为标记 一起拿到指定的网址上
        target: 'http://localhost:3000',
        changeOrigin: true,     // 解决访问域名不同，配置 布尔
        pathRewrite: {
          '^/api' : ''
        }
      }),
      // 自己做出接口
      proxy('/json',{
        target: 'http://localhost:9000',
        pathRewrite: {
          '^/json': ''
        }
      })
    ]
  }) )
}

// 编译JS模块
function packjs() {
  return src('./src/**/*')
  .pipe( webpackStream({
    mode: 'development',
    // mode: 'production',        //自动压缩js
    
    entry: {      //字符串，数组，对象
      app: ['./src/app.js'],
      'app-search': ['./src/app-search.js'],
      'app-profile': ['./src/app-profile.js']
    },
    output: {
      filename: '[name].js',    //[name] == app
      path: path.resolve(__dirname,'./dev/')   //path插件包
    },
    // 将es6 以及 es8 代码  转成 es5
    module: {
      rules: [
        {
          test : /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'       //控制es6 es8 
          }
        },
        {
          test: /\.html$/,
          loader: 'string-loader'
        }
      ]
    }
  }) )
  .pipe( dest('./dev/scripts') )
}

// 编译CSS模块  转译sass
function packCSS() {
  return src('./src/styles/*.scss')
  .pipe( gulpSass().on('error',gulpSass.logError) )   //on方法 当sass文件出现错误会抛出
  .pipe( dest('./dev/styles') )
}

function clear(target) {
  return function () {
    return del(target)
  }
}

// watch任务  自动监视任务
function watcher() {
  watch('./src/images/**/*',series(clear('./dev/images'),copyimages))
  watch('./src/icons/**/*',series(clear('./dev/icons'),copyicons))
  watch('./src/libs/**/*',series(clear('./dev/Libs'),copyLibs))
  watch('./*.html',series(clear('./dev/*.html'),copyhtml))
  watch('./src/styles/**/*',series(clear('./dev/styles'),packCSS))
  watch(['./src/**/*','!src/libs**/*','!src/styles/**/*','!src/images/**/*','!src/icons/**/*'],series(packjs))
}


exports.default = series(parallel(packjs,packCSS,copyLibs,copyimages,copyicons),copyhtml,webserver,watcher);    //node中的私有作用域
