const esprima = require('esprima');
let code = 'const a = 1';
const ast = esprima.parseScript(code);
const astfunraverse = esprima.parseScript(astfun);
const estraverse = require('estraverse');

estraverse.traverse(ast, {
  enter: function(node) {
  	node.kind = 'var';
  }
});

console.log(ast);

const escodegen = require('escodegen');
const transformCode = escodegen.generate(ast);

console.log(transformCode);
