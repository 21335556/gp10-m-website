// const gulp = require('gulp')
const { src, dest, series, parallel} = require('gulp')
const webpackStream = require('webpack-stream')
const path = require('path')
const gulpSass = require('gulp-sass')
const rev = require('gulp-rev')
const revCollector = require('gulp-rev-collector')


// 移动libs中不需要压缩或其他操作的文件
function copyLibs() {
  return src('./src/lib/**/*')
  .pipe( dest('./dist/libs') )
}

function copyimages() {
  return src('./src/images/**/*')
  .pipe( dest('./dist/images') )
}

function copyicons() {
  return src('./src/icons/**/*')
  .pipe( dest('./dist/icons') )
}

// 复制index.html文件
function copyhtml() {
  return src('./index.html')
  .pipe(dest('./dist/'))
}

// 编译JS模块
function packjs() {
  return src('./src/**/*')
  .pipe( webpackStream({
    mode: 'development',
    // mode: 'production',        //自动压缩js
    
    entry: {      //字符串，数组，对象
      app: './src/app.js'
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
            loader: 'babel-loader',       //控制es6 es8 
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-transform-runtime']
            }
          }
        },
        {
          test: /\.html$/,
          loader: 'string-loader'
        }
      ]
    }
  }) )
  .pipe( rev() )
  .pipe( dest('./dist/scripts') )
  .pipe( rev.manifest() )
  .pipe( dest('./rev/scripts') )
}

function revColl() {
  return src(['./rev/**/*.json','./dist/*.html'])
  .pipe(revCollector())
  .pipe(dest('./dist'))
}

// 编译CSS模块  转译sass
function packCSS() {
  return src('./src/styles/app.scss')
  .pipe( gulpSass().on('error',gulpSass.logError) )   //on方法 当sass文件出现错误会抛出
  .pipe(rev())
  .pipe( dest('./dist/styles') )
  .pipe( rev.manifest() )
  .pipe( dest('./rev/styles') )
}


exports.default = series(parallel(packjs,packCSS,copyLibs,copyimages,copyicons),copyhtml,revColl)    //node中的私有作用域


