const sum = require('./sum.js');

test('test 1 plus 2 result', () => {
  expect(sum(1,2)).toBe(3);
})

test('test 2 plus 2 should equal 4', () => {
  expect(sum(2,2)).toBe(4);
});

test('object assignment', () => {
  const data = {one: 1};
  data['two'] = 2;
  expect(data).toEqual({one:1, two:2});
})

test('object is null', () => {
  const a = null;
  var b;
  expect(a).toBeNull();
  // expect(a).toBeUndefined();
  // expect(b).toBeDefined();
})

test('there is no I in team', () => {
  expect('team').not.toMatch(/I/);
});


const shoppingList = [
  'diapers',
  'kleenex',
  'trash bags',
  'paper towels',
  'beer',
]
test('the shopping list has beer on it', () => {
  expect(shoppingList).toContain('beer');
});


// 测试异步流程
