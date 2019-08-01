module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? 'https://res.cogobuy.com/supplyChain/p' : '',
    devServer: {
        // 设置代理
        proxy: {
            '/api': {
            // 目标 API 地址
            // target: 'http://192.168.58.49:8100/',
                target: 'http://192.168.8.54:8100/',
            // 如果要代理 websockets
            // ws: true,
            // 将主机标头的原点更改为目标URL
            // changeOrigin: false,
            },
        },
    },
};
