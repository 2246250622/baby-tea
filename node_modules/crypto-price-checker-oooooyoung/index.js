const cc = require('cryptocompare');
global.fetch = require('node-fetch');
const config = require('./config.json');

// Initializing CC w/ Api Key
cc.setApiKey(config.apikey);

async function getCryptoPrice(tokenName = 'BTC') {
    try {
        const priceRes = await cc.priceFull(tokenName, 'usdt')
        let allData = priceRes[Object.keys(priceRes)[0]];
        let data = allData[Object.keys(allData)[0]];
        console.log({
            imageUrl: `https://www.cryptocompare.com${data.IMAGEURL.toString()}`,
            priceData: [
                { name: 'Current Price', value: data.PRICE.toString(), inline: true },
                { name: 'Market Cap', value: data.MKTCAP.toString(), inline: true },
                { name: 'Supply', value: data.SUPPLY.toString(), inline: true },
                { name: '24 Hour Volume', value: data.TOTALVOLUME24H.toFixed(2).toString(), inline: true },
                { name: '24 Hour Change', value: data.CHANGE24HOUR.toFixed(2).toString(), inline: true },
                { name: '24 Hour Change %', value: `%${data.CHANGEPCT24HOUR.toFixed(2).toString()}`, inline: true },
                { name: 'Hour Low', value: data.LOWHOUR.toString(), inline: true },
                { name: 'Hour High', value: data.HIGHHOUR.toString(), inline: true },
                { name: 'Daily Low', value: data.LOWDAY.toString(), inline: true },
                { name: 'Daily High', value: data.HIGHDAY.toString(), inline: true },
              ]
        })
        return {
            imageUrl: `https://www.cryptocompare.com${data.IMAGEURL.toString()}`,
            priceData: [
                { name: 'Current Price', value: data.PRICE.toString(), inline: true },
                { name: 'Market Cap', value: data.MKTCAP.toString(), inline: true },
                { name: 'Supply', value: data.SUPPLY.toString(), inline: true },
                { name: '24 Hour Volume', value: data.TOTALVOLUME24H.toFixed(2).toString(), inline: true },
                { name: '24 Hour Change', value: data.CHANGE24HOUR.toFixed(2).toString(), inline: true },
                { name: '24 Hour Change %', value: `%${data.CHANGEPCT24HOUR.toFixed(2).toString()}`, inline: true },
                { name: 'Hour Low', value: data.LOWHOUR.toString(), inline: true },
                { name: 'Hour High', value: data.HIGHHOUR.toString(), inline: true },
                { name: 'Daily Low', value: data.LOWDAY.toString(), inline: true },
                { name: 'Daily High', value: data.HIGHDAY.toString(), inline: true },
              ]
        }
    } catch (error) {
        console.error(`Get {tokenName} price error: `, error)
    }
}

module.exports = getCryptoPrice;