const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    // 设置垫脚片,设置js入口
    entry: {
        index: './resource/js/index.js',
        editor: './resource/js/editor.js',
        login:'./resource/js/login.js'
    },
    devtool: '#source-map',
    plugins: [
        new VueLoaderPlugin()
    ],
    // 设置 js 输出位置
    output: {
        path: path.resolve(__dirname, '../app/public/javascripts/'),
        filename: '[name].min.js'
    },
    resolve: {alias: {'vue': 'vue/dist/vue.js'}},
    mode: 'development',
    module: {
        rules: [
            // 解决加载css资源
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            // 解决加载图片资源
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            // 解决加载 less资源
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader' // 3. 通过js 以内联样式 插入到页面中
                }, {
                    loader: 'css-loader' // 2. 把css 转化到 js
                }, {
                    loader: 'less-loader' // 1. 把less编译成css
                }]
            },
            // 支持vue的加载
            {
                test: /\.vue$/,
                use: ['vue-loader']
            }
        ]
    }
};