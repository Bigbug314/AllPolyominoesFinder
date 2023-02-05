const path = require('path')

module.exports = {
    mode: 'development',
    entry: [
        './src/index.js'
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'database.js',
        libraryTarget: 'var',
        library: 'database'
    },
    watch: true,
    experiments: {
        topLevelAwait: true
    }
}