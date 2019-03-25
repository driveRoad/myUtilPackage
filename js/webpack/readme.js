1. 什么是长缓存？ 在webpack中如何做到长缓存优化？
浏览器在用户访问页面的时候，为了加快加载速度，会对用户访问的静态资源进行缓存，但是每一次代码升级或是更新，都需要浏览器去下载新的代码，最方便和简单的更新方式就是引入新的文件名称。在webpack中可以在output输出文件指定chunkhash, 并且分离经常更新的代码和框架代码。通过NameModulesPlugin或是HashedModulesPlugin使打包文件名不变


2. 性能优化考虑的点
  webpack4.0放弃了commonschunkplugin,
  2.1: 减少http请求包的大小。这个在webpack中通过code split可以进行把一个bundle分割成多个chunks
       但这也不是绝对的, 当分出来的包小的时候，就没必要分出来，反而多出来了一次http请求
       
