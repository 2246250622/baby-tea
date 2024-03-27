
const axios = require('axios');

async function getWalletFirstActiveTime(walletAddress, blockchainType) {
    let apiUrl = '';
    try {
        switch (blockchainType) {
            case 'BTC':
                apiUrl = `https://blockchain.info/rawaddr/${walletAddress}`;
                const btcResponse = await axios.get(apiUrl);
                // 假定返回的第一个交易时间为首次活跃时间
                return btcResponse.data.txs[0].time;
            case 'ETH':
                apiUrl = `https://api.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&sort=asc&apikey=YourAPIKey`;
                const ethResponse = await axios.get(apiUrl);
                // 假定返回的第一个交易时间为首次活跃时间
                return ethResponse.data.result[0].timeStamp;
            case 'SOL':
                apiUrl = `https://public-api.solscan.io/account/${walletAddress}`;
                const solResponse = await axios.get(apiUrl);
                // 假定返回的创建时间为首次活跃时间
                return solResponse.data.createdTime;
            default:
                throw new Error('Unsupported blockchain type');
        }
    } catch (error) {
        console.error(\`Failed to fetch wallet first active time: \${error}\`);
        throw error;
    }
}

module.exports = getWalletFirstActiveTime;
