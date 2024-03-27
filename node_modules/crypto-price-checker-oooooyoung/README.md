# crypto-price-checker
区块链价格实时获取工具包
Blockchain token price real-time acquisition toolkit

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You will need to have [nodejs](https://nodejs.org/en/) installed in order to run. You will also need npm but this is installed with nodejs.

### Installing

First you will clone or download this repository, then open your favorite text editor, mine is [vscode](https://code.visualstudio.com/). Then open up the console and do the following command.

```
npm install
```

Now you will need to get an api key from [cryptocompare](https://min-api.cryptocompare.com/) for free. All recieve your discord bot token from the [discord developer portal](https://discordapp.com/developers/applications). Once you recieve those items put them inside the config.json file.

## Running the tests

Try running it now with this simple command inside the console.

```
node index.js
```

## Use

Para comenzar a utilizar crypto-price.js, simplemente importa el paquete en tu proyecto y llama a las funciones disponibles. Aquí tienes un ejemplo de cómo obtener el precio de Bitcoin (BTC) en dólares estadounidenses (USD):

```js
const getCryptoPrice = require('crypto-price-checker-oooooyoung');

(async () => {
  try {
    const tokenPrice = await getCryptoPrice('BTC');
    console.log(tokenPrice);
  } catch (error) {
    console.error(error);
  }
})();
```

## Deployment

If you would like to run this 24/7 off your personal machine I would reccomend using the free credit given with google cloud, and create a server. You can make sure it runs all the time with a npm package named PM2 which will restart if errors or crashes happen.

## Built With

* [Nodejs](https://nodejs.org/en/) - Javascript Runtime Environment
* [NPM](https://www.npmjs.com/) - Node Package Manager
* [CryptoCompare](https://www.cryptocompare.com/) - Crypto API
* [Node Fetch](https://www.npmjs.com/package/node-fetch) - Data Fetching

## Authors

* **oooooyoung** - [Twitter](https://twitter.com/ouyoung11)
