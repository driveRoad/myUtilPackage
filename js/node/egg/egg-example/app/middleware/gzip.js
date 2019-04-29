module.exports = (options, app) => {
  return async function gzip(ctx, next) {
    console.log('gipz 中间件开始了');
    console.log(options);
    await next();
  }
}