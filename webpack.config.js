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

module.exports = {
    // list of file . Can use file name but default will find index.js
    entry: APP_PATH,
    // output file name. A name of "bundle.js" will be produce after combine all js.
    output:{
        path: BUILD_PATH,
        filename: 'bundle.js'
    },

    devServer:{
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        proxy:{
            '/api/*':{
                target: 'http://localhost:5000',
                secure:false
            }
        }
    },

    module:{
        loaders:[
            {
                test:/\.scss$/,
                loaders:['style', 'css', 'sass'],
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
        new HtmlwebpackPlugin({
            title: 'Hello World app'
        }),
        // provide $, jQuery and window. jQuery to every script
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ]
};
