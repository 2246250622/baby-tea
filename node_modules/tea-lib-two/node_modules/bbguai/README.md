
# BBguai - Blockchain Wallet BaZi Calculator

## Introduction

BBguai is a novel npm package designed to bridge the ancient wisdom of Chinese astrology with the modern world of cryptocurrency. It uniquely calculates the Chinese Zodiac, also known as BaZi or the Four Pillars of Destiny, based on the first active time of cryptocurrency wallets. This innovative tool supports Bitcoin (BTC), Ethereum (ETH), and Solana (SOL) wallets, offering users and developers alike a fresh perspective on their digital assets.

## Features

- **Support for Multiple Blockchains**: Calculate the BaZi for wallets on Bitcoin, Ethereum, and Solana networks.
- **First Active Time Detection**: Determines a wallet's "birth time" by querying its first transaction on the blockchain.
- **Chinese Zodiac Calculation**: Utilizes the wallet's first active time to calculate its corresponding BaZi, providing insights into its character and potential fortunes.

## Usage

BBguai is easy to integrate into your existing JavaScript projects. After installing the package, you can simply import it and start querying the BaZi of various cryptocurrency wallets.

### Installation

```bash
npm install bbguai
```

### Example

```javascript
const bbguai = require('bbguai');

async function displayWalletBaZi(walletAddress, blockchainType) {
    try {
        const bazhi = await bbguai.getWalletBirthChart(walletAddress, blockchainType);
        console.log(bazhi);
    } catch (error) {
        console.error("Failed to calculate wallet's BaZi:", error);
    }
}

displayWalletBaZi('YourWalletAddressHere', 'ETH');
```

## Contributing

Contributions are welcome! If you have ideas for improvements or encounter any issues, please feel free to open an issue or submit a pull request on GitHub.

## License

BBguai is released under the MIT license. See the LICENSE file for more details.

## Acknowledgements

This project was created by Tastygeek. Special thanks to the open-source community and the various APIs that made this project possible.
