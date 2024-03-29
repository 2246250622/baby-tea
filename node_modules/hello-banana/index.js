const cowsay = require('cowsay');
function helloWorldBanana() {
  console.log(cowsay.say({ text: "hello world", f: "banana" }));
}
module.exports = helloWorldBanana;
