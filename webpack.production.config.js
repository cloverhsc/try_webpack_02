var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
// postcss
var autoprefixer = require('autoprefixer');
var precss       = require('precss');
// define file paths
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH,'build');

// Template folder path
var TEM_PATH = path.resolve(ROOT_PATH, 'templates');

module.exports = {
    // list of file . Can use file name but default will find index.js
    // entry: APP_PATH,
    entry:{
        app: path.resolve(APP_PATH, 'index.js'),
        mobile: path.resolve(APP_PATH, 'mobile.js'),
        vendors: ['jquery', 'moment']
    },
    // output file name. A name of "bundle.js" will be produce after combine all js.
    output:{
        path: BUILD_PATH,
        // filename: 'bundle.js'

        //注意 我們修改了bundle.js 用一個數組[name]來代替，他會根據entry的入口文件名稱生成多個js文件，這裡就是(app.js,mobile.js和vendors.js)
        // filename: '[name].js'

        //用hash名稱的script來防止browser cache web
        filename: '[name].[hash].js'
    },

    module:{
        loaders:[
            {
                test:/\.scss$/,
                loaders:['style', 'css?sourceMap', 'sass?sourceMap'],
                include: APP_PATH
            },
            {
                test:/\.jsx?$/,
                loader:'babel',
                include: APP_PATH,
                query:{
                    presets: ['es2015']
                }
            },
            //postcss
            {
                test: /\.css$/,
                loader: "style-loader!css-loader!postcss-loader"
            }
        ],
        perLoaders:[
            {
                test:/\.jsx?$/,
                include: APP_PATH,
                loader: 'jshint-loader'
            }
        ]
    },
    // PostCSS
    postcss: function(){
        return [require('autoprefixer'), require('precss')];
    },
    jshint:{
        "esnext":true
    },
    devtool:'eval-source-amp',
    // add our plugin and produce a html file automatically.
    plugins:[
        //創建了兩個HtmlWebpackPlugin的實例，生成兩個頁面
        new HtmlwebpackPlugin({
            title: 'Hello World app',
            template: path.resolve(TEM_PATH, 'index.html'),
            filename: 'index.html',

            //chunks這個參數告訴插件要引用entry裡面的哪幾個入口
            chunks:['app', 'vendors'],

            //要把script插入到標籤裡
            inject: 'body'
        }),
        new HtmlwebpackPlugin({
            title: 'Hello Mobile app',
            template: path.resolve(TEM_PATH, 'mobile.html'),
            filename: 'mobile.html',
            chunks: ['mobile', 'vendors'],
            inject: 'body'
        }),
        
        // provide $, jQuery and window. jQuery to every script
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),

        //這個使用uglifyJs壓縮你的js代碼
        new webpack.optimize.UglifyJsPlugin({minimize: true}),

        //把entry裡面的vendor打包成vendors.js
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')

    ]
};
