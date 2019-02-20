// 记录浏览器或者webview的兼容性问题
1. File inputs need real clicks on iOS 6： https://blog.csdn.net/soft_z1302/article/details/83104461
只有ios上会有输入框必须要真实点击才可以，touch触发不了input的聚焦事件，唤不起键盘
安卓上不会有，因为安卓webview不会出发ontouchend事件
移动端点击触发的顺服ontouchstart  ---> ontouchend  ---> click

https://github.com/ftlabs/fastclick/issues/551, 解决方法

2.Android webview 直接呼起微信和支付宝的成功率不高，大体两种思路解决
 浏览器打开
 app做一些处理
  支付宝：https://docs.open.alipay.com/203/107091/
  微信：https://blog.csdn.net/fuzhongbin/article/details/77162010