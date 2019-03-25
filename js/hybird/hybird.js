// app从0到1的过程中。前端和native需要提前讨论好基础功能建设。
   webview交互规范
1. 首先内嵌h5页面和native的交互：常用场景： 获取用户登录、设备、版本号信息；分享，关闭webview,
   获取信息方案：从cookie中获取，需要设置域名白名单，对指定域名注入cookie。缺点：本身cookie存储的信息量有限制，并且新业务依赖于发版，需要添加新域名
             ：通过jsBridge方法，native注入全局对象，并挂载相应的函数，提供给h5调用，并通过callback把h5需要的数据回流给h5,,通过callback。比如小黑鱼的BFBridge.getMemberInfo(JSON.stringify({callback, appid})); 然后在window上注册callback, native那边调用callback,把用户信息通过参数传过来

2. app提供给链接中的参数。
   场景：页面在打开之前需要处理的一些逻辑，隐藏导航栏，手机通知栏网络图标颜色变化，是否需要回退按钮
   比如页面链接url?canback=true&hideNavigation=1&statusBarStyle=1/2/3/4(1透明黑子，2-透明白字，3-白底黑字，4-黑底白字)

3. jsbridge方法，native提供给js的方法
   BFBridge.scanCode: 扫码。
   BFBridge.login: 登录
   BFBridge.takePicture: 获取照片
   BFBridge.close; 关闭webview
   BFBridge.sign:接口加签
   总之，约定的jsbridge方法明确好规范：两个参数，一个是参数，一个是callback, native通过callback把参数返回给h5

4.大账户的路由规则
  统一路由到：FinanceRouter, native页面跳转native页面,使用原生页面跳转方式，intent跳转
                           native页面跳转到h5页面，统一交给toPage方法。toPage接受三种参数，一个是Uri对象/url/对象（该对象里包含了要打开内容的一些属性，比如是要打卡图片还是纯文本还是pdf,如果是这三种类型之一，则再走具体的toImage, toPdf, toText）
                           h5跳转native页面： {
                             通过jsbridge方法：场景：跳登录页
                             通过混合协议跳转：blackfish://hybird/page/模块名/页面名?parameter表示打开某个页面
                                            blackfish://hybird/action/执行某个操作
                           }

                           外部唤起app并打开某个页面，执行混合协议，在首页做跳转逻辑，走上面的那个跳转逻辑

            疑问：如果native页面跳转后，打开了h5页，h5页面在h5的堆栈里跳来跳去，当h5回退到最后一个h5的时候，再回退，能回退到进入h5的那个native页面吗
                 如果native页面跳转到h5，h5跳来跳去，再跳到native

            看了下美团的WMROUTER,阿里的ARouter

5.外部路由
  走混合协议，比如app打开，设置定时器，先调用混合协议尝试唤起，如果2s内换不起，则跳转到对应平台上的下载页。因为ios换不起的话会弹出一个错误弹窗，避免不了
  另外一种方案，走通用协议app唤起。如果换不起，则直接load这个页面了，因为是通用协议，http或者https，则可以打开页面


看了安卓开发相关的东西：RelativeLayout, LinearLayout, 自定义view，findViewById（获取某个控件）, setOnClickListener(设置监听器)





                           
