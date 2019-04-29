let simpleKoa = require('./application');
let app = new simpleKoa(); // 当前这个应用拥有contenx, 扩展的request和扩展的response


// 拿到当前请求创建的上下文
app.use(async (ctx, next) => {
  // 做业务处理
  console.log('middle 1');
  await next();
});

app.use(async (ctx, next) => {
  console.log('middle 2');
  await next();
});
app.use(async (ctx, next) => {
  // throw new Error('test error');
});
app.use(async (ctx, next) => {
  console.log('middle 3')
  ctx.body = 'hello c';
});



app.on('error', err => {
  console.log(err);
  console.log('监听到错误了');
})

app.listen(3000, () => {
  console.log('listening on 3000');
});