const utilB = require('./js/utilB');
const jquery = require('jquery');
console.log(utilB);

// 异步加载
const utilC = () => require.ensure(['./js/utilC'], function(require) {
  console.log(require('./js/utilC'));
});

jquery('div').on('click', function() {
  utilC();
});