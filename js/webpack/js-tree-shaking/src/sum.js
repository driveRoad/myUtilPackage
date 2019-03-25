import lodash from 'lodash';

var aaa = function() {
  console.log('sum');
}

var isArray = function(arg) {
  
  console.log(lodash.isArray(arg));
}

export {
  aaa,
  isArray
};