//publicPath - это изначальная папка откуда будут браться файлы
module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
    ? ''
    : '/',
    assetsDir: 'assets',//куда сложатся все файлы
    productionSourceMap: false,//чтобы убрать лишние js файлы
    // filenameHashing: false //отключает хеширование файлов названий
}