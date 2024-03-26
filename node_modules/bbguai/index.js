
const getWalletFirstActiveTime = require('./walletInfo');
const { getSexagenary } = require('./sexagenaryCalculation');

async function getWalletBirthChart(walletAddress, blockchainType) {
    try {
        const firstActiveTime = await getWalletFirstActiveTime(walletAddress, blockchainType);
        // 假定firstActiveTime是一个Unix时间戳
        const birthDate = new Date(firstActiveTime * 1000);
        const year = birthDate.getUTCFullYear();
        const sexagenaryYear = getSexagenary(year);
        return {
            birthDate: birthDate.toISOString(),
            sexagenaryYear: sexagenaryYear
        };
    } catch (error) {
        console.error('Failed to get wallet birth chart:', error);
        throw error;
    }
}

module.exports = getWalletBirthChart;
