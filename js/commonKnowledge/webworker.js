
postMessage("I m working before postmessage");

onmessage = function(e) {
  console.log('accept main thread message\n', e);
}