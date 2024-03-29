const cowsay = require('cowsay');
function helloWorldBearface() {
  console.log(cowsay.say({ text: "hello world", f: "bearface" }));
}
module.exports = helloWorldBearface;
