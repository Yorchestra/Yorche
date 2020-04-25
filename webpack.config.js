const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
        music: './src/music/index.js', //二つ目のエントリーポイント
        games: './src/games/index.js'
    },
    output: {
        filename: '[name].bundle.js', //[name]はエントリーポイント名
        path: path.join(__dirname, 'public') //絶対パス
    },
    module: {
        rules: [
            {
                test: /\.(vert|frag)$/,
                exclude: /node_modules/,
                use: [
                    'raw-loader'
                ]
            }
        ]
    }
}