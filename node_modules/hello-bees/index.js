const cowsay = require('cowsay');
function helloWorldBees() {
  console.log(cowsay.say({ text: "hello world", f: "bees" }));
}
module.exports = helloWorldBees;
