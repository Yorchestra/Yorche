const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'public/js') //絶対パス
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