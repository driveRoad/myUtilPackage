const inputObj = document.getElementById('input');
const messages = document.getElementById('messages');

//监听input 的键盘事件
inputObj.addEventListener('keypress', (event) => {
  //检查是否按下enter键
  if(event.keyCode === 13) {
    //检查字段是否有效
    if(input.validity.valid) {
      //使用该值创建dom元素
      const message = createMessage(input.value);

      // 将新创建的DOM元素天骄到消息列表
      messages.appendChild(message);

      //清空input中的内容
      input.value = '';

      //滚动到消息列表的底部
      messages.parentNode.scrollTop = messages.parentNode.scrollHeight;
    }
  }
})

function createMessage(value) {
  return stringToDom(`<li><div class="message">${value}</div></li>`)
}

//将字符串转换为真实的dom
function stringToDom (str) {
  const template = document.createElement('template');
  template.innerHTML = str.trim();
  return template.content.firstChild;
}


// 也就是说position: relative不会生成bfc