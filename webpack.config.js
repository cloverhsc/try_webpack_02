var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
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
    // add our plugin and produce a html file automatically.
    plugins:[
        new HtmlwebpackPlugin({
            title: 'Hello World app'
        })
    ],

    devServer:{
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
    }
};
