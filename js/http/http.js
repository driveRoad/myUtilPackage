// 1.content-type，在request-header中有，在response-header中也有，两者有什么用
// 在request-header中有一个accept家族，accpet:text/html, application/xml等，表示客户端能够接受的结果类型，不是这个类型的不接收
// 所以response-header中要有一个 content-type, 表示根据请求头中的type来设置应该返回的数据类型

// request-header中的content-type表示客户端要传给服务端的数据类型，即数据以什么形式提交给服务端
// 提交的类型有:application/x-www-form-urlencoded;  multipart/form-data  ; text/plain
// 表单提交以什么形式？

var http = require('http');

http.createServer( (req, res) => {
  
}).listen(18080);