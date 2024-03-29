const cowsay = require('cowsay');
function helloWorldArmadillo() {
  console.log(cowsay.say({ text: "hello world", f: "armadillo" }));
}
module.exports = helloWorldArmadillo;
