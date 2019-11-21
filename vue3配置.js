module.exports = {
    publicPath:'./',//修改打包的相对路径(通用),
    devServer:{
        port:'8080',//配置开发环境的运行端口 ,
        proxy:{//配置跨域
            '/api':{
                //拦截项目中所有以/api开头的请求
                target:'http://192.168.99.111:30444',//定义被拦截的请求访问的真实服务器
                //地址转法时默认作为,请求地址和目标地址的拼接
                //例:http://192.168.99.111:30444/api 即:/api和target的value的拼接,后面再接不同的接口
                //还要配合重写
                pathRewrite:{//重写,把/api替换为空串
                    '^/api':''
                }
            }
        }
    },
    pwa: {//更改页面title小图标,将项目public目录下的原图标替换为新图标，名称和后缀保持不变。
        iconPaths: {
            favicon32: 'favicon.ico',
            favicon16: 'favicon.ico',
            appleTouchIcon: 'favicon.ico',
            maskIcon: 'favicon.ico',
            msTileImage: 'favicon.ico'
        }
    }
}